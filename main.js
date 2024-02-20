window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,precipitation,rain,snowfall&forecast_days=1`;

          fetch(api)
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  console.log(data);
                  const currentData = data.current;

                  displayDailyWeather(currentData);
                  applySnowRainEffects(currentData);
              });
      });
  } else {
      alert('Geolocation is not supported by your browser');
  }
});

function displayDailyWeather(currentData) {
  const dateTimeElement = document.getElementById('dateTime');
  const temperatureElement = document.getElementById('temperature');
  const precipitationElement = document.getElementById('precipitation');

  const dateTime = new Date(currentData.time).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  const temperature = `${currentData.temperature_2m}°C`;
  let precipitationType = 'None';

  if (currentData.rain > 0) {
      precipitationType = 'Rain';
  } else if (currentData.snowfall > 0) {
      precipitationType = 'Snow';
  }

  dateTimeElement.textContent = dateTime;
  temperatureElement.textContent = temperature;
  precipitationElement.textContent = precipitationType;
}

function applySnowRainEffects(currentData) {
  const snowflakeElement = document.getElementById('snow');
  const rainDropElement = document.getElementById('rain');

  if (currentData.rain === 0) {
      rainDropElement.classList.add('none');
  }

  if (currentData.snowfall === 0) {
      snowflakeElement.classList.add('none');
  }
}






