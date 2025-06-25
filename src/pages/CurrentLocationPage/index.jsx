// src/pages/Current/CurrentLocation.js - Updated with API integration
import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge, RefreshCw } from 'lucide-react';
import { useCurrentLocationWeather } from '../../hooks/useWeather';

const CurrentLocation = () => {
  const { data, loading, error, refetch } = useCurrentLocationWeather();

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin mr-3" />
        <span className="text-xl">Getting your location weather...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white">
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-red-200">Error</h3>
          <p className="text-red-300">{error}</p>
          <button
            onClick={refetch}
            className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-white text-center py-8">
        <p className="text-gray-400">No weather data available</p>
        <button
          onClick={refetch}
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  const { location, current } = data;

  return (
    <div className="text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className="w-8 h-8 text-green-500" />
          <div>
            <h1 className="text-3xl font-bold">Current Location</h1>
            <p className="text-gray-400">
              {location.name}, {location.region}, {location.country}
            </p>
          </div>
        </div>
        <button
          onClick={refetch}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          title="Refresh weather data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-light mb-2">
              {current.temperature}°C
            </div>
            <div className="text-xl text-blue-100">
              {current.condition}
            </div>
            <div className="text-blue-200 mt-2">
              Feels like {current.feelsLike}°C
            </div>
          </div>
          <div className="text-right">
            {current.icon ? (
              <img src={current.icon} alt={current.condition} className="w-20 h-20" />
            ) : (
              <div className="text-8xl">🌤️</div>
            )}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Droplets className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-2xl font-semibold">{current.humidity}%</div>
              <div className="text-sm text-gray-400">Humidity</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Wind className="w-6 h-6 text-green-400" />
            <div>
              <div className="text-2xl font-semibold">{current.windSpeed} km/h</div>
              <div className="text-sm text-gray-400">Wind Speed</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-purple-400" />
            <div>
              <div className="text-2xl font-semibold">{current.visibility} km</div>
              <div className="text-sm text-gray-400">Visibility</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Gauge className="w-6 h-6 text-yellow-400" />
            <div>
              <div className="text-2xl font-semibold">{current.pressure} hPa</div>
              <div className="text-sm text-gray-400">Pressure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Location Details</h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>Coordinates:</span>
            <span>{location.lat}°N, {location.lon}°E</span>
          </div>
          <div className="flex justify-between">
            <span>Time Zone:</span>
            <span>{location.timezone}</span>
          </div>
          <div className="flex justify-between">
            <span>Local Time:</span>
            <span>{location.localtime}</span>
          </div>
          <div className="flex justify-between">
            <span>UV Index:</span>
            <span className={`${current.uvIndex > 6 ? 'text-orange-400' : 'text-green-400'}`}>
              {current.uvIndex} ({current.uvIndex > 6 ? 'High' : 'Moderate'})
            </span>
          </div>
          <div className="flex justify-between">
            <span>Wind Direction:</span>
            <span>{current.windDirection}</span>
          </div>
          <div className="flex justify-between">
            <span>Cloud Cover:</span>
            <span>{current.cloudcover}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLocation;