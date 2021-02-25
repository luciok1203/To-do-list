const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  li.classList.add("fadeOut");
  li.addEventListener("animationend", function () {

    toDoList.removeChild(li)
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    for (let i = 0; i < toDos.length; i++) {
      toDoList.children[i].id = i;
      toDos[i].id = i;
    }
    saveToDos();
  })
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  updateToDo();
  const li = document.createElement("li");
  const span = document.createElement("span");
  const chkBtn = document.createElement("button");
  const newId = toDos.length;
  chkBtn.innerText = "✅";
  span.innerText = text;
  chkBtn.classList.add("hidden");
  chkBtn.addEventListener("click", deleteTodo);
  li.classList.add("fadeIn");
  li.appendChild(chkBtn);
  li.appendChild(span);
  li.addEventListener("mouseenter", function () {
    chkBtn.classList.remove("hidden");
    chkBtn.classList.add("visible");
  });
  li.addEventListener("mouseleave", function () {
    chkBtn.classList.add("hidden");
    chkBtn.classList.remove("visible");
  });
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue !== "") {
    paintToDo(currentValue);
  }
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function updateToDo() {
  const date = new Date();
  const newDate = date.getDate();
  const newMonth = date.getMonth() + 1;
  const newYear = date.getFullYear();
  const newTime = `${newDate} ${newMonth} ${newYear}`;
  const oldTime = localStorage.getItem("oldTIme");
  if (oldTime !== null && oldTime !== newTime) {
    localStorage.removeItem(USER_LS);
    toDoList.remove();
    toDos.length = 0;
  }
  localStorage.setItem("oldTIme", newTime);
}

function init() {
  updateToDo();
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();