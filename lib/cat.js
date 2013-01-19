/*
 * TODO: add async version
 *
 */
var fs = require('fs');

var log = function(object, msg){
  process.stderr.write('"' + object + '" ' + msg);
}

exports.cat = function(files){
  files.forEach(function(filename){

    try {
      stats = fs.statSync(filename)

      if (stats.isDirectory()) {
        log(filename, "Is a directory");
      } else {
        var data = fs.readFileSync(filename);
        console.log(data.toString());
      }
    } catch(e) {
      switch(e.code) {
        case 'ENOENT':
          log(filename, 'No such file');
          break;
      }
      return;
    }
  });
};

