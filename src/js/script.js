window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let modals = require('./parts/modals.js'),
        tabs = require('./parts/tabs.js'),
        popups = require('./parts/popups.js'),
        timer = require('./parts/timer.js'),
        calc = require('./parts/calc.js'),
        ajax = require('./parts/calc.js'),
        validation = require('./parts/validation.js');

    modals();
    tabs();
    popups();
    timer();
    calc();
    ajax();
    validation();
});