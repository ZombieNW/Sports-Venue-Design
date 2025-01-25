<script>
	import { getEvents } from '$lib/db';
	import { getEventListFormattedDate, isSameDay, getTimeAMPMFromDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import Calendar from '../components/calendar.svelte';
	import Header from '../components/header.svelte';
	import Resourcecard from '../components/resourcecard.svelte';
	import Eventcard from '../components/eventcard.svelte';

	let events = [];
	let triDisplayEvents = [];
	let upcomingEvents = [];
	let selectedCalendarDate;
	$: selectedCalendarDate = new Date();
	$: upcomingEvents = events.filter((event) => isSameDay(new Date(event.date), selectedCalendarDate));

	onMount(async () => {
		events = await getEvents();
		triDisplayEvents = events.slice(0, 3);
		upcomingEvents = events.slice(0, 5);
	});
</script>

<!-- Hero Section -->

<div class="relative inline-block h-2/3 w-full overflow-hidden">
	<!-- svelte-ignore a11y_media_has_caption -->
	<video autoplay loop muted playsinline src="background-video.mp4" alt="Cooltown Arena Event Clips" class="0 pointer-events-none absolute h-full w-full object-cover"> </video>
	<div class="relative h-full w-full">
		<Header />
		<div class="absolute top-1/2 ml-12 hidden -translate-y-1/2 md:block">
			<h1 class="text-9xl font-bold drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Breathtaking <br />Events</h1>
			<p class="text-4xl font-medium text-gray-300 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Right in your hometown.</p>
		</div>
		<div class="mx-auto flex h-[calc(100%-6rem)] w-full flex-col items-center justify-center text-center md:hidden">
			<h1 class="text-6xl font-bold drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Breathtaking Events</h1>
			<p class="text-2xl font-medium text-gray-300 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Right in your hometown.</p>
		</div>
	</div>
</div>

<!-- Three Events -->

<div class="mx-auto mt-8 flex w-5/6 flex-col space-y-8 md:mb-44 md:h-72 md:w-3/4 md:-translate-y-1/3 md:flex-row md:space-y-0">
	<div class="block md:hidden">
		<h1 class="text-6xl font-bold text-sky-600 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Soonest Events</h1>
	</div>
	{#each triDisplayEvents as event}
		<Eventcard {event} />
	{/each}
</div>

<!-- Small Calendar -->

<hr class="mx-auto my-24 w-2/3 border-gray-700" />
<div class="mx-auto w-5/6 md:w-2/3">
	<h1 class="text-6xl font-bold text-sky-600 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Events Calendar</h1>
</div>

<div class="mx-auto mt-8 w-5/6 md:w-2/3">
	<div class="flex flex-col space-y-8 p-4 md:flex-row md:space-y-0">
		<div class="flex w-full md:w-1/3">
			<Calendar bind:selectedDate={selectedCalendarDate} />
		</div>
		<div class="w-full rounded-xl bg-gray-900/50 p-2 outline outline-black/50 md:w-2/3">
			<div class="flex h-full w-full flex-col">
				{#if upcomingEvents.length === 0}
					<div class="flex h-full w-full items-center justify-center p-4">
						<h1 class="text-3xl font-semibold text-gray-200">No events for {getEventListFormattedDate(selectedCalendarDate)}, try another date!</h1>
					</div>
				{:else}
					{#each upcomingEvents as event}
						<div class="relative m-4 flex flex-col rounded-xl bg-gray-900 p-4 outline outline-black/50 transition-transform hover:scale-105">
							<a href="/events/{event.id}/info" class="text-2xl font-bold underline decoration-transparent transition-colors hover:decoration-white">{event.name}</a>
							<div class="relative right-0 top-0 text-lg font-normal text-gray-400 md:absolute md:p-4">
								{getEventListFormattedDate(event.date)} - {getTimeAMPMFromDate(event.date)}
							</div>
							<p class="text-xl italic text-gray-400">{event.subtitle}</p>
							<hr class="my-2 w-full border-gray-700" />
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<div class="mx-auto my-4 flex w-full content-center items-center justify-center md:w-1/2">
		<a href="/events" class="z-10 mx-2 flex h-12 flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600"> See All Events </a>
	</div>
</div>

<!-- Resources -->

<hr class="mx-auto my-24 w-2/3 border-gray-700" />
<div class="mx-auto w-5/6 md:w-2/3">
	<h1 class="text-6xl font-bold text-sky-600 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Resources</h1>
</div>

<div class="mx-auto mt-8 flex w-5/6 flex-col space-y-8 md:mb-44 md:h-72 md:w-3/4 md:flex-row md:space-y-0">
	{#each [{ image: 'rentals.webp', title: 'Rentals', subtitle: 'Talk to our friendly staff about booking your event here.', link: '/rentals', large: true }, { image: 'faqs.webp', title: 'FAQs', subtitle: 'Most common questions from our vendors and guests.', link: '/faqs' }, { image: 'calendar.webp', title: 'Events', subtitle: 'A list and calendar of all future events.', link: '/events' }] as resource, index}
		<Resourcecard {resource} />
	{/each}
</div>

<hr class="mx-auto my-24 w-2/3 border-gray-700" />
