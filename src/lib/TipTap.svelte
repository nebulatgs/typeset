<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import { MarkdownHeading } from './extensions/MarkdownHeading';
	import { MarkdownStyling } from './extensions/MarkdownStyling';
	import { focusMode } from './stores';
	// import { Wrap } from './extensions/Wrap';

	let element: HTMLDivElement;
	let editorElement: HTMLDivElement;
	let editor: Editor;
	export let html = '';

	$: if ($focusMode && element) {
		element.classList.add('transition-only-transform');
		element.offsetHeight;
		element.classList.add('focus-mode');
		element.offsetHeight;
		setTimeout(() => {
			element.classList.add('no-transition');
			element.offsetHeight;
			element.classList.remove('focus-mode');
			element.offsetHeight;
			element.classList.add('focus-mode-final');
			element.offsetHeight;
			element.classList.remove('transition-only-transform');
			element.classList.remove('no-transition');
		}, 300);
	}
	$: if (!$focusMode && element) {
		element.classList.add('no-transition');
		element.classList.add('transition-only-transform');
		element.offsetHeight;
		element.classList.remove('focus-mode-final');
		element.offsetHeight;
		element.classList.add('focus-mode');
		element.offsetHeight;
		element.classList.remove('no-transition');
		element.offsetHeight;
		element.classList.remove('focus-mode');
		element.offsetHeight;
		setTimeout(() => {
			element.classList.remove('transition-only-transform');
		}, 300);
	}

	onMount(() => {
		editor = new Editor({
			element: editorElement,
			extensions: [StarterKit, MarkdownHeading, MarkdownStyling],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				html = editor.getHTML();
				// renderDecorations(element, editor);
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="h-full w-full cursor-text" on:click={() => editor.commands.focus()}>
	<div class="h-full w-full" bind:this={element}>
		<div class="w-full px-24 py-10 relative" bind:this={editorElement} />
	</div>
</div>

<style>
	:global(.HeadingMeta) {
		@apply absolute;
		@apply text-xl;
		@apply font-mono;
		@apply font-bold;
		@apply mr-2;
	}

	:global(.ProseMirror) {
		@apply outline-none;
		@apply w-full h-full;
		@apply font-mono;
	}

	:global(
			.ProseMirror h1,
			.ProseMirror h2,
			.ProseMirror h3,
			.ProseMirror h4,
			.ProseMirror h5,
			.ProseMirror h6
		) {
		@apply text-xl;
		@apply mb-2;
		@apply font-black;
	}

	/* :global(.ProseMirror h1::before) {
		content: '#';
		@apply HeadingMeta -left-6;
	}
	:global(.ProseMirror h2::before) {
		content: '##';
		@apply HeadingMeta -left-9;
	} */

	/* :global(.ProseMirror strong::before) {
		content: '**';
		@apply text-xl;
		@apply font-mono;
		@apply font-bold;
	}
	:global(.ProseMirror strong::after) {
		content: '**';
		@apply text-xl;
		@apply font-mono;
		@apply font-bold;
		@apply mr-2;
	} */
</style>
