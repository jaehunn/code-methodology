### 1. Search Insert Position

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] >= target) return i;
  }

  return nums.length;
};
```

1. 대소 비교로 한 단계 추상화

### 2. Count and Say

```jsx
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  if (n === 1) return "1";

  return count(countAndSay(n - 1));
};

function count(n) {
  let s = "";
  let c = 1;

  for (let i = 0; i < n.length; i += 1) {
    if (n[i + 1] === n[i]) c += 1;
    else {
      s += c + "" + n[i];
    }
  }

  return s;
}
```

1. 재귀 패턴

### 3. Maximum Subarray

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let p = 0;
  let max = -Number.MAX_VALUE; // -2^1024

  for (let i = 0; i < nums.length; i += 1) {
    p = Math.max(p + nums[i], nums[i]);
    max = Math.max(max, p);
  }

  return max;
};
```

1. 메모하기
2. Math.max() 로 대상 추상화하기

### 4. Length of Lasy Word

```jsx
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  return s.trim().split(" ").pop().length;
};
```

### 5. Plus One

```jsx
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let l = digits.length;
  let c = 1;

  for (let i = l - 1; i >= 0; i -= 1) {
    let n = digits[i] + c;

    c = 0;

    if (n > 9) {
      n -= 10;
      c = 1;
    }

    digits[i] = n;
  }

  return c ? [1, ...digits] : digits;
};
```

1. Carry 로직
