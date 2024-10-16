const todoWrap = document.querySelector(".todoList > ul");
const tabs = document.querySelectorAll("header>button");
let todos = getTodosFromLocal();
console.log(todos);

document.addEventListener("DOMContentLoaded", () => {
  createTodoCard();
});
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => handleShowTodos(e));
});

//로컬 스토리지에 todos 저장
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
//로컬 스토리지에서 todos 불러오기
function getTodosFromLocal() {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

//todo 리스트 생성
function createTodoCard() {
  todoWrap.innerHTML = "";

  todos.forEach((todo) => {
    const card = document.createElement("li");
    card.className = "todo";
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const textWrap = document.createElement("span");
    textWrap.className = "input-wrap";
    const remove = document.createElement("button");
    remove.addEventListener("click", (e) => removeCurrnetTodo(e));
    card.append(textWrap);
    textWrap.append(checkBox);
    textWrap.append(label);
    card.append(remove);
    remove.setAttribute("value", todo.id);
    remove.className = "remove";
    remove.innerText = "삭제";
    remove.setAttribute("type", "button");
    label.textContent = todo.text;
    label.setAttribute("for", todo.id);
    checkBox.checked = todo.checked;
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", todo.id);
    checkBox.setAttribute("value", todo.status);
    checkBox.addEventListener("change", () => {
      // 체크박스 상태 변경 시 상태 업데이트
      updateTodoChecked(checkBox.id, checkBox.checked);
    });
    todoWrap.append(card);
  });
}
// checked 상태 변경 후 로컬 스토리지 업데이트
function updateTodoChecked(id, checked) {
  todos = getTodosFromLocal();
  const current = todos.findIndex((v) => v.id === Number(id));
  console.log(current);
  todos[current].checked = checked;
  todos[current].status = checked ? "Completed" : "notCompleted";
  saveTodos(todos);
  createTodoCard();
}

//header 버튼 안에있는 버튼이 클릭되면 일치하는 todo만 보여주기
function handleShowTodos(e) {
  const currentTab = e.target.value;
  console.log(currentTab);
  const checkBoxes = document.querySelectorAll(".input-wrap>input");
  checkBoxes.forEach((el) => {
    const block = (el.parentNode.parentNode.style.display = "block");
    if (currentTab === "All") {
      block;
    } else {
      currentTab === el.value
        ? block
        : (el.parentNode.parentNode.style.display = "none");
    }
  });
}

//input text에 글자 입력하면 todos에 목록을 추가한다.
const submit = document.querySelector("form");
submit.addEventListener("submit", handleFormSubmit);
const textInput = document.querySelector(".inputTodo > input");

//가장 큰 id에서 +1 새로운 아이디 만들기
function setId(todos) {
  if (todos.length === 0) return 0;
  const newId = Math.max(...todos.map((todo) => todo.id));
  return newId + 1;
}
// 새로운 todo 입력시
function handleFormSubmit(e) {
  e.preventDefault();
  const text = textInput.value;
  console.log(text.length);
  if (text.trim().length === 0) return;
  console.log("길이", todos.length);
  const newTodo = {
    id: setId(todos),
    text,
    status: "notCompleted",
    checked: false,
  };
  todos.push(newTodo);

  saveTodos(todos);
  createTodoCard();
  textInput.value = "";
}
textInput.addEventListener("input", addTextInput);
function addTextInput(e) {
  const newTodo = e.target.value;
}

// 삭제 버튼을 누르면 해당 todo를 제거해준다.

const removeCurrnetTodo = (e) => {
  const removeTarget = Number(e.target.value);
  const idx = todos.findIndex((v) => v.id === removeTarget);
  todos.splice(idx, 1);

  saveTodos(todos);
  createTodoCard();
};
