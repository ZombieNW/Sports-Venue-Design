<script>
	import { getFaqs } from '$lib/db';
	import { onMount } from 'svelte';
	import InfoSVG from '../../components/infosvg.svelte';
	import FAQ from '../../components/faq.svelte';
	import Header from '../../components/header.svelte';

	let selectedSection = 'General';
	let faqs = [];

	onMount(async () => {
		faqs = await getFaqs();
	});
</script>

<Header />

<div class="mx-12 my-12">
	<h1 class="text-7xl drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">Frequently Asked Questions</h1>
	<p class="my-4 text-xl text-gray-400">If you have any additional questions, please <a href="about">contact us</a>!</p>
</div>

<div class="mx-12 my-12 flex">
	<div class="flex w-64 flex-col">
		{#each faqs as category}
			<a href="#{category.category}" onclick={() => (selectedSection = category.category)} class="my-3 text-xl drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)] {selectedSection === category.category ? 'font-bold text-blue-400' : 'text-gray-400'}"
				>{category.category}</a
			>
		{/each}
	</div>
	<div class="w-full">
		{#each faqs as category}
			<div id={category.category}>
				<h2 class="mb-10 text-5xl drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.8)]">{category.category}</h2>
				<div class="mb-12">
					{#each category.questions as question}
						<FAQ {question} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
