// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🏔️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Jharkhand Tourism</h3>
                <p className="text-green-400 text-sm">Sustainable • Cultural • Adventure</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover the hidden gems of Jharkhand through sustainable and culturally immersive travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.48 16.882l.005-.016c-.32-1.191-.492-2.493-.492-3.834s.172-2.643.497-3.834l-.005-.016L5.126 8.09c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297l1.645 1.092-.005.016c.325 1.191.497 2.493.497 3.834s-.172 2.643-.492 3.834l.005.016-1.645 1.092c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/destinations" className="text-gray-300 hover:text-green-400 transition-colors">Destinations</Link></li>
              <li><Link to="/itinerary" className="text-gray-300 hover:text-green-400 transition-colors">Plan Trip</Link></li>
              <li><Link to="/marketplace" className="text-gray-300 hover:text-green-400 transition-colors">Experiences</Link></li>
              <li><Link to="/maps" className="text-gray-300 hover:text-green-400 transition-colors">Maps</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Travel Guidelines</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Sustainability</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Jharkhand Tourism. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
