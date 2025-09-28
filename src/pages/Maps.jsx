// src/pages/Maps.jsx
import React, { useState } from 'react';
import { destinations } from '../data/destinations';

const Maps = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', name: 'All Places', icon: '🗺️', color: 'bg-gray-600' },
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'bg-green-600' },
    { id: 'culture', name: 'Culture', icon: '🏛️', color: 'bg-purple-600' },
    { id: 'wildlife', name: 'Wildlife', icon: '🦅', color: 'bg-blue-600' },
    { id: 'spiritual', name: 'Spiritual', icon: '🙏', color: 'bg-orange-600' }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === 'all' || dest.category === activeFilter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const districts = [...new Set(destinations.map(d => d.location.district))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🗺️ Interactive Jharkhand Map
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore destinations across Jharkhand with our interactive map and discover hidden gems
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search destinations or districts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? `${filter.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Mock Map Interface */}
              <div className="relative bg-gradient-to-br from-green-100 to-teal-100 h-96 md:h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-4">
                      Map integration with services like Google Maps or Mapbox would go here
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-md">
                      <p className="text-sm text-gray-700">
                        Features would include:
                      </p>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Pin locations for all destinations</li>
                        <li>• Route planning between locations</li>
                        <li>• Clustering for nearby attractions</li>
                        <li>• Real-time weather information</li>
                        <li>• Distance and time calculations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mock destination pins */}
                <div className="absolute top-20 left-32 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer" 
                     onClick={() => setSelectedDestination(destinations[0])}></div>
                <div className="absolute top-40 right-28 w-4 h-4 bg-blue-500 rounded-full animate-pulse cursor-pointer"
                     onClick={() => setSelectedDestination(destinations[1])}></div>
                <div className="absolute bottom-32 left-48 w-4 h-4 bg-green-500 rounded-full animate-pulse cursor-pointer"
                     onClick={() => setSelectedDestination(destinations[2])}></div>
                <div className="absolute bottom-40 right-40 w-4 h-4 bg-purple-500 rounded-full animate-pulse cursor-pointer"
                     onClick={() => setSelectedDestination(destinations[3])}></div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col">
                  <button className="p-3 hover:bg-gray-50 border-b border-gray-200">🔍+</button>
                  <button className="p-3 hover:bg-gray-50 border-b border-gray-200">🔍-</button>
                  <button className="p-3 hover:bg-gray-50">🧭</button>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Nature & Wildlife</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span>Cultural Sites</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Adventure Sports</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Spiritual Places</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Destination */}
            {selectedDestination && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selected Destination</h3>
                <div className="space-y-4">
                  <img
                    src={selectedDestination.images[0]}
                    alt={selectedDestination.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{selectedDestination.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">📍 {selectedDestination.location.district}</p>
                    <p className="text-sm text-gray-600 mb-3">{selectedDestination.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1 text-sm font-semibold">{selectedDestination.ratings.average}</span>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
                        {selectedDestination.category}
                      </span>
                    </div>
                    <button className="w-full mt-3 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* District Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Districts</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {districts.map((district) => {
                  const districtCount = destinations.filter(d => d.location.district === district).length;
                  return (
                    <button
                      key={district}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{district}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {districtCount}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destination List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Destinations</h3>
                <span className="text-sm text-gray-500">{filteredDestinations.length} found</span>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredDestinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedDestination?.id === destination.id
                        ? 'bg-teal-50 border border-teal-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={destination.images[0]}
                        alt={destination.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 line-clamp-1">{destination.name}</h4>
                        <p className="text-sm text-gray-600">📍 {destination.location.district}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 text-sm">⭐</span>
                          <span className="ml-1 text-sm">{destination.ratings.average}</span>
                          <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                            {destination.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Planning */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-3">Plan Your Route</h3>
              <p className="text-teal-100 text-sm mb-4">
                Select multiple destinations to create an optimized travel route
              </p>
              <button className="w-full bg-white text-teal-600 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                🎯 Create Itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Total Destinations', value: destinations.length, icon: '📍' },
            { label: 'Districts Covered', value: districts.length, icon: '🗺️' },
            { label: 'Eco-Friendly Sites', value: destinations.filter(d => d.ecoRating >= 4).length, icon: '🌿' },
            { label: 'Cultural Heritage', value: destinations.filter(d => d.category === 'culture').length, icon: '🏛️' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;
