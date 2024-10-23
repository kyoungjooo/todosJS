const todoWrap = document.querySelector(".todoList > ul");
const tabsWrap = document.querySelector(".todoListWrap > header");
const todoEditInput = document.querySelectorAll(".input-wrap");

//로컬스토리지에 있는 todos 렌더링
document.addEventListener("DOMContentLoaded", renderingTodosFromLocalStorage());

//탭을 누를때마다 value와 status가 같은 todo만 보여주기
tabsWrap.addEventListener("click", (e) => handleShowTodos(e));

//todos 리스트를 감싸는 부모에 이벤트 걸어놓기
todoWrap.addEventListener("click", (e) => checkCurrentTarget(e));

//리스트의 index 넣어주기
function checkCurrentTarget(e) {
  const todos = todoWrap.getElementsByClassName("todo");
  for (let i = 0; i < todos.length; i++) todos[i].setAttribute("data-index", i);
  const action = e.target.dataset.action;
  switch (action) {
    case "remove":
      removeCurrnetTodo(e);
      break;
    case "edit":
      editTodo(e);
      break;
    case "checked":
      updateTodoChecked(e);
      break;
  }
}
//로컬스토리지에서 todos 가져오기
function getItemFromLocalStorage() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  return todos;
}
//로컬스토리지에 todos 저장하기
function saveTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
// 삭제 버튼을 누르면 해당 todo를 제거하고 로컬에 반영한다.
const removeCurrnetTodo = (e) => {
  const todos = getItemFromLocalStorage();
  const parentLi = e.target.closest(".todo");
  const removeTarget = Number(parentLi.dataset.index);
  parentLi.remove();
  todos.splice(removeTarget, 1);
  saveTodosToLocalStorage(todos);
};

//로컬 스토리지에 todos 추가하기
function saveTodos(todo) {
  const todos = getItemFromLocalStorage();
  todos.push(todo);
  saveTodosToLocalStorage(todos);
}

//로컬 스토리지에서 todos 불러오기
function renderingTodosFromLocalStorage() {
  const todos = getItemFromLocalStorage();
  !todos
    ? localStorage.setItem("todos", "[]")
    : todos.forEach((todo) => addTodo(todo));
}

//newTodo가 추가되면 기존의 todo 마지막에 새로운 todo를 추가
function addTodo(todo) {
  const card = document.createElement("li");
  card.className = "todo";
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  label.setAttribute("data-action", "checked");
  const textWrap = document.createElement("span");
  textWrap.className = "input-wrap";
  textWrap.append(checkBox);
  textWrap.append(label);
  card.append(textWrap);
  const remove = document.createElement("button");
  const edit = document.createElement("button");

  //편집 기능 추가
  edit.className = "edit-btn";
  edit.setAttribute("type", "button");
  edit.setAttribute("value", false);
  edit.setAttribute("data-action", "edit");
  const todoInput = document.createElement("input");
  todoInput.setAttribute("type", "text");
  textWrap.append(todoInput);
  todoInput.setAttribute("value", todo.text);
  todoInput.disabled = true;
  card.append(edit);
  remove.className = "remove";
  remove.setAttribute("data-action", "remove");
  remove.innerText = "삭제";
  remove.setAttribute("type", "button");
  card.append(remove);
  checkBox.checked = todo.checked;
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("value", todo.value);
  todoWrap.append(card);
}

//todo 수정하기
function editTodo(e) {
  const editBtn = e.target;
  const current = editBtn.parentNode.querySelector("input[type='text']");
  if (editBtn.value === "false") {
    editBtn.value = true;
    current.disabled = false;
    current.focus();
    current.setSelectionRange(current.value.length, current.value.length);
  } else {
    editBtn.value = false;
    current.disabled = true;
  }

  //로컬 내용 변경
  const todos = getItemFromLocalStorage();
  let currentIndex = Number(editBtn.closest("li").dataset.index);
  todos[currentIndex].text = current.value;
  saveTodosToLocalStorage(todos);
}

// checked 상태 변경 후 로컬 스토리지 업데이트
function updateTodoChecked(e) {
  const checked = e.target;
  console.log(checked);
  const currentChecked = e.target.previousElementSibling;
  console.log(currentChecked);
  if (!currentChecked.checked) {
    currentChecked.checked = true;
    currentChecked.value = "Completed";
  } else {
    currentChecked.checked = false;
    currentChecked.value = "notCompleted";
  }
  const todos = getItemFromLocalStorage();
  let current = Number(checked.closest("li").dataset.index);
  todos[current].checked = currentChecked.checked;
  todos[current].checked
    ? (todos[current].value = "Completed")
    : (todos[current].value = "notCompleted");
  saveTodosToLocalStorage(todos);
}

//header 버튼 안에있는 버튼이 클릭되면 일치하는 todo만 보여주기
function handleShowTodos(e) {
  const currentTab = e.target.value;
  console.log(currentTab);
  const checkBoxes = document.querySelectorAll(
    ".input-wrap>input[type='checkbox']"
  );
  console.log(checkBoxes);
  checkBoxes.forEach((el) => {
    console.log(el);
    const li = el.closest("li");
    if (currentTab === "All") {
      li.style.display = "flex";
    } else {
      if (currentTab === el.value) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
    }
  });
}
//input text에 글자 입력하면 todos에 목록을 추가한다.
const submit = document.querySelector("form");
submit.addEventListener("submit", handleFormSubmit);
const textInput = document.querySelector(".inputTodo > input");

// 새로운 todo 입력시
function handleFormSubmit(e) {
  e.preventDefault();
  const text = textInput.value;
  if (text.trim().length === 0) return;
  const newTodo = {
    text,
    value: "notCompleted",
    checked: false,
  };
  saveTodos(newTodo);
  addTodo(newTodo);
  //기존의 todo에 새로운 todo를 뒤에 추가하는 것
  textInput.value = "";
}
