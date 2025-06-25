import React from 'react';
import { Search, MapPin, Clock, Globe, Navigation, RefreshCw, AlertCircle } from 'lucide-react';
import { useLocationIdentifiers } from '../../hooks/useWeather';

const LocationIdentifiersPage = () => {
  const {
    // State
    searchQuery,
    selectedLocation,
    showSearchResults,

    // Data
    searchResults,
    searchLoading,
    weatherData,
    weatherLoading,
    weatherError,

    // Computed states
    shouldShowApiWarning,

    // Handlers
    handleSearchInputChange,
    handleSearchSubmit,
    handleLocationSelect,
    handleRefresh,

    // Utilities
    formatCoordinates,
    getTimezoneOffset,
    copyCoordinates
  } = useLocationIdentifiers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Location Identifiers</h2>
        {selectedLocation && (
          <button
            onClick={handleRefresh}
            disabled={weatherLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${weatherLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {/* Search Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Search Location
        </h3>

        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder="Enter city name, coordinates, or address..."
                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSelect(result.name)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-600 transition-colors text-white border-b border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium">{result.name}</div>
                      {result.region && (
                        <div className="text-sm text-gray-400">
                          {result.region}, {result.country}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!searchQuery.trim() || weatherLoading}
              className="px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>

      {shouldShowApiWarning && (
        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-yellow-200">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Location Search Limited</span>
          </div>
          <p className="text-yellow-300 mt-2">
            Location search suggestions are not available with your current plan, but you can still search for weather data directly.
          </p>
        </div>
      )}

      {/* Weather Error */}
      {weatherError && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-200">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Weather Data Error</span>
          </div>
          <p className="text-red-300 mt-2">{weatherError}</p>
        </div>
      )}

      {weatherLoading && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-center space-x-3 text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="text-lg">Loading location data...</span>
          </div>
        </div>
      )}

      {weatherData && !weatherLoading && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-500" />
            Location Information
          </h3>


          <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-xl font-bold text-white">
              {weatherData.location.name}
            </h4>
            <p className="text-gray-300">
              {weatherData.location.region && `${weatherData.location.region}, `}
              {weatherData.location.country}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-300">
                <Navigation className="w-4 h-4 mr-2" />
                Coordinates
              </label>
              <p className="text-lg text-white font-mono">
                {formatCoordinates(weatherData.location.lat, weatherData.location.lon)}
              </p>
              <p className="text-sm text-gray-400">
                Lat: {weatherData.location.lat}, Lon: {weatherData.location.lon}
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-300">
                <Clock className="w-4 h-4 mr-2" />
                Time Zone
              </label>
              <p className="text-lg text-white">
                {weatherData.location.timezone || 'Unknown'}
              </p>
              <p className="text-sm text-gray-400">
                {getTimezoneOffset(weatherData.location.timezone)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-300">
                <Globe className="w-4 h-4 mr-2" />
                Local Time
              </label>
              <p className="text-lg text-white">
                {weatherData.location.localtime || 'Unknown'}
              </p>
              <p className="text-sm text-gray-400">
                Current local time
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Current Temperature
              </label>
              <p className="text-lg text-white">
                {weatherData.current.temperature}°C
              </p>
              <p className="text-sm text-gray-400">
                {weatherData.current.condition}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Humidity & Pressure
              </label>
              <p className="text-lg text-white">
                {weatherData.current.humidity}% | {weatherData.current.pressure} hPa
              </p>
              <p className="text-sm text-gray-400">
                Current conditions
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Wind Information
              </label>
              <p className="text-lg text-white">
                {weatherData.current.windSpeed} km/h {weatherData.current.windDirection}
              </p>
              <p className="text-sm text-gray-400">
                Speed and direction
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Raw Coordinates (for API usage)
            </h4>
            <div className="flex items-center space-x-4">
              <code className="text-sm text-green-400 bg-gray-800 px-3 py-1 rounded">
                {weatherData.location.lat},{weatherData.location.lon}
              </code>
              <button
                onClick={() => copyCoordinates(weatherData.location.lat, weatherData.location.lon)}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Copy to clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Usage Examples</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-300">Search by city:</span>
            <code className="ml-2 text-green-400 bg-gray-700 px-2 py-1 rounded">New York</code>
          </div>
          <div>
            <span className="text-gray-300">Search by coordinates:</span>
            <code className="ml-2 text-green-400 bg-gray-700 px-2 py-1 rounded">40.7128,-74.0060</code>
          </div>
          <div>
            <span className="text-gray-300">Search with state/country:</span>
            <code className="ml-2 text-green-400 bg-gray-700 px-2 py-1 rounded">Paris, France</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationIdentifiersPage;