// @see https://leetcode.com/problems/intersection-of-two-linked-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

// * WIP
var getIntersectionNode = function (headA, headB) {
  if (!headA || headB) return null;

  let cA = headA;
  let cB = headB;

  while (cA !== cB) {
    if (cA.next) {
      cA = cA.next; // move
    } else {
      if (!cB.next) {
        cA = null;
        cB = null;

        break;
      }

      cA = headB;
    }

    if (cB.next) {
      cB = cB.next;
    } else {
      cB = headA;
    }
  }

  return cB;
};
