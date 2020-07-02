// dom manipulation and events

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon');

const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    
    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    
    // update the night/day & icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);



    let timeSrc = null;
    if(weather.isDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}




const updateCity = async (city) => {
     
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};
};


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get the city
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};










/*
return {
    cityDets: cityDets,
    weather: weather
};

the same as short notation

return {
    cityDets,
    weather
}



    const cityDets = data.cityDets;
    const weather = data.weather;

the same as destructure properties

const { cityDets, weather } = data;


ternary operator 
    let timeSrc = null;
    if(weather.isDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }

const result = condition ? true : false;

let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
*/