import Sort from "../../sort";

export default class Insertion extends Sort {
  sort(originalItems) {
    const items = [...originalItems];

    for (let i = 0; i < items.length; i += 1) {
      let c = i;

      while (c && this.comparator.greaterThan(items[c - 1], items[c])) {
        [items[c - 1], items[c]] = [items[c], items[c - 1]];

        c -= 1;
      }
    }

    return items;
  }
}
