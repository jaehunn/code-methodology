function _each(items, callback, len = items.length) {
  for (let index = 0; index < len; index += 1) {
    callback(items[index], index);
  }

  return items;
}

function selectionSort(originalItems, comparator) {
  const items = [...originalItems];

  for (let index = 0; index < items.length; index += 1) {
    let targetIndex = index;

    for (let currentIndex = index + 1; currentIndex < items.length; currentIndex += 1) {
      if (comparator(items[targetIndex], items[currentIndex])) {
        targetIndex = currentIndex;
      }
    }

    if (targetIndex !== index) {
      [items[targetIndex], items[index]] = [items[index], items[targetIndex]];
    }
  }

  return items;
}

function _selectionSort(items, comparator) {
  _each(items, function (value, index) {
    let targetIndex = index;

    _each(items, function (currentValue, currentIndex) {
      if (comparator(items[targetIndex], items[currentIndex])) {
        targetIndex = currentIndex;
      }
    });

    if (targetIndex !== index) {
      console.log(items);

      [items[targetIndex], items[index]] = [items[index], items[targetIndex]];

      console.log(targetIndex, index, items);
    }
  });
}

const list = [5, 2, 3, 4, 1];

console.log(
  _selectionSort(list, function (target, value) {
    return target > value;
  })
);

console.log(list);
