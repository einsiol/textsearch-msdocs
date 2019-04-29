import WordExtractor from 'word-extractor'
import selector from '../selector'
import { searchTerms, dir as path, filter } from '../get_variables'

const searchOlderFileTypes = async ({file}) => {
  const extractor = new WordExtractor()
  const extracted = await extractor.extract(file)
  try {
    const { text } = extracted.pieces[0]
    if(selector({searchTerms, text})) {
      return file
    } 
    else {
      return null
    }  
  }
  catch (error) {
    return error
  }
}

export default searchOlderFileTypes