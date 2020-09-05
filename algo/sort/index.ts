interface Sort {
  callbacks: 
  comparator:
};

class Sort {
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
