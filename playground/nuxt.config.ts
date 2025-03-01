export default defineNuxtConfig({
	modules: ['../src/module'],
	devtools: { enabled: true },

	compatibilityDate: '2025-02-27',

	fileStorage: {
		mount: process.env.mount,
	},
})
