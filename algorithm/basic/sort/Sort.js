import { Comparator } from "../data-structure/utils";

/**
 * @typedef {Object} SorterCallbacks
 * @property {function(a: *, b: *)} compareCallback = 비교 연산할 때 수행
 * @property {function(a: *)} visitingCallback = 다음 요소를 방문할 때 수행
 */

export default class Sort {
  constructor({ compareCallback, visitingCallback } = {}) {
    this.callbacks = {
      compareCallback: compareCallback || undefined,
      visitingCallback: visitingCallback || (() => {}),
    };

    this.comparator = new Comparator(this.callbacks.compareCallback);
  }

  sort() {
    throw new Error(`sort 메서드가 구현되어 있지 않습니다.`);
  }
}
