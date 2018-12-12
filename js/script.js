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
    let t = event.target;
    if ((t == popupEngineer || t == popupClose[1]) && t != popupEngineerContent) {
        showHideModal(popupEngineer);
    }
    if ((t == popup || t == popupClose[0]) && t != popupContent) {
        showHideModal(popup);
    }
});

function showHideModal(modal) {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}