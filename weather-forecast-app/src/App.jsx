import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeather = async () => {
    setError('');
    try {
      // Fetch current weather
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setWeatherData(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError('City not found or API error. Please try again.');
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    } else {
      setError('Please enter a city name.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Weather Forecast</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {weatherData && <WeatherDisplay data={weatherData} />}
        {forecastData && <ForecastDisplay data={forecastData} />}
      </div>
    </div>
  );
};

export default App;