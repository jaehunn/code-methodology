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

// headA.length: 5
// headB.length: 3
// => 5 + 3 / 16 / 24 / 32
var getIntersectionNode = function (headA, headB) {
  if (!headA || headB) return null;

  // target
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

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;
  let cA = headA;
  let cB = headB;

  while (cA !== cB) {
    cA = cA === null ? headB : cA.next;
    cB = cB === null ? headA : cB.next;
  }

  return cA;
}

// intersection: (d)
// headA(5): a -> b -> c -> (d) -> e -> c' -> (d) -> e
// headB(3): c'-> (d) -> e -> a -> b -> c -> (d) -> e
