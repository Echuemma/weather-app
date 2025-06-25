import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import WeatherCard from '../../components/WeatherCard';
import HourlyForecast from '../../components/HourlyForecast';
import TodaysHighlights from '../../components/TodaysHighlights';
import SunTimes from '../../components/SunTimes';
import OtherCities from '../../components/OtherCities';

// Import your page components
import CurrentLocation from '../CurrentLocationPage';
import MultipleLocations from '../MultipleLocationsPage';
import LocationIdentifiers from '../LocationIdentifiersPage';
import HistoricalData from '../HistoricalDataPage';
import HourlyHistorical from '../HourlyHistoricalPage';
import TimeSeries from '../TimeSeriesPage';
import ForecastData from '../ForecastDataPage';
// import AutocompleteSearch from '../Autocomplete/AutocompleteSearch';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Updated renderPage function with actual components
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <WeatherCard />
              <HourlyForecast />
              <SunTimes />
            </div>
            <div className="lg:col-span-2">
              <TodaysHighlights />
              <OtherCities />
            </div>
          </div>
        );

      case 'current-location':
        return <CurrentLocation />;

      case 'multiple-locations':
        return <MultipleLocations />;

      case 'location-identifiers':
        return <LocationIdentifiers />;

      case 'historical-data':
        return <HistoricalData />;

      case 'hourly-historical':
        return <HourlyHistorical />;

      case 'time-series':
        return <TimeSeries />;

      case 'forecast-data':
        return <ForecastData />;

      // case 'autocomplete':
      //   return <AutocompleteSearch />;

      default:
        return <div className="text-white text-lg">Page Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header sidebarOpen={sidebarOpen} />

        <div className="px-6 pb-6">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;