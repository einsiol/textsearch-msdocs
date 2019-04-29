import findFiles from './find-files'
import { dir as path} from './get_variables'

const runProgram = async () => {
  try {
    const fileList = []

    await findFiles({path, fileList})
    return fileList

  }
  catch (error) {
    return error
  }
}

runProgram()
  .then((result) => console.log(result))