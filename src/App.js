import React, { useState } from 'react';
import MapPage from './components/pages/MapPage';
import { MapPin, Navigation } from 'lucide-react';

const WelcomePage = ({ onNavigate }) => {
 return (
   <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-6">
     <div className="max-w-md w-full space-y-10">
       <div className="text-center space-y-6">
         <div className="relative inline-block">
           <div className="bg-red-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg transform hover:scale-105 transition-transform duration-300">
             <MapPin className="w-12 h-12 text-white" />
           </div>
         </div>

         <div className="space-y-3">
           <h1 className="text-4xl font-bold text-gray-900">ABAC Navigator</h1>
           <p className="text-xl text-gray-600 font-light">Discover Your Way Around</p>
         </div>
       </div>

       <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
         <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">Why use ABAC Navigator?</h2>
         
         <div className="grid grid-cols-2 gap-4">
           <div className="bg-red-50 rounded-xl p-4 text-center hover:bg-red-100 transition-colors duration-200 transform hover:scale-105">
             <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
               <MapPin className="w-6 h-6 text-red-600" />
             </div>
             <h3 className="font-medium text-gray-900">Real-Time</h3>
             <p className="text-sm text-gray-600 mt-1">Live location tracking</p>
           </div>

           <div className="bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors duration-200 transform hover:scale-105">
             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
               <MapPin className="w-6 h-6 text-blue-600" />
             </div>
             <h3 className="font-medium text-gray-900">Buildings</h3>
             <p className="text-sm text-gray-600 mt-1">Easy building search</p>
           </div>

           <div className="bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors duration-200 transform hover:scale-105">
             <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
               <MapPin className="w-6 h-6 text-green-600" />
             </div>
             <h3 className="font-medium text-gray-900">Routes</h3>
             <p className="text-sm text-gray-600 mt-1">Optimal path finding</p>
           </div>

           <div className="bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors duration-200 transform hover:scale-105">
             <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
               <MapPin className="w-6 h-6 text-purple-600" />
             </div>
             <h3 className="font-medium text-gray-900">Time-Saving</h3>
             <p className="text-sm text-gray-600 mt-1">Quick navigation</p>
           </div>
         </div>
       </div>

       <button
         onClick={onNavigate}
         className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-medium
                  hover:bg-red-700 transform hover:scale-105 transition-all duration-200
                  shadow-lg flex items-center justify-center space-x-2"
       >
         <span>Get Started</span>
         <MapPin className="w-5 h-5" />
       </button>
     </div>
   </div>
 );
};

const LocationPage = ({ onLocationChoice }) => {
 return (
   <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-6">
     <div className="max-w-md w-full">
       <div className="bg-white rounded-xl shadow-lg p-8">
         <div className="text-center mb-8">
           <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
             <Navigation className="w-10 h-10 text-red-600" />
           </div>
           <h2 className="text-3xl font-bold text-gray-900 mb-4">Enable Location</h2>
           <p className="text-gray-600 text-lg">
             Allow access to see your position and get directions to buildings
           </p>
         </div>

         <div className="space-y-4">
           <button
             onClick={() => onLocationChoice(true)}
             className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-medium
                      hover:bg-red-700 transform hover:scale-105 transition-all duration-200
                      shadow-lg flex items-center justify-center"
           >
             <Navigation className="w-5 h-5 mr-2" />
             Enable Location Services
           </button>
           
           <button
             onClick={() => onLocationChoice(false)}
             className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-lg font-medium
                      hover:bg-gray-200 transform hover:scale-105 transition-all duration-200
                      shadow flex items-center justify-center"
           >
             Skip for Now
           </button>
         </div>

         <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start">
           <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
             <MapPin className="w-6 h-6 text-blue-600" />
           </div>
           <p className="text-sm text-blue-800">
             Your location is only used to show your position on the map and calculate directions.
             It helps you navigate the campus more effectively.
           </p>
         </div>
       </div>
     </div>
   </div>
 );
};

const App = () => {
 const [currentPage, setCurrentPage] = useState('welcome');
 const [userLocation, setUserLocation] = useState(null);

 const handleLocationChoice = (enableLocation) => {
   if (enableLocation && 'geolocation' in navigator) {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         setUserLocation({
           lat: position.coords.latitude,
           lng: position.coords.longitude
         });
         setCurrentPage('map');
       },
       () => setCurrentPage('map')
     );
   } else {
     setCurrentPage('map');
   }
 };

 const pages = {
   welcome: <WelcomePage onNavigate={() => setCurrentPage('location')} />,
   location: <LocationPage onLocationChoice={handleLocationChoice} />,
   map: <MapPage userLocation={userLocation} />
 };

 return pages[currentPage];
};

export default App;
