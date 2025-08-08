const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const won = winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });

  if (won) {
    showCongrats(currentPlayer);
  }

  return won;
}

function showCongrats(winner) {
  const congratsBox = document.getElementById('congrats');
  const winnerName = document.getElementById('winnerName');
  winnerName.textContent = `Player ${winner}`;
  congratsBox.classList.remove('hidden');
  congratsBox.classList.add('show');

  setTimeout(() => {
    congratsBox.classList.remove('show');
    congratsBox.classList.add('hidden');
  }, 3000); // message disappears after 3 seconds
}


function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player X's turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);
