function mergeSort(items, start = 0, end = items.length - 1) {
  if (start < end) {
    const middle = Math.floor((start + end) / 2);

    // divide
    mergeSort(items, start, middle); // 0 0: 7
    mergeSort(items, middle + 1, end); // 1 1: 6

    // merge
    merge(start, middle, end); // 0 0 1
  }
}

function merge(start, middle, end) {
  let i = start;
  let j = middle + 1;

  let sorted = [];
  let k = 0;
  while (i <= middle && j <= end) {
    if (items[i] <= items[j]) {
      sorted[k++] = items[i++];
    } else {
      sorted[k++] = items[j++];
    }
  }

  // rest
  if (i > middle) {
    for (; j <= end; j += 1) sorted[k++] = items[j];
  } else {
    for (; i <= middle; i += 1) sorted[k++] = items[i];
  }

  console.log(sorted);

  // clone
  for (let i = start; i <= end; i += 1) {
    items[i] = sorted.shift();
  }
}

let items = [7, 6, 5, 8, 3, 5, 9, 1];
mergeSort(items);
console.log(items);
