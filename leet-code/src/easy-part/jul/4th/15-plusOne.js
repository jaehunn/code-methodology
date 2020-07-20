// @see https://leetcode.com/problems/plus-one/
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (digits[i] === 9) digits[i] = 0;
    else {
      digits[i] += 1;
      return digits;
    }
  }

  return [1, ...digits];
};

var _plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (++digits[i] > 9) digits[i] = 0;
    else return digits;
  }

  return [1, ...digits];
};
