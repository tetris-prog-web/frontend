const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const errorMessageSpan = document.getElementById("login-error-message");

const changeInputBorders = () => {
    if (usernameInput.classList.contains("normal-input-border")) {
        usernameInput.classList.remove("normal-input-border");
        usernameInput.classList.add("error-input-border");
    }

    if (passwordInput.classList.contains("normal-input-border")) {
        passwordInput.classList.remove("normal-input-border");
        passwordInput.classList.add("error-input-border");
    }
};

const changePage = () => {
    window.location.href = "menu.html";
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const dataForm = new FormData(form);

        const response = await fetch("backend/login.php", {
            method: "POST",
            body: dataForm,
        });

        if (response.ok) {
            console.log(response);
            changePage();
        } else if (response.status === 401) {
            changeInputBorders();
            errorMessageSpan.innerText = "Usuário ou senha incorretos!";
        } else {
            errorMessageSpan.innerText = "Um erro ocorreu ao realizar login, por favor tente novamente!";
        }
    } catch (error) {
        console.log("Erro na solicitação Fetch: " + error);
        // Lide com o erro de forma apropriada
    }
});
