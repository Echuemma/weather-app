// File: components/OtherCities.jsx
import React from 'react';
import { CloudRain, Sun } from 'lucide-react';

const OtherCities = () => {
  const cities = [
    { name: 'Pokhara', temp: '20°C', condition: 'Chances of flood', icon: CloudRain },
    { name: 'Biratnagar', temp: '27°C', condition: 'Sunny Day', icon: Sun }
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Other Cities</h3>
        <button className="text-green-500 text-sm">Show All</button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {cities.map((city, index) => (
          <div key={index} className="bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white text-xl">{city.temp}</p>
                <p className="text-white font-medium">{city.name}</p>
                <p className="text-gray-400 text-sm">{city.condition}</p>
              </div>
              <city.icon className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCities;
