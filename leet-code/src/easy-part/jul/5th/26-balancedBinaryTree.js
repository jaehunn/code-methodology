// @see https://leetcode.com/problems/balanced-binary-tree/
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
function isBalanced(root) {
  if (!root) return true;

  function _r(root) {
    if (!root) return 0;

    return 1 + Math.max(_r(root.left), _r(root.right));
  }

  if (Math.abs(_r(root.left) - _r(root.right)) > 1) return false;

  return isBalanced(root.left) && isBalanced(root.right);
}

// dfs
function isBalanced(root) {
  function _dfs(node) {
    if (!node) return 0;

    let l = 1 + _dfs(node.left);
    let r = 1 + _dfs(node.right);

    if (Math.abs(l - r) > 1) return Infinity;

    return Math.max(l, r);
  }

  // Infinity => false
  return Number.isFinite(_dfs(root));
}
