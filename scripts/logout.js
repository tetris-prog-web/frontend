document.addEventListener("DOMContentLoaded", async function () {
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", async () => {
        fetch("./backend/account/logout.php")
            .then((response) => {
                if (response.ok) {
                    window.location.href = "index.html";
                }
            });
    });
});
