// src/data/experiences.js
export const experiences = [
  {
    id: 1,
    title: "Traditional Handicraft Workshop",
    description: "Learn authentic tribal art and craft techniques from local artisans in a village setting.",
    category: "cultural",
    duration: "4 hours",
    price: 1500,
    rating: 4.8,
    reviews: 45,
    location: "Khunti District",
    images: [
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400"
    ],
    provider: {
      name: "Tribal Arts Collective",
      rating: 4.7,
      verified: true
    },
    highlights: [
      "Hands-on craft learning",
      "Take home your creation",
      "Meet local artisans",
      "Organic lunch included"
    ],
    groupSize: {
      min: 2,
      max: 8
    },
    difficulty: "Beginner",
    includes: ["Materials", "Lunch", "Certificate", "Guide"],
    languages: ["Hindi", "English", "Local dialects"],
    sustainability: {
      communityBenefit: 85,
      environmentalImpact: "Low",
      culturalPreservation: "High"
    }
  },
  {
    id: 2,
    title: "Betla Wildlife Photography Safari",
    description: "Professional wildlife photography experience with expert guides in Betla National Park.",
    category: "wildlife",
    duration: "6 hours",
    price: 3500,
    rating: 4.9,
    reviews: 28,
    location: "Betla National Park",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400"
    ],
    provider: {
      name: "Wild Lens Adventures",
      rating: 4.8,
      verified: true
    },
    highlights: [
      "Professional photography tips",
      "Tiger and elephant spotting",
      "Equipment provided",
      "Photo editing session"
    ],
    groupSize: {
      min: 1,
      max: 4
    },
    difficulty: "Intermediate",
    includes: ["Camera equipment", "Guide", "Permits", "Refreshments"],
    languages: ["Hindi", "English"],
    sustainability: {
      communityBenefit: 70,
      environmentalImpact: "Low",
      culturalPreservation: "Medium"
    }
  },
  {
    id: 3,
    title: "Organic Farm Stay Experience",
    description: "Live with a local family, participate in organic farming, and enjoy farm-to-table meals.",
    category: "agritourism",
    duration: "24 hours",
    price: 2800,
    rating: 4.7,
    reviews: 62,
    location: "Rural Ranchi",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"
    ],
    provider: {
      name: "Green Roots Farm",
      rating: 4.6,
      verified: true
    },
    highlights: [
      "Authentic farm life",
      "Organic cooking class",
      "Comfortable homestay",
      "Sunrise yoga session"
    ],
    groupSize: {
      min: 1,
      max: 6
    },
    difficulty: "Easy",
    includes: ["Accommodation", "All meals", "Activities", "Transport"],
    languages: ["Hindi", "English"],
    sustainability: {
      communityBenefit: 95,
      environmentalImpact: "Positive",
      culturalPreservation: "High"
    }
  },
  {
    id: 4,
    title: "Tribal Folk Dance & Music Evening",
    description: "Immersive cultural evening with traditional performances, storytelling, and local cuisine.",
    category: "cultural",
    duration: "3 hours",
    price: 1200,
    rating: 4.6,
    reviews: 89,
    location: "Cultural Center, Ranchi",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400"
    ],
    provider: {
      name: "Jharkhand Cultural Trust",
      rating: 4.5,
      verified: true
    },
    highlights: [
      "Live folk performances",
      "Interactive dance session",
      "Traditional dinner",
      "Cultural storytelling"
    ],
    groupSize: {
      min: 2,
      max: 20
    },
    difficulty: "Easy",
    includes: ["Performance", "Dinner", "Welcome drink", "Souvenir"],
    languages: ["Hindi", "English", "Tribal languages"],
    sustainability: {
      communityBenefit: 90,
      environmentalImpact: "Low",
      culturalPreservation: "Very High"
    }
  }
];

export const experienceCategories = [
  { id: 'cultural', name: 'Cultural Experiences', icon: '🎭', count: 24 },
  { id: 'wildlife', name: 'Wildlife Adventures', icon: '🦅', count: 18 },
  { id: 'nature', name: 'Nature Activities', icon: '🌿', count: 32 },
  { id: 'adventure', name: 'Adventure Sports', icon: '🏔️', count: 15 },
  { id: 'agritourism', name: 'Farm Experiences', icon: '🌾', count: 12 },
  { id: 'spiritual', name: 'Spiritual Journeys', icon: '🙏', count: 8 }
];
