// 1543 문서 검색
{
  function solve(str, target) {
    let cnt = 0;
    while (~str.indexOf(target)) {
      const i = str.indexOf(target);

      str = str.slice(i + target.length);

      cnt += 1;
    }

    return cnt;
  }
}

// 1568 새
{
  // 14 = 1 2 3 4 1 2 1
  function solve(n) {
    let cnt = 0;
    let i = 1;
    while (n) {
      if (n < i) i = 1;
      n -= i;

      cnt += 1;
      i += 1;
    }

    return cnt;
  }
}

// 1302 베스트셀러
{
  // r[name] = cnt
  function solve(items) {
    let r = {};
    let maxKey = items[0];
    for (let i = 0; i < items.length; i += 1) {
      if (!r[items[i]]) r[items[i]] = 1;
      else r[items[i]] += 1;

      if (r[maxKey] < r[items[i]]) maxKey = items[i];
    }

    return maxKey;
  }
}

// 1668 트로피 진열
{
  // ascending
  function solve(items) {
    let l = 1;
    for (let i = 0; i < items.length; i += 1) {
      if (l < items[i]) l += 1;
      console.log(l);
    }

    let max = l;
    let r = 1;
    for (let j = items.length - 1; j >= 0; j -= 1) {
      if (max >= items[j]) break;

      r += 1;
    }

    return [l, r];
  }
}

// 1236 성 지키기
{
  function solve(matrix) {
    let r = 0;
    let f;
    let w = matrix.length; // w * w
    for (let i = 0; i < w; i += 1) {
      f = false;
      for (let j = i; j < w; j += 1) {
        if (matrix[i][j] === 1 || matrix[j][i] === 1) {
          f = true;
          break;
        }
      }

      if (!f) r += 1;
    }

    return r;
  }
}

// 선형 탐색: 리니어 / 바이너리(분할 정복) / 해싱
// 비선형 탐색: 자료구조-(트리, 그래프)

// 2110 공유기 설치
{
  // gap 사용하기
  function solve(n, items) {}

  console.log(solve(2, [5, 4, 3, 2, 1]));
}

// 1939 중량 제한
{
}
