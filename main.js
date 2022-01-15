import { guess, del, commit } from "./game.js";

window.addEventListener('keypress', e => {
	if (!/^\d$/.test(e.key)) return;
	guess(e.key);
	e.preventDefault();
});

window.addEventListener('keyup', e => {
	switch (e.key) {
		case 'Backspace':
			del();
			break;
		case 'Enter':
			commit();
			break;
		default: console.log(e.key); return;
	}
});

for (let i = 0; i < 10; ++i)
	document.getElementById(i).addEventListener('click', e => guess(i));
document.getElementById('del').addEventListener('click', del);
document.getElementById('commit').addEventListener('click', commit);
