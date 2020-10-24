const log = console.log;
const clear = console.clear;

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
