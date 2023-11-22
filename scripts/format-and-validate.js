const form = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name-input");
const birthdateInput = document.getElementById("birthdate-input");
const cpfInput = document.getElementById("cpf-input");
const phoneNumberInput = document.getElementById("telephone-input");
const emailInput = document.getElementById("email-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

function isPasswordValid(password, minDigits) {
    return password.length >= minDigits;
}

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}

function isDateValid(date) {
    const dateRegex = new RegExp(
        /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](\d{4}$)/
    );

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

    return (userYear < currentYear || (userYear === currentYear && userMonth < currentMonth) ||
        (userYear === currentYear && userMonth === currentMonth && userDay < currentDay));
}

function isCpfValid(cpf) {
    let sum;
    let mod;
    sum = 0;

    cpf = cpf.replace(/\D/g, "");
    const cpfArray = Array.from(cpf);
    if (cpfArray.filter((item) => item !== cpfArray[0]).length === 0) return false;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    mod = (sum * 10) % 11;

    if ((mod === 10) || (mod === 11)) mod = 0;
    if (mod !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    mod = (sum * 10) % 11;

    if ((mod === 10) || (mod === 11)) mod = 0;
    return mod === parseInt(cpf.substring(10, 11));

}

const isValidFields = (form) => {
    if (fullNameInput.value === "") {
        fullNameInput.focus()
        alert("Por favor, preencha seu nome");
        return;
    }

    if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
        emailInput.focus()
        alert("Por favor, preencha seu email corretamente");
        return;
    }

    if (!isPasswordValid(passwordInput.value, 8)) {
        passwordInput.focus()
        alert("A senha precisa ter no mínimo 8 dígitos");
        return;
    }

    if (birthdateInput.value === "" || !isDateValid(birthdateInput.value)) {
        birthdateInput.focus()
        alert("Por favor, insira uma data de nascimento válida");
        return;
    }

    if (cpfInput.value === "" || !isCpfValid(cpfInput.value)) {
        cpfInput.focus()
        alert("Por favor, insira um CPF válido");
        return;
    }

    return form.reportValidity();
};

function mask_cpf() {
    let value = cpfInput.value.replace(/\D/g, '');

    if (value.length <= 3) {
        cpfInput.value = value.replace(/(\d{0,3})/, '$1');
    } else if (value.length <= 6) {
        cpfInput.value = value.replace(/(\d{0,3})(\d{0,3})/, '$1.$2');
    } else if (value.length <= 9) {
        cpfInput.value = value.replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length <= 11) {
        cpfInput.value = value.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
    }
}

function mask_birthdate() {
    let value = birthdateInput.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 2) {
        formattedValue += value.substring(0, 2) + '/';
    }

    if (value.length > 4) {
        formattedValue += value.substring(2, 4) + '/';
        formattedValue += value.substring(4);
    } else if (value.length > 2) {
        formattedValue += value.substring(2);
    } else {
        formattedValue = value;
    }

    birthdateInput.value = formattedValue;
}

function mask_phone() {
    const inputValue = phoneNumberInput.value.replace(/\D/g, "");
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

    phoneNumberInput.value = formattedValue;
}

const clearFields = () => {
    const fields = document.querySelectorAll('.erase');
    fields.forEach(field => field.value = "");
};