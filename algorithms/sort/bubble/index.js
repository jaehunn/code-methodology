import Sort from "../../sort";

export default class Bubble extends Sort {
  sort(originalItems, reverseFlag = false) {
    if (reverseFlag) this.comparator.reverse();

    const items = [...originalItems];

    let flag;

    for (let i = 1; i < items.length; i += 1) {
      flag = false;

      for (let j = 0; j < items.length - i; j += 1) {
        // [1, 2, 3, 4, 5] =>
        if (this.comparator.greaterThan(items[j], items[j + 1])) {
          flag = true;

          // swap
          [items[j], items[j + 1]] = [items[j + 1], items[j]];
        }
      }

      if (!flag) {
        if (reverseFlag) this.comparator.reverse();

        return items;
      }
    }

    if (reverseFlag) this.comparator.reverse();

    return items;
  }
}
