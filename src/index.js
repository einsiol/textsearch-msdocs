import findFiles from './find-files'
import { dir as path } from './get_variables'

const searchForFiles = async () => {
  try {
    const filesFound = []

    await findFiles({ filesFound, path })

    return filesFound
  }
  catch (error) {
    return error
  }
}

searchForFiles()
  .then(result => console.log(result))
  .catch(error => console.error(error))
