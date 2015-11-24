module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy: {
            angular:{
                expand: true,
                cwd: 'node_modules/angular',
                src: [
                    'angular.min.js',
                    'angular.min.js.map'
                ],
                dest: 'server/public/vendors'
            },
            bootstrap:{
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css/',
                src: [
                    'bootstrap.min.css',
                    '.bootstrap.css.map'
                ],
                dest: 'server/public/vendors'
            },
            html: {
                expand: true,
                cwd: 'client/views',
                src: 'index.html',
                dest: 'server/public/assets/views'
            },
            style: {
                expand: true,
                cwd: 'client/styles',
                src: 'style.css',
                dest: 'server/public/assets/styles'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};