const form = document.getElementById("register-form");
const fullName = document.getElementById("full-name-input");
const birthDate = document.getElementById("birth-date-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumber = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? []
const setLocalStorage = (dbUser) => localStorage.setItem("db_user", JSON.stringify(dbUser))

const createUser = (user) => {
    const dbUser = getLocalStorage()
    dbUser.push(user)
    setLocalStorage(dbUser)
}

const readUser = () => getLocalStorage()

const updateUser = (index, user) => {
    const dbUser = readUser()
    dbUser[index] = user
    setLocalStorage(dbUser)
}

const deleteUser = (index) => {
    const dbUser = readUser()
    dbUser.splice(index, 1)
    setLocalStorage(dbUser)
}

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

    return document.getElementById('register-form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.erase')
    fields.forEach(field => field.value = "")
}

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
        }
        createUser(user)
        clearFields()
    }
}

document.getElementById('register-button').addEventListener('click', e => saveUser(e))

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

function validatePassword(password, minDigits) {
    return password.length >= minDigits;
}
