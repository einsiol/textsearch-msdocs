import fs from 'fs'
import pathTool from 'path'

import searchFile from '../search-file'
import searchOlderFileTypes from '../search-older-file-types'
import findFiles from '../find-files'

const iterateThroughFiles = async ({searchTerms, files, filter, path, fileList}) => {
  
  for (let i in files) {
    const file = files[i]
    const filename = pathTool.join(path, file)
    const isItADirectory = fs.lstatSync(filename).isDirectory()
    
    if (isItADirectory){
      await findFiles({searchTerms, path: filename, filter, fileList}) // recurs
    }
    else if (filename.indexOf(filter)>=0) {
      try {
        const found = await searchFile({searchTerms, file: `./${filename}`})
        if (found) {
          fileList.push(found)
        }
      }
      catch (error) {
        if(error === 'unreadable') {
          const found = await searchOlderFileTypes({searchTerms, file: `./${filename}`})
          
          if (found) {
            fileList.push(found)
          }
        }
      }
    }
  }
}

export default iterateThroughFiles