module.exports = function (grunt) {
	var today = grunt.template.today("yyyy-mm-dd HH:MM:ss");
	var timestamp = grunt.template.today("mmddHHMM");

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
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
				banner: '/* @date:' + today + ' */\n',
				mangle: false
			},
			ttk: {
				files: [
					{
						expand: true,
						cwd: 'dist/ttk_sogo_extend/js/login/',
						src: '*.js',
						dest: 'dist/ttk_sogo_extend/js/login/'
					},
					{
						expand: true,
						cwd: 'dist/ttk_sogo_extend/js/',
						src: '**/*.js',
						dest: 'dist/ttk_sogo_extend/js/'
					}
				]
			}
		},

		replace: {
			sogo: {
				options: {
					patterns: [
						{
							match: /chrome\./g,
							replacement: function () {
								return 'sogouExplorer.'; // replaces "foo" to "bar"
							}
						}
					]
				},
				files: [
					{expand: true, flatten: true, src: ['dist/ttk_sogo_extend/js/background.js'], dest: 'dist/ttk_sogo_extend/js/'},
					{expand: true, flatten: true, src: ['dist/ttk_sogo_extend/js/content.js'], dest: 'dist/ttk_sogo_extend/js/'}
				]
			},
		},
		cssmin: {
			options: {
				banner: '/* @date:' + today + ' */'
			},
			minify: {
				expand: true,
				cwd: 'dist/ttk_sogo_extend/css/',
				src: ['*.css'],
				dest: 'dist/ttk_sogo_extend/css/',
				ext: '.css'
			}
		},
		copy: {
			ttk: {
				files: [

					{expand: true, cwd: 'ttk_extend/', src: ['**/*', '!manifest.json'], dest: 'dist/ttk_sogo_extend/'}
				]
			}
		},
		clean: {
			base: {
				src: ['copy', 'build', 'dist/ttk_sogo_extend']
			}
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	grunt.loadNpmTasks('grunt-contrib-cssmin');

	//淘同款入口
	grunt.registerTask('ttk', 'ttk extend', function () {
		//grunt.task.run('jshint:ttk');
		grunt.task.run('clean');

		grunt.task.run('copy:ttk');
		grunt.task.run('uglify:ttk');
		grunt.task.run('cssmin');
		grunt.task.run('replace:sogo');

	});

	grunt.registerTask('sogo', 'ttk extend', function () {
		grunt.task.run('replace:sogo');
	});

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};