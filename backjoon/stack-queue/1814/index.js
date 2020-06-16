/**
 * @param {number} n
 * @param {number[]} nums
 * @return {number}
 **/

// 4 3 6 8 7 5 2 1
// 1234 push(4) pop -> 4
// 123 pop -> 3
// 1256 push(2) pop -> 6
// 12578 push(2) pop -> 8
// 1257 pop -> 7
// 125 pop -> 5
// 12 pop -> 2
// 1 pop -> 1

// 1. Push to ...nums[i]
// 2. Confirm nums[top]
function stackSequence(n, nums) {
  let s = [];
  let r = [];

  let c = 1;
  for (let i = 0; i < n; i += 1) {
    let t = nums[i];

    while (c <= t) {
      s.push(c);
      r.push("+");
      c += 1;
    }

    if (s[s.length - 1] === t) {
      s.pop();
      r.push("-");
    } else {
      return;
    }
  }

  return r;
}
