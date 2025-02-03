// App.js
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

// Welcome Page Component
const WelcomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ABAC Navigator</h1>
          <p className="text-gray-600">Find your way around campus easily</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => onNavigate('map')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium
                     hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

// Map Page Component
const MapPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <h1>Map Page</h1>
      {/* Your map content will go here */}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');

  return (
    <div>
      {currentPage === 'welcome' ? (
        <WelcomePage onNavigate={() => setCurrentPage('map')} />
      ) : (
        <MapPage />
      )}
    </div>
  );
};

export default App;