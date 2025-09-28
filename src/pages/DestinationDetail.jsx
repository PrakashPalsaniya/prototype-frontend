// src/pages/DestinationDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { reviews } from '../data/reviews';
import { experiences } from '../data/experiences';

const DestinationDetail = () => {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = destinations.find(d => d.slug === slug);
    setDestination(found);
  }, [slug]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Destination not found</h2>
          <Link to="/destinations" className="text-green-600 hover:text-green-700">
            ← Back to destinations
          </Link>
        </div>
      </div>
    );
  }

  const destinationReviews = reviews.filter(r => r.destinationId === destination.id);
  const relatedExperiences = experiences.filter(e => 
    e.location.toLowerCase().includes(destination.location.district.toLowerCase())
  ).slice(0, 3);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'activities', name: 'Activities', icon: '🎯' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'sustainability', name: 'Eco Impact', icon: '🌿' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-l-2xl">
                <img
                  src={destination.images[activeImageIndex]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2 mt-4 px-4">
                {destination.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeImageIndex ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Info */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{destination.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {destination.location.district}, Jharkhand
                  </div>
                </div>
                
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-full transition-colors ${
                    isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <svg className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Rating and Category */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold">{destination.ratings.average}</span>
                  <span className="text-gray-500 ml-1">({destination.ratings.count} reviews)</span>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {destination.category}
                </span>
                {destination.featured && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Best Time</div>
                  <div className="font-semibold">{destination.bestTimeToVisit}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Duration</div>
                  <div className="font-semibold">{destination.duration}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Difficulty</div>
                  <div className="font-semibold">{destination.difficulty}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Eco Rating</div>
                  <div className="font-semibold text-green-600">🌿 {destination.ecoRating}/5</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {destination.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {destination.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Link
                  to="/itinerary"
                  className="flex-1 bg-green-600 text-white text-center py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  🎯 Plan Trip Here
                </Link>
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  📍 View on Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Cultural Significance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Cultural Significance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {destination.culturalSignificance}
                  </p>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Facilities</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {destination.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-green-500 mr-3">✓</span>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500">District:</span>
                        <span className="ml-2 font-medium">{destination.location.district}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">State:</span>
                        <span className="ml-2 font-medium">{destination.location.state}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Activities</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {destination.activities.map((activity, index) => (
                      <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-2xl mr-4">🎯</span>
                        <span className="font-medium text-gray-800">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Experiences */}
                {relatedExperiences.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Experiences</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {relatedExperiences.map((experience) => (
                        <div key={experience.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <img 
                            src={experience.images[0]} 
                            alt={experience.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{experience.title}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-green-600 font-bold">₹{experience.price}</span>
                              <div className="flex items-center">
                                <span className="text-yellow-500">⭐</span>
                                <span className="ml-1 text-sm">{experience.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Reviews ({destinationReviews.length})</h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Write Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {destinationReviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={`https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face`}
                          alt="Reviewer"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">Anonymous Traveler</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                    ⭐
                                  </span>
                                ))}
                                <span className="ml-2 text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <h5 className="font-medium text-gray-800 mb-2">{review.title}</h5>
                          <p className="text-gray-600 mb-3">{review.content}</p>
                          {review.images && (
                            <div className="flex space-x-2">
                              {review.images.map((image, index) => (
                                <img key={index} src={image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                              ))}
                            </div>
                          )}
                          <div className="flex items-center mt-3 text-sm text-gray-500">
                            <span className="capitalize">👥 {review.tripType} trip</span>
                            <span className="mx-2">•</span>
                            <span>👍 {review.helpful} found helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {destinationReviews.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">💭</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">No reviews yet</h4>
                    <p className="text-gray-600">Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            )}

            {/* Sustainability Tab */}
            {activeTab === 'sustainability' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Sustainability Features</h3>
                  <div className="space-y-3">
                    {destination.sustainabilityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-green-500 mr-3 text-xl">🌿</span>
                        <span className="text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">Eco Impact Score</h4>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-green-600">{destination.ecoRating}/5</div>
                    <div className="flex-1">
                      <div className="bg-green-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: `${(destination.ecoRating / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-green-700 mt-2">
                        This destination follows excellent sustainable tourism practices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
