import LinkedList, { LinkedListNode } from "../linked-list/index";

export default class Stack {
  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): null | LinkedListNode {
    return this.linkedList.head || null;
  }

  push(value: number): void {
    this.linkedList.prepend(value);
  }

  pop(): null | LinkedListNode {
    const removedHead = this.linkedList.deleteHead(); // Last-in First-out

    return removedHead ? removedHead : null;
  }

  toArray(): number[] {
    return this.linkedList.listToArray().map((node) => node.value);
  }

  toString(callback: (node: number) => string): string {
    return this.linkedList.toString(callback);
  }
}
