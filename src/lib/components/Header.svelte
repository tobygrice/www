<script lang="ts">
	import type { Bio, Contact } from '$lib/data/content';

	import { Download, Mail, MapPin, Moon, Sun } from 'lucide-svelte';
	import { siBluesky, siGithub } from 'simple-icons';
	import linkedinIcon from '$lib/assets/Linkedin_White.svg';

	import cvPdf from '$lib/assets/Tobias_Grice_CV.pdf';

	const {
		bio,
		contact,
		theme,
		onToggleTheme
	}: {
		bio: Bio;
		contact: Contact;
		theme: 'dark' | 'light';
		onToggleTheme: () => void;
	} = $props();

	const themeButtonLabel = $derived(
		theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
	);

	const downloadCv = () => {
		const link = document.createElement('a');
		link.href = cvPdf;
		link.download = 'Tobias_Grice_CV.pdf';
		link.click();
	};
</script>

<section class="pt-[clamp(2.5rem,7vh,5rem)] pb-[clamp(0.75rem,2vh,1.5rem)]">
	<div class="content-shell relative pt-[clamp(1.5rem,4.5vh,3.5rem)]">
		<div class="flex min-w-0 flex-1 flex-col items-start pr-14">
			<h1 class="m-0 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.04em] opacity-95">
				{bio.name}
			</h1>
			<p class="mt-[0.66rem] mb-0 text-[1.1rem] leading-[1.2] font-normal opacity-75">{bio.role}</p>
			{#if bio.introduction}
				<p
					class="mt-[0.63rem] mb-0 max-w-[50ch] text-[0.9rem] leading-normal font-normal opacity-70"
				>
					{bio.introduction}
				</p>
			{/if}

			<div class="mt-[0.72rem] flex items-center gap-[0.495rem] text-[0.9rem] opacity-60">
				<MapPin class="size-[1em] shrink-0" strokeWidth={2} />
				<p class="m-0 text-[1em] leading-[1.4] font-normal">{bio.location}</p>
			</div>

			<div class="mt-4.5 flex flex-row gap-[0.7rem]">
				<a
					href={contact.github}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="GitHub"
					class="social-button"
				>
					<svg
						viewBox="0 0 24 24"
						class="relative z-1 block size-4 shrink-0 fill-current"
						aria-hidden="true"
						focusable="false"
					>
						<path d={siGithub.path}></path>
					</svg>
				</a>

				<a
					href={contact.linkedin}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="LinkedIn"
					class="social-button"
				>
					<img
						src={linkedinIcon}
						alt=""
						class={`relative z-1 block size-4 shrink-0 object-contain opacity-80 ${theme === 'light' ? 'invert' : ''}`}
					/>
				</a>

				<a
					href={contact.bluesky}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="Bluesky"
					class="social-button"
				>
					<svg
						viewBox="0 0 24 24"
						class="relative z-1 block size-4 shrink-0 fill-current"
						aria-hidden="true"
						focusable="false"
					>
						<path d={siBluesky.path}></path>
					</svg>
				</a>

				<a href={`mailto:${contact.email}`} aria-label="Email" class="social-button">
					<Mail class="relative z-1 block size-4 shrink-0" strokeWidth={2} />
				</a>
			</div>
		</div>

		<div
			class="absolute top-[clamp(1.5rem,4.5vh,3.5rem)] right-(--content-gutter) flex flex-col gap-[0.7rem]"
		>
			<button
				type="button"
				class="theme-toggle"
				aria-label={themeButtonLabel}
				title={themeButtonLabel}
				onclick={onToggleTheme}
			>
				{#if theme === 'dark'}
					<Sun class="relative z-1 block size-4 shrink-0" strokeWidth={2} />
				{:else}
					<Moon class="relative z-1 block size-4 shrink-0" strokeWidth={2} />
				{/if}
			</button>

			<button
				type="button"
				class="social-button"
				onclick={downloadCv}
				aria-label="Download CV"
				title="Download CV"
			>
				<Download class="relative z-1 block size-4 shrink-0" strokeWidth={2} />
			</button>
		</div>
	</div>
</section>

<style>
	.theme-toggle,
	.social-button {
		inline-size: 2.5rem;
		block-size: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		padding: 0;
	}

	.theme-toggle {
		cursor: pointer;
		border: 1px solid var(--theme-fg);
		background: var(--theme-fg);
		color: var(--theme-bg);
		opacity: 0.4;
		transition: opacity 200ms ease;
	}

	.theme-toggle:hover {
		opacity: 1;
	}

	.theme-toggle:focus-visible {
		opacity: 1;
		outline: 2px solid var(--theme-fg);
		outline-offset: 2px;
	}

	.social-button {
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border: 0;
		background: transparent;
		color: inherit;
		text-decoration: none;
		opacity: 0.6;
		transition: opacity 200ms ease;
	}

	.social-button::before,
	.social-button::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 0.75rem;
		pointer-events: none;
	}

	.social-button::before {
		border: 1px solid currentColor;
		opacity: 0.25;
		transition: opacity 200ms ease;
	}

	.social-button::after {
		background: currentColor;
		opacity: 0;
		transition: opacity 200ms ease;
	}

	.social-button:hover {
		opacity: 1;
	}

	.social-button:hover::before {
		opacity: 0.38;
	}

	.social-button:hover::after {
		opacity: 0.06;
	}

	.social-button:focus-visible {
		opacity: 0.95;
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
</style>
