document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};
let random = Math.floor(Math.random() * 2);
let player = random === 0 ? "x" : "o";
document.querySelector(".vez").innerHTML = player;
let warning = "";
let playing = true;

function itemClick(event) {
  let item = event.target.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    swapPlayer();
    renderInfo();
  }
}

function reset() {
  warning = "";
  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "x" : "o";

  for (let i in square) {
    square[i] = "";
  }
  playing = true;
  renderSquare();
  renderInfo();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function swapPlayer() {
  player = player === "x" ? "o" : "x";
}

function checkGame() {
  if (checkWinnerFor("x")) {
    warning = 'O "x" venceu';
    playing = false;
  } else if (checkWinnerFor("o")) {
    warning = 'O "o" venceu';
    playing = false;
  } else if (isFull()) {
    warning = "Deu empate";
    playing = false;
  }
}

function renderSquare() {
  for (let i in square) {
    document.querySelector(`div[data-item=${i}]`).innerHTML = square[i];
    console.log(i);
  }
  checkGame();
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(",");
    let hasWon = pArray.every((option) => square[option] === player);

    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === "") {
      return false;
    }
  }
  return true;
}
