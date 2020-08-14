// @see https://m.blog.naver.com/ndb796/221228342808

// Binary Tree
/**
 * @param {number[]} nums
 * @return {number[]}
 */
{
  function heapSort(h) {
    for (let i = 1; i < h.length; i += 1) {
      let c = i;

      do {
        let rt = Math.floor((c - 1) / 2); // get root

        if (h[rt] < h[c]) {
          [h[rt], h[c]] = [h[c], h[rt]];
        }

        c = rt;
      } while (c !== 0);
    }

    for (let i = h.length - 1; i >= 0; i -= 1) {
      // swap(root, 0)
      [h[0], h[i]] = [h[i], h[0]];

      let c = 1;
      let rt = 0;
      do {
        c = 2 * rt + 1;

        // cmp(childs)
        if (c < i - 1 && h[c] < h[c + 1]) c += 1; // c + 1 < i

        // cmp(parent, child)
        if (c < i && h[rt] < h[c]) [h[rt], h[c]] = [h[c], h[rt]];

        rt = c; // move root
      } while (c < i);
    }

    return h;
  }
}

// separate logic
{
  function heapSort(h) {
    // init: heapify()
    for (let i = Math.floor(h.length / 2); i >= 0; i -= 1) heapify(i);

    // sort: swap() + heapify()
    for (let i = h.length - 1; i >= 0; i -= 1) {
      // swap(root, leaf)
      [h[0], h[i]] = [h[i], h[0]];

      // heapify()
      let rt = 0;
      let c = 1;
      do {
        c = 2 * rt + 1;

        // cmp(childs)
        if (c < i - 1 && h[c] < h[c + 1]) c += 1;

        // cmp(parent, child)
        if (c < i && h[rt] < h[c]) [h[rt], h[c]] = [h[c], h[rt]];

        rt = c; // move root
      } while (c < i);
    }

    return h;

    // custom: heapifyUp() or heapifyDown()
    function heapify(i) {
      let c = 2 * i + 1;

      // cmp(childs)
      if (c < h.length && h[c] < h[c + 1]) c += 1;

      if (h[i] < h[c])
        // cmp(parent, child)
        [h[i], h[c]] = [h[c], h[i]];

      // to h.length / 2
      if (c <= Math.floor(h.length / 2)) heapify(c);
    }
  }

  console.log(heapSort([7, 6, 5, 8, 3, 5]));
}
