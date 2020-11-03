const log = console.log;
const clear = console.clear;

// 1. Type
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

  // NaN
  let g = 2 / "foo"; // NaN
  let h = 2 / "foo"; // NaN
  log(g === h); // false

  log(isNaN(g), isNaN(h)); // true, true

  let i = "bar";
  log(isNaN(i)); // true
  log(Number.isNaN(i)); // false

  log(Object.is(g, h)); // true

  // Infinity
  let j = 1 / 0; // infinity
  let k = -1 / 0; // -infinity

  log(j === Number.POSITIVE_INFINITY); // true
  log(k === Number.NEGATIVE_INFINITY); // true

  let l = Number.MAX_VALUE;
  log(l + l); // Infinity

  // ?
  log(Math.pow(2, 969) <= l); // true
  log(l <= Math.pow(2, 970)); // false
  log(Math.pow(2, 969) <= l <= Math.pow(2, 970)); // true

  log(l + Math.pow(2, 970)); // Infinity (close to Infinity: round up)
  log(l + Math.pow(2, 969)); // 1.7976931348623157e+308 (close to Math.MAX_VALUE: round down)

  log(j / k); // NaN
  log(10 / j); // 0

  // zero
  let m = 0 / -3; // -0

  log(m); // -0
  log(m.toString(), m + "", String(m), JSON.stringify(m)); // 0 0 0 0

  let n = "-0";
  log(+n, Number(n), JSON.parse(n)); // -0 -0 -0

  let o = 0;
  log(m == o, m === o); // true true
  log(o > m); // false

  function isNegZero(n) {
    n = Number(n);

    // divide zero -> infinity
    return n === 0 && 1 / n === -Infinity;
  }

  log(Object.is(o, m)); // false
}

clear();

// null, undefined
{
  // null = declare -> empty
  // undefined = undeclare
  // void ? -> return undefined
  let a = 10;

  log(void a, a); // undefined 10 (immutable)

  function foo() {
    return void setTimeout(function () {
      // ...
    }, 100);
  }

  // same foo
  function bar() {
    setTimeout(function () {}, 100);

    return;
  }
}

// value vs. reference
{
  let a = 1;
  let b = a;

  b += 1;
  log(a, b); // 1, 2

  let c = [1, 2, 3];
  let d = c;

  c.push(4);
  log(c, d); // [1 ,2 ,3, 4] [1, 2, 3, 4]

  // c -> [1, 2, 3, 4]
  // d -> [1, 2, 3, 4]
  // not c = [1, 2, 3, 4] / d = [1, 2, 3, 4]

  d = [4, 5, 6];
  log(c, d); // [1 ,2 ,3, 4] [4, 5, 6]

  function foo(arr) {
    arr.push(5);

    arr = [4, 5, 6];
    arr.push(7);

    log(arr); // [4, 5, 6, 7]
  }

  foo(c);

  log(c); // [1, 2, 3, 4, 5]

  // c -> [1, 2, 3, 4]
  // arr -> [4, 5, 6, 7]

  function bar(arr) {
    arr.length = 0; // mutable

    log(arr);
  }

  bar(c); // []
  log(c); // []

  // value(= primitive, scala)
  function baz(v) {
    v += 1; // 'f' unboxing

    log(v); // 1 + 1
  }

  let e = new Number(1);

  baz(e);
  log(e); // [Number: 1]
}

clear();
// native
{
  log(Object.prototype.toString.call([1, 2, 3])); // [object Array]
  log(Object.prototype.toString.call(/regexp/i)); // [object RegExp]

  // primitive type
  log(Object.prototype.toString.call(null)); // [object NULL]
  log(Object.prototype.toString.call(undefined)); // [object Undefined]

  // boxing
  log(Object.prototype.toString.call("abc")); // [object String]
  log(Object.prototype.toString.call(42)); // [object Number]
  log(Object.prototype.toString.call(true)); // [object Boolean]

  // bad
  new String("abc");
  new Number(42);

  // good
  ("abc");
  42;

  // truthy
  let a = new Boolean(false); // object is 'truthy'
  if (!a) log("not work");

  // passive boxing
  let b = Object("abc"); // == new String('abc')

  log(b instanceof String); // true
  log(typeof b); // object
  log(Object.prototype.toString.call(b)); // [object String]

  // unboxing
  log(a.valueOf()); // false
  log(b.valueOf()); // abc

  // Array()
  {
    let a = new Array(1, 2, 3); // == new Array(1, 2, 3), [1, 2, 3]
    let b = [1, 2, 3];

    let c = new Array(3); // presize
    log(c.length); // 3

    // chrome, c: [ undefined x 3 ]

    let d = Array(3);
    let e = [undefined, undefined, undefined];

    d.join("-");
    e.join("-");

    d.map(function (v, i) {
      return i;
    });

    e.map(function (v, i) {
      return i;
    });

    log(d); // [ <3 empty items> ], join works, but map does not work
    log(e); // [ undefined, undefined, undefined ]

    // empty array vs. undefined array

    let f = Array.apply(null, { length: 3 }); // { length: 3 } is array-like
    log(f); // [ undefined, undefined, undefined ]

    // do not create empty array
  }

  // Object()

  // bad
  new Object();

  // good
  {
    a: 1;
  }

  // Function()
  // != eval()

  // RegExp()
  /^a*b+/g;

  let name = "jae";
  let namePattern = new RegExp(name + "hun", "g");

  // Date(), Error()
  // have not literal format

  log(Date.now() === new Date().getTime()); // 1603363170525, true
  log(Date()); // Thu Oct 22 2020 19:39:11 GMT+0900 (GMT+09:00)

  function foo() {
    throw new Error("get current execution stack information");
  }

  // Symbol()
  // do not prepend to 'new'
  // symbol is not object, but scala(= primitive)

  let g = Symbol("my_symbol");
  log(g); // Symbol(my_symbol)
  log(typeof g); // symbol
  log(g.toString()); // Symbol(my_symbol)
}

// 2. Coercion
// explicit -> type casting
// implicit -> coercion

// javascript(dynamic type) -> explicit / implicit coercion

// abstract operation
{
  // ToString
  // 1. toString()
  {
    let a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
    log(a.toString()); // 1.07e + 21

    let b = [1, 2, 3];
    log(b.toString()); // 1,2,3

    // 2. JSON.stringify()
    log(JSON.stringify(42)); // "42"
    log(JSON.stringify("42")); // ""42""
    log(JSON.stringify(null)); // "null"

    // JSON non-safe value: undefined, function, symbol => undefined
    log(JSON.stringify(undefined)); // undefined
    log(JSON.stringify(Symbol())); // undefined
    log(JSON.stringify(function () {})); // undefined

    // array, object wrapping
    let c = [undefined, Symbol(), function () {}];
    log(JSON.stringify(c)); // [null, null, null]
    log(JSON.stringify({ a: undefined, b: Symbol(), c: function () {} })); // { }

    let d = {
      a: 1,
      b: 2,
      c: 3,
    };

    // replacer: filtering function
    log(
      JSON.stringify(d, function (k, v) {
        if (k !== "c") return v;
      })
    ); // {"a":1,"b":2}

    // space
    log(JSON.stringify(d, null, 3));
    /* 
    {
    ----"a": 1,
        "b": 2,
        "c": 3
    } 
    */

    log(JSON.stringify(d, null, "-----"));
    /* 
    {
    -----"a": 1,
    -----"b": 2,
    -----"c": 3
    }
    */
  }

  // ToNumber
  {
    // valueOf() || toString()

    log(Number(true)); // 1
    log(Number(false)); // 0
    log(Number(undefined)); // NaN
    log(Number(null)); // 0
    log(Number("")); // 0
    log(Number([])); // 0
    log(Number({})); // NaN
    log(Number(["a"])); // NaN

    log(Object.prototype.hasOwnProperty("valueOf", Number)); // true
    log(Object.prototype.hasOwnProperty("toString", Number)); // true
  }

  // ToBoolean
  {
    // falsy: undefined, null, false, (+-)0, NaN, ""

    // truthy: except falsy
    let a = new Boolean(false);
    let b = new Number(0);
    let c = new String("");

    log(Boolean(a && b && c)); // true
    log(a && b && c); // [String: ""]

    // fasly: no pure javascript
    // document.all(deprecated) -> lots of code that depends on it -> fasly
    // if (fasly) -> work

    // Boolean(fasly) -> false
  }
}

clear();

// explicit coercion
{
  {
    // string, number (not create wrapper object, no new keyword)
    let a = 42;
    let b = String(a);

    let c = "3.14";
    let d = Number(c);

    let e = c.toString();
    let f = +b;

    log(typeof e, typeof f); // string, number

    // toString(): 42 -> boxing -> coerci
    // +(unary operation): operand -> number

    log(+new Date("Sat, 24 Oct 2020 19:40:00 CDT")); // 1603586400000
    log(new Date().getTime()); // prefer
    log(Date.now()); // prefer
  }

  // tilde(~)
  {
    // ToInt32 Abstract Operation
    // "string": ToNumber() -> ToInt32
    // "number": ToInt32
    // ToInt32: |, ~, & bit operator

    // NOOP: 0 | x
    log(0 | NaN); // 0
    log(0 | Infinity); // 0

    // ~: ToInt32 -> NOT operation
    // ~: x -> -(x - 1)
    // ~: two's complement = one's complement + 1 = -x + 1
    let a = 1;
    log(~a); // -2

    let b = 7;
    log(~b); // -8

    // -(x - 1) = 0, x = 1(sentinel value)
    let c = "abcde";
    if (~c.indexOf("f")) {
      // -1 -> false, otherwise true
      log("never");
    }

    // bit truncate: double tilde

    log(Math.floor(-49.6)); // -50 (round down)
    log(~~-49.6); // -49 (truncate)

    log(Math.round(49.7)); // 50 (round up)
    log(~~49.7); // 49

    log(0 | 49.6); // 49

    // operation precedence
    // "~~x" > "0 | x"

    // / > |
    log(123 | (0 / 10)); // 123

    // prefer to tilde
  }

  // parsing
  {
    log(Number("42")); // 42
    log(parseInt("42")); // 42

    log(Number("42px")); // NaN
    log(parseInt("42px")); // 42, don't replace "coercion"

    log(parseInt(1 / 0, 19)); // 18, 1 / 0 -> "Infinity"(radix 19, i = 18, n = out of radix)

    // parseInt([string])
  }

  // * -> boolean
  {
    // Boolean(falsy) -> false
    // Boolean(truthy) -> true
    // == !! (double negate)

    let a = 0;

    // if() -> implicit coercion
    if (!a) {
      log("!a is true");
    }

    let b = a ? true : false; // implicit coercion
    log(b); // false

    // prefer: Boolean(x) or !!x
  }
}

clear();
// implicit
{
  // code abstraction -> derease bolierplate, verbosity of code
  // "+" operation overload
  {
    log("1" + "0"); // 10 concatenation
    log(42 + 0); // 42 addition

    let a = [1, 2];
    let b = [3, 4];
    log(a + b); // 1,23,4

    // + algorithm
    // 1. opperand: string -> concatenate
    // 2. operrand: object -> ToPrimitive -> context: number -> ToNumber -> valueOf? -> toString()
    // 3. operrand: etc -> add

    // "+" is commutative: 2 + 3 === 3 + 2

    // number -> string
    {
      let c = 42;
      log(42 + ""); // valueOf() -> ToString
      log(String(42)); // toString()

      let d = {
        valueOf: function () {
          return 42;
        },
        toString: function () {
          return 4;
        },
      };

      log(d + ""); // 42
      log(String(d)); // 4
    }

    // string -> number
    {
      let e = "3.14" - 0;
      log(e); // 3.14
      log(typeof e); // number

      let f = "3.14" / 0;
      let g = "3.14" * 0;

      log(f, typeof f); // Infinity number
      log(g, typeof g); // 0 number

      let h = [3] - [1];
      log(h, typeof h); // 2 number, toString() -> toNumber
    }

    // boolean -> number
    {
      // true: 1
      // false: 0

      function foo() {
        let sum = 0;
        for (let i = 0; i < arguments.length; i += 1) {
          if (arguments[i] !== undefined && !isNaN(arguments[i]))
            sum += arguments[i];
          // sum += Number(!!arguments[i])
        }

        return sum;
      }

      log(foo(true, false, false, false)); // 1
      log(foo(true, true, true, true)); // 4

      log(!!NaN); // false
      log(!!undefined); // false
      log(!!null); // false
      log(null + 0); // 0
      log(NaN + 0); // NaN
      log(undefined + 0); // NaN
    }
  }

  // * -> boolean
  {
    // ToBoolean
    // 1. if(*)
    // 2. for (; *; )
    // 3. while (*), do-while(*)
    // 4. * ? x : y
    // 5. * || x or * && x

    // || and && are selector operator (resolve one side)
    log(1 || "a"); // 1
    log(1 && "a"); // a

    log(null && "a"); // null
    log(null || "a"); // a

    // first operand -> ToBoolean
    // a || b === a ? a : b
    // a && b === a ? b : a

    // || : first operand: falsy -> true
    log("" || "a"); // a
    log(undefined && "a"); // undefiend
    // using ? :

    // && : guart operator: short circuiting
    log({} && 1); // 1
    log([] && 2); // 2
    log(true && 3); // 3
  }

  // symbol
  {
    let s = Symbol("symbol");
    log(String(s)); // symbol
    // log(s + ""); // TypeError:

    if (Boolean(s)) log("explicit ok"); // explicit ok
    if (s) log("implicit ok"); // implicit ok
  }
}

clear();
// equals: loose(==) vs. strict(===)
{
  // ==: coercion
  // ===: no-coercion

  let same = 1 + 1;
  let diff = "1" + 1;

  log(typeof same); // number
  log(typeof diff); // string(: coercion)

  // x: number == y: string -> x == ToNumber(y)
  log(1 == "1"); // true

  // x: string == y: number -> ToNumber(x) == y
  log("0" == 0); // true

  // x: boolean == y -> ToNumber(x) == y
  log(true == "2"); // false

  // x == y: boolean -> x == ToNumber(y)
  log("0" == false); // true

  // no-intervention ToBoolean()

  // bad: == true or == false
  // good: === true or === false

  // x: null == y: undefined -> true
  // x: undefined == y: null -> true

  // same: if (a == null), if (a == undefined || a == null)
  let a = undefined;
  if (a == null) log("a is undefined");

  // x: string or number == y: object -> x == ToPrimitive(y)
  log("1" + []); // 1 + "" -> "1"

  // x; object == y: string or number -> ToPrimitive(x) == y
  log({} + 1); // "[object Object]" + 1 -> "[object Object]1"

  log(42 == [42]); // 42 == "42" -> 42 == 42 -> true

  // unboxing
  log("a" == Object("a")); // "a" == "a" -> true
  log("a" === Object("a")); // false

  // null, undefined -> can't boxing
  // NaN -> boxing, but unique value
  log(null == Object(null)); // false, Object(null) = Object()
  log(undefined == Object(undefined)); // false, Object(undefined) = Object()
  log(NaN == Object(NaN)); // fals, Object(NaN) = new Number(NaN)
}

// 1. operand is true or false -> do not '==' operation
// 2. operand is [] or " ", 0 -> do not "==" operaiton

// abstract relational comparison (no-strict -> can't prevent implicit coercion)
{
  // not string -> ToNumber()
  log([42] < ["43"]); // true
  log(["43"] > [42]); // true

  // all string -> lexicographic
  log(["42"] < ["043"]); // false, compare "4", "0" -> compare "2", "4"
  // "4" > "0" -> false

  log([4, 2] < [0, 4, 3]); // same (lexicographic)

  let a = { k: 1 };
  let b = { k: 1 };

  log(a < b); // false, [object Object], [object Object] (can't compare)
  log(a > b); // false
  log(a == b); // false

  // but
  log(a >= b); // true, reverse result of a < b
  log(a <= b); // true, reverse result of a > b

  // good (explicit coercion, before compare)
  log(Number([42]) < Number("043")); // true
}
