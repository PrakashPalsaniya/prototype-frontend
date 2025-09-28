// src/pages/Marketplace.jsx
import React, { useState } from 'react';
import { experiences, experienceCategories } from '../data/experiences';

const Marketplace = () => {
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    duration: '',
    rating: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  React.useEffect(() => {
    let filtered = experiences;

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(e => e.category === filters.category);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(e => e.price >= min && (max ? e.price <= max : true));
    }
    
    if (filters.duration) {
      filtered = filtered.filter(e => e.duration.includes(filters.duration));
    }
    
    if (filters.rating) {
      filtered = filtered.filter(e => e.rating >= parseFloat(filters.rating));
    }
    
    if (filters.search) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered = filtered.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
        break;
      default:
        // Featured/default sorting
        filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredExperiences(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      duration: '',
      rating: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🎭 Cultural Experiences Marketplace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book authentic cultural experiences and support local communities
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {experienceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange('category', filters.category === category.id ? '' : category.id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                filters.category === category.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-semibold">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} experiences</div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Prices</option>
                  <option value="0-1000">Under ₹1,000</option>
                  <option value="1000-2500">₹1,000 - ₹2,500</option>
                  <option value="2500-5000">₹2,500 - ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000">Above ₹10,000</option>
                </select>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Durations</option>
                  <option value="hour">1-4 hours</option>
                  <option value="day">Full day</option>
                  <option value="24">Multi-day</option>
                </select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.0">4.0+ ⭐</option>
                  <option value="3.5">3.5+ ⭐</option>
                  <option value="3.0">3.0+ ⭐</option>
                </select>
              </div>

              {/* Sustainability Info */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  🌿 Eco-Friendly
                </h4>
                <p className="text-sm text-green-700">
                  All experiences support local communities and sustainable tourism practices.
                </p>
              </div>
            </div>
          </div>

          {/* Experiences Grid */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-blue-600">{filteredExperiences.length}</span> experiences found
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            {/* Experiences Grid */}
            {filteredExperiences.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperiences.map((experience) => (
                  <div key={experience.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={experience.images[0]}
                        alt={experience.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {experience.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="text-lg font-bold text-blue-600">₹{experience.price}</span>
                      </div>
                      {experience.provider.verified && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            ✓ Verified
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {experience.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {experience.description}
                      </p>

                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-yellow-500">⭐</span>
                          <span className="ml-1 font-semibold">{experience.rating}</span>
                          <span className="ml-1 text-gray-500 text-sm">({experience.reviews} reviews)</span>
                        </div>
                        <span className="text-sm text-gray-500">{experience.duration}</span>
                      </div>

                      {/* Location & Provider */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {experience.location}
                        </div>
                        <div className="text-blue-600 font-medium">
                          by {experience.provider.name}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {experience.highlights.slice(0, 2).map((highlight, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {highlight}
                            </span>
                          ))}
                          {experience.highlights.length > 2 && (
                            <span className="text-gray-400 text-xs py-1">
                              +{experience.highlights.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sustainability Score */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm">
                          <span className="text-green-600 mr-1">🌿</span>
                          <span className="text-green-600 font-medium">
                            {experience.sustainability.communityBenefit}% Community Benefit
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          👥 {experience.groupSize.min}-{experience.groupSize.max} people
                        </div>
                      </div>

                      {/* Book Button */}
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold">
                        📅 Book Experience
                      </button>

                      {/* Quick Info */}
                      <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-500">
                        <div className="text-center">
                          <div className="font-medium">Difficulty</div>
                          <div>{experience.difficulty}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Languages</div>
                          <div>{experience.languages.length} available</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">Impact</div>
                          <div>{experience.sustainability.environmentalImpact}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No experiences found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Want to offer an experience?</h2>
          <p className="mb-6 text-blue-100">
            Join our community of local experience providers and share your culture with travelers
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Become a Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
