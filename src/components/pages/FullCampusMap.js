import React, { useState } from 'react';
import { X, ChevronLeft, Map, Search } from 'lucide-react';
import { buildingCategories } from '../buildingCategories';

const SearchPanel = ({ buildings, onSelectBuilding }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = searchTerm === '' || 
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (building.shortName && building.shortName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || building.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed top-20 left-4 w-80 bg-white rounded-lg shadow-lg z-20 overflow-hidden">
      {/* Search Input */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(buildingCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              className={`flex items-center p-2 rounded-lg transition-colors
                ${selectedCategory === key 
                  ? category.color 
                  : 'hover:bg-gray-50'}`}
            >
              <div className={`p-1.5 rounded-full ${selectedCategory === key ? 'bg-white/20' : category.color}`}>
                {category.icon}
              </div>
              <span className="ml-2 text-sm">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Building List */}
      {filteredBuildings.length > 0 ? (
        <div className="max-h-96 overflow-y-auto">
          {filteredBuildings.map((building) => (
            <button
              key={building.id}
              onClick={() => onSelectBuilding(building)}
              className="w-full text-left p-4 hover:bg-gray-50 border-b transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full ${buildingCategories[building.category].color} mt-0.5`}>
                  {buildingCategories[building.category].icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{building.name}</h3>
                  {building.shortName && (
                    <p className="text-sm text-gray-500">{building.shortName}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          No buildings found
        </div>
      )}
    </div>
  );
};

const BuildingDetail = ({ building, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{building.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                {building.images && building.images.length > 0 ? (
                  <img 
                    src={building.images[currentImageIndex]}
                    alt={`${building.name} - View ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              {building.images && building.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {building.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 ${index === currentImageIndex ? 'ring-2 ring-red-500' : ''}`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-full ${buildingCategories[building.category].color}`}>
                  {buildingCategories[building.category].icon}
                </div>
                <span className="font-medium text-gray-700">
                  {buildingCategories[building.category].name}
                </span>
              </div>

              {building.shortName && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Short Name</h3>
                  <p className="text-gray-800 mt-1">{building.shortName}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="text-gray-800 mt-1">
                  {building.description || "Description not available"}
                </p>
              </div>

              {building.facilities && building.facilities.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Facilities</h3>
                  <ul className="mt-2 space-y-1">
                    {building.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center text-gray-800">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FullCampusMap = ({ onBack, buildings }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-20 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-800">Static Map</span>
          </div>

          <div className="w-10"></div>
        </div>
      </div>

      {/* Map Container */}
      <div className="fixed inset-0 pt-16">
        <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
          <div className="relative w-full h-full">
            <img
              src="/campus-map.jpg"
              alt="ABAC Campus Map"
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Search Panel */}
      <SearchPanel
        buildings={buildings}
        onSelectBuilding={setSelectedBuilding}
      />

      {/* Building Detail Modal */}
      {selectedBuilding && (
        <BuildingDetail
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}
    </div>
  );
};

export default FullCampusMap;