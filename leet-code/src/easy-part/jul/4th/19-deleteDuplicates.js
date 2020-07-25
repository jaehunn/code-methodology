// @see https://leetcode.com/problems/remove-duplicates-from-sorted-list/
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
var deleteDuplicates = function (head) {
  if (!head || !head.next) return head; // null or head

  let c = head; // target
  while (c.next) {
    if (c.val === c.next.val) {
      c.next = c.next.next; // link free
    }

    c = c.next;
  }

  return head;
};
