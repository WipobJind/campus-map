import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Search, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const buildings = [
  { 
  id: 1, 
  name: "Sala Chaluramuk Phaisit", 
  shortName: "Sala",
  position: [13.611731210497892, 100.8386970437117]
  },
  { 
  id: 2, 
  name: "The Cathedral of Learning (CL)", 
  shortName: "CL",
  position: [13.611984684699049, 100.8375817412228]
  },
  { 
  id: 3, 
  name: "St. Raphael's Hall (SR)", 
  shortName: "SR",
  position: [13.61121549148576, 100.83755185188707]
  },
  { 
  id: 4, 
  name: "St. Michael's Hall (SM)", 
  shortName: "SM",
  position: [13.612124492354807, 100.83703521755558]
  },
  { 
  id: 5, 
  name: "St. Gabriel's Hall (SG)", 
  shortName: "SG",
  position: [13.612641414881224, 100.83798191811387]
  },
  { 
  id: 6, 
  name: "St. Louis Marie de Montfort's Church", 
  position: [13.61304114862705, 100.83969710932935]
  },
  { 
  id: 7, 
  name: "John XXIII Conference Center", 
  position: [13.61271268417426, 100.84046958551204]
  },
  { 
  id: 8, 
  name: "The Crystal Restaurant by Chez Jean Pierre", 
  position: [13.612295713193534, 100.84076308401379]
  },
  { 
  id: 9, 
  name: "Srisakdi Charmonman IT Building", 
  shortName: "IT",
  position: [13.611788861249442, 100.83639333488566]
  },
  { 
  id: 10, 
  name: "Car Park Building", 
  position: [13.611825595188922, 100.83610771404115]
  },
  { 
  id: 11, 
  name: "Montfort Del Rosario School of Architecture and Design (AR)", 
  shortName: "AR",
  position: [13.611985898450433, 100.8355487369979]
  },
  { 
  id: 12, 
  name: "Albert Laurence School of Communication Arts (CA)", 
  shortName: "CA",
  position: [13.61217733111064, 100.83520486322418]
  },
  { 
  id: 13, 
  name: "Communication Arts Studio (CA Studio)", 
  shortName: "CA Studio",
  position: [13.612144508147054, 100.83490430838472]
  },
  { 
  id: 14, 
  name: "Martin de Tours School of Management (MSM)", 
  shortName: "MSM",
  position: [13.612812761683529, 100.83670977385692]
  },
  { 
  id: 15, 
  name: "Martin de Tours School of Economics (MSE)", 
  shortName: "MSE",
  position: [13.612967664662046, 100.83630316810486]
  },
  { 
  id: 16, 
  name: "Vincent Mary School of Engineering (VMES)", 
  shortName: "VMES",
  position: [13.613048771088446, 100.83586694824743]
  },
  { 
  id: 17, 
  name: "Vincent Mary School of Science and Technology (VMS)", 
  shortName: "VMS",
  position: [13.613167335591415, 100.83540847832656]
  },
  { 
  id: 18, 
  name: "AU Bus Stand", 
  position: [13.613497268377435, 100.83674601878873]
  },
  { 
  id: 19, 
  name: "Pan Am International Flight Training Center - Thailand", 
  position: [13.613462678313748, 100.8356707903892]
  },
  { 
  id: 20, 
  name: "President House", 
  position: [13.612571751176095, 100.83434365353676]
  },
  { 
  id: 21, 
  name: "AU Mall/Cafeteria", 
  position: [13.612580840817737, 100.83333864406674]
  },
  { 
  id: 22, 
  name: "Tennis Court", 
  position: [13.612566232313437, 100.83263821908521]
  },
  { 
  id: 23, 
  name: "Clock Tower & Museum", 
  position: [13.613256533173077, 100.83317122744039]
  },
  { 
  id: 24, 
  name: "King Solomon Residence Hall", 
  position: [13.613141701422121, 100.83168097880481]
  },
  { 
  id: 25, 
  name: "King David Residence Hall", 
  position: [13.61379348264587, 100.8316218729078]
  },
  { 
  id: 26, 
  name: "Queen of Sheba Residence Hall", 
  position: [13.614146741037626, 100.8325533868695]
  },
  { 
  id: 27, 
  name: "Assumption University's Aquatic Center", 
  position: [13.614778131952823, 100.83376856987536]
  },
  { 
  id: 28, 
  name: "John Paul II Sports Center", 
  position: [13.615573299189698, 100.83378292355393]
  },
  { 
  id: 29, 
  name: "Indoor Swimming Pool (25m)", 
  position: [13.615763263627494, 100.83307770679842]
  },
  { 
  id: 30, 
  name: "Indoor Badminton Court", 
  position: [13.615936478401839, 100.83357710836876]
  },
  { 
  id: 31, 
  name: "Indoor Tennis Court", 
  position: [13.615943851621868, 100.83388910038524]
  },
  { 
  id: 32, 
  name: "Car Park Area", 
  position: [13.615327558680702, 100.83437013001915]
  }
]

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

const MapPage = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const center = {
    lat: 13.611984684699049,
    lng: 100.8375817412228
  };

  // Updated filter function
  const filteredBuildings = buildings.filter(building => {
    const searchLower = searchTerm.toLowerCase();
    const nameLower = building.name.toLowerCase();
    const shortNameLower = building.shortName ? building.shortName.toLowerCase() : '';
    
    return nameLower.includes(searchLower) || shortNameLower.includes(searchLower);
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Search Panel */}
      <div className="fixed top-4 left-4 z-[1000] w-80">
        <div className="bg-white rounded-lg shadow-xl p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">ABAC Navigator</h1>
            <p className="text-sm text-gray-600">Find your way around campus</p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              className="w-full p-3 rounded-lg border border-gray-300 pl-10"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {searchTerm && showDropdown && (
            <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  className="w-full text-left p-3 hover:bg-gray-50 flex items-center space-x-2"
                  onClick={() => {
                    setSelectedBuilding(building);
                    setSearchTerm('');
                    setShowDropdown(false);
                  }}
                >
                  <MapPin className="w-4 h-4 text-red-600" />
                  <div>
                    <div className="font-medium">{building.name}</div>
                    {building.shortName && (
                      <div className="text-sm text-gray-500">{building.shortName}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedBuilding && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-sm font-medium text-red-600">Selected Building</p>
              <p className="mt-1 font-medium text-gray-800">{selectedBuilding.name}</p>
              {selectedBuilding.shortName && (
                <p className="text-sm text-gray-600">{selectedBuilding.shortName}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 w-full">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={17}
          style={{ height: '100vh', width: '100%' }}
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
              <Popup>
                <div className="font-medium">{selectedBuilding.name}</div>
                {selectedBuilding.shortName && (
                  <div className="text-sm text-gray-600">{selectedBuilding.shortName}</div>
                )}
              </Popup>
            </Marker>
          )}

          {userLocation && selectedBuilding && (
            <Polyline
              positions={[
                [userLocation.lat, userLocation.lng],
                selectedBuilding.position
              ]}
              color="#9E1B32"
              weight={3}
              dashArray="5, 10"
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;