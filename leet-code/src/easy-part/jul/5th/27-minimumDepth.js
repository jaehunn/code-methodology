// @see https://leetcode.com/problems/minimum-depth-of-binary-tree/
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
function minDepth(root) {
  if (!root) return 0;

  const l = minDepth(root.left);
  const r = minDepth(root.right);

  return l === 0 || r === 0 ? l + r + 1 : Math.min(l, r) + 1;
}

function minDepth(root) {
  if (!root) return 0;

  let d = 1;
  let q = [root]; // init

  if (!root.left && !root.right) return d;

  while (q.length > 0) {
    for (let i = 0; i < q.length; i += 1) {
      let n = q.shift(); // dequeue

      if (!n.left && !n.right) return d;
      else {
        // enqueue
        if (n.left) q.push(n.left);
        if (n.right) q.push(n.right);
      }
    }

    d += 1;
  }

  return d;
}
