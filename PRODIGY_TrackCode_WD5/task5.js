const apiKey = '20dbc28749c3b847737542999f9d82d7'; // Replace with your OpenWeatherMap API key
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const backgroundGif = document.getElementById('backgroundGif');

// Local GIF paths for different weather conditions
const gifs = {
    sunny: 'C:\Users\tejas\OneDrive\Desktop\Gifys\sunny.jpeg', // Sunny GIF
    rainy: 'C:\Users\tejas\OneDrive\Desktop\Gifys\rainy.jpeg', // Rainy GIF
    cloudy: 'C:\Users\tejas\OneDrive\Desktop\Gifys\cloudy.gif', // Cloudy GIF
    snowy: 'C:\Users\tejas\OneDrive\Desktop\Gifys\snow.gif', // Snowy GIF
    stormy: 'C:\Users\tejas\OneDrive\Desktop\Gifys\stormy.gif', // Stormy GIF
};

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fetch weather by user's location
function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to update background based on weather
function updateBackground(weatherCondition) {
    let backgroundGif = document.getElementById("backgroundGif");
    
    if (weatherCondition.includes("clear")) {
        backgroundGif.innerHTML = `<img src="C:\Users\tejas\OneDrive\Desktop\Gifys\sunny.jpeg" alt="Sunny Background" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else if (weatherCondition.includes("rain")) {
        backgroundGif.innerHTML = `<img src="C:\Users\tejas\OneDrive\Desktop\Gifys\rainy.jpeg" alt="Rainy Background" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else if (weatherCondition.includes("cloud")) {
        backgroundGif.innerHTML = `<img src="C:\Users\tejas\OneDrive\Desktop\Gifys\cloudy.gif" alt="Cloudy Background" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else if (weatherCondition.includes("snow")) {
        backgroundGif.innerHTML = `<img src="C:\Users\tejas\OneDrive\Desktop\Gifys\snow.gif" alt="Snowy Background" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else if (weatherCondition.includes("thunderstorm")) {
        backgroundGif.innerHTML = `<img src="C:\Users\tejas\OneDrive\Desktop\Gifys\stormy.gif" alt="Stormy Background" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
        backgroundGif.innerHTML = `<img src="C:\Users\tejas\OneDrive\Desktop\Gifys\background.jpeg" alt="Default Background" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
}


// Display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    const weatherCondition = weather[0].description.toLowerCase();

    updateBackground(weatherCondition); // Update background based on weather

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
    `;
}

// Get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                weatherInfo.innerHTML = `<p>Unable to fetch location. Please enter a city name.</p>`;
            }
        );
    } else {
        weatherInfo.innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
}

// Event listeners
searchButton.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = locationInput.value.trim();
        if (city) {
            fetchWeatherByCity(city);
        }
    }
});

// Initialize by fetching weather for user's location
getUserLocation();