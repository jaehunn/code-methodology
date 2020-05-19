// general mutiply
function multiply(values, others) {
  let result = [0, 0, 0, 0, 0, 0, 0, 0]; // size = 8

  for (let targetIndex = 0; targetIndex < values.length; targetIndex += 1) {
    for (let index = 0; index < others.length; index += 1) {
      result[targetIndex + index] += values[targetIndex] * others[index];
    }
  }

  result.reverse();

  normalize(result);

  console.log(result);

  return result;
}

multiply([1, 2, 3, 4], [5, 6, 7, 8]);

function normalize(items) {
  items.shift(0);

  for (let index = 0; index < items.length - 1; index += 1) {
    if (items[index] < 0) {
      let borrow = Math.floor(Math.abs(items[index] + 9) / 10);

      items[index + 1] -= borrow;
      items[index] += borrow * 10;
    } else {
      items[index + 1] += Math.floor(items[index] / 10);
      items[index] %= 10;
    }
  }

  while (items.length && items[0] === 0) items.shift();
}

// karatsuba
function addTo(values, others, exp) {
  // a += b * 10^exp
}

function subFrom(values, others) {
  // a -= b
}

function karatsuba(values, others) {
  if (values.length < others.length) return karatsuba(others, values);

  if (!values.length || !others.length) return []; // empty

  if (values.length <= 50) return multiply(a, b); // if less than length, use general case

  let half = Math.floor(values.length / 2);

  // values_1: upper in half
  // values_0: lower in half
  let values_0 = values.slice(0, half);
  let values_1 = values.slice(half, values.length - 1);

  let others_0 = others.slice(0, 0 + Math.min(others.length, half));
  let others_1 = others.slice(Math.min(others.length, high), others.length - 1);

  // result_0 = values_0 * others_0
  let result_0 = karatsuba(values_0, others_0);

  // result_2 = values_1 * others_1
  let result_2 = karatsuba(values_1, others_1);

  // result_1 = values_0 * others_1 + values_1 * others_0
  // = (values_0 * others_0) - result_0 - result_2
  let reuslt_1 = karatsuba(
    addTo(values_0, values_1, 0),
    addTo(others_0, others_1, 0)
  );

  subFrom(result_1, result_0);
  subFrom(result_1, result_2);

  let result;
  addTo(result, result_0, 0);
  addTo(result, result_1, half);
  addTo(result, result_2, half + half);

  return result;
}
