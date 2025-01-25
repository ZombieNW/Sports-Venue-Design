<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getEvent } from '$lib/db';
	import Header from '../../../../components/header.svelte';

	const id = $page.params.id;

	let event = {};

	onMount(async () => {
		event = await getEvent(id);
		event.date = new Date(event.date);
	});
</script>

<title>{event.name} | Cooltown Arena </title>

<Header></Header>

<div class="flex w-full flex-col-reverse md:flex-row">
	<div class="my-12 ml-4 md:ml-12 md:w-1/2">
		<div class="w-[calc(100%-2rem)] md:w-3/4">
			<p class="text-7xl font-bold">{event.name}</p>
			<p class="text-2xl italic text-gray-400">{event.subtitle}</p>
			<hr class="mb-4 mt-2 w-2/3 border-gray-700" />
			<p class="mb-8 text-xl text-gray-200">{event.description}</p>

			<h1 class="text-4xl font-bold">Event Details</h1>
			<p class="mb-8 text-xl text-gray-200">
				{event.name} will be at Cooltown Arena on {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(event.date)}.
			</p>

			<h1 class="text-4xl font-bold">FAQs</h1>
			<p class="mb-8 text-xl text-gray-200">
				Visit our <a href="/faqs" class="underline">FAQs</a> for more information.
			</p>

			<h1 class="text-4xl font-bold">Tickets</h1>
			<p class="mb-8 text-xl text-gray-200">
				There are {event.tickets?.length} different packages available. Get tickets here:
				<a href="/events/{event.id}/tickets" class="z-10 mx-auto my-8 flex h-12 w-1/2 flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600 md:mx-2"
					>Tickets</a
				>
			</p>
		</div>
	</div>

	<div class="md:w-1/2">
		<div class="relative h-96 w-full border-b-4 border-l-4 border-black bg-gray-900 md:h-screen">
			<div class="absolute inset-0">
				<img src="/events/{id}.webp" alt="Event" class="h-full w-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
			</div>
			<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
				<p class="text-7xl font-bold">{event.name}</p>
				<p class="text-2xl italic text-gray-400">{event.subtitle}</p>
				<hr class="my-2 w-full border-gray-700" />
			</div>
		</div>
	</div>
</div>
