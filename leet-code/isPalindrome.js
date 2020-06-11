/**
 * @param {number} x
 * @return {boolean}
 */

function isPalindrome(x) {
  if (x < 0) return false; // negative
  if (x < 10) return true; // units 1
  if (x % 10 === 0) return false; // deca(= 10^n)

  let rev = 0;
  while (rev < x) {
    rev *= 10; // move
    rev += x % 10; // set

    x = Math.trunc(x / 10); // next
  }

  return rev === x || Math.trunc(rev / 10) === x;
}
