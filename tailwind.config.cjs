/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				viewport: '#fcfcfc',
				editor: '#f7f7f7',
				pianoblack: '#191a1a',
				border: '#dbdbdb'
			},
			fontFamily: {
				merriweather: ['Merriweather', 'serif'],
				notoserif: ['Noto Serif', 'sans-serif']
			}
		}
	},
	plugins: []
};
