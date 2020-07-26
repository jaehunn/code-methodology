// @see https://leetcode.com/problems/palindrome-number/
/**
 * @param {number} x
 * @return {boolean}
 */

// native 패턴
function isPalindrome(x) {
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false;

  return String(x) === String(x).split("").reverse().join("");
}

function _isPalindrome(x) {
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false;

  const _x = x; // 사본 생성

  let r = 0;
  while (x) {
    r = r * 10 + (x % 10);

    x = (x / 10) << 0; // 십진수화
  }

  return _x === r;
}
