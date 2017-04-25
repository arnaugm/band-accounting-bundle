module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['bower_components/angular/angular.min.js'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/vendor/angular/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bower_components/angular-animate/angular-animate.min.js'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/vendor/angular-animate/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bower_components/angular-aria/angular-aria.min.js'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/vendor/angular-aria/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bower_components/angular-i18n/angular-locale_es-es.js'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/vendor/angular-i18n/'
          },
          {
            expand: true,
            flatten: true,
            src: [
              'bower_components/angular-material/angular-material.min.js',
              'bower_components/angular-material/angular-material.min.css'
            ],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/vendor/angular-material/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bower_components/angular-resource/angular-resource.min.js'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/vendor/angular-resource/'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/**/!(*spec).js'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/js/'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/**/*.html'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/templates/'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/styles/**/*.css'],
            dest: '../src/RootDiamoons/BandAccountingBundle/Resources/public/css/'
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

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};
