const form = document.getElementById("register-form");
const fullName = document.getElementById("full-name-input");
const birthDate = document.getElementById("birth-date-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumber = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(fullName.value === ""){
        alert("Por favor, preencha seu nome");
        return;
    }else{
        localStorage.setItem('NomeCompleto', fullName.value);
    }

    if(emailInput.value === "" || !isEmailValid(emailInput.value)){
        alert("Por favor, preencha seu email corretamente");
        return;
    }else{
        localStorage.setItem('Email', emailInput.value);
    }

    if(!validatePassword(passwordInput.value, 8)){
        alert("A senha precisa ter no mínimo 8 dígitos");
        return;
    }else{
        localStorage.setItem('Senha', passwordInput.value);
    }

    if(birthDate.value === "" || !isDateValid(birthDate.value)){
        alert("Por favor, insira uma data válida");
        return;
    }else{
        localStorage.setItem('DataNascimento', birthDate.value);
    }

    localStorage.setItem('Telefone', phoneNumber.value);
    localStorage.setItem('CPF', cpfInput.value);

    if(!isUsernameUsed(usernameInput.value)){
        alert("Nome de usuário já utilizado");
        return;
    }else{
        localStorage.setItem('NomeUsuario', usernameInput.value);
    }

    form.submit();
})

function isEmailValid(email){
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    if(emailRegex.test(email)) {
        return true;
    }

    return false;
}

function isDateValid(date){
    const dateRegex = new RegExp(
        /^[0-9]+\/[0-9]+\/[0-9]/
    );
    if(dateRegex.test(date)){
        return true;
    }

    return false;
}

function isUsernameUsed(username){
    if(usernameInput.value != localStorage.getItem('NomeUsuario')){
        return false;
    }
    return true;
    
}

function validatePassword(password, minDigits){
    if(password.length >= minDigits){
        return true;
    }
    return false;
}