const log = console.log;

// javascript 는 함수 스코핑을 따릅니다.
// let, const 키워드로 블록 스코핑을 지원할 수 있습니다.

// javascript -> function scope
// block scope -> let, const
{
  {
    var a = 10; // (A)
    let b = 10; // (B)
  }

  function foo() {
    var a = 20; // (C)
    let b = 30; // (D)

    log(a); // (C) 20
    log(b); // (D) 30
  }

  foo();

  log(a); // (A) 10
  // log(b); // ReferenceError
}

// var
{
  // 코드로 진입하면 var 키워드로 선언된 변수를 보고 선언과 초기화가 한번에 이루어집니다. (undefined 로 초기화)
  log(z); // undefined
  z = 10; // 할당부 입니다.
  log(z); // 10
  var z;
  log(z); // 10
}

// let
{
  // 코드로 진입하면 let(또는 const) 키워드로 선언된 변수는 선언과 초기화 사이에 TDZ 라는 구간이 있어 초기화(let y;) 를 만나기 전까지 접근할 수 없습니다.
  log(y); // cannot access
  y = 10; // cannot access
  log(y); // cannot access
  let y;
  y = 10;
  log(y); // 10;

  // 변수의 단게(선언 -> 초기화 -> 할당) 에서 선언은 선언문이 아닙니다. (선언문은 초기화단계로 봅니다.) 실행컨텍스트의 변수객체에 식별자 이름이 key 로 등록되는 것이 선언입니다.
  // 즉, var 키워드 변수의 선언과 초기화가 한번에 이루어짐은 { key: 식별자이름, value: undefined } 로 됨을 의미합니다. 이것을 변수 호이스팅이라고 합니다.
  // let 키워드로 선언한 변수도 호이스팅이 일어나는거지만, TDZ(Temporal Dead Zone) 로 선언과 초기화가 개별적으로 진행되어 호이스팅이 안되는것 같아 보인다.

  let x = 1;

  {
    console.log(x); // ReferenceError, x 에 접근할 수 없음은 내부 x 가 호이스팅 되었기 때문이다.
    let x = 2; // 지역 변수
  }
}

// lexical scope (scope chain)
{
  let z = 10;
  function foo(y) {
    z += 10;

    bar();
    function bar() {
      log(z + y); // bar 내부에서 z 와 y 를 찾을 수 없으니 상위 스코프(foo, global) 로 순차적으로 탐색해 식별자를 찾는다. (scope chain)
    }
  }
}

// 나중에 적용하기 currying (closure)
{
  function add(a) {
    return function (b) {
      return a + b; // a 를 기억합니다.
    };
  }

  const add10 = add(10);

  log(add10(5)); // 15
  log(add10(25)); // 35
}
