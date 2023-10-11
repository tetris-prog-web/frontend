const openModal = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const doNotShowCheckBox = document.querySelector("#dont-show");

const showModal = () => {
    doNotShowCheckBox.checked = localStorage.getItem('shouldShowModal') === 'true' ? false : true;
    [modal, fade].forEach((el) => el.classList.toggle("show"));
};

[openModal, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => showModal());
});

doNotShowCheckBox.onclick = () => {
    localStorage.setItem('shouldShowModal', !doNotShowCheckBox.checked);
}

window.addEventListener('load', () => {
    if(localStorage.getItem('shouldShowModal') === 'false') return;
    showModal();
});