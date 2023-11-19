const usernameRankingField = document.querySelector("#username");

document.addEventListener("DOMContentLoaded", async () => {
    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    try {
        const response = await fetch("backend/game-data.php", {
            method: "GET",
        });

        if (response.ok) {
            const responseData = (await response.json()).data;
            responseData.username = responseData.username || "Anônimo";
            usernameRankingField.innerHTML = responseData.username;
            console.log(responseData)
            const matches = responseData.matches;
            if (matches.length > 0) {
                document.getElementById("no-matches-played").style.display = "none";
                document.getElementById("ranking-table-header").style.display = "grid";

                matches.forEach(match => {
                    const matchElement = document.createElement("div");
                    matchElement.classList.add("player-position");
                    matchElement.innerHTML = `
                        <p>${match.score}</p>
                        <p>${match.level}</p>
                        <p>${formatDuration(match.duration)}</p>
                    `;

                    document.getElementById("player-ranking-list").appendChild(matchElement);
                });
            }

            console.log(responseData);
        }
    } catch (error) {
        console.log("Erro na solicitação Fetch: " + error);
    }
});