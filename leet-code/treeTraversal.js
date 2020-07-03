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
function levelOrderBottom(root) {
  let r = [];

  _bfs(root, 0);

  function _bfs(root, d) {
    if (!root) return;

    if (r[d] === undefined) r[d] = [];

    r[d].push(root.val);

    _bfs(root.left, d + 1);
    _bfs(root.right, d + 1);
  }

  return res.reverse();
}

// wip
function levelOrderBottom(root) {
  let r = [];
  root !== null ? _r(root, 1) : null;

  // length <= 2
  // [[1]/ [2][3] / [4][5][6][7] / ... ]
  function _r(root, d) {
    if (d > r.length) r.unshift([root.val]);
    // new
    else r[r.length - d].push(root.val);

    if (root.left !== null) _r(root.left, d + 1);
    if (root.right !== null) _r(root.right, d + 1);
  }

  return r;
}
