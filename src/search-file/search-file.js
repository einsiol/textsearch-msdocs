
import util from 'util'
import textract from 'textract'

import searchOlderFileTypes from '../search-older-file-types'
import selector from '../selector'

const fromFileWithPath = util.promisify(textract.fromFileWithPath)

const searchFile = async ({searchTerms, file}) => {
  try {
    const text = await fromFileWithPath(file)
    return selector({searchTerms, text}) ? file : null
  } 
  catch (error) {
    return searchOlderFileTypes({searchTerms, file})
  }
}

export default searchFile