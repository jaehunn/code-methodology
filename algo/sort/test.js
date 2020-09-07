import Sort from "../sort";

describe("Sort", () => {
  it("Sort 클래스의 sort 메서드는 직접 호출하면 에러를 던집니다.", () => {
    const sort = new Sort();

    expect(sort.sort).toThrow(new Error(`sort() 구현되어 있지 않습니다!`));
  });
});
