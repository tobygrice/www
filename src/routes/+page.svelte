<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';

	import { BIO, CONTACT, EDUCATION, PROJECTS, SKILLS } from '$lib/data/content';
</script>

<svelte:head>
	<title>Toby Grice | Portfolio</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>

<main class="min-h-screen bg-(--theme-bg) text-(--theme-fg) transition-colors duration-200">
	<Header bio={BIO} contact={CONTACT} />
	<Education education={EDUCATION} />
	<Projects projects={PROJECTS} />
	<Skills skills={SKILLS} />
	<Footer />
</main>
