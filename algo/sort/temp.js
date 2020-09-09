// quick
function quick(items, comparator = asc, s = 0, e = items.length - 1) {
  // size 1, return
  if (s >= e) return;

  let p = s;
  let l = s + 1;
  let r = e;

  // divide
  while (l <= r) {
    while (l <= e && comparator(items[l], items[p])) l += 1;
    while (r > s && comparator(items[p], items[r])) r -= 1;

    if (l > r) {
      [items[p], items[r]] = [items[r], items[p]];
    } else {
      [items[l], items[r]] = [items[r], items[l]];
    }
  }

  // conquer
  // pivot -> right Index
  quick(items, comparator, s, r - 1);
  quick(items, comparator, r + 1, e);

  return items;
}

function _quick(originalItems) {
  if (originalItems.length <= 1) return originalItems;

  const items = [...originalItems];

  let leftItems = [];
  let rightItems = [];

  const pivot = items.shift();
  let centerItems = [pivot];

  while (items.length) {
    let currentItem = items.shift();

    if (this.comparator.equal(currentItem, pivot)) {
      centerItems.push(currentItem);
    } else if (this.comparator.lessThan(currentItem, pivot)) {
      leftItems.push(currentItem);
    } else {
      rightItems.push(currentItem);
    }
  }

  let sortedLeftItems = this.sort(leftItems);
  let sortedRightItems = this.sort(rightItems);

  return sortedLeftItems.concat(centerItems, sortedRightItems);
}

// @see https://m.blog.naver.com/ndb796/221228342808
// @see https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sorting/heap-sort/HeapSort.js

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
        let rt = Math.floor((c - 1) / 2);

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
        c = 2 * rt + 1; //

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

      if (h[i] < h[c]) [h[i], h[c]] = [h[c], h[i]]; // cmp(parent, child)

      // to h.length / 2
      if (c <= Math.floor(h.length / 2)) heapify(c);
    }
  }
}
