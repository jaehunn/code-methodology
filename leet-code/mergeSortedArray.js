/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  for (let i = m; i < m + n; i += 1) {
    nums1[i] = nums2[m + n - 1 - i];
  }

  return nums1.sort((a, b) => a - b);
};

function _merge(nums1, m, nums2, n) {
  var len = m + n;

  m -= 1;
  n -= 1;

  while (len--) {
    if (n < 0 || nums1[m] > nums2[n]) {
      nums1[len] = nums1[m--];
    } else {
      nums1[len] = nums2[n--];
    }
  }
}

const list = [1, 2, 3, 0, 0, 0];
_merge(list, 3, [2, 5, 6], 3);
console.log(list);
