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
  //   if (window.DEBUG) {
  //     // ...
  //   }

  //   if (window.atob) {
  //     // ...
  //   }

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

clear();

// array
{
  let arr = [1, "2", [3]];

  log(arr.length); // 3

  delete arr[2];
  log(arr.length); // 3

  arr["foo"] = 4;
  log(arr.length); // 3

  arr[4] = 4;
  log(arr.length); // 5

  // array-like -> array
  {
    // Array.prototype.slice.call()
    function foo() {
      var arr = Array.prototype.slice.call(arguments);
    }

    function bar() {
      // Array.from()
      var arr2 = Array.from(arguments);
    }
  }

  // sparse
}

// string(= array-like)
{
  // available: length, indexOf(), concat()

  let a = "foo";
  let b = ["f", "o", "o"];

  a[1] = "0";
  b[1] = "0";

  log(a); // foo, immutable
  log(b); // [f, 0, o], mutable

  let c = a.toUpperCase();
  log(a === c); // false

  b.push("!");
  log(b); // [f, 0, o, !]

  // hacky
  // a.reverse() -> error
  let d = a.split("").reverse().join("");
  log(d); // oof
}

clear();

// number
{
  log(42.0 === 42); // true
  // log(0.42 === 0.42); // true
  // log(42. === 42); // true

  let a = 5e10;
  log(a, a.toExponential()); // 50000000000 5e+10

  let b = 42.59;

  // Number is wrapper, can auto boxing
  log(b.toFixed(1)); // 42.6
  log(b.toFixed(2)); // 42.59

  log(b.toPrecision(1)); // 4 -> 4e+1(40)
  log(b.toPrecision(2)); // 42 -> 43
  log(b.toPrecision(3)); // 42.5 -> 42.6

  log(typeof b.toFixed(1) === "string"); // true
  log(typeof b.toPrecision(1) === "string"); // true

  // hexa
  log(0xf3); // 243 (15 * 16^1 + 3 * 16^0)
  log(0xf3); // 243

  // octal
  log(0o363); //243 (3 * 8^2 + 6 * 8^1 + 3 * 8^0)
  // bad, 0O363

  // machine epsilon(2^-52)
  log(0.1 + 0.2 === 0.3); // false

  function toEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
  }

  log(toEqual(0.1 + 0.2, 0.3)); // true

  log(Number.MIN_VALUE, Number.MAX_VALUE); // 5e-324 1.7976931348623157e+308
  log(
    Number.MIN_SAFE_INTEGER === -(Math.pow(2, 53) - 1),
    Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
  ); // true true

  let c = 42.0;
  let d = 0.42;
  log(Number.isInteger(c)); // true
  log(Number.isInteger(d)); // false
  log(typeof c === "number" && c % 1 === 0); // true

  let e = Math.pow(2, 53);
  let f = 2 ** 53;

  log(e === f); // true
  log(Number.isSafeInteger(e)); // false
  log(Number.isSafeInteger(f - 1)); // true
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
