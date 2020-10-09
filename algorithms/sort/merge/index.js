import Sort from "../../sort";

export default class Merge extends Sort {
  sort(items, reverseFlag = false) {
    if (reverseFlag) this.comparator.reverse();

    if (items.length <= 1) return items;

    let middleIndex = (items.length / 2) << 0;

    let leftItems = items.slice(0, middleIndex);
    let rightItems = items.slice(middleIndex, items.length);

    return this.merge(this.sort(leftItems), this.sort(rightItems), reverseFlag);
  }

  merge(leftItems, rightItems, reverseFlag) {
    let sorted = [];

    while (leftItems.length || rightItems.length) {
      if (!rightItems.length || this.comparator.lessThanOrEqual(leftItems[0], rightItems[0])) {
        sorted.push(leftItems.shift());
      } else {
        sorted.push(rightItems.shift());
      }
    }

    if (reverseFlag) this.comparator.reverse();

    return sorted;
  }
}
