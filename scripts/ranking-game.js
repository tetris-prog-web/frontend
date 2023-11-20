function sortByScore(players) {
    return players.sort((a, b) => b['max_score'] - a['max_score']);
}

function formatUsername(username) {
    const maxLength = 10;
    return username.length > maxLength ? `${username.slice(0, maxLength)}...` : username;
}

function updateRanking(playersData, userData) {
    const rankingLines = document.querySelectorAll(".ranking-line");

    for (let i = 0; i < rankingLines.length && i < playersData.length; i++) {
        const line = rankingLines[i];
        const player = playersData[i];
        line.innerHTML = `
            <p>${formatUsername(player['username'])}</p>
            <p>${player['max_score']}</p>
            <p>${player['max_level']}</p>
        `;
    }

    if (userData) { 
        const yourMaxScoreLine = document.querySelector(".ranking-line-your-max-score");
        yourMaxScoreLine.innerHTML = `
            <p>${userData['username']}</p>
            <p>${userData['max_score']}</p>
            <p>${userData['max_level']}</p>
        `;
        const yourMaxScorePosition = document.getElementById("your-max-score-position");
        yourMaxScorePosition.querySelector("span").innerText = userData['position'];
    }
}

function fetchDataAndUpdateUI() {
    fetch('backend/ranking.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados do backend');
            }
            return response.json();
        })
        .then(data => {
            const playersData = data.data.username_ranking || [];
            const userData = data.data.user_data || null;

            const sortedPlayers = sortByScore(playersData);
            updateRanking(sortedPlayers, userData);
        })
        .catch(error => {
            console.error('Erro ao obter dados do backend:', error);
        });
}

fetchDataAndUpdateUI();

