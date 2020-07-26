// @see https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

function twoSum(nums, target) {
  const m = {};

  for (let i = 0; i < nums.length; i += 1) {
    let c = target - nums[i];
    if (c in m) return [m[c], i];
    m[nums[i]] = i;
  }

  return null;
}
