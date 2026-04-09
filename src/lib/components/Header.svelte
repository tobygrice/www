<script lang="ts">
	import { Mail, MapPin } from 'lucide-svelte';
	import githubIcon from '$lib/assets/GitHub_White.svg';
	import linkedinIcon from '$lib/assets/Linkedin_White.svg';
	import type { Bio, Contact } from '$lib/data/content';

	const blueskyIcon = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Bluesky_Logo_White.svg';

	const {
		bio,
		contact
	}: {
		bio: Bio;
		contact: Contact;
	} = $props();
</script>

<section class="header">
	<div class="content-shell header-content">
		<div class="bio">
			<h1>{bio.forename} {bio.surname}</h1>
			<p class="role">{bio.role}</p>

			<div class="location-row">
				<MapPin strokeWidth={2} color="#8a8a8a" />
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
	</div>
</section>

<style>
	.header {
		--header-offset-top: clamp(2.5rem, 7vh, 5rem);
		--header-content-top: clamp(1.5rem, 4.5vh, 3.5rem);
		--role-size: clamp(1.1rem, 1.2vw, 1.4rem);
		--location-size: clamp(0.95rem, 1vw, 1.1rem);
		--social-size: clamp(0.9rem, 1vw, 1.1rem);
		min-height: 100vh;
		margin-top: var(--header-offset-top);
		color: #fff;
	}

	.header-content {
		padding-top: var(--header-content-top);
	}

	.bio {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 3vw, 2.8rem);
		line-height: 1.05;
		font-weight: 600;
		letter-spacing: -0.04em;
		color: #f5f5f5;
	}

	.role {
		margin-top: 0.6em;
		font-size: var(--role-size);
		line-height: 1.2;
		font-weight: 400;
		color: #9f9f9f;
	}

	.location-row {
		display: flex;
		align-items: center;
		gap: 0.55em;
		margin-top: 0.8em;
		font-size: var(--location-size);
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
		color: #8a8a8a;
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
		inline-size: var(--social-button-size);
		block-size: var(--social-button-size);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #222;
		border-radius: calc(var(--social-button-size) * 0.3);
		opacity: 0.6;
		color: #d4d4d4;
		text-decoration: none;
		box-sizing: border-box;
		transition:
			border-color 0.4s ease,
			color 0.4s ease,
			background-color 0.4s ease;
	}

	.social-button:hover {
		border-color: #3a3a3a;
		color: #ffffff;
		background: #0a0a0a;
		opacity: 1;
	}

	.social-button :global(svg),
	.brand-icon {
		inline-size: var(--social-icon-size);
		block-size: var(--social-icon-size);
		display: block;
		flex-shrink: 0;
	}

	.brand-icon {
		object-fit: contain;
		opacity: 0.8;
	}
</style>
