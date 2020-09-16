const log = console.log;

// 1. object prototype
{
  const o = {
    a: "a",
  };

  log(o.__proto__ === Object.prototype);
  log(Object.__proto__ === Function.prototype);
  log(Function.prototype.__proto__ === Object.prototype);
}

// 2. function prototype
{
  const F = function (a) {
    this.a = a;
  };

  const f = new F("a");

  log(f.__proto__ === F.prototype);
  log(F.__proto__ === Function.prototype);
  log(Function.prototype.__proto__ === Object.prototype);
}

// 3. constructor
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

// 4. prototype property
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

// 5. prototype inheritance
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

// 6. prototype chain
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
