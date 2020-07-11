// @see https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Key 가 정수고, Value 가 인덱스인 해쉬를 생성한다.
  const m = {};

  for (let i = 0; i < nums.length; i += 1) {
    // 보수를 구하고 캐싱한다.
    let c = target - nums[i];
    if (c in m) return [m[c], i];

    // 캐싱에 실패했다면, 메모한다.
    m[nums[i]] = i;
  }

  return null;
}
