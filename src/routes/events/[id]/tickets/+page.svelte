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
	<div class="flex w-full items-center bg-black/25 text-xl text-gray-300 outline outline-black md:h-32 md:px-12">
		<div class="aspect-video h-full w-1/3 md:h-3/4 md:w-auto">
			<img src="/events/{id}.webp" alt={event.name} class="h-full w-full object-cover" />
		</div>
		<div class="ml-4 mr-auto">
			<h1 class="text-2xl font-semibold">{event.name}</h1>
			<p class="text-lg text-gray-400">{event.subtitle}</p>
			{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(event.date)}
		</div>
	</div>
	<Seatpicker {event}></Seatpicker>
</div>
