/* 
    1. Search Insert Position
    설명:
        정렬된 배열과 타겟 값이 주어집니다. 타겟 값을 찾으면 인덱스를 반환하세요.
        만약 어디에도 없다면, 들어가야하는 자리의 인덱스를 반환하세요. 배열은 중복이 없다고 가정합니다.
    예시:
        Input: [1,3,5,6], 5
        Output: 2

        Input: [1,3,5,6], 2
        Output: 1

        Input: [1,3,5,6], 7
        Output: 4
    풀이:
        1.순회하며 이상인 값을 찾으면, 그전에 위치하므로 인덱스를 반환한다.
        2 순회를 벗어났다면 마지막 인덱스 + 1 을 반환한다.
*/
{
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
}

/* 
    2. Count and Say
    설명: 
        다음 예시를 만족하는 Count and Say 를 구하세요.
    예시:
        Input: 1
        Output: "1"
        Explanation: This is the base case.

        Input: 4
        Output: "1211"
        Explanation: 
            For n = 3 the term was "21" in which we have two groups "2" and "1", "2" can be read as "12" which means frequency = 1 and value = 2, 
            the same way "1" is read as "11", so the answer is the concatenation of "12" and "11" which is "1211".

    풀이:
      문제를 잘 이해하는게 먼저다. 
      인자로 받아오는 숫자에 대해서 바로 count and say 를 반환할 수 없다. 
      1 부터 차례로 해당 숫자까지 끌어올리는 재귀 탑 다운방식을 이용한다.
*/
{
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
}

/* 
  3. Maximum Subarray
  설명: 
    정수 배열이 주어집니다. 최대 합이 되도록 하는 연속적인 서브 배열을 반환하세요. (서브 배열의 길이는 1 이상입니다.)
  
  예시: 
    Input: [-2,1,-3,4,-1,2,1,-5,4],
    Output: 6
    Explanation: [4,-1,2,1] has the largest sum = 6.

  풀이:
    동적계획법을 사용합니다.

    1. 최대값 변수는 가장 작은 수로 시작해 갱신합니다.
    2. 순회하면서, 이전 최대 값은 이전 최대값 + 포함할 정수, 포함할 정수 를 비교해 정합니다.
        즉, 포함할 정수가 양수라면 포함할 것입니다.
    3. 최종 최대값 변수를 이전 최대값과 비교해 갱신합니다.
*/

{
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
}
/* 
  4. Length of Last Word
  설명: 
    대소문자와 공백문자가 포함된 문자열이 주어집니다. 
    왼쪽에서부터 오른쪽으로 탐색하며 마지막 단어의 길이를 반환하세요.
    마지막 단어가 없다면 0 을 반환하세요.

  예시:
    Input: "Hello World"
    Output: 5
 
  풀이: 
    네이티브 메서드를 이용합니다.
    
    1. trim() 으로 좌우 공백을 지웁니다.
    2. split() 으로 사이 공백을 기준으로 배열로 만듭니다.
    3. 마지막 단어의 길이를 반환합니다.
*/
{
  /**
   * @param {string} s
   * @return {number}
   */
  var lengthOfLastWord = function (s) {
    return s.trim().split(" ").pop().length;
  };
}

/* 
  5. Plus One
  설명:
    양수로 이루어진 비어있지 않은 배열이 주어집니다. 1을 더해 리턴하세요.
  예시: 
    Input: [1,2,3]
    Output: [1,2,4]
    Explanation: The array represents the integer 123.

    Input: [4,3,2,1]
    Output: [4,3,2,2]
    Explanation: The array represents the integer 4321.

  풀이:
    자릿수연산에서 carry 를 이용합니다.

    1. carry 는 1 로 설정하고, 일의 자리부터 순회합니다.
    2. 일의 자리부터 carry 를 1 더하고 10 이 되어 carry 가 발생하는지 확인합니다.
    3. 만약 carry 가 최대 자리에서 발생했다면 1 이 most significant 가 됩니다.
*/
{
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
}
