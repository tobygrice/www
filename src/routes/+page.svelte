<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { BIO, CONTACT } from '$lib/data/content';
</script>

<svelte:head>
	<title>Toby Grice</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>

<div class="page">
	<Header bio={BIO} contact={CONTACT} />
</div>

<style>
	:global(html) {
		margin: 0;
		padding: 0;
		background: #000;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: #000;
		color: #fff;
		font-family:
			Inter,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	.page {
		min-height: 60vh;
		background: #000;
	}
</style>
