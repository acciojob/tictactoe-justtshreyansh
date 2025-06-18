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
startGame.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the form from submitting
  let firstPlayer = name1.value.trim();
  let secondPlayer = name2.value.trim();

  if (firstPlayer === "" || secondPlayer === "") {
    alert("Please enter correct player names");
    return;
  }

  form.style.display = "none"; // Hide the form
  board.style.display = "block"; // Show the board
  output.textContent = `${firstPlayer}, you're up`; // Display turn message
});

// Game cell click handler
document.querySelectorAll(".gridContainer > div").forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    const cellId = parseInt(cell.id, 10);

    if (turnX) {
      cell.textContent = "X";
      clickedSquaresX.push(cellId);
      if (checkWin(clickedSquaresX)) {
        gameActive = false;
        output.textContent = `${name1.value}, congratulations you won!`;
        return;
      }
      output.textContent = `${name2.value}, you're up`;
    } else {
      cell.textContent = "O";
      clickedSquaresY.push(cellId);
      if (checkWin(clickedSquaresY)) {
        gameActive = false;
        output.textContent = `${name2.value}, congratulations you won!`;
        return;
      }
      output.textContent = `${name1.value}, you're up`;
    }

    if (clickedSquaresX.length + clickedSquaresY.length === 9) {
      gameActive = false;
      output.textContent = "It's a draw!";
    }

    turnX = !turnX; // Switch turns
  });
});

// Check for winning combination
function checkWin(playerSquares) {
  return winningCombo.some(combo =>
    combo.every(cell => playerSquares.includes(cell))
  );
}