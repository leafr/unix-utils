var assert = require('assert')
  , cat = require('../lib/cat.js').cat
  , exec = require('child_process').exec
  , path = require('path')

describe('cat', function () {
  var binfile = path.resolve('./bin/cat')
    , command = function (args) { return binfile + ' ' + args };

  it('complains if file does not exist', function (done) {
    var file = "/nowhere/file"

    exec('node ' + command(file), function(error, stdout, stderr) {
      assert.equal(stderr, "\"" + file + "\" No such file");
      done();
    })
  })
})

