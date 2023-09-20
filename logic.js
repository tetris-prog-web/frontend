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

const positions = [uPosition,yPosition,lPosition,tPosition,oPosition, iPosition]

let Rotation = 0
let random = Math.floor(Math.random() * positions.length)
let Shape = positions[random][Rotation]
let $grid = Array.from(document.querySelectorAll(".next-piece"))