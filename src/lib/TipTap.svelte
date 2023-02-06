<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import { MarkdownHeading } from './extensions/MarkdownHeading';
	import { MarkdownStyling } from './extensions/MarkdownStyling';
	import { Wrap } from './extensions/Wrap';
	// import { Wrap } from './extensions/Wrap';

	let element: HTMLDivElement;
	let editor: Editor;
	export let html = '';

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, MarkdownHeading, MarkdownStyling, Wrap],
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

<div class="w-full h-full px-24 py-10 relative" bind:this={element} />

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
