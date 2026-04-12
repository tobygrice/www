<script lang="ts">
	import type { Bio, Contact } from '$lib/data/content';

	import { Download, Mail, MapPin } from 'lucide-svelte';
	import { siBluesky, siGithub } from 'simple-icons';

	import cvPdf from '$lib/assets/Tobias_Grice_CV.pdf';

	const {
		bio,
		contact
	}: {
		bio: Bio;
		contact: Contact;
	} = $props();

	const LINKEDIN_ICON_PATH =
		'M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z';

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
					<svg
						viewBox="0 0 382 382"
						class="relative z-1 block size-4 shrink-0 fill-current"
						aria-hidden="true"
						focusable="false"
					>
						<path d={LINKEDIN_ICON_PATH}></path>
					</svg>
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
	.social-button {
		inline-size: 2.5rem;
		block-size: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		padding: 0;
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
