'use strict';

var _ = require('lodash'),
    semver = require('semver');

var pkg = require('lodash-cli/package.json');

/** Project configuration */
var config = module.exports = {
  'badModifiers': [
    'blunderscore'
  ],
  'categories': [
    'arrays',
    'chaining',
    'collections',
    'functions',
    'objects',
    'utilities'
  ],
  'exports': [
    'amd',
    'commonjs',
    'global',
    'node',
    'none'
  ],
  'iifes': [
    '!function(window,undefined){%output%}(this)'
  ],
  'methods': [
    'assign',
    'each',
    'value'
  ],
  'modifiers': [
    'modern',
    'strict'
  ],
  'modularize': [
    'amd',
    'node'
  ],
  'moduleIds': [
    'underscore'
  ],
  'settings': [
    '{interpolate:/\{\{([\s\S]+?)\}\}/g}'
  ],
  'sourceMapFlags': [
    '--source-map',
    'source-map'
  ],
  'stdoutFlags': [
    '--stdout',
    'stdout'
  ],
  'stdoutShortFlags': [
    '-c',
    'c'
  ],
  'templates': [
    './test/fixtures/template/*.jst',
    './test/fixtures/template/*.tpl'
  ]
};

config.lodash = {};

config.clean = {
  'test': ['tmp/']
};

config.jshint = {
  'files': ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'],
  'options': {
    'jshintrc': '.jshintrc'
  }
};

config.nodeunit = {
  'test': ['test/**/*_test.js']
};

config.watch = {
  'scripts': {
    'files': '<%= jshint.files %>',
    'tasks': 'default',
    'options': {
      'interrupt': true
    }
  }
};

/*----------------------------------------------------------------------------*/

// flags changed between 2.x and 3.0
// the `backbone`, `csp`, `legacy`, `mobile` and `underscore` modifiers were only available before 3.0.0
if (semver.lt(pkg.version, '3.0.0')) {
  config.debugFlags = [
    '--debug',
    'debug'
  ];
  config.debugShortFlags = [
    '-d',
    'd'
  ];
  config.minifyFlags = [
    '--minify',
    'minify'
  ];
  config.minifyShortFlags = [
    '-m',
    'm'
  ];
  config.sourceMapShortFlags = [
    '-p',
    'p'
  ];
  config.modifiers.push(
    'backbone',
    'csp',
    'legacy',
    'mobile',
    'underscore'
  );
}

// flags changed between 2.x and 3.0
// the `compat` modifier was introduced in 3.0.0
// the `es` export for modularize was introduced in 3.0.0
if (semver.gte(pkg.version, '3.0.0')) {
  config.debugFlags = [
    '--development',
    'development'
  ];
  config.debugShortFlags = [
    '-d',
    'd'
  ];
  config.minifyFlags = [
    '--production',
    'production'
  ];
  config.minifyShortFlags = [
    '-p',
    'p'
  ];
  config.sourceMapShortFlags = [
    '-m',
    'm'
  ];
  config.modifiers.push('compat');
  config.modularize.push('es');
}

/*----------------------------------------------------------------------------*/

// the `modularize` command was introduced in 2.0.0
if (semver.gte(pkg.version, '2.0.0')) {
  config.modularize.forEach(function(exp) {
    var testName = 'modularize_' + exp;
    config.lodash[testName] = {
      'dest': 'tmp/' + testName,
      'options': {
        'exports': exp,
        'modularize': true
      }
    };
  });

  config.lodash['modularize_npm'] = {
    'dest': 'tmp/modularize_npm',
    'options': {
      'exports': 'npm',
      'modularize': true
    }
  };

  config.lodash['modularize_amd_default'] = {
    'dest': 'tmp/modularize_amd_default',
    'options': {
      'modularize': true
    }
  };
}

/*----------------------------------------------------------------------------*/

config.modifiers.concat(config.badModifiers).forEach(function(modifier) {
  config.lodash[modifier] = {
    'dest': 'tmp/' + modifier + '/lodash.js',
    'options': {
      'modifier': modifier,
      'shortFlags': ['d']
    }
  };
});

config.categories.forEach(function(category) {
  config.lodash[category] = {
    'dest': 'tmp/' + category + '/lodash.js',
    'options': {
      'category': category,
      'shortFlags': ['d']
    }
  };
});

config.exports.forEach(function(exp) {
  config.lodash[exp] = {
    'dest': 'tmp/' + exp + '/lodash.js',
    'options': {
      'exports': exp,
      'shortFlags': ['d']
    }
  };
});

config.iifes.forEach(function(iife, index) {
  var testName = 'iife' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'iife': iife,
      'shortFlags': ['d']
    }
  };
});

config.templates.forEach(function(template, index) {
  var testName = 'template' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/templates.js',
    'options': {
      'template': template,
      'shortFlags': ['d']
    }
  };
});

config.methods.forEach(function(methodName) {
  var include = 'include_' + methodName;
  config.lodash[include] = {
    'dest': 'tmp/' + include + '/lodash.js',
    'options': {
      'include': methodName,
      'shortFlags': ['d']
    }
  };

  var plus = 'plus_' + methodName;
  config.lodash[plus] = {
    'dest': 'tmp/' + plus + '/lodash.js',
    'options': {
      'plus': methodName,
      'shortFlags': ['d']
    }
  };

  var minus = 'minus_' + methodName;
  config.lodash[minus] = {
    'dest': 'tmp/' + minus + '/lodash.js',
    'options': {
      'minus': methodName,
      'shortFlags': ['d']
    }
  };
});

config.settings.forEach(function(setting, index) {
  var testName = 'settings' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'settings': setting,
      'shortFlags': ['d']
    }
  };
});

config.moduleIds.forEach(function(moduleId) {
  var testName = 'moduleId_' + moduleId;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'moduleId': moduleId,
      'shortFlags': ['d']
    }
  };
});

config.stdoutFlags.forEach(function(flag, index) {
  var testName = 'stdoutFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'flags': [flag]
    }
  };
});

config.stdoutShortFlags.forEach(function(flag, index) {
  var testName = 'stdoutShortFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'shortFlags': [flag]
    }
  };
});

config.debugFlags.forEach(function(flag, index) {
  var testName = 'debugFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'flags': [flag]
    }
  };
});

config.debugShortFlags.forEach(function(flag, index) {
  var testName = 'debugShortFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'shortFlags': [flag]
    }
  };
});

config.minifyFlags.forEach(function(flag, index) {
  var testName = 'minifyFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'flags': [flag]
    }
  };
});

config.minifyShortFlags.forEach(function(flag, index) {
  var testName = 'minifyShortFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'shortFlags': [flag]
    }
  };
});

config.sourceMapFlags.forEach(function(flag, index) {
  var testName = 'sourceMapFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'flags': [flag]
    }
  };
});

config.sourceMapShortFlags.forEach(function(flag, index) {
  var testName = 'sourceMapShortFlag' + index;
  config.lodash[testName] = {
    'dest': 'tmp/' + testName + '/lodash.js',
    'options': {
      'shortFlags': [flag]
    }
  };
});
