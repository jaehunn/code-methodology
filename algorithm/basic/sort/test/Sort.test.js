describe("Sort", () => {
  let items;
  let asc_items;
  let desc_items;

  let asc;
  let desc;

  let asc_sort;
  let desc_sort;

  beforeEach(() => {
    items = [5, 3, 4, 1, 2];
    asc_items = [1, 2, 3, 4, 5];
    desc_items = [5, 4, 3, 2, 1];

    asc = (a, b) => a < b;
    desc = (a, b) => a > b;

    asc_sort = new Sort(items, asc);
    desc_sort = new Sort(items, desc);
  });

  describe("Selection Sort", () => {
    it("Sort Ascending", () => {
      asc_sort.selection();

      expect(asc_sort.items).toEqual(asc_items);
    });

    it("Sort Decending", () => {
      desc_sort.selection();

      expect(desc_sort.items).toEqual(desc_items);
    });
  });

  describe("Bubble Sort", () => {
    it("Sort Ascending", () => {
      asc_sort.bubble();

      expect(asc_sort.items).toEqual(asc_items);
    });

    it("Sort Decending", () => {
      desc_sort.bubble();

      expect(desc_sort.items).toEqual(desc_items);
    });
  });
});
