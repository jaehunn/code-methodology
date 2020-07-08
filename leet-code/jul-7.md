### 1. Vaild Parentheses

```jsx
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let m = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  let r = [];
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") r.push(s[i]);
    else {
      if (r[r.length - 1] === m[s[i]]) r.pop();
      else return false;
    }
  }

  return !r.length ? true : false;
};
```

1. 매핑 해쉬
2. 스택

### 2. Merge Two Sorted Lists

```jsx
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!li || !l2) return l1 || l2;

  const h = new ListNode();
  let c = h;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      c.val = l1.val;

      l1 = l1.next;
    } else if (l1.val > l2.val) {
      c.val = l2.val;

      l2 = l2.next;
    } else {
      l.val = l1.val;
      l.next = new ListNode(l2.val);

      l = l.next;
      l1 = l1.next;
      l2 = l2.next;
    }

    if (l1 && l2) {
      l.next = new ListNode();
      l = l.next;
    }
  }

  if (l1) l.next = l1;
  if (l2) l.next = l2;

  return r;
};
```

1. 타게팅 사본

### 3. Remove Duplicates from Sorted Array

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== nums[j]) {
      nums[++j] = nums[i];
    }
  }

  return nums.length && j + 1;
};
```

1. 고정 인덱스

### 4. Remove Elements

```jsx
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === val) {
      nums.splice(i, 1);

      i -= 1;
    }
  }

  return nums.length;
};

var removeElement = function (nums, val) {
  let i = 0;
  for (let j = 0; j < nums.length; j += 1) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i += 1;
    }
  }

  return i;
};
```

1. splice() 가변 메서드
2. 인덱스 메모
