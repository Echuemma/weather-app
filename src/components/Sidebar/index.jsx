import React, { useState } from 'react';
import { 
  Menu, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Search,
  ChevronDown,
  ChevronRight,
  Navigation,
  MapPinned,
  Hash,
  Database,
  BarChart3,
  Calendar,
  Zap,
  Home
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, currentPage, setCurrentPage }) => {
  const [expandedSections, setExpandedSections] = useState({
    current: true,
    history: false,
    forecast: false,
    autocomplete: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigationStructure = [
    // Add Dashboard home page
    {
      id: 'dashboard',
      icon: Home,
      label: 'Dashboard',
      page: 'dashboard',
      isDirectPage: true
    },
    {
      id: 'current',
      icon: MapPin,
      label: 'Current',
      children: [
        { icon: Navigation, label: 'Current location', page: 'current-location' },
        { icon: MapPinned, label: 'Multiple current locations', page: 'multiple-locations' },
        { icon: Hash, label: 'Location identifiers', page: 'location-identifiers' }
      ]
    },
    {
      id: 'history',
      icon: Clock,
      label: 'History',
      children: [
        { icon: Database, label: 'Historical data', page: 'historical-data' },
        { icon: BarChart3, label: 'Hourly historical data', page: 'hourly-historical' },
        { icon: TrendingUp, label: 'Historical time series', page: 'time-series' }
      ]
    },
    {
      id: 'forecast',
      icon: Zap,
      label: 'Forecast data',
      children: [
        { icon: Calendar, label: 'Forecast data', page: 'forecast-data' }
      ]
    },
    {
      id: 'autocomplete',
      icon: Search,
      label: 'Auto complete/location lookup',
      children: [
        { icon: Search, label: 'Autocomplete', page: 'autocomplete' }
      ]
    }
  ];

  const handleNavigation = (page) => {
    console.log('Navigating to:', page); // Debug log
    setCurrentPage(page);
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 transition-all duration-300 z-10 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-8 hover:bg-green-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <nav className="space-y-1">
          {navigationStructure.map((section) => (
            <div key={section.id}>
              {/* Handle Direct Pages (like Dashboard) */}
              {section.isDirectPage ? (
                <div
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 ${
                    currentPage === section.page ? 'bg-green-600' : ''
                  }`}
                  onClick={() => handleNavigation(section.page)}
                >
                  <section.icon className="w-5 h-5 text-white flex-shrink-0" />
                  {isOpen && (
                    <span className="ml-3 text-white font-small flex-1">
                      {section.label}
                    </span>
                  )}
                </div>
              ) : (
                /* Handle Expandable Sections */
                <>
                  <div
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 ${
                      expandedSections[section.id] ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => isOpen && toggleSection(section.id)}
                  >
                    <section.icon className="w-5 h-5 text-white flex-shrink-0" />
                    {isOpen && (
                      <>
                        <span className="ml-3 text-white font-small flex-1">
                          {section.label}
                        </span>
                        {section.children && (
                          <div className="ml-2">
                            {expandedSections[section.id] ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Child Items */}
                  {isOpen && expandedSections[section.id] && section.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {section.children.map((child, index) => (
                        <div
                          key={index}
                          onClick={() => handleNavigation(child.page)}
                          className={`flex items-center p-2 pl-4 rounded-lg cursor-pointer transition-colors text-sm ${
                            currentPage === child.page 
                              ? 'bg-green-600 text-white' 
                              : 'hover:bg-gray-700 text-gray-300'
                          }`}
                        >
                          <child.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="ml-3">
                            {child.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;