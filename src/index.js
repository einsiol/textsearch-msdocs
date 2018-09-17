import util from 'util'
import pathTool from 'path'
import fs from 'fs'
import textract from 'textract'
import WordExtractor from 'word-extractor'
import minimist from 'minimist'

const fromFileWithPath = util.promisify(textract.fromFileWithPath)
const readdir = util.promisify(fs.readdir)

var argv = minimist(process.argv.slice(2))

const searchTerms = argv._

const selector = ({text, searchTerms}) => {
  for (let i = 0; searchTerms.length > i; i++) {
    const term = searchTerms[i]
    if(text.indexOf(term) >= 0) {
      return true
    }
  }

  return false
}

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

const searchFile = async ({searchTerms, file}) => {
  try {
    const text = await fromFileWithPath(file)
    return selector({searchTerms, text}) ? file : null
  } 
  catch (error) {
    return searchOlderFileTypes({searchTerms, file})
  }
}

const iterateThroughFiles = async ({searchTerms, files, filter, path, fileList, callBack}) => {
  
  for (let i = 0; files.length > i; i++) {
    const file = files[i]
    const filename = pathTool.join(path, file)
    const isItADirectory = fs.lstatSync(filename).isDirectory()
    
    if (isItADirectory){
      await callBack({searchTerms, path: filename, filter, fileList}) // recurs
    }
    else if (filename.indexOf(filter)>=0) {
      const found = await searchFile({searchTerms, file: `./${filename}`})
      if (found) {
        fileList.push(found)
      }
    }
  }
}

const findFiles = async function findFiles({searchTerms, path, filter, fileList}) {
  try {
    if (!fs.existsSync(path)){
      throw `Directory ${path} not found`
    }

    const files = await readdir(path)
    await iterateThroughFiles({
      files, 
      filter, 
      path, 
      fileList, 
      callBack: findFiles,
      searchTerms
    })
    
    return true
  }
  catch (error) {
    return error
  }
}

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

runProgram({searchTerms, path: './files', filter: '.doc'})
  .then((result) => console.log(result))