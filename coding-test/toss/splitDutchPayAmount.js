/*
 문제 접근: 모듈러 연산
*/
/**
 * @param {number} peopleCount 금액을 나눌 사람의 수
 * @param {number} amount 나눌 금액
 * @returns {number[]} 각자가 부담할 금액을 나타내는 숫자의 배열
 */
function splitDutchPayAmount(peopleCount, amount) {
  let r = [];
  for (let i = 0; i < peopleCount; i += 1) {
    r[i] = (amount / peopleCount) >> 0;
  }

  if (amount % peopleCount) r[0] += amount % peopleCount;

  return r;
}
