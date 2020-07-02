// 1. 제너레이터
{
  var x = 1;

  // 제너레이터 선언
  function* foo() {
    x++;

    yield;

    console.log(x);
  }

  function bar() {
    x++;
  }

  // 실행
  var it = foo(); // foo 제너레이터를 제어할 이터레이터를 반환받는다.

  it.next(); // 제너레이터를 실행한다. yield 전까지 실행
  x; // 2
  bar();
  x; // 3
  it.next(); // 제너레이터를 실행한다. yield 가 없고 return 이 생략되있으므로 암시적으로 끝까지 실행
}


