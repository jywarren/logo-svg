module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options : {
                livereload: true
            },
            source: {
                files: [
                    'src/*.js',
                    'src/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: [ 'build:js' ]
            }
        },

        concat: {
            dist: {
                src: [
                    'src/Class.js',
                    'src/LogoSvg.Parser.js',
                    'src/LogoSvg.Block.js'
                ],
                dest: 'dist/logo-svg.js',
            }
        }
    });

    /* Default (development): Watch files and build on change. */
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        'concat:dist'
    ]);

};
