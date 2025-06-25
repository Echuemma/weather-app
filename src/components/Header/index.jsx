import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Header = ({ sidebarOpen }) => (
  <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-6`}>
    <div className="flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search City"
          className="bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
        <div className="w-8 h-8 bg-green-600 rounded-full"></div>
        <span className="text-white">Saugat Mhrzn</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
);

export default Header;
