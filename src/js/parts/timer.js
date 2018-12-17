function timer() {
    let deadline = '2019-07-04';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds,
        minutes,
        hours,
        days;

    if (t > 0) {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t - (days * 24 * 3600 * 1000)) / (1000 * 60 * 60));
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
    } else {
        seconds = 0;
        minutes = 0;
        hours = 0;
        days = 0;
    }

    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
        'days': days
    };
}

function setTimer(id, endtime) {
    let timer = d.querySelector('#timer'),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateTimer, 1000);

    function formatTime(x) {
        if (x < 10) x = '0' + x;
        return x;
    }

    function updateTimer() {
        let t = getTimeRemaining(endtime);

        days.textContent = formatTime(t.days);
        hours.textContent = formatTime(t.hours);
        minutes.textContent = formatTime(t.minutes);
        seconds.textContent = formatTime(t.seconds);

        if (t.total < 0) {
            clearInterval(timeInterval);
        }
    }
}

setTimer('timer', deadline);
}

module.exports = timer;