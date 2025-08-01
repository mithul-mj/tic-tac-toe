const cell = document.querySelectorAll(".cell");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");
let options = ["", "", "", "", "", "", "", "", ""];
let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let running = false;
let current_player = "X";
restart.addEventListener("click", newGame);
initializeGame();
function initializeGame() {
  cell.forEach((x) => x.addEventListener("click", cellClicked));
  result.textContent = `${current_player}'s turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = parseInt(this.getAttribute("cellno"));
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
}
function updateCell(cell, index) {
  options[index] = current_player;
  cell.textContent = current_player;
  checkWinner();
}
function changePlayer() {
  current_player = current_player == "X" ? "O" : "X";
  result.textContent = `${current_player}'s turn`;
}
function checkWinner() {
  let roundWon = false;
  winCondition.forEach((x) => {
    if (
      options[x[0]] == options[x[1]] &&
      options[x[0]] == options[x[2]] &&
      options[x[0]] != ""
    ) {
      roundWon = true;
      cell[x[0]].style.backgroundColor = "green";
      cell[x[1]].style.backgroundColor = "green";
      cell[x[2]].style.backgroundColor = "green";
    }
  });
  if (roundWon) {
    result.textContent = `${current_player} won`;

    running = false;
    roundWon = false;
  } else if (!options.includes("")) {
    result.textContent = `Draw`;
  } else {
    changePlayer();
  }
}
function newGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  console.log("haii");
  cell.forEach((x) => {
    x.textContent = "";
  });
  cell.forEach((x) => {
    x.style.backgroundColor = "red";
  });
  current_player = "X";
  initializeGame();
}
