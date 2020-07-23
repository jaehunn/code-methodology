// @see https://leetcode.com/problems/sqrtx/
/**
 * @param {number} x
 * @return {number}
 */

// ex) x = 5
function mySqrt(x) {
  let l = 0;
  let r = x; // 5

  // 0 < 5
  // 3 < 5
  // 3 == 3 break;
  while (l < r) {
    const m = Math.floor((l + r) / 2); // 2, 4

    if (m * m === x) return m;
    if (x < m * m) r = m - 1;
    // r = 3
    else l = m + 1; // l = 3
  }

  // 5 < 9, 5 = 2.xxx -> return 2;
  return x < r * r ? r - 1 : r;
}
