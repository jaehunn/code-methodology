import Sort from "../../sort";

export default class Quick extends Sort {
  sort(originalItems) {
    if (originalItems.length <= 1) return originalItems;

    const items = [...originalItems];

    let leftItems = [];
    let rightItems = [];

    const pivot = items.shift();
    let centerItems = [pivot];

    while (items.length) {
      let currentItem = items.shift();

      if (this.comparator.equal(currentItem, pivot)) {
        centerItems.push(currentItem);
      } else if (this.comparator.lessThan(currentItem, pivot)) {
        leftItems.push(currentItem);
      } else {
        rightItems.push(currentItem);
      }
    }

    let sortedLeftItems = this.sort(leftItems);
    let sortedRightItems = this.sort(rightItems);

    return sortedLeftItems.concat(centerItems, sortedRightItems);
  }
}
