const log = console.log;

function factor(num) {
  if (num === 1) return [1, 1];

  let result = [];
  for (let div = 2; num > 1; div += 1) {
    while (num % div === 0) {
      num /= div;

      result.push(div);
    }
  }

  return result;
}

log(factor(13));
