import React from 'react';
import  {getWeatherIcon}  from '../../components/getWeatherIcon';

const ForecastDataPage = () => {
  const forecastData = [
    { day: 'Mon', high: 78, low: 62, condition: 'sunny' },
    { day: 'Tue', high: 75, low: 59, condition: 'cloudy' },
    { day: 'Wed', high: 73, low: 58, condition: 'rainy' },
    { day: 'Thu', high: 69, low: 55, condition: 'rainy' },
    { day: 'Fri', high: 71, low: 57, condition: 'partly-cloudy' },
    { day: 'Sat', high: 74, low: 60, condition: 'sunny' },
    { day: 'Sun', high: 76, low: 63, condition: 'partly-cloudy' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Forecast Data</h2>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">7-Day Forecast</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {forecastData.map((day, index) => (
            <div key={index} className="bg-gray-700 rounded-xl p-4 text-center hover:bg-gray-600 transition-colors">
              <div className="font-medium text-white mb-2">{day.day}</div>
              <div className="mb-3">{getWeatherIcon(day.condition)}</div>
              <div className="text-sm text-gray-300">
                <div className="font-semibold">{day.high}°</div>
                <div>{day.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastDataPage;