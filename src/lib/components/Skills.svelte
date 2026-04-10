<script lang="ts">
	import type { Skill } from '$lib/data/content';
	import {
		Binary,
		Braces,
		Code2,
		Coffee,
		Container,
		Database,
		FileCode,
		FileCode2,
		GitBranch,
		Terminal,
		Triangle,
		Wrench
	} from 'lucide-svelte';

	const { skills }: { skills: Skill[] } = $props();

	const ICON_BY_SKILL: Record<string, any> = {
		'C++': Binary,
		Rust: Wrench,
		JavaScript: FileCode2,
		TypeScript: Braces,
		Python: FileCode,
		Java: Coffee,
		Git: GitBranch,
		Docker: Container,
		Bash: Terminal,
		SQL: Database,
		Vercel: Triangle
	};

	const getSkillIcon = (name: string) => ICON_BY_SKILL[name] ?? Code2;
</script>

<section class="skills" id="skills" aria-labelledby="skills-heading">
	<div class="content-shell skills-content">
		<p class="section-label" id="skills-heading">SKILLS</p>

		<ul class="skills-list">
			{#each skills as skill (skill.name)}
				{@const SkillIcon = getSkillIcon(skill.name)}
				<li class="skill-item">
					<div class="skill-chip">
						<span class="skill-icon" aria-hidden="true">
							<SkillIcon strokeWidth={1.85} />
						</span>
						<span class="skill-name">{skill.name}</span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.skills {
		--skills-label-size: 0.7rem;
		--skills-chip-size: 0.9rem;
		padding-bottom: clamp(1.5rem, 4vh, 3rem);
	}

	.skills-content {
		padding-top: clamp(0.2rem, 0.8vh, 0.55rem);
	}

	.section-label {
		margin: 0 0 clamp(0.85rem, 2vh, 1.25rem);
		font-size: var(--skills-label-size);
		font-weight: 500;
		letter-spacing: 0.15em;
		opacity: 0.5;
	}

	.skills-list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem 0.75rem;
	}

	.skill-item {
		margin: 0;
	}

	.skill-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.58rem 1rem 0.58rem 0.78rem;
		border: 1px solid rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.2);
		border-radius: 10px;
		background-color: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink) / 0.02);
		transition:
			border-color 200ms ease,
			background-color 200ms ease;
	}

	.skill-icon {
		inline-size: 1.05rem;
		block-size: 1.05rem;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.75;
	}

	.skill-icon :global(svg) {
		inline-size: 100%;
		block-size: 100%;
		display: block;
	}

	.skill-name {
		font-size: var(--skills-chip-size);
		line-height: 1.1;
		font-weight: 500;
		letter-spacing: -0.01em;
		opacity: 0.9;
	}

	@media (max-width: 40rem) {
		.skills-list {
			gap: 0.55rem;
		}

		.skill-chip {
			padding: 0.52rem 0.86rem 0.52rem 0.72rem;
		}
	}
</style>
