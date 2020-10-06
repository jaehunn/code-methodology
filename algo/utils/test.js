import { Comparator } from ".";

describe("Utils", () => {
  describe("Comparator", () => {
    const data = {
      asc: [1, 5],
      desc: [5, 1],
      eq: [1, 1],
      negAsc: [-4, -1],
      negDesc: [-1, -4],
    };

    let comparator;

    beforeEach(() => {
      comparator = new Comparator();
    });

    it("compare default value is defaultComparator", () => {
      const { compare: dfc } = comparator;

      expect(dfc(...data["asc"])).toBe(-1);
      expect(dfc(...data["negAsc"])).toBe(-1);

      expect(dfc(...data["desc"])).toBe(1);
      expect(dfc(...data["negDesc"])).toBe(1);
      expect(dfc(...data["eq"])).toBe(0);
    });

    it("equal()", () => {
      // TODO: alias -> compare undefined
      // const { equal: eq } = comparator;
      const eq = comparator.equal.bind(comparator);

      expect(eq(...data["asc"])).toBe(false);
      expect(eq(...data["eq"])).toBe(true);
    });

    it("lessThan()", () => {
      const lt = comparator.lessThan.bind(comparator);

      expect(lt(...data["asc"])).toBe(true);
      expect(lt(...data["desc"])).toBe(false);
      expect(lt(...data["eq"])).toBe(false);
      expect(lt(...data["negAsc"])).toBe(true);
      expect(lt(...data["negDesc"])).toBe(false);
    });

    it("greaterThan()", () => {
      const gt = comparator.greaterThan.bind(comparator);

      expect(gt(...data["asc"])).toBe(false);
      expect(gt(...data["desc"])).toBe(true);
      expect(gt(...data["eq"])).toBe(false);
      expect(gt(...data["negAsc"])).toBe(false);
      expect(gt(...data["negDesc"])).toBe(true);
    });

    it("lessThanOrEqual()", () => {
      const lte = comparator.lessThanOrEqual.bind(comparator);

      expect(lte(...data["asc"])).toBe(true);
      expect(lte(...data["desc"])).toBe(false);
      expect(lte(...data["eq"])).toBe(true);
      expect(lte(...data["negAsc"])).toBe(true);
      expect(lte(...data["negDesc"])).toBe(false);
    });

    it("greaterThanOrEqual()", () => {
      const gte = comparator.greaterThanOrEqual.bind(comparator);

      expect(gte(...data["asc"])).toBe(false);
      expect(gte(...data["desc"])).toBe(true);
      expect(gte(...data["eq"])).toBe(true);
      expect(gte(...data["negAsc"])).toBe(false);
      expect(gte(...data["negDesc"])).toBe(true);
    });

    it("reverse()", () => {
      // TODO: this binding
      comparator.reverse();

      expect(comparator.compare(...data["asc"])).toBe(1);
      expect(comparator.lessThan(...data["asc"])).toBe(false);
    });
  });
});
