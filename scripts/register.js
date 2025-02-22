document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("register-form");

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

        if (isValidFields(form)) {
            const dataForm = new FormData(form);

            dataForm.set("birthdate-input", formatBirthdate(dataForm.get("birthdate-input")));
            dataForm.set("cpf-input", formatCPF(dataForm.get("cpf-input")));
            dataForm.set("telephone-input", formatPhone(dataForm.get("telephone-input")));

            await fetch("./backend/account/register.php", {
                method: "POST",
                body: dataForm,
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.error) {
                        alert(response.msg);
                    } else {
                        alert("Usuário cadastrado com sucesso!");
                        window.location.href = "index.html";
                    }
                });
        }
    });
});