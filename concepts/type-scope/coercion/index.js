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
}
