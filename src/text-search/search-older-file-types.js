import WordExtractor from 'word-extractor'
import selector from '../selector'
import { searchTerms } from '../get_variables'

const searchOlderFileTypes = async (file) => {
  const extractor = new WordExtractor()
  const extracted = await extractor.extract(file)

  try {
    const [{ text }] = extracted.pieces

    if (selector({ searchTerms, text })) {
      return file
    }

    return null
  }
  catch (error) {
    return error
  }
}

export default searchOlderFileTypes
