// @see https://leetcode.com/problems/length-of-last-word/
/**
 * @param {string} s
 * @return {number}
 */

// native methods
var lengthOfLastWord = function (s) {
  return s.trim().split(" ").pop().length;
};

// iterate
function _lengthOfLastWord(s) {
  let l = 0;
  let f = false;

  for (let i = s.length - 1; i >= 0; i -= 1) {
    if (s[i] !== "") f = true;
    if (f) {
      if (s[i] === " ") break;
      else l += 1;
    }
  }

  return l;
}
