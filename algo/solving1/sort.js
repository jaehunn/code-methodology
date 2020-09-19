// 2750 수 정렬하기
{
  function solve(items) {
    for (let i = 0; i < items.length; i += 1) {
      let c = i;

      while (c && items[c - 1] > items[c]) {
        [items[c - 1], items[c]] = [items[c], items[c - 1]];

        c -= 1;
      }
    }

    return items;
  }
}

// 1427 소트인사이드
{
  function solve(str) {
    return str.split("").sort((a, b) => b - a);
  }
}

// 10814 나이순 정렬
{
  function solve(profileItems) {
    return profileItems.map((v) => v.split(" ")).sort((a, b) => +a[0] - +b[0]);
  }
}

// 11650 좌표 정렬하기
{
  function solve(posItems) {
    return posItems.sort((a, b) => a[0] - b[0]).sort((a, b) => a[0] === b[0] && a[1] - b[1]);
  }
}

// 10989 수 정렬하기3
{
  function solve(items) {
    const cnt = Array(items.length).fill(0);
    items.forEach((v) => (cnt[v] += 1));

    for (let i = 1; i < cnt.length; i += 1) {
      cnt[i] += cnt[i - 1];
    }

    // [0, 4, 6, 9, 9, 11, 12, 12, 12, 12, 13, 13, 13];
    // 1: [0 ...3] (4)
    // 2: [4 ...5] (2)
    // 3: [6 ...8] (3)
    // 4: [9 ...10] (2)
    // 5: [11 ...12] (2)
    // 6: [12] (1)
    // 10: [13 ...13] (1)
  }
}

// 2751 수 정렬하기2
{
  function solve(items) {
    if (items.length === 1) return items;

    let mid = (items.length / 2) << 0;

    return merge(solve(items.slice(0, mid)), solve(items.slice(mid, items.length)));

    function merge(leftItems, rightItems) {
      const result = [];
      while (leftItems.length || rightItems.length) {
        if (!rightItems.length || leftItems[0] <= rightItems[0]) {
          result.push(leftItems.shift());
        } else result.push(rightItems.shift());
      }

      return result;
    }
  }
}

// 11004 k번째 수
{
  function solve(items, n) {
    return items.sort((a, b) => a - b).find((v, i) => i === n - 1);
  }
}
