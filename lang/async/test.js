const log = console.log;
const error = console.error;

function* f() {
  try {
    yield "B";
  } catch (err) {
    log(err);
  }

  yield "C";

  throw "D";
}

function* g() {
  yield "A";

  try {
    yield* f();
  } catch (err) {
    log(, err); // 3
  }

  yield "E";

  yield* e();

  yield "G";
}

function* e() {
  throw "F";
}

var it = g();

it.next().value; // A
it.next(1).value; // B
it.throw(2).value; // error: 2, C
it.throw(3).value; // error: 3, D
