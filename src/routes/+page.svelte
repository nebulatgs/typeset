<script>
	import TipTap from '../lib/TipTap.svelte';
	let html = '';
</script>

<div class="flex h-screen w-full">
	<div class="bg-editor w-1/2 border-r-border border">
		<TipTap bind:html />
	</div>
	<div class="bg-viewport grid place-items-center w-1/2 py-10 px-20">
		<div class="rendered w-full h-full">
			{@html html}
		</div>
	</div>
</div>

<style>
	.paper {
		width: 8.5in;
	}

	:global(.rendered h1) {
		@apply text-xl;
		@apply mb-10;
		@apply font-merriweather font-black;
		@apply text-center;
	}

	:global(.rendered h2) {
		@apply text-lg;
		@apply mb-5;
		@apply font-merriweather font-black;
		@apply text-center;
	}
	:global(.rendered h3) {
		@apply mb-3;
		@apply font-merriweather font-black;
		@apply text-center;
	}
	:global(.rendered h4) {
		@apply mb-3;
		@apply font-merriweather font-black italic;
		@apply text-center;
	}
	:global(.rendered h5) {
		@apply mb-3;
		@apply font-merriweather italic;
		@apply text-center;
	}
	:global(.rendered h6) {
		@apply mb-3;
		@apply font-merriweather font-black;
	}
	:global(.rendered p) {
		@apply text-lg;
		@apply mb-3;
		@apply font-notoserif;
	}
	ol {
		@apply text-lg;
		@apply mb-3;
		@apply font-notoserif;
	}
</style>
