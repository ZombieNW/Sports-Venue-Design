<script>
	export let question;

	import ArrowSVG from './arrowsvg.svelte';

	$: toggle = false;
</script>

<div class="text-gray-500">
	<button type="button" class="flex w-full items-center justify-between gap-3 py-5 text-left text-xl text-gray-100" on:click={() => (toggle = !toggle)}>
		<span>{question.question}</span>
		<ArrowSVG {toggle} />
	</button>
	<div class={toggle ? 'block' : 'hidden'}>
		<div class="pb-5 pt-2">
			<p class="text-gray-500 dark:text-gray-400">
				{@html question.answer}
			</p>
		</div>
	</div>
	<hr class="my-1 w-full border-gray-700" />
</div>
