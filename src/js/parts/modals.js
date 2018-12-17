function modals() {
    let d = document,
        popupEngineerBtn = d.querySelector('.popup_engineer_btn'),
        popupEngineer = d.querySelector('.popup_engineer'),
        popupEngineerContent = d.querySelector('.popup_engineer .popup_content'),
        phoneLink = d.querySelectorAll('.phone_link'),
        popup = d.querySelector('.popup'),
        popupContent = d.querySelector('.popup .popup_content'),
        popupClose = d.querySelectorAll('.popup_close');

    // Modals
    function showInSixtySeconds() {
        setTimeout(() => {
            showHideModal(popup)
        }, 60000);
    }

    showInSixtySeconds();

    popupEngineerBtn.addEventListener('click', () => {
        showHideModal(popupEngineer);
    });

    phoneLink.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showHideModal(popup);
        });
    });

    function hideModal(modalContainer, modalContent, closeButton, event) {
        let t = event.target;
        if (t.tagName == 'STRONG') {
            t = t.parentNode;
        }
        if ((t == modalContainer || t == closeButton) && t != modalContent) {
            showHideModal(modalContainer);
        }
    }

    function showHideModal(modal) {
        modal.classList.toggle('display-none');
        d.body.classList.toggle('overflow-hidden');
    }
}

module.exports = modals;