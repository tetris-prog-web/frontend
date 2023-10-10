function closeGameInstructionsModal() {
    const modal = document.querySelector('#modal-background');
    modal.style.display = 'none';
}

const closeButton = document.querySelector('#close-modal-button');

if (closeButton) {
    closeButton.addEventListener('click', closeGameInstructionsModal);
}
