const log = console.log;

// 1. selection sort
{
  function selectionSort(items, l = items.length) {
    for (let i = 0; i < l; i += 1) {
      let mI = i;
      for (let j = i + 1; j < l; j += 1) {
        if (items[mI] > items[j]) mI = j;
      }

      if (mI !== i) [items[mI], items[i]] = [items[i], items[mI]];
    }

    log(items);
  }

  selectionSort([7, 1, 5, 4, 2, 3]);
}

// 2. insertion sort
{
  function insertionSort(items, l = items.length) {
    for (let i = 0; i < l; i += 1) {
      let c = i; // target

      // ascending sort
      while (items[c - 1] !== undefined && items[c - 1] > items[c]) {
        [items[c - 1], items[c]] = [items[c], items[c - 1]];

        c -= 1;
      }
    }

    log(items);
  }

  insertionSort([7, 1, 5, 4, 2, 3]);
}

// 3. bubble sort
{
  function bubbleSort(items, l = items.length) {
    let f = false; // swap flag
    for (let i = 1; i < l; i += 1) {
      f = false; // flag reset

      for (let j = 0; j < l - i; j += 1) {
        if (items[j] > items[j + 1]) {
          [items[j], items[j + 1]] = [items[j + 1], items[j]];

          f = true;
        }
      }

      if (!f) {
        log(items);

        return;
      }
    }
  }

  bubbleSort([7, 1, 5, 4, 2, 3]);
}

// 4. TODO: heap sort
{
  // in-place(items -> heap)
  function heapSort(items, l = items.length) {
    // 1. init: heapify()
    // 2. loop: swap(root, leaf) -> pop(leaf) -> heapify(): cmp(children) -> cmp(parent. child)
  }

  heapSort([7, 1, 5, 4, 2, 3]);
}
