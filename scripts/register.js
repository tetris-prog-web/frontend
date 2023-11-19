const form = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name-input");
const birthdateInput = document.getElementById("birthdate-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumber = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

const formatBirthdate = (birthdate) => {
    const [day, month, year] = birthdate.split("/");
    return `${year}-${month}-${day}`;
}

const formatCPF = (cpf) => {
    return cpf.replace(/\D/g, "");
}

const formatPhone = (phone) => {
    return phone.replace(/\D/g, "");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);

    dataForm.set("birthdate-input", formatBirthdate(dataForm.get("birthdate-input")));
    dataForm.set("cpf-input", formatCPF(dataForm.get("cpf-input")));
    dataForm.set("telephone-input", formatPhone(dataForm.get("telephone-input")));

    const data = await fetch("backend/register.php", {
        method: "POST",
        body: dataForm,
    });

    const response = await data.json();
});