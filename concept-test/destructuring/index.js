const log = console.log;

const obj = {
  a: 1,
  b: 4,
  c: 8,
};

const arr = [1, 3, 9];

// 1. 기본값 설정하기
{
  const { a, b, c, d = 16 } = obj;

  log(d); // 16
}

// 2. 별명 짓기
{
  const { a, b, c: _c } = obj;

  // log(c); 참조 에러!
  log(_c); // 8
}

// 3. 배열에서 원하는 원소 가져오기
{
  const [, , c] = arr;

  log(c); // 9
}

// 4. spread, 원소 뿌리기
{
  const _obj = foo(...arr);

  log(_obj);

  function foo(a, b, c) {
    return { a, b, c }; // { a: 1, b: 3, c: 9 }
  }
}

// 5. rest, 원소 합치기
{
  const _arr = bar(1, 4, 16);

  log(_arr); // [ 1, 4, 16 ]

  log(arr === _arr); // false

  function bar(...item) {
    return [...item];
  }
}

// 6. copy vs. clone
{
  // clone 은 기존의 것에 빗대어 새로운 참조를 만든다.
  const cloneArr = arr.slice(0);
  cloneArr[1] = 0;

  log(arr); // [1, 3, 9] (불변성 유지)
  log(cloneArr); // [1, 0, 9]

  // copy 는 기존 것에 대한 참조를 가진다.
  const copyArr = arr;
  copyArr[1] = 0;

  log(arr); // [1, 0, 9] (부수효과 발생)
  log(copyArr); // [1, 0, 9]
}

// *immutablility
