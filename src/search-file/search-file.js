
import util from 'util'
import textract from 'textract'

import selector from '../selector'
import { searchTerms } from '../get_variables'

const fromFileWithPath = util.promisify(textract.fromFileWithPath)

const searchFile = async ({file}) => {
  try {
    const text = await fromFileWithPath(file)
    return selector({searchTerms, text}) ? file : null
  } 
  catch (error) {
    throw 'unreadable'
  }
}

export default searchFile