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
// 1. concepts
// future value (after + now -> after)
{
  function f(getX, getY, cb) {
    var _x, _y;

    getX(function (x) {
      _x = x;

      if (_y) cb(_x + _y); // normalize
    });

    getY(function (y) {
      _y = y;

      if (_x) cb(_x + _y); // normalize
    });
  }

  // v be inferred
  f(fetchX, fetchY, function (v) {
    log(v);
  });
}

// uninversion of control (callback -> caller)
{
  function f(x) {
    // ...

    return listener;
  }

  var evt = f(42); // universion of control

  evt.on("completed", function () {
    // ...
  });

  evt.on("failed", function () {
    // ...
  });

  bar(evt); // listening
  baz(evt); // listening
}

// 2. thenable
{
  if (p !== null && (typeof p === "object" || typeof p === "function") && typeof p.then === "function") {
    log("thenable");
  } else log("no thenable");

  // promise is thenable
  // thenable may not promise
}

// 3. reliability
{
  // (1) then() => asynchronous, sequentially
  // (2) resolve(), reject() => new promise
  {
    f.then(function () {
      f.then(function () {
        // 3
      });
      // 1
    });

    f.then(function () {
      // 2
    });
  }

  // bad
  {
    var e = new Promise(function (res) {
      res("B");
    });

    var f = new Promise(function (res) {
      res(e);
    });

    g = new Promise(function (res) {
      res("A");
    });

    f.then(function (v) {
      // ...
    });

    g.then(function (v) {
      // ...
    });

    // A B
    // job queue: g callback -> f callback
  }

  // (3) always promise is resolved(fufilled or reject)
  // (4) promise always resolve in only once
  // (5) type error or reference error -> promise call reject() (synchronous)
  // (6) then() error -> next then()
  {
    var f = new Promise(function (res, rej) {
      res(42); // already resolved
    });

    f.then(
      function () {
        throw new error();
      },
      function (err) {
        // never work
      }
    );
  }

  // (7) Promise.resolve()
  {
    var f = new Promise(function (res) {
      res(42);
    });

    var g = Promise.resolve(42);

    f === g;

    // Promise.resolve(no promise) => promise
    var _f = Promise.resolve(42);
    var _g = Promise.resolve(_f);

    _f === _g;

    // thenable
    var e = {
      then: function (cb, errcb) {
        cb(42);
        errch("???");
      },
    };

    e.then(
      function (v) {
        v; // 42
      },
      function (err) {
        err; // ???
      }
    );

    // normalize
    Promise.resolve(e).then(
      function (v) {
        // 42
      },
      function (err) {
        // no work
      }
    );
  }
}

// 4. chaining
{
}

// 5. error handling
{
}

// 6. pattern
{
}

// 7. api
{
}

// 8. limit
