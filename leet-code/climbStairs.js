/**
 *  @param {number} n
 *  @return {string}
 */

var climbStairs = function (n) {
  // cashing
  if (climbStairs[n]) return climbStairs[n];
  if (n < 2) return 1;

  return (climbStairs[n] = climbStairs(n - 2) + climbStairs(n - 1));
};

// stair3, result = 3 (stair2 + stair1)
// memo
var memo = [];
function _StairsCase(n) {
  if (memo[n]) return memo[n];

  if (n < 2) return 1; // (1) / (0): 1

  // 3 => 2 + 1 => 1 + 1 + 1
  return (memo[n] = _StairsCase(n - 1) + _StairsCase(n - 2));
}

console.log(_StairsCase(3));
