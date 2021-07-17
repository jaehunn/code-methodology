// React useState()
{
  function useState(initialState) {
    let _state = initialState;
    const state = _state;
    const setState = (newState) => (_state = newState);

    return [state, setState];
  }

  const [state, setState] = useState(0);

  console.log(state); // 0
  setState(1);
  console.log(state); // 0, 왜 0 일까요?
}

// singleton pattern
{
  const Foo = (function () {
    // private
    let member = "member";

    function method() {
      console.log(member);
    }

    return {
      method,
    };
  })();

  Foo.method();
}

// state 는 끝난 값이기 때문에 _state 값을 계속해서 기억하지못합니다.
// const state = () => _state; 처럼 클로저로 만들면 최신의 상태를 기억할 수 있습니다.
