const form = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name-input");
const birthdateInput = document.getElementById("birthdate-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumberInput = document.getElementById("telephone-input");
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

const saveUser = (e) => {
    e.preventDefault()

    if (isValidFields(form) && !isUsernameUsed(usernameInput.value) && !isEmailUsed(emailInput.value) && !isCpfUsed(cpfInput.value)) {
        const user = {
            name: fullNameInput.value,
            date: birthdateInput.value,
            cpf: cpfInput.value,
            phone: phoneNumberInput.value,
            email: emailInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        };

        createUser(user);
        clearFields();
    }
}

document.getElementById('register-button').addEventListener('click', e => saveUser(e))
