<script lang="ts">
	import Cog from '$lib/Cog.svelte';
	import { centerHeadings, focusMode, indent, spacing, theme } from '$lib/stores';
	import { fly } from 'svelte/transition';
	import TipTap from '../lib/TipTap.svelte';
	let html = '';
	let popover = false;
	let editor: HTMLDivElement;
</script>

<svelte:window
	on:click={() => (popover = false)}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			popover = false;
		}
	}}
/>

<div
	class="print:block flex h-screen w-full theme-{$theme} text-text spacing-{$spacing}"
	class:indent={$indent}
	class:center-headings={$centerHeadings}
>
	<div
		class="bg-editor w-1/2 border-r-border border-r overflow-auto print:hidden"
		bind:this={editor}
	>
		<TipTap bind:html />
	</div>
	<div
		class="bg-viewport grid place-items-center w-1/2 print:w-full py-10 px-20 print:p-0 overflow-auto"
	>
		<div class="rendered w-full h-full print:overflow-scroll">
			{@html html}
		</div>
	</div>
	<div class="popover absolute flex flex-col gap-2 items-end right-0 p-5 print:hidden">
		<button on:click|stopPropagation={() => (popover = !popover)}>
			<Cog />
		</button>
		{#if popover}
			<!-- svelte-ignore a11y-click-events-have-key-events "We need to capture the click event here" -->
			<div
				class="bg-editor border-border border w-64 rounded-lg p-3 font-mono"
				transition:fly|local={{ y: 2, duration: 150 }}
				on:click|stopPropagation
			>
				<div>
					<div>Theme:</div>
					<div class="px-3 mt-2">
						<select
							class="w-full rounded text-text focus:border-text border-border focus:ring-transparent bg-editor"
							bind:value={$theme}
						>
							<option value="light">Light</option>
							<option value="sepia">Sepia</option>
							<option value="dark">Dark</option>
						</select>
					</div>
					<div class="mt-2">Line Spacing:</div>
					<div class="px-3 mt-2">
						<select
							class="w-full rounded text-text focus:border-text border-border focus:ring-transparent bg-editor"
							bind:value={$spacing}
						>
							<option value="single">Single</option>
							<option value="default">1.5</option>
							<option value="double">Double</option>
						</select>
					</div>
					<div class="mt-2">
						<input
							type="checkbox"
							id="focus-mode"
							class="rounded checkbox"
							bind:checked={$focusMode}
						/>
						<label for="focus-mode" class="select-none">Focus Mode</label>
					</div>
					<div class="mt-2">
						<input type="checkbox" id="indent" class="rounded checkbox" bind:checked={$indent} />
						<label for="indent" class="select-none">Indent Paragraphs</label>
					</div>
					<div class="mt-2">
						<input
							type="checkbox"
							id="center-headings"
							class="rounded checkbox"
							bind:checked={$centerHeadings}
						/>
						<label for="center-headings" class="select-none">Center Headings</label>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
