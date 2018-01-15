module.exports = function(grunt) {
    var filename = "3dRudder-<%= pkg.version %>";    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: ['dist/'+filename+'.js'],
        browserify: {
            build: {
                src: 'src/index.js',
                dest: 'dist/'+filename+'.js',
                options: {
                    ignore: ['ws'],
                    browserifyOptions: {
                        standalone: 'Sdk3dRudder',
                    },
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['clean', 'browserify']);
};