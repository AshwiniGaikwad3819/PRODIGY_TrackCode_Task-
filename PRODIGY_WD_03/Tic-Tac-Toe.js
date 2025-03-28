document.addEventListener("DOMContentLoaded", createBoard);

const board = document.getElementById("board");
let cells = [];
let currentPlayer = "X";
let gameState = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (!gameState[index]) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    document.getElementById("status").textContent = "Player X's turn";
}
