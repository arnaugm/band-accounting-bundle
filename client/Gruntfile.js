module.exports = function (grunt) {

  var publicFolder = '../Resources/public/';

  grunt.initConfig({
    html2js: {
      options: {
        module: 'templates'
      },
      main: {
        src: ['app/**/*.html'],
        dest: 'tmp/templates.js'
      }
    },

    concat: {
      options: {
        sourceMap: true
      },
      vendor: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-aria/angular-aria.js',
          'bower_components/angular-i18n/angular-locale_es-es.js',
          'bower_components/angular-material/angular-material.js',
          'bower_components/angular-resource/angular-resource.js'
        ],
        dest: publicFolder + 'js/vendor.js'
      },
      scripts: {
        src: ['app/**/!(*spec).js'],
        dest: publicFolder + 'js/scripts.js'
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['tmp/templates.js'],
            dest: '../Resources/public/js/'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/styles/**/*.css', 'bower_components/angular-material/angular-material.min.css'],
            dest: '../Resources/public/css/'
          }
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'app/**/!(*spec).js',
          'app/**/*.html',
          'app/styles/**/*.css'
        ],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task(s).
  grunt.registerTask('default', ['html2js', 'concat', 'copy']);

};
