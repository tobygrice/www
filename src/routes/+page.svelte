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

	const THEME_STORAGE_KEY = 'tobygrice-theme-a7d6ef';

	let theme = $state<Theme>('light');
	let isThemeReady = $state(false);
	let hasExplicitTheme = $state(false);

	const getSystemTheme = (prefersDark: boolean): Theme => (prefersDark ? 'dark' : 'light');

	onMount(() => {
		if (!browser) {
			theme = 'light';
			isThemeReady = true;
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const syncWithSystemTheme = () => {
			if (!hasExplicitTheme) {
				theme = getSystemTheme(mediaQuery.matches);
			}
		};

		try {
			const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

			if (storedTheme === 'light' || storedTheme === 'dark') {
				theme = storedTheme;
				hasExplicitTheme = true;
			} else {
				syncWithSystemTheme();
			}
		} catch {
			syncWithSystemTheme();
		}

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

				try {
					localStorage.setItem(THEME_STORAGE_KEY, theme);
				} catch {
					// Ignore storage failures in restricted browser environments.
				}
				return;
			}

			delete document.documentElement.dataset.theme;

			try {
				localStorage.removeItem(THEME_STORAGE_KEY);
			} catch {
				// Ignore storage failures in restricted browser environments.
			}
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
