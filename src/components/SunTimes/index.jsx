// File: components/SunTimes.jsx
import React from 'react';
import { Sunrise, Sunset, Clock } from 'lucide-react';

const SunTimes = () => (
  <div className="bg-gray-800 rounded-2xl p-6 mt-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sunrise className="w-6 h-6 text-yellow-400" />
          <span className="text-white">Sunrise</span>
        </div>
        <span className="text-white text-xl">6:05 <span className="text-sm text-gray-400">AM</span></span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sunset className="w-6 h-6 text-orange-400" />
          <span className="text-white">Sunset</span>
        </div>
        <span className="text-white text-xl">7:25 <span className="text-sm text-gray-400">PM</span></span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-blue-400" />
          <span className="text-white">Day Length</span>
        </div>
        <span className="text-white">13 hr 2 min</span>
      </div>
    </div>
  </div>
);

export default SunTimes;
