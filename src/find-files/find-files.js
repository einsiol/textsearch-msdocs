import util from 'util'
import fs from 'fs'
import iterateThroughFiles from '../iterate-through-files'

const readdir = util.promisify(fs.readdir)

const findFiles = async ({ path, filesFound }) => {
  try {
    if (!fs.existsSync(path)){
      throw `Directory ${path} not found`
    }

    const files = await readdir(path)
    await iterateThroughFiles({files, path, filesFound, findFiles})
    
    return true
  }
  catch (error) {
    return error
  }
}

export default findFiles