<script lang="ts">
	import { Mail, MapPin } from 'lucide-svelte';
	import githubIcon from '$lib/assets/GitHub_White.svg';
	import linkedinIcon from '$lib/assets/Linkedin_White.svg';

	const blueskyIcon = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Bluesky_Logo_White.svg';

	import type { Bio, Contact } from '$lib/data/content';

	const {
		bio,
		contact
	}: {
		bio: Bio;
		contact: Contact;
	} = $props();
</script>

<section class="header">
	<div class="content">
		<div class="bio">
			<h1>{bio.forename} {bio.surname}</h1>
			<p class="role">{bio.role}</p>

			<div class="location-row">
				<MapPin size={18} strokeWidth={2} color="#8a8a8a" />
				<p class="location">{bio.location}</p>
			</div>

			<div class="socials">
				<a
					href={contact.github}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="social-button"
				>
					<img src={githubIcon} alt="" class="brand-icon" />
				</a>

				<a
					href={contact.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					class="social-button"
				>
					<img src={linkedinIcon} alt="" class="brand-icon" />
				</a>

				<a
					href={contact.bluesky}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Bluesky"
					class="social-button"
				>
					<img src={blueskyIcon} alt="" class="brand-icon" />
				</a>

				<a href={`mailto:${contact.email}`} aria-label="Email" class="social-button">
					<Mail size={24} strokeWidth={2} />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.header {
		min-height: 100vh;
		margin-top: 5rem;
		color: #fff;
	}

	.content {
		max-width: 1000px;
		margin: 0 auto;
		padding: 3.5rem 2rem 0 2rem;
		box-sizing: border-box;
	}

	.bio {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 3.2vw, 3rem);
		line-height: 1.05;
		font-weight: 600;
		letter-spacing: -0.04em;
		color: #f5f5f5;
	}

	.role {
		margin: 1rem 0 0 0;
		font-size: clamp(1rem, 1vw, 2rem);
		line-height: 1.2;
		font-weight: 400;
		color: #9f9f9f;
	}

	.location-row {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 1rem;
	}

	.location {
		margin: 0;
		font-size: 1rem;
		line-height: 1.4;
		font-weight: 400;
		color: #8a8a8a;
	}

	.socials {
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		margin-top: 1.25rem;
	}

	.social-button {
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #222;
		border-radius: 0.85rem;
		background: transparent;
		color: #d4d4d4;
		text-decoration: none;
		box-sizing: border-box;
		transition:
			border-color 0.2s ease,
			color 0.2s ease,
			background-color 0.2s ease;
	}

	.social-button:hover {
		border-color: #3a3a3a;
		color: #ffffff;
		background: #0a0a0a;
	}

	.brand-icon {
		width: 20px;
		height: 20px;
		display: block;
		object-fit: contain;
		opacity: 0.8;
	}
</style>
