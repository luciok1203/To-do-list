const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function addZero(text) {
  const withZero = text < 10 ? `0${text}` : text;
  /*
  if(text < 10) {
    const wihtZero = `0${text}`
  } else {
    const withZero = text
  }
  */
  return withZero;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

function init() {
  getTime();
  setInterval(getTime, 1);
}

init();