// 1. 미랫값을 캡슐화해 호출부와의 관심사의 분리로 개발자가 추론가능한 코드를 작성할 수 있다.
// 2. 미랫값(성공, 싪패) 에 따라 흐름 제어
{
  function foo() {
    return new Promise((resolve, reject) => {
      // 성공 조건 -> resolve()
      // 실패 조건 -> reject()
    });
  }

  foo().then(
    () => {
      // 성공 처리기
    },
    () => {
      // 싪 ㅐ처리기
    }
  );

  // 프라미스는 성공 또는 실패로 귀결되면, 불변상태를 유지한다. (해당 프라미스 다른 처리기가 귀결값에 영향을 줄 수 없다.)
}

// 3. 프라미스는 데너블이다. 데너블은 then() 메서드를 가진 객체를 통칭한다. 따라서 덕 타이핑 될 수 있다.
{
  if (p !== null && (typeof p === "object" || typeof p === "function") && typeof p.then === "function") {
    // 데너블이다.
  } else {
    // 데너블이아니다.
  }
}

// 4. 프라미스 특징
{
  // (1) then() 에 넘긴 처리기(콜백) 은 항상 비동기적으로 부른다. 따라서 등록된 처리기는 순서대로 실행된다.
  p.then(() => {
    // 1

    p.then(() => {
      // 3
    });
  });

  p.then(function () {
    // 2
  });

  // (2) 프라미스는 성공 아니면 실패로 항상 귀결된다.
  // (3) 프라미스는 최초에 딱 한번 귀결된다. (암시적 귀결값은 undefined 다.)
  // Promise.resolve() 는 프라미스가 아닌 데너블 또는 즉시값을 받으면 구체적인 값의 프라미스를 반환한다. (정규화)

  Promise.resolve(42).then(
    (value) => {
      throw Error();

      // 이하는 실행되지 않는다.
    },
    (error) => {
      // 이미 프라미스가 42 로 귀결되었기 때문에 실행되지 않는다.
    }
  );
}

// 5. 프라미스 연쇄와 에러처리
{
  // then() 을 호출할 때마다 새로운 프라미스를 연쇄할 수 있다.
  // then() 의 성공 처리기의 반환값은 다음 성공 처리기의 인자로 세팅된다.

  Promise.resolve(21)
    .then((value) => {
      return value * 2;
    })
    .then((value) => {
      value; // 42
    });

  // then() 연쇄마다 단계를 비동기적으로 작동하게 만드는 핵심은 Promise 의 resolve() 의 작동 로직이다.
  // Promise.resolve() 는 인자가 프라미스면 즉시 반환하고, 아니면 구체적인 값이 나올 때까지 풀어본다.

  Promise.resolve(21)
    .then((value) => {
      return new Promise((resolve) => {
        resolve(value * 2);
      });
    })
    .then((value) => {
      value; // 42
    });

  // 프라미스로 한번 더 감쌌지만, then() 에서 다시 풀어보므로 값은 여전히 42 다.
}
