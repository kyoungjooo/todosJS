- input text에 할 일을 입력하면 todo목록에 추가해준다.

만들려는 것: todo 리스트 화면을 렌더링하고 체크 상태에 따라 value를 업데이트 해준다.

1. 화면을 만들기 위해 필요한 리스트의 요소 생성

- todos 배열을 순회하며 todos의 text를 담은 카드 요소를 만들어주기
  forEach, li (checkbox, label)

- label에 text와 id 담기
  setAttribute, textContent

- checkbox의 id와 value 담기
  setAttribute

- 카드의 자식으로 checkbox, label 추가해주기
  append

2. 기능을 만들기 위해 필요한 것

- checked상태가 변경된 checkBox를 찾는다.

- checked 상태면 value를 completed 아니라면 notCompleted로 변경해준다.

---

만들려는 것:
사용자가 버튼을 누르면 클릭한 버튼의 value 와 일치하는 todo만 보여주기

1. 눌러야 하는 버튼들을 만들어준다.

2. all을 누르면 todo 모두를 보여준다.

3. all이 아닌 다른 버튼을 누르면 버튼의 value와 상태가 다른 check를 안보이게 해준다.

---

만들려는 것: 인풋 text에 할일을 입력하면 기존 리스트의 마지막에 추가해서 화면에 렌더링

1. form이 전송되는 이벤트 막기

2. 사용자가 text input에 입력한 텍스트를 todos의 마지막에 넣어준다.
   todos의 todo는 {id,text,status} 로 이루어진 오브젝트이기 때문에
   id는 기존 todos.length-1,입력한 텍스트, status초기값이 담긴 오브젝트를 생성한 후 추가해준다.

3. todo에 기존 요소들을 삭제한 후 다시 그려준다.

4. text 입력 input의 기존 텍스트를 지워준다.

---

만들려는 것: todo 삭제 버튼을 누르면 해당 todo를 삭제한다.

1. 각 todo를 감싸주는 li를 만드는 곳에서 todo 삭제 버튼을 추가로 생성한다.

2. 삭제 버튼을 누르면 클릭한 삭제 버튼 value와 id가 일치하는 todo를 배열에서 찾아서 제거해준다.

**삭제할 때 기존 checked 유지 해야함**
