import React, { useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  MapPin, 
  Search, 
  Calendar, 
  Clock, 
  TrendingUp,
  Plus,
  X,
  ChevronDown,
  BarChart3,
  LineChart
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [currentSubTab, setCurrentSubTab] = useState('current-location');
  const [historySubTab, setHistorySubTab] = useState('historical-data');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState(['New York, NY', 'London, UK', 'Tokyo, JP']);

  // Mock data
  const currentWeather = {
    location: 'New York, NY',
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 30.15
  };

  const forecastData = [
    { day: 'Mon', high: 78, low: 62, condition: 'sunny' },
    { day: 'Tue', high: 75, low: 59, condition: 'cloudy' },
    { day: 'Wed', high: 73, low: 58, condition: 'rainy' },
    { day: 'Thu', high: 69, low: 55, condition: 'rainy' },
    { day: 'Fri', high: 71, low: 57, condition: 'partly-cloudy' },
    { day: 'Sat', high: 74, low: 60, condition: 'sunny' },
    { day: 'Sun', high: 76, low: 63, condition: 'partly-cloudy' }
  ];

  const historicalData = [
    { date: '2024-06-20', temp: 68, humidity: 70, condition: 'Rainy' },
    { date: '2024-06-19', temp: 71, humidity: 65, condition: 'Cloudy' },
    { date: '2024-06-18', temp: 74, humidity: 60, condition: 'Sunny' },
    { date: '2024-06-17', temp: 69, humidity: 68, condition: 'Partly Cloudy' },
    { date: '2024-06-16', temp: 72, humidity: 63, condition: 'Sunny' }
  ];

  const autocompleteResults = [
    'New York, NY, USA',
    'New Orleans, LA, USA',
    'Newark, NJ, USA',
    'Newport Beach, CA, USA'
  ];

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snowy': return <CloudSnow className="w-8 h-8 text-blue-300" />;
      case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const WeatherCard = ({ location, temp, condition, humidity, wind }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{location}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{condition}</p>
        </div>
        {getWeatherIcon(condition)}
      </div>
      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{temp}°F</div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">{humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 dark:text-gray-300">{wind} mph</span>
        </div>
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    return (
      <div className="space-y-6">
        {/* Sub-navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'current-location', label: 'Current Location' },
              { id: 'multiple-locations', label: 'Multiple Locations' },
              { id: 'location-identifiers', label: 'Location Identifiers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentSubTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentSubTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {currentSubTab === 'current-location' && (
          <div className="space-y-6">
            <WeatherCard 
              location={currentWeather.location}
              temp={currentWeather.temperature}
              condition={currentWeather.condition}
              humidity={currentWeather.humidity}
              wind={currentWeather.windSpeed}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Visibility</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentWeather.visibility} mi</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Pressure</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentWeather.pressure} in</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <Wind className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentWeather.windSpeed} mph</div>
              </div>
            </div>
          </div>
        )}

        {currentSubTab === 'multiple-locations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Locations</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
        )}

        {currentSubTab === 'location-identifiers' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Coordinates</label>
                    <p className="text-lg text-gray-900 dark:text-white">40.7128°N, 74.0060°W</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Time Zone</label>
                    <p className="text-lg text-gray-900 dark:text-white">America/New_York (UTC-5)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Station ID</label>
                    <p className="text-lg text-gray-900 dark:text-white">KNYC</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Elevation</label>
                    <p className="text-lg text-gray-900 dark:text-white">33 ft</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHistoryTab = () => {
    return (
      <div className="space-y-6">
        {/* Sub-navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'historical-data', label: 'Historical Data' },
              { id: 'time-series', label: 'Time Series' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setHistorySubTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  historySubTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {historySubTab === 'historical-data' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Historical Weather Data</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Temperature</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Humidity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((day, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{day.date}</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{day.temp}°F</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{day.humidity}%</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getWeatherIcon(day.condition)}
                            <span className="text-gray-900 dark:text-white">{day.condition}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {historySubTab === 'time-series' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Temperature Trends</h3>
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">7-day trend</span>
                </div>
              </div>
              
              <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Interactive chart would be rendered here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connect to your charting library</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderForecastTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">7-Day Forecast</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {forecastData.map((day, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white mb-2">{day.day}</div>
                <div className="mb-3">{getWeatherIcon(day.condition)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="font-semibold">{day.high}°</div>
                  <div>{day.low}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Hourly Forecast</h3>
          
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4" style={{minWidth: '800px'}}>
              {Array.from({length: 24}, (_, i) => (
                <div key={i} className="flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center min-w-16">
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    {i === 0 ? 'Now' : `${i}:00`}
                  </div>
                  <div className="mb-2">
                    {getWeatherIcon(['sunny', 'cloudy', 'rainy'][i % 3])}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
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

  const renderAutocompleteTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Location Search</h3>
          
          <div className="relative">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a city or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>
            
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                {autocompleteResults
                  .filter(result => result.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((result, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(result);
                        // Handle selection
                      }}
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 text-left border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{result}</span>
                    </button>
                  ))
                }
              </div>
            )}
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Searches</h4>
            <div className="flex flex-wrap gap-2">
              {['Paris, France', 'Tokyo, Japan', 'Sydney, Australia', 'Berlin, Germany'].map((location, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Weather Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Comprehensive weather information at your fingertips</p>
        </div>

        {/* Main Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'current', label: 'Current', icon: Sun },
              { id: 'history', label: 'History', icon: Calendar },
              { id: 'forecast', label: 'Forecast', icon: TrendingUp },
              { id: 'autocomplete', label: 'Search', icon: Search }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {activeTab === 'current' && renderCurrentTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'forecast' && renderForecastTab()}
          {activeTab === 'autocomplete' && renderAutocompleteTab()}
        </div>
      </div>
    </div>
  );
};

export default App;