<script>
	export let resource = {};
</script>

<div class="relative m-auto h-96 w-full rounded-xl bg-gray-900 outline outline-black/50 transition-transform duration-300 md:w-96 md:hover:scale-105">
	<div class="relative h-full">
		<img src={resource.image} alt={resource.title} class="h-full w-full rounded-xl object-cover" />
		<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent"></div>

		<div class="absolute bottom-4 left-4 z-10 m-4 w-5/6">
			<a href={resource.link} class="text-3xl font-bold underline decoration-transparent transition-colors hover:decoration-white">
				{resource.title}
			</a>
			<p class="text-xl italic text-gray-400">{resource.subtitle}</p>
			<hr class="my-2 w-full border-gray-700" />
		</div>
	</div>
</div>
