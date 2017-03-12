//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-resource/angular-resource.js',
      '../bower_components/angular-route/angular-route.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/angular-material/angular-material.js',
      '../bower_components/angular-animate/angular-animate.js',
      '../bower_components/angular-aria/angular-aria.js',
      '**/*.js',
      '**/*.html',
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
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    reporters: ['mocha', 'coverage'],

    preprocessors: {
      '**/!(*spec).js': ['coverage'],
      '**/*.html': ['ng-html2js']
    },

    coverageReporter: {
      type : 'html',
      dir : '../coverage/',
      subdir: '.'
    },

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path, match anything followed by a "/"
      stripPrefix: '(.*)\/+',
      // prepend this to the file path
      prependPrefix: 'templates/',

      moduleName: 'templates'
    }

  });
};
