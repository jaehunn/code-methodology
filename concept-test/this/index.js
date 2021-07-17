const log = console.log;
const start = console.time;
const end = console.timeEnd;

// this binding: default, implicit, explicit, new
{
  // call stack / caller / callee
  {
    function foo() {
      // ...
    }

    foo();

    // call stack: global -> foo
    // caller: foo
    // callee: global
  }

  // default binding: global
  {
    function foo() {
      log(this.a); // 10
    }

    var a = 10;
  }

  // implicit binding: object
  {
    var obj2 = {
      a: 20,
      obj,
    };
    
    var obj = {
      a: 10,
      foo,
    };

    function foo() {
      log(this.a);
    }

    obj.foo(); // 10

    obj2.obj.foo(); // ?
  }

  // explicit binding: apply(), bind(), call()
  {
    var obj = {
      a: 10,
    };

    function foo(b, c) {
      log(this.a + b + c);
    }

    foo.call(obj, 2, 3); // obj context, 15
    foo.bind(obj, 10); // ?
    foo.apply(obj, [10, 2]); // 22
  }

  // new binding: instance
  {
    function foo(a) {
      this.a = a;
    }

    var bar = new foo(10);
    log(bar.a); // 10
  }

  // new -> explicit -> implicit -> default
}

// ------------------------
// implicit binding: 10
// explicit binding: [Function: bound foo] -> var bar = foo.bind(obj, 10);
