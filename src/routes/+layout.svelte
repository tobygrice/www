<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import CursorEffect from '$lib/components/CursorEffect.svelte';

	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<CursorEffect />
{@render children()}
