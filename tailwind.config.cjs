const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('light', '.light &');
		})
	],
	theme: {
		extend: {
			colors: {
				border: 'rgb(var(--border) / <alpha-value>)',
				editor: 'rgb(var(--editor) / <alpha-value>)',
				viewport: 'rgb(var(--viewport) / <alpha-value>)',
				text: 'rgb(var(--text) / <alpha-value>)'
			},
			fontFamily: {
				merriweather: ['Merriweather', 'serif'],
				notoserif: ['Noto Serif', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
