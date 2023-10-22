const form = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name-input");
const birthdateInput = document.getElementById("birthdate-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumber = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

//This file is a base to the register page, when the database is implemented, this file will be changed

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (fullNameInput.value === "") {
        alert("Por favor, preencha seu nome");
        return;
    } else {
        localStorage.setItem('NomeCompleto', fullNameInput.value);
    }

    if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
        alert("Por favor, preencha seu email corretamente");
        return;
    } else {
        localStorage.setItem('Email', emailInput.value);
    }

    if (!isPasswordValid(passwordInput.value, 8)) {
        alert("A senha precisa ter no mínimo 8 dígitos");
        return;
    } else {
        localStorage.setItem('Senha', passwordInput.value);
    }

    if (birthdateInput.value === "" || !isDateValid(birthdateInput.value)) {
        alert("Por favor, insira uma data válida");
        return;
    } else {
        localStorage.setItem('DataNascimento', birthdateInput.value);
    }

    localStorage.setItem('Telefone', phoneNumber.value);
    localStorage.setItem('CPF', cpfInput.value);

    if (!isUsernameUsed(usernameInput.value)) {
        alert("Nome de usuário já utilizado");
        return;
    } else {
        localStorage.setItem('NomeUsuario', usernameInput.value);
    }

    form.submit();
})

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}

function isDateValid(date) {
    const dateRegex = new RegExp(
        /^[0-9]+\/[0-9]+\/[0-9]/
    );

    return dateRegex.test(date);
}

function isUsernameUsed(username) {
    return username === localStorage.getItem('NomeUsuario');
}

function isPasswordValid(password, minDigits) {
    return password.length >= minDigits;
}