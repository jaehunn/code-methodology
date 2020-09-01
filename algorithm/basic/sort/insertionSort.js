// @see https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sorting/insertion-sort/InsertionSort.js
/**
 * @param {number[]} items
 * @return {number[]}
 */
function insertionSort(items) {
  for (let i = 0; i < items.length; i += 1) {
    let c = i;

    // swap
    while (items[c - 1] !== undefined && items[c] < items[c - 1]) {
      [items[c - 1], items[c]] = [items[c], items[c - 1]];

      c -= 1;
    }
  }

  return items;
}
