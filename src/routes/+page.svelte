<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { BIO, CONTACT } from '$lib/data/content';
</script>

<svelte:head>
	<title>Toby Grice</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>

<Header bio={BIO} contact={CONTACT} />
