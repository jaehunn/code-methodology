import Sort from "../../sort";

export default class Quick extends Sort {
  sort(originalItems) {
    if (originalItems.length <= 1) return originalItems;

    const items = [...originalItems];

    const leftItems = [];
    const rightItems = [];

    const pivot = items.shift(); // first element
    const centerItems = [pivot];

    while (items.length) {
      const currentItem = items.shift();

      if (this.comparator.equal(currentItem, pivot)) {
        centerItems.push(currentItem);
      } else if (this.comparator.lessThan(currentItem, pivot)) {
        leftItems.push(currentItem);
      } else {
        rightItems.push(currentItem);
      }
    }

    const sortedLeftItems = this.sort(leftItems);
    const sortedRightItems = this.sort(rightItems);

    return sortedLeftItems.concat(centerItems, sortedRightItems);
  }
}
