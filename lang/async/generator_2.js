const log = console.log;
const clear = console.clear;

// https://jeonghwan-kim.github.io/2016/12/15/coroutine.html
{
  function* f() {
    var x = yield "hello world";

    yield x.toLowerCase();
  }

  var it = f();

  it.next().value; // hello world

  try {
    it.next(42);
  } catch (e) {
    log(e);
  }
}

{
  function* f() {
    var x = yield "hello world";

    console.log(x);
  }

  var it = f();
  it.next();

  try {
    it.throw("error");
  } catch (e) {
    log(e);
  }
}
