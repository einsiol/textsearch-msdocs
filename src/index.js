import minimist from 'minimist'
import findFiles from './findFiles/find-files'

const argv = minimist(JSON.parse(process.env.npm_config_argv).original)

const {_: searchTerms, dir = './'} = argv

const runProgram = async ({searchTerms, filter, path}) => {
  try {
    const fileList = []

    await findFiles({searchTerms, path, filter, fileList})
    return fileList

  }
  catch (error) {
    return error
  }
}

runProgram({searchTerms, path: dir, filter: '.doc'})
  .then((result) => console.log(result))