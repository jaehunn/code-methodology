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

  // wip
  while (sorted.length < end - start + 1) {
    if (i <= middle && items[i] <= items[j]) {
      sorted.push(items[i++]);
    } else {
      sorted.push(items[j++]);
    }
  }

  console.log(sorted);
}

let items = [7, 6, 5, 8, 3, 5, 9, 1];
mergeSort(items);
