export const board = {
	gameOver: true,
	player: '',
	gameButton: document.querySelector('.game-btn'),
	gameStatus: document.querySelector('.game-status'),
	boardArr: [ [], [], [], [], [] ],
	squares: document.querySelectorAll('td'),
	col0: {
		dom: document.querySelectorAll('.col-0'),
		position: 4,
		arr: []
	},
	col1: {
		dom: document.querySelectorAll('.col-1'),
		position: 4,
		arr: []
	},
	col2: {
		dom: document.querySelectorAll('.col-2'),
		position: 4,
		arr: []
	},
	col3: {
		dom: document.querySelectorAll('.col-3'),
		position: 4,
		arr: []
	},
	col4: {
		dom: document.querySelectorAll('.col-4'),
		position: 4,
		arr: []
	},
	col5: {
		dom: document.querySelectorAll('.col-5'),
		position: 4,
		arr: []
	}
};
