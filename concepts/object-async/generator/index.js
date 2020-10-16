// delegation
{
    function *foo() {
        console.log(yield 'B');
        console.log(yield 'C');

        return 'D'
    }

    function *bar() {
        console.log(yield 'A');
        console.log(yield *foo());
        console.log(yield 'E');

        return 'F'
    }

    var it = bar();

    console.log(it.next().value); // A
    console.log(it.next(1).value); // 1 -> B
    console.log(it.next(2).value); // 2 -> C
    console.log(it.next(3).value); // 3 -> D -> E
    console.log(it.next(4).value); // 4 -> F
}

{
    function *bar() {
        console.log(yield 'A');
        console.log(yield *['B', 'C', 'D']);
        console.log(yield 'E');

        return 'F'
    }

    var it = bar();

    console.log(it.next().value) // A
    console.log(it.next(1).value) // 1 -> B
    console.log(it.next(2).value) // C
    console.log(it.next(3).value) // D
    console.log(it.next(4).value) // undefined -> E
    console.log(it.next(5).value) // 5 -> F
}

{
    function *foo() {
        try {
            yield 'B';
        } catch (err) {
            console.log(err)
        }

        yield 'C';

        throw 'D'
    }

    function *bar() {
        yield 'A';

        try {
            yield *foo();
        } catch (err) {
            console.log(err)
        }

        yield 'E';

        yield *baz();

        yield 'G'
    }
    
    function *baz() {
        throw 'F'
    }

    var it = bar();

    console.log(it.next().value); // A
    console.log(it.next(1).value); // B
    console.log(it.throw(2).value); // 2 -> C
    console.log(it.next(3).value); // D -> E
    
    try {
        console.log(it.next(4).value);
    } catch (e) {
        console.log(e); // F
    }
}

{
    function *foo() {
        var r2 = yield request('http://some.url.2');
        var r3 = yield request('http://some.url.3/?v=' + r2);

        return r3;
    }

    
    function *bar() {
        var r1 = yield request('http://some.url.1');
        var r3 = yield *foo();

        console.log(r3);
    }
}

{
    function *foo(val) {
        if (val > 1) {
            val = yield *foo(val - 1);
        }

        return yield request('http://some.url/?v=' + val);
    }

    function *bar() {
        var r1 = yield *foo(3);

        console.log(r1);
    }

    run(bar)
}
