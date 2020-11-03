const log = console.log;
const clear = console.clear;

// 1. Callback
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

// 2. Promise
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

// 3. Generator
{
  // messaging
  {
  }

  // pause and resume
  {
  }

  // delegation
  {
    {
      function* foo() {
        yield "B"; // 2
        yield "C"; // 3
        return "D";
      }

      function* bar() {
        yield "A"; // 1
        yield* foo(); // delegation
        yield "E"; // 4
        return "F";
      }

      const it = bar();
      it.next().value; // A
      it.next(1).value; // 1, (delegation) B
      it.next(2).value; // 2, C
      it.next(3).value; // 3 D E
      it.next(4).value; // 4 F
    }

    {
      // iterable
      function* bar() {
        yield "A";
        yield* ["B", "C", "D"]; // delegation (1, 2, 3 ignored)
        yield "E";
        return "F";
      }

      const it = bar();

      it.next().value; // A
      it.next(1).value; // B
      it.next(2).value; // C
      it.next(3).value; // D
      it.next(4).value; // yield 4 -> undefined, E
      it.next(5).value; // F
    }

    // exception
    {
      function* foo() {
        try {
          yield "B";
        } catch (err) {
          log(err);
        }

        yield "C";

        throw "D";
      }

      function* bar() {
        yield "A";

        try {
          yield* foo(); // delegation
        } catch (err) {
          log(err);
        }

        yield "E";

        yield* baz(); // delegation

        yield "G"; // ignored
      }

      function* baz() {
        throw "F";
      }

      const it = bar();

      it.next().value; // A
      it.next(1).value; // B
      it.throw(2).value; // foo catch 2, C
      it.next(3).value; // bar catch D, E

      try {
        it.next(4).value;
      } catch (err) {
        log(err); // catch F
      }
    }

    // asynchronous delegation
    {
      function* foo() {
        const r2 = yield request("");
        const r3 = yield request("" + r2);

        return r3;
      }

      function* bar() {
        const r1 = yield request("");

        const r3 = yield* foo();

        log(r3);
      }
    }

    // (*)recursive
    {
      function* foo(val) {
        if (val > 1) val = yield* foo(val - 1);

        return yield request("" + val);
      }

      function* bar() {
        const r1 = yield* foo(3);

        log(r1);
      }

      /*
       */
    }
  }
}
