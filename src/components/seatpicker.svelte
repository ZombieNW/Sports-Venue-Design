<script>
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let event;

	// Initial seats setup
	const initialSeats = Array.from({ length: 10 }, () => Array.from({ length: 16 }, () => Array(16).fill(false)));

	// Stores
	const seats = writable(initialSeats);
	const openCell = writable(null);
	const zoom = writable(1);
	const translateX = writable(0);
	const translateY = writable(0);
	if (typeof window !== 'undefined') {
		translateX.update(() => window.innerWidth / 2 - 420);
		translateY.update(() => window.innerHeight / 2 - 340);
	}
	const isDragging = writable(false);

	let lastPos = null;

	// Helper to map cellIndex to seat array index
	function seatArrayIndex(cellIndex) {
		if (cellIndex < 5) return cellIndex;
		if (cellIndex === 5 || cellIndex === 6) return -1;
		return cellIndex - 2;
	}

	function handleZoomIn() {
		zoom.update((z) => Math.min(z + 0.25, 3));
	}

	function handleZoomOut() {
		zoom.update((z) => Math.max(z - 0.25, 0.5));
	}

	function handleCellClick(cellIndex) {
		if (cellIndex === 5 || cellIndex === 6) return;
		openCell.update((prev) => (prev === cellIndex ? null : cellIndex));
	}

	function handleSeatClick(cIndex, row, col) {
		const sIndex = seatArrayIndex(cIndex);
		if (sIndex === -1) return;

		seats.update((prev) => {
			const newSeats = prev.map((section, i) => {
				if (i !== sIndex) return section;
				return section.map((seatRow, r) => {
					if (r !== row) return seatRow;
					return seatRow.map((seat, cc) => (cc !== col ? seat : !seat));
				});
			});
			return newSeats;
		});
	}

	// Pan logic
	function handlePointerDown(e) {
		isDragging.set(true);
		lastPos = { x: e.clientX, y: e.clientY };
	}

	function handlePointerMove(e) {
		if (!$isDragging || !lastPos) return;
		const dx = e.clientX - lastPos.x;
		const dy = e.clientY - lastPos.y;
		translateX.update((x) => x + dx);
		translateY.update((y) => y + dy);
		lastPos = { x: e.clientX, y: e.clientY };
	}

	function handlePointerUp() {
		isDragging.set(false);
		lastPos = null;
	}

	// Calculate total seats selected
	$: totalSelected = $seats.reduce((acc, section) => acc + section.reduce((aRow, seatRow) => aRow + seatRow.filter((s) => s).length, 0), 0);

	let ticketPackage = 0;
	$: ticketPrice = event.tickets ? event.tickets[ticketPackage].price : 0;
	$: totalCost = totalSelected * ticketPrice;

	let seatpickerneeded = false;
	$: seatpickerneeded = event.seatpicker;

	// Handle wheel event
	function handleWheel(e) {
		e.preventDefault();
		if (e.deltaY < 0) {
			handleZoomIn();
		} else {
			handleZoomOut();
		}
	}
</script>

<div class="mb-4 overflow-hidden bg-gray-900 p-4">
	<div class="mb-4 flex h-1/4 flex-col justify-between md:flex-row">
		<div class="flex space-x-2 md:space-x-4">
			<button on:click={handleZoomOut} class="w-12 rounded-xl bg-gray-700 px-4 py-2">-</button>
			<button on:click={handleZoomIn} class="w-12 rounded-xl bg-gray-700 px-4 py-2">+</button>
			<select class="ml-2 w-64 rounded-xl bg-gray-700 px-2 py-1" on:change={(e) => (ticketPackage = e.target.selectedIndex)}>
				{#each event.tickets as ticket, i}
					<option value={i}>{ticket.name}</option>
				{/each}
			</select>
			<div class="flex items-center">Total Seats: {totalSelected}</div>
			<div class="ml-4 flex items-center">
				Total Cost: ${totalCost}
			</div>
		</div>
		<button class="mt-4 rounded-xl bg-green-400 px-8 py-2 text-black outline outline-black/50 md:my-0">Checkout</button>
	</div>
	{#if !seatpickerneeded}
		<p>ⓘ Note! This event does not require a chosen seat, you can select any seat.</p>
	{/if}
	<div
		id="seat-picker"
		on:wheel={handleWheel}
		style="cursor: {$isDragging ? 'grabbing' : 'grab'}"
		class="relative min-h-[60vh] w-full overflow-hidden border border-gray-700"
		on:pointerdown={handlePointerDown}
		on:pointermove={handlePointerMove}
		on:pointerup={handlePointerUp}
	>
		<div
			class="h-full w-full"
			style="
				transform: translate({$translateX}px, {$translateY}px) scale({$zoom});
				transform-origin: 0 0;
			"
		>
			<div class="grid grid-rows-3 gap-4 p-4" style="width: 800px">
				{#each { length: 3 } as _, row}
					<div class="grid grid-cols-4 gap-4">
						{#each { length: 4 } as __, col}
							{@const cellIndex = row * 4 + col}
							{#if row === 1 && col === 1}
								<div class="col-span-2 flex h-24 items-center justify-center rounded-xl border border-white/50 bg-gray-950">STAGE</div>
							{:else if row === 1 && col === 2}
								{null}
							{:else if cellIndex !== 5 && cellIndex !== 6}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div on:click={() => handleCellClick(cellIndex)} class="cursor-pointer">
									<div class="flex h-24 w-full items-center justify-center rounded-xl border-2 border-dashed bg-gray-700">
										Section {cellIndex + 1}
									</div>

									{#if $openCell === cellIndex}
										<div class="absolute z-10 mt-2 border bg-gray-800 p-2 shadow-lg">
											<div class="grid gap-1">
												{#each { length: 12 } as _, r}
													{@const sIndex = seatArrayIndex(cellIndex)}
													<div class="grid grid-cols-12 gap-1">
														{#each { length: 12 } as __, c}
															{@const selected = $seats[sIndex][r][c]}
															<!-- svelte-ignore element_invalid_self_closing_tag -->
															<div on:click|stopPropagation={() => handleSeatClick(cellIndex, r, c)} class="flex h-4 w-4 cursor-pointer items-center justify-center border border-gray-700 text-xs {selected ? 'bg-green-400' : ' bg-gray-700'}" />
														{/each}
													</div>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
