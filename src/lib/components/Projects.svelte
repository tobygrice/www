<script lang="ts">
	import type { Project } from '$lib/data/content';

	const { projects }: { projects: Project[] } = $props();
</script>

<section class="projects" id="projects" aria-labelledby="projects-heading">
	<div class="content-shell projects-content">
		<p class="section-label" id="projects-heading">PROJECTS</p>

		<ol class="timeline">
			{#each projects as project (project.id)}
				<li class="timeline-item">
					<article class="project">
						<div class="timeline-head">
							<span class="timeline-dot" aria-hidden="true"></span>
							<header class="project-header">
								<h3>{project.title}</h3>
								<p class="project-year">{project.startdate} - {project.enddate}</p>
							</header>
						</div>

						{#if project.subtitle}
							<p class="project-subtitle">{project.subtitle}</p>
						{/if}

						{#if project.bullets.length > 0}
							<ul class="project-bullets">
								{#each project.bullets as bullet}
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
	.projects {
		--projects-base-size: var(--font-size-base);
		--projects-label-size: calc(var(--projects-base-size) * 0.8);
		--projects-title-size: calc(var(--projects-base-size) * 1.25);
		--projects-year-size: calc(var(--projects-base-size) * 1.05);
		--projects-subtitle-size: calc(var(--projects-base-size) * 1.05);
		--projects-bullet-size: var(--projects-base-size);
		--projects-title-line-height: 1.1;
		--timeline-marker-column: clamp(1.2rem, 2.4vw, 1.6rem);
		--timeline-content-gap: clamp(0.75rem, 1.8vw, 1rem);
		--timeline-dot-size: 0.7rem;
		--timeline-rail-offset: calc(var(--projects-title-size) * 0.55);
		padding-bottom: clamp(1.5rem, 4vh, 3rem);
	}

	.projects-content {
		padding-top: clamp(0.2rem, 0.8vh, 0.55rem);
	}

	.section-label {
		margin: 0 0 clamp(0.85rem, 2vh, 1.25rem);
		font-size: var(--projects-label-size);
		font-weight: 500;
		letter-spacing: 0.15em;
		opacity: 0.5;
	}

	.timeline {
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
		isolation: isolate;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: calc((var(--timeline-marker-column) / 2) - 0.5px);
		top: var(--timeline-rail-offset);
		bottom: var(--timeline-rail-offset);
		inline-size: 1px;
		background: currentColor;
		opacity: 0.2;
		z-index: 0;
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
		grid-template-columns: var(--timeline-marker-column) minmax(0, 1fr);
		column-gap: var(--timeline-content-gap);
		align-items: center;
	}

	.timeline-dot {
		position: relative;
		z-index: 2;
		inline-size: var(--timeline-dot-size);
		block-size: var(--timeline-dot-size);
		justify-self: center;
		border: 2px solid currentColor;
		border-radius: 50%;
		opacity: 0.2;
		box-sizing: border-box;
	}

	.project-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: 0.75rem;
	}

	h3 {
		margin: 0;
		font-size: var(--projects-title-size);
		line-height: var(--projects-title-line-height);
		font-weight: 600;
		letter-spacing: -0.01em;
		opacity: 0.92;
	}

	.project-year {
		margin: 0;
		flex-shrink: 0;
		font-size: var(--projects-year-size);
		font-weight: 400;
		opacity: 0.56;
		white-space: nowrap;
	}

	.project-subtitle {
		margin: 0.55rem 0 0;
		margin-left: calc(var(--timeline-marker-column) + var(--timeline-content-gap));
		font-size: var(--projects-subtitle-size);
		line-height: 1.35;
		font-weight: 400;
		font-style: italic;
		opacity: 0.62;
	}

	.project-bullets {
		margin: 0.7rem 0 0;
		margin-left: calc(var(--timeline-marker-column) + var(--timeline-content-gap));
		padding-left: 1.1rem;
		list-style: disc outside;
	}

	.project-bullets li {
		font-size: var(--projects-bullet-size);
		line-height: 1.45;
		font-weight: 400;
		opacity: 0.6;
	}

	.project-bullets li + li {
		margin-top: 0.38rem;
	}

	@media (max-width: 45rem) {
		.project-header {
			column-gap: 0.5rem;
		}
	}
</style>
