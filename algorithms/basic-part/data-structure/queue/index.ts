import LinkedList, { LinkedListNode } from "../linked-list/index";

export default class Queue {
  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): LinkedListNode | null {
    return this.linkedList.head || null;
  }

  enqueue(value: number): void {
    this.linkedList.append(value);
  }

  dequeue(): LinkedListNode | null {
    return this.linkedList.deleteHead() || null;
  }

  toString(callback: (value: number) => string): string {
    return this.linkedList.toString(callback);
  }
}
