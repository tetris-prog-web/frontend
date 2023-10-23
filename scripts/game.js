let tableGameContainer = document.getElementsByClassName("game-area-container")[0];

let grid = {
    width: 0,
    height: 0
}

if (window.location.pathname.includes("extended")) {
    grid.width = 22
    grid.height = 44
} else {
    grid.width = 10
    grid.height = 20
}

const generateTable = () => {
    for (let i = 0; i < grid.height; i++) {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        tableGameContainer.appendChild(rowContainer);

        for (let j = 0; j < grid.width; j++) {
            let atualRow = document.getElementsByClassName('row')[i];

            let columnContainer = document.createElement('div');
            columnContainer.classList.add('column');
            atualRow.appendChild(columnContainer);
        }
    }
}

generateTable()

const generateNextPieceTable = () => {
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
}

generateNextPieceTable()

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
let level = 1;
let x = 0;
let y = 0;
let timerId;
let isPlaying = false;

let isMirrored = false;

function draw() {
    if (currentPiece) {
        for (let row = 1; row <= currentPiece.shape.length; row++) {
            for (let col = 1; col <= currentPiece.shape[row - 1].length; col++) {
                if (currentPiece.shape[row - 1][col - 1]) {
                    const cell = document.querySelector(`.row:nth-child(${y + row}) .column:nth-child(${x + col}`);
                    cell.style.backgroundColor = currentPiece.color;
                    cell.classList.add("shapePainted");
                }
            }
        }
    }
}

function undraw() {
    if (currentPiece) {
        for (let row = 1; row <= currentPiece.shape.length; row++) {
            for (let col = 1; col <= currentPiece.shape[row - 1].length; col++) {
                if (currentPiece.shape[row - 1][col - 1]) {
                    const cell = document.querySelector(`.row:nth-child(${y + row}) .column:nth-child(${x + col}`);
                    cell.style.backgroundColor = "";
                    cell.classList.remove("shapePainted");
                }
            }
        }
    }
}

function drawNextPiece() {
    if (nextPiece) {
        for (let row = 1; row <= nextPiece.shape.length; row++) {
            for (let col = 1; col <= nextPiece.shape[row - 1].length; col++) {
                if (nextPiece.shape[row - 1][col - 1]) {
                    const cell = document.querySelector(`.next-piece-row:nth-child(${col}) .next-piece-column:nth-child(${row}`);
                    cell.style.backgroundColor = nextPiece.color;
                    cell.classList.add("shapePainted");
                }
            }
        }
    }
}

function undrawNextPiece() {
    if (nextPiece) {
        for (let row = 1; row <= nextPiece.shape.length; row++) {
            for (let col = 1; col <= nextPiece.shape[row - 1].length; col++) {
                if (nextPiece.shape[row - 1][col - 1]) {
                    const cell = document.querySelector(`.next-piece-row:nth-child(${col}) .next-piece-column:nth-child(${row}`);
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

const nameErrorPopup = document.getElementById("nameErrorPopup");
const resetButton = document.getElementById("resetButton");
const menuButton = document.getElementById("menuButton");

function showGameOverAlert() {
    stopGame();
    nameErrorPopup.style.display = "block";
}

menuButton.addEventListener("click", function () {
    window.location.href = 'menu.html';
});
resetButton.addEventListener("click", function () {
    location.reload();
});

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
        x = Math.floor((grid.width - currentPiece.shape[0].length) / 2);
        y = 0;
        checkRowIsFilled();
    }

    if (checkCollision() && y === 0) {
        y = 0;
        checkRowIsFilled();
        showGameOverAlert();
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
        for (let row = 1; row <= currentPiece.shape.length; row++) {
            for (let col = 1; col <= currentPiece.shape[row - 1].length; col++) {
                if (currentPiece.shape[row - 1][col - 1]) {
                    if (
                        x + col <= 0 ||
                        x + col > grid.width ||
                        y + row > grid.height
                    ) {
                        return true;
                    }
                    const cell = document.querySelector(`.row:nth-child(${y + row}) .column:nth-child(${x + col})`);
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
        for (let row = 1; row <= grid.height; row++) {
            let rowFilledColumns = 0;
            for (let col = 1; col <= grid.width; col++) {
                const cell = document.querySelector(`.row:nth-child(${row}) .column:nth-child(${col})`);
                if (cell && cell.style.backgroundColor !== "") {
                    rowFilledColumns++;
                }
            }
            if (rowFilledColumns === grid.width) {
                eliminatedRows++;
                removeFilledRow(row)
            }
        }
        if (eliminatedRows !== 0) {
            addPoints(eliminatedRows);
            if (totalPoints !== 0 && totalPoints / 300 >= level) {
                level += 1
                document.getElementById("current-game-difficulty").innerHTML = `Nível: ${level}`
                setSpeed()
            }
        }
    }
}

function checkRowToRemoveHasSpecialPiece(row) {
    for (let col = 1; col <= grid.width; col++) {
        const cell = document.querySelector(`.row:nth-child(${row}) .column:nth-child(${col})`);
        if (cell && cell.classList.contains("specialPiece")) {
            return true;
        }
    }
    return false;
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
    if (checkRowToRemoveHasSpecialPiece(row)) {
        isMirrored = !isMirrored
        invertGameArea()
    }

    document.querySelector(`.row:nth-child(${row})`).remove();

    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row');
    tableGameContainer.prepend(rowContainer);
    for (let j = 0; j < grid.width; j++) {
        let atualRow = document.getElementsByClassName('row')[0];
        let columnContainer = document.createElement('div');
        columnContainer.classList.add('column');
        atualRow.appendChild(columnContainer);
    }

    document.getElementById("eliminated-rows").innerHTML = `Linhas eliminadas: ${++totalEliminatedRows}`

}

function invertGameArea() {
    for (let i = 1; i <= grid.height; i++) {
        for (let j = 1; j < grid.width / 2; j++) {
            const cell = document.querySelector(`.row:nth-child(${i}) .column:nth-child(${j})`);
            const cellToInvert = document.querySelector(`.row:nth-child(${i}) .column:nth-child(${grid.width - j + 1})`);

            if (cell && cellToInvert) {
                const aux = cell.style.backgroundColor;
                cell.style.backgroundColor = cellToInvert.style.backgroundColor;
                cellToInvert.style.backgroundColor = aux;

                if (cell.classList.contains("shapePainted") && !cellToInvert.classList.contains("shapePainted")) {
                    cellToInvert.classList.add("shapePainted");
                    cell.classList.remove("shapePainted");
                } else if (cellToInvert.classList.contains("shapePainted") && !cell.classList.contains("shapePainted")) {
                    cellToInvert.classList.remove("shapePainted");
                    cell.classList.add("shapePainted");
                }
            }
        }
    }
}

function setPiece() {
    if (currentPiece) {
        for (let row = 1; row <= currentPiece.shape.length; row++) {
            for (let col = 1; col <= currentPiece.shape[row - 1].length; col++) {
                if (currentPiece.shape[row - 1][col - 1]) {
                    const cell = document.querySelector(`.row:nth-child(${y + row}) .column:nth-child(${x + col}`);
                    cell.style.backgroundColor = currentPiece.color;
                    if (currentPiece.color === specialPiece.color) cell.classList.add("specialPiece");
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
    setSpeed()
}

function setSpeed() {
    moveDown()
    clearInterval(timerId);
    timerId = setInterval(moveDown, 1000 / level);
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
            if (isMirrored) moveRight()
            else moveLeft()
        } else if (event.key === "ArrowRight") {
            if (isMirrored) moveLeft()
            else moveRight()
        } else if (event.key === "ArrowDown") {
            moveDown()
        } else if (event.key === "ArrowUp") {
            rotate()
        }
    }
});

document.querySelector("#open-modal-button").addEventListener("click", () => stopGame());
