<script lang="ts">
	import { onMount } from 'svelte';
	import { CustomCursor } from 'mouse-animations';

	type LineTrailPoint = {
		x: number;
		y: number;
		life: number;
	};

	type LineTrailOptions = {
		color: [number, number, number];
		width: number;
		maxPoints: number;
		decay: number;
		glow: number;
		pointSpacing?: number;
	};

	class LineTrail {
		private points: LineTrailPoint[] = [];
		private rafId: number | null = null;
		private active = false;
		private lastTime = 0;
		private viewportWidth = 0;
		private viewportHeight = 0;

		private pointerX = 0;
		private pointerY = 0;
		private hasPointer = false;

		private readonly color: [number, number, number];
		private readonly width: number;
		private readonly maxPoints: number;
		private readonly decay: number;
		private readonly glow: number;
		private readonly pointSpacing: number;

		private readonly canvas: HTMLCanvasElement;
		private readonly ctx: CanvasRenderingContext2D;

		constructor({ color, width, maxPoints, decay, glow, pointSpacing = 1.5 }: LineTrailOptions) {
			this.color = color;
			this.width = width;
			this.maxPoints = maxPoints;
			this.decay = decay;
			this.glow = glow;
			this.pointSpacing = pointSpacing;

			this.canvas = document.createElement('canvas');
			this.canvas.style.cssText =
				'position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999999;';

			const context = this.canvas.getContext('2d');
			if (!context) {
				throw new Error('Could not create canvas context for cursor trail');
			}

			this.ctx = context;
			document.body.appendChild(this.canvas);

			this.onResize();
			window.addEventListener('resize', this.onResize);
			document.addEventListener('visibilitychange', this.onVisibilityChange);

			this.enable();
		}

		private addPoint(x: number, y: number) {
			this.points.push({ x, y, life: 1 });

			if (this.points.length > this.maxPoints) {
				this.points.splice(0, this.points.length - this.maxPoints);
			}
		}

		private onPointerMove = (event: PointerEvent) => {
			this.pointerX = event.clientX;
			this.pointerY = event.clientY;
			this.hasPointer = true;
		};

		private onResize = () => {
			const dpr = Math.max(1, window.devicePixelRatio || 1);
			const rect = this.canvas.getBoundingClientRect();
			this.viewportWidth = Math.max(1, rect.width);
			this.viewportHeight = Math.max(1, rect.height);
			this.canvas.width = Math.round(this.viewportWidth * dpr);
			this.canvas.height = Math.round(this.viewportHeight * dpr);
			this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Resize clears the bitmap, so also clear any stale trail state.
			this.points = [];
			this.lastTime = 0;
		};

		private onVisibilityChange = () => {
			// Reset trail state when tab visibility changes so the effect
			// does not resume from stale timing/input state.
			this.points = [];
			this.lastTime = 0;
			this.hasPointer = false;
			this.ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		};

		private spawnPointsTowardPointer() {
			if (!this.hasPointer) return;

			const latest = this.points.at(-1);

			if (!latest) {
				this.addPoint(this.pointerX, this.pointerY);
				return;
			}

			const dx = this.pointerX - latest.x;
			const dy = this.pointerY - latest.y;
			const distance = Math.hypot(dx, dy);

			if (distance < this.pointSpacing) return;

			for (let index = this.pointSpacing; index <= distance; index += this.pointSpacing) {
				const progress = index / distance;

				this.addPoint(latest.x + dx * progress, latest.y + dy * progress);
			}

			// Ensure the trail head is anchored to the cursor center even when
			// interpolation step size does not divide the movement distance.
			this.addPoint(this.pointerX, this.pointerY);
		}

		private loop = (now: number) => {
			if (!this.active) return;

			if (!this.lastTime) {
				this.lastTime = now;
			}

			const dt = Math.min(32, now - this.lastTime);
			this.lastTime = now;

			this.spawnPointsTowardPointer();

			const { ctx, points } = this;
			ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);

			if (points.length > 1) {
				const [red, green, blue] = this.color;

				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.strokeStyle = `rgb(${red} ${green} ${blue})`;
				ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.45)`;

				for (let index = 1; index < points.length; index += 1) {
					const previous = points[index - 1];
					const current = points[index];

					const segmentLength = Math.hypot(current.x - previous.x, current.y - previous.y);
					if (segmentLength < 0.5) continue;

					const progress = index / (points.length - 1);
					const alpha = Math.min(previous.life, current.life) * progress;

					if (alpha <= 0) continue;

					const isHeadSegment = index === points.length - 1;
					ctx.shadowBlur = isHeadSegment ? 0 : this.glow;
					ctx.globalAlpha = alpha;
					ctx.lineWidth = Math.max(1, this.width * progress);
					ctx.beginPath();
					ctx.moveTo(previous.x, previous.y);
					ctx.lineTo(current.x, current.y);
					ctx.stroke();
				}

				ctx.globalAlpha = 1;
				ctx.shadowBlur = 0;
			}

			// decay is treated as "life lost per frame at 60fps"
			const decayPerSecond = this.decay * 60;
			for (const point of points) {
				point.life -= decayPerSecond * (dt / 1000);
			}

			this.points = points.filter((point) => point.life > 0);
			this.rafId = requestAnimationFrame(this.loop);
		};

		enable() {
			if (this.active) return;

			this.active = true;
			this.lastTime = 0;
			document.addEventListener('pointermove', this.onPointerMove, { passive: true });
			this.rafId = requestAnimationFrame(this.loop);
		}

		disable() {
			if (!this.active) return;

			this.active = false;
			document.removeEventListener('pointermove', this.onPointerMove);

			if (this.rafId !== null) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}

			this.points = [];
			this.hasPointer = false;
			this.lastTime = 0;
			this.ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		}

		destroy() {
			this.disable();
			window.removeEventListener('resize', this.onResize);
			document.removeEventListener('visibilitychange', this.onVisibilityChange);
			this.canvas.remove();
		}
	}

	type Theme = 'dark' | 'light';

	const FINE_POINTER_MEDIA = '(hover: hover) and (pointer: fine)';
	const REDUCED_MOTION_MEDIA = '(prefers-reduced-motion: reduce)';
	const DARK_SCHEME_MEDIA = '(prefers-color-scheme: dark)';

	const themeColors = {
		dark: {
			solid: '#ffffff',
			rgb: [255, 255, 255] as [number, number, number]
		},
		light: {
			solid: '#000000',
			rgb: [0, 0, 0] as [number, number, number]
		}
	} as const;

	onMount(() => {
		let cursor: CustomCursor | null = null;
		let trail: LineTrail | null = null;
		let activeTheme: Theme | null = null;

		const finePointerMedia = window.matchMedia(FINE_POINTER_MEDIA);
		const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_MEDIA);
		const darkSchemeMedia = window.matchMedia(DARK_SCHEME_MEDIA);

		const getTheme = (): Theme => {
			const explicitTheme = document.documentElement.dataset.theme;
			if (explicitTheme === 'dark' || explicitTheme === 'light') {
				return explicitTheme;
			}

			return darkSchemeMedia.matches ? 'dark' : 'light';
		};

		const destroyEffects = () => {
			trail?.destroy();
			trail = null;

			cursor?.destroy();
			cursor = null;
		};

		const createEffects = (theme: Theme) => {
			const colors = themeColors[theme];

			cursor = new CustomCursor({
				innerSize: 10,
				outerSize: 30,
				innerColor: colors.solid,
				outerColor: 'transparent',
				smoothness: 0.22,
				hideDefault: true
			});

			trail = new LineTrail({
				color: colors.rgb,
				width: 10,
				maxPoints: 50,
				decay: 0.2,
				glow: 5,
				pointSpacing: 4
			});
		};

		const syncEffects = () => {
			const canShowCustomCursor = finePointerMedia.matches && !reducedMotionMedia.matches;
			if (!canShowCustomCursor) {
				destroyEffects();
				activeTheme = null;
				return;
			}

			const nextTheme = getTheme();
			if (!cursor || !trail) {
				createEffects(nextTheme);
				activeTheme = nextTheme;
				return;
			}

			if (activeTheme !== nextTheme) {
				destroyEffects();
				createEffects(nextTheme);
				activeTheme = nextTheme;
			}
		};

		const handleMediaChange = () => {
			syncEffects();
		};

		const handleThemeMutation = () => {
			syncEffects();
		};

		const themeMutationObserver = new MutationObserver(handleThemeMutation);
		themeMutationObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		finePointerMedia.addEventListener('change', handleMediaChange);
		reducedMotionMedia.addEventListener('change', handleMediaChange);
		darkSchemeMedia.addEventListener('change', handleMediaChange);

		syncEffects();

		return () => {
			themeMutationObserver.disconnect();
			finePointerMedia.removeEventListener('change', handleMediaChange);
			reducedMotionMedia.removeEventListener('change', handleMediaChange);
			darkSchemeMedia.removeEventListener('change', handleMediaChange);
			destroyEffects();
		};
	});
</script>
