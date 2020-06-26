function insertionSort(originalItems) {
  const items = [...originalItems];

  for (let i = 0; i < items.length; i += 1) {
    let currentI = i;

    while (currentI >= 0 && items[currentI - 1] > items[currentI]) {
      [items[currentI - 1], items[currentI]] = [items[currentI], items[currentI - 1]];

      currentI -= 1;
    }
  }

  return items;
}

console.log(insertionSort([1, 4, 3, 2, 5]));
