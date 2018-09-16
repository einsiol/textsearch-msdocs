import util from 'util'
import pathTool from 'path'
import fs from 'fs'
import textract from 'textract'
import WordExtractor from 'word-extractor'

var argv = require('minimist')(process.argv.slice(2))
console.log('argv', argv)

const fromFileWithPath = util.promisify(textract.fromFileWithPath)
const readdir = util.promisify(fs.readdir)

const word = 'marketing'
let fileList = []

const selector = (text) => (text.indexOf(word) >= 0 || text.indexOf(word)  >= 0)

const searchOlderFileTypes = async (file) => {
	var extractor = new WordExtractor()
	var extracted = await extractor.extract(file)
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
		return error
	}
}

const searchFile = async (file) => {
	try {
		const result = await fromFileWithPath(file)
		return selector(result) ? file : null
	} 
	catch (error) {
		return searchOlderFileTypes(file)
	}
}

const iterateThroughFiles = async ({files, filter, path, fileList, callBack}) => {
  
	for (let i = 0; files.length > i; i++) {
		const file = files[i]
		const filename = pathTool.join(path, file)
		const isItADirectory = fs.lstatSync(filename).isDirectory()
    
		if (isItADirectory){
			await callBack({path: filename, filter, fileList}) // recurs
		}
		else if (filename.indexOf(filter)>=0) {
			const found = await searchFile('./' + filename)
			if (found) {
				fileList.push(found)
			}
		}
	}
}

const findFiles = async function findFiles({path, filter, fileList}) {
	if (!fs.existsSync(path)){
		throw `Directory ${path} not found`
	}

	const files = await readdir(path)
	await iterateThroughFiles({files, filter, path, fileList, callBack: findFiles })
  
	return
}

findFiles({path: './files', filter: '.doc', fileList})
	.then(() => console.log('done', fileList))
	.catch(error => console.log('ERROR DONE', error))