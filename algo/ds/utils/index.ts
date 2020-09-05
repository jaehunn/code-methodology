type compareFunctionType = (a: number, b: number) => number;
type compareType = (a: number, b: number) => boolean;

class Comparator {
  compare: compareFunctionType;

  constructor(compareFunction: compareFunctionType) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a: number, b: number) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  equal(a: number, b: number): boolean {
    return this.compare(a, b) === 0;
  }

  lessThan(a: number, b: number): boolean {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: number, b: number): boolean {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: number, b: number): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanEqual(a: number, b: number): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse(): void {
    const compareOriginal = this.compare;

    // Redefine
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
