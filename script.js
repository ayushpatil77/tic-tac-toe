const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');

let cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showResultScreen(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (boardState.every(cell => cell !== "")) {
    showResultScreen("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return boardState[a] && boardState[a] === boardState[b] && boardState[b] === boardState[c];
  });
}

function showResultScreen(message) {
  resultMessage.textContent = message;
  resultScreen.style.display = 'flex';
}

function startNewGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
  resultScreen.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
