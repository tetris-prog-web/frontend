const form = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name-input");
const birthdateInput = document.getElementById("birthdate-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumber = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

//This file is a base to the register page, when the database is implemented, this file will be changed

const listPlayers = async (page) => {
    const data = await fetch("./list.php?page=" + page);
    const response = await data.text();
    tbody.innerHTML = response;
}

listPlayers(1);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const dataForm = new FormData(form);
    dataForm.append("add", 1);

    const data = await fetch("backend/register.php", {
        method:"POST",
        body: dataForm,
    });

    const response = await data.json();
});