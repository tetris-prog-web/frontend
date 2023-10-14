let tableGameContainer = document.getElementsByClassName("game-area-container")[0];

for(let i = 0; i < 20; i++)
{
    let rowContainer = document.createElement('div');

    rowContainer.classList.add('row');

    tableGameContainer.appendChild(rowContainer);

    for(let j = 0; j < 10; j++)
    {

        let atualRow = document.getElementsByClassName('row')[i];

        let columnContainer = document.createElement('div');

        columnContainer.classList.add('column');

        atualRow.appendChild(columnContainer);
    }
}

const gridSize = 10;
const numRows = 20;
const numCols = 10;

class Piece{
    constructor(color, shape)
    {
        this.color = color;
        this.shape = shape;
    }
}

const iPiece = new Piece("rgb(130,106,210)", [[1, 1, 1, 1]]);
const oPiece = new Piece ("rgb(246,109,21)", [[1,1], [1,1]]);
const tPiece = new Piece("rgb(95,203,175)", [[1, 1, 1], [0, 1, 0]]);
const lLeftPiece = new Piece("rgb(176,126,74)", [[1, 1, 1], [1, 0, 0]]);
const lRightPiece = new Piece("rgb(85,250,125)", [[1, 1, 1], [0, 0, 1]]);
const specialPiece = new Piece("rgb(234,194,24)",[[1]]);
const uPiece = new Piece("rgb(59,169,209)", [[1, 0, 1], [1, 1, 1]]);

const pieces = [iPiece, oPiece, tPiece, lLeftPiece, lRightPiece, specialPiece, uPiece];

let currentPiece;
let x = 0;
let y = 0;
let timerId;
let isPlaying = false;

const gameArea = document.querySelector(".game-area-container");

function draw() {
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    const cell = document.querySelector(`.row:nth-child(${y + row + 1}) .column:nth-child(${x + col + 1}`);
                    cell.style.backgroundColor = currentPiece.color;
                    cell.classList.add("shapePainted");
                }
            }
        }
    }
}

function undraw() {
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    const cell = document.querySelector(`.row:nth-child(${y + row + 1}) .column:nth-child(${x + col + 1}`);
                    cell.style.backgroundColor = "";
                    cell.classList.remove("shapePainted");
                }
            }
        }
    }
}

function rotate() {
    undraw();
    const previousPiece = currentPiece;
    currentPiece = new Piece(currentPiece.color, currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map((row) => row[i]).reverse()
    ));
    if (checkCollision()) {
        currentPiece = previousPiece;
    }
    draw();
}

function moveDown() {
    undraw();
    y++;
    if (checkCollision()) {
        y--;
        setPiece();
        draw();
        currentPiece = randomPiece();
        x = Math.floor((numCols - currentPiece.shape[0].length) / 2);
        y = 0;
    }
    draw();
}

function moveLeft() {
    undraw();
    x--;
    if (checkCollision()) {
        x++;
    }
    draw();
}

function moveRight() {
    undraw();
    x++;
    if (checkCollision()) {
        x--;
    }
    draw();
}

function checkCollision() {
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    if (
                        x + col < 0 ||
                        x + col >= numCols ||
                        y + row >= numRows
                    ) {
                        return true;
                    }
                    // Verificar colisão com peças existentes no tabuleiro
                    const cell = document.querySelector(`.row:nth-child(${y + row + 1}) .column:nth-child(${x + col + 1})`);
                    if (cell && cell.style.backgroundColor !== "") {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function setPiece() {
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    const cell = document.querySelector(`.row:nth-child(${y + row + 1}) .column:nth-child(${x + col + 1}`);
                    cell.style.backgroundColor = currentPiece.color;
                }
            }
        }
    }
}

function randomPiece() {
    return pieces[Math.floor(Math.random() * pieces.length)];
}

function startGame() {
    if (!isPlaying) {
        isPlaying = true;
        currentPiece = randomPiece();
        x = Math.floor((numCols - currentPiece.shape[0].length) / 2);
        y = 0;
        draw();
        timerId = setInterval(moveDown, 1000);
    }
}

function stopGame() {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(timerId);
    }
}

let cronometer;
let gameStarted = false;
let seconds = 0;
let minutes = 0;

function cronometerGame() {
    const divGameTime = document.getElementById("current-game-time");

    if (!gameStarted) {
        cronometer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }

            divGameTime.innerText = `Tempo: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }, 1000);
    }
}
document.getElementById("start-button").addEventListener("click", () => {
    cronometerGame();
    startGame();
});

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});

document.addEventListener("keydown", (event) => {
    if (isPlaying) {
        if (event.key === "ArrowLeft") {
            moveLeft();
        } else if (event.key === "ArrowRight") {
            moveRight();
        } else if (event.key === "ArrowDown") {
            moveDown();
        } else if (event.key === "ArrowUp") {
            rotate();
        }
    }
});
