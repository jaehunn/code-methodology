// @see https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sorting/selection-sort/SelectionSort.js
/**
 * @param {number[]} items
 * @return {number[]}
 */

function selectionSort(items) {
  for (let i = 0; i < items.length; i += 1) {
    let m = i;

    // find
    for (let j = i + 1; j < items.length; j += 1) {
      if (items[m] > items[j]) m = j;
    }

    // swap
    if (m !== i) [items[m], items[i]] = [items[i], items[m]];
  }

  return items;
}
