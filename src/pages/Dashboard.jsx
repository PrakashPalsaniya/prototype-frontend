// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardData } from '../data/dashboard';
import { itineraries } from '../data/itineraries';
import { destinations } from '../data/destinations';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const userItineraries = itineraries.filter(i => i.userId === user?.id || Math.random() > 0.5).slice(0, 3);
  const recentDestinations = destinations.slice(0, 4);

  const quickActions = [
    {
      title: 'Plan New Trip',
      description: 'Create AI-powered itinerary',
      icon: '🎯',
      link: '/itinerary',
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Browse Destinations',
      description: 'Discover eco-friendly places',
      icon: '🗺️',
      link: '/destinations',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Find Experiences',
      description: 'Book cultural activities',
      icon: '🎭',
      link: '/marketplace',
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600'
    },
    {
      title: 'View Maps',
      description: 'Explore interactive maps',
      icon: '📍',
      link: '/maps',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'itineraries', name: 'My Trips', icon: '🗺️' },
    { id: 'favorites', name: 'Saved Places', icon: '❤️' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}! 🌿
              </h1>
              <p className="text-green-100 text-lg">
                Ready for your next sustainable adventure in Jharkhand?
              </p>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Trips',
              value: dashboardData.stats.totalTrips,
              icon: '🗺️',
              color: 'from-green-500 to-emerald-500',
              change: '+2 this month'
            },
            {
              title: 'Places Visited',
              value: dashboardData.stats.placesVisited,
              icon: '📍',
              color: 'from-blue-500 to-indigo-500',
              change: 'Eco-friendly'
            },
            {
              title: 'Upcoming Trips',
              value: dashboardData.stats.upcomingTrips,
              icon: '📅',
              color: 'from-purple-500 to-pink-500',
              change: 'This quarter'
            },
            {
              title: 'Saved Places',
              value: dashboardData.stats.savedDestinations,
              icon: '❤️',
              color: 'from-amber-500 to-orange-500',
              change: 'Wishlist'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.change}</div>
                </div>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.title}</h3>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className={`font-semibold ${action.textColor} mb-2 group-hover:text-opacity-80`}>
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
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
                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    {dashboardData.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl mr-4">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-gray-800">{activity.description}</p>
                          <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Trips */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Trips</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dashboardData.upcomingTrips.map((trip) => (
                      <div key={trip.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={trip.image} 
                            alt={trip.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{trip.title}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(trip.startDate).toLocaleDateString()} • {trip.duration} days
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                              trip.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {trip.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended For You</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dashboardData.recommendedDestinations.map((dest) => (
                      <Link
                        key={dest.id}
                        to={`/destinations/${dest.id}`}
                        className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                      >
                        <img 
                          src={dest.image} 
                          alt={dest.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{dest.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{dest.reason}</p>
                          <span className="text-green-600 text-sm font-medium">Explore →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Trips Tab */}
            {activeTab === 'itineraries' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">My Itineraries</h3>
                  <Link
                    to="/itinerary"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Create New
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {userItineraries.map((itinerary) => (
                    <div key={itinerary.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                          {itinerary.duration}D
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{itinerary.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>💰 ₹{itinerary.budget.total.toLocaleString()}</span>
                            <span>•</span>
                            <span>🤖 {itinerary.aiGenerated ? 'AI Generated' : 'Custom'}</span>
                            <span>•</span>
                            <span>👥 {itinerary.groupSize} people</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/itinerary/${itinerary.id}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Saved Destinations</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentDestinations.map((destination) => (
                    <Link
                      key={destination.id}
                      to={`/destinations/${destination.slug}`}
                      className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <img 
                        src={destination.images[0]} 
                        alt={destination.name}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-1">{destination.name}</h4>
                        <p className="text-sm text-gray-600">📍 {destination.location.district}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium ml-1">{destination.ratings.average}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">My Reviews</h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✍️</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">No reviews yet</h4>
                  <p className="text-gray-600 mb-4">Share your travel experiences to help other eco-travelers!</p>
                  <Link
                    to="/destinations"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Explore Destinations
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
