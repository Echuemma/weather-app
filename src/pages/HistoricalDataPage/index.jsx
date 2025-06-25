import React from 'react';
import { getWeatherIcon } from '../../components/getWeatherIcon';

const HistoricalDataPage = () => {
  const historicalData = [
    { date: '2024-06-20', temp: 68, humidity: 70, condition: 'Rainy' },
    { date: '2024-06-19', temp: 71, humidity: 65, condition: 'Cloudy' },
    { date: '2024-06-18', temp: 74, humidity: 60, condition: 'Sunny' },
    { date: '2024-06-17', temp: 69, humidity: 68, condition: 'Partly Cloudy' },
    { date: '2024-06-16', temp: 72, humidity: 63, condition: 'Sunny' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Historical Data</h2>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Historical Weather Data</h3>
          <select className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Temperature</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Humidity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Condition</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((day, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-white">{day.date}</td>
                  <td className="py-3 px-4 text-white">{day.temp}°F</td>
                  <td className="py-3 px-4 text-white">{day.humidity}%</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(day.condition)}
                      <span className="text-white">{day.condition}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataPage;