$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "./backend/is-authenticated.php",
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log("Erro na solicitação Ajax: " + error);
            changePage();
        }
    });
});

function changePage() {
    window.location.href = "unauthorized-page.html";
}