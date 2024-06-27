let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

// Create the Tic Tac Toe board dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            messageElement.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    messageElement.textContent = `Player ${currentPlayer}'s turn`;

    // Reset the board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}