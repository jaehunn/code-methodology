const log = console.log;
const clear = console.clear;

// async
// 1. gap
{
  function f() {
    log("f start");

    setTimeout(function () {
      log("f done");
    }, 0);
  }

  function g() {
    log("g start");
    log("g done");
  }

  //   f();
  //   g();

  // f start
  // g start
  // g done
  // f done - f gap 1 sec
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

  //   f();
  //   g();

  // concurrency: g setTimeout request + f callback receive
}

// 3. race condition solving
{
  // check (select)
  {
    function cb(res) {
      if (res.url === "A") {
        // ...
      } else if (res.url === "B") {
        // ...
      }
    }
  }

  // gate (all)
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

  // latch (one)
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

  // cooperative concurrency (async scheduling)
  {
    let data = [];

    function cb(res) {
      let chunk = res.splice(0, 1000);

      // ...

      if (res.length) {
        // async scheduling
        setTimeout(function () {
          cb(res);
        });
      }
    }
  }

  // job queue (front queue of message queue)
  {
    log("A");

    setTimeout(function () {
      log("B");
    }, 0);

    job(function () {
      log("C");

      job(function () {
        log("D");
      });
    });

    // A C D B
  }
}

// callback
// 1. readability (callback hell)
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

  // A F B C E D
  // if A or C is not async (A not async), A B C E F D
}

// 3. event branch
{
  A(function () {
    B(function () {
      // ...
    });
  });

  // depend on A B logic
  // if A B fail, C D fail
  C(function () {
    D(function () {
      // ...
    });
  });
}

// 4. reliability (IOC to third party)
{
  A("data", function () {
    third.func(); // control -> third
  });

  // if third throw error
}

// promise
// 1.
{
}
