/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let prev = 0;
  let max = -Number.MAX_VALUE;

  for (let i = 0; i < nums.length; i += 1) {
    prev = Math.max(prev + nums[i], nums[i]); // update condition

    max = Math.max(max, prev); // max memo
  }

  return max;
};

function maxSubArray(nums) {
  let cur = nums[0];
  let res = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    if (cur < 0) cur = nums[i];
    // negative, move(next index)
    else cur += nums[i]; // positive, accumulate

    res = Math.max(res, cur); // memo res
  }

  return res;
}
