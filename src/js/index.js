import { board } from './views/board.js';

const init = (() => {
	board.gameButton.textContent = 'START';
	board.gameButton.addEventListener('click', () => {
		board.gameOver = false;
		board.player = 'blue';
		board.gameButton.style.display = 'none';
		board.gameStatus.textContent = `${board.player}'s Turn!`.toUpperCase();
		board.gameStatus.classList.add(`${board.player}`);
	});
})();

for (let square of board.squares) {
	square.addEventListener('click', () => {
		let row = square.id.charAt(0);
		let col = square.id.charAt(2);
		if (!board.gameOver) {
			// Checks if column is full
			if (eval(`board.col${col}`).position !== -1) {
				if (board.player === 'blue') {
					board.boardArr[eval(`board.col${col}`).position][col] = 'blue';
					eval(`board.col${col}.arr`)[eval(`board.col${col}.position`)] = 'blue';
					eval(`board.col${col}.dom`)[eval(`board.col${col}.position`)].classList.add('blue');
					if (eval(`board.col${col}`).position >= 0) {
						eval(`board.col${col}`).position -= 1;
					}
					checkForWin(board.player, col);
					if (!board.gameOver) {
						changePlayer(col);
					}
				} else {
					board.boardArr[eval(`board.col${col}`).position][col] = 'red';
					eval(`board.col${col}.arr`)[eval(`board.col${col}.position`)] = 'red';
					eval(`board.col${col}.dom`)[eval(`board.col${col}.position`)].classList.add('red');
					if (eval(`board.col${col}`).position >= 0) {
						eval(`board.col${col}`).position -= 1;
					}
					checkForWin(board.player, col);
					if (!board.gameOver) {
						changePlayer(col);
					}
				}
			} else {
				board.gameStatus.textContent = 'Column full, try again.'.toUpperCase();
			}
		}
	});
	square.addEventListener('mouseover', () => {
		let col = square.id.charAt(2);
		columnGlow(col);
	});
	square.addEventListener('mouseout', () => {
		let col = square.id.charAt(2);
		columnGlow(col);
	});
}

const columnGlow = (num) => {
	let cols = eval(`board.col${num}.dom`);
	cols.forEach((col) => col.classList.toggle('col-hover'));
};

const checkForWin = (player, column) => {
	isBoardFull();
	let count = 0;
	// Checks for win vertically
	eval(`board.col${column}.arr`).forEach((el) => {
		if (el === player) {
			count++;
			if (count === 4) {
				board.gameStatus.textContent = `${player} wins!`.toUpperCase();
				board.gameOver = true;
				board.gameButton.style.display = 'inherit';
				board.gameButton.textContent = 'NEW GAME';
				board.gameButton.addEventListener('click', () => {
					location.reload();
				});
				return;
			}
		} else {
			count = 0;
		}
	});
	// Checks for win horizontally
	for (let i = 0; i <= 4; i++) {
		for (let x = 0; x <= 5; x++) {
			if (board.boardArr[i][x] === player) {
				count++;
				if (count === 4) {
					board.gameStatus.textContent = `${player} wins!`.toUpperCase();
					board.gameOver = true;
					board.gameButton.style.display = 'inherit';
					board.gameButton.textContent = 'NEW GAME';
					board.gameButton.addEventListener('click', () => {
						location.reload();
					});
					return;
				}
			} else {
				count = 0;
			}
		}
	}
	// Diagonal win checks
	for (let x = 3; x < 5; x++) {
		for (let y = 0; y < 4 - 3; y++) {
			if (
				board.boardArr[x][y] === player &&
				board.boardArr[x - 1][y + 1] === player &&
				board.boardArr[x - 2][y + 2] === player &&
				board.boardArr[x - 3][y + 3] === player
			) {
				board.gameStatus.textContent = `${player} wins!`.toUpperCase();
				board.gameOver = true;
				board.gameButton.style.display = 'inherit';
				board.gameButton.textContent = 'NEW GAME';
				board.gameButton.addEventListener('click', () => {
					location.reload();
				});
				return;
			}
		}
	}
	for (let x = 3; x < 5; x++) {
		for (let y = 3; y < 4; y++) {
			if (
				board.boardArr[x][y] === player &&
				board.boardArr[x - 1][y - 1] === player &&
				board.boardArr[x - 2][y - 2] === player &&
				board.boardArr[x - 3][y - 3] === player
			) {
				board.gameStatus.textContent = `${player} wins!`.toUpperCase();
				board.gameOver = true;
				board.gameButton.style.display = 'inherit';
				board.gameButton.textContent = 'NEW GAME';
				board.gameButton.addEventListener('click', () => {
					location.reload();
				});
				return;
			}
		}
	}
};

const changePlayer = (col) => {
	if (board.player === 'blue') {
		board.player = 'red';
		board.gameStatus.textContent = `${board.player}'s Turn!`.toUpperCase();
		board.gameStatus.classList.remove('blue');
		board.gameStatus.classList.add(`${board.player}`);
	} else {
		board.player = 'blue';
		board.gameStatus.textContent = `${board.player}'s Turn!`.toUpperCase();
		board.gameStatus.classList.remove('red');
		board.gameStatus.classList.add(`${board.player}`);
	}
};

const isBoardFull = () => {
	let count = 0;
	for (let i = 0; i <= 4; i++) {
		for (let x = 0; x <= 5; x++) {
			if (board.boardArr[i][x]) {
				count++;
				if (count === 30) {
					board.gameStatus.textContent = `GAME OVER. NO WINNER.`.toUpperCase();
					board.gameOver = true;
					board.gameButton.style.display = 'inherit';
					board.gameButton.textContent = 'NEW GAME';
					board.gameButton.addEventListener('click', () => {
						location.reload();
					});
					return;
				}
			}
		}
	}
};
