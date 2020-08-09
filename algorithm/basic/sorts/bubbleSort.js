// @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/bubble-sort
/**
 * @param {number[]} items
 * @return {number}
 */
function bubbleSort(items) {
  let f = false;

  for (let i = 1; i < items.length; i += 1) {
    f = false;

    for (let j = 0; j < items.length - i; j += 1) {
      if (items[j] > items[j + 1])
        [items[j], items[j + 1]] = [items[j + 1], items[j]];

      f = true;
    }

    if (!f) return items;
  }

  return items;
}
