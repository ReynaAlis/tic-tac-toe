let counter = 0;
const cells = document.querySelectorAll('#field td');
const header = document.getElementById('header');
const field = document.getElementById('field');

function isVictory() {
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of combos) {
        if (
            cells[combo[0]].innerHTML === cells[combo[1]].innerHTML &&
            cells[combo[1]].innerHTML === cells[combo[2]].innerHTML &&
            cells[combo[0]].innerHTML !== ''
        ) {
            drawWinningLine(combo);
            return true;
        }
    }
    return false;
}

function drawWinningLine(combo) {
    const lineContainer = document.createElement('div');
    lineContainer.classList.add('line-container');
    field.appendChild(lineContainer);

    const line = document.createElement('div');
    line.classList.add('winning-line');
    lineContainer.appendChild(line);

    const startCell = cells[combo[0]].getBoundingClientRect();
    const endCell = cells[combo[2]].getBoundingClientRect();
    const fieldRect = field.getBoundingClientRect();

    const x1 = startCell.left + startCell.width / 2 - fieldRect.left;
    const y1 = startCell.top + startCell.height / 2 - fieldRect.top;
    const x2 = endCell.left + endCell.width / 2 - fieldRect.left;
    const y2 = endCell.top + endCell.height / 2 - fieldRect.top;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    lineContainer.style.width = `${length}px`;
    lineContainer.style.height = `4px`; 
    lineContainer.style.top = `${(y1 + y2) / 2}px`; 
    lineContainer.style.left = `${(x1 + x2) / 2 - length / 2}px`; 
    lineContainer.style.transform = `rotate(${angle}deg)`;

    line.style.width = `100%`; 
}

const clickSound = new Audio('sounds/click-sound.wav');
const victorySound = new Audio('sounds/victory-sound.wav');

function tap(event) {
    if (event.target.innerHTML !== '') return;

    clickSound.play();

    if (counter % 2 === 0) {
        event.target.innerHTML = '<img src="images/cross.svg" width="100">';
    } else {
        event.target.innerHTML = '<img src="images/zero.svg" width="100">';
    }

    if (isVictory()) {
        victorySound.play();

        cells.forEach(cell => cell.removeEventListener('click', tap));
        header.innerText = counter % 2 === 0 ? 'X is the winner!' : 'O is the winner!';
    } else if (counter === 8) {
        header.innerText = 'Draw!';
    }

    counter++;
    event.target.removeEventListener('click', tap);
}

function startGame() {
    header.innerText = 'Tic-Tac-Toe';
    counter = 0;
    const lines = document.querySelectorAll('.winning-line');
    lines.forEach(line => line.remove());
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.addEventListener('click', tap);
    });
}

startGame();

