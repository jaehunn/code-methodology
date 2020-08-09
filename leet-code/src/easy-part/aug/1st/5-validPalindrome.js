// @see https://leetcode.com/problems/valid-palindrome/
/**
 * @param {string} s
 * @return {boolean}
 */

// \w -> alphanumeric
// \W -> non-alphnumeric
var isPalindrome = function (s) {
  if (!s.length) return true;

  let r = s.toLowerCase().replace(/[\W]/g, ""); // remove non-alpha numeric

  let i = 0;
  let j = r.length - 1;

  // break: cross s, e
  while (i < j) {
    if (r[i++] !== r[j--]) return false;
  }

  return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));

function _isPalindrome(s) {
  s = toLowerCase().replace(/[^a-z0-9]/gi, "");

  for (let i = 0, j = s.length - 1; i <= j; i += 1, j -= 1) {
    // pick charAt() vs. indexing
    if (s.charAt(i) !== s.charAt(j)) return false;
  }

  return true; // not failed
}
