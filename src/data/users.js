// src/data/users.js
export const users = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
    role: "traveler",
    joinDate: "2024-03-15",
    location: "Delhi, India",
    bio: "Passionate about eco-tourism and cultural experiences. Love exploring offbeat destinations.",
    preferences: {
      interests: ["Culture", "Nature", "Photography"],
      budgetRange: "medium",
      travelStyle: "eco-friendly",
      groupPreference: "small groups"
    },
    stats: {
      tripsCompleted: 12,
      placesVisited: 45,
      reviewsWritten: 28,
      photosShared: 156
    },
    achievements: [
      "Eco Warrior",
      "Culture Explorer",
      "Photo Master",
      "Community Champion"
    ],
    socialLinks: {
      instagram: "@priya.travels",
      facebook: "priya.sharma.travel"
    }
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul.kumar@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    role: "traveler",
    joinDate: "2024-01-20",
    location: "Mumbai, India",
    bio: "Adventure enthusiast and wildlife photographer. Always seeking new experiences in nature.",
    preferences: {
      interests: ["Adventure", "Wildlife", "Photography"],
      budgetRange: "high",
      travelStyle: "adventure",
      groupPreference: "solo"
    },
    stats: {
      tripsCompleted: 8,
      placesVisited: 32,
      reviewsWritten: 15,
      photosShared: 89
    },
    achievements: [
      "Adventure Seeker",
      "Wildlife Expert",
      "Solo Traveler"
    ]
  }
];

export const reviews = [
  {
    id: 1,
    userId: 1,
    destinationId: 1,
    rating: 5,
    title: "Amazing Wildlife Experience!",
    content: "Betla National Park exceeded all expectations. The eco-friendly approach and community involvement made this trip truly special. Spotted tigers and learned so much about conservation efforts.",
    date: "2024-09-15",
    helpful: 24,
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300",
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300"
    ],
    verified: true,
    tripType: "family"
  },
  {
    id: 2,
    userId: 2,
    destinationId: 2,
    rating: 4,
    title: "Breathtaking Waterfall",
    content: "Dassam Falls is absolutely stunning. The trek was moderate and the views were worth every step. Great for photography enthusiasts. Local guides were very knowledgeable.",
    date: "2024-08-22",
    helpful: 18,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
    ],
    verified: true,
    tripType: "solo"
  },
  {
    id: 3,
    userId: 1,
    destinationId: 3,
    rating: 5,
    title: "Authentic Cultural Experience",
    content: "The tribal heritage village visit was incredible. Learning traditional crafts and experiencing the warm hospitality of the community was unforgettable. Highly recommend for cultural enthusiasts.",
    date: "2024-07-10",
    helpful: 32,
    verified: true,
    tripType: "couple"
  }
];
