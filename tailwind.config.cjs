const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'rgb(var(--border) / <alpha-value>)',
				editor: 'rgb(var(--editor) / <alpha-value>)',
				viewport: 'rgb(var(--viewport) / <alpha-value>)',
				text: 'rgb(var(--text) / <alpha-value>)'
			},
			fontFamily: {
				merriweather: ['Merriweather', ...defaultTheme.fonts.serif],
				notoserif: ['Noto Serif', ...defaultTheme.fonts.serif]
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
