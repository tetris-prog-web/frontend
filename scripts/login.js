$(document).ready(function () {
    $("#login-button").on("click", function () {
        // Coletar dados do formulário
        var username = $("#username-input").val();
        var password = $("#password-input").val();

        // Fazer solicitação Ajax
        $.ajax({
            type: "POST",
            url: "./backend/login.php",
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                console.log(response);
                changePage();
            },
            error: function (error) {
                console.log("Erro na solicitação Ajax: " + error);
                if(error.status == 401){
                    changeInputBorders();
                    $("#login-error-message").text("Usuário ou senha incorretos");
                }
            }
        });
    });
});

function changePage() {
    window.location.href = "menu.html";
}

function changeInputBorders() {
    $("#username-input").toggleClass("normal-input-border error-input-border");
    $("#password-input").toggleClass("normal-input-border error-input-border");
}
