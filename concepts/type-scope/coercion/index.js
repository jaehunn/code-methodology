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
