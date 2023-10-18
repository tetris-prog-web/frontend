const playersData = [
    {username: "flamengo-pai-do-classic", score: 20000, level: 66},
    {username: "rafao-da-bala", score: 3000, level: 10},
    {username: "miyazatsuo", score: 11111, level: 37},
    {username: "brunorcorrea", score: 2222, level: 7},
    {username: "vini-mengao", score: 444, level: 2},
    {username: "guilhermePalermoCoelho", score: 19999, level: 66},
    {username: "oMen", score: 122, level: 1},
    {username: "arrascaMengo", score: 777, level: 2},
    {username: "nicolasAndreatti", score: 110, level: 1},
    {username: "Zezinho", score: 1000, level: 4},
];

const userBestScore = [
    {username: "Zezinho", score: 0, level: 0},
    {username: "Zezinho", score: 1000, level: 4},
    {username: "Zezinho", score: 100, level: 1},
];

function sortByScore(players) {
    return players.sort((a, b) => b.score - a.score);
}

function updateRanking() {
    const rankingLines = document.querySelectorAll(".ranking-line");

    for (let i = 0; i < rankingLines.length && i < playersData.length; i++) {
        const line = rankingLines[i];
        const player = playersData[i];
        line.innerHTML = `
      <p>${player.username}</p>
      <p>${player.score}</p>
      <p>${player.level}</p>
    `;
    }
}

function showUserBestScore() {
    const userBestScoreElement = document.querySelector(".ranking-line-your-max-score");

    if (userBestScoreElement) {
        if (userBestScore.length > 0) {
            sortByScore(userBestScore);
            const maxUserScore = userBestScore[0];

            for (let i = 1; i <= playersData.length; i++) {
                if (playersData[i - 1].score <= maxUserScore.score) {
                    document.getElementById("your-max-score-position").innerHTML = `<span>${i}</span>`
                    break
                }
            }

            userBestScoreElement.innerHTML = `
        <p>${maxUserScore.username}</p>
        <p>${maxUserScore.score}</p>
        <p>${maxUserScore.level}</p>
      `;
        } else {
            userBestScoreElement.innerHTML = "Nenhuma pontuação registrada para o usuário.";
        }
    }
}

sortByScore(playersData);
updateRanking();
showUserBestScore();
