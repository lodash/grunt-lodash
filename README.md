# grunt-lodash v0.3.0

A Grunt wrapper around [lodash-cli](https://npmjs.org/package/lodash-cli). 

Note: lodash-cli is a command line tool for Lo-Dash. Lo-Dash is a fork of the Underscore library. Underscore is a functional programming library for javascript. The Lo-Dash site is here: http://http://kitcambridge.be/blog/custom-builds-in-lo-dash-2-dot-0

## Getting Started

This plugin requires Grunt `~0.4.1`.
If you haven’t used [Grunt](http://gruntjs.com/) before, be sure to check out the [“Getting Started”](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you’re familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-lodash --save-dev
```

Once grunt-lodash has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lodash');
```

### Overview

In your project’s Gruntfile, add a section named `lodash` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({
  'lodash': {
    'build': {
      // output location
      'dest': 'build/lodash.build.js',
      'options': {
        // modifiers for prepared builds
        // backbone, legacy, modern, mobile, strict, underscore
        'modifier': 'backbone'
      }
    }
  }
});
```

As you might have guessed, this would produce the same output as:

```bash
lodash backbone -o build/lodash.build.js
```

Finally, include the `lodash` invocation in your desired build task:

```js
grunt.registerTask('build', [
  'clean:dist',
  'lodash'
]);
```

## Configuration options

For a more in-depth explanation of the build options head on over to the [lodash-cli documentation](http://lodash.com/custom-builds).

```js
'lodash': {
  'target': {
    // output location
    'dest': 'build/lodash.build.js'
  },
  'options': {
    // modifiers for prepared builds
    // backbone, legacy, modern, mobile, strict, underscore
    'modifier': 'backbone',
    'modularize': true,
    'category': ['collections', 'functions'],
    'exports': ['amd', 'commonjs', 'node'],
    'iife': '!function(window,undefined){%output%}(this)',
    'include': ['each', 'filter', 'map'],
    'minus': ['result', 'shuffle'],
    'plus': ['random', 'template'],
    'template': './*.jst',
    'settings': '{interpolate:/\\{\\{([\\s\\S]+?)\\}\\}/g}',
    'moduleId': 'underscore',
    // with or without the --
    // these are the only tested options,
    // as the others don't make sense to use here
    'flags': [
      '--stdout',
      'debug',
      '--minify',
      'source-map'
    ],
    // with or without the -
    // these are the only tested options,
    // as the others don't make sense to use here
    'shortFlags': [
      'c',
      '-d',
      'm',
      '-p'
    ]
  }
}
```

## Support

grunt-lodash has been tested in at least Node.js 0.8.19-0.10.7, 0.10.12, 0.10.16.<br>
**Note:** Node.js 0.10.8-0.10.11 [have](https://github.com/joyent/node/issues/5622) [bugs](https://github.com/joyent/node/issues/5688) preventing minified builds.

The full changelog for this release is available on our [wiki](https://github.com/lodash/grunt-lodash/wiki/Changelog).

## Author

| [![twitter/blainebublitz](http://gravatar.com/avatar/ac1c67fd906c9fecd823ce302283b4c1?s=70)](https://twitter.com/blainebublitz "Follow @BlaineBublitz on Twitter") |
|---|
| [Blaine Bublitz](http://www.iceddev.com/) |

## Contributors

| [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter") | [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter") | [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|---|---|
| [John-David Dalton](http://allyoucanleet.com/)| [Kit Cambridge](http://kitcambridge.be/) | [Mathias Bynens](http://mathiasbynens.be/) |
