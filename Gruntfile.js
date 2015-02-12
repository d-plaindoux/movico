'use strict';

module.exports = function(grunt) {
    
  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: ['Gruntfile_*.js'],
      },
      src: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
        dist: {
            files: {
                'build/movico-lang.js': './lib/movico.js',
            }
        },
        options: {
            alias: [
                './lib/movico.js:movico'
            ]
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
    
  // Tasks
  grunt.registerTask('package', ['jshint', 'browserify:dist' ]);
  grunt.registerTask('default', ['jshint', 'nodeunit']);
};

