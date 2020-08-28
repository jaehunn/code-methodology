## 선택 정렬

원소를 선택하고, 선택한 원소를 제외한 제일 크거나, 작은 원소찾아 위치를 바꾸는 로직을 모든 원소에 대해 반복한다.

상태에 상관없이 모든 원소를 선택해 정렬하므로 복잡도는 O(N$^2$) 이다.

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

개선된 코드의 복잡도는 O(N) 까지 나온다.

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

정렬된 배열에 대해 삽입할 위치를 찾으므로, 상태에 의존한다. 최상의 경우 O(N) 까지 나온다.

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

...

## 퀵 정렬

...
