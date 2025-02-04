import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { Search, Navigation, Clock, Compass, Building2, BookOpen, Home, Activity, List, X, } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Add your buildings array here at the top
const buildings = [
  {
    id: 1,
    name: "Sala Chaluramuk Phaisit",
    shortName: "Sala",
    category: "others",
    position: [13.611731210497892, 100.8386970437117]
  },
  {
    id: 2,
    name: "The Cathedral of Learning (CL)",
    shortName: "CL",
    category: "facilities",
    position: [13.611984684699049, 100.8375817412228]
  },
  {
    id: 3,
    name: "St. Raphael's Hall (SR)",
    shortName: "SR",
    category: "academic",
    position: [13.61121549148576, 100.83755185188707]
  },
  {
    id: 4,
    name: "St. Michael's Hall (SM)",
    shortName: "SM",
    category: "academic",
    position: [13.612124492354807, 100.83703521755558]
  },
  {
    id: 5,
    name: "St. Gabriel's Hall (SG)",
    shortName: "SG",
    category: "academic",
    position: [13.612641414881224, 100.83798191811387]
  },
  {
    id: 6,
    name: "St. Louis Marie de Montfort's Church",
    category: "others",
    position: [13.61304114862705, 100.83969710932935]
  },
  {
    id: 7,
    name: "John XXIII Conference Center",
    category: "others",
    position: [13.61271268417426, 100.84046958551204]
  },
  {
    id: 8,
    name: "The Crystal Restaurant by Chez Jean Pierre",
    category: "others",
    position: [13.612295713193534, 100.84076308401379]
  },
  {
    id: 9,
    name: "Srisakdi Charmonman IT Building",
    shortName: "IT",
    category: "academic",
    position: [13.611788861249442, 100.83639333488566]
  },
  {
    id: 10,
    name: "Car Park Building",
    category: "facilities",
    position: [13.611825595188922, 100.83610771404115]
  },
  {
    id: 11,
    name: "Montfort Del Rosario School of Architecture and Design (AR)",
    shortName: "AR",
    category: "academic",
    position: [13.611985898450433, 100.8355487369979]
  },
  {
    id: 12,
    name: "Albert Laurence School of Communication Arts (CA)",
    shortName: "CA",
    category: "academic",
    position: [13.61217733111064, 100.83520486322418]
  },
  {
    id: 13,
    name: "Communication Arts Studio (CA Studio)",
    shortName: "CA Studio",
    category: "academic",
    position: [13.612144508147054, 100.83490430838472]
  },
  {
    id: 14,
    name: "Martin de Tours School of Management (MSM)",
    shortName: "MSM",
    category: "academic",
    position: [13.612812761683529, 100.83670977385692]
  },
  {
    id: 15,
    name: "Martin de Tours School of Economics (MSE)",
    shortName: "MSE",
    category: "academic",
    position: [13.612967664662046, 100.83630316810486]
  },
  {
    id: 16,
    name: "Vincent Mary School of Engineering and Science and Technology (VMES)",
    shortName: "VMES",
    category: "academic",
    position: [13.613048771088446, 100.83586694824743]
  },
  {
    id: 17,
    name: "School of Medicine (SLM)",
    shortName: "SLM",
    category: "academic",
    position: [13.613167335591415, 100.83540847832656]
  },
  {
    id: 18,
    name: "AU Bus Stand",
    category: "facilities",
    position: [13.613497268377435, 100.83674601878873]
  },
  {
    id: 19,
    name: "Pan Am International Flight Training Center - Thailand",
    category: "academic",
    position: [13.613462678313748, 100.8356707903892]
  },
  {
    id: 20,
    name: "President House",
    category: "residence",
    position: [13.612571751176095, 100.83434365353676]
  },
  {
    id: 21,
    name: "AU Mall/Cafeteria",
    category: "facilities",
    position: [13.612580840817737, 100.83333864406674]
  },
  {
    id: 22,
    name: "Tennis Court",
    category: "sports",
    position: [13.612566232313437, 100.83263821908521]
  },
  {
    id: 23,
    name: "Clock Tower & Museum",
    category: "others",
    position: [13.613256533173077, 100.83317122744039]
  },
  {
    id: 24,
    name: "King Solomon Residence Hall",
    category: "residence",
    position: [13.613141701422121, 100.83168097880481]
  },
  {
    id: 25,
    name: "King David Residence Hall",
    category: "residence",
    position: [13.61379348264587, 100.8316218729078]
  },
  {
    id: 26,
    name: "Queen of Sheba Residence Hall",
    category: "residence",
    position: [13.614146741037626, 100.8325533868695]
  },
  {
    id: 27,
    name: "Assumption University's Aquatic Center",
    category: "sports",
    position: [13.614778131952823, 100.83376856987536]
  },
  {
    id: 28,
    name: "John Paul II Sports Center",
    category: "sports",
    position: [13.615573299189698, 100.83378292355393]
  },
  {
    id: 29,
    name: "Indoor Swimming Pool (25m)",
    category: "sports",
    position: [13.615763263627494, 100.83307770679842]
  },
  {
    id: 30,
    name: "Indoor Badminton Court",
    category: "sports",
    position: [13.615936478401839, 100.83357710836876]
  },
  {
    id: 31,
    name: "Indoor Tennis Court",
    category: "sports",
    position: [13.615943851621868, 100.83388910038524]
  },
  {
    id: 32,
    name: "Car Park Area",
    category: "facilities",
    position: [13.615327558680702, 100.83437013001915]
  },
];

  // Add your other buildings here with their categories


// Building categories
const buildingCategories = {
  academic: {
    name: "Academic Buildings",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600"
  },
  facilities: {
    name: "Facilities",
    icon: <Building2 className="w-5 h-5" />,
    color: "bg-green-100 text-green-600"
  },
  residence: {
    name: "Residence Halls",
    icon: <Home className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  sports: {
    name: "Sports Facilities",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-600"
  },
  others: {
    name: "Others",
    icon: <Navigation className="w-5 h-5" />,
    color: "bg-red-100 text-red-600"
  }
};

// Create custom icons
const createCustomIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = createCustomIcon('blue');
const destinationIcon = createCustomIcon('red');

// Buildings List Panel Component
const BuildingsListPanel = ({ isOpen, onClose, onSelectBuilding }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categorizedBuildings = buildings.reduce((acc, building) => {
    if (!acc[building.category]) {
      acc[building.category] = [];
    }
    acc[building.category].push(building);
    return acc;
  }, {});

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[1000] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Campus Buildings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(buildingCategories).map(([key, category]) => (
            <div key={key}>
              <button
                className={`w-full flex items-center space-x-2 p-2 rounded-lg ${
                  selectedCategory === key ? category.color : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              >
                <div className={`p-2 rounded-full ${category.color}`}>
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
              </button>

              {selectedCategory === key && categorizedBuildings[key] && (
                <div className="mt-2 ml-4 space-y-2">
                  {categorizedBuildings[key].map(building => (
                    <button
                      key={building.id}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded-lg"
                      onClick={() => onSelectBuilding(building)}
                    >
                      <div className="font-medium text-gray-800">{building.name}</div>
                      {building.shortName && (
                        <div className="text-sm text-gray-500">{building.shortName}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Walking Route Component
const WalkingRoute = ({ userLocation, destination }) => {
  const [routePath, setRoutePath] = useState([]);
  const map = useMap();

  useEffect(() => {
    const fetchRoute = async () => {
      if (!userLocation || !destination) return;

      try {
        const response = await fetch(
          `https://graphhopper.com/api/1/route?` +
          `point=${userLocation.lat},${userLocation.lng}&` +
          `point=${destination[0]},${destination[1]}&` +
          `vehicle=foot&` +
          `points_encoded=false&` +
          `key=56cda963-aaf0-4689-8364-09ee64d741d5`
        );

        const data = await response.json();
        if (data.paths && data.paths[0]) {
          const coordinates = data.paths[0].points.coordinates.map(point => [point[1], point[0]]);
          setRoutePath(coordinates);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, [userLocation, destination, map]);

  return routePath.length > 0 ? (
    <Polyline
      positions={routePath}
      color="#dc2626"
      weight={4}
      opacity={0.8}
    />
  ) : null;
};

// Route Info Component
const RouteInfo = ({ userLocation, destination }) => {
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    const fetchRouteInfo = async () => {
      if (!userLocation || !destination) return;

      try {
        const response = await fetch(
          `https://graphhopper.com/api/1/route?` +
          `point=${userLocation.lat},${userLocation.lng}&` +
          `point=${destination[0]},${destination[1]}&` +
          `vehicle=foot&` +
          `key=56cda963-aaf0-4689-8364-09ee64d741d5`
        );

        const data = await response.json();
        if (data.paths && data.paths[0]) {
          setRouteInfo({
            distance: Math.round(data.paths[0].distance),
            time: Math.round(data.paths[0].time / 60000)
          });
        }
      } catch (error) {
        console.error('Error fetching route info:', error);
      }
    };

    fetchRouteInfo();
  }, [userLocation, destination]);

  if (!routeInfo) return null;

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Information</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-red-500" />
          <span className="text-gray-600">
            Distance: {routeInfo.distance < 1000 
              ? `${routeInfo.distance}m` 
              : `${(routeInfo.distance/1000).toFixed(1)}km`}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-red-500" />
          <span className="text-gray-600">
            Estimated walking time: {routeInfo.time} min
          </span>
        </div>
      </div>
    </div>
  );
};

// Location Tracker Component
const LocationTracker = ({ onLocationUpdate, destination, onArrival }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          onLocationUpdate(newLocation);

          if (destination) {
            const userLatLng = L.latLng(newLocation.lat, newLocation.lng);
            const destLatLng = L.latLng(destination[0], destination[1]);
            const distance = userLatLng.distanceTo(destLatLng);

            if (distance < 25 && !showNotification) {
              setShowNotification(true);
              onArrival();
              setTimeout(() => {
                setShowNotification(false);
              }, 3000); // Animation will show for 3 seconds then completely disappear
            }
          }
        },
        (error) => console.error("Error tracking location:", error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [destination, onLocationUpdate, onArrival, showNotification]);

  return showNotification ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-2xl text-center transform scale-110 transition-all duration-300 animate-bounce">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You've arrived!</h2>
        <div className="mt-4 space-x-2">
          {['🎈', '✨', '🎊', '🌟'].map((emoji, index) => (
            <span key={index} className={`text-3xl animate-bounce inline-block`} 
                  style={{ animationDelay: `${index * 200}ms` }}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

// Map Controller Component
const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    const bounds = L.latLngBounds([
      [13.610000, 100.830000],
      [13.616000, 100.845000]
    ]);
    map.setMaxBounds(bounds);
    map.setMinZoom(16);
    map.setMaxZoom(19);
  }, [map]);

  return null;
};

// Reset View Button Component
const ResetViewButton = () => {
  const map = useMap();
  
  const handleReset = () => {
    map.setView([13.611984684699049, 100.8375817412228], 17);
  };

  return (
    <button
      onClick={handleReset}
      className="absolute bottom-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100"
    >
      <Compass className="w-5 h-5 text-gray-600" />
    </button>
  );
};

// Main MapPage Component
const MapPage = ({ userLocation: initialUserLocation }) => {
  const [userLocation, setUserLocation] = useState(initialUserLocation);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isBuildingsListOpen, setIsBuildingsListOpen] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);

  const center = {
    lat: 13.611984684699049,
    lng: 100.8375817412228
  };

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (building.shortName && building.shortName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white relative">
      {/* Search Panel */}
      <div className={`absolute top-4 left-4 z-[1000] transition-transform duration-300 ${
        isSearchOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="bg-white rounded-lg shadow-xl p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Find Building</h2>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          </div>

          {searchTerm && (
            <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  className="w-full text-left p-3 hover:bg-gray-50 flex items-start space-x-3"
                  onClick={() => {
                    setSelectedBuilding(building);
                    setSearchTerm('');
                    setHasArrived(false);
                  }}
                >
                  <Navigation className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">{building.name}</div>
                    {building.shortName && (
                      <div className="text-sm text-gray-500">{building.shortName}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedBuilding && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600">Selected Destination</h3>
              <p className="text-gray-800 font-medium mt-1">{selectedBuilding.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Search Button */}
      {!isSearchOpen && (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Buildings List Button */}
      <button
        onClick={() => setIsBuildingsListOpen(true)}
        className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg hover:bg-gray-100"
      >
        <List className="w-5 h-5 text-gray-600" />
      </button>

      {/* Buildings List Panel */}
      <BuildingsListPanel
        isOpen={isBuildingsListOpen}
        onClose={() => setIsBuildingsListOpen(false)}
        onSelectBuilding={(building) => {
          setSelectedBuilding(building);
          setIsBuildingsListOpen(false);
          setHasArrived(false);
        }}
      />

      {/* Route Info */}
      {userLocation && selectedBuilding && !hasArrived && (
        <RouteInfo 
          userLocation={userLocation}
          destination={selectedBuilding.position}
        />
      )}

      {/* Map */}
      <div className="h-screen">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={17}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          fadeAnimation={true}
          zoomAnimation={true}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController />
          <ResetViewButton />

          {userLocation && selectedBuilding && !hasArrived && (
            <WalkingRoute 
              userLocation={userLocation}
              destination={selectedBuilding.position}
            />
          )}

          <LocationTracker 
            onLocationUpdate={setUserLocation}
            destination={selectedBuilding?.position}
            onArrival={() => setHasArrived(true)}
          />

          {userLocation && (
            <Marker 
              position={[userLocation.lat, userLocation.lng]}
              icon={userIcon}
            >
              <Popup>You are here</Popup>
            </Marker>
          )}

          {selectedBuilding && (
            <Marker 
              position={selectedBuilding.position}
              icon={destinationIcon}
            >
              <Popup>
                <div className="font-medium">{selectedBuilding.name}</div>
                {selectedBuilding.shortName && (
                  <div className="text-sm text-gray-600">{selectedBuilding.shortName}</div>
                )}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;

