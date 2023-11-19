document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("profile-form");
    const fullNameInput = document.getElementById("full-name-input");
    const birthdateInput = document.getElementById("birthdate-input");
    const cpfInput = document.getElementById("cpf-input");
    const phoneNumberInput = document.getElementById("telephone-input");
    const emailInput = document.getElementById("email-input");
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");

    // Move all the masking to a separate file

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
        const response = await fetch("backend/profile.php", {
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
            console.log(user);
        } else if (response.status === 404) {
            $.ajax({
                type: "POST",
                url: "./backend/logout.php",
                success: function (response) {
                    console.log(response);
                    window.location.href = "index.html"; //TODO improve this whole thing
                },
                error: function (error) {
                    console.log("Erro na solicitação Ajax: " + error);
                    //TODO implement a message when the logout fails
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

        const data = await fetch("backend/edit-profile.php", {
            method: "POST",
            body: dataForm,
        });

        const response = await data.json();

        if (data.ok) {
            alert("Dados atualizados com sucesso!");
        } else {
            alert("Erro ao atualizar dados!");
        }
    });
});
