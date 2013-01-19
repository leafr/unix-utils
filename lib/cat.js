var fs = require('fs');

var log = function(object, msg) {
  process.stderr.write('"' + object + '" ' + msg);
}

exports.cat = function(files) {
  files.forEach(function(filename) {
    var filesCollection = [];

    fs.stat(filename, function (error, stats) {
      if (error) {
        switch(error.code) {
          case 'ENOENT':
            log(filename, 'No such file');
            break;
        }
        return;
      }

      if (stats.isDirectory()) {
        log(filename, "Is a directory");
      } else {
        console.log(filename);
      }
    });
  });
}

