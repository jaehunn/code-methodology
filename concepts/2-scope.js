const log = console.log;
const clear = console.clear;

// 1. Scope
{
}

// 2. Closure
{
}

// 3. this
// default binding
{
  function f() {
    log(this.a); // this = global object
  }

  var a = "a";

  f(); // global
}

// implicit binding
{
  function f() {
    log(this.a); // this = o object
  }

  var o = {
    a: "a",
    f,
  };

  o.f(); // a
}

// explicit binding
{
  function f() {
    log(this.a); // this = o object
  }

  var o = {
    a: "a",
  };

  a = "_a";

  f.call(o); // a
}

// hard binding
{
  function f() {
    log(this.a);
  }

  function g() {
    f.call(o);
  }

  var o = {
    a: 2,
  };

  g(); // 2
}

// new binding
{
  function F(a) {
    // 1. this = o
    // 2. this = _o
    this.a = a;
  }

  F.prototype.f = function () {
    log(this.a);
  };

  var o = new F("a");
  o.f(); // a

  var _o = new F("_a");
  _o.f(); // a
}

// priority: Implicit < Explicit
{
  function f() {
    log(this.a);
  }

  var o = {
    a: "a",
    f,
  };

  var _o = {
    a: "_a",
  };

  o.f(); // a
  o.f.call(_o); // _a
}

// priority: Implicit < new
{
  function f(a) {
    this.a = a;
  }

  var o = {
    f,
  };

  o.f("a");
  log(o.a); // a

  var _o = new o.f("_a");
  log(o.a); // a
  log(_o.a); // _a
}

// priority: Explicit < new
{
  function f(a) {
    this.a = a;
  }

  var o = {};

  var g = f.bind(o); // hard binding
  g("a");
  log(o.a); // a

  var _o = new g("_a");
  log(o.a); // a
  log(_o.a); // _a (overriding)
}

// Conclusion: new > explicit > implicit > default

// exception: Explicit(this = null) -> this = global
{
  // bad
  function f() {
    log(this.a);
  }

  var a = "a";

  f.call(null); // a

  // good
  const ø = Object.create(null);

  f.call(ø);
}

// exception: Arrow Function this (Static binding)
{
  function f() {
    // f this inheritance
    setTimeout(() => log(this.a));
  }

  var o = {
    a: "a",
    f,
  };

  var _o = {
    a: "_a",
  };

  f(); // global
  o.f(); // a
  f.call(_o); // _a
}
