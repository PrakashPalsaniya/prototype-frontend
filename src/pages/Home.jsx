// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { destinations } from '../data/destinations';
import { itineraries } from '../data/itineraries';
import { experiences } from '../data/experiences';

const Home = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      title: 'Pristine Waterfalls',
      subtitle: 'Discover hidden natural wonders'
    },
    {
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop', 
      title: 'Rich Cultural Heritage',
      subtitle: 'Experience tribal traditions'
    },
    {
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
      title: 'Diverse Wildlife',
      subtitle: 'Sustainable eco-adventures'
    }
  ];

  const featuredDestinations = destinations.filter(d => d.featured).slice(0, 3);
  const featuredItineraries = itineraries.filter(i => i.featured).slice(0, 2);
  const popularExperiences = experiences.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${image.url})`
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-600/80 rounded-full text-sm font-medium backdrop-blur-sm">
                🌿 Sustainable • Cultural • Adventure
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Jharkhand's
              </span>
              Hidden Treasures
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Experience eco-friendly adventures, rich tribal culture, and pristine nature. 
              Let AI craft your perfect sustainable journey through Jharkhand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/itinerary"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🎯 Plan My Trip
              </Link>
              <Link
                to="/destinations"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                🗺️ Explore Destinations
              </Link>
            </div>

            {user && (
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-sm mb-2">Welcome back, <span className="font-semibold">{user.name?.split(' ')[0]}</span>! 👋</p>
                <Link 
                  to="/dashboard" 
                  className="text-green-300 hover:text-green-200 text-sm font-medium underline"
                >
                  View your travel dashboard →
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Eco-Destinations
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked sustainable destinations that showcase Jharkhand's natural beauty
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={destination.images[0]} 
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full font-medium capitalize">
                      {destination.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-gray-800">{destination.ratings.average}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {destination.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-200">📍 {destination.location.district}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore All Destinations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Popular Experiences
            </h2>
            <p className="text-lg text-gray-600">
              Immersive activities that connect you with local culture and nature
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={experience.images[0]} 
                    alt={experience.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-sm font-semibold text-green-600">₹{experience.price}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {experience.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{experience.rating}</span>
                      <span className="text-gray-500">({experience.reviews})</span>
                    </div>
                    <span className="text-gray-500">{experience.duration}</span>
                  </div>
                  
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                      {experience.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/marketplace"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Experiences
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Itineraries */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              AI-Crafted Itineraries
            </h2>
            <p className="text-lg text-gray-600">
              Ready-to-use travel plans designed by AI for the perfect Jharkhand experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredItineraries.map((itinerary) => (
              <Link
                key={itinerary.id}
                to={`/itinerary/${itinerary.id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="relative">
                  <img 
                    src={itinerary.images[0]} 
                    alt={itinerary.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🤖 AI Generated
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">{itinerary.duration} Days</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {itinerary.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {itinerary.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{itinerary.budget.total.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{itinerary.ratings.average}</span>
                      <span className="text-gray-500">({itinerary.ratings.count})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {itinerary.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>👥 {itinerary.groupSize} people</span>
                    <span className="capitalize">📅 {itinerary.groupType}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Eco Destinations', icon: '🌿' },
              { number: '10K+', label: 'Happy Travelers', icon: '😊' },
              { number: '95%', label: 'Positive Reviews', icon: '⭐' },
              { number: '24/7', label: 'AI Support', icon: '🤖' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Eco-Adventure?
          </h2>
          <p className="text-lg mb-8 text-green-100">
            Join thousands of travelers who've discovered Jharkhand's sustainable beauty. 
            Start planning your responsible journey today.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-green-600 hover:bg-green-50 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🌟 Get Started Free
              </Link>
              <Link
                to="/destinations"
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-green-600 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                🗺️ Browse Destinations
              </Link>
            </div>
          ) : (
            <Link
              to="/itinerary"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 hover:bg-green-50 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎯 Create New Itinerary
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
