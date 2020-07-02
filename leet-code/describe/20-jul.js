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

// 3. same tree
{
  // 두 노드를 비교하는 것을 하나의 재귀 조각으로 나타낸다.
  // 있다면 파고 내려가는 로직이기 때문에, 노드가 일치하는 기저사례는 따로 지정하지 않는다.
  function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
}

// 4. symmetric tree
{
  // 항상 재귀를 본 함수로 만들려는 생각을 탈피해야한다.
  // 본 함수는 내부 재귀 함수의 첫 호출부로 사용해도된다.
  function isSymmetric(root) {
    if (!root) return true;

    // 트리 중앙에 거울을 놓은 것 처럼, 대칭되도록 비교해야한다.
    function isMirror(s, t) {
      if (!s && !t) return true;
      if (!s || !t || s.val !== t.val) return false;

      return isMirror(s.left, t.right) && isMirror(s.right, t.left);
    }

    // same tree 의 본 함수 관점으로 본다면, root 노드의 왼쪽 자식의 서브 트리와 오른쪽 자식의 서브 트리를 비교함과 같다.
    return isMirror(root.left, root.right);
  }
}
