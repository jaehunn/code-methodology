/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  digits[digits.length - 1] += 1;

  // c = carryIn
  let c = 0;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (digits[i] + c > 9) {
      digits[i] = (digits[i] + c) % 10;
      c = 1;
    } else {
      digits[i] = digits[i] + c;
      c = 0;
    }
  }

  return c === 1 ? [1].concat(digits) : digits;
};

// no-add
function _plusOne(digits) {
  let c = 1;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    digits[i] += c;
    digits[i] = digits[i] > 9 ? ((c = 1), digits[i] - 10) : ((c = 0), digits[i]);
  }

  if (c === 1) digits.unshift();

  return digits;
}
