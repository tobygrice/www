<script lang="ts">
	import type { Skill } from '$lib/data/content';
	import { CircleQuestionMark, Coffee, Database, Terminal } from 'lucide-svelte';
	import * as simpleIcons from 'simple-icons';
	import type { SimpleIcon } from 'simple-icons';

	const { skills }: { skills: Skill[] } = $props();

	type SkillIcon =
		| { type: 'simple-icons'; icon: SimpleIcon }
		| { type: 'lucide'; icon: typeof CircleQuestionMark };

	const LUCIDE_ICON_BY_NAME: Record<string, typeof CircleQuestionMark> = {
		Coffee,
		Database,
		Terminal
	};
	const FALLBACK_LUCIDE_ICON = CircleQuestionMark;
	const FALLBACK_SIMPLE_ICON = simpleIcons.siSimpleicons;

	const isSimpleIcon = (value: unknown): value is SimpleIcon => {
		return Boolean(value && typeof value === 'object' && 'path' in value);
	};

	const getSkillIcon = (skill: Skill): SkillIcon => {
		if (skill.iconPack === 'lucide') {
			return {
				type: 'lucide',
				icon: LUCIDE_ICON_BY_NAME[skill.icon] ?? FALLBACK_LUCIDE_ICON
			};
		}

		const icon = simpleIcons[skill.icon as keyof typeof simpleIcons];
		return {
			type: 'simple-icons',
			icon: isSimpleIcon(icon) ? icon : FALLBACK_SIMPLE_ICON
		};
	};
</script>

<section class="skills" id="skills" aria-labelledby="skills-heading">
	<div class="content-shell skills-content">
		<p class="section-label" id="skills-heading">SKILLS</p>

		<ul class="skills-list">
			{#each skills as skill (skill.name)}
				{@const skillIcon = getSkillIcon(skill)}
				<li class="skill-item">
					<div class="skill-chip">
						<span class="skill-icon" aria-hidden="true">
							{#if skillIcon.type === 'simple-icons'}
								<svg viewBox="0 0 24 24" class="brand-mark" aria-hidden="true" focusable="false">
									<path d={skillIcon.icon.path}></path>
								</svg>
							{:else}
								{@const SkillGlyph = skillIcon.icon}
								<SkillGlyph strokeWidth={1.85} />
							{/if}
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

	.brand-mark {
		fill: currentColor;
	}

	.skill-name {
		font-size: var(--skills-chip-size);
		line-height: 1.1;
		font-weight: 500;
		letter-spacing: -0.01em;
		opacity: 0.9;
	}

	@media (max-width: 70rem) {
		.skills-list {
			gap: 0.55rem;
		}

		.skill-chip {
			padding: 0.52rem 0.86rem 0.52rem 0.72rem;
		}
	}
</style>
