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
				merriweather: ['Merriweather', ...defaultTheme.fontFamily.serif],
				notoserif: ['Noto Serif', ...defaultTheme.fontFamily.serif]
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
