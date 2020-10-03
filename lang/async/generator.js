const log = console.log;
const clear = console.clear;

// 어떻게 하면
// run-to-completion (no context change)
{
  var x = 1;

  function f() {
    x++;

    g(); // interruption? (interruption = preemption)

    log("x: ", x);
  }

  function g() {
    x++;
  }

  f();
}
// cooperative concurrency (cooperative = non-preemption)
{
  var x = 1;

  function* f() {
    x++;

    yield; // stop

    log("x:", x);
  }

  function g() {
    x++;
  }

  // use
  var it = f(); // it = iterator (f = generator)

  it.next(); // x++, stop yield
  log(x); // 2

  g(); // x++
  log(x); // 3

  it.next(); // x: 3, restart
}

// generator
{
  // 1. function
  {
    function* f(x, y) {
      return x * y;
    }

    var it = f(1, 2);
    var o = it.next(); // return 1 * 2;
    o.value; // 42
  }

  // 2. messaging
  {
    function* f(x) {
      var y = x * (yield);

      return y;
    }

    var it = f(1);

    it.next(); // iterator start

    var o = it.next(2); // var y = 1 * 2; return y;

    o.value; // 2
  }

  // 3. yield, next
  {
    function* f(x) {
      var y = x * (yield "default");

      return y;
    }

    var it = f(1);

    var o = it.next(); // start
    o.value(); // 'default'

    o = it.next(2); // var y = 1 * 2; return 2;
    o.value; // 2

    // next(): request
    // yield: response

    // 1. it.next() -> yield: 'default'
    // 2. it.next(2) -> return 2;
  }

  // 4. multi iterator
  {
    function* f() {
      var x = yield 2;

      z++;

      var y = yield x * z;

      log(x, y, z);
    }

    var z = 1;

    var it_1 = f();
    var it_2 = f();

    var v_1 = it_1.next().value; // 2
    var v_2 = it_2.next().value; // 2

    v_1 = it_1.next(v_2 * 10).value; // x: 20, z: 2, x * z = 40
    v_2 = it_2.next(v_1 * 5).value; // x: 200, z: 3, x * z = 600

    it_1.next(v_2 / 2); // y: 300, x: 20, z: 3
    it_2.next(v_1 / 4); // y: 10, x: 200, z: 3
  }

  // 5. race-condition
  {
    var a = 1;
    var b = 2;

    function* f() {
      a++;

      yield;

      b = b * a;

      a = (yield b) + 3;
    }

    function* g() {
      b--;

      yield;

      a = (yield 8) + b;
      b = a * (yield 2);
    }

    // helper (iterator controller)
    function step(gen) {
      var it = gen();
      var last;

      return function () {
        last = it.next(last).value; // yield 8 -> 8
      };
    }

    var s_1 = step(f);
    var s_2 = step(g);

    s_1(); // a: 2, b: 2
    s_1(); // a: 2, b: 4
    s_1(); // a: 7, b: 4

    s_2(); // a: 7, b: 3
    s_2(); // a: 7, b: 3
    s_2(); // a: 11, b: 3
    s_2(); // a: 11, b: 22

    log(a, b); // 11 22
  }
}

// iterator, generator
{
  var f = (function () {
    var next; // free-variable

    // closer
    return function () {
      if (next === undefined) next = 1;
      else next = 2 * next + 3;

      return next;
    };
  })();

  f(); // next: 1
  f(); // next: 5
  f(); // next: 13
  f(); // next: 29

  var g = function () {
    var next;

    return {
      [Symbol.iterator]: function () {
        return this;
      },
      next: function () {
        if (next === undefined) next = 1;
        else next = 2 * next + 3;

        return { done: false, value: next };
      },
    };
  };

  // use iterator
  for (var v of g) {
    log(v); // v = iterator.next().value

    if (v > 500) break; // done: false -> infinite loop
  }

  for (var o; (o = g.next()) && !o.done; ) {
    log(o.value);

    if (o.v > 500) break;
  }

  // ES6 Array (+ iterator), Object is not iterator
  const arr = [1, 3, 5, 7, 9];
  for (var v of arr) {
    log(v);
  }
}

// iterable
{
  // iterator: interface to next method
  // iterable has Symbol.itearator method
  const arr = [1, 3, 5, 7, 9];

  var it = arr[Symbol.iterator]();

  it.next().value; // 1
  it.next().value; // 3
  it.next().value; // 5

  // g is iterable and itearator
  var g = function () {
    var next;

    return {
      [Symbol.iterator]: function () {
        return this;
      },
      next: function () {
        if (next === undefined) next = 1;
        else next = 2 * next + 3;

        return { done: false, value: next };
      },
    };
  };
}

// generator iterator
{
  function* f() {
    var next;

    while (true) {
      if (next === undefined) next = 1;
      else next = 2 * next + 3;

      yield next; // don't need to closure
    }
  }

  // f is genderator, not iterable
  // f return iterator

  for (var v of f()) {
    log(v); // 1 5 13 29 ...

    if (v > 500) break;
  }

  // for-of need to iterable
  // by the end, iterator of generator is iterable
}

// return()
{
  function* f() {
    try {
      var next;

      while (true) {
        if (next === undefined) next = 1;
        else next = 2 * next + 3;

        yield next;
      }
    } finally {
      log("clean up");
    }
  }

  var it = f();
  for (var v of it) {
    log(v);

    if (v > 500) log(it.return("return iterator").value); // send generator to message

    // don't need to 'break'
  }

  // 1 5 13 29
  // clean up
  // return iterator

  // it.return() -> finally, done = true
}

// generator asynchronous
{
  // callback
  function f(x, y, cb) {
    ajax("http://some.url.1/?x=" + x + "&y=" + y, cb);
  }

  f(1, 2, function (e, v) {
    if (e) log("e");
    else log(v);
  });

  // generator
  function f(x, y) {
    ajax("http://some.url/?x=" + x + "&y=" + y, function (e, v) {
      // throw -> generator
      if (e) it.throw(e);
      else it.next(v); // response -> generator
    });
  }

  function* g() {
    try {
      var x = yield f(1, 2); // yield (request) -> f()

      log(x);
    } catch (e) {
      log(e);
    }
  }

  var it = g();

  it.next();
}

// throw error
{
  function* f() {
    var x = yield "default";

    yield x.toLowerCase(); // error
  }

  var it = f();

  it.next().value; // 'default'

  try {
    it.next(1);
  } catch (e) {
    log(e); // TypeError
  }

  function* g() {
    var x = yield "default";

    log(x); // no work
  }

  var it_2 = g();

  it_2.next();

  try {
    it_2.throw("error"); // throw -> generator
  } catch (e) {
    log(e); // error
  }
}

// generator + promise
{
  // 1) promise -> yield,
  // 2) promise controls iterator

  function f(x, y) {
    return request("http://some.url/x=" + x + "&y=" + y); // return promise
  }

  function* g() {
    try {
      var v = yield f(1, 2);

      log(v);
    } catch (e) {
      log(e);
    }
  }

  var it = g();
  var p = it.next().value; // return promise

  p.then(
    function (v) {
      it.next(v); // controls iterator
    },
    function (e) {
      it.throw(e);
    }
  );
}

// (WIP) standalon utility, run()
{
  function* f(x, y) {}

  function run(gen) {
    var args = [].slice.call(arguments, 1);
    var it;

    it = gen.apply(this, args); // init

    return Promise.resolve().then(function handleNext(v) {
      var next = it.next(v);

      return (function handleResult(next) {
        if (next.done) return next.value;

        return Promise.resolve(next.value).then(handleNext, function handleError(e) {
          return Promise.resolve(it.throw(e)).then(handleResult);
        });
      })(next);
    });
  }
}

// async await
{
  function f(x, y) {
    return request("http://some.url.1/?x=" + x + "&y=" + y);
  }

  async function main() {
    try {
      var v = await f(1, 2);

      log(v);
    } catch (e) {
      log(e);
    }
  }
}

// promise concurrency in asynchronous
{
  function* f() {
    var v_1 = yield request("http://some.url.1");
    var v_2 = yield request("http://some.url.2");

    var v_3 = yield request("http://some.url.3/?v=" + v_1 + "," + v_2);

    log(v_3);
  }

  run(f); // independent request

  function* g() {
    var p_1 = request("http://some.url.1");
    var p_2 = request("http://some.url.2");

    var v_1 = yield p_1;
    var v_2 = yield p_2;

    var v_3 = yield request("http://some.url.3/?v=" + v_1 + "," + v_2);

    // == Promise.all([request(), request()])

    log(v_3);
  }

  run(g);
}

// hide promise
{
  function f(url_1, url_2) {
    return Promise.all([request(url_1), request(url_2)]);
  }

  function* g() {
    var r = yield f("http://some.url.1", "http://some.url.2");

    var r_1 = r[0];
    var r_2 = r[1];

    var r_3 = yield request("http://some.url.3/?v=" + r_1, +"," + r_2);

    log(r_3);
  }

  run(f);
}

// generator delegation
{
  function* f() {
    var v_2 = yield request("http://some.url.2");
    var v_3 = yield request("http://some.url.3/?v=" + v_2);

    return v_3;
  }

  function* g() {
    var v_1 = yield request("http://some.url.1");

    var v_3 = yield run(f);

    log(v_3);
  }

  run(g);
}
