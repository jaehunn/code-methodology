// @see https://leetcode.com/problems/maximum-subarray
/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  let m = -Number.MAX_VALUE; //

  let p = 0;
  for (let i = 0; i < nums.length; i += 1) {
    // continuous array
    p = Math.max(p + nums[i], nums[i]); // prev + cur, cur

    // // total max
    m = Math.max(m, p);
  }

  return max;
}

// current Index start, continous array
function _maxSubArray(nums) {
  let m = nums[0]; // init
  for (let i = 1; i < nums.length; i += 1) {
    // continuous, pick the positive value
    if (nums[i - 1] > 0) nums[i] += nums[i - 1];

    m = Math.max(nums[i], m);
  }

  return m;
}
