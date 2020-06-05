/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 **/

var bfTwoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    let rest = target - nums[i];

    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[j] === rest) return [i, j];
    }
  }
};

var twoPassingTwoSum = function (nums, target) {
  let map = new Map();

  // save
  for (let i = 0; i < nums.length; i += 1) {
    map.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i += 1) {
    let complement = target - nums[i];

    // caching
    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }
};

var onePassingTwoSum = function (nums, target) {
  let map = new Map();

  // immediately process
  for (let i = 0; i < nums.length; i += 1) {
    let complement = target - nums[i];

    // caching
    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    // save
    map.set(nums[i], i);
  }
};
