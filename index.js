const textract = require('textract');
const WordExtractor = require("word-extractor");
const path = require('path');
const fs = require('fs');
const {promisify} = require('./helpers')

const fromFileWithPath = promisify(textract.fromFileWithPath)

const word = 'marketing'

const selector = (text) => (text.indexOf(word) >= 0 || text.indexOf(word)  >= 0)

const searchWithWordExtractor = async (file) => {
  var extractor = new WordExtractor();
  var extracted = await extractor.extract(file);
  try {
      const body = extracted.getBody()
      if(selector(body)) {
        return file
      }
  }
  catch (error) {
    console.log('There was an error in extractor')
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

const findFiles = ({path: startPath, filter}) => {

  if (!fs.existsSync(startPath)){
      throw `Directory ${startPath} not found`
  }

  const files = fs.readdirSync(startPath)

  files.forEach(file => {
      const filename = path.join(startPath, file)
      const stat = fs.lstatSync(filename)

      if (stat.isDirectory()){
          fromDir(filename, filter); // recurs
      }
      else if (filename.indexOf(filter)>=0) {
          searchFile('./' + filename)
            .then(found => console.log(found))
            .catch(error => console.log('Final error'))
      }

  });
};

findFiles({path: './files', filter: '.doc'});