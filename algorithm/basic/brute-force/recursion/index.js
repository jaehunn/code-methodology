// 1. fibonacci
{
  // 1) iteration
  function fibonacci(num) {
    let p = 0;
    let c = 1;

    while (num > 0) {
      [p, c] = [c, p + c];

      num -= 1;
    }

    return p;
  }

  // 2) recursion
  function _fibonacci(num) {
    if (num === 0) return 0;
    if (num === 1) return 1;

    return _fibonacci(num - 1) + _fibonacci(num - 2);
  }
}

// 2. Z
// @see https://www.acmicpc.net/problem/1074
{
  function z(n, x, y) {
    let r = 0;
    _r(n ** 2, 0, 0);

    function _r(N, _x, _y) {
      if (N === 2) {
        if (_x === x && _y === y) console.log(r);
        r += 1;
        if (_x + 1 === x && _y === y) console.log(r);
        r += 1;
        if (_x === x && _y + 1 === y) console.log(r);
        r += 1;
        if (_x + 1 === x && _y + 1 === y) console.log(r);
        return (r += 1);
      }

      // failed -> +4
      let _N = (N / 2) >> 0;
      _r(_N, _x, _y);
      _r(_N, _x + _N, _y);
      _r(_N, _x, _y + _N);
      _r(_N, _x + _N, _y + _N);
    }
  }

  z(2, 2, 1);
}
