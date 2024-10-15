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
    text: "산책하기",
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
function createTodoCard() {
  todos.forEach((el) => {
    const card = document.createElement("li");
    card.className = "todo";
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const textWrap = document.createElement("span");
    const remove = document.createElement("button");
    card.append(textWrap);
    textWrap.append(checkBox);
    textWrap.append(label);
    card.append(remove);
    remove.setAttribute("value", el.id);
    remove.className = "remove";
    remove.innerText = "삭제";
    label.textContent = el.text;
    label.setAttribute("for", el.id);
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", el.id);
    checkBox.setAttribute("value", el.status);
    todo.append(card);
  });
}
createTodoCard();

//input의 상태가 변경될때마다 체크되면 value를 complete로 그렇지 않으면 notComplete로 업데이트

const checkBoxes = document.querySelectorAll(".todoList > ul > li > input");

for (const box of checkBoxes) {
  box.addEventListener("change", (e) => {
    const currentBox = e.target;
    currentBox.checked
      ? currentBox.setAttribute("value", "Completed")
      : currentBox.setAttribute("value", "notCompleted");
  });
}

//header 버튼 안에있는 버튼이 클릭되면 일치하는 todo만 보여주기
const tabs = document.querySelectorAll("header>button");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    console.log(e.target.value);
    const currentTab = e.target.value;
    checkBoxes.forEach((el) => {
      const block = (el.parentNode.style.display = "block");
      if (currentTab === "All") {
        block;
      } else {
        currentTab === el.value
          ? block
          : (el.parentNode.style.display = "none");
      }
    });
  });
});

//input text에 글자 입력하면 todos에 목록을 추가한다.
const submit = document.querySelector("form");
submit.addEventListener("submit", handleFormSubmit);
const textInput = document.querySelector(".inputTodo > input");

function handleFormSubmit(e) {
  e.preventDefault();
  const text = textInput.value;
  if (text.trim().length < 1) return;
  const newTodo = { id: todos.length + 1, text, status: "notCompleted" };
  todos.push(newTodo);
  todo.innerHTML = "";
  createTodoCard();
  textInput.value = "";
}
textInput.addEventListener("input", addTextInput);
function addTextInput(e) {
  const newTodo = e.target.value;
}

const removeBtns = document.querySelectorAll(".todo .remove");
console.log(removeBtns);
