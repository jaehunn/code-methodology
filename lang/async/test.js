const log = console.log;

function a(cb) {
  console.log("a");

  //   setTimeout(cb, 0);
  cb();
}

function b() {
  console.log("b");
}

function c(cb) {
  console.log("c");
}

function d() {
  console.log("d");
}

function e() {
  console.log("e");
}

function f() {
  console.log("f");
}

a(function () {
  b();

  c(function () {
    d();
  });

  e();
});

f();
