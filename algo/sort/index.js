import { Comparator } from "../utils";

export default class Sort {
  constructor(compareFunction) {
    this.comparator = new Comparator(compareFunction);
  }

  sort() {
    throw new Error(`sort() 구현되어 있지 않습니다!`);
  }
}
