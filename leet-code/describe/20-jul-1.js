// 1. delete duplicates
{
  function deleteDuplicates(head) {
    let c = head; // ref

    while (c && c.next) {
      if (c.val === c.next.val) {
        c.next = c.next.next; // free
      } else {
        c = c.next; // move
      }
    }

    return head;
  }
}

// 2. merge sorted array
{
  function merge(nums1, m, nums2, n) {
    let l = m + n;

    // to index
    m -= 1;
    n -= 1;

    while (l--) {
      // one side index < 0, push rest
      if (n < 0 || nums1[m] > nums2[n]) {
        nums1[l] = nums1[m--];
      } else {
        nums1[l] = nums2[n--];
      }
    }

    return nums1;
  }
}

// 3. same tree
{
  function isSameTree(p, q) {
    if (!p && !q) return true; // successful
    if (!p || !q || p.val !== q.val) return false; // *faliure, Either one not exist, p.val !== q.val

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
}

// 4. symmetric tree
{
  function isSymmetric(root) {
    if (!root) return false;

    function _r(p, q) {
      if (!p && !q) return true; // successful
      if (!p || !q || p.value !== q.value) return false; // failure

      return _r(p.left, q.right) && _r(p.right, q.left);
    }

    return _r(root.left, root.right); // transform
  }
}

// 5. maximum depth
{
  function maxDepth(root) {
    if (!root) return 0; //

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1; // *
  }

  function maxDepth(root) {
    return _r(root, 0); // transform

    // depth first search
    function _r(root, depth) {
      if (!root) return depth;

      return Math.max(_r(root.left, depth + 1), _r(root.right, depth + 1));
    }
  }
}

// 6. tree traversal
{
  function levelOrderBottom(root) {
    let r = {};

    _r(root, 0); // transform, depth is prop

    function _r(root, depth) {
      if (!root) return;

      if (root[depth] === undefined) root[depth] = []; // new array

      root[depth].push(root.val); // push

      _r(root.left, depth + 1);
      _r(root.right, depth + 1);
    }

    return r.reverse();
  }
}
