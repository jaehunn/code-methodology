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

  console.log(solve("ababababa", "a"));
}

// 1568 새
{
}

// 1302 베스트셀러
{
}

// 1668 트로피 진열
{
}

// 1236 성 지키기
{
}
