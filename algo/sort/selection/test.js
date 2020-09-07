import Selection from "../selection";

describe("Selection", () => {
  const data = {
    asc: [1, 2, 3, 4, 5],
    desc: [5, 4, 3, 2, 1],
    eq: [1, 1, 1, 1, 1],
    negAsc: [-5, -4, -3, -2, -1],
    negDesc: [-1, -2, -3, -4, -5],
  };

  let asc_selection;
  let desc_selection;
  let eq_selection;
  let negAsc_selection;
  let negDesc_selection;

  beforeEach(() => {
    asc_selection = new Selection(data["asc"]);
    desc_selection = new Selection(data["desc"]);
    eq_selection = new Selection(data["eq"]);
    negAsc_selection = new Selection(data["negAsc"]);
    negDesc_selection = new Selection(data["negDesc"]);
  });

  it("sort", () => {
    asc_selection.sort();
    expect(asc_selection.items).toEqual(data["asc"]);

    desc_selection.sort();
    expect(desc_selection.items).toEqual(data["asc"]);

    eq_selection.sort();
    expect(eq_selection.items).toEqual(data["eq"]);

    negAsc_selection.sort();
    expect(negAsc_selection.items).toEqual(data["negAsc"]);

    negDesc_selection.sort();
    expect(negDesc_selection.items).toEqual(data["negAsc"]);
  });
});
