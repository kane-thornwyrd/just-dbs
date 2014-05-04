'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: grunt.file.readJSON('package.json').directories,
    conf: grunt.file.readJSON('package.json').config,

    copy: {
      docplaceholder: {
        src: '.git_placeholder',
        dest: 'doc/.git_placeholder'
      },
    },

    jshint: {
      options: {
        jshintrc: '<%= conf.jshintrc %>'
      },
      raw: {
        files: {
          src: [
            'package.json',
            'gruntfile.js',
            'routes/**/*.js',
            'public/js/src/**/*.js'
          ]
        }
      }
    },

    nodeunit: {
      files: ['test/**/*.js'],
    },

    watch: {
      serverside: {
        files: [
          'package.json',
          '.jshintrc',
          'gruntfile.js',
          'routes/**/*.js'
        ],
        tasks: ['default']
      },
      clientside: {
        files: [
          'public/js/src/**/*.js'
        ],
        tasks: ['default', 'requirejs:dev'],
        options: {
          livereload: 9999,
        }
      },
      test: {
        files: [
          'test/**/*.js'
        ],
        tasks: ['test']
      }
    },

    requirejs: {
      dist: {
        options: {
          baseUrl: '.',
          mainConfigFile: 'public/js/src/config.js',
          name: 'node_modules/almond/almond.js',
          out: 'public/js/app.js',
          include: ['public/js/src/main'],
          insertRequire: ['public/js/src/main'],
          wrap: true,
          preserveLicenseComments: false,
          done: function(done, output) {
            // var duplicates = require('rjs-build-analysis').duplicates(output);

            // if (duplicates.length > 0) {
            //   grunt.log.subhead('Duplicates found in requirejs build:');
            //   grunt.log.warn(duplicates);
            //   done(new Error('r.js built duplicate modules, please check the excludes option.'));
            // }
            grunt.log.oklns(output);

            done();
          }
        }
      },
      dev: {
        options: {
          baseUrl: '.',
          mainConfigFile: 'public/js/src/config.js',
          name: 'node_modules/almond/almond.js',
          out: 'public/js/app.js',
          include: ['public/js/src/main'],
          insertRequire: ['public/js/src/main'],
          wrap: true,
          optimize: 'none',
          done: function(done, output) {
            // var duplicates = require('rjs-build-analysis').duplicates(output);

            // if (duplicates.length > 0) {
            //   grunt.log.subhead('Duplicates found in requirejs build:');
            //   grunt.log.warn(duplicates);
            //   done(new Error('r.js built duplicate modules, please check the excludes option.'));
            // }
            grunt.log.oklns(output);

            done();
          }
        }
      }
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'public-src/js',
          outdir: 'doc',
          themedir: '<%= dirs.doctheme %>',
        }
      }
    },

    jsonlint: {
      package: {
        src: [ 'package.json' ]
      }
    },

    'gh-pages': {
      options: {
        base: 'doc'
      },
      src: ['**']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('test', ['jsonlint','jshint:raw', 'nodeunit']);
  grunt.registerTask('doc', ['yuidoc', 'gh-pages', 'copy:docplaceholder']);
  grunt.registerTask('default', ['jsonlint', 'jshint:raw']);

};