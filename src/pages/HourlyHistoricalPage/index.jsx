import React from 'react';
import  {getWeatherIcon}  from '../../components/getWeatherIcon';

const HourlyHistoricalPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Hourly Historical Data</h2>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Hourly Weather History</h3>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{minWidth: '800px'}}>
            {Array.from({length: 24}, (_, i) => (
              <div key={i} className="flex-shrink-0 bg-gray-700 rounded-lg p-3 text-center min-w-16">
                <div className="text-xs text-gray-300 mb-2">
                  {i === 0 ? 'Now' : `${i}:00`}
                </div>
                <div className="mb-2">
                  {getWeatherIcon(['sunny', 'cloudy', 'rainy'][i % 3])}
                </div>
                <div className="text-sm font-semibold text-white">
                  {Math.floor(Math.random() * 15) + 65}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyHistoricalPage;