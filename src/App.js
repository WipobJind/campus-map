// src/App.js
import React, { useState } from 'react';
import WelcomePage from './components/pages/WelcomePage';
import MapPage from './components/pages/MapPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');

  // In App.js, modify the main div:
return (
  <div className="bg-gray-100 min-h-screen">
    {currentPage === 'welcome' ? (
      <WelcomePage onNavigate={() => setCurrentPage('map')} />
    ) : (
      <MapPage />
    )}
  </div>
);
};

export default App;