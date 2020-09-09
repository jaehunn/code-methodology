import Sort from "../../sort";

export default class Selection extends Sort {
  sort(originalItems, reverseFlag = false) {
    // if (reverseFlag) this.comparator.reverse();

    const items = [...originalItems];

    for (let i = 0; i < items.length; i += 1) {
      let target = i;

      for (let j = i + 1; j < items.length; j += 1) {
        // TODO: descending
        if (this.comparator.lessThan(items[j], items[target])) target = j;
      }

      if (target !== i) [items[target], items[i]] = [items[i], items[target]];
    }

    return items;
  }
}
