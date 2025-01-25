<script>
	import { getEventListFormattedDate } from '$lib/utils';
	export let event = {};
</script>

<div class="relative m-auto h-96 w-full rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 md:w-96 md:hover:scale-105">
	<div class="absolute inset-0">
		<img src={'events/' + event.id + '.webp'} alt={event.name} class="h-full w-full rounded-xl object-cover" />
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
