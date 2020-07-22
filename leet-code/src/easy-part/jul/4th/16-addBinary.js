// @see https://leetcode.com/problems/add-binary/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let r = "";
  let i = a.length - 1;
  let j = b.length - 1;

  let c = 0;
  while (i >= 0 || j >= 0 || c > 0) {
    c += (+a[i--] || 0) + (+b[j--] || 0); // after then decrease
    // c += i >= 0 ? +a[i--] : 0;
    // c += j >= 0 ? +b[j--] : 0;

    r = (c % 2) + r; // carry in + a[i] + b[j]
    c = (c / 2) << 0; // trunk()
  }

  return r;
};
