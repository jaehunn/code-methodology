import { Comparator } from "../utils";

export default class Sort {
  constructor(items, compareFunction) {
    this.items = items || [];
    this.comparator = new Comparator(compareFunction);
  }

  sort() {
    throw new Error(`sort() 구현되어 있지 않습니다!`);
  }
}
