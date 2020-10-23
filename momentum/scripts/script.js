// DOM Elements
<!--    task momentum-->

const time = document.querySelector('.time')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const focus = document.querySelector('.focus')
const btnBg = document.querySelector('.btn-bg');


// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //getWeekDay
    function getWeekDay() {
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        return days[today.getDay()]
    }

    //getNumberDay
    function getNumberDay() {
        return today.getDate()
    }

    var months = {
        'Янв': '0',
        'Фев': '1',
        'Мар': '2',
        'Апр': '3',
        'Май': '4',
        'Июн': '5',
        'Июл': '6',
        'Авг': '7',
        'Сен': '8',
        'Окт': '9',
        'Ноя': '10',
        'Дек': '11'
    }

    //getMonth
    function getMonthName(value) {
        return Object.keys(months).find(key => months[key] === today.getMonth().toString());
    }

    // Output Time
    // time.innerHTML =
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${getWeekDay()}, ${getNumberDay()} ${getMonthName()}`;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//getBackground
const today = new Date();
let hour = today.getHours();
const arr = []
for (let i = 0; i < 6; i++) {
    arr.push(getRandomInt(20))
    arr.push(getRandomInt(20))
    arr.push(getRandomInt(20))
    arr.push(getRandomInt(20))
}

const getDayState = (h) => {
    if (h >= 0 && h < 6) return 'night';
    if (h >= 6 && h < 12) return 'morning';
    if (h >= 12 && h < 18) return 'day';
    if (h >= 18 && h <= 23) return 'evening';
}

const setBgGreet = () => {

    if (hour >= 0 && hour < 6) {
        viewBgImage('night', hour);
        greeting.innerHTML = 'Good night, ';
    } else if (hour >= 6 && hour < 12) {
        viewBgImage('morning', hour);
        greeting.innerHTML = 'Good morning, ';
    } else if (hour >= 12 && hour < 18) {
        viewBgImage('day', hour);
        greeting.innerHTML = 'Good day, ';
    } else if (hour >= 18 && hour <= 23) {
        viewBgImage('evening', hour);
        greeting.innerHTML = 'Good evening, ';
    }
};

const viewBgImage = (day, imageIndex) => {
    const body = document.querySelector('body');
    const img = document.createElement('img');
    const src = `assets/images/${day}/${addZero(arr[imageIndex])}.jpg`
    img.src = src;
    btnBg.disabled = true;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
        setTimeout(function () {
            btnBg.disabled = false;
        }, 1000);
    };
};
// change bg
const changeBackground = () => {
    return () => {
        hour += 1;
        hour = hour % 24;

        if (hour >= 0 && hour < 6)
            viewBgImage('night', hour);
        if (hour >= 6 && hour < 12)
            viewBgImage('morning', hour);
        if (hour >= 12 && hour < 18)
            viewBgImage('day', hour);
        if (hour >= 18 && hour <= 23)
            viewBgImage('evening', hour);
    }
}

btnBg.addEventListener('click', changeBackground());

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else if (e.target.textContent.trim() === '') {
        e.target.innerText = (localStorage.getItem('name') || '[Enter Name]');
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else if (e.target.textContent.trim() === '') {
        e.target.innerText = localStorage.getItem('focus') || '[Enter Name]';
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

function resetInput(element) {
    element.addEventListener('click', (e) => {
        element.textContent = '';
    })
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


// Run
showTime();
setBgGreet();
getName();
getFocus();
resetInput(name)
resetInput(focus)