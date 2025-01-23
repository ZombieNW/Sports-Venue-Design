<script>
	import { getEvents } from '$lib/db';
	import { onMount } from 'svelte';
	import { getEventListFormattedDate } from '$lib/utils';
	import Header from '../../components/header.svelte';
	import BigCalendar from '../../components/bigcalendar.svelte';

	let events = [];
	let displayedEvents = [];
	let eventsToShow = 6;

	let selectedTab = 'Cards';

	onMount(async () => {
		events = await getEvents();
		displayedEvents = events.slice(0, eventsToShow);
	});

	function showMore() {
		eventsToShow += 6;
		displayedEvents = events.slice(0, eventsToShow);
	}
</script>

<Header />

<div class="mx-12 my-12">
	<h1 class="text-7xl drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Upcoming Events</h1>
	<p class="my-4 text-xl text-gray-400">If you have any additional questions, please <a href="about">contact us</a>!</p>
</div>

<div class="mx-auto w-2/3 border-b border-gray-700 text-center text-sm font-medium text-gray-400">
	<div class="flex justify-center">
		<ul class="-mb-px flex flex-wrap">
			<li class="me-2 text-xl">
				<a href="#cards" onclick={() => (selectedTab = 'Cards')} class="inline-block rounded-t-lg border-b-2 p-4 {selectedTab === 'Cards' ? 'border-sky-500 text-sky-500' : 'border-transparent hover:border-gray-300 hover:text-gray-400'} ">Cards</a>
			</li>
			<li class="me-2 text-xl">
				<a href="#calendar" onclick={() => (selectedTab = 'Calendar')} class="inline-block rounded-t-lg border-b-2 p-4 {selectedTab === 'Calendar' ? 'border-sky-500 text-sky-500' : 'border-transparent hover:border-gray-300 hover:text-gray-400'}"
					>Calendar</a
				>
			</li>
		</ul>
	</div>
</div>

{#if selectedTab === 'Cards'}
	<div class="mx-auto grid w-2/3 grid-cols-1 gap-8 px-12 py-12 sm:grid-cols-3">
		{#each displayedEvents as event}
			<div class="relative h-96 w-full rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
				<div class="absolute inset-0">
					<img src={'events/' + event.id + '.jpg'} alt={event.name} class="h-full w-full rounded-xl object-cover" />
					<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
				</div>
				<div class="absolute left-0 top-0 z-10 flex h-20 w-20 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-2xl font-bold tracking-wider">{@html getEventListFormattedDate(event.date).split(' ').join('<br>')}</div>
				<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
					<a href="/events/{event.id}/info" class="text-3xl font-bold underline decoration-transparent transition-colors hover:decoration-white">{event.name}</a>
					<p class="text-xl italic text-gray-400">{event.subtitle}</p>
					<hr class="my-2 w-full border-gray-700" />
					<div class="flex w-full">
						<a href="/events/{event.id}/tickets" class="z-10 mx-2 flex h-12 w-auto flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600">Tickets</a>
						<a href="/events/{event.id}/info" class="z-10 mx-2 flex h-12 w-auto flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600">More Info</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
	{#if eventsToShow < events.length}
		<div class="mx-auto mb-12 flex w-1/3 content-center items-center justify-center">
			<button onclick={showMore} class="z-10 mx-2 flex h-12 w-16 flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600">Show More</button>
		</div>
	{/if}
{:else if selectedTab === 'Calendar'}
	<div class="mx-auto w-2/3">
		<BigCalendar {events} />
	</div>
{:else}
	<h1>Error!</h1>
{/if}
