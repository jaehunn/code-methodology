const log = console.log;
const clear = console.clear;

// 1. Object
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

clear();

// property-descriptor
{
  // Object.getOwnPropertyDescriptor()
  // Object.defineProperty()
  const o = {
    a: 1,
  };

  log(Object.getOwnPropertyDescriptor(o, "a")); // { value: 1, writable: true, enumerable: true, configurable: true }

  Object.defineProperty(o, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true,
  });

  log(Object.getOwnPropertyDescriptor(o, "a")); // { value: 2, writable: true, enumerable: true, configurable: true }

  // writable - value
  // configurable - defineProperty()
  // enumerable -  for-in

  // immutability
  // 1. constant
  {
    const o = {};
    Object.defineProperty(o, "CONST_NUMBER", {
      value: 10,
      writable: false,
      configurable: false,
    });
  }

  // 2. Object.preventExtensions()
  {
    const o = {};
    Object.preventExtensions(o);

    o.a = 2;
    log(o.a); // undefined
  }

  clear();

  // 3. Object.seal()
  {
    const o = { a: 1 };
    Object.seal(o);

    o.b = 2;
    log(o.b); // undefined

    // Object.defineProperty() - X
    o.a = 2;
    log(o.a); // 2

    delete o.a;
    log(o.a); // 2
  }

  // 4. Object.freeze()
  {
    const foo = {
      b: 2,
    };

    const o = {
      a: 1,
      foo,
    };

    Object.freeze(o);

    o.a = 2;
    log(o.a); // 1

    // shallow
    o.foo.b = 3;
    log(o.foo.b); // 3

    foo.b = 4;
    log(foo.b); // 4
  }
}

// getter and setter
{
  let o = {
    a: 1,
  };

  // [[Get]] Operation
  log(o.a); // success, 1
  log(o.b); // failure, undefined

  // identifier search failure - ReferenceError
  // property search failure - undefined

  // [[Put]] Operation
  // 1. is Accessor Discriptor? (getter or setter)
  // 2. writable: false -> TypeError
  // 3. proprty setting

  Object.defineProperty(o, "b", {
    get: function () {
      return this.a * 2;
    },
    enumerable: true,
  });

  log(o.b); // 2

  o = {
    get c() {
      return 3;
    },
  };

  log(o.c); // 3

  const _o = {
    get d() {
      return this.d;
    },
    set d(v) {
      this.d = v;
    },
  };

  o.d = 4;
  log(o.d); // 4
}

clear();

// Property check: in vs. hasOwnProperty()
{
  const o = {
    a: 1,
  };

  log("a" in o); // true
  log(o.hasOwnProperty("a")); // true

  log("toString" in o); // true, Object.prototype.toString() "prototype chaining"

  // good
  log(Object.prototype.hasOwnProperty(o, "toString")); // false
}

// Property get keys: keys() vs. getOwnPropertyNames()
{
  const o = {};
  Object.defineProperty(o, "a", {
    value: 1,
    enumerable: true,
  });

  Object.defineProperty(o, "b", {
    value: 2,
    enumerable: false,
  });

  log(o.propertyIsEnumerable("a")); // true
  log(o.propertyIsEnumerable("b")); // false

  // "no-prototype chaining"
  log(Object.keys(o)); // ['a']
  log(Object.getOwnPropertyNames(o)); // ['a', 'b']
}

// 2. Prototype
// object prototype
{
  const o = {
    a: "a",
  };

  log(o.__proto__ === Object.prototype);
  log(Object.__proto__ === Function.prototype);
  log(Function.prototype.__proto__ === Object.prototype);
}

// function prototype
{
  const F = function (a) {
    this.a = a;
  };

  const f = new F("a");

  log(f.__proto__ === F.prototype);
  log(F.__proto__ === Function.prototype);
  log(Function.prototype.__proto__ === Object.prototype);
}

// constructor
{
  const F = function (a) {
    this.a = a;
  };

  const o = {
    a: "a",
  };

  const f = new F("a");

  log(Object.prototype.constructor); // Object()
  log(o.constructor); // Object() (prototype chain)

  log(F.prototype.constructor); // F()
  log(f.constructor); // F() (prototype chain)

  log(Function.prototype.constructor); // F()
  log(F.constructor); // F() (prototype chain)
}

// prototype property
{
  function F(a) {
    this.a = a;
  }

  const f = new F("a");

  F.prototype.g = function () {
    log("prototype method");
  };

  f.g(); // prototype method
}

// prototype inheritance
{
  function F(a) {
    this.a = a;
  }

  const f = new F("a");

  F.prototype = { b: "b" };

  const _f = new F("_a");

  log(f.b); // undefined
  log(_f.b); // b

  log(f.constructor); // F
  log(_f.constructor); // Object() (constructor disconnected) (prototype chain)
}

// prototype chain
{
  function F(a) {
    this.a = a;
  }

  F.prototype.b = "b";

  const f = new F("a");
  const _f = new F("_a");

  log(f.b); // b (prototype chain)
  log(_f.b); // b (prototype chain)

  _f.b = "_b"; // (object dynamic assignment)

  log(_f.b); // '_b' (no prototype chain)
  log(f.b); // 'b'
}

clear();

// class vs. object
{
  // class theory: interaction of instances
  // delegation theory: connection of objects

  const User = {
    setId: function (id) {
      this.id = id;
    },
    getId: function () {
      return this.id;
    },
  };

  // delegation: [[Prototype]] Link (Prototype Chaining)
  const O = Object.create(User);

  O.prepareTask = function (id, label) {
    this.label = label;

    this.setId(id); // id is O property, not User property
  };

  // Implicit binding: this = O -> O.id = 1
  O.prepareTask(1, "user1");
  log(O.hasOwnProperty("id")); // true
  log(User.hasOwnProperty("id")); // false

  // Do not override in delegation
  O.getTasks = function () {
    this.getId();

    return this.label;
  };

  // JavaScript [[Prototype]]: No abstraction, Connection objects
}

clear();

// mental model
{
  // prototype style
  {
    function Foo(name) {
      this.name = name;
    }

    Foo.prototype.identify = function () {
      return `I am ${this.name}`;
    };

    function Bar(name) {
      Foo.call(this, name);
    }

    // inheritance
    Bar.prototype = Object.create(Foo.prototype);

    Bar.prototype.speak = function () {
      return `Hello, ${this.identify()}`;
    };

    const jimin = new Bar("jimin");
    const jaehun = new Bar("jaehun");

    log(jimin.speak()); // Hello, I am jimin
    log(jaehun.speak()); // Hello, I am jaehun

    // jimin, jaehun -> Bar.prototype -> Foo.prototype
  }

  // object style
  {
    Foo = {
      init: function (name) {
        this.name = name;
      },
      identify: function () {
        return `I am ${this.name}`;
      },
    };

    Bar = Object.create(Foo);

    Bar.speak = function () {
      return `Hello, ${this.identify()}`;
    };

    const jimin = Object.create(Bar);
    jimin.init("jimin");

    const jaehun = Object.create(Bar);
    jaehun.init("jaehun");

    log(jimin.speak()); // Hello, I am jimin
    log(jaehun.speak()); // Hello, I am jaehun

    // jimin, jaehun -> Bar -> Foo
  }

  // Object.setPrototypeOf()
  {
    const Foo = {};

    const Bar = {};

    Object.setPrototypeOf(Foo, Bar); // Foo -> Bar(parent)
  }
}

// type instropection
{
  // instanceof
  {
    function Foo() {}

    const foo = new Foo();

    // foo -> Foo.prototype
    log(foo instanceof Foo); // true: foo instanceof Foo.prototype

    function Bar() {}

    Bar.prototype = Object.create(Foo.prototype);

    log(Bar.prototype instanceof Foo); // true
    log(Object.getPrototypeOf(Bar.prototype) === Foo.prototype); // true
    log(Foo.prototype.isPrototypeOf(Bar.prototype)); // true

    const bar = new Bar();

    log(bar instanceof Foo); // true
    log(bar instanceof Bar); // true
    log(Object.getPrototypeOf(bar) === Bar.prototype); // true
    log(Foo.prototype.isPrototypeOf(bar)); // true
    log(Bar.prototype.isPrototypeOf(bar)); // true

    log(Bar instanceof Foo); // false
  }

  // duck-typing -> bad instropection (thenable in promise)
  clear();
  // object style instropection
  {
    const Foo = {};

    const Bar = Object.create(Foo);

    const bar = Object.create(Bar);

    log(Foo.isPrototypeOf(Bar)); // true
    log(Object.getPrototypeOf(Bar) === Foo); // true
    log(Object.getPrototypeOf(bar) === Bar); // true
    log(Foo.isPrototypeOf(bar)); // true
    log(Bar.isPrototypeOf(bar)); // true
  }
}
