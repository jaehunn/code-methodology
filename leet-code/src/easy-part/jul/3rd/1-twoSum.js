// @see https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 1. 1차원 캐싱 순회, 캐싱: 타겟의 nums[i]의 보수
// 2. 인덱스를 값으로 접근해야하므로 객체를 이용한다.
function twoSum(nums, target) {
  const m = {};

  for (let i = 0; i < nums.length; i += 1) {
    // caching
    let c = target - nums[i];
    if (c in m) return [m[c], i];
    m[nums[i]] = i;
  }

  return null;
}
