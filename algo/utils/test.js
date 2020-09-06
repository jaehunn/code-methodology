import { Comparator } from "../utils";

describe("Utils", () => {
  describe("Comparator", () => {
    const data = {
      asc: [1, 5],
      desc: [7, 4],
      eq: [1, 1],
      negAsc: [-4, -1],
      negDesc: [-2, -6],
    };

    let comparator;

    beforeEach(() => {
      comparator = new Comparator();
    });

    it("compare default value is defaultComparator", () => {
      const defaultCompareFunction = comparator.compare;

      expect(defaultCompareFunction(...data["asc"])).toBe(-1);
      expect(defaultCompareFunction(...data["negAsc"])).toBe(-1);

      expect(defaultCompareFunction(...data["desc"])).toBe(1);
      expect(defaultCompareFunction(...data["negDesc"])).toBe(1);
      expect(defaultCompareFunction(...data["eq"])).toBe(0);
    });
  });
});
