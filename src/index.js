import minimist from 'minimist'
import findFiles from './findFiles/find-files'

var argv = minimist(process.argv.slice(2))

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