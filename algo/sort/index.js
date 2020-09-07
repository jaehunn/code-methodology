import { Comparator } from "../utils";

export default class Sort {
  constructor(items) {
    this.items = items || [];
    this.comparator = new Comparator();
  }

  sort() {
    throw new Error(`sort() 구현되어 있지 않습니다!`);
  }
}
