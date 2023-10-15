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
    dbUser.push (user)
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
    event.preventDefault();

    if(fullName.value === ""){
        alert("Por favor, preencha seu nome");
        return;
    }

    if(emailInput.value === "" || !isEmailValid(emailInput.value)){
        alert("Por favor, preencha seu email corretamente");
        return;
    }

    if(!validatePassword(passwordInput.value, 8)){
        alert("A senha precisa ter no mínimo 8 dígitos");
        return;
    }

    if(birthDate.value === "" || !isDateValid(birthDate.value)){
        alert("Por favor, insira uma data válida");
        return;
    }

    return document.getElementById('register-form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.erase')
    fields.forEach(field => field.value = "")
}

const saveUser = () => {
    if(isValidFields()){
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


const updateProfile = () => {
    const dbUser = readUser()
    dbUser.for(createProfile)
}

updateProfile()

document.getElementById('register-button')
    .addEventListener('click', saveUser)

    
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


function validatePassword(password, minDigits){
    if(password.length >= minDigits){
        return true;
    }
    return false;
}    