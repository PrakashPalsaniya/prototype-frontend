// src/data/itineraries.js
export const itineraries = [
  {
    id: 1,
    title: "Eco-Cultural Jharkhand Explorer",
    description: "A perfect blend of nature, wildlife, and tribal culture showcasing sustainable tourism practices across Jharkhand.",
    userId: 1,
    duration: 7,
    startDate: "2025-10-15",
    endDate: "2025-10-21",
    groupSize: 4,
    groupType: "family",
    status: "published",
    featured: true,
    aiGenerated: true,
    budget: {
      total: 45000,
      currency: "INR",
      budgetType: "medium",
      breakdown: {
        accommodation: 18000,
        transport: 12000,
        activities: 8000,
        food: 5000,
        miscellaneous: 2000
      }
    },
    tags: ["Wildlife", "Culture", "Nature", "Eco-Tourism"],
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    ratings: {
      average: 4.8,
      count: 24
    },
    days: [
      {
        day: 1,
        title: "Arrival in Ranchi - City Exploration",
        description: "Arrive in Ranchi, check-in to eco-friendly accommodation, and explore local markets",
        activities: [
          {
            time: "09:00",
            title: "Airport Pickup",
            description: "Arrival at Ranchi Airport",
            duration: 60,
            cost: 500,
            type: "transport"
          },
          {
            time: "10:30",
            title: "Hotel Check-in",
            description: "Eco-friendly hotel with sustainable practices",
            duration: 60,
            cost: 0,
            type: "accommodation"
          },
          {
            time: "14:00",
            title: "Ranchi Market Tour",
            description: "Explore local handicrafts and tribal art",
            duration: 180,
            cost: 1000,
            type: "cultural"
          },
          {
            time: "18:00",
            title: "Traditional Dinner",
            description: "Authentic Jharkhandi cuisine",
            duration: 120,
            cost: 800,
            type: "dining"
          }
        ],
        accommodation: {
          name: "Green Valley Resort",
          type: "Eco Resort",
          rating: 4.5,
          price: 2500,
          features: ["Solar Power", "Organic Garden", "Local Staff"]
        },
        transport: {
          mode: "Private Car",
          distance: "45 km",
          cost: 1500
        },
        totalCost: 3800
      },
      {
        day: 2,
        title: "Betla National Park Safari",
        description: "Wildlife safari and nature exploration in Betla National Park",
        activities: [
          {
            time: "05:30",
            title: "Early Morning Safari",
            description: "Tiger and elephant spotting in natural habitat",
            duration: 240,
            cost: 2000,
            type: "wildlife"
          },
          {
            time: "11:00",
            title: "Nature Walk",
            description: "Guided forest trail with bird watching",
            duration: 120,
            cost: 500,
            type: "nature"
          },
          {
            time: "15:00",
            title: "Tribal Village Visit",
            description: "Interact with local communities",
            duration: 180,
            cost: 800,
            type: "cultural"
          }
        ],
        accommodation: {
          name: "Forest Lodge Betla",
          type: "Eco Lodge",
          rating: 4.3,
          price: 2000,
          features: ["Forest View", "Local Cuisine", "Naturalist Guide"]
        },
        transport: {
          mode: "Safari Jeep",
          distance: "120 km",
          cost: 2500
        },
        totalCost: 5800
      }
    ],
    highlights: [
      "Wildlife safari in Betla National Park",
      "Traditional tribal village experience",
      "Eco-friendly accommodations",
      "Local handicraft workshops"
    ],
    includes: [
      "Accommodation for 6 nights",
      "All meals as mentioned",
      "Private transportation",
      "Professional guide",
      "Entry fees to attractions"
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance"
    ],
    sustainabilityFeatures: [
      "Community-based tourism",
      "Eco-friendly accommodations",
      "Local guide employment",
      "Wildlife conservation support"
    ]
  },
  {
    id: 2,
    title: "Jharkhand Waterfall Circuit",
    slug: "jharkhand-waterfall-circuit",
    description: "Discover the most beautiful waterfalls of Jharkhand while supporting local communities and environmental conservation.",
    userId: 2,
    duration: 5,
    startDate: "2025-11-01",
    endDate: "2025-11-05",
    groupSize: 2,
    groupType: "couple",
    status: "published",
    featured: false,
    aiGenerated: true,
    budget: {
      total: 25000,
      currency: "INR",
      budgetType: "medium",
      breakdown: {
        accommodation: 10000,
        transport: 8000,
        activities: 4000,
        food: 2500,
        miscellaneous: 500
      }
    },
    tags: ["Waterfalls", "Nature", "Photography", "Adventure"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    ratings: {
      average: 4.6,
      count: 18
    },
    days: [
      {
        day: 1,
        title: "Dassam Falls Adventure",
        description: "Explore the magnificent Dassam Falls with trekking and photography",
        activities: [
          {
            time: "08:00",
            title: "Waterfall Trek",
            description: "Guided trek to Dassam Falls viewpoint",
            duration: 180,
            cost: 800,
            type: "adventure"
          },
          {
            time: "13:00",
            title: "Photography Session",
            description: "Professional waterfall photography workshop",
            duration: 120,
            cost: 1000,
            type: "workshop"
          }
        ],
        totalCost: 4300
      }
    ],
    highlights: [
      "Visit 4 major waterfalls",
      "Photography workshops",
      "Adventure trekking",
      "Local community interaction"
    ]
  }
];

export const itineraryTemplates = [
  {
    id: 1,
    name: "Weekend Nature Escape",
    duration: 2,
    budget: 8000,
    type: "nature",
    description: "Perfect 2-day nature retreat"
  },
  {
    id: 2,
    name: "Cultural Immersion Week",
    duration: 7,
    budget: 35000,
    type: "culture",
    description: "Deep dive into tribal culture"
  },
  {
    id: 3,
    name: "Adventure Seeker Special",
    duration: 5,
    budget: 22000,
    type: "adventure",
    description: "Action-packed adventure tour"
  }
];
