<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';

	import { BIO, CONTACT, EDUCATION, PROJECTS, SKILLS } from '$lib/data/content';

	type Theme = 'dark' | 'light';

	const getSystemTheme = (prefersDark: boolean): Theme => (prefersDark ? 'dark' : 'light');
	const getInitialTheme = (): Theme => {
		if (!browser) {
			return 'light';
		}

		return getSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
	};

	let theme = $state<Theme>(getInitialTheme());
	let isThemeReady = $state(false);
	let hasExplicitTheme = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const syncWithSystemTheme = () => {
			if (!hasExplicitTheme) {
				theme = getSystemTheme(mediaQuery.matches);
			}
		};

		syncWithSystemTheme();

		const handleSystemThemeChange = () => {
			syncWithSystemTheme();
		};

		mediaQuery.addEventListener('change', handleSystemThemeChange);
		isThemeReady = true;

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	});

	const toggleTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
		hasExplicitTheme = true;
	};

	if (browser) {
		$effect(() => {
			if (!isThemeReady) {
				return;
			}

			if (hasExplicitTheme) {
				document.documentElement.dataset.theme = theme;
				return;
			}

			delete document.documentElement.dataset.theme;
		});
	}
</script>

<svelte:head>
	<title>Toby Grice | Portfolio</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>

<main class="min-h-screen bg-(--theme-bg) text-(--theme-fg) transition-colors duration-200">
	<Header bio={BIO} contact={CONTACT} {theme} onToggleTheme={toggleTheme} />
	<Education education={EDUCATION} />
	<Projects projects={PROJECTS} />
	<Skills skills={SKILLS} />
	<Footer />
</main>
