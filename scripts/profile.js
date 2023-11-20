document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("profile-form");
    const fullNameInput = document.getElementById("full-name-input");
    const birthdateInput = document.getElementById("birthdate-input");
    const cpfInput = document.getElementById("cpf-input");
    const phoneNumberInput = document.getElementById("telephone-input");
    const emailInput = document.getElementById("email-input");
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");

    const formatBirthdateToShow = (birthdate) => {
        const [year, month, day] = birthdate.split("-");
        return `${day}/${month}/${year}`;
    };

    const formatCPFToShow = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    const formatPhoneToShow = (phone) => {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    const formatPhoneToSave = (phone) => {
        return phone.replace(/\D/g, "");
    }

    try {
        const response = await fetch("./backend/profile/get_player_data.php", {
            method: "GET",
        });

        if (response.ok) {
            const user = (await response.json()).user;

            fullNameInput.value = user.name;
            birthdateInput.value = formatBirthdateToShow(user["birth_date"]);
            cpfInput.value = formatCPFToShow(user.cpf);
            emailInput.value = user.email;
            passwordInput.value = user.password;
            usernameInput.value = user.username;
            phoneNumberInput.value = formatPhoneToShow(user.phone);
        } else if (response.status === 404) {
            fetch("./backend/account/logout.php")
                .then((response) => {
                    if (response.ok) {
                        window.location.href = "index.html";
                    }
                });
        }
    } catch (error) {
        console.log("Erro na solicitação Fetch: " + error);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(form);
        dataForm.delete("username-input");
        dataForm.delete("birthdate-input");
        dataForm.delete("cpf-input");
        dataForm.set("telephone-input", formatPhoneToSave(dataForm.get("telephone-input")));

        const data = await fetch("./backend/profile/edit_player_data.php", {
            method: "POST",
            body: dataForm,
        });

        if (data.ok) {
            alert("Dados atualizados com sucesso!");
        } else {
            alert("Erro ao atualizar dados!");
        }
        window.location.href = "profile.html";
    });
});
