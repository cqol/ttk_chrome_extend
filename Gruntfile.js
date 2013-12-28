module.exports = function(grunt) {
    var today = grunt.template.today("yyyy-mm-dd HH:MM:ss");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint:{
            options: {
                jshintrc: '.jshintrc'
            },

            ttk: {
                files: {
                    src: ['ttk_extend/js/*.js', 'ttk_extend/js/login/*.js', '!ttk_extend/js/lib/*.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '/* @date:' + today + ' */\n'
            },
            ttk: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/ttk_chrome_extend/js/login/',
                        src: '*.js',
                        dest: 'dist/ttk_chrome_extend/js/login/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/ttk_chrome_extend/js/',
                        src: '*.js',
                        dest: 'dist/ttk_chrome_extend/js/'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                banner: '/* @date:' + today + ' */'
            },
            minify: {
                expand: true,
                cwd: 'dist/ttk_chrome_extend/css/',
                src: ['*.css'],
                dest: 'dist/ttk_chrome_extend/css/',
                ext: '.css'
            }
        },
        copy: {
            ttk: {
                files: [

                    {expand: true, cwd: 'ttk_extend/', src: '**/*', dest: 'dist/ttk_chrome_extend/'}
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //淘同款入口
    grunt.registerTask('ttk', 'ttk extend', function() {
        //grunt.task.run('jshint:ttk');

        grunt.task.run('copy:ttk');
        grunt.task.run('uglify:ttk');
        grunt.task.run('cssmin');
    });

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};