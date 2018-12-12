let d = document,
    popupEngineerBtn = d.querySelector('.popup_engineer_btn'),
    popupEngineer = d.querySelector('.popup_engineer'),
    popupEngineerContent = d.querySelector('.popup_engineer .popup_content'),
    popupClose = d.querySelectorAll('.popup_close');

// Modals
popupEngineerBtn.addEventListener('click', () => {
    showHideModal(popupEngineer);
});

d.addEventListener('click', (event) => {
    let t = event.target;
    if ((t == popupEngineer || t == popupClose[1]) && t != popupEngineerContent) {
        showHideModal(popupEngineer);
    }
});

function showHideModal(modal) {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}