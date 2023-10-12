document.addEventListener("DOMContentLoaded", function () {
    const squares = Array.from(document.querySelectorAll(".game-area div"));
    const colors = ["blue", "yellow", "red", "orange", "pink"]
    let currentColor = Math.floor(Math.random() * colors.length);
    let nextColor = Math.floor(Math.random() * colors.length)
    const grid = 22;
    let gameStarted = false;

    const iPosition = [
        [0, grid, grid * 2, grid * 3],
        [0, 1, 2, 3],
        [0, grid, grid * 2, grid * 3],
        [0, 1, 2, 3],
    ];

    const oPosition = [
        [0, 1, grid, grid + 1],
        [0, 1, grid, grid + 1],
        [0, 1, grid, grid + 1],
        [0, 1, grid, grid + 1],
    ];

    const tPosition = [
        [0, 1, grid, grid * 2],
        [0, grid, grid + 1, grid + 2],
        [1, grid + 1, grid * 2 + 1, grid * 2],
        [0, 1, 2, grid + 2]
    ];

    const lPosition = [
        [0, grid, grid * 2, grid * 2 + 1],
        [grid, grid + 1, grid + 2, 2],
        [0, 1, grid + 1, grid * 2 + 1],
        [0, 1, 2, grid]
    ];

    const yPosition = [
        [1, grid, grid + 1, grid + 2],
        [1, grid + 1, grid * 2 + 1, grid],
        [0, 1, 2, grid + 1],
        [0, grid, grid * 2, grid + 1]
    ];

    const uPosition = [
        [0, grid, grid + 1, grid + 2, 2],
        [0, 1, grid + 1, grid * 2 + 1, grid * 2],
        [grid, 0, 1, 2, grid + 2],
        [1, 0, grid, grid * 2, grid * 2 + 1]
    ];


    const positions = [uPosition, yPosition, lPosition, tPosition, oPosition, iPosition];
    let random = randomShape();
    let start = 10;
    let Rotation = 0;

    let currentRot = 0;
    let current = positions[random][currentRot];

    function draw() {
        current.forEach(index => {
            squares[start + index].classList.add("shapePainted", `${colors[currentColor]}`);
        });
    }

    draw();

    function undraw() {
        current.forEach(index => {
            squares[start + index].classList.remove("shapePainted", `${colors[currentColor]}`);
        });
    }

    const minisquares = document.querySelectorAll(".next-piece div");
    const miniWidth = 4;
    const nextPosition = 2;
    const nextShapeIndices = [
        [1, 2, miniWidth + 1, miniWidth * 2 + 1],
        [miniWidth + 1, miniWidth + 2, miniWidth * 2, miniWidth * 2 + 1],
        [1, miniWidth, miniWidth + 1, miniWidth + 2],
        [0, 1, miniWidth, miniWidth + 1],
        [1, miniWidth + 1, miniWidth * 2 + 1, miniWidth * 3 + 1]
    ];

    function displayNextShape() {
        let nextRandomShape = Math.floor(Math.random() * nextShapeIndices.length)
        const nextShape = nextShapeIndices[nextRandomShape]
        nextShape.forEach(squareIndex =>
            minisquares[squareIndex + nextPosition + miniWidth].classList.add("shapePainted")
        )
    }

    document.getElementById("start-button").addEventListener("click", () => {
        if (!gameStarted) {
            gameStarted = true;
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

    function randomShape() {
        return Math.floor(Math.random() * positions.length);
    }

    const startStopButton = document.getElementById("start-button");
    let timerId;

    startStopButton.addEventListener("click", () => {
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

        const isAtLeftEdge = current.some(index => (start + index) % grid === 0);

        if (!isAtLeftEdge) {
            if (!current.some(index => squares[start + index - 1].classList.contains("shapePainted"))) {
                start -= 1;
            }
        }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (start + index + 1) % grid === 0);

        if (!isAtRightEdge) {
            start += 1;
        }

        if (current.some(index => squares[start + index].classList.contains("shapePainted"))) {
            start -= 1;
        }

        draw();
    }

    function moveDown() {
        stop()

        undraw()
        start += 22
        draw()
    }


    function rotate() {
        undraw();

        const newRotation = (Rotation + 1) % positions[random].length;
        const newShape = positions[random][newRotation];

        const isLeftEdgeLimit = newShape.some(index => (start + index) % grid === -1);
        const isRightEdgeLimit = newShape.some(index => (start + index) % grid === 21);
        const isFilled = newShape.some(index => squares[start + index].classList.contains("busy"));

        if (!isLeftEdgeLimit && !isRightEdgeLimit && !isFilled) {
            Rotation = newRotation;
            current = newShape;
        }

        draw();
    }

    function checkIfRowIsFilled() {
        for (let row = 0; row < grid; row++) {
            const rowIndices = [];

            for (let col = 0; col < grid; col++) {
                rowIndices.push(row * grid + col);
            }

            const isRowPainted = rowIndices.every(squareIndex =>
                squares[squareIndex].classList.contains("shapePainted")
            );

            if (isRowPainted) {
                // Remove classes das células da linha
                rowIndices.forEach(squareIndex => squares[squareIndex].classList.remove("shapePainted"));

                // Remove as células da linha da matriz
                squares.splice(row * grid, grid);

                // Adicione as células de volta na parte superior
                for (let i = 0; i < grid; i++) {
                    squares.unshift(document.createElement("div"));
                    gameArea.appendChild(squares[i]);
                }
            }
        }
    }

    function stop() {

        if (current.some(index => squares[start + index + grid].classList.contains("busy"))) {
            current.forEach(index => {
                squares[start + index].classList.add("busy", "shapePainted", `${colors[currentColor]}`);
            });

            start = 10;
            Rotation = 0;
            random = randomShape();
            current = positions[random][Rotation];
            currentColor = nextColor;

            draw();
            checkIfRowIsFilled();
            displayNextShape();
            gameOver();
        }
    }

    function gameOver() {
        if (current.some(index => squares[start + index + grid].classList.contains("busy"))) {
            clearInterval(timerId);
            startStopButton.disabled = true;
            alert("Game Over! Click 'Restart' to play again.");
            scoreElement.innerHTML = "GAME OVER";
        }
    }
});
