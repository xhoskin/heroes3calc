// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      // zone.js
      // 'node_modules/zone.js/dist/zone.js',
      // 'node_modules/zone.js/dist/long-stack-trace-zone.js',
      // 'node_modules/zone.js/dist/proxy.js',
      // 'node_modules/zone.js/dist/sync-test.js',
      // 'node_modules/zone.js/dist/jasmine-patch.js',
      // 'node_modules/zone.js/dist/async-test.js',
      // 'node_modules/zone.js/dist/fake-async-test.js',
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
