<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { BIO, CONTACT, PROJECTS } from '$lib/data/content';

	let theme = $state<'dark' | 'light'>('dark');

	const toggleTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
	};
</script>

<svelte:head>
	<title>Toby Grice</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>

<main class="page" data-theme={theme}>
	<Header bio={BIO} contact={CONTACT} theme={theme} onToggleTheme={toggleTheme} />
	<Projects projects={PROJECTS} />
</main>

<style>
	.page {
		--theme-ink: 255;
		--theme-fg: rgb(var(--theme-ink) var(--theme-ink) var(--theme-ink));
		--theme-bg: rgb(
			calc(255 - var(--theme-ink)) calc(255 - var(--theme-ink)) calc(255 - var(--theme-ink))
		);
		min-height: 100vh;
		background: var(--theme-bg);
		color: var(--theme-fg);
		transition:
			background-color 180ms ease,
			color 180ms ease;
	}

	.page[data-theme='light'] {
		--theme-ink: 0;
	}
</style>
