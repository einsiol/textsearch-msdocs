
import util from 'util'
import textract from 'textract'

import selector from '../selector'
import { searchTerms } from '../get_variables'

import searchOlderFileTypes from './search-older-file-types'

const fromFileWithPath = util.promisify(textract.fromFileWithPath)

const searchFile = async ({file}) => {
  try {
    const text = await fromFileWithPath(file)

    return selector({searchTerms, text}) ? file : null
  } 
  catch (error) {
    const oldFile = await searchOlderFileTypes(file)

    return oldFile
  }
}

export default searchFile