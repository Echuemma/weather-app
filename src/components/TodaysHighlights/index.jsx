import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area
} from 'recharts';
import { Droplets } from 'lucide-react';


const TodaysHighlights = () => {
  // Data for rain chances
  const rainData = [
    { day: 'Wed', chance: 40 },
    { day: 'Thu', chance: 60 },
    { day: 'Fri', chance: 80 },
    { day: 'Sat', chance: 90 },
    { day: 'Sun', chance: 70 },
    { day: 'Mon', chance: 85 },
    { day: 'Tue', chance: 75 }
  ];

  // Data for wind status (sample hourly data)
  const windData = [
    { time: '6AM', speed: 12 },
    { time: '8AM', speed: 15 },
    { time: '10AM', speed: 18 },
    { time: '12PM', speed: 22 },
    { time: '2PM', speed: 25 },
    { time: '4PM', speed: 20 },
    { time: '6PM', speed: 16 },
    { time: '8PM', speed: 14 },
    { time: '10PM', speed: 10 }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-white font-medium">Today's Highlight</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* First Column */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6">
            <h4 className="text-white font-medium mb-4">Chances of Rain</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="chance" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <h4 className="text-white font-medium mb-4">Wind Status</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={windData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="speed" 
                    stroke="#10B981" 
                    fill="url(#windGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-gray-400 text-xs mt-2">
              <span>Wind Speed (mph)</span>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6">
            <h4 className="text-white font-medium mb-4">UV Index</h4>
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700"/>
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.5)}`} className="text-green-500"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-xl font-bold">5/10</span>
                  <span className="text-gray-400 text-xs">High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <h4 className="text-white font-medium mb-4">Humidity</h4>
            <div className="flex items-center justify-center">
              <Droplets className="w-16 h-16 text-blue-400" />
              <div className="ml-4">
                <p className="text-white text-2xl">40%</p>
                <p className="text-gray-400 text-sm">Good Air Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights