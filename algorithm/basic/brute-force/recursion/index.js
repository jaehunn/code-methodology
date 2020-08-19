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

//(WIP)
// 2. Z
// @see https://www.acmicpc.net/problem/1074
{
  function z(n, X, Y) {
    let r = 0;
    return _r(2 ** n, 0, 0); // first call

    function _r(size, _x, _y) {
      if (size === 2) {
        if (_x === X && _y === Y) return r;
        r += 1;
        if (_x + 1 === X && _y === Y) return r;
        r += 1;
        if (_x === X && _y + 1 === Y) return r;
        r += 1;
        if (_x + 1 === X && _y + 1 === Y) return r;
        r += 1;
        return r;
      }

      size = (size / 2) << 0;
      _r(size, _x, _y);
      _r(size, _x + size, _y);
      _r(size, _x, _y + size);
      _r(size, _x + size, _y + size);
    }
  }

  console.log(z(2, 2, 1));
}
