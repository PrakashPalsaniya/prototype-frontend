// src/lib/api.js
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User API Services
export const userAPI = {
  // Authentication
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Profile Management
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  },
};

// Destination API Services
export const destinationAPI = {
  // Create new destination (admin)
  createDestination: async (destinationData) => {
    const response = await api.post('/destinations', destinationData);
    return response.data;
  },

  // Get all destinations with filters
  getAllDestinations: async (params = {}) => {
    const response = await api.get('/destinations', { params });
    return response.data;
  },

  // Get single destination by ID
  getDestination: async (id) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },

  // Get nearby destinations
  getNearbyDestinations: async (latitude, longitude, radius = 50) => {
    const response = await api.get('/destinations/nearby', {
      params: { latitude, longitude, radius }
    });
    return response.data;
  },

  // Get featured destinations
  getFeaturedDestinations: async () => {
    const response = await api.get('/destinations/featured');
    return response.data;
  },
};

// Preferences API Services
export const preferencesAPI = {
  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/preferences', preferences);
    return response.data;
  },

  // Get user preferences
  getPreferences: async () => {
    const response = await api.get('/preferences');
    return response.data;
  },

  // Add visited destination
  addVisitedDestination: async (destinationId, visitData) => {
    const response = await api.post('/preferences/visited', {
      destinationId,
      ...visitData
    });
    return response.data;
  },
};

// Health API Services
export const healthAPI = {
  // Get health route/recommendations
  getHealthRoute: async (userProfile) => {
    const response = await api.get('/health/route', { params: userProfile });
    return response.data;
  },

  // Get health status
  getHealthStatus: async () => {
    const response = await api.get('/health/status');
    return response.data;
  },
};

// Itinerary API Services
export const itineraryAPI = {
  // Generate new itinerary
  generateItinerary: async (preferences) => {
    const response = await api.get('/itinerary/generate', { params: preferences });
    return response.data;
  },

  // Get user's itineraries
  getUserItinerary: async () => {
    const response = await api.get('/itinerary/user');
    return response.data;
  },

  // Get single itinerary
  getSingleItinerary: async (id) => {
    const response = await api.get(`/itinerary/${id}`);
    return response.data;
  },

  // Update itinerary
  updateItinerary: async (id, updateData) => {
    const response = await api.get('/itinerary/update', {
      params: { id, ...updateData }
    });
    return response.data;
  },

  // Save generated itinerary
  saveItinerary: async (itineraryData) => {
    const response = await api.post('/itinerary/save', itineraryData);
    return response.data;
  },
};

// Chat API Services
export const chatAPI = {
  // Initialize chat session
  initializeChat: async (sessionData) => {
    const response = await api.post('/chat/initialize', sessionData);
    return response.data;
  },

  // Send message
  sendMessage: async (message, sessionId) => {
    const response = await api.post('/chat/message', { message, sessionId });
    return response.data;
  },

  // Assign agent
  assignAgent: async (sessionId, agentData) => {
    const response = await api.post('/chat/agent', { sessionId, ...agentData });
    return response.data;
  },

  // Get FAQ suggestions
  getFAQSuggestions: async (query) => {
    const response = await api.get('/chat/faq', { params: { query } });
    return response.data;
  },

  // Get chat history
  getChatHistory: async (sessionId) => {
    const response = await api.get(`/chat/history/${sessionId}`);
    return response.data;
  },

  // End chat session
  endChat: async (sessionId) => {
    const response = await api.post('/chat/end', { sessionId });
    return response.data;
  },
};

// Generic API helper functions
export const apiHelpers = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'Network error - please check your connection',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1,
      };
    }
  },

  // Upload file helper
  uploadFile: async (file, endpoint) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
