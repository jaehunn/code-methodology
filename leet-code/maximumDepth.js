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
 * @return {number}
 */
function maxDepth(root) {
  if (!root) return 0; // depth x
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

function maxDepth(root) {
  return dfs(root, 0);

  function dfs(root, depth) {
    if (!root) return depth;

    return Math.max(dfs(root.left, depth + 1), dfs(root.right, depth + 1));
  }
}
