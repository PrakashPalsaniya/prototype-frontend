// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reviews } from '../data/reviews';
import { destinations } from '../data/destinations';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    preferences: user?.preferences || {
      interests: [],
      budgetRange: 'medium',
      travelStyle: 'eco-friendly'
    }
  });

  const userReviews = reviews.filter(r => r.userId === user?.id);
  const visitedPlaces = destinations.slice(0, 6); // Mock visited places

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'activity', name: 'Activity', icon: '📊' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ];

  const interests = [
    'Nature & Wildlife', 'Cultural Heritage', 'Adventure Sports', 'Spiritual Sites',
    'Photography', 'Tribal Culture', 'Waterfalls', 'Trekking', 'Wildlife Safari', 'Local Cuisine'
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests: prev.preferences.interests.includes(interest)
          ? prev.preferences.interests.filter(i => i !== interest)
          : [...prev.preferences.interests, interest]
      }
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Please sign in</h2>
          <p className="text-gray-600">You need to be logged in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="flex items-start -mt-16">
              <img
                src="/images.png"
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white"
              />
              <div className="ml-6 mt-16">
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.location || 'Location not set'}</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium">
                    🌿 Eco Traveler • Member since {new Date(user.joinDate).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end -mt-8">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isEditing ? 'Cancel' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Trips Completed', value: user.stats?.tripsCompleted || 0, icon: '🗺️', color: 'from-green-500 to-emerald-500' },
            { label: 'Places Visited', value: user.stats?.placesVisited || 0, icon: '📍', color: 'from-blue-500 to-indigo-500' },
            { label: 'Reviews Written', value: user.stats?.reviewsWritten || 0, icon: '⭐', color: 'from-yellow-500 to-orange-500' },
            { label: 'Photos Shared', value: user.stats?.photosShared || 0, icon: '📸', color: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl mx-auto mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-lg">{user.name}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-600">{user.email}</div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Enter your location"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-lg">{user.location || 'Not set'}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">{new Date(user.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself and your travel interests..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <div className="px-4 py-2 bg-gray-50 rounded-lg min-h-[100px]">
                      {user.bio || 'No bio added yet. Tell us about your travel interests!'}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Travel Interests</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.preferences.interests.includes(interest)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferences.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Travel Preferences</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                      <select
                        value={formData.preferences.budgetRange}
                        onChange={(e) => handleInputChange('preferences.budgetRange', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="budget">Budget (Under ₹15K)</option>
                        <option value="medium">Medium (₹15K - ₹35K)</option>
                        <option value="luxury">Luxury (Above ₹35K)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
                      <select
                        value={formData.preferences.travelStyle}
                        onChange={(e) => handleInputChange('preferences.travelStyle', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="eco-friendly">Eco-Friendly</option>
                        <option value="adventure">Adventure</option>
                        <option value="cultural">Cultural</option>
                        <option value="relaxed">Relaxed</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => updateProfile(formData)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-8">
                {/* Recent Reviews */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reviews</h3>
                  {userReviews.length > 0 ? (
                    <div className="space-y-4">
                      {userReviews.map((review) => {
                        const destination = destinations.find(d => d.id === review.destinationId);
                        return (
                          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-800">{destination?.name}</h4>
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
                            <h5 className="font-medium text-gray-800 mb-1">{review.title}</h5>
                            <p className="text-gray-600 text-sm">{review.content}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📝</div>
                      <p className="text-gray-600">No reviews yet. Share your experiences!</p>
                    </div>
                  )}
                </div>

                {/* Visited Places */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recently Visited</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visitedPlaces.map((place) => (
                      <div key={place.id} className="text-center">
                        <img
                          src={place.images[0]}
                          alt={place.name}
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{place.name}</h4>
                        <p className="text-xs text-gray-500">{place.location.district}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {user.achievements?.map((achievement, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🏆</div>
                      <h4 className="font-semibold text-gray-800 mb-1">{achievement}</h4>
                      <p className="text-xs text-gray-600">Unlocked</p>
                    </div>
                  )) || (
                    <div className="col-span-full text-center py-8">
                      <div className="text-4xl mb-4">🏆</div>
                      <p className="text-gray-600">Complete your first trip to unlock achievements!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
