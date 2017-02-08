'use strict';

const tap = require('tap');
const pathPlus = require('../index');

tap.test('pathPlus.contains', t => {
  // should work for simple case
  t.ok(
    pathPlus.contains('foo/bar', 'foo/bar/foobar'),
    'foo/bar > foo/bar/foobar'
  );

  t.ok(
    pathPlus.contains('foo/bar', 'foo/bar'),
    'foo/bar == foo/bar'
  );

  t.notOk(
    pathPlus.contains('foo/bar/foo-01', 'foo/bar/foo-02'),
    'foo/bar/foo-01 != foo/bar/foo-02'
  );

  t.notOk(
    pathPlus.contains('foo/bar/foobar', 'foo/bar'),
    'foo/bar/foobar < foo/bar'
  );

  t.notOk(
    pathPlus.contains('foo/bar/foobar', 'foobar/bar/foo'),
    'foo/bar/foobar != foobar/bar/foo'
  );

  t.notOk(
    pathPlus.contains('foo/bar/foobar/foobar.js', 'foo/bar/foobar/foobar.js.meta'),
    'foo/bar/foobar/foobar.js != foo/bar/foobar/foobar.js.meta'
  );

  t.ok(
    pathPlus.contains('foo/bar/foobar', 'foo/bar/foobar/foobar.js'),
    'foo/bar/foobar > foo/bar/foobar/foobar.js'
  );

  t.notOk(
    pathPlus.contains('foo/bar', 'foo/bar1/foobar'),
    'foo/bar != foo/bar1/foobar'
  );

  t.ok(
    pathPlus.contains('foo/bar1/', 'foo/bar1/foobar'),
    'foo/bar1/ == foo/bar1/foobar'
  );

  // should work for complex typing
  t.ok(
    pathPlus.contains('foo/bar/', 'foo/bar/foobar'),
    'foo/bar/ > foo/bar/foobar'
  );

  t.ok(
    pathPlus.contains('foo/bar', 'foo/bar/'),
    'foo/bar == foo/bar/'
  );

  t.notOk(
    pathPlus.contains('foo/bar/foo-01/', 'foo/bar/foo-02'),
    'foo/bar/foo-01/ != foo/bar/foo-02'
  );

  // should work for case insensitive system
  t.equal(
    pathPlus.contains('c:\\foo\\bar', 'C:\\Foo\\Bar'),
    process.platform === 'win32',
    'c:\\foo\\bar === C:\\Foo\\Bar in Windows'
  );

  t.end();
});

tap.test('pathPlus.slash', t => {
  // should convert backwards-slash paths to forward slash paths
  t.equal(
    pathPlus.slash('c:/aaaa\\bbbb'),
    'c:/aaaa/bbbb'
  );

  t.equal(
    pathPlus.slash('c:\\aaaa\\bbbb'),
    'c:/aaaa/bbbb'
  );

  // t.test('should not convert extended-length paths', function () {
  //     var path = '\\\\?\\c:\\aaaa\\bbbb';
  //     pathPlus.slash(path)
  //     .should.eql(path);
  // });

  // should convert paths with Unicode
  t.equal(
    pathPlus.slash('c:\\aaaa\\bbbb\\★'),
    'c:/aaaa/bbbb/★'
  );

  // should convert paths with Chinese
  t.equal(
    pathPlus.slash('c:\\aaaa\\bbbb\\你好'),
    'c:/aaaa/bbbb/你好'
  );

  t.end();
});

tap.test('pathPlus.stripExt', t => {
  t.equal(
    pathPlus.stripExt('foo/bar/foobar.sprite'),
    'foo/bar/foobar'
  );

  t.equal(
    pathPlus.stripExt('foo/bar/foobar'),
    'foo/bar/foobar'
  );

  t.equal(
    pathPlus.stripExt('foo/bar/foobar.sprite.foo'),
    'foo/bar/foobar.sprite'
  );

  t.equal(
    pathPlus.stripExt('foo/bar/foobar.png/hello.sprite'),
    'foo/bar/foobar.png/hello'
  );

  t.end();
});
