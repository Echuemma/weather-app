import React from 'react';
import { LineChart, BarChart3 } from 'lucide-react';

const TimeSeriesPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Historical Time Series</h2>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Temperature Trends</h3>
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-300">7-day trend</span>
          </div>
        </div>
        
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-300">Interactive chart would be rendered here</p>
            <p className="text-sm text-gray-400">Connect to your charting library</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesPage;