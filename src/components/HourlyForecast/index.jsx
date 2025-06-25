// File: components/HourlyForecast.jsx
import React from 'react';
import { Cloud, CloudRain } from 'lucide-react';

const HourlyForecast = () => {
  const hours = [
    { time: '1 PM', temp: '20°', icon: Cloud },
    { time: '2 PM', temp: '22°', icon: Cloud },
    { time: '3 PM', temp: '25°', icon: Cloud },
    { time: 'Now', temp: '20°', icon: Cloud, active: true },
    { time: 'Now', temp: '10°', icon: CloudRain }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mt-6">
      <h3 className="text-white font-medium mb-4">Today / Week</h3>
      <div className="flex space-x-4">
        {hours.map((hour, index) => (
          <div key={index} className={`text-center p-3 rounded-lg ${
            hour.active ? 'bg-green-600' : 'bg-gray-700'
          }`}>
            <p className="text-white text-xs mb-2">{hour.time}</p>
            <hour.icon className="w-6 h-6 text-gray-300 mx-auto mb-2" />
            <p className="text-white text-sm">{hour.temp}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Tomorrow</p>
            <p className="text-gray-400 text-xs">Thunder Storm</p>
          </div>
          <div className="text-right">
            <p className="text-white text-2xl">15°C</p>
            <CloudRain className="w-8 h-8 text-blue-400 ml-auto mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;