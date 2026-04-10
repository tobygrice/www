<script lang="ts">
	import type { Education } from '$lib/data/content';

	const { education }: { education: Education[] } = $props();

	const formatGpa = (value: number): string => {
		return Number.isInteger(value) ? value.toFixed(1) : value.toString();
	};
</script>

<section class="pb-[clamp(1.5rem,4vh,3rem)]" id="education" aria-labelledby="education-heading">
	<div class="content-shell pt-[clamp(0.2rem,0.8vh,0.55rem)]">
		<p class="section-label" id="education-heading">EDUCATION</p>

		<ul class="education-list">
			{#each education as entry (`${entry.title}-${entry.startdate}`)}
				<li class="education-item">
					<article class="education-entry">
						<header class="education-header">
							<div class="education-heading">
								<h3 class="education-title">{entry.title}</h3>
								<p class="education-institution">{entry.institution}</p>
							</div>
							<div class="education-meta">
								<p class="education-year">{entry.startdate} – {entry.enddate}</p>
								<p class="education-gpa">
									GPA {formatGpa(entry.gpa)} / {formatGpa(entry.gpa_max)}
								</p>
							</div>
						</header>

						{#if entry.bullets.length > 0}
							<ul class="education-bullets">
								{#each entry.bullets as bullet (bullet)}
									<li>{bullet}</li>
								{/each}
							</ul>
						{/if}
					</article>
				</li>
			{/each}
		</ul>
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

	.education-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.education-item {
		margin-top: clamp(1.25rem, 3.5vh, 2rem);
	}

	.education-item:first-child {
		margin-top: 0;
	}

	.education-entry {
		padding: clamp(0.9rem, 2.2vh, 1.3rem) clamp(1rem, 2.5vw, 1.4rem);
		border: 1px solid rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.25);
		border-radius: 0.55rem;
		background: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.007);
		transition:
			border-color 200ms ease,
			background-color 200ms ease;
	}

	.education-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: 0.75rem;
	}

	.education-title {
		margin: 0;
		font-size: var(--font-size-header);
		line-height: 1.1;
		font-weight: 600;
		letter-spacing: -0.01em;
		opacity: 0.9;
	}

	.education-institution {
		margin: 0.55rem 0 0;
		font-size: var(--font-size-subtitle);
		line-height: 1.35;
		font-style: italic;
		font-weight: 400;
		opacity: 0.6;
	}

	.education-meta {
		justify-self: end;
		text-align: right;
	}

	.education-year,
	.education-gpa {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 400;
		white-space: nowrap;
		opacity: 0.55;
	}

	.education-gpa {
		margin-top: 0.35rem;
	}

	.education-bullets {
		margin: 0.7rem 0 0;
		padding-left: 1.1rem;
		list-style: disc outside;
	}

	.education-bullets li {
		font-size: var(--font-size-base);
		line-height: 1.45;
		font-weight: 400;
		opacity: 0.6;
	}

	.education-bullets li + li {
		margin-top: 0.38rem;
	}

	@media (max-width: 55rem) {
		.education-header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 0.55rem;
		}

		.education-meta {
			order: 1;
			display: flex;
			align-items: center;
			column-gap: 0.45rem;
			justify-self: auto;
			text-align: left;
		}

		.education-heading {
			order: 2;
		}

		.education-year,
		.education-gpa {
			white-space: normal;
		}

		.education-gpa {
			margin-top: 0;
		}

		.education-gpa::before {
			content: '|';
			margin-right: 0.45rem;
		}
	}
</style>
