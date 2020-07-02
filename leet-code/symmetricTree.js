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

  function isMirror(s, t) {
    if (!s && !t) return true;

    if (!s || !t || s.val !== t.val) return false;

    return isMirror(s.left, t.right) && isMirror(s.right, t.left);
  }

  return isMirror(root.left, root.right);
};

function isMirror(p, q) {
  var s1 = [p];
  var s2 = [q];

  while (s1.length || s2.length) {
    var n1 = s1.pop();
    var n2 = s2.pop();

    if (!n1 && !n2) continue;

    if (!n1 || !n2 || n1.val !== n2.val) return false;

    q1.push(n1.left);
    q1.push(n1.right);

    q2.push(n2.right);
    q2.push(n2.left);
  }

  return true;
}

function isMirror(s, t) {
  var q1 = [s];
  var q2 = [t];

  while (q1.length || q2.length) {
    var n1 = q1.shift();
    var n2 = q2.shift();

    if (!n1 && !n2) continue;

    if (!n1 || !n2 || n1.val !== n2.val) return false;

    q1.push(n1.left);
    q1.push(n1.right);

    q2.push(n2.left);
    q2.push(n2.right);
  }

  return true;
}
