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
	<div class="content-shell header-content">
		<div class="bio">
			<h1 class="name-heading">{bio.name}</h1>
			<p class="role-text">{bio.role}</p>
			{#if bio.introduction}
				<p class="intro-text">{bio.introduction}</p>
			{/if}

			<div class="location-row">
				<MapPin class="location-icon" strokeWidth={2} />
				<p class="location-text">{bio.location}</p>
			</div>

			<div class="socials">
				<a
					href={contact.github}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="GitHub"
					class="social-button"
				>
					<svg
						viewBox="0 0 24 24"
						class="control-icon brand-mark"
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
						class={`control-icon brand-icon ${theme === 'light' ? 'icon-inverted' : ''}`}
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
						class="control-icon brand-mark"
						aria-hidden="true"
						focusable="false"
					>
						<path d={siBluesky.path}></path>
					</svg>
				</a>

				<a href={`mailto:${contact.email}`} aria-label="Email" class="social-button">
					<Mail class="control-icon" strokeWidth={2} />
				</a>
			</div>
		</div>

		<div class="header-actions">
			<button
				type="button"
				class="theme-toggle"
				aria-label={themeButtonLabel}
				title={themeButtonLabel}
				onclick={onToggleTheme}
			>
				{#if theme === 'dark'}
					<Sun class="control-icon" strokeWidth={2} />
				{:else}
					<Moon class="control-icon" strokeWidth={2} />
				{/if}
			</button>

			<button
				type="button"
				class="social-button"
				onclick={downloadCv}
				aria-label="Download CV"
				title="Download CV"
			>
				<Download class="control-icon" strokeWidth={2} />
			</button>
		</div>
	</div>
</section>

<style>
	.header-content {
		position: relative;
		padding-top: clamp(1.5rem, 4.5vh, 3.5rem);
	}

	.bio {
		display: flex;
		flex: 1 1 auto;
		min-inline-size: 0;
		flex-direction: column;
		align-items: flex-start;
		padding-inline-end: 3.5rem;
	}

	.name-heading {
		margin: 0;
		font-size: 2.1rem;
		line-height: 1.05;
		font-weight: 600;
		letter-spacing: -0.04em;
		opacity: 0.95;
	}

	.role-text {
		margin: 0.66rem 0 0;
		font-size: var(--font-size-header);
		line-height: 1.2;
		font-weight: 400;
		opacity: 0.75;
	}

	.intro-text {
		margin: 0.63rem 0 0;
		max-inline-size: 50ch;
		font-size: var(--font-size-base);
		line-height: 1.5;
		font-weight: 400;
		opacity: 0.7;
	}

	.location-row {
		display: flex;
		align-items: center;
		gap: 0.495rem;
		margin-top: 0.72rem;
		font-size: var(--font-size-base);
		opacity: 0.6;
	}

	.header-content :global(.location-icon) {
		inline-size: 1em;
		block-size: 1em;
		flex-shrink: 0;
	}

	.location-text {
		margin: 0;
		font-size: 1em;
		line-height: 1.4;
		font-weight: 400;
	}

	.socials {
		display: flex;
		flex-direction: row;
		gap: 0.7rem;
		margin-top: 1.125rem;
	}

	.header-actions {
		position: absolute;
		top: clamp(1.5rem, 4.5vh, 3.5rem);
		right: var(--content-gutter);
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

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

	.header-content :global(.control-icon) {
		position: relative;
		z-index: 1;
		display: block;
		inline-size: 1rem;
		block-size: 1rem;
		flex-shrink: 0;
	}

	.brand-mark {
		fill: currentColor;
	}

	.brand-icon {
		object-fit: contain;
		opacity: 0.8;
	}

	.brand-icon.icon-inverted {
		filter: invert(1);
	}
</style>
