const playersData = [
  { jogador: "Flamengo_pai_do_extended", pontuacao: 20000 , nivel: 66 },
  { jogador: "rafaelCaleffi", pontuacao: 3000 , nivel: 10 },
  { jogador: "mitsuoMiyazato", pontuacao: 11111 , nivel: 37  },
  { jogador: "brunoCorrea", pontuacao: 2222, nivel: 7 },
  { jogador: "viníciuslutaka", pontuacao: 444 , nivel: 2 },
  { jogador: "guilhermePalermoCoelho", pontuacao: 19999 , nivel: 66 },
  { jogador: "oMen", pontuacao: 122, nivel: 1 },
  { jogador: "yoda", pontuacao: 666 , nivel: 2 },
  { jogador: "nicolasAndreatti", pontuacao: 1 , nivel: 1 },
  { jogador: "penultimo", pontuacao: 2, nivel: 1 },
];
  
  const userBestScore = [
    { userName: "Zezinho", pontuacao: 0, nivel: 0 },
    { userName: "Zezinho", pontuacao: 1000, nivel: 4 },
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
  