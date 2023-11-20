const openModalButton = document.querySelector("#open-modal-button");
const closeModalButton = document.querySelector("#close-modal-button");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modal-background");
const doNotShowModalAgainCheckBox = document.querySelector("#dont-show-modal-again");


const showModal = () => {
    doNotShowModalAgainCheckBox.checked = localStorage.getItem('shouldShowModal') !== 'true';
    [modal, modalBackground].forEach((el) => el.classList.toggle("show"));
};

[openModalButton, closeModalButton, modalBackground].forEach((el) => {
    el.addEventListener("click", () => {
        showModal();
        setShouldShowModal();
    });
});

doNotShowModalAgainCheckBox.onclick = () => {
    setShouldShowModal();
}

const setShouldShowModal = () => {
    const value = doNotShowModalAgainCheckBox.checked ? 'false' : 'true';
    localStorage.setItem('shouldShowModal', value);
}

window.addEventListener('load', () => {
    if (localStorage.getItem('shouldShowModal') === 'false') return;
    showModal();
});




  