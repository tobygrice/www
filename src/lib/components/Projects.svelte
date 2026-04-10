<script lang="ts">
	import type { Project } from '$lib/data/content';

	const { projects }: { projects: Project[] } = $props();
</script>

<section class="pb-[clamp(1.5rem,4vh,3rem)]" id="projects" aria-labelledby="projects-heading">
	<div class="content-shell pt-[clamp(0.2rem,0.8vh,0.55rem)]">
		<p class="section-label" id="projects-heading">PROJECTS</p>

		<ol class="timeline">
			{#each projects as project (`${project.title}-${project.startdate}`)}
				<li class="timeline-item">
					<article>
						<div class="timeline-head">
							<span class="timeline-dot" aria-hidden="true"></span>
							<header class="project-header">
								<h3 class="project-title">{project.title}</h3>
								<p class="project-year">{project.startdate} – {project.enddate}</p>
							</header>
						</div>

						{#if project.subtitle}
							<p class="project-subtitle">{project.subtitle}</p>
						{/if}

						{#if project.bullets.length > 0}
							<ul class="project-bullets">
								{#each project.bullets as bullet (`${project.title}-${bullet}`)}
									<li>{bullet}</li>
								{/each}
							</ul>
						{/if}
					</article>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.section-label {
		margin: 0 0 clamp(0.85rem, 2vh, 1.25rem);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.15em;
		opacity: 0.5;
	}

	.timeline {
		position: relative;
		isolation: isolate;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.timeline::before {
		content: '';
		position: absolute;
		top: calc(var(--font-size-header) * 0.55);
		bottom: calc(var(--font-size-header) * 0.55);
		left: calc((1.6rem / 2) - 0.5px);
		z-index: 0;
		inline-size: 1px;
		background: currentColor;
		opacity: 0.2;
	}

	.timeline-item {
		padding-bottom: clamp(1.25rem, 3.5vh, 2rem);
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-head {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.6rem minmax(0, 1fr);
		align-items: center;
		column-gap: 0.7rem;
	}

	.timeline-dot {
		position: relative;
		z-index: 2;
		inline-size: 0.7rem;
		block-size: 0.7rem;
		justify-self: center;
		border-radius: 50%;
		background: var(--theme-bg);
		transition: background-color 200ms ease;
	}

	.timeline-dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 2px solid rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.2);
		border-radius: inherit;
		transition: border-color 200ms ease;
	}

	.project-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: 0.75rem;
	}

	.project-title {
		margin: 0;
		font-size: var(--font-size-header);
		line-height: 1.1;
		font-weight: 600;
		letter-spacing: -0.01em;
		opacity: 0.9;
	}

	.project-year {
		margin: 0;
		flex-shrink: 0;
		font-size: 0.8rem;
		font-weight: 400;
		white-space: nowrap;
		opacity: 0.55;
	}

	.project-subtitle {
		margin: 0.55rem 0 0 2.3rem;
		font-size: var(--font-size-subtitle);
		line-height: 1.35;
		font-style: italic;
		font-weight: 400;
		opacity: 0.6;
	}

	.project-bullets {
		margin: 0.7rem 0 0 2.3rem;
		padding-left: 1.1rem;
		list-style: disc outside;
	}

	.project-bullets li {
		font-size: var(--font-size-base);
		line-height: 1.45;
		font-weight: 400;
		opacity: 0.6;
	}

	.project-bullets li + li {
		margin-top: 0.38rem;
	}

	@media (max-width: 55rem) {
		.project-header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 0.35rem;
		}

		.project-title {
			order: 2;
		}

		.project-year {
			order: 1;
			white-space: normal;
		}
	}
</style>
