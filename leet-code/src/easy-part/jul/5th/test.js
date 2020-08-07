function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isSymmetric(root) {
  if (!root) return true;

  // function signature manipulation
  function _r(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    return _r(p.left, q.right) && _r(p.right, q.left);
  }

  return _r(root.left, root, right);
}

function maxDepth(root) {
  if (!root) return 0;

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

function levelOrderBottom(root) {
  if (!root) return [];

  let r = [];
  let q = [root]; // init

  while (q.length) {
    let s = q.length;
    let c = [];

    // children push
    for (let i = 0; i < s; i += 1) {
      let h = q.shift(); // dequeue

      c.push(h.val);

      if (h.left) q.push(h.left);
      if (h.right) q.push(h.right);
    }

    r.unshift(c); // or push() + reverse()
  }

  return r;
}

function sortedArrayToBST(nums) {
  if (!nums.length) return null;

  const m = (nums.length / 2) >> 0;
  const r = new TreeNode(nums[m]); // root node

  r.left = sortedArrayToBST(nums.slice(0, m));
  r.right = sortedArrayToBST(nums.slice(m + 1));

  return r;
}

// in-place
function _sortedArrayToBST(nums) {
  if (!nums) return null;

  function _r(nums, s, e) {
    if (s > e) return null;

    // l = e - s
    let m = (s + (e - s) / 2) >> 0;
    let n = new TreeNode(nums[m]);

    n.left = _r(nums, s, m - 1);
    n.right = _r(nums, m + 1, e);

    return n;
  }

  return _r(nums, 0, nums.length - 1);
}

// compare root.left with root.right
function isBalanced(root) {
  if (!root) return true;

  function _r(root) {
    if (!root) return 0;

    return 1 + Math.max(_r(root.left), _r(root.right));
  }

  if (Math.abs(_r(root.left) - _r(root.right)) > 1) return false;

  return isBalanced(root.left) && isBalanced(root.right);
}

function minDepth(root) {
  if (!root) return 0;

  const l = minDepth(root.left);
  const r = minDepth(root.right);

  return l === 0 || r === 0 ? l + r + 1 : Math.min(l, r) + 1;
}

function _minDepth(root) {
  if (!root) return 0;

  let d = 1;
  let q = [root];

  if (!root.left && !root.right) return d;

  while (q.length) {
    for (let i = 0; i < q.length; i += 1) {
      let n = q.shift();

      // immediately return
      if (!n.left && !n.right) return d;
      else {
        if (n.left) q.push(n.left);
        if (n.right) q.push(n.right);
      }
    }

    d += 1;
  }

  return d;
}

function hasPathSum(root, sum) {
  if (!root) return false;
  if (!root.left && !root.right) return sum === root.val; // judge leaf

  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  );
}

function _hasPathSum(root, sum) {
  if (!root) return false;

  let q = [root];

  while (q.length) {
    let c = q.shift(); // dequeue

    if (!c.left && !c.right && c.val === sum) return true;
    if (c.left) {
      c.left.val += c.val;

      q.push(c.left);
    } else if (c.right) {
      c.right.val += c.val;

      q.push(c.right);
    }
  }

  return false;
}

// prices element > 0, not negative
function maxProfit(prices) {
  let r = 0;
  let m = prices[0]; // fixed minimum index

  for (let i = 1; i < prices.length; i += 1) {
    m = Math.min(m, prices[i]); // find
    r = Math.max(r, prices[i] - m); // update
  }

  return r;
}

// prices element > 0
// bubble compare
function maxProfit2(prices) {
  let r = 0;

  for (let i = 1; i < prices.length; i += 1) {
    let p = prices[i - 1];
    let c = prices[i];

    // always positive, don't need to validate
    if (p < c) r += p - c;
  }
}
