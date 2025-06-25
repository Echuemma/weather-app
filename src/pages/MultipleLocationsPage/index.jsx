import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import WeatherCard  from '../../components/WeatherCard';

const MultipleLocationsPage = () => {
  const [selectedLocations] = useState(['New York, NY', 'London, UK', 'Tokyo, JP']);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Multiple Locations</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedLocations.map((location, index) => (
          <div key={index} className="relative">
            <WeatherCard 
              location={location}
              temp={Math.floor(Math.random() * 20) + 65}
              condition={['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]}
              humidity={Math.floor(Math.random() * 30) + 50}
              wind={Math.floor(Math.random() * 15) + 5}
            />
            <button className="absolute top-4 right-4 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleLocationsPage;