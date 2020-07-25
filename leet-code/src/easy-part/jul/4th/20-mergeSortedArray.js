// @see https://leetcode.com/problems/merge-sorted-array/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let l = m-- + n--;

  while (l--) {
    if (n < 0 || nums1[m] > nums2[n]) nums1[l] = nums1[m--];
    else nums1[l] = nums2[n--];
  }

  return nums1;
};

console.log(merge([2, 4, 5], 3, [3, 4, 5], 3));
