// @see https://leetcode.com/problems/valid-parentheses/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // stack(push open brackets)
  // target(= closed brackets)
  // brackets mapping -> Map {}
  const m = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  let r = [];
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") r.push(s[i]);
    else {
      // top(= open) === Map[closed property]
      if (r[r.length - 1] === m[s[i]]) r.pop();
      else return false; // immediately
    }
  }

  return !r.length ? true : false;
};
