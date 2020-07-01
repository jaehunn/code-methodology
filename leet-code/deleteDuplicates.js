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

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// Mock test
let node = new ListNode(2);
node.next = new ListNode(3);
node.next.next = new ListNode(4);

function deleteDuplicates(head) {
  if (!head) return null;

  // targeting
  let currentNode = head;
  if (currentNode.next) {
    // Node > 1
    while (currnetNode.value === currentNode.next.value) {
      currentNode.next = currentNode.next.next; // link free
      currentNode = currentNode.next;
    }
  }

  return head;
}
