let tableGameContainer = document.getElementsByClassName("game-area-container")[0];

for (let i = 0; i < 20; i++) {
    let rowContainer = document.createElement('div');

    rowContainer.classList.add('row');

    tableGameContainer.appendChild(rowContainer);

    for (let j = 0; j < 10; j++) {

        let atualRow = document.getElementsByClassName('row')[i];

        let columnContainer = document.createElement('div');

        columnContainer.classList.add('column');
        atualRow.appendChild(columnContainer);
    }
}

let nextPieceContainer = document.getElementById("next-piece-container");

for (let i = 0; i < 5; i++) {
    let rowContainer = document.createElement('div');

    rowContainer.classList.add('next-piece-row');

    nextPieceContainer.appendChild(rowContainer);

    for (let j = 0; j < 5; j++) {

        let atualRow = document.getElementsByClassName('next-piece-row')[i];

        let columnContainer = document.createElement('div');

        columnContainer.classList.add('next-piece-column');
        atualRow.appendChild(columnContainer);
    }
}

const gridSize = 10;
const numRows = 20;
const numCols = 10;

class Piece {
    constructor(color, shape) {
        this.color = color;
        this.shape = shape;
    }
}

const iPiece = new Piece("rgb(130,106,210)", [[1, 1, 1, 1]]);
const oPiece = new Piece("rgb(246,109,21)", [[1, 1], [1, 1]]);
const tPiece = new Piece("rgb(95,203,175)", [[1, 1, 1], [0, 1, 0]]);
const lLeftPiece = new Piece("rgb(176,126,74)", [[1, 1, 1], [1, 0, 0]]);
const lRightPiece = new Piece("rgb(85,250,125)", [[1, 1, 1], [0, 0, 1]]);
const specialPiece = new Piece("rgb(234,194,24)", [[1]]);
const uPiece = new Piece("rgb(59,169,209)", [[1, 0, 1], [1, 1, 1]]);

const pieces = [iPiece, oPiece, tPiece, lLeftPiece, lRightPiece, specialPiece, uPiece];

let currentPiece = randomPiece();
let nextPiece = randomPiece();
let totalEliminatedRows = 0;
let totalPoints = 0;
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

function drawNextPiece() {
    if (nextPiece) {
        for (let row = 0; row < nextPiece.shape.length; row++) {
            for (let col = 0; col < nextPiece.shape[row].length; col++) {
                if (nextPiece.shape[row][col]) {
                    const cell = document.querySelector(`.next-piece-row:nth-child(${row + 1}) .next-piece-column:nth-child(${col + 1}`);
                    cell.style.backgroundColor = nextPiece.color;
                    cell.classList.add("shapePainted");
                }
            }
        }
    }
}

function undrawNextPiece() {
    if (nextPiece) {
        for (let row = 0; row < nextPiece.shape.length; row++) {
            for (let col = 0; col < nextPiece.shape[row].length; col++) {
                if (nextPiece.shape[row][col]) {
                    const cell = document.querySelector(`.next-piece-row:nth-child(${row + 1}) .next-piece-column:nth-child(${col + 1}`);
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
        undrawNextPiece();
        currentPiece = nextPiece;
        nextPiece = randomPiece();
        drawNextPiece();
        x = Math.floor((numCols - currentPiece.shape[0].length) / 2);
        y = 0;
        checkRowIsFilled()
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

function checkRowIsFilled() {
    if (currentPiece) {
        let eliminatedRows = 0;
        for (let row = 1; row <= 20; row++) {
            let rowFilledColumns = 0;
            for (let col = 1; col <= 10; col++) {
                const cell = document.querySelector(`.row:nth-child(${row}) .column:nth-child(${col})`);
                if (cell && cell.style.backgroundColor !== "") {
                    rowFilledColumns++;
                }
            }
            if (rowFilledColumns === 10) {
                eliminatedRows++;
                removeFilledRow(row)
            }
        }
        addPoints(eliminatedRows);
    }
}

function addPoints(eliminatedRows) {
    totalPoints += eliminatedRows * eliminatedRows * 10

    let formattedPoints
    if (totalPoints < 10) {
        formattedPoints = `0000${totalPoints}`
    } else if (totalPoints < 100) {
        formattedPoints = `000${totalPoints}`
    } else if (totalPoints < 1000) {
        formattedPoints = `00${totalPoints}`
    } else if (totalPoints < 10000) {
        formattedPoints = `0${totalPoints}`
    }

    document.getElementById("current-score").innerHTML = formattedPoints;
}

function removeFilledRow(row) {
    document.querySelector(`.row:nth-child(${row})`).remove();

    // cria uma nova linha no topo do tabuleiro
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row');
    tableGameContainer.prepend(rowContainer);
    for (let j = 0; j < 10; j++) {
        let atualRow = document.getElementsByClassName('row')[0];
        let columnContainer = document.createElement('div');
        columnContainer.classList.add('column');
        atualRow.appendChild(columnContainer);
    }

    document.getElementById("eliminated-rows").innerHTML = `Linhas eliminadas: ${++totalEliminatedRows}`
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
    isPlaying = true;
    drawNextPiece();
    draw();
    cronometerGame();
    moveDown()
    timerId = setInterval(moveDown, 1000);
}

function stopGame() {
    isPlaying = false;
    clearInterval(timerId);
    clearInterval(cronometer);
}

let cronometer;
let seconds = 0;
let minutes = 0;

function cronometerGame() {
    const divGameTime = document.getElementById("current-game-time");

    cronometer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        divGameTime.innerText = `Tempo: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}

document.getElementById("start-button").addEventListener("click", () => {
    if (!isPlaying) {
        startGame();
    } else {
        stopGame();
    }
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
