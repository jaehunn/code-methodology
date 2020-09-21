const log = console.log;

function spread(fn) {
  return Function.apply.bind(fn, null);
}

log(
  spread(function (x, y) {
    log(x, y);
  }).call(null, [1, 2])
);

function foo(x) {
  return x;
}

function bar(fn) {
  return Function.call.bind(fn, null);
}

log(bar(foo)("test"));
