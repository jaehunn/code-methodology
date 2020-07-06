### Two Sum

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const m = {};

  for (let i = 0; i < nums.length; i += 1) {
    const c = target - nums[i];

    if (c in m) return [m[c], i];

    m[nums[i]] = i;
  }

  return null;
};
```

1. 해시 테이블
2. 보수로 캐싱

### 2. Reverse Integer

```jsx
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const max = Math.pow(2, 31);

  let r = 0;
  while (x) {
    r = r * 10 + (x % 10);
    if (r >= max || r <= -max - 1) return 0;
    x = (x / 10) << 0;
  }

  return r;
};

var reverse = function (x) {
  if (x < 0) return -1 * reverse(-x);

  const r = parseInt(`${x}`.split("").reverse().join(""), 10);

  if (r > 2 ** 31 - 1) return 0;

  return r;
};
```

1. 십진수, 소수점 제거
2. 부호 보존
3. 지수 표현

### 3. Palindrome Number

```jsx
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false;

  const _x = x;

  let r = 0;
  while (x > 0) {
    r = r * 10 + (x % 10);
    x = parseInt(x / 10, 10);
  }

  return r === _x;
};
```

1. 사본 생성

### 4. Roman to Integer

```jsx
/**
 * @param {string} s
 * @return {number}
 */

var romanToInt = function (s) {
  if (!s || s.length === 0) return 0;

  const m = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  let i = s.length - 1;
  let r = m.get(s[i]);

  while (i) {
    const [c, p] = [m.get(s[i]), m.get(s[i - 1])];

    if (p >= c) {
      r += p;
    } else {
      r -= p;
    }

    i -= 1;
  }

  return r;
};
```

1. 키를 인덱스로 찾고, 값을 키로 찾는 해시 배열 자료형
2. 버블 탐색

### 5. Longest Common Prefix

```jsx
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";

  let r = "";
  for (let i = 0; i < strs[0].length; i += 1) {
    for (let j = 1; j < strs.length; j += 1) {
      if (strs[0][i] !== strs[j][i]) return r;
    }

    r += strs[0][i];
  }

  return r;
};
```

1. 선택 탐색
