/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function deleteDuplicates(head) {
<<<<<<< HEAD
  if (!head) return null;
=======
  let cur = head; // target
>>>>>>> dfb5216046bddce3571564f4a0241a93945f6cb7

  // node >= 2
  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return head;
}
