import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, Map } from 'lucide-react';
import { buildingCategories } from '../buildingCategories';

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
                  {React.cloneElement(buildingCategories[building.category].icon, { className: 'w-3 h-3' })}
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

const CategoryFilter = ({ categories, activeCategories, onToggleCategory, isMobile }) => {
  const [position, setPosition] = useState({ x: isMobile ? 10 : 20, y: isMobile ? 70 : 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const filterRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      e.preventDefault();
      setIsDragging(true);
      const event = e.touches ? e.touches[0] : e;
      setDragStart({
        x: event.clientX - position.x,
        y: event.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && filterRef.current) {
      const event = e.touches ? e.touches[0] : e;
      const newX = event.clientX - dragStart.x;
      const newY = event.clientY - dragStart.y;
      
      const maxX = window.innerWidth - filterRef.current.offsetWidth;
      const maxY = window.innerHeight - filterRef.current.offsetHeight;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={filterRef}
      className="fixed bg-white rounded-lg shadow-lg z-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        maxWidth: isMobile ? 'calc(100vw - 20px)' : '300px',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="drag-handle p-2 border-b flex items-center justify-between cursor-grab active:cursor-grabbing">
        <h3 className="text-sm font-semibold text-gray-700">Filter Categories</h3>
        <div className="w-4 h-4 flex items-center justify-center">
          <span className="block w-2 h-2 bg-gray-200 rounded-full"></span>
        </div>
      </div>

      <div className="p-2 space-y-2">
        {Object.entries(categories).map(([key, category]) => (
          <label key={key} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={activeCategories.includes(key)}
              onChange={() => onToggleCategory(key)}
              className="rounded text-red-600 focus:ring-red-500"
            />
            <div className={`p-1 rounded-full ${category.color}`}>
              {React.cloneElement(category.icon, { className: isMobile ? 'w-2 h-2' : 'w-3 h-3' })}
            </div>
            <span className="text-xs md:text-sm text-gray-600">{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const FullCampusMap = ({ onBack, buildings }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [activeCategories, setActiveCategories] = useState(Object.keys(buildingCategories));
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mapContainerRef = useRef(null);

  const toggleCategory = (category) => {
    setActiveCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleMouseMove = (e) => {
    if (showCoordinates && mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        setShowCoordinates(prev => !prev);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  const filteredBuildings = buildings.filter(building => 
    activeCategories.includes(building.category)
  );

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

          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="relative w-full h-full pt-16"
        onMouseMove={handleMouseMove}
      >
        <div className="relative w-full h-full">
          <img
            src="/campus-map.jpg"
            alt="ABAC Campus Map"
            className="w-full h-full object-contain"
            draggable="false"
          />

          {filteredBuildings.map((building) => (
            <button
              key={building.id}
              onClick={() => setSelectedBuilding(building)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full
                         ${buildingCategories[building.category].color} 
                         hover:scale-110 transition-transform duration-200 shadow-md
                         md:p-1.5 p-1`}
              style={{
                left: `${building.mapPosition?.x || 50}%`,
                top: `${building.mapPosition?.y || 50}%`
              }}
              title={building.name}
            >
              {React.cloneElement(buildingCategories[building.category].icon, { 
                className: 'md:w-3 md:h-3 w-2 h-2'
              })}
            </button>
          ))}

          {showCoordinates && (
            <>
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="absolute bg-red-500/50 w-px h-full"
                  style={{ left: `${mousePosition.x}%` }}
                />
                <div 
                  className="absolute bg-red-500/50 w-full h-px"
                  style={{ top: `${mousePosition.y}%` }}
                />
              </div>

              <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-30">
                <p className="font-mono text-sm">
                  mapPosition: {"{"} x: {mousePosition.x}, y: {mousePosition.y} {"}"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Press 'C' to toggle coordinate helper</p>
              </div>
            </>
          )}
        </div>
      </div>

      <CategoryFilter
        categories={buildingCategories}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        isMobile={isMobile}
      />

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