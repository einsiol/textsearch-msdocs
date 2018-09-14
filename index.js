const textract = require('textract');
const WordExtractor = require("word-extractor");
const path = require('path');
const fs = require('fs');
const {promisify} = require('./helpers')

const fromFileWithPath = promisify(textract.fromFileWithPath)

const word = 'marketing'
let fileList = []

const selector = (text) => (text.indexOf(word) >= 0 || text.indexOf(word)  >= 0)

const searchWithWordExtractor = (file) => {
  var extractor = new WordExtractor();
  var extracted = extractor.extract(file);
  try {
      const body = extracted.getBody()
      if(selector(body)) {
        return file
      } 
      else {
        return null
      }
      
  }
  catch (error) {
    console.log('There was an error in extractor')
    return error
  }

}

const searchFile = (file) => {
  try {
    const result = fromFileWithPath(file)

    return selector(result) ? file : null
  } 
  catch (error) {
    return searchWithWordExtractor(file)
  }
}

const iterateThroughFiles = (file, filter, startPath, array) => {
  const filename = path.join(startPath, file)
  const stat = fs.lstatSync(filename)
  try {
    if (stat.isDirectory()){
      findFiles(filename, filter); // recurs
      return
    }
    if (filename.indexOf(filter)>=0) {
      const found = searchFile('./' + filename)
      array.push(found)
      return
    }
  }
  catch (error) {
    return error
  }

}

async function findFiles({path: startPath, filter, fileList}) {
  if (!fs.existsSync(startPath)){
      throw `Directory ${startPath} not found`
  }

  const files = fs.readdirSync(startPath)

  files.forEach(file => iterateThroughFiles(file, filter, startPath, fileList));

  console.log(found)
  return found
};

const files = findFiles({path: './files', filter: '.doc', fileList});
console.log('files', files);