import { primes, isPrime } from "./primes.js";

const target = primes[~~(Math.random() * primes.length)].toString();

const grid = document.getElementById('grid');
grid.focus();

let row = 1, col = 1;

function el(r, c) {
	return document.getElementById(`${r},${c}`);
}

grid.addEventListener('keypress', e => {
	if (!/^\d$/.test(e.key)) return;
	el(row, col).innerHTML = e.key;
	if (col < 5) ++col;
	e.preventDefault();
});

function clear(r, c) {
	el(r, c).innerHTML = '';
}

function rowDone() {
	return col == 5 && el(row, col).innerHTML;
}

grid.addEventListener('keyup', e => {
	switch (e.key) {
		case 'Backspace':
			if (rowDone()) clear(row, col);
			else if (col == 1) clear(row, col);
			else clear(row, --col);
			break;
		case 'Enter':
			if (rowDone()) {
				col = 1;
				const used = [false, false, false, false, false];
				const guess = [];
				for (let i = 0; i < 5; ++i) {
					guess[i] = el(row, i + 1).innerHTML;
					if (guess[i] == target[i]) {
						used[i] = true;
						el(row, i + 1).classList.add('green');
					}
				}
				for (let i = 0; i < 5; ++i) {
					if (used[i]) continue;
					for (let j = 0; j < 5; ++j) {
						if (i == j) continue;
						if (el(row, j + 1).classList.contains('green')) continue;
						if (el(row, j + 1).classList.contains('yellow')) continue;
						if (guess[j] == target[i]) {
							el(row, j + 1).classList.add('yellow');
							used[i] = true;
							break;
						}
					}
				}
				if (row < 6) ++row;
			}
			break;
		default: console.log(e.key); return;
	}
})
