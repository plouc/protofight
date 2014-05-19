'use strict';

var reactify = require('reactify');
var uglify   = require('uglify-js');
var glob     = require('glob');
var fs       = require('fs');
var path     = require('path');

(function () {

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
                },
                prod: {
                    files: {
                        'web/css/protofight.css': 'sass/protofight.scss'
                    },
                    options: {
                        loadPath: '.',
                        style:    'compressed'
                    }
                }
            },
            watch: {
                sass: {
                    files: ['**/*.scss'],
                    tasks: ['collect-nodes-sass', 'sass:dev']
                },
                browserify: {
                    files: [
                        'web/js/**/*.js',
                        'web/js/**/*.jsx',
                        '!web/js/bundle.js'
                    ],
                    tasks: ['browserify2:dev']
                }
            },
            browserify2: {
                dev: {
                    entry:   './web/js/App.js',
                    compile: './web/js/bundle.js',
                    debug:   false,
                    beforeHook: function (bundle){
                        bundle.transform(reactify)
                    }
                },
                prod: {
                    entry:   './web/js/App.js',
                    compile: './web/js/bundle.js',
                    debug:   false,
                    beforeHook: function (bundle){
                        bundle.transform(reactify)
                    },
                    afterHook: function (src){
                        var result = uglify.minify(src, {
                            fromString: true
                        });

                        return result.code;
                    }
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-browserify2');

        grunt.option('force', false);

        grunt.registerTask('collect-nodes-sass', function () {
            var files   = glob.sync('web/js/nodes/*/sass/node.scss');
            var imports = [];
            files.forEach(function (file) {
                imports.push('@import "' + file + '";');
            });

            var fs = require('fs');
            fs.writeFileSync('sass/_nodes.scss', imports.join("\n"));
        });

        grunt.registerTask('default', function () {
            return grunt.task.run([
                'sass',
                'browserify2:dev'
            ]);
        });
    };
}());
