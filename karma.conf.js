module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["./algorithm/basic/sort/Sort.js", "./algorithm/basic/sort/test/Sort.test.js"],
    autoWatch: true,
    browsers: ["Chrome"],
  });
};
