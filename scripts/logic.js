let gridSize = 10;

class Piece {
    constructor(color, shape) {
        this.color = color;
        this.shape = this.formatShape(shape);
    }

    formatShape = (shape) => {
        const newShape = [[], [], [], []];
        for (let line = 0; line < shape.length; line++) {
            for (let column = 0; column < shape[line].length; column++) {
                if (line === 0 && column === 0) {
                    newShape[line].push(shape[line][column])
                } else {
                    newShape[line].push(shape[line][column] * (gridSize * line + column + 1))
                }
            }
        }
        return newShape;
    }
}

const iPiece = new Piece("purple", [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
])

const oPiece = new Piece("orange", [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
])

const tPiece = new Piece("pink", [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
])

const lLeftPiece = new Piece("green", [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
])

const lRightPiece = new Piece("green", [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
])

const specialPiece = new Piece("yellow", [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
])

const uPiece = new Piece("blue", [
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
])

function randomChoosePiece(pieces) {
    console.log(pieces)
    const random = Math.floor(Math.random() * pieces.length);
    return pieces[random];
}

const draw = () => {
    currentPiece.shape.forEach(row => {
        row.forEach(index => {
            if (index > 0) {
                console.log(index)
                squares[index - 1].classList.add("shapePainted")
                squares[index - 1].style.backgroundColor = currentPiece.color
            }
        })
    })
}

function undraw() {
    currentPiece.shape.forEach(row => {
        row.forEach(index => {
            if (index > 0) {
                console.log(index)
                squares[index - 1].classList.remove("shapePainted")
                squares[index - 1].style.removeProperty("backgroundColor")
            }
        })
    });
}

const squares = Array.from(document.querySelectorAll(".game-area div")); //TODO generate the divs dynamically
let gameStarted = false;
const pieces = [iPiece, oPiece, tPiece, lLeftPiece, lRightPiece, specialPiece, uPiece];
let currentPiece = randomChoosePiece(pieces);

document.addEventListener("DOMContentLoaded", function () {
    let random = randomChoosePiece(pieces);
    let start = 10;
    let Rotation = 0;

    draw();

    const minisquares = document.querySelectorAll(".next-piece div");
    const miniWidth = 4;
    let nextPosition = 2;

    const nextShapeIndices = [
        [1, 2, miniWidth + 1, miniWidth * 2 + 1],
        [miniWidth + 1, miniWidth + 2, miniWidth * 2, miniWidth * 2 + 1],
        [1, miniWidth, miniWidth + 1, miniWidth + 2],
        [0, 1, miniWidth, miniWidth + 1],
        [1, miniWidth + 1, miniWidth * 2 + 1, miniWidth * 3 + 1]
    ];

    let nextRandomShape = Math.floor(Math.random() * nextShapeIndices.length)

    function displayNextShape() {
        minisquares.forEach(square => square.classList.remove("shapePainted"))
        nextRandomShape = Math.floor(Math.random() * nextShapeIndices.length)
        const nextShape = nextShapeIndices[nextRandomShape]
        nextShape.forEach(squareIndex =>
            minisquares[squareIndex + nextPosition + miniWidth].classList.add("shapePainted")
        )
    }

    document.getElementById("start-button").addEventListener("click", () => {
        if (!gameStarted) {
            gameStarted = true;
            startGame();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (gameStarted) {
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
    }, false);

    const startStopButton = document.getElementById("start-button");
    let timerId;
    let cronometer;
    let loading = false;
    let seconds = 0;
    let minutes = 0;
    
    startStopButton.addEventListener("click", () => {
        var divGameTime = document.getElementById("current-game-time");

        if(!loading)
        {
            cronometer = setInterval(function(){
                seconds++;
                if(seconds === 60)
                {
                    seconds = 0;
                    minutes++;
                }

                divGameTime.innerText = `Tempo: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            }, 1000);
            loading = true;
        }
        else
        {
            clearInterval(cronometer);
            loading = false;
        }

        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            moveDown();
            timerId = setInterval(moveDown, 1000);
        }
    });

    const $restartButton = document.getElementById("restart-button")
    $restartButton.addEventListener("click", () => {
        window.location.reload()
    })

    function moveLeft() {
        undraw();

        const isAtLeftEdge = currentPiece.some(index => (start + index) % gridSize === 0);

        if (!isAtLeftEdge) {
            if (!currentPiece.some(index => squares[start + index - 1].classList.contains("shapePainted"))) {
                start -= 1;
            }
        }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = currentPiece.some(index => (start + index + 1) % gridSize === 0);

        if (!isAtRightEdge) {
            start += 1;
        }

        if (currentPiece.some(index => squares[start + index].classList.contains("shapePainted"))) {
            start -= 1;
        }

        draw();
    }

    function moveDown() {
        undraw();

        if (currentPiece.some(index => squares[start + index + gridSize].classList.contains("busy"))) {
            stop();
        } else {
            start += gridSize;
            draw();
        }
    }

    function rotate() {
        undraw();

        const newRotation = (Rotation + 1) % pieces[random].length;
        const newShape = pieces[random][newRotation];

        const isLeftEdgeLimit = newShape.some(index => (start + index) % gridSize === -1);
        const isRightEdgeLimit = newShape.some(index => (start + index) % gridSize === 9);
        const isFilled = newShape.some(index => squares[start + index].classList.contains("busy"));

        if (!isLeftEdgeLimit && !isRightEdgeLimit && !isFilled) {
            Rotation = newRotation;
            currentPiece = newShape;
        }

        draw();
    }


    function checkIfRowIsFilled() {
        for (let row = 0; row < gridSize; row++) {
            const rowIndices = [];

            for (let col = 0; col < gridSize; col++) {
                rowIndices.push(row * gridSize + col);
            }

            const isRowPainted = rowIndices.every(squareIndex =>
                squares[squareIndex].classList.contains("shapePainted")
            );

            if (isRowPainted) {
                rowIndices.forEach(squareIndex => squares[squareIndex].classList.remove("shapePainted"));

                squares.splice(row * gridSize, gridSize);

                for (let i = 0; i < gridSize; i++) {
                    squares.unshift(document.createElement("div"));
                    gameArea.appendChild(squares[i]);
                }
            }
        }
    }

    function stop() {

        if (currentPiece.some(index => squares[start + index + gridSize].classList.contains("busy"))) {
            currentPiece.forEach(index => {
                squares[start + index].classList.add("busy", "shapePainted");
            });

            start = 10;
            Rotation = 0;
            random = randomChoosePiece(pieces);
            currentPiece = pieces[random][Rotation];

            draw();
            checkIfRowIsFilled();
            displayNextShape();
            gameOver();
        }
    }

    function gameOver() {
        if (currentPiece.some(index => squares[start + index + gridSize].classList.contains("busy"))) {
            clearInterval(timerId);
            startStopButton.disabled = true;
            alert("Game Over! Click 'Restart' to play again.");
        }
    }
});
