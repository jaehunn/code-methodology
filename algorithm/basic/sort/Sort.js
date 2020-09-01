class Sort {
  constructor(originalItems = [], comparator = defaultComparator) {
    this.items = originalItems;
    this.compare = comparator;
  }

  static defaultComparator(a, b) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  selection() {
    for (let i = 0; i < this.items.length; i += 1) {
      let minI = i;

      for (let j = i + 1; j < this.items.length; j += 1) {
        if (!this.compare(this.items[minI], this.items[j])) minI = j;
      }

      if (minI !== i) [this.items[i], this.items[minI]] = [this.items[minI], this.items[i]];
    }
  }

  bubble() {
    let flag = false;

    for (let i = 1; i < this.items.length; i += 1) {
      for (let j = 0; j < this.items.length - i; j += 1) {
        if (!this.compare(this.items[j], this.items[j + 1])) {
          [this.items[j], this.items[j + 1]] = [this.items[j + 1], this.items[j]];

          flag = true;
        }
      }

      if (!flag) return;
    }
  }
}
