<!--    task momentum-->

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.description')
const city = document.querySelector('.city')

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=ca70759849f15aeca11bb59253ad6332&units=metric`;
    const res = await fetch(url)
    const data = await res.json()
    if (data.cod !== "404") {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${data.main.temp}°C ${data.wind.speed}m/s ${data.main.humidity}%`;
        weatherDescription.textContent = data.weather[0].description;
        console.log(data.wind.speed);
        console.log(data.main.humidity);
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-`)
        temperature.textContent = `city not found`;
        weatherDescription.textContent = '';
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            city.blur();
            getWeather();
        }
    } else if (e.target.textContent.trim() === '') {
        e.target.innerText = localStorage.getItem('city') || '[Enter city]';
    } else {
        localStorage.setItem('city', e.target.innerText);
        getWeather();
    }
}

function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter city]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
getCity()
resetInput(city)