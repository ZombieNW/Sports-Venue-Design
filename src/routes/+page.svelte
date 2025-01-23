<script>
	import { getEvents } from '$lib/db';
	import { getEventListFormattedDate, isSameDay, getTimeAMPMFromDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import Calendar from '../components/calendar.svelte';
	import Header from '../components/header.svelte';

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

<div class="relative inline-block h-2/3 w-full overflow-hidden">
	<!-- svelte-ignore a11y_media_has_caption -->
	<video autoplay loop muted playsinline src="background-video.mp4" alt="Cooltown Arena Event Clips" class="0 pointer-events-none absolute h-full w-full object-cover"> </video>
	<div class="relative h-full w-full">
		<Header />
		<div class="absolute top-1/2 ml-12 -translate-y-1/2">
			<h1 class="text-9xl font-bold drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Breathtaking <br />Events</h1>
			<p class="text-4xl font-medium text-gray-300 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Right in your hometown.</p>
		</div>
	</div>
</div>
<div class="mx-auto flex h-72 w-3/4 -translate-y-1/4">
	{#each triDisplayEvents as event}
		<div class="relative m-auto h-96 w-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
			<div class="absolute inset-0">
				<img src={'events/' + event.id + '.jpg'} alt={event.name} class="h-full w-full rounded-xl object-cover" />
				<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
			</div>
			<div class="absolute left-0 top-0 z-10 flex h-20 w-20 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-2xl font-bold tracking-wider">{@html getEventListFormattedDate(event.date).split(' ').join('<br>')}</div>
			<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
				<a href="/events/{event.id}/info" class="text-3xl font-bold underline decoration-transparent transition-colors hover:decoration-white">{event.name}</a>
				<p class="text-xl italic text-gray-300">{event.subtitle}</p>
				<hr class="my-2 w-full border-gray-700" />
				<div class="flex w-full">
					<a href="/events/{event.id}/tickets" class="z-10 mx-2 flex h-12 w-auto flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600">Tickets</a>
					<a href="/events/{event.id}/info" class="z-10 mx-2 flex h-12 w-auto flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600">More Info</a>
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="mx-auto w-2/3">
	<hr class="mx-auto my-24 w-2/3 border-gray-700" />
	<h1 class="text-6xl font-bold text-sky-600 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Events Calendar</h1>
	<div class="flex">
		<div class="flex w-1/3">
			<Calendar bind:selectedDate={selectedCalendarDate} />
		</div>
		<div class="m-4 w-2/3 rounded-xl bg-gray-900/50 p-2 outline outline-black/50">
			<div class="flex flex-col">
				{#if upcomingEvents.length === 0}
					<div class="flex h-96 w-full items-center justify-center">
						<h1 class="text-3xl font-semibold text-gray-200">No events for {getEventListFormattedDate(selectedCalendarDate)}, try another date!</h1>
					</div>
				{:else}
					{#each upcomingEvents as event}
						<div class="relative m-4 flex flex-col rounded-xl bg-gray-900 p-4 outline outline-black/50 transition-transform hover:scale-105">
							<div class="absolute right-0 top-0 p-4 text-lg font-normal text-gray-300">
								{getEventListFormattedDate(event.date)} - {getTimeAMPMFromDate(event.date)}
							</div>
							<a href="/events/{event.id}/info" class="text-2xl font-bold underline decoration-transparent transition-colors hover:decoration-white">{event.name}</a>
							<p class="text-xl italic text-gray-300">{event.subtitle}</p>
							<hr class="my-2 w-full border-gray-700" />
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div class="flex content-center items-center justify-center">
		<a href="/events" class="text-2xl font-bold text-gray-400 underline decoration-transparent drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)] transition-colors hover:decoration-gray-300"> See All Events </a>
	</div>

	<hr class="mx-auto my-24 w-2/3 border-gray-700" />
	<h1 class="text-6xl font-bold text-sky-600 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Resources</h1>
</div>
<div class="mx-auto mb-44 mt-8 flex h-72 w-3/4">
	<div class="relative m-auto h-96 w-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
		<div class="absolute inset-0">
			<img src="rentals.jpg" alt="Event" class="h-full w-full rounded-xl object-cover" />
			<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
		</div>
		<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
			<a href="/rentals" class="text-3xl font-bold underline decoration-transparent transition-colors hover:decoration-white">Rentals</a>
			<p class="text-xl italic text-gray-300">Talk to our friendly staff about booking your event here.</p>
			<hr class="my-2 w-full border-gray-700" />
		</div>
	</div>

	<div class="relative m-auto h-96 w-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
		<div class="absolute inset-0">
			<img src="faqs.webp" alt="Event" class="h-full w-full rounded-xl object-cover" />
			<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
		</div>
		<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
			<a href="/faqs" class="text-3xl font-bold underline decoration-transparent transition-colors hover:decoration-white">FAQs</a>
			<p class="text-xl italic text-gray-300">Most common questions from our vendors and guests.</p>
			<hr class="my-2 w-full border-gray-700" />
		</div>
	</div>

	<div class="relative m-auto h-96 w-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
		<div class="absolute inset-0">
			<img src="calendar.png" alt="Event" class="h-full w-full rounded-xl object-cover" />
			<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
		</div>
		<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
			<a href="/events" class="text-3xl font-bold underline decoration-transparent transition-colors hover:decoration-white">Events</a>
			<p class="text-xl italic text-gray-300">A list and calendar of all future events.</p>
			<hr class="my-2 w-full border-gray-700" />
		</div>
	</div>
</div>

<div class="mx-auto w-2/3">
	<hr class="mx-auto my-24 w-2/3 border-gray-700" />
</div>
