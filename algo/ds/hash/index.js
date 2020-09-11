import LinkedList from "../linkedList";

const DEFAULT_SIZE = 32;

export default class HashTable {
  constructor(size = DEFAULT_SIZE) {
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList());

    this.keys = {};
  }

  // key is string
  getHash(key) {
    // ascii sum
    const hash = Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // normalize
    return hash % this.buckets.length; // hash % size
  }

  // value = { key, value }
  set(key, value) {
    const hash = this.getHash(key);

    // keys = { ket string: hash }
    this.keys[key] = hash;

    // get hash list
    const list = this.buckets[hash];

    // same string
    const node = list.find({ callback: (nodeValue) => nodeValue.key === key }); // node: { key, { key, value} }

    // unfound
    if (!node) list.append({ key, value });
    else node.value.value = value; // update
  }

  delete(key) {
    // 1. keys
    delete this.keys[key];

    // 2. buckets
    const hash = this.getHash(key);
    const list = this.buckets[hash];
    const node = list.find({ callback: (nodeValue) => nodeValue.key === key });

    if (node) return list.delete(node.value);

    // failed
    return null;
  }

  get(key) {
    const hash = this.getHash(key);
    const list = this.buckets[hash];
    const node = list.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  // no prototype chain
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}
