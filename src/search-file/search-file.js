
import util from 'util'
import textract from 'textract'

import selector from '../selector'

const fromFileWithPath = util.promisify(textract.fromFileWithPath)

const searchFile = async ({searchTerms, file}) => {
  try {
    const text = await fromFileWithPath(file)
    return selector({searchTerms, text}) ? file : null
  } 
  catch (error) {
    throw 'unreadable'
  }
}

export default searchFile