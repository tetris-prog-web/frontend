const usernameRankingField = document.querySelector("#username");

try {
    const response = await fetch("backend/game-data.php", {
        method: "GET",
    });

    if (response.ok) {
        const user = (await response.json()).user;

        
        console.log(user);
    } else if (response.status === 404) {
        $.ajax({
            type: "POST",
            url: "./backend/logout.php",
            success: function (response) {
                console.log(response);
                window.location.href = "index.html"; //TODO improve this whole thing
            },
            error: function (error) {
                console.log("Erro na solicitação Ajax: " + error);
                //TODO implement a message when the logout fails
            }
        });
    }
} catch (error) {
    console.log("Erro na solicitação Fetch: " + error);
}