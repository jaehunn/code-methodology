// @see https://leetcode.com/problems/single-number/
/**
 * @param {number[]} nums
 * @return {number}
 */
// restrict: linear Time, no extra memory
// my code
var singleNumber = function (nums) {
  nums.sort((a, b) => a - b); // [1, 1, 2, 2, 4]

  // bubble
  for (let i = 0; i < nums.length - 1; i += 2) {
    if (nums[i] !== nums[i + 1]) return nums[i];
  }

  return nums[nums.length - 1];
};

console.log(__singleNumber([4, 1, 2, 1, 2])); // 1

// reduce(), XOR operation
function _singleNumber(nums) {
  return nums.reduce((p, c) => p ^ c, 0); // return XOR(differ: 1)
}

// 4: 0100
// 1: 0001
// 2: 0010

function _singleNumber(nums) {
  let n = 0;
  for (let v of nums) {
    n ^= v;
  }

  return n;
}

{
  let a = 1; // 0001
  let b = 4; // 0100
  let c = 2; // 0010

  // ^: differ = 1, 0 or 1 => definitely up 1
  console.log(a ^ b, b ^ c); // 3(add) 0(same)
}
