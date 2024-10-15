최종적으로 만들 것: todo 리스트 화면을 렌더링하고 체크 상태에 따라 value를 업데이트 해준다.

1. 화면을 만들기 위해 필요한 리스트의 요소 생성

- todos 배열을 순회하며 todos의 text를 담은 카드 요소를 만들어주기
  forEach, li (checkbox, label)

- label에 text와 id 담기
  setAttribute, textContent

- checkbox의 id와 value 담기
  setAttribute

- 카드의 자식으로 checkbox, label 추가해주기
  append

---

2. 기능을 만들기 위해 필요한 것
