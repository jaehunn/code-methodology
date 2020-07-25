// @see https://leetcode.com/problems/sqrtx/
/**
 * @param {number} x
 * @return {number}
 */

// binary search
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

function _mySqrt(x) {
  if (x < 1) return 0;
  let l = 1;
  let r = x;
  let m = 0;

  while (l + 1 < r) {
    m = Math.floor((l + r) / 2);

    if (m * m > x) r = m;
    else if (m * m < x) l = m;
    else return m;
  }

  return l;
}
