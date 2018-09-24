import minimist from 'minimist'
import findFiles from './find-files'

const argv = minimist(JSON.parse(process.env.npm_config_argv).original)

const {'_': terms, dir = './'} = argv

const runProgram = async ({searchTerms, filter, path}) => {

  try {

    const fileList = []

    await findFiles({fileList, filter, path, searchTerms})
    return fileList

  } catch (error) {

    return error

  }

}

runProgram({terms, path: dir, filter: '.doc'})
  .then(result => console.log(result))
  .catch(error => console.log(error))
