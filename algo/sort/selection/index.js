import Sort from "../../sort";

export default class Selection extends Sort {
  sort(originalItems) {
    const items = [...originalItems];

    for (let i = 0; i < items.length; i += 1) {
      let minI = i;

      for (let j = i + 1; j < items.length; j += 1) {
        if (this.comparator.lessThan(items[j], items[minI])) minI = j;
      }

      if (minI !== i) [items[minI], items[i]] = [items[i], items[minI]];
    }

    return items;
  }
}
