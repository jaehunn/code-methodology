// lexical scope
function foo() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join("!"));
  }
}

// module, public api
function CoolModule() {
  // variable -> private
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join("!"));
  }

  return {
    doSomething,
    doAnother,
  };
}

var foo = CoolModule(); // must be call, otherwise do not create lexical scope and closure.

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// singleton pattern
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join("!"));
  }

  return {
    doSomething,
    doAnother,
  };
})();

// modern style:  module loader, manager
var MyModules = (function Manager() {
  var modules = [];

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i += 1) {
      deps[i] = modules[deps[i]];
    }

    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define,
    get,
  };
})();

// use
MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce : " + who;
  }

  return {
    hello,
  };
});

MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome,
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello()); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
