<script lang="ts">
	import type { Bio, Contact } from '$lib/data/content';

	import { Download, Mail, MapPin, Moon, Sun } from 'lucide-svelte';
	import githubIcon from '$lib/assets/GitHub_White.svg';
	import linkedinIcon from '$lib/assets/Linkedin_White.svg';
	import cvPdf from '$lib/assets/Tobias_Grice_CV.pdf';
	const blueskyIcon = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Bluesky_Logo_White.svg';

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
</script>

<section class="header">
	<div class="content-shell header-content">
		<div class="bio">
			<div class="name-row">
				<h1>{bio.name}</h1>
			</div>
			<p class="role">{bio.role}</p>
			{#if bio.introduction}
				<p class="introduction">{bio.introduction}</p>
			{/if}

			<div class="location-row">
				<MapPin strokeWidth={2} />
				<p class="location">{bio.location}</p>
			</div>

			<div class="socials">
				<a
					href={contact.github}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="GitHub"
					class="social-button"
				>
					<img src={githubIcon} alt="" class="brand-icon" />
				</a>

				<a
					href={contact.linkedin}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="LinkedIn"
					class="social-button"
				>
					<img src={linkedinIcon} alt="" class="brand-icon" />
				</a>

				<a
					href={contact.bluesky}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="Bluesky"
					class="social-button"
				>
					<img src={blueskyIcon} alt="" class="brand-icon" />
				</a>

				<a href={`mailto:${contact.email}`} aria-label="Email" class="social-button">
					<Mail strokeWidth={2} />
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
					<Sun strokeWidth={2} />
				{:else}
					<Moon strokeWidth={2} />
				{/if}
			</button>

			<a
				class="social-button download-button"
				href={cvPdf}
				download="Tobias_Grice_CV.pdf"
				aria-label="Download CV"
				title="Download CV"
			>
				<Download strokeWidth={2} />
			</a>
		</div>
	</div>
</section>

<style>
	.header {
		--header-offset-top: clamp(2.5rem, 7vh, 5rem);
		--header-content-top: clamp(1.5rem, 4.5vh, 3.5rem);
		--header-offset-bottom: clamp(0.75rem, 2vh, 1.5rem);
		--role-size: 1.1rem;
		--introduction-size: 0.9rem;
		--location-size: 0.9rem;
		--social-size: 0.9rem;
		--heading-size: 2rem;
		--heading-line-height: 1.05;
		--heading-line-size: calc(var(--heading-size) * var(--heading-line-height));
		padding-top: var(--header-offset-top);
		padding-bottom: var(--header-offset-bottom);
	}

	.header-content {
		padding-top: var(--header-content-top);
		display: flex;
		align-items: flex-start;
		gap: clamp(0.75rem, 2vw, 1.25rem);
	}

	.name-row {
		inline-size: 100%;
		display: block;
	}

	.header-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
		flex-shrink: 0;
		font-size: var(--social-size);
	}

	.theme-toggle {
		--theme-button-size: 2.75em;
		--theme-icon-size: calc(var(--theme-button-size) * 0.4);
		inline-size: var(--theme-button-size);
		block-size: var(--theme-button-size);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--theme-fg);
		border-radius: calc(var(--theme-button-size) * 0.3);
		background: var(--theme-fg);
		color: var(--theme-bg);
		opacity: 0.4;
		cursor: pointer;
		box-sizing: border-box;
		padding: 0;
		transition: opacity 200ms ease;
	}

	.theme-toggle:hover {
		opacity: 1;
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--theme-fg);
		outline-offset: 2px;
		opacity: 1;
	}

	.theme-toggle :global(svg) {
		position: relative;
		z-index: 1;
		inline-size: var(--theme-icon-size);
		block-size: var(--theme-icon-size);
	}

	.bio {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex: 1 1 auto;
		min-inline-size: 0;
	}

	h1 {
		margin: 0;
		flex: 1 1 auto;
		min-inline-size: 0;
		font-size: var(--heading-size);
		line-height: var(--heading-line-height);
		font-weight: 600;
		letter-spacing: -0.04em;
		opacity: 0.95;
	}

	.role {
		margin-top: 0.6em;
		font-size: var(--role-size);
		line-height: 1.2;
		font-weight: 400;
		opacity: 0.75;
	}

	.introduction {
		margin: 0.7em 0 0;
		max-inline-size: 50ch;
		font-size: var(--introduction-size);
		line-height: 1.5;
		font-weight: 400;
		opacity: 0.7;
	}

	.location-row {
		display: flex;
		align-items: center;
		gap: 0.55em;
		margin-top: 0.8em;
		font-size: var(--location-size);
		opacity: 0.6;
	}

	.location-row :global(svg) {
		inline-size: 1em;
		block-size: 1em;
		flex-shrink: 0;
	}

	.location {
		margin: 0;
		font-size: 1em;
		line-height: 1.4;
		font-weight: 400;
	}

	.socials {
		display: flex;
		flex-direction: row;
		gap: 0.75em;
		margin-top: 1.25em;
		font-size: var(--social-size);
	}

	.social-button {
		--social-button-size: 2.75em;
		--social-icon-size: calc(var(--social-button-size) * 0.4);
		position: relative;
		inline-size: var(--social-button-size);
		block-size: var(--social-button-size);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: calc(var(--social-button-size) * 0.3);
		background: transparent;
		overflow: hidden;
		opacity: 0.6;
		color: inherit;
		text-decoration: none;
		box-sizing: border-box;
		transition: opacity 200ms ease;
	}

	.social-button::before,
	.social-button::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
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
		outline: 2px solid currentColor;
		outline-offset: 2px;
		opacity: 0.95;
	}

	.social-button :global(svg),
	.brand-icon {
		position: relative;
		z-index: 1;
		inline-size: var(--social-icon-size);
		block-size: var(--social-icon-size);
		display: block;
		flex-shrink: 0;
	}

	.brand-icon {
		object-fit: contain;
		opacity: 0.8;
	}

	:global(html[data-theme='light']) .brand-icon {
		filter: invert(1);
	}
</style>
