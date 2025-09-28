// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Destinations', path: '/destinations', icon: '🏔️' },
    { name: 'Plan Trip', path: '/itinerary', icon: '🗺️' },
    { name: 'Marketplace', path: '/marketplace', icon: '🛍️' },
    { name: 'Maps', path: '/maps', icon: '📍' },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0"
            >
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
                  : 'bg-white/20 backdrop-blur-sm'
              } group-hover:scale-110`}>
                <span className="text-lg md:text-2xl">🏔️</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-base md:text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Jharkhand
                </span>
                <span className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-emerald-600' : 'text-emerald-100'
                }`}>
                  Tourism
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? isScrolled
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isScrolled 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-white/20 text-white'
                    }`}>
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium">
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <span>📊</span>
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <span>👤</span>
                        <span>Profile</span>
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isScrolled
                        ? 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isScrolled
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-md'
                    }`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isScrolled
                  ? 'text-gray-600 hover:bg-gray-100 focus:ring-emerald-500'
                  : 'text-white hover:bg-white/10 focus:ring-white/50'
              }`}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Separate from navbar for better performance */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-16 md:top-20 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 transition-all duration-300 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="py-4 px-4">
              {/* Navigation Items */}
              <div className="space-y-1 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {user.name?.split(' ')[0] || 'User'}
                        </div>
                        <div className="text-sm text-emerald-600">
                          Eco Traveler
                        </div>
                      </div>
                    </div>
                    
                    {/* User Menu Items */}
                    <div className="space-y-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl font-medium transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">📊</span>
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl font-medium transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">👤</span>
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl font-medium transition-all duration-200"
                      >
                        <span className="text-lg">🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 rounded-xl font-semibold transition-all duration-200 border border-emerald-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">🔑</span>
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 rounded-xl font-semibold transition-all duration-200 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">✨</span>
                      <span>Sign Up Free</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Dropdown Backdrop */}
      {showUserDropdown && (
        <div 
          className="fixed inset-0 z-40 hidden lg:block"
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </>
  );
};

export default Navbar;
