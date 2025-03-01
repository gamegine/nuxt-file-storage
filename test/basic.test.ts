import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

await setup({
	rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
	nuxtConfig: {
		modules: ['../../../src/module'],
		fileStorage: { mount: './playground/public/userFiles' },
	},
})

describe('ssr', async () => {
	it('renders the index page', async () => {
		// Get response to a server-rendered page with `$fetch`.
		const html = await $fetch('/')
		expect(html).toContain('<input type="file" multiple>')
	})
})

// ! Look into this: https://runthatline.com/how-to-mock-fetch-api-with-vitest/
describe('Server API', async () => {
	it('sends a file to the server', async () => {
		const res = await $fetch('/api/files', {
			method: 'POST',
			body: JSON.stringify({
				files: [
					{
						name: 'ExampleFile.txt',
						content: 'data:text/plain;base64,dGhpcyBpcyBhbiBleGFtcGxlIGZpbGUK',
					},
					{
						name: 'test.txt',
						content: `data:text/plain;base64,${btoa('test')}`,
					},
				],
			}),
		})
		expect(`data:text/plain;base64,${btoa('this is an example file\n')}`).toBe('data:text/plain;base64,dGhpcyBpcyBhbiBleGFtcGxlIGZpbGUK')

		expect(res).toContain('ExampleFile.txt')
		expect(res).toContain('test.txt')

		expect(existsSync('./playground/public/userFiles/specificFolder/ExampleFile.txt')).toBeTruthy()
		expect(existsSync('./playground/public/userFiles/specificFolder/test.txt')).toBeTruthy()
		expect(
			readFileSync('./playground/public/userFiles/specificFolder/ExampleFile.txt', { encoding: 'utf8' }),
		).toBe('this is an example file\n')
	})
})
