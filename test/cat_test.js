var assert = require('assert')
  , cat = require('../lib/cat.js').cat
  , exec = require('child_process').exec
  , path = require('path')

function assertStderr(command, msg, done) {
  exec(command, function(error, stdout, stderr){
    assert.equal(stderr, msg);
    done();
  })
}

describe('cat', function(){
  var binfile = path.resolve('./bin/cat')
    , pwd = path.resolve('.')
    , command = function(args){ return 'node ' + binfile + ' ' + args };

  it('complains if file does not exist', function(done){
    var file = '/nowhere/file'
      , msg = '"' + file + '" No such file'

    assertStderr(command(file), msg, done)
  })

  it('complains if file is a directory', function(done){
    var file = '/tmp'
      , msg = '"' + file + '" Is a directory'

    assertStderr(command(file), msg, done);
  })

  it('concatenates files', function(done){
    var factories = path.join(pwd, 'test', 'factories')
      , a = path.join(factories, 'a')
      , b = path.join(factories, 'b');

    exec(command(a), function(error, stdout, stderr){
      assert.equal(stdout, "foo\nbar\n\n");
      done();
    });

    exec(command(a + ' ' + b), function(error, stdout, stderr){
      assert.equal(stdout, "foo\nbar\n\nbaz\n");
      done();
    });
  });
});

