import Sort from "../Sort";

describe("Sort", () => {
  it("직접적으로 Sort.sort() 를 호출하면 에러를 던집니다.", () => {
    const doForbiddenSort = () => {
      const sorter = new Sort();

      sorter.sort();
    };

    expect(doForbiddenSort).toThrow();
  });
});
