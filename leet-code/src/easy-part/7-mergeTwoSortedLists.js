// @see https://leetcode.com/problems/merge-two-sorted-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(l1, l2) {
  if (!l1 || !l2) return l1 || l2; // selection return

  const r = new ListNode();
  let l = r; // target node

  while (l1 && l2) {
    if (l1.val < l2.val) {
      l.val = l1.val;

      l1 = l1.next;
    } else if (l1.val > l2.val) {
      l.val = l2.val;

      l2 = l2.next;
    } else {
      // concat two nodes
      l.val = l1.val;

      l.next = new ListNode(l2.val);
      l = l.next;

      l1 = l1.next;
      l2 = l2.next;
    }

    if (l1 && l2) {
      l.next = new ListNode();

      l = l.next;
    }
  }

  // rest
  if (l1) l.next = l1;
  if (l2) l.next = l2;

  return r; // original
}

function mergeTwoLists(l1, l2) {
  if (!l1 || !l2) return l1 || l2;

  const r = new ListNode(0);
  let l = r; // target node

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      l.next = l1;

      l1 = l1.next;
    } else {
      l.next = l2;

      l2 = l2.next;
    }
  }

  if (l1) l.next = l1;
  if (l2) l.next = l2;

  return r;
}
