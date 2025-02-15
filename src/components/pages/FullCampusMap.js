import React, { useState } from 'react';
import { X, ChevronLeft, Search } from 'lucide-react';
import { buildingCategories } from '../buildingCategories';

const BuildingCard = ({ building, onClick }) => (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                 transition-shadow duration-200 text-left w-full flex flex-col"
    >
      <div className="relative w-full aspect-video">
        {building.images && building.images.length > 0 ? (
          <img
            src={building.images[0]}
            alt={building.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        <div className={`absolute top-2 right-2 ${buildingCategories[building.category].color} 
                        p-1.5 rounded-full shadow-md`}>
          {React.cloneElement(buildingCategories[building.category].icon, { 
            className: 'w-3 h-3 md:w-4 md:h-4'
          })}
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2">
          {building.name}
        </h3>
        {building.shortName && (
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            {building.shortName}
          </p>
        )}
      </div>
    </button>
  );
  
  const BuildingDetailModal = ({ building, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:p-4 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:w-auto md:max-w-4xl md:rounded-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-1">
            {building.name}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4 md:space-y-6">
            {/* Image Gallery */}
            {building.images && building.images.length > 0 && (
              <div className="space-y-2">
                <img 
                  src={building.images[0]}
                  alt={building.name}
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                />
                {building.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
                    {building.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${building.name} view ${index + 1}`}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
  
            {/* Building Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 md:p-2 rounded-full ${buildingCategories[building.category].color}`}>
                  {React.cloneElement(buildingCategories[building.category].icon, { 
                    className: 'w-4 h-4 md:w-5 md:h-5'
                  })}
                </div>
                <span className="font-medium text-sm md:text-base text-gray-700">
                  {buildingCategories[building.category].name}
                </span>
              </div>
  
              {building.shortName && (
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-500">Short Name</h3>
                  <p className="text-sm md:text-base text-gray-800 mt-1">{building.shortName}</p>
                </div>
              )}
  
              <div>
                <h3 className="text-xs md:text-sm font-medium text-gray-500">Description</h3>
                <p className="text-sm md:text-base text-gray-800 mt-1">
                  {building.description || "Description not available"}
                </p>
              </div>
  
              {building.facilities && building.facilities.length > 0 && (
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-500">Facilities</h3>
                  <ul className="mt-2 space-y-1">
                    {building.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center text-sm md:text-base text-gray-800">
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
            <div className="flex items-center h-14 md:h-16 px-3 md:px-4">
              <button
                onClick={onBack}
                className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full mr-3 md:mr-4"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">Campus Buildings</h1>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 md:px-4 pt-16 md:pt-20 pb-8 md:pb-12">
          {/* Search Bar */}
          <div className="mb-6 md:mb-8 sticky top-16 pt-2 bg-gray-50 z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search buildings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 md:p-3 pl-9 md:pl-10 text-sm md:text-base rounded-lg 
                           border border-gray-300 focus:ring-2 focus:ring-red-500 
                           focus:border-transparent"
              />
              <Search className="absolute left-2.5 md:left-3 top-2.5 md:top-3.5 
                                text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
  
          {/* Buildings Grid */}
          <div className="space-y-8 md:space-y-12">
            {Object.entries(buildingCategories).map(([category, categoryInfo]) => {
              const categoryBuildings = groupedBuildings[category] || [];
              if (categoryBuildings.length === 0) return null;
  
              return (
                <div key={category} className="space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 md:p-2 rounded-full ${categoryInfo.color}`}>
                      {React.cloneElement(categoryInfo.icon, { 
                        className: 'w-4 h-4 md:w-5 md:h-5'
                      })}
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      {categoryInfo.name}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {categoryBuildings.map(building => (
                      <BuildingCard
                        key={building.id}
                        building={building}
                        onClick={() => setSelectedBuilding(building)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  
        {/* Building Detail Modal */}
        {selectedBuilding && (
          <BuildingDetailModal
            building={selectedBuilding}
            onClose={() => setSelectedBuilding(null)}
          />
        )}
      </div>
    );
  };
  
  export default FullCampusMap;