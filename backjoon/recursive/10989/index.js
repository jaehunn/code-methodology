/**
 * @param {number[]} nums
 * @return {number[]}
 */

// larger size and limited number range -> counting sort
var countingSort = function (nums) {
  let _r = []; // index: value, value: count

  nums.sort((a, b) => a - b); // increase sorting

  // counting
  for (let i = 0; i < nums.length; i += 1) {
    if (!_r[nums[i]]) _r[nums[i]] = 1;
    else _r[nums[i]] += 1;
  }

  console.log(_r);

  let r = [];
  _r.forEach((v, i) => {
    while (v) {
      r.push(i);
      v -= 1;
    }
  });

  return r;
};

console.log(countingSort([5, 2, 3, 1, 4, 2, 3, 5, 1, 1, 7]));
