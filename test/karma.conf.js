// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
    // external js
    'libs/jquery/jquery-1.11.2.min.js',
    'libs/angular/angular.js',
	  'libs/angular/angular-translate.min.js',
	  'libs/angular/angular-translate-loader-static-files.min.js',
    'libs/echarts/echarts-all.js',

    // want to be tested 
    'src/**/*.js',

    // test external js
    'test/libs/angular-mocks.js',
    'test/libs/jasmine-jquery.js',

    // test js
	   'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    reporters: ['progress', 'junit', 'coverage'],
    junitReporter: {
      // type : 'html',
      outputFile: 'test/report/unit_test_result.xml',
      suite: ''
    },
    preprocessors: {
	   'src/**/*.js': 'coverage'
    },
    coverageReporter: {
      //type : 'html',
      type: 'cobertura',
      dir: 'test/report/coverage/'
    },
    // web server port
    port: 9876,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

     plugins : [
      'karma-jasmine',
      'karma-chrome-launcher',
	    'karma-junit-reporter',
	    'karma-coverage'],

    captureTimeout: 50000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true

  });
};