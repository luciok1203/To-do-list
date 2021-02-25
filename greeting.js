const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  span = document.querySelector(".name"),
  button = document.querySelector(".edit");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentValue = input.value;
  if (currentValue !== "") {
    paintGreeting(currentValue);
    saveName(currentValue);
  }
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let currentValue = input.value;
    if (currentValue !== "") {
      paintGreeting(currentValue);
      saveName(currentValue);
    }
  });
}

function editUser() {
  greeting.classList.remove(SHOWING_CN);
  span.innerText = "";
  input.value = localStorage.getItem(USER_LS);
  askForName();
}

function mouseOn(something) {
  something.classList.add("pointer");
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.classList.add("fadeIn");
  const date = new Date();
  const hours = date.getHours();
  const greetingWord =
    (5 <= hours && hours < 12) ? "Good morning"
      : (12 <= hours && hours < 18) ? "Good afternoon"
        : (18 <= hours && hours < 24) ? "Good evening"
          : "Good night";
  span.innerText = `${greetingWord}, ${text}!`;
  button.classList.add("hidden");
  greeting.addEventListener("mouseenter", function () {
    button.classList.remove("hidden");
    button.classList.add("visible");
  });
  greeting.addEventListener("mouseleave", function () {
    button.classList.add("hidden");
    button.classList.remove("visible");
  });
  button.addEventListener("click", editUser);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();