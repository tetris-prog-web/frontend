function mostrarSenha(idpassword, ideye)
{
    var passwordInput = document.getElementById(idpassword);
    if(passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

    var eyeInput = document.getElementById(ideye);
    if(eyeInput.icon === "bi:eye"){
        eyeInput.icon = "bi:eye-slash"
    } else {
        eyeInput.icon = "bi:eye";
    }
}