// @see https://leetcode.com/problems/climbing-stairs/
/**
 * @param {number} n
 * @return {number}
 */

// recursive approach
function climbStairs(n) {
  // base, n < 2
  if (n === 0) return 0; // 0
  if (n === 1) return 1; // 1
  if (n === 2) return 2; // 1 + 1,

  if (climbStairs[n]) return climbStairs[n];

  return (climbStairs[n] = climbStairs(n - 1) + climbStairs(n - 2));
}

// n = 3
// (n = 2) + (n = 1), 3

// n = 4
// (n = 3) + (n = 2), 3 + 2

// list
function _climbStairs(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;

  let r = [0, 1, 2]; // 0 1 2
  for (let i = 3; i <= n; i += 1) {
    r[i] = r[i - 1] + r[i - 2];
  }

  return r[n];
}
