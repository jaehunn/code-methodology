/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// brute force
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[j] === target - nums[i]) {
        return [i, j];
      }
    }
  }
};

// two-pass hash
var twoSum2 = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    map.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i += 1) {
    let complement = target - nums[i];

    if (map.has(complement) && map.get(complment) !== i) {
      return [i, map.get(complement)];
    }
  }
};

// one-pass hash
var twoSum3 = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];

    if (map.has(complement)) {
      return [i, map.get(complement)];
    }

    map.set(nums[i], i);
  }
};
