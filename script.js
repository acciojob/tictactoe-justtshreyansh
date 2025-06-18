// Select inputs and elements by updated IDs/classes
let name1 = document.querySelector("#player1");
let name2 = document.querySelector("#player2");

let startGame = document.querySelector("#submit");
let form = document.querySelector("#myForm");
let board = document.querySelector(".board");
let output = document.querySelector(".message");

const clickedSquaresX = [];
const clickedSquaresY = [];
let turnX = true;
let gameActive = true;

const winningCombo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Start game button handler
function clickHandlerButton(e) {
  e.preventDefault();
  let firstPlayer = name1.value.trim();
  let secondPlayer = name2.value.trim();

  if (firstPlayer === "" || secondPlayer === "") {
    alert("Please enter correct player names");
    return;
  }

  form.style.display = "none";
  board.style.display = "block";
  output.textContent = `${firstPlayer}, you're up`;
}

startGame.addEventListener("click", clickHandlerButton);

// Game cell click handler
document.querySelectorAll(".gridContainer > div").forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    const firstPlayer = name1.value.trim();
    const secondPlayer = name2.value.trim();

    const cellId = parseInt(cell.id, 10);

    if (turnX) {
      cell.textContent = "X";
      clickedSquaresX.push(cellId);
      if (checkWin(clickedSquaresX)) {
        gameActive = false;
        output.textContent = `${firstPlayer}, congratulations you won!`;
        return;
      }
      output.textContent = `${secondPlayer}, you're up`;
    } else {
      cell.textContent = "O";
      clickedSquaresY.push(cellId);
      if (checkWin(clickedSquaresY)) {
        gameActive = false;
        output.textContent = `${secondPlayer}, congratulations you won!`;
        return;
      }
      output.textContent = `${firstPlayer}, you're up`;
    }

    if (clickedSquaresX.length + clickedSquaresY.length === 9) {
      gameActive = false;
      output.textContent = "It's a draw!";
    }

    turnX = !turnX;
  });
});

// Check for winning combination
function checkWin(playerSquares) {
  return winningCombo.some(combo =>
    combo.every(cell => playerSquares.includes(cell))
  );
}
