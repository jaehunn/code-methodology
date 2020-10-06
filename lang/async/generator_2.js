const log = console.log;
const clear = console.clear;

function* inorder(t) {
  if (!t) return;

  yield* inorder(t.left);
  yield t;
  yield* inorder(t.right);
}

// 협력적 멀티테스킹

function* foo() {
  yield 1; // 값을 쓴다.
  yield 2;
  yield 3;
}

for (let i of foo()) {
  console.log(i); // 생성된 이터레이터로 값을 읽는다 = foo().next().value
}

function* f() {
  log(yield 0); // 값을 읽는다
  log(yield 2);
  log(yield 4);
  return 6;
}

let g = f();
console.log(g.next());
console.log(g.next(1)); // 값을 쓴다.
console.log(g.next(3));
console.log(g.next(5));

// 코루틴: 값 응답, 함수 멈춤/재개 기능

function TreeNode(val, left = EMPTY, right = EMPTY) {
  this.val = val;
  this.left = left;
  this.right = right;
}
TreeNode.prototype[Symbol.iterator] = function* iterator() {
  yield* this.left;
  yield this.val;
  yield* this.right;
};

// async/await https://medium.com/@jooyunghan/%EC%BD%94%EB%A3%A8%ED%8B%B4-%EC%86%8C%EA%B0%9C-504cecc89407

async function getProcessedData(url) {
  let v;

  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }

  return processDataInWorker(v);
}

// 제너레이터와 async await 비교
// 주종관계: 세미 코루틴 / 비대칭 코루틴
// 동등관계: 대칭 코루틴

// 코루틴 시멘틱
// 대칭/비대칭, 코루틴 일급객체?, 스택풀 지원여부

// 상태를 유지, 제어 반환 -> 제어 획득 시 흐름 진행
// 콜스택 지원: 중첩 콜에서 멈출수 있는가
// 제너레이터 위임
