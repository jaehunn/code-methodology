// @see https://leetcode.com/problems/symmetric-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;

  function _r(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    return _r(p.left, q.right) && _r(p.right, q.left);
  }

  return _r(root.left, root.right);
};
