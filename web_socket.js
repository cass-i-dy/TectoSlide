
const myInterval = setInterval(weather, 1000);

function weather(){
    const weather_types = ["Sunny", "Rainy", 
    "Thundering", "Foggy", "Partly Clousdy",
     "Windy", "Cloudy", "Sprinkling", "Snowing"]
     const randomIndex = Math.floor(Math.random()* weather_types.length);
     const random_weather = weather_types[randomIndex];
     document.getElementById("w").innerHTML = random_weather;
}

function ChangeWeather() {
    clearInterval(myInterval);
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/weather`);
  
    socket.onopen = (event) => {
      console.log('WebSocket connection established');
    };
  
    socket.onclose = (event) => {
      console.log('WebSocket connection closed');
    };
  
    socket.onmessage = async (event) => {
      const weatherData = JSON.parse(event.data);
      console.log('Received weather data:', weatherData);
      // Update the weather information on your webpage
      document.getElementById('temperature').textContent = weatherData.current.temp_c;
      document.getElementById('conditions').textContent = weatherData.current.condition.text;
    };
  }

  configureWebSocket();