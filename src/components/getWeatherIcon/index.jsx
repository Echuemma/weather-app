import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets
} from 'lucide-react';

// Weather Icon Utility
export const getWeatherIcon = (condition) => {
  switch(condition.toLowerCase()) {
    case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
    case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
    case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
    case 'snowy': return <CloudSnow className="w-8 h-8 text-blue-300" />;
    case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
    default: return <Sun className="w-8 h-8 text-yellow-500" />;
  }
};

// Weather Card Component
 const WeatherCard = ({ location, temp, condition, humidity, wind }) => (
  <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-semibold text-white text-lg">{location}</h3>
        <p className="text-gray-400 text-sm">{condition}</p>
      </div>
      {getWeatherIcon(condition)}
    </div>
    <div className="text-4xl font-bold text-white mb-4">{temp}°F</div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center gap-2">
        <Droplets className="w-4 h-4 text-blue-500" />
        <span className="text-gray-300">{humidity}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Wind className="w-4 h-4 text-gray-500" />
        <span className="text-gray-300">{wind} mph</span>
      </div>
    </div>
  </div>
);

export default WeatherCard