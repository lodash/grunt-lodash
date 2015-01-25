'use strict';

var path = require('path');

var _ = require('lodash'),
    grunt = require('grunt');

var config = require('../config'),
    pkg = require('lodash-cli/package.json');

var nodeunit = exports.nodeunit = {};

function tmpPath(subdir) {
  return path.join('tmp', subdir, 'lodash.js');
}

/*----------------------------------------------------------------------------*/

config.modifiers.forEach(function(modifier) {
  nodeunit[modifier] = function(test) {
    test.expect(2);

    var filePath = tmpPath(modifier),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + modifier) > -1, 'should be built with custom modifier');

    test.done();
  };
});

config.badModifiers.forEach(function(modifier) {
  nodeunit[modifier] = function(test) {
    test.expect(1);

    var filePath = tmpPath(modifier),
        notExists = !grunt.file.exists(filePath);

    test.ok(notExists, 'should not produce a custom build');

    test.done();
  };
});

config.categories.forEach(function(category) {
  nodeunit[category] = function(test) {
    test.expect(2);

    var filePath = tmpPath(category),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash category="' + category +'"') > -1, 'should be built with the custom category');

    test.done();
  };
});

config.exports.forEach(function(exp) {
  nodeunit[exp] = function(test) {
    test.expect(2);

    var filePath = tmpPath(exp),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash exports="' + exp + '"') > -1, 'should be built with the custom exports');

    test.done();
  };
});

config.iifes.forEach(function(iife, index) {
  var testName = 'iife' + index;
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash iife="' + iife + '"') > -1, 'should be built with the custom iife');

    test.done();
  };
});

config.templates.forEach(function(template, index) {
  var testName = 'template' + index;
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = 'tmp/' + testName + '/templates.js',
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a built template JS file');

    var templates = require('../' + filePath),
        keys = Object.keys(_.omit(templates, 'templates'));

    test.ok(keys.length > 0, 'should attach template names to the templates object');

    test.done();
  };
});

config.methods.forEach(function(methodName) {
  var include = 'include_' + methodName;
  nodeunit[include] = function(test) {
    test.expect(2);

    var filePath = tmpPath(include),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash include="' + methodName + '"') > -1, 'should be built with the method included');

    test.done();
  };

  var plus = 'plus_' + methodName;
  nodeunit[plus] = function(test) {
    test.expect(2);

    var filePath = tmpPath(plus),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash plus="' + methodName + '"') > -1, 'should be built with the method included');

    test.done();
  };

  var minus = 'minus_' + methodName;
  nodeunit[minus] = function(test) {
    test.expect(2);

    var filePath = tmpPath(minus),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash minus="' + methodName + '"') > -1, 'should be built with the method included');

    test.done();
  };
});

config.settings.forEach(function(setting, index) {
  var testName = 'settings' + index;
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash settings="' + setting + '"') > -1, 'should be built with the custom settings');

    test.done();
  };
});

config.moduleIds.forEach(function(moduleId) {
  var testName = 'moduleId_' + moduleId;
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash moduleId="' + moduleId + '"') > -1, 'should be built with the custom moduleId');

    test.done();
  };
});

config.stdoutFlags.forEach(function(flag, index) {
  var testName = 'stdoutFlag' + index;
  nodeunit[testName] = function(test) {
    test.expect(1);

    var filePath = tmpPath(testName),
        notExists = !grunt.file.exists(filePath);

    test.ok(notExists, 'should not produce a custom build on the filesystem');

    test.done();
  };
});

config.stdoutShortFlags.forEach(function(flag, index) {
  var testName = 'stdoutShortFlag' + index;
  nodeunit[testName] = function(test) {
    test.expect(1);

    var filePath = tmpPath(testName),
        notExists = !grunt.file.exists(filePath);

    test.ok(notExists, 'should not produce a custom build on the filesystem');

    test.done();
  };
});

config.debugFlags.forEach(function(flag, index) {
  var testName = 'debugFlag' + index;
  flag = '--' + flag.replace('--', '');
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + flag) > -1, 'should be built with the ' + flag + ' flag');

    test.done();
  };
});

config.debugShortFlags.forEach(function(flag, index) {
  var testName = 'debugShortFlag' + index;
  flag = '-' + flag.replace('-', '');
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + flag) > -1, 'should be built with the ' + flag + ' flag');

    test.done();
  };
});

config.minifyFlags.forEach(function(flag, index) {
  var testName = 'minifyFlag' + index;
  flag = '--' + flag.replace('--', '');
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + flag) > -1, 'should be built with the ' + flag + ' flag');

    test.done();
  };
});

config.minifyShortFlags.forEach(function(flag, index) {
  var testName = 'minifyShortFlag' + index;
  flag = '-' + flag.replace('-', '');
  nodeunit[testName] = function(test) {
    test.expect(2);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + flag) > -1, 'should be built with the ' + flag + ' flag');

    test.done();
  };
});

config.sourceMapFlags.forEach(function(flag, index) {
  var testName = 'sourceMapFlag' + index;
  flag = '--' + flag.replace('--', '');
  nodeunit[testName] = function(test) {
    test.expect(3);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + flag) > -1, 'should be built with the ' + flag + ' flag');

    filePath = filePath.replace(/\.js$/, '.min.map');
    exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a source-map file');

    test.done();
  };
});

config.sourceMapShortFlags.forEach(function(flag, index) {
  var testName = 'sourceMapShortFlag' + index;
  flag = '-' + flag.replace('-', '');
  nodeunit[testName] = function(test) {
    test.expect(3);

    var filePath = tmpPath(testName),
        exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a custom build');

    var source = grunt.file.read(filePath);

    test.ok(source.indexOf('lodash ' + flag) > -1, 'should be built with the ' + flag + ' flag');

    filePath = filePath.replace(/\.js$/, '.min.map');
    exists = grunt.file.exists(filePath);

    test.ok(exists, 'should produce a source-map file');

    test.done();
  };
});
