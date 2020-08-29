function mergeSort(items, s = 0, e = items.length - 1) {
  let r;

  // 길이가 1이 될 때까지
  if (s < e) {
    const m = ((s + e) / 2) << 0;

    // 재귀적으로 배열을 절반씩 나눈다.
    mergeSort(items, s, m);
    mergeSort(items, m + 1, e);

    // 두 배열을 병합한다.
    r = merge(s, m, e);
  }

  return r;

  function merge(s, m, e) {
    // 두 배열의 시작 포인터
    let i = s;
    let j = m + 1;

    let r = [];
    while (r.length < e - s + 1) {
      // 포인터가 배열의 길이를 초과하면 자동적으로 다른 배열이 남은 원소를 차지한다.
      if (i <= m || items[i] < items[j]) r.push(items[i++]);
      else r.push(items[j++]);
    }

    return r;
  }
}

console.log(mergeSort([5, 4, 3, 2, 1]));
// desc: [5, 4] [3] -> shift [5, 4, 3]
// asc: [4, 5] [3] -> push [3, 4, 5]
