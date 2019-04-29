import fs from 'fs'
import pathTool from 'path'

import textSearch from '../text-search'
import findFiles from '../find-files'
import { filter } from '../get_variables'

const iterateThroughFiles = async ({files, path, filesFound}) => {
  
  for (let i in files) {
    const file = files[i]
    const filename = pathTool.join(path, file)
    const isADirectory = fs.lstatSync(filename).isDirectory()
    
    if (isADirectory){
      await findFiles({path: filename, filesFound}) // recurs
    }
    else if (filename.indexOf(filter)>=0) {
      try {
        const found = await textSearch({file: `./${filename}`})
        if (found) {
          filesFound.push(found)
        }
      }
      catch (error) {
        return error
      }
    }
  }
}

export default iterateThroughFiles