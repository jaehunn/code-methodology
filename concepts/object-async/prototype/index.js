const log = console.log;
const clear = console.clear;

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
