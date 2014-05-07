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
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.option('force', false);

        grunt.registerTask('default', function () {
            return grunt.task.run([
                'sass'
            ]);
        });
    };
}());
