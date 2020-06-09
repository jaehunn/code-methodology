/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 **/

/* 
  1. brute force
  The brute force approach is simple. 
  Loop through each element x and find it there is another value that equals to target - x.
  Time complexity: O(n^2). for each element, we try to find its complement by looping through the rest of array which takes O(n) time.
  Therefore, the time complexity is O(n^2). 
  Space complexity: O(1).
*/

var bfTwoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    let rest = target - nums[i];

    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[j] === rest) return [i, j];
    }
  }
};

/*
  1. 2 Passing Hash Table
  To Improve out run time complexity, we need a more efficient way to check if the complement exists in the array.
  If the complement exists, we need to loop up its index. What is the best way to maintain a mapping of each element in the array to its index?
  A Hash table.

  We reduce the look up time from O(n) to O(1) by trading space for speed.
  A hash table is built exactly for this purpose, it supports fast look up in near constant time.
  I say "near" because if a collision occurred, a look up could degenerate to O(n) time.
  But look up in hash table should be amortized O(1) time as long as the hash function was chosen carefully.

  A simple implementation uses two iterations.
  In the first iteration, we add each element's value and its index to the table.
  Then, in the second iteration we check if each element's complement (target - nums[i]) exists in the table.
  Beware that the complement must not be nums[i] itself.

  Time complexity: O(n). We traverse the list containing n elements exactly twice. Since the hash table reduces the look up time to O(1), the time complexity is O(n).
  Space complexity: O(n). The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.
*/

var twoPassingTwoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    map.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i += 1) {
    let complement = target - nums[i];

    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }
};

/* 
  2. 1 Passing Hash Table
  It turns out we can do it in one-pass. While we iterate and inserting elements into the table.
  we also look back to check if current element's complement already exists in the table.
  if it exists, we have found a solution and return immediately.
*/
var onePassingTwoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    let complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
};
