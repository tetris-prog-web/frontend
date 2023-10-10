document.addEventListener("DOMContentLoaded", function () {
    const squares = Array.from(document.querySelectorAll(".game-area div"));
    const colors = ["blue", "yellow", "red", "orange", "pink"]
    let currentColor = Math.floor(Math.random() * colors.length);
    const grid = 10;

    const iPosition = [
        [0, grid, grid * 2, grid * 3],
        [0, 1, 2, 3],
        [0, grid, grid * 2, grid * 3],
        [0, 1, 2, 3],
    ]

    const oPosition = [
        [0, 1, grid, grid + 1],
        [0, 1, grid, grid + 1],
        [0, 1, grid, grid + 1],
        [0, 1, grid, grid + 1],
    ]

    const tPosition = [
        [1, 2, grid + 1, grid * 2 + 1],
        [grid, grid + 1, grid + 2, grid * 2 + 2],
        [1, grid + 1, grid * 2, grid * 2 + 1],
        [grid, grid * 2, grid * 2 + 1, grid * 2 + 2]
    ]

    const lPosition = [
        [0, grid, grid * 2, grid * 2 + 1],
        [grid, grid + 1, grid + 2, 2],
        [0, 1, grid + 1, grid * 2 + 1],
        [0, 1, 2, grid],
    ]

    const yPosition = [
        [grid, grid + 1, grid + 2, 1],
        [1, grid + 1, grid * 2 + 1, grid],
        [0, 1, 2, grid + 1],
        [0, grid, grid * 2, grid + 1],
    ]

    const uPosition = [
        [0, grid, grid + 1, grid + 2, 2],
        [0, 1, grid + 1, grid * 2 + 1, grid * 2],
        [grid, 0, 1, 2, grid + 2],
        [1, 0, grid, grid * 2, grid * 2 + 1],
    ]

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

    document.addEventListener('keydown', (event) => { //TODO quando a linha com a peça especial for eliminada, inverter a ordem das peças
        if (event.key === 'ArrowLeft') {
            moveLeft();
        } else if (event.key === 'ArrowRight') {
            moveRight();
        } else if (event.key === 'ArrowDown') {
            moveDown();
        } else if (event.key === 'ArrowUp') {
            rotate();
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
            timerId = setInterval(moveDown, 1000); // Inicia o jogo e movimenta as peças para baixo a cada segundo (ajuste o intervalo conforme necessário)
        }
    });

    function moveLeft() {
        undraw();

        const isAtLeftEdge = current.some(index => (start - index + 1) % grid === 0);

        if (!isAtLeftEdge) {
            start -= 1;
        }

        if (current.some(index => squares[start + index].classList.contains("shapePainted"))) {
            start += 1;
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
        undraw()
        start += 10
        draw()
    }

    function rotate() {
        undraw();

        let newRotation = (Rotation + 1) % positions[random].length;

        const newShape = positions[random][newRotation];

        const hasCollision = newShape.some(index => squares[start + index].classList.contains("shapePainted"));

        if (!hasCollision) {
            Rotation = newRotation;
            current = newShape;
        }

        draw();
    }
});
