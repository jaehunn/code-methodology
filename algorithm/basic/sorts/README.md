## 선택 정렬

원소를 선택하고, 선택한 원소를 제외한 제일 크거나, 작은 원소찾아서 위치를 바꾸는 로직을 모든 원소에 대해 반복한다.

상태에 상관없이 모든 원소를 선택해 정렬하므로 복잡도는 O($N$$^2$) 이다.

```jsx
function selectionSort(items) {
  for (let i = 0; i < items.length; i += 1) {
    // t 는 오름차순, 내림차순 정렬에 따라 최소, 최대 인덱스를 저장하게 된다.
    let t = i;

    for (let j = i + 1; j < items.length; j += 1) {
      // 오름차순 정렬을 가정한다.
      if (items[t] > items[j]) t = j;
    }

    // 무조건 스왑하지 않는다.
    if (t !== i) [items[t], items[i]] = [items[i], items[t]];
  }

  return items;
}
```

## 버블 정렬

인접한 두 원소를 비교하여 제일 작거나 큰 원소를 끝으로 몰아가며 정렬한다.

특정 원소부터 시작해 한번도 스왑이 일어나지 않았음을 플래그로 감지하면, 정렬이 이루어졌음을 알 수 있다.

개선된 코드의 복잡도는 $O(N)$ 까지 나온다.

```jsx
function bubbleSort(items) {
  let f = false;

  for (let i = 1; i < items.length; i += 1) {
    f = false;

    // 오름차순 가정, 큰 원소를 토너먼트 형식으로 걸러내 끝에 위치시켜간다.
    for (let j = 0; j < items.length - i; j += 1) {
      if (items[j] > items[j + 1]) [items[j], items[j + 1]] = [items[j + 1], items[j]];

      f = true;
    }

    // 특정 원소부터 시작해 한번도 스왑이 이루어지지 않았다면 정렬된 배열을 반환한다.
    if (!f) return items;
  }

  return items;
}
```

## 삽입 정렬

특정 원소를 현재까지 정렬된 배열에 들어갈 위치에 삽입해가며 정렬한다.

정렬된 배열에 대해 삽입할 위치를 찾으므로, 상태에 의존한다. 최상의 경우 $O(N)$ 까지 나온다.

```jsx
function insertionSort(items) {
  for (let i = 0; i < items.length; i += 1) {
    let c = i;

    // items[0 ...(c-1)] 배열은 이미 정렬이 되어있다.
    while (items[c - 1] !== undefined && items[c] < items[c - 1]) {
      [items[c - 1], items[c]] = [items[c], items[c - 1]];

      c -= 1;
    }
  }

  return items;
}
```

## 병합 정렬

길이가 1이 될 때까지 배열을 절반으로 나누고, 두 배열을 합치면서 정렬한다. (여기서 두 배열은 정렬된 상태)

복잡도는 합치면서 정렬하는 과정이 결정한다. $logN$ 만큼의 합치고 정렬하는 횟수가 생기고, 합치고 정렬하는 복잡도는 O($N$) 이므로 O($NlogN$) 만큼이 걸린다.

```jsx
function mergeSort(items, s = 0, e = items.length - 1) {
  let r;

  // 길이가 1이 될 때까지
  if (s < e) {
    const m = ((s + e) / 2) << 0;

    // 재귀적으로 배열을 절반씩 나눈다.
    mergeSort(items, s, m);
    mergeSort(items, m + 1, e);

    // 두 배열을 병합한다.
    r = merge(s, m, e);
  }

  return r;

  function merge(s, m, e) {
    // 두 배열의 시작 포인터
    let i = s;
    let j = m + 1;

    let r = [];
    while (r.length < e - s + 1) {
      // 포인터가 배열의 길이를 초과하면 자동적으로 다른 배열이 남은 원소를 차지한다.
      if (i <= m || items[i] < items[j]) r.push(items[i++]);
      else r.push(items[j++]);
    }

    return r;
  }
}
```

## 퀵 정렬

재귀적으로 부분에 대한 기준점을 정하고 배열을 기준점보다 작은 부분, 큰 부분으로 나누는 과정을 반복한다.

기준점을 정하고 나누는 과정이 복잡도를 결정한다. 부분이 절반과 가깝게 나눠지지 않으면 최악의 경우 $O(N^2)$ 가 된다.

```jsx
function quickSort(items, s = 0, e = items.length - 1) {
  // 길이가 1 이면 정렬을 수행하지 않는다.
  if (s >= e) return;

  // 기준점과 시작 포인터
  let p = s;
  let i = s + 1;
  let j = e;

  // 포인터가 교차될 때까지 수행
  while (i <= j) {
    // 내림차순 가정, 기준점보다 크면 왼쪽에 위치시키고, 작다면 오른쪽에 위치시킨다.
    // i 와 j 는 각각 왼쪽 부분배열, 오른쪽 부분배열을 결정한다.
    while (i <= e && items[i] >= items[p]) i += 1;
    while (j > s && items[j] <= items[p]) j -= 1;

    // 포인터가 엇갈렸다면 부분 배열을 결정시키고, 엇갈리지않았다면(정렬시킬 원소를 찾았다면) 두 원소를 바꾼다.
    if (i > j) {
      [items[p], items[j]] = [items[j], items[p]];
    } else {
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  // 부분 배열을 순환 호출한다. (기준점의 최종 위치는 결정된 상태다. 왼쪽 부분배열, 오른쪽 부분배열은 정렬된 상태가 아닐 수 있다.)
  quickSort(items, s, j - 1);
  quickSort(items, j + 1, e);
}
```
