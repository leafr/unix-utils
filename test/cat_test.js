var assert = require('assert')
  , cat = require('../lib/cat.js').cat
  , exec = require('child_process').exec
  , path = require('path')

function assertStderr(command, msg, done) {
  exec(command, function(error, stdout, stderr) {
    assert.equal(stderr, msg);
    done();
  })
}

describe('cat', function () {
  var binfile = path.resolve('./bin/cat')
    , command = function (args) { return 'node ' + binfile + ' ' + args };

  it('complains if file does not exist', function (done) {
    var file = "/nowhere/file"
      , msg = "\"" + file + "\" No such file"

    assertStderr(command(file), msg, done)
  })
})

