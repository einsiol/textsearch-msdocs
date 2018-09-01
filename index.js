const textract = require('textract');
const WordExtractor = require("word-extractor");
const path = require('path');
const fs = require('fs');

console.log(__dirname)

const searchErrorFile = (file) => {
  var extractor = new WordExtractor();
  var extracted = extractor.extract(file);
  extracted.then(function(doc) {
    var body = doc.getBody()
    if(body.indexOf('Vignemont') >= 0 || body.indexOf('vignemont')  >= 0) {
      console.log(file);
    }
  })
  .catch((err) => console.log('Could not read this file >>>', file));

}

const serachFile = (file) => {
    textract.fromFileWithPath(file, (error, text) => {
      if(error) {
        // console.log('PROBLEM', file)
        searchErrorFile(file)
      } else {
        if(text.indexOf('Vignemont') >= 0 || text.indexOf('vignemont')  >= 0) {
          console.log(file);
        }
      }
    })

}



function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            serachFile('./' + filename)
        };
    };
};

// fromDir('./files','.doc');