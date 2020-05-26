import LinkedList from "../linked-list/LinkedList.js";

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (!this.linkedList.head) return null;

    return this.linkedList.head.value;
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removedNode = this.linkedList.deleteHead();

    return removedNode ? removedNode.vaue : null;
  }
}
