import React from 'react';

const WeatherDisplay = ({ data }) => {
  const { main, weather, name } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <img src={iconUrl} alt={weather[0].description} className="mx-auto" />
      <p className="text-lg capitalize">{weather[0].description}</p>
      <p className="text-3xl font-bold">{Math.round(main.temp)}°C</p>
      <p>Feels like: {Math.round(main.feels_like)}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;