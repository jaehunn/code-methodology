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

var mergeTwoLists = function (l1, l2) {
  if (!l1 || !l2) return l1 || l2;

  const r = new ListNode();

  let l = r; // taget

  while (l1 && l2) {
    if (l1.val < l2.val) {
      l.val = l1.val; // set

      l1 = l1.next; // move
    } else if (l1.val > l2.val) {
      l.val = l2.val;

      l2 = l2.next;
    } else {
      // equal
      l.val = l1.val; // first
      l.next = new ListNode(l2.val); // second

      // update
      l = l.next;
      l1 = l1.next;
      l2 = l2.next;
    }

    if (l1 && l2) {
      l.next = new ListNode(); // next node
      l = l.next;
    }
  }

  // rest
  if (l1) l.next = l1;
  if (l2) l.next = l2;

  return r;
};

function mergeTwoLists2(l1, l2) {
  if (!l1 || !l2) return l1 || l2;

  const r = new ListNode(0); // start value: 0
  let l = r; // target

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      l.next = l1;
      l1 = l1.next; // move
    } else {
      l.next = l2;
      l2 = l2.next;
    }

    l = l.next;
  }

  if (l1) l.next = l1;
  if (l2) l.next = l2;

  return r;
}
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(3);

const l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4);

function printNode(node) {
  while (node) {
    console.log(node.val);

    node = node.next;
  }
}

const l3 = mergeTwoLists2(l1, l2);

printNode(l3);
