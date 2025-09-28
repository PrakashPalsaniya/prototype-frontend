// src/pages/ItineraryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { itineraries } from '../data/itineraries';
import { destinations } from '../data/destinations';

const ItineraryDetail = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const found = itineraries.find(i => i.id === parseInt(id));
    setItinerary(found);
  }, [id]);

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Itinerary not found</h2>
          <Link to="/dashboard" className="text-green-600 hover:text-green-700">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const totalCost = itinerary.days?.reduce((sum, day) => sum + (day.totalCost || 0), 0) || itinerary.budget.total;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
              <p className="text-green-100">{itinerary.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {itinerary.aiGenerated && (
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  🤖 AI Generated
                </span>
              )}
              {itinerary.featured && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{itinerary.duration}</div>
              <div className="text-sm text-green-100">Days</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">₹{itinerary.budget.total.toLocaleString()}</div>
              <div className="text-sm text-green-100">Total Budget</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{itinerary.groupSize}</div>
              <div className="text-sm text-green-100">People</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{itinerary.ratings?.average || 'N/A'}</div>
              <div className="text-sm text-green-100">Rating</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Day Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">Itinerary Days</h3>
              <div className="space-y-2">
                {itinerary.days?.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveDay(day.day)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeDay === day.day
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold">Day {day.day}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">{day.title}</div>
                    {day.totalCost && (
                      <div className="text-sm text-green-600 font-medium">₹{day.totalCost.toLocaleString()}</div>
                    )}
                  </button>
                )) || (
                  <div className="text-center py-4 text-gray-500">
                    <div className="text-2xl mb-2">📝</div>
                    <div className="text-sm">Day-by-day details coming soon!</div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    📥 Download PDF
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    📤 Share Itinerary
                  </button>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    ✏️ {isEditing ? 'Save Changes' : 'Edit Itinerary'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Day Details */}
            {itinerary.days && itinerary.days.find(d => d.day === activeDay) ? (
              <div className="space-y-6">
                {(() => {
                  const currentDay = itinerary.days.find(d => d.day === activeDay);
                  return (
                    <>
                      {/* Day Header */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-gray-800">
                            Day {currentDay.day}: {currentDay.title}
                          </h2>
                          {currentDay.totalCost && (
                            <div className="text-xl font-bold text-green-600">
                              ₹{currentDay.totalCost.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600">{currentDay.description}</p>
                      </div>

                      {/* Activities */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Activities</h3>
                        <div className="space-y-4">
                          {currentDay.activities?.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                              <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                                {activity.time}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                                <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="text-gray-500">⏱️ {activity.duration} min</span>
                                  <span className="text-green-600 font-medium">₹{activity.cost}</span>
                                  <span className="capitalize bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {activity.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Accommodation & Transport */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {currentDay.accommodation && (
                          <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              🏨 Accommodation
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold">{currentDay.accommodation.name}</h4>
                                <p className="text-sm text-gray-600">{currentDay.accommodation.type}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="text-yellow-500 mr-1">⭐</span>
                                  <span>{currentDay.accommodation.rating}</span>
                                </div>
                                <div className="text-green-600 font-semibold">
                                  ₹{currentDay.accommodation.price}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {currentDay.accommodation.features?.map((feature, index) => (
                                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {currentDay.transport && (
                          <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              🚗 Transportation
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold">{currentDay.transport.mode}</h4>
                                <p className="text-sm text-gray-600">{currentDay.transport.distance}</p>
                              </div>
                              <div className="text-green-600 font-semibold">
                                ₹{currentDay.transport.cost}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              /* Overview when no specific day is selected or no days data */
              <div className="space-y-6">
                {/* Highlights */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {itinerary.highlights?.map((highlight, index) => (
                      <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-500 mr-3">✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Breakdown */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(itinerary.budget.breakdown || {}).map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="capitalize font-medium">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold text-green-600">₹{amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg border-2 border-green-300">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-green-700 text-lg">₹{itinerary.budget.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Includes & Excludes */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-green-600">✅ Includes</h3>
                    <ul className="space-y-2">
                      {itinerary.includes?.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-red-600">❌ Excludes</h3>
                    <ul className="space-y-2">
                      {itinerary.excludes?.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-red-500 mr-2">✗</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sustainability Features */}
                {itinerary.sustainabilityFeatures && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      🌿 Sustainability Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {itinerary.sustainabilityFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                          <span className="text-green-500 mr-3">🌱</span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {itinerary.tags?.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
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

export default ItineraryDetail;
