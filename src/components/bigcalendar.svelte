<script>
	import { onMount } from 'svelte';
	import { getEventListFormattedDate, isSameDay } from '$lib/utils';
	export let events;

	let currentDate = new Date();
	let days = []; // make days accessible outside of scope

	onMount(() => {
		currentDate = new Date();
	});

	$: currentDate = new Date(currentDate.setMonth(currentDate.getMonth()));

	function prevMonth() {
		currentDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
	}

	function nextMonth() {
		currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
	}

	$: {
		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
		const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
		const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
		let totalDays = 42; // 6 weeks * 7 days

		console.log(firstDayOfMonth + daysInMonth);
		if (firstDayOfMonth + daysInMonth <= 35) {
			totalDays -= 7;
		}

		days = Array.from({ length: totalDays }).map((_, i) => {
			if (i < firstDayOfMonth) {
				return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPreviousMonth - firstDayOfMonth + i + 1);
			} else if (i >= firstDayOfMonth + daysInMonth) {
				return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i - (firstDayOfMonth + daysInMonth) + 1);
			} else {
				return new Date(currentDate.getFullYear(), currentDate.getMonth(), i - firstDayOfMonth + 1);
			}
		});
	}
</script>

<div class="m-4 rounded-xl outline outline-black/50">
	<div class="flex flex-col items-center justify-center bg-black/50 py-8">
		<div class="flex items-center">
			<button aria-label="calendar backward" class="text-gray-300 hover:text-gray-100" onclick={prevMonth}>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<h1 class="mx-4 text-5xl">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
			<button aria-label="calendar forward" class="text-gray-300 hover:text-gray-100" onclick={nextMonth}>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
		<div class="mt-4 grid w-full grid-cols-7 gap-x-4 text-center text-lg font-semibold text-gray-300">
			<div>Sun</div>
			<div>Mon</div>
			<div>Tue</div>
			<div>Wed</div>
			<div>Thu</div>
			<div>Fri</div>
			<div>Sat</div>
		</div>
	</div>
	<div class="grid w-full grid-cols-7 gap-x-4">
		{#each days as date}
			<div class=" relative m-4 aspect-square rounded-xl bg-gray-900 p-4 outline outline-black/50">
				<h1 class="text-l absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-ee-xl rounded-ss-xl bg-sky-700 text-center font-bold tracking-wider">
					{@html (() => {
						return date.getMonth() === currentDate.getMonth() ? `<span>${date.getDate()}</span>` : `<span class="text-gray-400">${date.getDate()}</span>`;
					})()}
				</h1>
				{#if events.some((event) => isSameDay(event.date, date))}
					<div class="mt-5">
						{#each events.filter((event) => isSameDay(event.date, date)) as event}
							<p class="overflow-hidden text-ellipsis whitespace-nowrap text-gray-300 underline decoration-transparent transition-colors hover:decoration-white"><a href="/events/{event.id}/info">{event.name}</a></p>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
