module.exports = function(grunt) {
  'use strict';

  var _ = require('lodash');

  var pkg = require('lodash-cli/package.json'),
      bin = pkg.bin.lodash,
      builder = require.resolve('lodash-cli/' + bin);

  var customOptions = ['modifier', 'modularize', 'flags', 'shortFlags'];

  var omitCustom = _.partialRight(_.omit, function(value, key) {
    return _.contains(customOptions, key);
  });

  var push = Array.prototype.push;

  /*--------------------------------------------------------------------------*/

  /** Register the task with Grunt */
  grunt.registerMultiTask('lodash', 'Builds a customized lodash', function() {
    var done = this.async();

    var options = this.options({
      'modifier': '',
      'flags': [],
      'shortFlags': []
    });

    var args = _.map(omitCustom(options), function(value, key) {
      if (_.isArray(value)) {
        value = value.join(',');
      }
      return key + '=' + value;
    });

    var flags = _.map(options.flags, function(flag) {
      return flag.replace(/^(?:--)?/, '--');
    });

    var shortFlags = _.map(options.shortFlags, function(flag) {
      return flag.replace(/^(?:-)?/, '-');
    });

    var spawnArgs = [builder];
    if (options.modularize) {
      spawnArgs.push('modularize');
    }
    if (options.modifier) {
      push.apply(spawnArgs, [].concat(options.modifier));
    }
    spawnArgs = spawnArgs.concat(args, flags, shortFlags, '--output', this.files[0].dest);

    grunt.verbose.writeln('lodash-cli version: ' + pkg.version);
    grunt.verbose.writeln('Build arguments: ' + spawnArgs.slice(1).join(' '));

    grunt.util.spawn({
      'cmd': 'node',
      'args': spawnArgs
    }, function(error, data) {
      if (error) {
        grunt.log.error(error.toString());
        done(error);
      }
      grunt.verbose.write(data.toString());
      done();
    });
  });
};
