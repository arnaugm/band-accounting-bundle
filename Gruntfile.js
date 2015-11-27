module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['bower_components/jquery/dist/jquery.min.js'],
            dest: 'web/vendor/jquery/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bower_components/jquery-ui/jquery-ui.min.js'],
            dest: 'web/vendor/jquery-ui/'
          },
          {
            expand: true,
            cwd: 'bower_components/jquery-ui/themes/blitzer/',
            src: ['**'],
            dest: 'web/vendor/jquery-ui/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};