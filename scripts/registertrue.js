const form = document.getElementById("register-form");
const fullName = document.getElementById("full-name-input");
const birthDate = document.getElementById("birth-date-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumber = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? [];
const setLocalStorage = (dbUser) => localStorage.setItem("db_user", JSON.stringify(dbUser));

const createUser = (user) => {
    const dbUser = getLocalStorage();
    dbUser.push(user);
    setLocalStorage(dbUser);
};

const readUser = () => getLocalStorage();

const updateUser = (index, user) => {
    const dbUser = readUser();
    dbUser[index] = user;
    setLocalStorage(dbUser);
};

const deleteUser = (index) => {
    const dbUser = readUser();
    dbUser.splice(index, 1);
    setLocalStorage(dbUser);
};

const isValidFields = () => {
    if (fullName.value === "") {
        fullName.focus()
        alert("Por favor, preencha seu nome");
        return;
    }

    if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
        emailInput.focus()
        alert("Por favor, preencha seu email corretamente");
        return;
    }

    if (!validatePassword(passwordInput.value, 8)) {
        passwordInput.focus()
        alert("A senha precisa ter no mínimo 8 dígitos");
        return;
    }

    if (birthDate.value === "" || !isDateValid(birthDate.value)) {
        birthDate.focus()
        alert("Por favor, insira uma data válida");
        return;
    }

    return document.getElementById('register-form').reportValidity();
};

const clearFields = () => {
    const fields = document.querySelectorAll('.erase');
    fields.forEach(field => field.value = "");
};

const saveUser = (e) => {
    e.preventDefault()

    if (isValidFields()) {
        const user = {
            name: document.getElementById('full-name-input').value,
            date: document.getElementById('birth-date-input').value,
            cpf: document.getElementById('cpf-input').value,
            phone: document.getElementById('telephone-input').value,
            email: document.getElementById('email-input').value,
            username: document.getElementById('username-input').value,
            password: document.getElementById('password-input').value
        };
        createUser(user);
        clearFields();
    }
}

document.getElementById('register-button').addEventListener('click', e => saveUser(e))

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}

function mascara_cpf(){
    if(cpfInput.value.length === 3 || cpfInput.value.length === 7){
        cpfInput.value += "."
    } else if (cpfInput.value.length === 11){
        cpfInput.value += "-"
    }
}

function mascara_birth() {
    if (birthDate.value.length === 2 || birthDate.value.length === 5) {
        birthDate.value += "/";
    }
}

function mascara_phone() {
    const inputValue = phoneNumber.value.replace(/\D/g, "");
    let formattedValue = "";

    if (inputValue.length > 0) {
        formattedValue += `(${inputValue.slice(0, 2)}`;
    }
    if (inputValue.length > 2) {
        formattedValue += `) ${inputValue.slice(2, 7)}`;
    }
    if (inputValue.length > 7) {
        formattedValue += `-${inputValue.slice(7, 11)}`;
    }

    phoneNumber.value = formattedValue;
}

function isDateValid(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/;
    
    if (!dateRegex.test(date)) {
        return false; 
    }

    const parts = date.split("/");
    const userDay = parseInt(parts[0], 10);
    const userMonth = parseInt(parts[1], 10) - 1; 
    const userYear = parseInt(parts[2], 10);

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return !(userYear < currentYear || (userYear === currentYear && userMonth < currentMonth) ||
        (userYear === currentYear && userMonth === currentMonth && userDay === currentDay));


}

function validatePassword(password, minDigits) {
    return password.length >= minDigits;
}
