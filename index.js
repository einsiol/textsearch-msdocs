const util = require('util');
const pathTool = require('path');
const fs = require('fs');
const textract = require('textract');
const WordExtractor = require("word-extractor");
const {promisify} = require('./helpers')

const fromFileWithPath = util.promisify(textract.fromFileWithPath)
const readdir = util.promisify(fs.readdir)

const word = 'marketing'
let fileList = []

const selector = (text) => (text.indexOf(word) >= 0 || text.indexOf(word)  >= 0)

const searchWithWordExtractor = async (file) => {
  var extractor = new WordExtractor();
  var extracted = await extractor.extract(file);
  try {
    const body = extracted.pieces[0].text
    if(selector(body)) {
      return file
    } 
    else {
      return null
    }  
  }
  catch (error) {
    console.log('There was an error in extractor', error)
    return error
  }
}

const searchFile = async (file) => {
  try {
    const result = await fromFileWithPath(file)
    return selector(result) ? file : null
  } 
  catch (error) {
    return searchWithWordExtractor(file)
  }
}

const iterateThroughFiles = async ({files, filter, path = '', fileList}) => {
  
  for (let i = 0; files.length > i; i++) {
    const file = files[i]
    const filename = pathTool.join(path, file)
    const stat = fs.lstatSync(filename)
    
    if (stat.isDirectory()){
      await findFiles(filename, filter); // recurs
    }
    else if (filename.indexOf(filter)>=0) {
      const found = await searchFile('./' + filename)
      if (found) {
        fileList.push(found)
      }
    }

  }
}

async function findFiles({path, filter, fileList}) {
  if (!fs.existsSync(path)){
      throw `Directory ${path} not found`
  }

  const files = await readdir(path);
  await iterateThroughFiles({files, filter, path, fileList})
  
  return
};

findFiles({path: './files', filter: '.doc', fileList}).then(() => console.log('done', fileList)).catch(error => console.log('ERROR DONE', error))