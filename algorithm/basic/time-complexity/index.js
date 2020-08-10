// 1. example
{
  // O(items.length^2)
  function majority(items) {
    let major = -1;
    let majorCount = 0;
    for (let i = 0; i < items.length; i += 1) {
      let count = 0;

      for (let j = 0; j < items.length; j += 1) {
        if (items[j] === items[i]) count += 1;
      }

      if (count > majorCount) {
        majorCount = count;
        major = items[i];
      }
    }

    return major;
  }

  // O(items.length + 100)
  function betterMajority(items) {
    let counts = [];
    for (let i = 0; i < items.length; i += 1) {
      if (!counts[items[i]]) counts[items[i]] = 1;
      else counts[items[i]] += 1; // index == items[i]
    }

    // if items element: [0 ...100]
    let major = 0;
    for (let i = 1; i <= 100; i += 1) {
      if (counts[i] > counts[major]) major = i;
    }

    return major;
  }
}
