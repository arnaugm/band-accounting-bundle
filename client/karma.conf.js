//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '*.js',
      '*-spec.js'
    ],

    preprocessors: {
      'bower_components/angular/angular.js': ['webpack', 'sourcemap'],
      'bower_components/angular-route/angular-route.js': ['webpack', 'sourcemap'],
      'bower_components/angular-mocks/angular-mocks.js': ['webpack', 'sourcemap'],
      '*.js': ['webpack', 'sourcemap'],
      '*-spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map'
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-webpack'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
