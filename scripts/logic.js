document.addEventListener("DOMContentLoaded", function () {
    const squares = Array.from(document.querySelectorAll(".game-area div"));
    const colors = ["blue", "yellow", "red", "orange", "pink"]
    let currentColor = Math.floor(Math.random() * colors.length);
    const grid = 10;

    const iPosition = [
        [-10, grid - 10, grid * 2 - 10, grid * 3 - 10],
        [-10, -9, -8, -7],
        [-10, grid - 10,grid * 2 - 10, grid * 3 - 10],
        [-10, -9, -8, -7],
    ]

    const oPosition = [ 
        [-10, -9, grid - 10, grid - 9],
        [-10, -9, grid - 10, grid - 9],
        [-10, -9, grid - 10, grid - 9],
        [-10, -9, grid - 10, grid - 9],
    ]

    const tPosition = [
        [-10, -9, grid -10, grid * 2 - 10],
        [-10, grid - 10, grid - 9, grid - 8],
        [-9, grid - 9, grid * 2 - 9, grid * 2 - 10],
        [-10, -9, -8, grid - 8  ]
    ]

    const lPosition = [
        [-10, grid - 10, grid * 2 - 10, grid * 2 - 9],
        [grid - 10, grid - 9, grid - 8, -8],
        [-10, -9, grid - 9, grid * 2 - 9],
        [-10, -9, -8, grid - 10],
    ]

    const yPosition = [
        [-9, grid - 10, grid - 9, grid - 8],
        [-9, grid - 9, grid * 2 - 9, grid - 10],
        [-10, -9, -8, grid - 9],
        [-10, grid - 10, grid * 2 - 10, grid - 9],
    ]

    const uPosition = [
        [-10, grid - 10, grid - 9, grid - 8, -8],
        [-10, -9, grid - 9, grid * 2 - 9, grid * 2 - 10],
        [grid - 10, -10, -9, -8, grid - 8],
        [-9, -10, grid - 10, grid * 2 - 10, grid * 2 - 9],
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
        minisquares.forEach(square => square.classList.remove("shapePainted", `${colors[nextColor]}`))
        nextRandomShape = Math.floor(Math.random() * nextShapeIndices.length)
        nextColor = Math.floor(Math.random() * colors.length)
        const nextShape = nextShapeIndices[nextRandomShape]
        nextShape.forEach(squareIndex => 
        minisquares[squareIndex + nextPosition + miniWidth].classList.add("shapePainted", `${colors[nextColor]}`)  
        )
    }
    
    document.addEventListener('keydown', (event) => { 
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
        undraw();
        
        if (current.some(index => squares[start + index + grid].classList.contains("busy"))) {
            stop();
        } else {
            start += grid;
            draw();
        }
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
                rowIndices.forEach(squareIndex => squares[squareIndex].classList.remove("shapePainted"));

                squares.splice(row * grid, grid);
    
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
        }
    }
    
    
});
