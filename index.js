const todos = [
  {
    id: 1,
    text: "집 청소하기",
    status: "notCompleted",
  },
  {
    id: 2,
    text: "공부하기",
    status: "notCompleted",
  },
  {
    id: 3,
    text: "운동하기",
    status: "notCompleted",
  },
  {
    id: 4,
    text: "양치하기",
    status: "notCompleted",
  },
];

const todo = document.querySelector(".todoList > ul");

//카드를 감싸주는 li 생성
todos.forEach((el) => {
  const card = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  card.append(checkBox);
  card.append(label);
  label.textContent = el.text;
  label.setAttribute("for", el.id);
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", el.id);
  checkBox.setAttribute("value", el.status);
  todo.append(card);
});

//input의 상태가 변경될때마다 체크되면 value를 complete로 그렇지 않으면 notComplete로 업데이트
