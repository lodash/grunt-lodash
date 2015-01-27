'use strict';

var path = require('path');

var grunt = require('grunt'),
    semver = require('semver');

var config = require('../config'),
    pkg = require('lodash-cli/package.json');

var nodeunit = exports.nodeunit = {};

var ignoreFiles = [
  '_',
  'all',
  'any',
  'chain',
  'collect',
  'detect',
  'drop',
  'each',
  'eachRight',
  'extend',
  'findWhere',
  'foldl',
  'foldr',
  'head',
  'include',
  'inject',
  'methods',
  'noConflict',
  'object',
  'runInContext',
  'select',
  'tail',
  'tap',
  'take',
  'unique',
  'unzip',
  'value'
];

var modularizeFiles = {
  '2.4.2': [
    'arrays/',
    'chaining/',
    'collections/',
    'functions/',
    'internals/',
    'objects/',
    'utilities/',
    'arrays.js',
    'chaining.js',
    'collections.js',
    'functions.js',
    'objects.js',
    'support.js',
    'utilities.js'
  ],
  '3.0.0': [
    'array/',
    'chain/',
    'collection/',
    'date/',
    'function/',
    'internal/',
    'lang/',
    'number/',
    'object/',
    'string/',
    'utility/',
    'array.js',
    'chain.js',
    'collection.js',
    'date.js',
    'function.js',
    'lang.js',
    'number.js',
    'object.js',
    'string.js',
    'support.js',
    'utility.js'
  ]
};

var npmModularizeFiles = {
  '2.4.2': [
    '_arraypool', '_basebind', '_baseclone', '_basecreate', '_basecreatecallback',
    '_basecreatewrapper', '_basedifference', '_baseeach', '_baseflatten',
    '_baseindexof', '_baseisequal', '_basemerge', '_baserandom', '_baseuniq',
    '_cacheindexof', '_cachepush', '_charatcallback', '_compareascending',
    '_createaggregator', '_createcache', '_createiterator', '_createwrapper',
    '_defaultsiteratoroptions', '_eachiteratoroptions', '_escapehtmlchar',
    '_escapestringchar', '_forowniteratoroptions', '_getarray', '_getobject',
    '_htmlescapes', '_htmlunescapes', '_indicatorobject', '_isnative', '_isnode',
    '_iteratortemplate', '_keyprefix', '_largearraysize', '_lodashwrapper',
    '_maxpoolsize', '_objectpool', '_objecttypes', '_reescapedhtml', '_reinterpolate',
    '_releasearray', '_releaseobject', '_reunescapedhtml', '_setbinddata',
    '_shimisplainobject', '_shimkeys', '_slice', '_unescapehtmlchar'
  ],
  '3.0.0': [
    '_arraycopy', '_arrayeach', '_arrayevery', '_arrayfilter', '_arraymap',
    '_arraymax', '_arraymin', '_baseassign', '_baseat', '_basecallback', '_baseclone',
    '_basecompareascending', '_basecopy', '_basecreate', '_basedelay', '_basedifference',
    '_baseeach', '_baseeachright', '_basefilter', '_basefind', '_baseflatten', '_basefor',
    '_baseforright', '_basefunctions', '_baseindexof', '_baseisequal', '_baseproperty',
    '_baserandom', '_basereduce', '_baseslice', '_basesortby', '_basetostring',
    '_baseuniq', '_basevalues', '_binaryindex', '_binaryindexby', '_bindcallback',
    '_cacheindexof', '_charsleftindex', '_charsrightindex', '_createaggregator',
    '_createassigner', '_createcache', '_createcompounder', '_createextremum',
    '_createpad', '_createwrapper', '_isiterateecall', '_pickbyarray', '_pickbycallback',
    '_replaceholders', '_toiterable', '_trimmedleftindex', '_trimmedrightindex'
  ]
};

function tmpPath(subdir, file) {
  return path.join('tmp', subdir, file).toLowerCase();
}

/*----------------------------------------------------------------------------*/

// the `modularize` command was introduced in 2.0.0
if (semver.gte(pkg.version, '2.0.0')) {

  // add exposed methods to `npmModularizeFiles`
  (function() {
    var files = npmModularizeFiles[pkg.version],
        cli = path.dirname(require.resolve('lodash-cli/package.json')),
        lodash;

    if (semver.gte(pkg.version, '3.0.0')) {
      lodash = require(path.join(cli, 'node_modules/lodash-compat/index.js'));
    } else {
      lodash = require(path.join(cli, 'node_modules/lodash/dist/lodash.compat.js'));
    }

    lodash(lodash)
      .functions()
      .difference(ignoreFiles)
      .each(function(basename) {
        files.push(basename.toLowerCase());
      });

    if (semver.gt(pkg.version, '2.0.0')) {
      lodash.each(files, function(basename, index) {
        files[index] = 'lodash.' + basename;
      });
    }
  }());

  /*--------------------------------------------------------------------------*/

  config.modularize.forEach(function(exp) {
    var testName = 'modularize_' + exp;
    nodeunit[testName] = function(test) {
      var files = modularizeFiles[pkg.version].concat(
        pkg.version == '2.0.0'
          ? 'lodash.js'
          : (exp == 'amd'
              ? 'main.js'
              : (exp == 'node' ? 'index.js' : 'lodash.js')
            )
      );

      test.expect(files.length);

      files.forEach(function(file) {
        var filePath = tmpPath(testName, file),
            exists = grunt.file.exists(filePath);

        test.ok(exists, 'should produce ' + filePath);

        // TODO: check header when lodash adds the CLI options passed
        // var source = grunt.file.read(filePath);
        // test.ok(source.indexOf('lodash modularize exports="' + exp + '"') > -1, 'should be built with the custom exports');
      });

      test.done();
    };
  });

  nodeunit['modularize_amd_default'] = function(test) {
    var files = modularizeFiles[pkg.version].concat(
      pkg.version == '2.0.0'
        ? 'lodash.js'
        : 'main.js'
    );

    test.expect(files.length);

    files.forEach(function(file) {
      var filePath = tmpPath('modularize_amd_default', file),
          exists = grunt.file.exists(filePath);

      test.ok(exists, 'should produce ' + filePath);

      // TODO: check header when lodash adds the CLI options passed
      // var source = grunt.file.read(filePath);
      // test.ok(source.indexOf('lodash modularize exports="amd"') > -1, 'should be built with the custom exports');
    });

    test.done();
  };

  nodeunit['modularize_npm'] = function(test) {
    var files = npmModularizeFiles[pkg.version];
    test.expect(files.length);

    files.forEach(function(file) {
      var filePath = tmpPath('modularize_npm', file),
          exists = grunt.file.exists(filePath);

      test.ok(exists, 'should produce ' + filePath);

      // TODO: check header when lodash adds the CLI options passed
      // var source = grunt.file.read(filePath);
      // test.ok(source.indexOf('lodash modularize exports="npm"') > -1, 'should be built with the custom exports');
    });

    test.done();
  };
}
