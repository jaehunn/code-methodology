// @see https://leetcode.com/problems/path-sum/
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
 * @param {number} sum
 * @return {boolean}
 */

// dfs-recur
var hasPathSum = function (root, sum) {
  if (!root) return false;
  if (!root.left && !root.right) return sum === root.val;

  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  );
};

// queue
function hasPathSum(root, sum) {
  if (!root) return false;

  let q = [root]; // init

  while (q.length) {
    let c = q.shift(); // dequeue

    if (!c.left && !c.right && c.val === sum) return true;
    if (c.left) {
      c.left.val += c.val;

      q.push(c.left); // enqueue
    } else if (c.right) {
      c.right.val += c.val;

      q.push(c.right); // enqueue
    }
  }

  return false; // failure
}
