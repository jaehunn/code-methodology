// @see https://leetcode.com/problems/binary-tree-level-order-traversal-ii/
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  if (root === null) return [];

  let r = [];
  let q = [root]; // enqueue

  while (q.length) {
    let s = q.length;
    let c = [];

    for (let i = 0; i < s; i += 1) {
      let h = q.shift(); // dequeue

      c.push(h.val);

      // enqueue
      // *Null Checking
      if (h.left) q.push(h.left);
      if (h.right) q.push(h.right);
    }

    r.unshift(c);
  }

  return r;
};
