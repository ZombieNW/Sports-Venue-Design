<script>
	import { getEvents } from '$lib/db';
	import { onMount } from 'svelte';
	import { getEventListFormattedDate } from '$lib/utils';
	import Header from '../../components/header.svelte';
	import BigCalendar from '../../components/bigcalendar.svelte';
	import Eventcard from '../../components/eventcard.svelte';

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

<div class="mx-4 my-12 md:mx-12">
	<h1 class="text-7xl drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Upcoming Events</h1>
	<p class="my-4 text-xl text-gray-400">If you have any additional questions, please <a href="about">contact us</a>!</p>
</div>

<hr class="mx-auto mt-12 block w-2/3 border-gray-700 md:hidden" />

<div class="mx-auto hidden w-5/6 border-b border-gray-700 text-center text-sm font-medium text-gray-400 md:block md:w-2/3">
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
	<div class="mx-auto grid w-5/6 grid-cols-1 gap-8 py-12 md:w-2/3 md:grid-cols-3 md:px-12">
		{#each displayedEvents as event}
			<Eventcard {event} />
		{/each}
	</div>
	{#if eventsToShow < events.length}
		<div class="mx-auto mb-12 flex w-2/3 content-center items-center justify-center md:w-1/3">
			<button onclick={showMore} class="z-10 mx-2 flex h-12 flex-1 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center text-xl font-bold transition-transform hover:scale-105 hover:bg-sky-600">Show More</button>
		</div>
	{/if}
{:else if selectedTab === 'Calendar'}
	<div class="mx-auto w-2/3">
		<BigCalendar {events} />
	</div>
{:else}
	<h1>Error!</h1>
{/if}
