$(document).ready(function () {
    $("#logout-button").on("click", function () {
        $.ajax({
            type: "POST",
            url: "./backend/logout.php",
            success: function (response) {
                console.log(response);
                changePage();
            },
            error: function (error) {
                console.log("Erro na solicitação Ajax: " + error);
                //TODO implement a message when the logout fails
            }
        });
    });
});

function changePage() {
    window.location.href = "index.html";
}