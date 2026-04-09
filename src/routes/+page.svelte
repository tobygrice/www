<script lang="ts">
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { BIO, CONTACT, PROJECTS } from '$lib/data/content';
	import { onMount } from 'svelte';

	type Theme = 'dark' | 'light';

	const THEME_STORAGE_KEY = 'portfolio-theme';

	const getThemeFromDocument = (): Theme => {
		if (!browser) {
			return 'dark';
		}

		return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	};

	let theme = $state<Theme>('dark');
	let isThemeReady = $state(false);

	onMount(() => {
		theme = getThemeFromDocument();
		isThemeReady = true;
	});

	const toggleTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
	};

	if (browser) {
		$effect(() => {
			if (!isThemeReady) {
				return;
			}

			document.documentElement.dataset.theme = theme;

			try {
				localStorage.setItem(THEME_STORAGE_KEY, theme);
			} catch {}
		});
	}
</script>

<svelte:head>
	<title>Toby Grice</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>

<main class="page">
	<Header bio={BIO} contact={CONTACT} {theme} onToggleTheme={toggleTheme} />
	<Projects projects={PROJECTS} />
</main>

<style>
	.page {
		min-height: 100vh;
		background: var(--theme-bg);
		color: var(--theme-fg);
		transition:
			background-color 180ms ease,
			color 180ms ease;
	}
</style>
