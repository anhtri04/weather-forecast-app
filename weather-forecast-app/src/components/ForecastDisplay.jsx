import React from 'react';

const ForecastDisplay = ({ data }) => {
  // Filter forecast to get one entry per day (e.g., at 12:00)
  const dailyForecast = data.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {dailyForecast.map((item) => (
          <div
            key={item.dt}
            className="bg-gray-100 rounded-lg p-2 text-center"
          >
            <p className="text-sm">
              {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p className="text-sm">{Math.round(item.main.temp)}°C</p>
            <p className="text-xs capitalize">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;