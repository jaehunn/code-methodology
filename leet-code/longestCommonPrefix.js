/**
 * @param {string[]} strs
 * @return {string}
 */

// horizontal scanning
// vertical scanning

// simple solution
function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  for (let i = 0; i < strs[0].length; i += 1) {
    for (let str of strs) {
      if (str[i] !== strs[0][i]) {
        return str.slice(0, i);
      }
    }
  }

  return strs[0];
}

function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  let result = "";

  for (let i = 0; i < strs[0].length; i += 1) {
    for (let j = 1; j < strs.length; j += 1) {
      if (strs[0][i] !== strs[j][i]) return result;
    }

    result += strs[0][i];
  }

  return result;
}

function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  let result = "";
  let current = "";
  let index = 0;
  while (index < strs[0].length) {
    current = strs[0].substring(0, index + 1); // [0 ... index]
    let flag = strs.every((value) => value.startsWith(current)); // prefix judgement

    if (flag) result = current;
    else break; // move to next index

    index += 1;
  }

  return result;
}

function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  let result = "";
  for (let i = 0; i < strs[0].length; i += 1) {
    if (strs.every((str) => strs[0][i] === str[i])) {
      result += strs[0][i];
    } else break;
  }

  return result;
}

function longestCommonPrefix(strs) {
  let index = 0;
  let common = "";
  let stop = false;

  const longest = strs.reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);

  while (index < longest && !stop) {
    const chars = strs.map((str) => str.charAt(index)); // Access to string element: charAt()
    const isAllTheSame = chars.reduce((acc, cur, i, src) => {
      if (!src[i - 1]) return acc;
      if (!acc) return false;
      if (cur !== src[i - 1]) return false;

      return true;
    }, true);

    common += isAllTheSame ? chars[0] : "";
    stop = isAllTheSame ? stop : true;
    index += 1;
  }

  return common;
}
