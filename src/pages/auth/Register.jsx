// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    interests: [],
    budgetRange: 'medium',
    travelStyle: 'eco-friendly'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const interests = [
    'Nature & Wildlife', 'Cultural Heritage', 'Adventure Sports', 'Spiritual Sites',
    'Photography', 'Tribal Culture', 'Waterfalls', 'Trekking', 'Local Cuisine', 'Handicrafts'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">🏔️</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join Jharkhand Tourism
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to start exploring sustainable destinations
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Account</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Preferences</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleNext}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
                <p className="text-sm text-gray-600">Tell us about yourself</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  placeholder="Enter your city, state"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
              >
                Continue to Preferences →
              </button>
            </form>
          )}

          {/* Step 2: Travel Preferences */}
          {step === 2 && (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Travel Preferences</h3>
                <p className="text-sm text-gray-600">Help us personalize your eco-tourism experience</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Travel Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What interests you? (Select multiple)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interests.map(interest => (
                    <label 
                      key={interest} 
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Preferred Budget Range
                </label>
                <div className="grid gap-3">
                  {[
                    { value: 'budget', label: 'Budget Explorer (₹5K - ₹15K)', desc: 'Cost-effective, authentic experiences' },
                    { value: 'medium', label: 'Comfort Seeker (₹15K - ₹35K)', desc: 'Balanced comfort and sustainability' },
                    { value: 'luxury', label: 'Luxury Eco-Traveler (₹35K+)', desc: 'Premium sustainable experiences' }
                  ].map(budget => (
                    <label 
                      key={budget.value} 
                      className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.budgetRange === budget.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budgetRange"
                        value={budget.value}
                        checked={formData.budgetRange === budget.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{budget.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{budget.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Travel Style
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { value: 'eco-friendly', label: 'Eco-Friendly Explorer', desc: 'Sustainable tourism focused' },
                    { value: 'cultural', label: 'Cultural Immersion', desc: 'Deep cultural experiences' },
                    { value: 'adventure', label: 'Adventure Seeker', desc: 'Thrilling outdoor activities' },
                    { value: 'relaxed', label: 'Relaxed Traveler', desc: 'Peaceful, rejuvenating trips' }
                  ].map(style => (
                    <label 
                      key={style.value} 
                      className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.travelStyle === style.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="travelStyle"
                        value={style.value}
                        checked={formData.travelStyle === style.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{style.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{style.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    '🌿 Create Eco Account'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
