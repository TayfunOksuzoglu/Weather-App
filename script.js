const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const error404Text = document.querySelector('.not-found p');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');
const form = document.querySelector('.search-box form');

const APIKey = '2bfe741d3db489160a6c0141ea384ebe';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  // GEOCODING API- CONVERTING NAME TO LAT-LON

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((geoCode) => {
      if (geoCode.length === 0) {
        container.style.height = '40rem';
        weatherDetails.style.display = 'none';
        weatherBox.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        error404Text.innerHTML = 'Could not find the location!';
        return;
      }

      // WEATHER API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoCode[0].lat}&lon=${geoCode[0].lon}&appid=${APIKey}&units=metric`
      )
        .then((response) => response.json())
        .then((weatherResult) => {
          if (weatherResult.code === '404') {
            weatherDetails.style.display = 'none';
            weatherBox.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            error404Text.innerHTML = 'Could not fetch weather data!';
            return;
          }

          error404.style.display = 'none';
          error404.classList.remove('fadeIn');

          switch (weatherResult.weather[0].main) {
            case 'Clear':
              image.src = 'images/clear.png';
              break;

            case 'Clouds':
              image.src = 'images/cloud.png';
              break;

            case 'Mist':
              image.src = 'images/mist.png';
              break;

            case 'Rain':
              image.src = 'images/rain.png';
              break;

            case 'Snow':
              image.src = 'images/snow.png';
              break;

            default:
              image.src = '';
              break;
          }

          // WEATHER INFO TEXTS***
          temperature.innerHTML = `${parseInt(
            weatherResult.main.temp
          )}<span>°C</span>`;
          description.innerHTML = `${weatherResult.weather[0].description}`;
          humidity.innerHTML = `${weatherResult.main.humidity}%`;
          wind.innerHTML = `${parseInt(weatherResult.wind.speed)} Km/h`;

          // WEATHER VIEW ACTIVATION
          weatherBox.style.display = '';
          weatherDetails.style.display = '';
          weatherBox.classList.add('fadeIn');
          weatherDetails.classList.add('fadeIn');
          container.style.height = '59rem';
        });
    });
});
