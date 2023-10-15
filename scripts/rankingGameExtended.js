const playersData = [
    { jogador: "Flamengo_pai_do_extended", pontuacao: 10000000000000000, nivel: 13 },
    { jogador: "Segundo Lugar", pontuacao: 900000111110, nivel: 12 },
    { jogador: "Terceiro Lugar", pontuacao: 8000000, nivel: 11 },
    { jogador: "TerceaaaLugar", pontuacao: 8000000, nivel: 11 },
    { jogador: "Segundo Lugar", pontuacao: 900000111110, nivel: 12 },
    { jogador: "Terceiro Lugar", pontuacao: 8000000, nivel: 11 },
    { jogador: "TerceaaaLugar", pontuacao: 8000000, nivel: 11 },
    { jogador: "Segundo Lugar", pontuacao: 900000111110, nivel: 12 },
    { jogador: "Terceiro Lugar", pontuacao: 8000000, nivel: 11 },
    { jogador: "ultimo", pontuacao: 1, nivel: 11 },
    { jogador: "ultimo", pontuacao: 2, nivel: 11 },
  ];
  
  const userBestScore = [
    { userName: "Zezinho", pontuacao: 0, nivel: 5 },
    { userName: "Zezinho", pontuacao: 1000, nivel: 2 },
    { userName: "Zezinho", pontuacao: 100, nivel: 1 },
  ];
  function sortByScore(players) {
    return players.sort((a, b) => b.pontuacao - a.pontuacao);
  }
  function updateRanking() {
    const rankingLines = document.querySelectorAll(".ranking-line");
  
    for (let i = 0; i < rankingLines.length && i < playersData.length; i++) {
      const line = rankingLines[i];
      const player = playersData[i];
      line.innerHTML = `
        <p>${player.jogador}</p>
        <p>${player.pontuacao}</p>
        <p>${player.nivel}</p>
      `;
    }
  }
  function showUserBestScore() {
    const userBestScoreElement = document.querySelector(".ranking-line-your-max-score");
    sortByScore(userBestScore);
  
    if (userBestScoreElement) {
      if (userBestScore.length > 0) {
        const maxUserScore = userBestScore[0];
        userBestScoreElement.innerHTML = `
          <p>${maxUserScore.userName}</p>
          <p>${maxUserScore.pontuacao}</p>
          <p>${maxUserScore.nivel}</p>
        `;
      } else {
        userBestScoreElement.innerHTML = "Nenhuma pontuação registrada para o usuário.";
      }
    }
  }
  
  sortByScore(playersData);
  updateRanking();
  showUserBestScore();
  