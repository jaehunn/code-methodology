function mergeSort(items, s = 0, e = items.length - 1) {
  let r;

  // 1. divide
  if (s < e) {
    const m = ((s + e) / 2) << 0;

    mergeSort(items, s, m);
    mergeSort(items, m + 1, e);

    // 2. conquer (sort)
    r = merge(s, m, e);
  }

  return r;

  function merge(s, m, e) {
    let i = s;
    let j = m + 1;

    let r = [];
    while (r.length < e - s + 1) {
      if (i <= m || items[i] < items[j]) r.push(items[i++]);
      else r.push(items[j++]);
    }

    return r;
  }
}

console.log(mergeSort([5, 4, 3, 2, 1]));
// desc: [5, 4] [3] -> shift [5, 4, 3]
// asc: [4, 5] [3] -> push [3, 4, 5]
