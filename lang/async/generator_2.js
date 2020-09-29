const log = console.log;
const clear = console.clear;

// iterable protocol: Symbol.iterator property
// iterator protocol: next() { return { value, done }; }

const items = [1, 2, 3];

log(Symbol.iterator in items); // true

for (const value of items) {
  log(value);
}

// object is not iterable

const iterator = items[Symbol.iterator](); // return iteartor

log("next" in iterator);

for (const value of iterator) {
  log(value); // iteartor.next().value
}

// next: item pointer
let value = items[Symbol.iterator]();
for (let i = 0; i <= items.length; i += 1) {
  log(value.next());
}

// data consumer => for-of, spread operator
// data provider => iterable

// data consistent traverse
// iteration protocol -> interaface (consumer, provider)

// generator function: create iterable
function* gen() {
  log("first");
  yield 1;

  log("second");
  yield 2;

  log("three");
}

// gen() -> return iterator
const iter = gen();

clear();
log(Symbol.iterator in gen()); // true
log(iter.next()); // yield 1 -> value 1
log(iter.next()); // yield 2 -> value 2
log(iter.next()); // return X -> value undefined

// generator = iterable + iterator

// custom iterable
const iterationProtocolFunc = (function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];

      return { value: cur };
    },
  };
})();

for (const value of iterationProtocolFunc) {
  if (value > 10) break;

  log(value);
}

clear();

const g = function* (max) {
  let [pre, cur] = [0, 1];

  while (1) {
    [pre, cur] = [cur, pre + cur];

    if (cur > max) return;

    yield cur;
  }
};

const f = function () {
  const iter = g(10);

  log(iter.next());
  log(iter.next());
};

f();

// async
function getUser(username) {
  request("url" + username).then(
    (user) => iter.next(user.name),
    (e) => iter.throw(e)
  );
}

function* gen() {
  try {
    const value = yield getUser("jaehun");

    log(value);
  } catch (e) {
    log(e);
  }
}

const it = gen();
it.next();
