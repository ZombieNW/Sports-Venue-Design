<script>
	import Header from '../../components/header.svelte';
</script>

<title>Rentals | Cooltown Arena</title>

<div class="relative inline-block h-2/3 w-full overflow-hidden">
	<!-- svelte-ignore a11y_media_has_caption -->
	<img src="rentals-bg.jpg" alt="People celebrating a concert with confetti in the air" class="0 pointer-events-none absolute h-full w-full object-cover" />
	<div class="relative h-full w-full">
		<Header />
		<div class="absolute top-1/2 ml-12 -translate-y-1/2">
			<h1 class="text-9xl font-bold drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">
				Make Your<br /> Event
				<span class="animate-gradient bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text font-bold text-transparent"> Magical</span>
			</h1>
			<p class="text-4xl font-medium text-gray-400 drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Book your event at Cooltown Arena.</p>
		</div>
	</div>
</div>

<div class="flex w-full">
	<div class="mx-12 my-12 w-1/3">
		<h2 class="text-7xl drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Contact Us</h2>
		<p class="my-4 text-2xl text-gray-400">If you have any additional questions, please fill out the form below and we'll get back to you as soon as possible!</p>
		<form class="flex w-full flex-col" action="/" method="POST">
			<label class="my-2" for="name">Name</label>
			<input class="border-b-2 border-gray-700 bg-transparent p-2" type="text" name="name" id="name" required />
			<label class="my-2" for="email">Email</label>
			<input class="border-b-2 border-gray-700 bg-transparent p-2" type="email" name="email" id="email" required />
			<label class="my-2" for="phone">Phone</label>
			<input class="border-b-2 border-gray-700 bg-transparent p-2" type="tel" name="phone" id="phone" required />
			<label class="my-2" for="event-name">Event Name</label>
			<input class="border-b-2 border-gray-700 bg-transparent p-2" type="text" name="event-name" id="event-name" required />
			<label class="my-2" for="event-date">Event Date</label>
			<input class="border-b-2 border-gray-700 bg-transparent p-2" type="date" name="event-date" id="event-date" required />
			<label class="my-2" for="event-time">Event Time</label>
			<input class="border-b-2 border-gray-700 bg-transparent p-2" type="time" name="event-time" id="event-time" required />
			<label class="my-2" for="event-description">Event Description</label>
			<textarea class="border-b-2 border-gray-700 bg-transparent p-2" name="event-description" id="event-description" required></textarea>
			<button class="my-4 rounded-xl bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700" type="submit">Submit</button>
		</form>
	</div>
	<div class="my-12 mr-12 w-2/3">
		<section class="grid grid-cols-2 gap-12">
			<div class="relative m-auto aspect-[3/2] h-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
				<div class="absolute inset-0">
					<img src="rentals-reason-1.jpg" alt="Event" class="h-full w-full rounded-xl object-cover" />
					<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
				</div>
				<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
					<p class="text-3xl font-bold">Professional Staff</p>
					<p class="text-xl italic text-gray-400">Our incredible staff team will help you make your event magical.</p>
					<hr class="my-2 w-full border-gray-700" />
				</div>
			</div>
			<div class="relative m-auto aspect-[3/2] h-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
				<div class="absolute inset-0">
					<img src="rentals-reason-2.webp" alt="Event" class="h-full w-full rounded-xl object-cover" />
					<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
				</div>
				<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
					<p class="text-3xl font-bold">Sound and Lighting</p>
					<p class="text-xl italic text-gray-400">Our advanced sound and lighting system can bring incredible atmosphere to any event.</p>
					<hr class="my-2 w-full border-gray-700" />
				</div>
			</div>
			<div class="relative m-auto aspect-[3/2] h-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
				<div class="absolute inset-0">
					<img src="rentals-reason-3.webp" alt="Event" class="h-full w-full rounded-xl object-cover" />
					<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
				</div>
				<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
					<p class="text-3xl font-bold">Convenient Location</p>
					<p class="text-xl italic text-gray-400">Located in the heart of the city, our venue is perfect for any event.</p>
					<hr class="my-2 w-full border-gray-700" />
				</div>
			</div>
			<div class="relative m-auto aspect-[3/2] h-96 rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 hover:scale-105">
				<div class="absolute inset-0">
					<img src="rentals-reason-4.jpg" alt="Event" class="h-full w-full rounded-xl object-cover" />
					<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>
				</div>
				<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
					<p class="text-3xl font-bold">Parking/Public Transit</p>
					<p class="text-xl italic text-gray-400">We offer convenient parking and public transit options for your convenience.</p>
					<hr class="my-2 w-full border-gray-700" />
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.animate-gradient {
		background-size: 300%;
		-webkit-animation: animatedgradient 6s ease infinite alternate;
		-moz-animation: animatedgradient 6s ease infinite alternate;
		animation: animatedgradient 6s ease infinite alternate;
	}

	@keyframes animatedgradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
