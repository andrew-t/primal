import { primes, isPrime } from "./primes.js";

const target = primes[~~(Math.random() * primes.length)].toString();

let row = 1, col = 1, over = false;

function el(r, c) {
	return document.getElementById(`${r},${c}`);
}

function rel(r) {
	return document.getElementById(`r${r}`);
}

export function guess(n) {
	if (over) return;
	rel(row).classList.remove('invalid');
	el(row, col).innerHTML = n;
	if (col < 5) ++col;
}

function clear(r, c) {
	el(r, c).innerHTML = '';
}

function rowDone() {
	return col == 5 && el(row, col).innerHTML;
}

export function del() {
	if (over) return;
	rel(row).classList.remove('invalid');
	if (rowDone()) clear(row, col);
	else if (col == 1) clear(row, col);
	else clear(row, --col);
}

export function commit() {
	if (over) return;
	if (rowDone()) {
		const used = [false, false, false, false, false];
		const guess = [];
		for (let i = 0; i < 5; ++i)
			guess[i] = el(row, i + 1).innerHTML;
		if (!isPrime(parseInt(guess.join(''), 10))) {
			rel(row).classList.add('invalid');
			return;
		}
		for (let i = 0; i < 5; ++i) {
			if (guess[i] == target[i]) {
				used[i] = true;
				el(row, i + 1).classList.add('green');
				document.getElementById(guess[i]).classList.add('green');
			}
		}
		if (used.every(x => x)) {
			alert(`Well done! The solution was ${target}!`);
			over = true;
			return;
		}
		for (let i = 0; i < 5; ++i) {
			if (used[i]) continue;
			for (let j = 0; j < 5; ++j) {
				if (i == j) continue;
				if (el(row, j + 1).classList.contains('green')) continue;
				if (el(row, j + 1).classList.contains('yellow')) continue;
				if (guess[j] == target[i]) {
					el(row, j + 1).classList.add('yellow');
					document.getElementById(guess[j]).classList.add('yellow');
					used[i] = true;
					break;
				}
			}
		}
		col = 1;
		if (row < 6) {
			rel(++row).classList.add('active');
		}
		else {
			over = true;
			alert(`Bad luck! The solution was ${target}.`);
		}
	}
}
