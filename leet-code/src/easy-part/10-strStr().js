// @see https://leetcode.com/problems/implement-strstr/
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
  if (haystack === needle || needle === "") return 0;

  for (let i = 0; i < haystack.length; i += 1) {
    // first character matching
    if (haystack[i] === needle[0]) {
      let s = haystack.substring(i, i + needle.length);

      if (s === needle) return i; // find
    }
  }

  return -1; // failure
}
