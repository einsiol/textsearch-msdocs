import WordExtractor from 'word-extractor'
import selector from '../selector'

const searchOlderFileTypes = async ({searchTerms, file}) => {
  var extractor = new WordExtractor()
  var extracted = await extractor.extract(file)
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