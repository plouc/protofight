(function () {
    'use strict';

    var path = require('path'),
        fs   = require('fs');

    module.exports = function (grunt) {
        require('time-grunt')(grunt);

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            sass: {
                dev: {
                    files: {
                        'web/css/protofight.css': 'sass/protofight.scss'
                    },
                    options: {
                        loadPath: '.'
                    }
                }
            },
            watch: {
                sass: {
                    files: ['**/*.scss'],
                    tasks: ['sass']
                },
                browserify: {
                    files: [
                        'web/js/**/*.js',
                        'web/js/**/*.jsx'
                    ],
                    tasks: ['browserify:dev']
                }
            },
            browserify: {
                options: {
                    debug:      true,
                    transform:  ['reactify'],
                    extensions: ['.jsx']
                },
                dev: {
                    options: {
                        alias: ['react:']  // Make React available externally for dev tools
                    },
                    src:  ['web/js/App.js'],
                    dest: 'web/js/bundle.js'
                },
                production: {
                    options: {
                        debug: false
                    },
                    src: '<%= browserify.dev.src %>',
                    dest: 'build/bundle.js'
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-browserify');

        grunt.option('force', false);

        grunt.registerTask('default', function () {
            return grunt.task.run([
                'sass',
                'browserify:dev'
            ]);
        });
    };
}());
