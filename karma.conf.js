// Karma configuration
// Generated on Sat Sep 05 2020 22:05:22 GMT+0900 (GMT+09:00)

module.exports = function (config) {
  config.set({
    frameworks: ["browserify", "jasmine"],
    plugins: ["karma-jasmine", "karma-chrome-launcher", "karma-browserify"],
    preprocessors: {
      "lib/sort/test.js": ["browserify"],
    },
    files: ["lib/sort/test.js"],
    autoWatch: true,
    browsers: ["Chrome"],
  });
};
