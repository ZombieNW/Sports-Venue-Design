<script>
	import { onMount } from 'svelte';

	let currentDate = new Date();
	export let selectedDate;

	$: selectedDate = new Date();

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

	function selectDate(date) {
		selectedDate = new Date(date);
	}
</script>

<div class="w-full max-w-sm shadow-lg">
	<div class="rounded-xl bg-gray-900 p-4 outline outline-black/50 md:p-8">
		<div class="flex items-center justify-between px-4">
			<span class="text-base font-bold text-gray-800 focus:outline-none dark:text-gray-100">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
			<div class="flex items-center">
				<button aria-label="calendar backward" class="text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100" onclick={prevMonth}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<polyline points="15 6 9 12 15 18" />
					</svg>
				</button>
				<button aria-label="calendar forward" class="ml-3 text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100" onclick={nextMonth}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24V24H0z" fill="none" />
						<polyline points="9 6 15 12 9 18" />
					</svg>
				</button>
			</div>
		</div>
		<div class="flex items-center justify-between overflow-x-auto pt-12">
			<table class="w-full">
				<thead>
					<tr>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Su</p>
							</div>
						</th>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Mo</p>
							</div>
						</th>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Tu</p>
							</div>
						</th>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">We</p>
							</div>
						</th>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Th</p>
							</div>
						</th>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Fr</p>
							</div>
						</th>
						<th>
							<div class="flex w-full justify-center">
								<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Sa</p>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each Array.from({ length: 6 }) as _, i}
						<tr>
							{#each Array.from({ length: 7 }) as _, j}
								<td>
									<div class="flex w-full cursor-pointer justify-center px-2 py-2">
										<button
											onclick={() => selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i * 7 + j - (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() || 7) + 1))}
											class="text-base font-medium text-gray-500 dark:text-gray-100"
										>
											{@html (() => {
												const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i * 7 + j - (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() || 7) + 1);
												if (date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()) {
													return `<span class="text-indigo-500">${date.getDate()}</span>`;
												} else if (date.getMonth() !== currentDate.getMonth()) {
													return `<span style="color: rgba(156, 163, 175, 0.5)">${date.getDate()}</span>`;
												} else {
													return date.getDate();
												}
											})()}
										</button>
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
