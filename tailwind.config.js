/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#4F378B",
					50: "#F0EBFF",
					100: "#C8BBEA",
					200: "#A692D1",
					300: "#816EB3",
					400: "#674D9B",
					500: "#4F378B",
					600: "#3E256F",
					700: "#2D165B",
					800: "#1E0D45",
					900: "#11062B",
					950: "#060011",
				},
				secondary: {
					DEFAULT: "#964C8F",
					50: "#F0D2E9",
					100: "#D18FC4",
					200: "#C27AB7",
					300: "#B66AAE",
					400: "#A15C9D",
					500: "#964C8F",
					600: "#793B73",
					700: "#6A3062",
					800: "#4F1A46",
					900: "#3C1034",
					950: "#1C0219",
				},
				error: {
					DEFAULT: "#8C1D18",
					content: "#F9DEDC",
					focus: "#601410",
					"content-focus": "#F2B8B5",
				},
				success: {
					DEFAULT: "#2B9115",
					content: "#DFF6D9",
					focus: "#1D620D",
					"content-focus": "#B0E9A1",
				},
				"grey-20": "#333333",
				"grey-redtint": "#F7F2F2",
				"title": "#24248E",
				"title-dark": "#e9e9f3",
				"secondary-title": "",
				"primary-bg": "#F4F4EC",
				"secondary-bg": "#ececf4",
				"card-bg": "#FAFAFA",
				"primary-dark-bg": "#232136",
				"primary-dark-bg-darker": "#251a58",
				"secondary-dark-bg": "#160020",

			},
			minWidth: {
				"1/2": "50%",
				"1/3": "33%",
				"1/4": "25%",
			},
			maxWidth: {
				"1/2": "50%",
				"1/3": "33%",
				"1/4": "25%",
			},
			fontFamily: {
				serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"),
		require('tailwind-scrollbar')
	],
}
