<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';

	import { BIO, CONTACT, EDUCATION, PROJECTS } from '$lib/data/content';

	type Theme = 'dark' | 'light';

	const THEME_STORAGE_KEY = 'tobygrice-theme-a7d6ef';

	let theme = $state<Theme>('dark');
	let isThemeReady = $state(false);

	onMount(() => {
		if (!browser) {
			theme = 'dark';
		} else {
			theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
		}
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
	<Education education={EDUCATION} />
	<Projects projects={PROJECTS} />
	<Footer />
</main>

<style>
	.page {
		min-height: 100vh;
		background: var(--theme-bg);
		color: var(--theme-fg);
		transition:
			background-color 200ms ease,
			color 200ms ease;
	}
</style>
