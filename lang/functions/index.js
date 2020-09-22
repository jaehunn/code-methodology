const log = console.log;
const clear = console.clear;

// call apply bind
{
  function foo(x, y) {
    log(x, y);
  }

  foo.call(null, 1, 2);
  foo.call(null, 1);

  foo.apply(null, [1, 2]);
  foo.apply(null, [1]);

  var obj = {
    x: 3,
    y: 4,
    bar: function () {
      log(this.x, this.y);
    },
  };

  var obj2 = {
    x: 1,
    y: 2,
  };

  obj.bar();
  obj.bar.call(obj);
  obj.bar.call(obj2); // this -> obj2

  function baz(fn) {
    return Function.bind(fn);
  }

  const _foo = baz(foo);
  _foo([1, 2]);
}
