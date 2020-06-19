function bubbleSort(originalItems) {
  const items = [...originalItems];

  let flag = false;

  for (let i = 1; i < items.length; i += 1) {
    for (let j = 0; j < items.length - i; j += 1) {
      if (items[j] > items[j + 1]) {
        [items[j], items[j + 1]] = [items[j + 1], items[j]];

        flag = true;
      }
    }

    if (!flag) return items;
  }

  return items;
}

console.log(bubbleSort([5, 2, 3, 4, 1]));
