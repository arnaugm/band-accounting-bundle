//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-resource/angular-resource.js',
      '../bower_components/angular-route/angular-route.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '**/*.js',
      '**/*-spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      '**/!(*spec).js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : '../coverage/',
      subdir: '.'
    },

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
