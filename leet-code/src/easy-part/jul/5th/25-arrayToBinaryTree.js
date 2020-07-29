// @see https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// *Are you understood Tree Concept?
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;

  const m = Math.floor(nums.length / 2);
  const r = new TreeNode(nums[m]);

  r.left = sortedArrayToBST(nums.slice(0, m));
  r.right = sortedArrayToBST(nums.slice(m + 1));

  return r;
};

function sortedArrayToBST(nums) {
  if (!nums) return null;

  function _r(nums, s, e) {
    // cross
    if (s > e) return null;

    // in-place
    let m = (s + (e - s) / 2) >> 0;
    let n = new TreeNode(nums[m]); // root

    n.left = _r(nums, s, m - 1);
    n.right = _r(nums, m + 1, e);

    return n;
  }

  return _r(nums, 0, nums.length - 1);
}
