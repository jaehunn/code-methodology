/* 
    1. Two Sum
    설명:
        정수 배열이 주어집니다. 
        특정 Target 정수를 만들기 위한 두 정수의 인덱스를 구하세요.
        입력은 Target 을 만들기 위한 정수 한 쌍만 존재한다고 가정합니다.
        정수는 한 번만 사용됩니다.

    예시:
        Given nums = [2, 7, 11, 15], target = 9,

        Because nums[0] + nums[1] = 2 + 7 = 9,
        return [0, 1].
    
    풀이:
        Hash { value: index } 와 보수를 사용합니다.
    
        1. 배열을 순회하며, Target 의 보수를 구합니다. 
        2. 보수 값을 Hash 에서 캐싱합니다. 
        3. Hash 에 메모합니다. 
*/
{
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
}

/* 
    2. Reverse Integer
    설명: 
        32bit 부호있는 정수가 주어집니다. 정수의 digits 을 반전시키세요.

    예시:
        Input: 123
        Output: 321

        Input: -123
        Output: -321

        Input: 120
        Output: 21
    
    풀이: 
        반복문  또는 네이티브 메서드를 활용할 수 있습니다.

        반복문
        1. 원숫자의 유효검사를 수행합니다. -2^31 <= x <= 2^31 - 1
        2. 결과를 한자리 올리고, 원숫자의 일의 자리를 추출해 적재합니다.
        3. 결과에 대한 유효성 검사 필요합니다.
        4. 원숫자를 한자리 줄입니다. 
        
        네이티브 메서드
        1. 음수에 대해 부호는 따로 보관합니다.
        2. 정수를 배열로 전환시켜 reverse() 연산시킨 후 정수로 변환합니다.
        3. 결과에 대한 유효성 검사를 실시합니다.
*/
{
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
}

/* 
    3. Palindrome Number
    설명:
        정수가 Palindrome 인지 아닌지 판별합니다.
        Palindrome 이란, 정수를 반전시켜도 같은 정수가 되는 것을 말합니다.

    예시:
        Input: 121
        Output: true   

        Input: -121
        Output: false
        Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

        Input: 10
        Output: false
        Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

    풀이: 
        반복문 또는 네이티브 메서드로 풀이가 가능합니다.

        1. 유효성 검사를 실시합니다. 0, 음수, 일의 자리수를 처리합니다. 
        2. 사본을 생성합니다. 사본을 반전시킵니다. 
        3. 원본과 사본을 비교합니다.
*/
{
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
}

/* 
    4. Roman to Integer
    설명:
        7 가지 대표적인 로마 기호는 I V X L C D M 입니다.
        I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000 입니다.
    
    예시: 
        I + I 는 2 로 표현됩니다.
        X + II 는 12 로 표현됩니다.
        XX + V + II 는 27 로 표현됩니다.
        로마 숫자는 큰 수에서 작은 수로 나타내지만, 예외가 있습니다. 
        4 는 IIII 로 나타내지않고 IV 로 나타냅니다.
        I 와 X, C 는 같은 자리 기호 전에 써서 빼는 수로 정의할 수 있습니다.

        Input: "III"
        Output: 3

        Input: "IV"
        Output: 4

        Input: "IX"
        Output: 9

        Input: "LVIII"
        Output: 58
        Explanation: L = 50, V= 5, III = 3.

        Input: "MCMXCIV"
        Output: 1994
        Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
    
    풀이:
        Hash { symbol: value } 를 원소로 하는 배열을 사용합니다.

        1. 문자열에 대해 유효성 검사를 합니다. 
        2. 미리 Hash 배열을 생성합니다.
        3. 문자열을 버블로 탐색합니다. 만약, 버블의 앞이 뒤보다 크다면 뺄샘이 적용됩니다.
*/
{
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
}
/* 
    5. Longest Common Prefix
    설명:
        문자열 배열에서 최대로 가능한 공통 prefix 문자열을 찾으세요.
        공통 prefix 가 없다면, "" 공백을 리턴하세요.

    예시:
        Input: ["flower","flow","flight"]
        Output: "fl"

        Input: ["dog","racecar","car"]
        Output: ""
        Explanation: There is no common prefix among the input strings.

    풀이:
        선택 정렬을 이용합니다.

        1. 유효성 검사를 합니다.
        2. 첫 문자에 대한 첫 알파벳을 타겟으로, 다음 문자의 첫 알파벳이 같은지를 확인합니다.
        3. 모두 통과 시켰다면 적재 합니다. 
*/
{
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
}
