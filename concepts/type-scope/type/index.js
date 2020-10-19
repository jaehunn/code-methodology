const log = console.log;
const clear = console.clear;

// typeof
{
  log(typeof undefined === "undefined");
  log(typeof true === "boolean");
  log(typeof 1 === "number");
  log(typeof "1" === "string");
  log(typeof { a: 1 } === "object");
  log(typeof Symbol() === "symbol");

  // null
  log(typeof null === "object"); // true

  let ø = null;
  log(!ø && typeof ø === "object"); // true

  // function
  log(typeof function () {} === "function"); // true

  // array
  log(typeof [1, 2] === "object"); // true

  // typeof return 'string'
  log(typeof typeof 2); // 'string'

  // empty vs. undeclared
  var a;
  log(typeof a); // undefined
  log(typeof b); // undefined

  // typeof b, not error -> 'type guard'
  if (typeof DEBUG !== "undefined") {
    log("Debugging Start");
  }

  if (typeof foo === "undefined") {
    // do not use 'var' -> hoisiting -> foo overlapping
    foo = function () {
      // ...
    };
  }

  // if (foo === 'undefined'), no foo -> error

  // 'window' global object -> no error (in browser)
  if (window.DEBUG) {
    // ...
  }

  if (window.atob) {
    // ...
  }

  // library variable check
  {
    function foo() {
      var helper =
        typeof bar !== "undefined"
          ? bar
          : function () {
              // ...
            };

      var val = helper();
    }
  }

  // DI pattern
  {
    // explicit
    function foo(bar) {
      var helper = bar || function () {};

      var val = helper();
    }
  }
}

// array
{
}

// string
{
}

// number
{
}

// null, undefined
{
}

// value vs. reference
{
}

// native

// coercion

// syntax
