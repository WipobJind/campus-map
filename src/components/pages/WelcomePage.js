import React from 'react';
import { MapPin, Navigation, Building2, Clock } from 'lucide-react';

const WelcomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-10">
        {/* Logo and Title */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="bg-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg 
                          transform hover:scale-105 transition-transform duration-300">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg animate-pulse">
              <Navigation className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">ABAC Navigator</h1>
            <p className="text-xl text-gray-600 font-light">Discover Your Way Around</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">Why use ABAC Navigator?</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Feature 1 */}
            <div className="bg-red-50 rounded-xl p-4 text-center hover:bg-red-100 transition-colors duration-200">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-medium text-gray-900">Real-Time</h3>
              <p className="text-sm text-gray-600 mt-1">Live location tracking</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors duration-200">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Buildings</h3>
              <p className="text-sm text-gray-600 mt-1">Easy building search</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors duration-200">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Navigation className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Routes</h3>
              <p className="text-sm text-gray-600 mt-1">Optimal path finding</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors duration-200">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Time-Saving</h3>
              <p className="text-sm text-gray-600 mt-1">Quick navigation</p>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('location')}
            className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-medium
                     hover:bg-red-700 transform hover:scale-105 transition-all duration-200
                     shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Get Started</span>
            <Navigation className="w-5 h-5" />
          </button>

          <p className="text-center text-sm text-gray-500">
            Navigate ABAC campus like never before
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;