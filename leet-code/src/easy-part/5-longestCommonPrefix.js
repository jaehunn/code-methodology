// @see https://leetcode.com/problems/longest-common-prefix/
/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let r = "";
  for (let i = 0; i < strs[0].length; i += 1) {
    for (let j = 1; j < strs.length; j += 1) {
      if (strs[0][i] !== strs[j][i]) return r;
    }

    r += strs[0][i];
  }

  return r;
}

function _longestCommonPrefix(strs) {
  if (!strs[0]) return "";

  let r = "";
  let c = "";
  let i = 0;
  while (i < strs[0].length) {
    c = strs[0].substring(0, i + 1);

    let f = strs.every((x) => x.startsWith(c));

    // success
    if (f) r = c;
    else break; // failure

    i += 1;
  }

  return r;
}
