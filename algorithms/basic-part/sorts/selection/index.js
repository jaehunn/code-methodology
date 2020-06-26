function selectionSort(originalItems) {
  const items = [...originalItems];

  for (let i = 0; i < items.length - 1; i += 1) {
    let minI = i;

    for (let j = i + 1; j < items.length; j += 1) {
      if (items[minI] > items[j]) minI = j;
    }

    if (minI !== i) {
      [items[minI], items[i]] = [items[i], items[minI]];
    }
  }

  return items;
}
