import { storeFileLocally } from '../../../src/runtime/server/utils/storage'

export default defineEventHandler(async (event) => {
	const { files } = await readBody<{ files: File[] }>(event)
	const fileNames: string[] = []
	for (const file of files) {
		fileNames.push(storeFileLocally(file.content, file.name))
	}
	return fileNames
})

interface File {
	name: string
	content: string
}
