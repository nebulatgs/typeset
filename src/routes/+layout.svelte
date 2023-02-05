<script>
	import '../app.css';
	import '../prose.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
	<title>typeset.ink</title>

	<meta property="og:title" content="typeset.ink" />
	<meta property="og:description" content="A simple, distraction-free, Markdown editor." />
	<meta property="og:url" content="https://typeset.ink" />
	<meta property="theme-color" content="#faf1e4" />
</svelte:head>

<slot />
