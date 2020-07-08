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

*/
{
  /**
   * @param {number} n
   * @return {string}
   */
  var countAndSay = function (n) {
    if (n < 2) return "" + n;

    let r = "11";
    for (let i = 2; i < n; i += 1) {
      let v = r[0];
      let c = 0;
      let nR = "";

      for (let j = 0; j <= r.length; j += 1) {
        if (r[j] === v) c += 1;
        else {
          nR += c + v;
          v = r[j];
          c += 1;
        }
      }

      r = nR;
    }

    return r;
  };
}
