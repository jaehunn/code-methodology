const log = console.log;

// 4. heap sort
{
  // in-place(items -> heap)
  function heapSort(h) {
    // 1. build heap
    for (let i = Math.floor(h.length / 2); i >= 0; i -= 1) heapify(i);

    // 2. sort: extract + heapify
    for (let i = h.length - 1; i >= 0; i -= 1) {
      // extract
      [h[0], h[i]] = [h[i], h[0]];

      let rt = 0;
      let c = 1;
      do {
        c = 2 * rt + 1;

        if (c < i - 1 && h[c] < h[c + 1]) c += 1;
        if (c < i && h[rt] < h[c]) [h[rt], h[c]] = [h[c], h[rt]];

        rt = c;
      } while (c < i);
    }

    return h;

    function heapify(i) {
      let c = 2 * i + 1;

      // cmp(children)
      if (c < h.length && h[c] < h[c + 1]) c += 1;

      // cmp(parent, child)
      if (h[i] < h[c]) [h[i], h[c]] = [h[c], h[i]];

      if (c <= Math.floor(h.length / 2)) heapify(c); // root <- current
    }
  }
}
