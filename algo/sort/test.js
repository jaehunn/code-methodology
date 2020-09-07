import Sort from "../sort";
import Selection from "./selection";
import Insertion from "./insertion";
import Bubble from "./bubble";
import Merge from "./merge";
import Quick from "./quick";

describe("Sort 클래스", () => {
  const data = {
    asc: [1, 2, 3, 4, 5],
    desc: [5, 4, 3, 2, 1],
    eq: [1, 1, 1, 1, 1],
    negAsc: [-5, -4, -3, -2, -1],
    negDesc: [-1, -2, -3, -4, -5],
  };

  const { asc, desc, eq, negAsc, negDesc } = data;

  let sorter;

  beforeEach(() => {
    sorter = new Sort();
  });

  it("Sort.sort() 로 직접 접근 하면 에러를 던집니다. sort 메서드는 각 정렬 클래스에서 오버라이딩해야합니다.", () => {
    expect(sorter.sort).toThrow(new Error(`sort() 구현되어 있지 않습니다!`));
  });

  describe("Selection 클래스", () => {
    const selectionSorter = new Selection();

    it("오름차순 정렬", () => {
      expect(selectionSorter.sort(asc)).toEqual(asc);
      expect(selectionSorter.sort(desc)).toEqual(asc);
      expect(selectionSorter.sort(eq)).toEqual(eq);
      expect(selectionSorter.sort(negAsc)).toEqual(negAsc);
      expect(selectionSorter.sort(negDesc)).toEqual(negAsc);
    });

    it("내림차순 정렬", () => {});
  });

  describe("Insertion 클래스", () => {
    const insertionSorter = new Insertion();

    it("오름차순 정렬", () => {
      expect(insertionSorter.sort(asc)).toEqual(asc);
      expect(insertionSorter.sort(desc)).toEqual(asc);
      expect(insertionSorter.sort(eq)).toEqual(eq);
      expect(insertionSorter.sort(negAsc)).toEqual(negAsc);
      expect(insertionSorter.sort(negDesc)).toEqual(negAsc);
    });

    it("내림차순 정렬", () => {});
  });

  describe("Bubble 클래스", () => {
    const bubbleSorter = new Bubble();

    it("오름차순 정렬", () => {
      expect(bubbleSorter.sort(asc)).toEqual(asc);
      expect(bubbleSorter.sort(desc)).toEqual(asc);
      expect(bubbleSorter.sort(eq)).toEqual(eq);
      expect(bubbleSorter.sort(negAsc)).toEqual(negAsc);
      expect(bubbleSorter.sort(negDesc)).toEqual(negAsc);
    });

    it("내림차순 정렬", () => {});
  });

  describe("Merge 클래스", () => {
    const mergeSorter = new Merge();

    it("오름차순 정렬", () => {
      expect(mergeSorter.sort(asc)).toEqual(asc);
      expect(mergeSorter.sort(desc)).toEqual(asc);
      expect(mergeSorter.sort(eq)).toEqual(eq);
      expect(mergeSorter.sort(negAsc)).toEqual(negAsc);
      expect(mergeSorter.sort(negDesc)).toEqual(negAsc);
    });

    it("내림차순 정렬", () => {});
  });

  describe("Quick 클래스", () => {
    const quickSorter = new Quick();

    it("오름차순 정렬", () => {
      expect(quickSorter.sort(asc)).toEqual(asc);
      expect(quickSorter.sort(desc)).toEqual(asc);
      expect(quickSorter.sort(eq)).toEqual(eq);
      expect(quickSorter.sort(negAsc)).toEqual(negAsc);
      expect(quickSorter.sort(negDesc)).toEqual(negAsc);
    });

    it("내림차순 정렬", () => {});
  });
});
