const form = document.getElementById("profile-form");
const fullNameInput = document.getElementById("full-name-input");
const birthdateInput = document.getElementById("birthdate-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumberInput = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? [];
const setLocalStorage = (dbUser) => localStorage.setItem("db_user", JSON.stringify(dbUser));

const updateUser = (user) => {
    const index = getLocalStorage().findIndex(item => item.username === user.username);

    const dbUsers = readUser();
    dbUsers[index] = user;
    setLocalStorage(dbUsers);
};

const readUser = () => getLocalStorage();

const saveUser = (e) => {
    e.preventDefault()


    if (isValidFields(form) && usernameExists(usernameInput.value)) {
        const user = {
            name: fullNameInput.value,
            date: birthdateInput.value,
            cpf: cpfInput.value,
            phone: phoneNumberInput.value,
            email: emailInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        };

        updateUser(user);
        clearFields();
    }
}

const usernameExists = (username) => {
    const dbUsers = readUser();
    return dbUsers.some(user => user.username === username);
}

const fillFormFields = () => {
    const user = readUser()[0];

    if (user !== undefined) {
        fullNameInput.value = user.name;
        birthdateInput.value = user.date;
        cpfInput.value = user.cpf;
        phoneNumberInput.value = user.phone;
        emailInput.value = user.email;
        usernameInput.value = user.username;
        passwordInput.value = user.password;
    }
}
fillFormFields();

document.getElementById('edit-user-button').addEventListener('click', e => saveUser(e))
