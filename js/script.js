let d = document,
    popupEngineerBtn = d.querySelector('.popup_engineer_btn'),
    popupEngineer = d.querySelector('.popup_engineer'),
    popupEngineerContent = d.querySelector('.popup_engineer .popup_content'),
    phoneLink = d.querySelectorAll('.phone_link'),
    popup = d.querySelector('.popup'),
    popupContent = d.querySelector('.popup .popup_content'),
    popupClose = d.querySelectorAll('.popup_close');

// Modals
popupEngineerBtn.addEventListener('click', () => {
    showHideModal(popupEngineer);
});
phoneLink.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showHideModal(popup);
    });
});

d.addEventListener('click', (event) => {
    hideModal(popupEngineer, popupEngineerContent, popupClose[1], event);
    hideModal(popup, popupContent, popupClose[0], event);
});

function hideModal(modalContainer, modalContent, closeButton, event) {
    let t = event.target;
    if ((t == modalContainer || t == closeButton) && t != modalContent) {
        showHideModal(modalContainer);
    }
}

function showHideModal(modal) {
    modal.classList.toggle('display-block');
    modal.classList.toggle('display-none');
    d.body.classList.toggle('overflow-auto');
    d.body.classList.toggle('overflow-hidden');
}