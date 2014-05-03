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
            'public-src/js/**/*.js'
          ]
        }
      },
      refined: {
        files: {
          src: [
            'public/js/**/*.js'
          ]
        }
      }
    },

    nodeunit: {
      files: ['test/**/*.js'],
    },

    watch: {
      dev: {
        files: [
          'package.json',
          '.jshintrc',
          'gruntfile.js',
          'routes/**/*.js',
          'public-src/js/**/*.js'
        ],
        tasks: ['default'],
        options: {
          livereload: 9999,
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

  grunt.registerTask('test', ['jsonlint','jshint:raw', 'jshint:refined', 'nodeunit']);
  grunt.registerTask('doc', ['yuidoc', 'gh-pages', 'copy:docplaceholder']);
  grunt.registerTask('default', ['jsonlint', 'jshint:raw', 'doc', 'jshint:refined']);

};