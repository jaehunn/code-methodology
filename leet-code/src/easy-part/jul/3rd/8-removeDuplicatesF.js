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

function _removeDuplicates(nums) {
  let i = (r = 0);

  while (r < nums.length) {
    nums[i] = nums[r];

    i += 1;
    r += 1;

    while (nums[r] === nums[r - 1]) r += 1; // find differ number
  }

  return i;
}
