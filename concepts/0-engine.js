const log = console.log;
const clear = console.clear;

// 1. Engine
{
  // how works in browser?
  function foo() {
    setTimeout(() => {
      log("callback");
    }, 100);

    log("foo");
  }

  function bar() {
    log("bar");
  }

  foo();
  bar();
}

// 2. Execution Context(= EC)
// @see https://poiemaweb.com/js-execution-context
{
  var x = "x";

  function foo() {
    var y = "y";

    function bar() {
      var z = "z";
      log(x + y + z);
    }

    bar();
  }

  foo();
}
