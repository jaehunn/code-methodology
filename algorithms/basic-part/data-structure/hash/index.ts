import LinkedList, { LinkedListNode } from "../linked-list/index";

const defaultHashTableSize = 32;

export default class HashTable {
  buckets: LinkedList[];
  keys: {} | { key: string; value: number };

  constructor(hashTableSize: number = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList()); // [ [keyHash]: LinkedList, [keyHash]: LinkedList ... ]

    this.keys = {}; // { string: number }
  }

  hash(key: string): number {
    const hash: number = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key: string, value: number): void {
    const keyHash: number = this.hash(key);

    this.keys[key] = keyHash;

    const bucketLinkedList: LinkedList = this.buckets[keyHash];
    const node: LinkedListNode = bucketLinkedList.find();

    if (!node) {
      bucketLinkedList.append();
    } else {
      node.value.value = value; // node.value = { key, value }
    }
  }

  delete(key: string): null | LinkedListNode {
    const keyHash = this.hash(key);

    delete this.keys[key];

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find();

    if (node) return bucketLinkedList.delete(node.value);

    return null;
  }

  get(key: string): undefined | number {
    const bucketLinkedList = this.buckets[this.hash(key)]; // [expression]
    const node = bucketLinkedList.find();

    return node ? node.value.value : undefined;
  }

  getKeys(): string[] {
    return Object.keys(this.keys);
  }
}
