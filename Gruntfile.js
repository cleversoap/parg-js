module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({
        uglify: {
            parg : {
                options: {
                    sourceMap: true,
                    sourceMapName: 'parg.min.map',
                    preserveComments: 'some'
                },
                files: {
                    'parg.min.js': ['parg.js']
                }
            }
        },
        jasmine: {
            src: 'parg.js',
            options: {
                specs: 'test.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
