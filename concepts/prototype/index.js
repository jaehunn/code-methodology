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

// class theory vs. delegation theory
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

// mental model
