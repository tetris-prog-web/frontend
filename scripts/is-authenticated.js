document.addEventListener("DOMContentLoaded", async function () {
    fetch("./backend/account/is_authenticated.php")
        .then((response) => {
            if (response.status === 401) {
                window.location.href = "unauthorized-page.html";
            }
        });
});
