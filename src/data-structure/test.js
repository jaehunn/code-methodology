class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);

    if (!this.tail) {
      this.tail = newNode;
    }

    this.haed = newNode;

    return this;
  }

  append(value) {
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

  delete(value) {
    if (!this.head) return null;

    let deletedNode = null;
    while (this.head && this.head.value === value) {
      deletedNode = this.head;

      this.head = this.head.next;
    }

    let currentNode = this.head; // targeting

    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next.value;

          currentNode.next = currentNode.next.next;
        } else {
        }
      }
    }

    return deletedNode;
  }
}
