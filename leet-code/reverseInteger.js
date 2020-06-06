/**
 * @param {number} x
 * @return {number}
 **/

// digits
var reverse = function (value) {
  // range: 2^-31 < value < 2^31 - 1

  const MAX = 2 ** 31 - 1;
  const MIN = (-2) ** 31;

  let result = 0;
  while (value !== 0) {
    result = result * 10 + (value % 10);

    if (value > MAX || value < MIN) return 0;

    value = (value / 10) << 0; // digit 1
  }

  return result;
};

// native methods
var reverse = function (value) {
  // sign
  if (value < 0) return -1 * reverse(-value); // recursive

  const result = parseInt(`${value}`.split("").reverse().join(""), 10); // parseInt -> cut zero of front
  if (result > 2 ** 31 - 1) return 0; // r is always positive

  return result;
};
