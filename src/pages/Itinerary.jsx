// src/pages/Itinerary.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { itineraryTemplates } from '../data/itineraries';
import { destinations } from '../data/destinations';

const Itinerary = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    duration: 3,
    startDate: '',
    groupSize: 2,
    groupType: 'couple',
    budget: 20000,
    budgetType: 'medium',
    interests: [],
    selectedDestinations: [],
    accommodationType: 'hotel',
    transportMode: 'car'
  });

  const interests = [
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿', destinations: destinations.filter(d => d.category === 'nature').length },
    { id: 'culture', label: 'Tribal Culture', icon: '🏛️', destinations: destinations.filter(d => d.category === 'culture').length },
    { id: 'adventure', label: 'Adventure Sports', icon: '🏔️', destinations: destinations.filter(d => d.tags.includes('Adventure')).length },
    { id: 'spiritual', label: 'Spiritual Sites', icon: '🙏', destinations: destinations.filter(d => d.category === 'spiritual').length },
    { id: 'wildlife', label: 'Wildlife Safari', icon: '🦅', destinations: destinations.filter(d => d.category === 'wildlife').length },
    { id: 'photography', label: 'Photography', icon: '📸', destinations: destinations.filter(d => d.tags.includes('Photography')).length }
  ];

  const groupTypes = [
    { value: 'solo', label: 'Solo Traveler', icon: '🚶', description: 'Flexible, personal journey', multiplier: 1 },
    { value: 'couple', label: 'Couple', icon: '💑', description: 'Romantic getaway', multiplier: 1.2 },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Kid-friendly activities', multiplier: 1.5 },
    { value: 'friends', label: 'Friends Group', icon: '👥', description: 'Adventure and fun', multiplier: 1.3 }
  ];

  const budgetTypes = [
    { value: 'budget', label: 'Budget Explorer', range: '₹5K - ₹15K', icon: '💰', description: 'Cost-effective experiences' },
    { value: 'medium', label: 'Comfort Seeker', range: '₹15K - ₹35K', icon: '💳', description: 'Balanced comfort and value' },
    { value: 'luxury', label: 'Luxury Adventurer', range: '₹35K+', icon: '💎', description: 'Premium experiences' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleDestinationToggle = (destinationId) => {
    setFormData(prev => ({
      ...prev,
      selectedDestinations: prev.selectedDestinations.includes(destinationId)
        ? prev.selectedDestinations.filter(id => id !== destinationId)
        : [...prev.selectedDestinations, destinationId]
    }));
  };

  const generateItinerary = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate itinerary generation
    const newItinerary = {
      id: Date.now(),
      title: `${formData.groupType} ${formData.duration}-Day Jharkhand Adventure`,
      duration: formData.duration,
      budget: formData.budget,
      interests: formData.interests,
      generated: new Date().toISOString()
    };

    // Navigate to generated itinerary
    navigate('/itinerary/generated', { state: { itinerary: newItinerary, formData } });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const recommendedDestinations = destinations
    .filter(d => formData.interests.some(interest => 
      d.category === interest || d.tags.some(tag => tag.toLowerCase().includes(interest))
    ))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🎯 Plan Your Eco-Adventure
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a personalized, sustainable travel plan for your Jharkhand journey
          </p>
        </div>

        {/* Quick Templates */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Start Templates</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {itineraryTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600">{template.name}</h3>
                  <span className="text-2xl">
                    {template.type === 'nature' ? '🌿' : template.type === 'culture' ? '🏛️' : '🏔️'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-semibold">₹{template.budget.toLocaleString()}</span>
                  <span className="text-gray-500">{template.duration} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Planner */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                    stepNum <= step ? 'bg-white text-green-600' : 'bg-green-500 text-white'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 4 && <div className="w-12 h-0.5 bg-green-400 mx-2" />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-white text-sm mt-2">
              <span>Trip Details</span>
              <span>Interests</span>
              <span>Destinations</span>
              <span>Finalize</span>
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Details</h2>
                  <p className="text-gray-600">Tell us about your travel plans</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Trip Duration: <span className="text-green-600 font-bold">{formData.duration} days</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="14"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 day</span>
                        <span>14 days</span>
                      </div>
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        min={getTomorrowDate()}
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    {/* Group Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                      <select
                        value={formData.groupSize}
                        onChange={(e) => handleInputChange('groupSize', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    {/* Group Type */}
                    <label className="block text-sm font-medium text-gray-700 mb-4">Travel Style</label>
                    <div className="space-y-3">
                      {groupTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                            formData.groupType === type.value
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="groupType"
                            value={type.value}
                            checked={formData.groupType === type.value}
                            onChange={(e) => handleInputChange('groupType', e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-2xl mr-4">{type.icon}</div>
                          <div>
                            <div className="font-semibold text-gray-800">{type.label}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What Interests You?</h2>
                  <p className="text-gray-600">Select your travel interests for personalized recommendations</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interests.map((interest) => (
                    <label
                      key={interest.id}
                      className={`flex items-center p-6 border rounded-xl cursor-pointer transition-all ${
                        formData.interests.includes(interest.id)
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest.id)}
                        onChange={() => handleInterestToggle(interest.id)}
                        className="sr-only"
                      />
                      <div className="text-3xl mr-4">{interest.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-800">{interest.label}</div>
                        <div className="text-sm text-green-600">{interest.destinations} destinations</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Budget Selection */}
                <div className="mt-12">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Range</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {budgetTypes.map((budget) => (
                      <label
                        key={budget.value}
                        className={`flex items-center p-6 border rounded-xl cursor-pointer transition-all ${
                          formData.budgetType === budget.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budgetType"
                          value={budget.value}
                          checked={formData.budgetType === budget.value}
                          onChange={(e) => {
                            handleInputChange('budgetType', e.target.value);
                            const budgetAmounts = { budget: 10000, medium: 25000, luxury: 50000 };
                            handleInputChange('budget', budgetAmounts[e.target.value] * formData.duration);
                          }}
                          className="sr-only"
                        />
                        <div className="text-3xl mr-4">{budget.icon}</div>
                        <div>
                          <div className="font-semibold text-gray-800">{budget.label}</div>
                          <div className="text-sm text-green-600">{budget.range}</div>
                          <div className="text-xs text-gray-500 mt-1">{budget.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Destinations */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Destinations</h2>
                  <p className="text-gray-600">Select specific places you'd like to visit (optional)</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendedDestinations.map((destination) => (
                    <label
                      key={destination.id}
                      className={`cursor-pointer group ${
                        formData.selectedDestinations.includes(destination.id) ? 'ring-2 ring-green-500' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedDestinations.includes(destination.id)}
                        onChange={() => handleDestinationToggle(destination.id)}
                        className="sr-only"
                      />
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                        <img 
                          src={destination.images[0]} 
                          alt={destination.name}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{destination.name}</h3>
                          <p className="text-sm text-gray-600">📍 {destination.location.district}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm ml-1">{destination.ratings.average}</span>
                            <span className="text-xs text-gray-500 ml-2 capitalize">{destination.category}</span>
                          </div>
                        </div>
                        {formData.selectedDestinations.includes(destination.id) && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            ✓
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h4>
                  <p className="text-blue-700 text-sm">
                    You can skip this step and let our AI choose the best destinations based on your interests and duration.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review & Generate */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Plan</h2>
                  <p className="text-gray-600">Confirm your details and generate your personalized itinerary</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Trip Summary */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      🗓️ Trip Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{formData.duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-semibold">
                          {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group:</span>
                        <span className="font-semibold capitalize">{formData.groupType} ({formData.groupSize} people)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-semibold text-green-600">₹{formData.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Interests */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      🎯 Your Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map(interestId => {
                        const interest = interests.find(i => i.id === interestId);
                        return (
                          <span key={interestId} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {interest?.icon} {interest?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* AI Generation Preview */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    🤖 What Our AI Will Create
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Day-by-day detailed itinerary
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Eco-friendly accommodations
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Cultural experiences
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Local transportation options
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Budget breakdown
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Sustainability tips
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>

              <div className="text-sm text-gray-500">
                Step {step} of 4
              </div>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={generateItinerary}
                  disabled={!user}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  🪄 Generate My Itinerary
                </button>
              )}
            </div>

            {!user && step === 4 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-yellow-800 mb-2">Please sign in to generate and save your itinerary</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
