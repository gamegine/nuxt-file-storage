import {
	defineNuxtModule,
	createResolver,
	addImportsDir,
	addServerScanDir,
	logger,
} from '@nuxt/kit'
// import { $fetch } from 'ofetch'
import defu from 'defu'
// import { version } from '../package.json'

import type { ModuleOptions } from './types'

export type * from './types'

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-file-storage',
		configKey: 'fileStorage',
	},
	// Default configuration options for the module, can also be a function returning those
	// ! no defaults for now
	// defaults: {
	// 	version: '0.0.0',
	// },
	// // Shorthand sugar to register Nuxt hooks
	// hooks: {},

  setup(options, nuxt) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const config = nuxt.options.runtimeConfig as any
		config.public.fileStorage = defu(config.public.fileStorage, {
			...options,
		})

		if (!config.public.fileStorage.mount) {
			logger.error(
				'Please provide a mount path for the file storage module in your nuxt.config.js',
			)
		}
 else {
			logger.ready(
				`Nuxt File Storage has mounted successfully`,
			)
		}

		// if (nuxt.options.dev) {
		// 	// $fetch('https://registry.npmjs.org/nuxt-file-storage/latest')
		// 	// 	.then((release: any) => {
		// 	// 		if (release.version > version)
		// 	// 			logger.info(
		// 	// 				`A new version of Nuxt File Storage (v${release.version}) is available: https://github.com/nyllre/nuxt-file-storage/releases/latest`,
		// 	// 			)
		// 	// 	})
		// 	// 	.catch(() => {})
		// }

		// Create resolver to resolve relative paths
		const { resolve } = createResolver(import.meta.url)

		// Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
		addImportsDir(resolve('runtime/composables'))
		addServerScanDir(resolve('./runtime/server'))
	},
})
