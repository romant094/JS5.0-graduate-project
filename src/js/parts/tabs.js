function tabs() {
    let tabTriggers = d.querySelectorAll('.glazing_block'),
        tabBlocks = d.querySelectorAll('.glazing .row'),
        tabDecorTriggers = d.querySelectorAll('.no_click'),
        tabDecorBlocks = d.querySelectorAll('.decoration .decor-block');

    tabsAction(tabTriggers, tabBlocks, 'active');
    tabsAction(tabDecorTriggers, tabDecorBlocks, 'after_click');

    function tabsAction(triggers, contents, activeClass) {
        for (let i = 0; i < triggers.length; i++) {
            triggers[i].addEventListener('click', function (event) {
                event.preventDefault();

                for (let j = 0; j < triggers.length; j++) {
                    if (i != j) {
                        triggers[j].classList.remove(activeClass);
                        contents[j].classList.add('display-none');
                    }
                }

                this.classList.add(activeClass);
                contents[i].classList.remove('display-none');
            });
        }
    }
}
module.exports = tabs;