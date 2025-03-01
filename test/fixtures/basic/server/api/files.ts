import { storeFileLocally } from '../../../../../src/runtime/server/utils/storage'
import type { ServerFile } from '../../../../../src/types'

export default defineEventHandler(async (event) => {
	const { files } = await readBody<{ files: ServerFile[] }>(event)
	const fileNames: string[] = []
	for (const file of files) {
		fileNames.push(await storeFileLocally(file, file.name, '/specificFolder'))
	}
	return fileNames
})
