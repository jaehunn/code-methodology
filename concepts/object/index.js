const log = console.log;
const clear = console.clear;

// creation
{
  // 1. literal
  const o = {
    k: "v",
  };

  // 2. constructor
  const _o = new Object();
  _o.k = "v";
}

// auto-boxing
{
  const s = "A";
  log(typeof s); // "string"
  log(s instanceof String);

  const _s = new String("B");
  log(typeof _s); // "object"
  log(_s instanceof String); // true

  // auto-boxing
  log(s.length); // String('A').length, 1
}

clear();

// property
{
  const o = {
    k: 1,
    3: 1,
  };

  // key-access
  log(o["k"]); // 1
  log(o["3"]); // 1

  // property-access
  log(o.k); // 1
  // log(o.3); // syntax error

  // computed property
  o["_" + "k"] = 2;
  log(o["_k"]); // 2
  log(o._k); // 2

  function qux() {
    // ...
  }

  o.foo = qux;

  const _o = {
    bar: qux,
  };

  _o.baz = o.foo;

  // foo, bar, baz are pointer(= reference)
  log(o.foo === _o.bar); // true
  log(_o.baz === _o.bar); // true
}

clear();

// array
{
  const l = [1, 2, 3];
  log(l.length); // 3

  l.foo = "foo";
  log(l.length); // 3

  l["4"] = 3;
  log(l); // [1, 2, 3, <1 empty item>, 3, foo: 'foo']
  log(l.length); // 5
}

// object copy
{
  // shallow-copy: Object.assign()
  {
    const o = { a: 1, foo: { _a: 1 } };
    const _o = Object.assign({}, o);
    log(o === _o); // false

    log(o.a); // 1
    _o.a = 2;
    log(_o.a); // 2

    log(o.foo === _o.foo); // true

    _o.foo._a = 2;
    log(o.foo._a); // 2
    log(_o.foo._a); // 2
  }

  // deep-copy: Object.freeze()
  {
    const o = { a: 1, foo: { _a: 1 } };
    const _o = Object.assign({}, o);

    Object.freeze(o);

    o.a = 2; // ignore

    log(o.a); // 1
    log(Object.isFrozen(o)); // trues

    o.foo._a = 3; // change
    log(o.foo._a); // 3

    function deepFreeze(o) {
      const props = Object.getOwnPropertyNames(o);

      props.forEach((prop) => {
        const value = o[prop];

        if (typeof value === "object" && value !== null) deepFreeze(value);
      });

      return Object.freeze(o);
    }
  }
}

// property-descriptor
{
}
