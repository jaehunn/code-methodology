import Sort from "../../sort";

export default class Selection extends Sort {
  sort(originalItems, reverseFlag = false) {
    if (reverseFlag) this.comparator.reverse(); // b < a ? -1 : 1

    const items = [...originalItems];

    for (let i = 0; i < items.length; i += 1) {
      let target = i;

      for (let j = i + 1; j < items.length; j += 1) {
        // TODO: descending

        // items[target] < items[j] ? -1 : 1
        if (this.comparator.lessThan(items[j], items[target])) {
          target = j;
        }
      }

      if (target !== i) [items[target], items[i]] = [items[i], items[target]];
    }

    // reverse free
    if (reverseFlag) this.comparator.reverse();

    return items;
  }
}
