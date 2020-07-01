// 1. delete duplicates
{
  // 연결리스트 제거 로직 문제 중 버블된 중복 원소 제거 문제
  function deleteDuplicates(head) {
    if (!head) return null; // 유효성 검사

    let c = head; // 타겟 노드 설정, head 를 조작하면 원본이 오염된다.
    if (c.next) {
      while (c.value === c.next.value) {
        c.next = c.next.next; // 이미 나온 다음 원소와 연결을 끊고, 다음 다음 원소와 연결한다.
        c = c.next; // 타겟 노드를 하나 이동시킨다.
      }
    }

    return head; // 원본을 반환한다.
  }
}

// 2. merge sorted array
{
  function merge(nums1, m, nums2, n) {
    let l = m + n;

    // 타겟 인덱스 설정
    m--;
    n--;

    // Merge 로직의 두 배열은 이미 정렬되어 있어야한다. 그래야 토너먼트 식(큰 것과 큰 것, 작은 것과 작은 것) 비교가 가능해진다.
    // 타겟 인덱스 한쪽이 무너진 조건을 추가하면 따로 남은 인덱스에 대한 처리를 외부에서 할 필요가 없다.
    while (l--) {
      if (n < 0 || nums1[m] > nums2[n]) {
        nums1[l] = nums1[m--];
      } else {
        nums1[l] = nums2[n--];
      }
    }

    return nums1;
  }
}
