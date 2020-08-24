const heapSort = (heap) => {
  // heap structure: heapifyUp()
  for (let i = 1; i < heap.length; i += 1) {
    let c = i;

    // c <- root
    do {
      let root = Math.floor((c - 1) / 2);

      if (heap[root] < heap[c]) [heap[root], heap[c]] = [heap[c], heap[root]];

      c = root;
    } while (c);
  }

  // max-extract + heap re-structure: heapifyDown()
  for (let i = h.length - 1; i >= 0; i -= 1) {
    // swap
    [heap[0], heap[i]] = [heap[i], heap[0]];

    let c = 1;
    let root = 0;
    do {
      c = 2 * root + 1;

      // children
      if (c < i - 1 && h[c] < h[c + 1]) c += 1;

      // parent, child
      if (c < i && h[root] < h[c]) [h[root], h[c]] = [h[c], h[root]];

      root = c;
    } while (c < i); // i < h.length - 1
  }

  return heap;
};

const heapify = () => {};
