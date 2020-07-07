/* 
    1. Valid Parentheses
    설명:
        '(', ')', '{', '}', '[', ']' 만을 포함하는 문자열이 주어집니다.
        문자열이 다음으로부터 타당한지 확인하세요.
            1. 열린괄호와 닫힌괄호는 같은 유형이어야합니다.
            2. 열린 괄호는 올바른 순서로 닫혀야합니다.

    예시:
        Input: "()"
        Output: true

        Input: "()[]{}"
        Output: true

        Input: "(]"
        Output: false

        Input: "([)]"
        Output: false

        Input: "{[]}"
        Output: true

    풀이:
        1. 대응하는 괄호를 키와 값으로 맵핑한다. (Hash)
        2. Stack 으로 배열을 순회하며 Push 와 Pop 연산을 수행한다.
        3. Pop 연산을 수행하지 못했거나, open 괄호를 완전히 제거하지 못했다면 실패한다.
*/
{
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
}

/* 
    2. Merge Two Sorted Lists
    설명:
        두 정렬된 연결리스트가 주어집니다. 새로운 배열에 정렬되게 병합하세요.
    예시:
        Input: 1->2->4, 1->3->4
        Output: 1->1->2->3->4->4
    풀이: 
        1. 사본을 생성합니다, 결과 리스트 자체로 next 를 수행하면 원본이 손상됩니다.
        2. 하나의 사이클에서 대소, 동등비교를 수행합니다. 
        3. l1 와 l2 에 대한 next 를 수행했기 때문에, 사이클 마지막에 유효성을 검사합니다.
        4. 사이클의 break 조건은 하나의 인자 리스트가 고갈됬기 때문이므로, 남은 리스트에 대해 이어 붙입니다.
*/
{
  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
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
}

/* 
    3. Remove Duplicates from Sorted Array
    설명:
        정렬된 정수 배열이 주어집니다. 
        배열 내부를 움직이며 각 원소가 한번씩 나오도록 중복을 제거하세요. 그리고 새 길이를 반환하세요.
    예시:
        Given nums = [1,1,2],
        Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.
        It doesn't matter what you leave beyond the returned length.

        Given nums = [0,0,1,1,1,2,2,3,3,4],
        Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.
        It doesn't matter what values are set beyond the returned length.
    풀이:
        결과 스택의 top과 다른 원소에 대해서만 Push 함으로 해결할 수 있습니다.

        1. 스택의 인덱스는 top 을 가리키는 용도로 사용됩니다. 
        2. 순회하며, 스택 인덱스와 다른 원소를 찾으면 스택에 담고, 인덱스를 증가시킵니다.
        3. top + 1 은 결과 배열의 길이를 의미합니다.
*/
{
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

  console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 4]));
}

/* 
    4. Remove ELements
    설명: 
        정수 배열과 값이 주어집니다. 값에 해당하는 원소를 네이티브 메서드를 사용하지 않고 제거하세요.
        그리고 (수정된 배열) 길이를 반환하세요.

    예시:
        Given nums = [3,2,2,3], val = 3,
        Your function should return length = 2, with the first two elements of nums being 2.
        It doesn't matter what you leave beyond the returned length.

        Given nums = [0,1,2,2,3,0,4,2], val = 2,
        Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.
        Note that the order of those five elements can be arbitrary.
    
    풀이:

*/
{
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

  var _removeElement = function (nums, val) {
    let i = 0;
    for (let j = 0; j < nums.length; j += 1) {
      if (nums[j] !== val) {
        nums[i] = nums[j];
        i += 1;
      }
    }

    return i;
  };
}

/* 
    5. Implement strStr()
    설명: 
        strStr() 를 구현합니다. 주어지는 문자열에서 문자를 발견하고 첫 인덱스를 반환하세요.
        못찾았다면, -1 입니다.
    예시: 
        Input: haystack = "hello", needle = "ll"
        Output: 2

        Input: haystack = "aaaaa", needle = "bba"
        Output: -1
    풀이:
        
*/
{
  /**
   * @param {string} haystack
   * @param {string} needle
   * @return {number}
   */
  var strStr = function (haystack, needle) {
    let j = -1;

    if (haystack.length && needle) {
      for (let i = 0; i < haystack.length; i += 1) {
        if (haystack[i] === needle[0]) if (haystack.substring(i, i + needle.length) === needle) return i;
      }
    } else if (!needle) return 0;

    return j;
  };
}
