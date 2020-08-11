// 1. selection
function selection(nums) {
  for (let i = 0; i < nums.length; i += 1) {
    let m = i;

    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[m] < nums[j]) m = j;
    }

    if (m !== i) [nums[i], nums[m]] = [nums[m], nums[i]];
  }

  return nums;
}

// 2. bubble
function bubble(items) {
  let f = false;

  for (let i = 1; i < items.length; i += 1) {
    f = false;

    for (let j = 0; j < items.length - i; j += 1) {
      if (items[j] > items[j + 1]) {
        [items[j], items[j + 1]] = [items[j + 1], items[j]];

        f = true;
      }
    }

    if (!f) return items;
  }

  return items;
}

// 3. insertion
function insertion(items) {
  for (let i = 0; i < items.length; i += 1) {
    let c = i;

    while (items[c - 1] !== undefined && items[c - 1] > items[c]) {
      [items[c - 1], items[c]] = [items[c], items[c - 1]];

      c -= 1;
    }
  }

  return items;
}
