// src/hooks/useWeather.js
import { useState, useEffect, useCallback } from 'react';
import WeatherService from '../api/weatherService';

// Hook for current weather by city
export const useCurrentWeather = (cityName, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city = cityName) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WeatherService.getCurrentWeatherByCity(city);
      const formattedData = WeatherService.formatWeatherData(result);
      setData(formattedData);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    if (autoFetch && cityName) {
      fetchWeather();
    }
  }, [cityName, autoFetch, fetchWeather]);

  return { data, loading, error, refetch: fetchWeather };
};

// Hook for current location weather
export const useCurrentLocationWeather = (autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentLocationWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await WeatherService.getCurrentLocationWeather();
      const formattedData = WeatherService.formatWeatherData(result);
      setData(formattedData);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchCurrentLocationWeather();
    }
  }, [autoFetch, fetchCurrentLocationWeather]);

  return { data, loading, error, refetch: fetchCurrentLocationWeather };
};

// Hook for multiple locations weather
export const useMultipleLocationsWeather = (locations, autoFetch = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMultipleWeather = useCallback(async (locationList = locations) => {
    if (!locationList || locationList.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await WeatherService.getCurrentWeatherMultiple(locationList);
      const formattedData = results.map(result => ({
        location: result.location,
        data: result.data ? WeatherService.formatWeatherData(result.data) : null,
        error: result.error
      }));
      setData(formattedData);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [locations]);

  useEffect(() => {
    if (autoFetch && locations && locations.length > 0) {
      fetchMultipleWeather();
    }
  }, [locations, autoFetch, fetchMultipleWeather]);

  return { data, loading, error, refetch: fetchMultipleWeather };
};

// Hook for historical weather
export const useHistoricalWeather = (location, date, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistoricalWeather = useCallback(async (loc = location, dt = date) => {
    if (!loc || !dt) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WeatherService.getHistoricalWeather(loc, dt);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [location, date]);

  useEffect(() => {
    if (autoFetch && location && date) {
      fetchHistoricalWeather();
    }
  }, [location, date, autoFetch, fetchHistoricalWeather]);

  return { data, loading, error, refetch: fetchHistoricalWeather };
};

// Enhanced hook for location search with smart error handling
export const useLocationSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasApiAccess, setHasApiAccess] = useState(true); // Track API access status

  const searchLocation = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    // Don't search if we know API access is restricted
    if (!hasApiAccess) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WeatherService.searchLocation(query);
      setResults(result.results || []);
      setHasApiAccess(true); // Reset if successful
    } catch (err) {
      // Check if it's an API access restriction error
      if (err.message.includes('Access Restricted') || err.message.includes('Subscription Plan')) {
        setHasApiAccess(false);
        setError(null); // Don't set error for API restriction
      } else {
        setError(err.message);
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [hasApiAccess]);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { 
    results, 
    loading, 
    error, 
    hasApiAccess, 
    searchLocation, 
    clearResults 
  };
};

// Enhanced hook for smart location identifiers with integrated search logic
export const useLocationIdentifiers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Get hooks
  const locationSearch = useLocationSearch();
  const weather = useCurrentWeather(selectedLocation, false);

  // Handle search input changes
  const handleSearchInputChange = useCallback((value) => {
    setSearchQuery(value);
    
    // Clear results and reset state when input is cleared
    if (value.length === 0) {
      locationSearch.clearResults();
      setShowSearchResults(false);
      setHasSearched(false);
    }
  }, [locationSearch]);

  // Handle form submission
  const handleSearchSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    setSelectedLocation(searchQuery.trim());
    setShowSearchResults(false);

    // Try location search if API access is available
    if (locationSearch.hasApiAccess) {
      await locationSearch.searchLocation(searchQuery.trim());
      setShowSearchResults(locationSearch.results.length > 0);
    }

    // Always try to get weather data
    weather.refetch(searchQuery.trim());
  }, [searchQuery, locationSearch, weather]);

  // Handle location selection from dropdown
  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location);
    setSearchQuery(location);
    setShowSearchResults(false);
    setHasSearched(true);
    weather.refetch(location);
  }, [weather]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    if (selectedLocation) {
      weather.refetch(selectedLocation);
    }
  }, [selectedLocation, weather]);

  // Determine if we should show API restriction warning
  const shouldShowApiWarning = !locationSearch.hasApiAccess && hasSearched && !weather.data && !weather.loading;

  // Format coordinates helper
  const formatCoordinates = useCallback((lat, lon) => {
    const formatCoord = (coord, isLat) => {
      const abs = Math.abs(coord);
      const direction = isLat ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
      return `${abs.toFixed(4)}°${direction}`;
    };
    
    return `${formatCoord(lat, true)}, ${formatCoord(lon, false)}`;
  }, []);

  // Get timezone offset helper
  const getTimezoneOffset = useCallback((timezone) => {
    if (!timezone) return 'Unknown';
    
    try {
      const now = new Date();
      const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
      const targetTime = new Date(utc.toLocaleString("en-US", {timeZone: timezone}));
      const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset);
      const minutes = Math.round((absOffset - hours) * 60);
      
      return `UTC${sign}${hours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''}`;
    } catch (error) {
      return 'Unknown';
    }
  }, []);

  return {
    // State
    searchQuery,
    selectedLocation,
    showSearchResults,
    hasSearched,
    
    // Location search data
    searchResults: locationSearch.results,
    searchLoading: locationSearch.loading,
    searchError: locationSearch.error,
    hasApiAccess: locationSearch.hasApiAccess,
    
    // Weather data
    weatherData: weather.data,
    weatherLoading: weather.loading,
    weatherError: weather.error,
    
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
    
    // Direct actions
    copyCoordinates: (lat, lon) => navigator.clipboard.writeText(`${lat},${lon}`)
  };
};