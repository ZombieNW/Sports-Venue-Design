<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getEvent } from '$lib/db';
	import Header from '../../../../components/header.svelte';
	import Seatpicker from '../../../../components/seatpicker.svelte';

	const id = $page.params.id;

	let event = {};

	onMount(async () => {
		event = await getEvent(id);
		event.date = new Date(event.date);
	});
</script>

<title>{event.name} Tickets | Cooltown Arena </title>

<div class="w-full">
	<Header></Header>
	<div class="flex h-32 w-full items-center bg-black/25 px-12 text-xl text-gray-300 outline outline-black">
		<div class="aspect-video h-3/4">
			<img src="/events/{id}.jpg" alt={event.name} class="h-full w-full object-cover" />
		</div>
		<div class="ml-4 mr-auto">
			<h1 class="text-2xl font-semibold">{event.name}</h1>
			<p class="text-lg text-gray-400">{event.subtitle}</p>
			{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(event.date)}
		</div>
	</div>
	<Seatpicker {event}></Seatpicker>
</div>
