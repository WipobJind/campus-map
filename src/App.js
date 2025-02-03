import React, { useState } from 'react';
import { MapPin, Navigation, Info, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: '100vw'
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100
    }
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: {
      duration: 0.3
    }
  }
};

// Welcome Page with Animation
const WelcomePage = ({ onNavigate }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
    >
      {/* Your existing Welcome page content */}
    </motion.div>
  );
};

// Location Page with Animation
const LocationPage = ({ onNavigate, onLocationChoice }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
    >
      {/* Your existing Location page content */}
    </motion.div>
  );
};

// Map Controller Component
const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    const bounds = L.latLngBounds([
      [13.610731, 100.831681],
      [13.616943, 100.841681]
    ]);
    map.setMaxBounds(bounds);
    map.setMinZoom(15);
    map.setMaxZoom(20);
  }, [map]);

  return null;
};

// Map Page with Animation and Full Functionality
const MapPage = ({ userLocation }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const center = {
    lat: 13.611984684699049,
    lng: 100.8375817412228
  };

  // Filter buildings based on search
  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (building.shortName && building.shortName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-white relative"
    >
      {/* Search Panel */}
      <div className="absolute top-4 left-4 z-[1000] w-80">
        <div className="bg-white rounded-lg shadow-xl p-4">
          <input
            type="text"
            placeholder="Search buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          
          {searchTerm && (
            <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  className="w-full text-left p-3 hover:bg-gray-50"
                  onClick={() => setSelectedBuilding(building)}
                >
                  {building.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="h-screen">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={17}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController />
          
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {selectedBuilding && (
            <Marker position={selectedBuilding.position}>
              <Popup>{selectedBuilding.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </motion.div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [userLocation, setUserLocation] = useState(null);

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'welcome' && (
        <WelcomePage key="welcome" onNavigate={setCurrentPage} />
      )}
      {currentPage === 'location' && (
        <LocationPage 
          key="location"
          onNavigate={setCurrentPage}
          onLocationChoice={setUserLocation}
        />
      )}
      {currentPage === 'map' && (
        <MapPage key="map" userLocation={userLocation} />
      )}
    </AnimatePresence>
  );
};

export default App;