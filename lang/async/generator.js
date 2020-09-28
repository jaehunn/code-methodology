const log = console.log;
const clear = console.clear;

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
