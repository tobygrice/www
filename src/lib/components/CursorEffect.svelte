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
	};

	class LineTrail {
		private points: LineTrailPoint[] = [];
		private rafId: number | null = null;
		private active = false;
		private color: [number, number, number];

		private readonly width: number;
		private readonly maxPoints: number;
		private readonly decay: number;
		private readonly glow: number;
		private readonly canvas: HTMLCanvasElement;
		private readonly ctx: CanvasRenderingContext2D;

		constructor({ color, width, maxPoints, decay, glow }: LineTrailOptions) {
			this.color = color;
			this.width = width;
			this.maxPoints = maxPoints;
			this.decay = decay;
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
			this.enable();
		}

		private addPoint(x: number, y: number) {
			this.points.push({ x, y, life: 1 });
			if (this.points.length > this.maxPoints) {
				this.points.splice(0, this.points.length - this.maxPoints);
			}
		}

		private onPointerMove = (event: MouseEvent) => {
			const latest = this.points.at(-1);
			if (!latest) {
				this.addPoint(event.clientX, event.clientY);
				return;
			}

			const dx = event.clientX - latest.x;
			const dy = event.clientY - latest.y;
			const distance = Math.hypot(dx, dy);
			const steps = Math.max(1, Math.min(6, Math.floor(distance / 10)));

			for (let index = 1; index <= steps; index += 1) {
				const progress = index / steps;
				this.addPoint(latest.x + dx * progress, latest.y + dy * progress);
			}
		};

		private onResize = () => {
			const dpr = Math.max(1, window.devicePixelRatio || 1);
			this.canvas.width = Math.floor(window.innerWidth * dpr);
			this.canvas.height = Math.floor(window.innerHeight * dpr);
			this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		private drawSmoothPath(points: LineTrailPoint[]) {
			const first = points[0];
			if (!first) {
				return;
			}

			const { ctx } = this;
			ctx.beginPath();
			ctx.moveTo(first.x, first.y);

			if (points.length === 2) {
				const last = points[1];
				ctx.lineTo(last.x, last.y);
				return;
			}

			for (let index = 1; index < points.length - 1; index += 1) {
				const current = points[index];
				const next = points[index + 1];
				const midpointX = (current.x + next.x) / 2;
				const midpointY = (current.y + next.y) / 2;
				ctx.quadraticCurveTo(current.x, current.y, midpointX, midpointY);
			}

			const penultimate = points[points.length - 2];
			const last = points[points.length - 1];
			ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
		}

		private loop = () => {
			if (!this.active) {
				return;
			}

			const { ctx, points } = this;
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			if (points.length > 1) {
				const [red, green, blue] = this.color;

				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.45)`;
				ctx.shadowBlur = this.glow;
				ctx.lineWidth = this.width;

				const oldestPoint = points[0];
				const newestPoint = points[points.length - 1];
				const trailGradient = ctx.createLinearGradient(
					oldestPoint.x,
					oldestPoint.y,
					newestPoint.x,
					newestPoint.y
				);
				trailGradient.addColorStop(
					0,
					`rgba(${red}, ${green}, ${blue}, ${Math.max(0.05, oldestPoint.life * 0.25)})`
				);
				trailGradient.addColorStop(
					1,
					`rgba(${red}, ${green}, ${blue}, ${Math.max(0.5, newestPoint.life)})`
				);
				ctx.strokeStyle = trailGradient;

				this.drawSmoothPath(points);
				ctx.stroke();

				ctx.shadowBlur = 0;
			}

			for (const point of points) {
				point.life -= this.decay;
			}

			this.points = points.filter((point) => point.life > 0);
			this.rafId = requestAnimationFrame(this.loop);
		};

		enable() {
			if (this.active) {
				return;
			}

			this.active = true;
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

			this.points = [];
			this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		}

		destroy() {
			this.disable();
			window.removeEventListener('resize', this.onResize);
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
				innerSize: 8,
				outerSize: 30,
				innerColor: colors.solid,
				outerColor: 'transparent',
				smoothness: 0.22,
				hideDefault: true
			});

			trail = new LineTrail({
				color: colors.rgb,
				width: 5,
				maxPoints: 50,
				decay: 0.2,
				glow: 10
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
