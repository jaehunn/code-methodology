function quickSort(items, start = 0, end = items.length - 1) {
  if (start >= end) return;

  let pivot = start;
  let i = start + 1;
  let j = end;

  // 1. partition(sort)
  while (i <= j) {
    // move target
    while (i <= end && items[i] >= items[pivot]) i += 1;
    while (j > start && items[j] <= items[pivot]) j -= 1;

    // cross target
    if (i > j) {
      [items[pivot], items[j]] = [items[j], items[pivot]];
    } else {
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  // 2. divide
  quickSort(items, start, j - 1);
  quickSort(items, j + 1, end);
}

let items = [1, 10, 5, 7, 8, 6, 4, 3, 2, 9];
quickSort(items);

console.log(items);
