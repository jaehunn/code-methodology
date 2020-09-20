const log = console.log;

function f(cb) {
  setTimeout(function () {
    try {
      var x = g(); // g.e() is async

      cb(null, x);
    } catch (e) {
      cb(e); // never
    }
  }, 100);
}

f(function (e, v) {
  if (e) console.error("e" + e);
  // error
  else console.log("v" + v);
});

// g 가 동기, 비에러면 x 에 값이 할당 -> v 출력
// g 가 동기, 에러면 catch -> e 출력

// g 가 비동기면 에러면, x 에 값 미할당 -> undefined
// g 가 비동기 비에러면,
