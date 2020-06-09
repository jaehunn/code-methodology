/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  if (!s.length) return false;

  let nS = Array.from(s).map((v) => {
    if (v === "(") return 1;
    else if (v === ")") return -1;
    else if (v === "{") return 2;
    else if (v === "}") return -2;
    else if (v === "[") return 4;
    else if (v === "]") return -4;
  });

  let r = [];

  r.push(nS[0]);
  for (let i = 1; i < nS.length; i += 1) {
    const c = nS[i] + r[r.length - 1];

    if (c === 0) r.pop();
    else r.push(nS[i]);
  }

  return !r.length;
};

function isValid(s) {
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  let arr = [];
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === "(" || s[i] === "[" || s[i] === "{") arr.push(s[i]);
    else {
      if (arr[arr.length - 1] === map[s[i]]) arr.pop();
      else return false;
    }
  }

  return arr.length === 0 ? true : false;
}
