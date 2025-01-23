<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getEvent } from '$lib/db';

	const id = $page.params.id;

	let event = {};

	onMount(async () => {
		event = await getEvent(id);
	});
</script>

<h1>Select Package</h1>
