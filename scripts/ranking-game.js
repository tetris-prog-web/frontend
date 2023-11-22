function sortByScore(players) {
    return players.sort((a, b) => b['max_score'] - a['max_score']);
}

function formatUsername(username) {
    const maxLength = 12;
    return username.length > maxLength ? `${username.slice(0, maxLength)}...` : username;
}

function formatRankingPositions(rankingPosition) {
    if (rankingPosition == 1) {
        return `<iconify-icon icon="twemoji:trophy"></iconify-icon>`;
    } else if (rankingPosition == 2) {
        return `<iconify-icon icon="twemoji:2nd-place-medal"></iconify-icon>`;
    } else if (rankingPosition == 3) {
        return `<iconify-icon icon="twemoji:3rd-place-medal"></iconify-icon>`;
    } else {
        return rankingPosition;
    }
}

function updateRanking(playersData, userData) {

    if (playersData.length > 0) {
        document.getElementById("no-matches-played").style.display = "none";
        document.getElementById("ranking-lines-box").style.display = "flex";

        const rankingLinesBox = document.getElementById("ranking-lines-box");
        const rankingLines = playersData.map((player, index) => {
            const line2 = document.createElement("div");

            const positionIndicator = document.createElement("div");
            positionIndicator.classList.add("position-indicator");
            positionIndicator.innerHTML = formatRankingPositions(index + 1);
            line2.appendChild(positionIndicator);

            const line = document.createElement("div");
            line.classList.add("ranking-line");
            line.innerHTML = `
                <p>${formatUsername(player['username'])}</p>
                <p>${player['max_score']}</p>
                <p>${player['max_level']}</p>
            `;
            line2.appendChild(line);
            return line2;
        });

        rankingLines.forEach(line => rankingLinesBox.appendChild(line));

        if (userData) {
            const yourMaxScoreBox = document.createElement("div");
            const yourMaxScorePosition = document.createElement("div");
            yourMaxScorePosition.id = "your-max-score-position";
            yourMaxScorePosition.classList.add("position-indicator");
            yourMaxScorePosition.innerHTML = formatRankingPositions(userData['position']);
            const yourMaxScoreLine = document.createElement("div");
            yourMaxScoreLine.classList.add("ranking-line-your-max-score");

            yourMaxScoreLine.innerHTML = `
            <p>${userData['username']}</p>
            <p>${userData['max_score']}</p>
            <p>${userData['max_level']}</p>
            `;
            yourMaxScoreBox.appendChild(yourMaxScorePosition);
            yourMaxScoreBox.appendChild(yourMaxScoreLine);
            rankingLinesBox.appendChild(yourMaxScoreBox);
        }
    }
}

function fetchDataAndUpdateUI() {
    const isExtendedGame = window.location.pathname.includes("extended");
    const baseUrl = "./backend/matches/ranking.php";
    const parameters = {
        type: isExtendedGame ? 'EXTENDED' : 'NORMAL',
    };
    const queryString = Object.keys(parameters)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]))
        .join('&');

    const urlWithParameters = baseUrl + '?' + queryString;
    fetch(urlWithParameters, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                response.text().then(text => console.error(text));
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

