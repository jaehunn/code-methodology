// @see https://leetcode.com/problems/remove-duplicates-from-sorted-array/
/**
 * @param {number[]} nums
 * @return {number}
 */

// [1,1,1,2,2,2,3]
function removeDuplicates(nums) {
  let i = 0;

  nums.forEach((v) => {
    if (v !== nums[i]) nums[++i] = v; // update condition
  });

  return nums.length && i + 1;
}
