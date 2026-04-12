<script lang="ts">
	import { onMount } from 'svelte';
	import { CustomCursor } from 'mouse-animations';

	type LineTrailPoint = {
		x: number;
		y: number;
	};

	type LineTrailOptions = {
		color: [number, number, number];
		width: number;
		maxPoints: number;
		headEase: number;
		followEase: number;
		glow: number;
	};

	class LineTrail {
		private points: LineTrailPoint[] = [];
		private rafId: number | null = null;
		private active = false;
		private lastFrameTime: number | null = null;
		private color: [number, number, number];
		private hasPointer = false;
		private pointerX = 0;
		private pointerY = 0;
		private viewportWidth = 0;
		private viewportHeight = 0;

		private readonly width: number;
		private readonly maxPoints: number;
		private readonly headEase: number;
		private readonly followEase: number;
		private readonly glow: number;
		private readonly canvas: HTMLCanvasElement;
		private readonly ctx: CanvasRenderingContext2D;

		constructor({ color, width, maxPoints, headEase, followEase, glow }: LineTrailOptions) {
			this.color = color;
			this.width = width;
			this.maxPoints = maxPoints;
			this.headEase = headEase;
			this.followEase = followEase;
			this.glow = glow;

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

		private resetPoints(x: number, y: number) {
			this.points = Array.from({ length: this.maxPoints }, () => ({ x, y }));
		}

		private onPointerMove = (event: MouseEvent) => {
			this.pointerX = event.clientX;
			this.pointerY = event.clientY;

			if (!this.hasPointer) {
				this.hasPointer = true;
				this.resetPoints(this.pointerX, this.pointerY);
				return;
			}
		};

		private onResize = () => {
			const dpr = Math.max(1, window.devicePixelRatio || 1);
			this.viewportWidth = window.innerWidth;
			this.viewportHeight = window.innerHeight;
			this.canvas.width = Math.floor(this.viewportWidth * dpr);
			this.canvas.height = Math.floor(this.viewportHeight * dpr);
			this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		private onVisibilityChange = () => {
			this.lastFrameTime = null;

			if (!document.hidden && this.hasPointer) {
				this.resetPoints(this.pointerX, this.pointerY);
			}
		};

		private updatePoints(frameDelta: number) {
			if (!this.hasPointer || this.points.length === 0) {
				return;
			}

			const head = this.points[0];
			const headEase = Math.min(1, this.headEase * frameDelta);
			head.x += (this.pointerX - head.x) * headEase;
			head.y += (this.pointerY - head.y) * headEase;

			for (let index = 1; index < this.points.length; index += 1) {
				const previous = this.points[index - 1];
				const point = this.points[index];
				const taper = Math.max(0.35, 1 - index / (this.points.length * 1.2));
				const ease = Math.min(1, this.followEase * taper * frameDelta);

				point.x += (previous.x - point.x) * ease;
				point.y += (previous.y - point.y) * ease;
			}
		}

		private drawTrail() {
			if (this.points.length < 3) {
				return;
			}

			const [red, green, blue] = this.color;
			const { ctx, points } = this;
			const maxIndex = points.length - 2;

			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.strokeStyle = `rgb(${red} ${green} ${blue})`;
			ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.3)`;
			ctx.shadowBlur = this.glow;

			for (let index = maxIndex; index >= 1; index -= 1) {
				const previous = points[index + 1];
				const current = points[index];
				const next = points[index - 1];
				const startX = (previous.x + current.x) / 2;
				const startY = (previous.y + current.y) / 2;
				const endX = (current.x + next.x) / 2;
				const endY = (current.y + next.y) / 2;
				const progress = 1 - index / maxIndex;
				const alpha = Math.pow(progress, 1.6);

				if (alpha <= 0.01) {
					continue;
				}

				ctx.globalAlpha = alpha;
				ctx.lineWidth = Math.max(0.75, this.width * progress);
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.quadraticCurveTo(current.x, current.y, endX, endY);
				ctx.stroke();
			}

			ctx.globalAlpha = 1;
			ctx.shadowBlur = 0;
		}

		private loop = (timestamp: number) => {
			if (!this.active) {
				return;
			}

			const frameDelta =
				this.lastFrameTime === null ? 1 : (timestamp - this.lastFrameTime) / (1000 / 60);
			const normalizedFrameDelta = Math.min(2.5, Math.max(0, frameDelta));
			this.lastFrameTime = timestamp;

			this.ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
			this.updatePoints(normalizedFrameDelta);
			this.drawTrail();
			this.rafId = requestAnimationFrame(this.loop);
		};

		enable() {
			if (this.active) {
				return;
			}

			this.active = true;
			this.lastFrameTime = null;
			document.addEventListener('mousemove', this.onPointerMove);
			this.rafId = requestAnimationFrame(this.loop);
		}

		disable() {
			if (!this.active) {
				return;
			}

			this.active = false;
			document.removeEventListener('mousemove', this.onPointerMove);

			if (this.rafId !== null) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}

			this.lastFrameTime = null;
			this.hasPointer = false;
			this.points = [];
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
				innerColor: colors.solid,
				outerColor: 'transparent',
				hideDefault: true
			});

			trail = new LineTrail({
				color: colors.rgb,
				width: 12,
				maxPoints: 100,
				headEase: 10,
				followEase: 4.9,
				glow: 4
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
