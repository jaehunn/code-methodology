import Sort from "../../sort";

export default class Selection extends Sort {
  constructor(items) {
    super(items);
  }

  sort() {
    for (let i = 0; i < this.items.length; i += 1) {
      let minI = i;

      for (let j = i + 1; j < this.items.length; j += 1) {
        if (this.comparator.lessThan(this.items[j], this.items[minI])) minI = j;
      }

      if (minI !== i) [this.items[minI], this.items[i]] = [this.items[i], this.items[minI]];
    }
  }
}
