const apiKey = '9d33d9bc5867f3b0c6580983649e8104';  // Replace with your OpenWeatherMap API key

// Get weather data based on input location
function getWeatherByInput() {
  const location = document.getElementById('locationInput').value;
  fetchWeatherData(location);
}

// Get weather data based on user's current location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherDataByCoordinates(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Fetch weather data by city name
function fetchWeatherData(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeatherData(data))
    .catch(error => alert("Error fetching data: " + error));
}

// Fetch weather data by latitude and longitude
function fetchWeatherDataByCoordinates(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeatherData(data))
    .catch(error => alert("Error fetching data: " + error));
}

// Display weather data on the web page
function displayWeatherData(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  if (data.cod === 200) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const city = data.name;

    weatherInfo.innerHTML = `
      <h2>${city}</h2>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
  } else {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
  }
}
