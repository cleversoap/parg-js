module.exports = function (grunt) {
    'use strict';


    grunt.initConfig({
        jasmine: {
            src: 'parg.js',
            options: {
                specs: 'test/test-spec.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
};
