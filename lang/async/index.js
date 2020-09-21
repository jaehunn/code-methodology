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
  // then().then().then() ...
  // then() fufilled return value -> next then fulfilled value
  {
    var f = Promise.resolve(21);

    var g = f.then(function (v) {
      v; // 21

      return v * 2;
    });

    g.then(function (v) {
      v; // 42
    });
  }

  {
    var f = Promise.resolve(21);

    f.then(function (v) {
      v; // 21

      return new Promise(function (res) {
        res(v * 2);
      });
    }).then(function (v) {
      v; // 42
    });
  }

  {
    var f = Promise.resolve(21);

    f.then(function (v) {
      v; // 21

      return new Promise(function (res) {
        setTimeout(function () {
          res(v * 2);
        }, 100);
      });
    }).then(function (v) {
      v; //42
    });
  }

  // delay-promise
  {
    function delay(time) {
      return new Promise(function (res) {
        setTimeout(res, time);
      });
    }

    // no resolve message
    delay(100)
      .then(function () {
        // 100ms

        return delay(200);
      })
      .then(function () {
        // delay promise replace to then promise
        // 200ms
      })
      .then(function () {
        // 0ms

        return delay(50);
      })
      .then(function () {
        // 50ms
      });
  }

  // delay-promise - channel
  {
    function req(url) {
      return new Promise(function (res) {
        ajax(url, res); // callback <- res
      });
    }

    req("http://some.url.1/")
      .then(function (response) {
        return req("http://some.url.2/?v=" + response);
      })
      .then(function (response2) {
        // ...
      });
  }

  // promise error unit: promise
  {
    req("http://some.url.1/")
      .then(function (response) {
        throw new Error("error");
      })
      .then(
        function () {
          // never work
        },
        function (err) {
          err; // error (catch)

          return 42; // -> pending
        }
      )
      .then(function (msg) {
        msg; // 42 (fulfilled)
      }); // reject callback is default callback

    // ex
    function default_rej_cb(err) {
      throw err;
    }
  }

  // resolve, fulfill, reject
  {
    var fulfill = Promise.resolve(42);
    var reject = Promise.reject("error");

    var rejected = {
      then: function (res, rej) {
        rej("error");
      },
    };

    var f = Promise.resolve(rejected); // thenable -> 'error' (reject)

    // resolve: fulfill or reject
  }

  {
    var rejected = new Promise(function (res, rej) {
      res(Promise.rej("error"));
    });

    rejected.then(
      function () {
        // never work
      },
      function (err) {
        err; // "error"
      }
    );

    // new Promise(function (resolve, reject) { })
    // then(function fulfilled() { }, function reject() { })
  }
}

// 5. error handling
{
  // try catch
  {
    function f() {
      setTimeout(function () {
        g.e(); // global error
      }, 1000);
    }

    try {
      f();
    } catch (err) {
      // never
    }
  }

  // error-first callback
  {
    function f(cb) {
      setTimeout(function () {
        // try -> only sync value
        try {
          var x = g.e();

          cb(null, x);
        } catch (e) {
          cb(e);
        }
      }, 100);
    }

    f(function (e, v) {
      if (e) error(e);
      else log(v);
    });
  }

  // promise: split callback
  {
    var f = Promise.reject("e");

    f.then(
      function () {
        // never
      },
      function (e) {
        // e
      }
    );
  }

  {
    var f = Promise.resolve(42);

    // f already resolved 42
    f.then(
      function (n) {
        log(n.toLowerCase()); // error
      },
      function (e) {
        // never (f reject callback, not f.then())
      }
    );
  }

  // 1. catch (chain issue)
  {
    var f = Promise.resolve(42);

    f.then(function (v) {
      log(v.toLowerCase()); // error
    }).catch(function (e) {
      // error catch (f error + f.then() error)
    });

    // if catch() callback error?
  }

  // 2. (timer)

  // 3. done
  {
    var f = Promise.resolve(42);

    f.then(function (v) {
      log(v.toLowerCase()); // error
    }).done(null, function (e) {
      log(e);
    });

    // if catch() callback error? -> global
  }

  // -> browser function: tracking garbage collection
  // promise disapear -> tracking

  // promise
  // 1. error callback -> log
  // 2. defer() -> log on/off
  {
    var f = Promise.reject("e").defer(); // promise chaining (no log)

    g(42).then(
      function () {
        return f;
      },
      function (e) {
        // e (f error catch)
      }
    );
  }
}

// 6. pattern
{
  // 1. Promise.all([ ]) - gate pattern
  {
    var rq1 = request("http://some.url.1/");
    var rq2 = request("http://some.url.2/");

    Promise.all([rq1, rq2])
      .then(function (v) {
        // v = [v1,v2]

        return request("http://some.url.3/?v=" + v.join(","));
      })
      .then(function (v) {
        log(v);
      });
  }

  // if rq1 or rq2 error -> no fulfilled, always attach errror callack

  // 2. Promise.race([ ]) - latch pattern
  {
    var rq1 = request("http://some.url.1/");
    var rq2 = request("http://some.url.2/");

    Promise.race([rq1, rq2])
      .then(function (v) {
        // v is not array
        return request("http://some.url.3/?v=" + v);
      })
      .then(function (v) {
        // v
      });
  }

  // Promise.race([ ]) time-out pattern
  {
    // time-out function -> after 3s rejected
    Promise.race([foo(), timeoutPromise(3000)]).then(
      function () {
        // foo
      },
      function (e) {
        // foo disapear or rejected
        // time over 3s
      }
    );
  }

  // finally
  {
    var f = Promise.resolve(42);

    // resolved -> always call(cleanup)
    f.then(function () {})
      .finally(function () {})
      .then(function () {})
      .finally(function () {});
  }

  // polyfill
  {
    if (!Promise.observe) {
      Promise.observe = function (p, cb) {
        p.then(
          function (v) {
            Promise.resolve(v).then(cb);
          },
          function (e) {
            Promise.resolve(e).then(cb);
          }
        );

        return p;
      };
    }

    // use
    Promise.race([
      Promise.observe(foo(), function cleanup(v) {
        // foo cleanup (even though foo timeover)
      }),
      timeoutPromise(3000),
    ]);
  }

  // 1. none() -> every reject
  // 2. any() -> some fulfilled
  // 3. first() -> latch
  // 4. last() -> last fulfilled

  // first code
  {
    if (!Promise.first) {
      Promise.first = function (ps) {
        return new Promise(function (res, rej) {
          ps.forEach(function (p) {
            Promise.resolve(p).then(res);
          });
        });
      };
    }
  }

  // simultaneous iteration
  {
    if (!Promise.map) {
      Promise.map = function (vals, cb) {
        return Promise.all(
          vals.map(function (val) {
            return new Promise(function (res) {
              cb(val, res);
            });
          })
        );
      };
    }

    // use
    var p1 = Promise.resolve(21);
    var p2 = Promise.resolve(42);
    var p3 = Promise.reject("error");

    Promise.map([p1, p2, p3], function (p, done) {
      Promise.resolve(p).then(function (v) {
        done(v * 2);
      }, done);
    }).then(function (vals) {
      vals; // 42 84 'errors'
    });
  }
}

// 7. api
{
  // new Promise()
  {
    // 프라미스 콜백 = IIFE
    // IIFE 인자 = 귀결 처리 콜백(성공, 실패)
    var f = new Promise(function (res, rej) {
      // res()
      // rej()
    });

    // reject() = 프라미스를 버린다.
    // resolve() => 즉시값은 즉시값, 프라미스/데너블 재귀적으로 풀어서 최종값으로
  }

  // Promise.reject()
  {
    var f = new Promise(function (res, rej) {
      reject("Error");
    });

    var g = Promise.reject("Error");
    // f 와 g 는 같다.
  }

  // Promise.resolve()
  {
    // Promise.resolve(), Promise.reject() 는 이미 이루어진 프라미스를 생성하는 용도로 쓰인다.
    // 데너블을 재귀적으로 풀어 최종값을 프라미스로 한다.
    // 프라미스면 아무일도 하지않는다. (오버헤드 없음)
    // thenable
    var f = {
      then: function (cb) {
        cb(42);
      },
    };

    var g = {
      then: function (cb, errCb) {
        errCb("Error");
      },
    };

    var _f = Promise.resolve(f); // 이룸 프라미스
    var _g = Promise.resolve(g); // 버림 프라미스
  }

  // then(), catch()
  // 프라미스 인스턴스에는 then() catch() 메서드가 들어있다.
  // then() 의 콜백으로 이룸/버림 처리기를 등록할 수 있다. 두 처리기 중 하나만 비동기적으로 호출된다.
  // then() 에 처리기를 등록하지 않으면, 기본 처리기로 대체된다.
  // catch() 메서드는 버림 콜백만 받는다. 이룸 콜백은 기본 처리기가 된다. then(null, )
  // then() catch() 메서드도 새 프라미스를 만든다. 따라서 연쇄 흐름 제어를 표현할 수 있다.
  // 메서드 콜백에서 에러가 발생하면, 프라미스는 버려진다.
  // 콜백의 반환값이 즉시값이면 이룸값으로 지정하고 특정 프라미스나 데너블이면 값을 풀어 귀결값이된다.

  // Promise.all() Promise.race()
  // Promise.all() 은 프라미스 배열을 받아 모두 이루어지는 지를 확인합니다. 하나라도 버려지면, 버려진다.
  // 이루어지면, 배열을 반환한다. Gate 패턴이다.

  // Promise.race() 는 프라미스 배열을 받아 최초로 귀결된 프라미스가 반환 프라미스의 귀결값이된다. latch 패턴이다.
}

// 8. limit
{
  // 프라미스 설계상 연쇄에서 에러가 나면 조용히 묻힌다.
  // 연쇄에서 에러가 나면 어딘가에서 잡히기전까지 하위로 계속 내려간다.
  {
    var f = foo(42).then().then(); // f 의 프라미스는 마지막 then() 의 반환 프라미스다.

    f.catch(); // catch 를 등록하면 각단계에서 처리못하는에러를 언제 에러가나도 반드시 받아 처리된다.
    // 하지만 이미 처리된 버림같은 경우 전혀 통지받지 못하는 상황이 벌어질 수 있다.
    // try catch 에도 기본적으로 존재하는 한계로 잡혀도 묻힐 가능성은 있다.
    // 프라미스 연쇄에서 중간 단게를 참조하는 레퍼런스가 없어 정확하게 에러를 솎아내기란 불가능하다.
  }

  // 프라미스는 정의상 하나의 이룸, 하나의 버림을 가진다.
  // 로직이 복잡해지면 곤란해지는 상황이온다. 해결하기 위해서 단계마다 배열을 감싸고 푸는 것은 불편하다.
  // 값 분할하기: 2개 이상의 프라미스로 분해해보자.
  {
    function getY(x) {
      return new Promise(function (res, rej) {
        setTimeout(function () {
          res(3 * x - 1);
        }, 100);
      });
    }

    function foo(bar, baz) {
      var x = bar * baz;

      return getY(x).then(function (y) {
        return [x, y];
      });
    }

    foo(10, 20).then(function (msg) {
      var x = msg[0];
      var y = msg[1];

      log(x, y); // 200 599
    });
  }
  // x 와 y 를 배열로 감싸 프라미스 하나로 전달할 필요가 없도록 foo 가 반환하는 것을 다시 조정하자.

  {
    function getY(x) {
      return new Promise(function (res, rej) {
        setTimeout(function () {
          res(3 * x - 1);
        }, 100);
      });
    }

    function foo(bar, baz) {
      var x = bar * baz;

      return [Promise.resolve(x), getY(x)];
    }

    Promise.all(foo(10, 20)).then(function (msgs) {
      var x = msgs[0];
      var y = msgs[1];

      log(x, y); // 200 59
    });

    // Promise.all 패턴이 더 나은 코드라고 할 수 있다.
    // x 와 y 값을 별도 함수로 분리할 수 있고 호출부에서 프라미스를 알아서 조정할 수 있다.
    // foo 안에서 로직을 추상화하는 것보다 낫다.
  }

  // 인자 스프레드하기
  {
    // var x 나 var y 는 불필요한 오버헤드다.
    function spread(fn) {
      return Function.apply.bind(fn, null);
    }

    Promise.all(foo(10, 20)).then(
      spread(function (x, y) {
        log(x, y);
      })
    );
  }
}
