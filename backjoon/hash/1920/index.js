/**
 *  @param {number[][]} nums
 *  @return {number[]}
 */

function searchNum(nums) {
  let h = new Map();
  nums[0].forEach((v) => {
    h.set(v, true);
  });

  let r = [];
  for (let i = 0; i < nums[1].length; i += 1) {
    if (h.has(nums[1][i])) r.push(1);
    else r.push(0);
  }

  return r;
}

// to dictionary
function searchNumber(numbers) {
  const hash = {};
  numbers[0].forEach((v) => {
    hash[v] = true;
  });

  let result = [];
  for (let index = 0; index < numbers[1].length; index += 1) {
    if (hash[numbers[1][index]]) result.push(1);
    else result.push(0);
  }

  return result;
}
