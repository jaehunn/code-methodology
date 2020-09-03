// Karma configuration
// Generated on Thu Sep 03 2020 17:33:12 GMT+0900 (GMT+09:00)

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    basePath: "./sort",
    files: ["Sort.js", "test/Sort.test.js"],
    autoWatch: true,
    browsers: ["Chrome"],
  });
};
