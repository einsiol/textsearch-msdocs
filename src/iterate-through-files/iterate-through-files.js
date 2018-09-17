import fs from 'fs'
import pathTool from 'path'

import searchFile from '../search-file'

const iterateThroughFiles = async ({searchTerms, files, filter, path, fileList, callBack}) => {
  
  for (let i = 0; files.length > i; i++) {
    const file = files[i]
    const filename = pathTool.join(path, file)
    const isItADirectory = fs.lstatSync(filename).isDirectory()
    
    if (isItADirectory){
      await callBack({searchTerms, path: filename, filter, fileList}) // recurs
    }
    else if (filename.indexOf(filter)>=0) {
      const found = await searchFile({searchTerms, file: `./${filename}`})
      if (found) {
        fileList.push(found)
      }
    }
  }
}

export default iterateThroughFiles