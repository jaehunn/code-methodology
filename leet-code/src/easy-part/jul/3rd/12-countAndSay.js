// @see https://leetcode.com/problems/count-and-say/
/**
 * @param {number} n
 * @return {string}
 */

// recursive
function countAndSay(n) {
  // base case
  if (n === 1) return "1";

  // top down, split pieces
  return count(countAndSay(n - 1));
}

function count(strNum) {
  let r = "";
  let c = 1;

  for (let i = 0; i < strNum.length; i += 1) {
    // bubble searching
    if (strNum[i + 1] === strNum[i]) c += 1;
    else {
      r += c + "" + strNum[i]; // accumulate

      c = 1; // reset
    }
  }

  return r;
}
