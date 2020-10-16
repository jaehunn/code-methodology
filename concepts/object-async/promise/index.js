const log = console.log;
const clear = console.clear;

// callback
// gap
{
  function foo(callback) {
    // gap 1sec
    setTimeout(callback, 1000);
  }

  function bar() {
    console.log("bar");
  }

  foo(function () {
    console.log("foo");
  });

  bar();

  // bar
  // (1 sec)
  // foo
}

// concurrency
{
  function foo() {
    setTimeout(function cb() {
      console.log("foo");
    }, 1000);
  }

  function bar() {
    console.log("bar");
  }

  foo();
  bar();

  // concurrency: setTimeout() + bar()
  // execute: foo -> bar -> cb
}

// callback lacks
// 1. callback hell
// 2. reliability
// 3. IoC

// promise
// time-independent
{
  function foo() {
    return new Promise((resolve, reject) => {
      // resolve(value) or reject(error)
    });
  }

  foo().then(
    function resolveHandler(value) {
      // ...
    },
    function rejectHandler(error) {
      // ...
    }
  );

  // SoC: caller, callee(asynchronous)
}

// thenable duck-typing
{
  // all promise is thenable
  // all thenable is not promise
  // promise < thenable
  if (
    v !== null &&
    (typeof v === "object" || typeof v === "function") &&
    typeof v.then === "function"
  ) {
    // thenable
  } else {
    // non-thenable
  }
}

// resolve(), reject()
{
}
