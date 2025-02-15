import React, { useState } from 'react';
import { X, ChevronLeft, Search } from 'lucide-react';
import { buildingCategories } from '../buildingCategories';

const FullCampusMap = ({ onBack, buildings }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter buildings based on search
  const filteredBuildings = buildings.filter(building => 
    searchTerm === '' ||
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (building.shortName && building.shortName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group buildings by category
  const groupedBuildings = filteredBuildings.reduce((acc, building) => {
    if (!acc[building.category]) {
      acc[building.category] = [];
    }
    acc[building.category].push(building);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-16 px-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full mr-4"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Campus Buildings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        {/* Search Bar */}
        <div className="mb-8">
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
        </div>

        {/* Buildings Grid */}
        <div className="space-y-12">
          {Object.entries(buildingCategories).map(([category, categoryInfo]) => {
            const categoryBuildings = groupedBuildings[category] || [];
            if (categoryBuildings.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${categoryInfo.color}`}>
                    {categoryInfo.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {categoryInfo.name}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryBuildings.map(building => (
                    <button
                      key={building.id}
                      onClick={() => setSelectedBuilding(building)}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 text-left"
                    >
                      <div className="relative h-48">
                        {building.images && building.images.length > 0 ? (
                          <img
                            src={building.images[0]}
                            alt={building.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{building.name}</h3>
                        {building.shortName && (
                          <p className="text-sm text-gray-500">{building.shortName}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Building Detail Modal */}
      {selectedBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{selectedBuilding.name}</h2>
              <button 
                onClick={() => setSelectedBuilding(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* Image Gallery */}
                {selectedBuilding.images && selectedBuilding.images.length > 0 && (
                  <div className="space-y-2">
                    <img 
                      src={selectedBuilding.images[0]}
                      alt={selectedBuilding.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {selectedBuilding.images.length > 1 && (
                      <div className="flex space-x-2 overflow-x-auto py-2">
                        {selectedBuilding.images.map((image, index) => (
                          <img 
                            key={index}
                            src={image}
                            alt={`${selectedBuilding.name} view ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Building Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${buildingCategories[selectedBuilding.category].color}`}>
                      {buildingCategories[selectedBuilding.category].icon}
                    </div>
                    <span className="font-medium text-gray-700">
                      {buildingCategories[selectedBuilding.category].name}
                    </span>
                  </div>

                  {selectedBuilding.shortName && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Short Name</h3>
                      <p className="text-gray-800 mt-1">{selectedBuilding.shortName}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="text-gray-800 mt-1">
                      {selectedBuilding.description || "Description not available"}
                    </p>
                  </div>

                  {selectedBuilding.facilities && selectedBuilding.facilities.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Facilities</h3>
                      <ul className="mt-2 space-y-1">
                        {selectedBuilding.facilities.map((facility, index) => (
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
      )}
    </div>
  );
};

export default FullCampusMap;