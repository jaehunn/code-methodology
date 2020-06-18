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
