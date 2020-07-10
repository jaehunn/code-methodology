/**
 * @param {number} x
 * @return {number}
 */

// digit 패턴
function reverse(x) {
  const m = 2 ** 31;

  let r = 0;
  while (x) {
    // 음수 부호는 신경쓸 필요가 없다. 음수가 더해지는 패턴
    r = r * 10 + (x % 10);

    if (r >= m || r < -m) return 0; // 2^31 <= x < 2*31

    x = (x / 10) << 0; // << = trunk()
  }

  return r;
}

// native 패턴
function r_reverse(x) {
  if (x < 0) return -1 * reverse(-x); // 음수 부호를 보존한다.

  // Hacky 패턴
  const r = parseInt(String(x).split("").reverse().join(""), 10);

  return r;
}
