  // modal
  function mostrarModal() {
      const modal = document.getElementById('modal');
      
    }
    function fecharModal() {
      const modal = document.querySelector('#background');
      modal.style.display = 'none';
    
      const botoes = document.querySelectorAll('button');
      botoes.forEach((botao) => {
        botao.disabled = false;
      });
    }
    
    const fecharBotao = document.querySelector('#fechar-modal');
    if (fecharBotao) {
      fecharBotao.addEventListener('click', fecharModal);
    }



  // modal



  document.addEventListener("DOMContentLoaded", function () {
    

   
    const squares = Array.from(document.querySelectorAll(".game-area div"));
    const colors = ["blue", "yellow", "red", "orange", "pink"]
    let currentColor = Math.floor(Math.random() * colors.length);
    const grid = 10;

    const color = ['yellow','orange',
    'red'];

    const transparency = 0.45;

    const transparentColor = [
      `rgba(255, 255, 0, ${transparency})`,
    ]
    const iPosition = [
      [0, grid, grid*2, grid*3],
      [0, 1, 2, 3],
      [0, grid, grid*2, grid*3],
      [0, 1, 2, 3],
  ]

  const oPosition = [
      [0, 1, grid, grid + 1],
      [0, 1, grid, grid + 1],
      [0, 1, grid, grid + 1],
      [0, 1, grid, grid + 1],
  ]

  const tPosition = [
      [1, 2, grid + 1, grid*2 + 1],
      [grid, grid + 1, grid + 2, grid*2 + 2],
      [1, grid + 1, grid*2, grid*2 + 1],
      [grid, grid*2, grid*2 + 1, grid*2 + 2]
  ]

  const lPosition = [
      [0, grid, grid*2, grid*2 + 1],
      [grid, grid + 1, grid + 2, 2],
      [0, 1, grid +1, grid*2 + 1],
      [0, 1, 2, grid],
  ]

  const yPosition = [
      [grid, grid + 1, grid + 2, 1],
      [1,grid + 1, grid*2 + 1, grid],
      [0, 1, 2, grid + 1],
      [0, grid, grid*2, grid + 1],
  ]

  const uPosition = [
      [0, grid, grid + 1, grid + 2, 2],
      [0, 1, grid + 1, grid*2 + 1, grid*2],
      [grid, 0, 1, 2, grid + 2],
      [1, 0, grid, grid*2, grid*2 + 1],
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
        squares[start + index].classList.add("shapePainted", `${colors[currentColor]}`);
      });
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

    function rotate() {
      undraw();
      let newRotation = (Rotation + 1) % positions[random].length;
    
      const newShape = positions[random][newRotation];
    
      const hasCollision = newShape.some(index => squares[start + index].classList.contains("shapePainted"));
    
      if (!hasCollision) {
        Rotation = newRotation;
        current = newShape;
      }
    }
  function control(e) {
    if (e.key === 'ArrowLeft') {
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      moveRight();
    } else if (e.key === 'ArrowDown') {
      moveDown(); // Adicione esta chamada para mover a peça para baixo
    } else if (e.key === 'ArrowUp') {
      rotate();
    }
  }
    
    function randomShape(){
        return Math.floor(Math.random() * positions.length);
      }
      
      const $startStopButton = document.getElementById("start-button");
      let timerId;
      
      $startStopButton.addEventListener("click", () => {
        if (timerId) {
          clearInterval(timerId); // Pausa o jogo se já estiver em execução
          timerId = null;
        } else {
          timerId = setInterval(moveDown, 1000); // Inicia o jogo e movimenta as peças para baixo a cada segundo (ajuste o intervalo conforme necessário)
        }
      });
      
    function moveDown() {
        
      
        undraw()
        start += 10
        draw()
      }
  });
