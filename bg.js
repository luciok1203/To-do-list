const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `Images/${imgNumber}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  image.addEventListener("load", function () {
    body.classList.add("fadeIn");
    body.classList.add("visible");
    body.classList.remove("hidden");
  });
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();