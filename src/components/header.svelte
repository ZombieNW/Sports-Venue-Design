<script>
	import Menusvg from './menusvg.svelte';
	import { onMount } from 'svelte';
	let menuOpen = false;

	function handleClickOutside(event) {
		if (!event.target.closest('#menu-container')) {
			menuOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div id="menu-container" class="flex h-16 w-full items-center bg-black/50 px-4 text-xl text-gray-300 outline outline-black md:px-12">
	<a href="/" class="flex items-center">
		<img src="/logo.webp" alt="Cooltown Arena" class="mr-2 h-12 w-auto" />
		<!-- <span class="underline decoration-transparent transition-colors hover:decoration-gray-500">Cooltown Arena</span> -->
	</a>
	<div class="ml-auto hidden md:block">
		<a href="/events" class="ml-2 underline decoration-transparent transition-colors hover:decoration-gray-500">Upcoming Events</a>
		<p class="mx-2 inline-block">•</p>
		<a href="/faqs" class="ml-2 underline decoration-transparent transition-colors hover:decoration-gray-500">FAQs</a>
		<p class="mx-2 inline-block">•</p>
		<a href="/rentals" class="ml-2 underline decoration-transparent transition-colors hover:decoration-gray-500">Rentals</a>
	</div>
	<div class="ml-auto mr-4 mt-1 block md:hidden">
		<button on:click={() => (menuOpen = !menuOpen)}>
			<Menusvg />
		</button>
	</div>
	<nav class="absolute right-0 top-16 z-10 order-1 m-4 w-48 rounded-xl bg-black/50 p-4 shadow-lg outline outline-black md:hidden" style="display: {menuOpen ? 'block' : 'none'}">
		<a href="/events" class="block px-4 py-2 text-gray-300 hover:text-white">Upcoming Events</a>
		<a href="/faqs" class="block px-4 py-2 text-gray-300 hover:text-white">FAQs</a>
		<a href="/rentals" class="block px-4 py-2 text-gray-300 hover:text-white">Rentals</a>
	</nav>
</div>
