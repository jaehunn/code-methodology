/**
 *  @param {number} n
 *  @param {number} m
 *  @param {number[]} nums
 *  @return {number}
 **/

// brute force - for
function blackjack(n, m, nums) {
  let r = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      for (let k = j + 1; k < n; k += 1) {
        let sum = nums[i] + nums[j] + nums[k];

        if (sum <= m) r = Math.max(r, sum);
      }
    }
  }

  return r;
}
