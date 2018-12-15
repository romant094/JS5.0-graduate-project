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
    modal.classList.toggle('display-none');
    d.body.classList.toggle('overflow-hidden');
}

// tabs
let tabTriggers = d.querySelectorAll('.glazing_block'),
    tabBlocks = d.querySelectorAll('.glazing .row'),
    tabDecorTriggers = d.querySelectorAll('.no_click'),
    tabDecorBlocks = d.querySelectorAll('.decoration .decor-block');

tabsAction(tabTriggers, tabBlocks, 'active');
tabsAction(tabDecorTriggers, tabDecorBlocks, 'after_click');

function tabsAction(triggers, contents, activeClass) {
    for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('click', function () {
            for (let j = 0; j < triggers.length; j++) {
                if (i != j) {
                    triggers[j].classList.remove(activeClass);
                    contents[j].classList.add('display-none');
                }
            }

            this.classList.add(activeClass);
            contents[i].classList.remove('display-none');

            console.log(triggers[i]);
            console.log(contents);
        });
    }
}