<script lang="ts">
	import Cog from '$lib/Cog.svelte';
	import { focusMode, theme } from '$lib/stores';
	import { fly } from 'svelte/transition';
	import TipTap from '../lib/TipTap.svelte';
	let html = '';
	let popover = false;
	let editor: HTMLDivElement;

	$: if ($focusMode && editor) {
		editor.classList.add('transition-only-transform');
		editor.offsetHeight;
		editor.classList.add('focus-mode');
		editor.offsetHeight;
		setTimeout(() => {
			editor.classList.add('no-transition');
			editor.classList.add('no-transition');
			editor.offsetHeight;
			editor.classList.remove('focus-mode');
			editor.offsetHeight;
			editor.classList.add('focus-mode-final');
			editor.offsetHeight;
			editor.classList.remove('transition-only-transform');
			editor.classList.remove('no-transition');
		}, 300);
	}
	$: if (!$focusMode && editor) {
		editor.classList.add('no-transition');
		editor.classList.add('transition-only-transform');
		editor.offsetHeight;
		editor.classList.remove('focus-mode-final');
		editor.offsetHeight;
		editor.classList.add('focus-mode');
		editor.offsetHeight;
		editor.classList.remove('no-transition');
		editor.offsetHeight;
		editor.classList.remove('focus-mode');
		editor.offsetHeight;
		setTimeout(() => {
			editor.classList.remove('transition-only-transform');
		}, 300);
	}
</script>

<svelte:window
	on:click={() => (popover = false)}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			popover = false;
		}
	}}
/>

<div class="flex h-screen w-full theme-{$theme} text-text">
	<div class="bg-editor w-1/2 border-r-border border-r no-transition" bind:this={editor}>
		<TipTap bind:html />
	</div>
	<div class="bg-viewport grid place-items-center w-1/2 py-10 px-20">
		<div class="rendered w-full h-full">
			{@html html}
		</div>
	</div>
	<div class="popover absolute flex flex-col gap-2 items-end right-0 p-5">
		<button on:click|stopPropagation={() => (popover = !popover)}>
			<Cog />
		</button>
		{#if popover}
			<!-- svelte-ignore a11y-click-events-have-key-events "We need to capture the click event here" -->
			<div
				class="bg-editor border-border border w-48 rounded-lg p-3 font-mono"
				transition:fly|local={{ y: 2, duration: 150 }}
				on:click|stopPropagation
			>
				<div>
					<div>Theme:</div>
					<div class="px-3">
						<select
							class="w-full rounded text-text focus:border-text border-border focus:ring-transparent bg-editor"
							bind:value={$theme}
						>
							<option value="light">Light</option>
							<option value="sepia">Sepia</option>
							<option value="dark">Dark</option>
						</select>
						<input type="checkbox" bind:checked={$focusMode} /> Focus Mode
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
