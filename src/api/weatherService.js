// src/api/weatherService.js
import apiClient from './config';

class WeatherService {
  // Get current weather by city name
  async getCurrentWeatherByCity(cityName) {
    try {
      const response = await apiClient.get('/current', {
        params: {
          query: cityName
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get weather for ${cityName}: ${error.message}`);
    }
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoordinates(latitude, longitude) {
    try {
      const response = await apiClient.get('/current', {
        params: {
          query: `${latitude},${longitude}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get weather for coordinates ${latitude},${longitude}: ${error.message}`);
    }
  }

  // Get current weather for multiple locations
  async getCurrentWeatherMultiple(locations) {
    try {
      const promises = locations.map(location => {
        if (typeof location === 'string') {
          return this.getCurrentWeatherByCity(location);
        } else if (location.lat && location.lon) {
          return this.getCurrentWeatherByCoordinates(location.lat, location.lon);
        }
        throw new Error(`Invalid location format: ${JSON.stringify(location)}`);
      });

      const results = await Promise.allSettled(promises);
      
      return results.map((result, index) => ({
        location: locations[index],
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
      }));
    } catch (error) {
      throw new Error(`Failed to get weather for multiple locations: ${error.message}`);
    }
  }

  // Get historical weather data
  async getHistoricalWeather(location, date) {
    try {
      const response = await apiClient.get('/historical', {
        params: {
          query: location,
          historical_date: date // Format: YYYY-MM-DD
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get historical weather: ${error.message}`);
    }
  }

  // Get historical weather for date range
  async getHistoricalWeatherRange(location, startDate, endDate) {
    try {
      const response = await apiClient.get('/historical', {
        params: {
          query: location,
          historical_date_start: startDate,
          historical_date_end: endDate
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get historical weather range: ${error.message}`);
    }
  }

  // Get hourly historical data
  async getHourlyHistoricalWeather(location, date, hour) {
    try {
      const response = await apiClient.get('/historical', {
        params: {
          query: location,
          historical_date: date,
          hourly: 1,
          hour: hour // 0-23
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get hourly historical weather: ${error.message}`);
    }
  }

  // Location autocomplete/search
  async searchLocation(query) {
    try {
      const response = await apiClient.get('/autocomplete', {
        params: {
          query: query
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search location: ${error.message}`);
    }
  }

  // Get current location weather using browser geolocation
  async getCurrentLocationWeather() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weather = await this.getCurrentWeatherByCoordinates(latitude, longitude);
            resolve(weather);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    });
  }

  // Utility method to format weather data
  formatWeatherData(data) {
    if (!data || !data.current) return null;

    const { current, location } = data;
    
    return {
      location: {
        name: location?.name,
        region: location?.region,
        country: location?.country,
        lat: location?.lat,
        lon: location?.lon,
        timezone: location?.timezone_id,
        localtime: location?.localtime
      },
      current: {
        temperature: current?.temperature,
        feelsLike: current?.feelslike,
        condition: current?.weather_descriptions?.[0],
        icon: current?.weather_icons?.[0],
        humidity: current?.humidity,
        windSpeed: current?.wind_speed,
        windDirection: current?.wind_dir,
        pressure: current?.pressure,
        visibility: current?.visibility,
        uvIndex: current?.uv_index,
        cloudcover: current?.cloudcover
      },
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export default new WeatherService();