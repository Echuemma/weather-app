import React from 'react';
import { MapPin, Sun, Cloud } from 'lucide-react';

const WeatherCard = () => (
  <div className="bg-gray-800 rounded-2xl p-6 relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-white" />
        <span className="text-white font-medium">Kathmandu</span>
      </div>
      <div className="flex space-x-1">
        <span className="bg-gray-700 px-2 py-1 rounded text-white text-sm">F</span>
        <span className="bg-green-600 px-2 py-1 rounded text-white text-sm">°C</span>
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-white text-sm mb-2">Weather</h2>
        <span className="text-white text-xs">Now</span>
        <div className="text-6xl font-light text-white mt-2">24°C</div>
        <p className="text-gray-400 text-sm mt-2">Feels like 25°</p>
      </div>
      <div className="relative">
        <Sun className="w-20 h-20 text-yellow-400" />
        <Cloud className="w-12 h-12 text-gray-300 absolute -bottom-2 -left-2" />
      </div>
    </div>
    
    <div className="flex justify-between mt-6 text-white text-sm">
      <span>High: 28°</span>
      <span>Low: 18°</span>
    </div>
  </div>
);

export default WeatherCard;
