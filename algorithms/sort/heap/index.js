import Sort from "../../sort";
import { MinHeap, MaxHeap } from "../../ds/heap";

export default class HeapSort extends Sort {
  sort(originalItems) {
    const minHeap = new MinHeap(); // ascending sort
    const sorted = [];
    // 1. create heap
    originalItems.forEach((item) => minHeap.add(item));

    // 2. extract operation: swap(root, last leaf) -> insert last leaf(root) -> heapify(...last leaf - 1)
    while (!minHeap.isEmpty()) {
      const item = minHeap.extract();

      sorted.push(item);
    }

    return sorted;
  }
}
