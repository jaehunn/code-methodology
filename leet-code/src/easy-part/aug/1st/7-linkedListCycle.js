// @see https://leetcode.com/problems/linked-list-cycle/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

// use set
var hasCycle = function (head) {
  const s = new Set();

  let c = head;

  while (c) {
    if (s.has(c)) return true; //

    s.add(c);
    c = c.next;
  }

  return false;
};

// add flag
function _hasCycle(head) {
  if (!head || !head.next) return false;
  let c = head;

  while (c) {
    if (c.visit) return true;

    c.visit = true;
    c = c.next;
  }

  return false;
}

// *slower and faster pointer approach = floyd's algorithm
// [3, 0, 2, -4, 2]

// do not allow "buckle" node (self loop)
function __hasCycle(head) {
  if (!head || !head.next) return false;

  let s = head; // 3
  let f = head; // 3

  // f is end faster than s
  while (f) {
    if (!f.next) return false;

    f = f.next.next; // 0->(2), (4)->2
    s = s.next; // 0, 2

    if (f === s) return true;
  }

  return false;
}

function ___hasCycle(head) {
  if (!head || !head.length) return false;

  let s = head;
  let f = head.next;

  // [3, 0, 2, -4, 2]
  // s: 3, 0
  // f: 2, -4
  while (f) {
    if (s === f) return true;

    s = s.next;

    if (!f.next) return false;

    f = f.next.next;
  }
}
