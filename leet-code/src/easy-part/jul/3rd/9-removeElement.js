// @see https://leetcode.com/problems/remove-element/
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === val) {
      nums.splice(i, 1); // mutable

      i -= 1;
    }
  }

  return nums.length;
}

function _removeElement(nums, val) {
  let i = 0;

  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== val) {
      nums[i] = nums[j]; // result index control

      i += 1;
    }
  }

  return i; // last i == length
}
