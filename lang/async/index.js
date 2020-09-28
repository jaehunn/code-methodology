const log = console.log;
const clear = console.clear;
const error = console.error;

// async
// 1. gap
{
  function f() {
    setTimeout(function cb() {
      // A
    }, 0);

    // B
  }

  function g() {
    // C
  }

  f();
  g();

  // B C A
}

clear();

// 2. concurrency
{
  function f() {
    setTimeout(function () {
      log("receive");
    }, 1000);
  }

  function g() {
    setTimeout(function () {
      log("receive");
    }, 1000);
  }
}

// 3. solve to race
{
  {
    // if
    function cb(res) {
      if (res.url === "A") {
        // ...
      } else if (res.url === "B") {
        // ...
      }
    }
  }

  // gate
  {
    let x, y;

    function cb1(x) {
      if (x && y) {
        // ...
      }
    }

    function cb2(y) {
      if (x && y) {
        //...
      }
    }
  }

  // latch
  {
    let x;

    function cb1(x) {
      if (!x) {
        // ...
      }
    }

    function cb2(x) {
      if (!x) {
        // ...
      }
    }
  }

  // scheduling
  {
    let data = [];

    function cb(res) {
      let chunk = res.splice(0, 1000);

      // ...

      if (res.length) {
        setTimeout(function () {
          cb(res);
        });
      }
    }
  }

  // job queue
  {
    log("A");

    setTimeout(function () {
      log("B");
    }, 0);

    schedule(function () {
      log("C");

      schedule(function () {
        log("D");
      });
    });

    // A C D B
  }
}

// callback problem
// 1. readability
{
  A(function () {
    B(function () {
      C(function () {
        D(function () {
          // ...
        });
      });
    });
  });
}

// 2. async guarantee
{
  A(function () {
    B();

    C(function () {
      D();
    });

    E();
  });

  F();
}

// 3. event branch
{
  A(function () {
    B(function () {
      // ...
    });
  });

  C(function () {
    D(function () {
      // ...
    });
  });
}

// 4. reliability (IOC to third party)
{
  T("data", function () {
    // ...
  });
}
