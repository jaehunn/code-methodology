// @see https://leetcode.com/problems/search-insert-position/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

function searchInsert(nums, target) {
  let j = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] < target) j += 1;
  }

  return j;
}

// equal or less than => index
// ex) [1, 3, 5, 6] find 2, 3 return same index 1
function _searchInsert(nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] >= target) return i;
  }

  return nums.length;
}
