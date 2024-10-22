const todoWrap = document.querySelector(".todoList > ul");
const tabsWrap = document.querySelector(".todoListWrap > header");
let todos = getTodosFromLocal();
const todoEditInput = document.querySelectorAll(".input-wrap");
document.addEventListener("DOMContentLoaded", () => createTodoCard());

//탭을 누를때마다 value와 status가 같은 todo만 보여주기
tabsWrap.addEventListener("click", (e) => handleShowTodos(e));

//todos 리스트를 감싸는 부모에 이벤트 걸어놓기
todoWrap.addEventListener("click", (e) => checkCurrentTarget(e));
//리스트의 index 넣어주기
function checkCurrentTarget(e) {
  const todos = todoWrap.getElementsByClassName("todo");
  for (let i = 0; i < todos.length; i++) {
    todos[i].setAttribute("data-index", i);
  }
  //클릭한 타겟이 remove라면
  console.log("이거!", e.target);
  if (e.target.matches("button.remove")) {
    removeCurrnetTodo(e);
  } else if (e.target.matches("label")) {
    updateTodoChecked(e);
  }
}

// 삭제 버튼을 누르면 해당 todo를 제거해준다.
const removeCurrnetTodo = (e) => {
  console.log("제거!");
  const parentLi = e.target.closest(".todo");
  const removeTarget = Number(parentLi.dataset.index);
  parentLi.remove();
  todos.splice(removeTarget, 1);
  saveTodos();
};

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
function createTodoCard(todo) {
  todoWrap.innerHTML = "";
  todos.forEach((todo) => {
    const card = document.createElement("li");
    card.className = "todo";
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const textWrap = document.createElement("span");
    textWrap.className = "input-wrap";
    textWrap.append(checkBox);
    textWrap.append(label);
    card.append(textWrap);
    const remove = document.createElement("button");
    const edit = document.createElement("button");

    //편집 기능 추가
    edit.className = "edit-btn";
    //edit.addEventListener("click", (e) => editTodo(e));
    //edit.setAttribute("value", todo.id);
    const todoInput = document.createElement("input");
    todoInput.setAttribute("type", "text");
    textWrap.append(todoInput);
    console.log(todoInput);
    todoInput.setAttribute("value", todo.text);
    card.append(edit);
    //remove.addEventListener("click", (e) => removeCurrnetTodo(e));
    //remove.setAttribute("value", todo.id);
    remove.className = "remove";
    remove.innerText = "삭제";
    remove.setAttribute("type", "button");
    card.append(remove);

    //label.textContent = todo.text;
    //label.setAttribute("for", todo.id);
    checkBox.checked = todo.checked;
    checkBox.setAttribute("type", "checkbox");
    //checkBox.setAttribute("id", todo.id);
    checkBox.setAttribute("value", todo.status);
    //새로운 todo가 추가된거면 li의 맨 뒤에 새로운 li를 추가하고
    //아니라면 todoWrap에 카드를 추가
    todoWrap.append(card);
  });
}

//todo 수정하기
function editTodo(e) {
  console.log(e.target);
}
// checked 상태 변경 후 로컬 스토리지 업데이트
function updateTodoChecked(e) {
  const currentChecked = e.target.previousElementSibling;
  todos = getTodosFromLocal();
  if (currentChecked.checked) {
    currentChecked.checked = false;
    currentChecked.value = "notCompleted";
  } else {
    currentChecked.checked = true;
    currentChecked.value = "Completed";
  }
  saveTodos();
}

//header 버튼 안에있는 버튼이 클릭되면 일치하는 todo만 보여주기
function handleShowTodos(e) {
  const currentTab = e.target.value;

  const checkBoxes = document.querySelectorAll(".input-wrap>input");
  checkBoxes.forEach((el) => {
    const flex = (el.parentNode.parentNode.style.display = "flex");
    if (currentTab === "All") {
      flex;
    } else {
      currentTab === el.value
        ? flex
        : (el.parentNode.parentNode.style.display = "none");
    }
  });
}

//input text에 글자 입력하면 todos에 목록을 추가한다.
const submit = document.querySelector("form");
submit.addEventListener("submit", handleFormSubmit);
const textInput = document.querySelector(".inputTodo > input");

//가장 큰 id에서 +1 새로운 아이디 만들기
// function setId(todos) {
//   if (todos.length === 0) return 0;
//   const newId = Math.max(...todos.map((todo) => todo.id));
//   return newId + 1;
// }

// 새로운 todo 입력시
function handleFormSubmit(e) {
  e.preventDefault();
  const text = textInput.value;
  if (text.trim().length === 0) return;
  const newTodo = {
    text,
    status: "notCompleted",
    checked: false,
  };
  todos.push(newTodo);
  saveTodos();
  createTodoCard();
  textInput.value = "";
}
