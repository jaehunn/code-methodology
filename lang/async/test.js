const log = console.log;
const error = console.error;

console.log([].slice.call([1, 2, 3], 1));

function* f(x, y) {
  return x * y;
}

var it = f(1, 2);

log(it.next()); // { value: 2, done: true }

log(it.next()); // { value: undefined, done: true }
