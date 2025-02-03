import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const WelcomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="bg-red-600 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <MapPin className="w-16 h-16 text-white mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Campus Navigator
        </h1>
        <p className="text-white mb-8">
          Find your way around campus with our interactive map
        </p>
        <button
          onClick={onNavigate}
          className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold 
                   hover:bg-gray-100 transition-colors duration-200"
        >
          Get Started
          <Navigation className="inline-block ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;