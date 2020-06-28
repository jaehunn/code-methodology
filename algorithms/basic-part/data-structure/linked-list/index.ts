export class LinkedListNode {
  constructor(public value: number, public next: LinkedListNode = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback: (value: number) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;

  constrcutor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value: number): LinkedList {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: number): LinkedList {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value: number): LinkedListNode {
    if (!this.head) return null;

    let deletedNode = null;

    // 1. front
    while (this.head && this.head.value === value) {
      deletedNode = this.head;

      this.head = this.head.next;
    }

    // 2. between, back
    let currentNode = this.head; // target reference

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next; // unlink node
        } else {
          currentNode = currentNode.next; // move
        }
      }
    }

    // check tail
    if (this.tail.value === value) {
      this.tail === currentNode;
    }

    return deletedNode;
  }

  find(value: number): LinkedListNode {
    if (!this.head) return null;

    let currentNode = null; // target reference

    while (currentNode) {
      if (currentNode.value === value) return currentNode;

      currentNode = currentNode.next; // move
    }

    return null; // failure
  }

  deleteTail(): LinkedListNode {
    const deletedTail = this.tail; // init

    // list = 1 node
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head; // target reference
    while (currentNode.next) {
      // 2 node
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next; // move
      }
    }

    this.tail = currentNode; // update tail

    return deletedTail;
  }

  deleteHead(): LinkedListNode {
    if (!this.head) return null;

    const deletedHead = this.head; // target reference

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      // 1 node
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  // append [...values]
  appendToArray(values: number[]): LinkedList {
    values.forEach((value) => this.append(value));

    return this;
  }

  // list => [...values]
  listToArray(): LinkedListNode[] {
    const nodes = [];

    let currentNode = this.head; // target reference
    while (currentNode) {
      nodes.push(currentNode);

      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback: (node: number) => string): string {
    return this.listToArray()
      .map((node) => node.toString(callback)) // node.toString = (this.value: number) => string
      .toString();
  }

  reverse(): LinkedList {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next; // next memo

      currNode.next = prevNode; // curr change

      // move one step
      prevNode = currNode; // change curr memo
      currNode = nextNode; // memo -> next curr
    }

    // change
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
