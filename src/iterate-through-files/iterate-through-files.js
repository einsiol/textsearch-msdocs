import fs from 'fs'
import pathTool from 'path'

import textSearch from '../text-search'
import { filter } from '../get_variables'

const iterateThroughFiles = async ({ files, path, filesFound, findFiles }) => {
  for (let i in files) {
    const file = files[i]
    const filename = pathTool.join(path, file)
    const isADirectory = fs.lstatSync(filename).isDirectory()

    try {
      if (isADirectory) {
        await findFiles({ filesFound, path: filename })
      }
      else if (filename.indexOf(filter) >= 0) {
        const found = await textSearch({ file: `./${filename}` })

        if (found) {
          return filesFound.push(found)
        }

        return null
      }
    }
    catch (error) {
      return error
    }
  }

  return null
}

export default iterateThroughFiles
