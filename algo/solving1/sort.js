// 1. 10989
{
  function solving(items) {
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

  console.log(solving([1, 5, 2, 3, 3, 3, 2, 1, 1, 1, 5, 6, 10]));
}

// sorts:
