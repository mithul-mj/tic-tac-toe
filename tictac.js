const cell = document.querySelectorAll(".cell");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");
const circle = document.querySelector(".greenCircle");
let options = ["", "", "", "", "", "", "", "", ""];
const winLine = document.querySelector(".line");

const winCondition = [
  [0, 1, 2, ["0px", "50px", "rotate(0deg)"]], // Row 1
  [3, 4, 5, ["0px", "150px", "rotate(0deg)"]], // Row 2
  [6, 7, 8, ["0px", "250px", "rotate(0deg)"]], // Row 3

  [0, 3, 6, ["-100px", "150px", "rotate(90deg)"]], // Col 1
  [1, 4, 7, ["0px", "150px", "rotate(90deg)"]], // Col 2
  [2, 5, 8, ["100px", "150px", "rotate(90deg)"]], // Col 3

  [0, 4, 8, ["0px", "150px", "rotate(45deg)"]], // Diagonal \
  [2, 4, 6, ["0px", "150px", "rotate(-45deg)"]], // Diagonal /
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
  if (current_player == "X") {
    current_player = "O";
    circle.style.transform = "translateX(0px)";
  } else {
    current_player = "X";
    circle.style.transform = "translateX(35px)";
  }
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
      winLine.style.display = "block";
      winLine.style.transform = x[3][2];
      winLine.style.left = x[3][0];
      winLine.style.top = x[3][1];
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
  cell.forEach((x) => {
    x.textContent = "";
    x.style.backgroundColor = "white";
  });
  winLine.style.left = "0";
  winLine.style.top = "0";
  winLine.style.transform = "none"; // Reset line position
  winLine.style.display = "none";
  current_player = "X";
  initializeGame();
}
