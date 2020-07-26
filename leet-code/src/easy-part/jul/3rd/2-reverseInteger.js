// @see https://leetcode.com/problems/reverse-integer/
/**
 * @param {number} x
 * @return {number}
 */

// 1. 자릿수 연산
// 2.
function reverse(x) {
  const m = 2 ** 31;

  let r = 0;
  while (x) {
    r = r * 10 + (x % 10);

    if (r >= m || r < -m) return 0; // 2^31 <= x < 2*31

    x = (x / 10) << 0; // << = trunk()
  }

  return r;
}

// native 패턴
function _reverse(x) {
  if (x < 0) return -1 * reverse(-x); // 음수 부호를 보존한다.

  // Hacky 패턴
  const r = parseInt(String(x).split("").reverse().join(""), 10);

  return r;
}
