// src/data/reviews.js
import { users } from './users';

export const reviews = [
  {
    id: 1,
    userId: 1,
    destinationId: 1, // Betla National Park
    rating: 5,
    title: "Amazing Wildlife Experience!",
    content: "Betla National Park exceeded all expectations. The eco-friendly approach and community involvement made this trip truly special. Spotted tigers and learned so much about conservation efforts. The local guides were incredibly knowledgeable about the flora and fauna.",
    date: "2024-09-15",
    helpful: 24,
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300",
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300"
    ],
    verified: true,
    tripType: "family",
    likes: 45,
    dislikes: 2,
    replies: [
      {
        id: 101,
        userId: 2,
        content: "Thanks for sharing! Planning to visit next month with family.",
        date: "2024-09-16",
        helpful: 5
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    destinationId: 2, // Dassam Falls
    rating: 4,
    title: "Breathtaking Waterfall",
    content: "Dassam Falls is absolutely stunning. The trek was moderate and the views were worth every step. Great for photography enthusiasts. Local guides were very knowledgeable. Only downside was the crowds during peak season.",
    date: "2024-08-22",
    helpful: 18,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
    ],
    verified: true,
    tripType: "solo",
    likes: 32,
    dislikes: 1,
    replies: []
  },
  {
    id: 3,
    userId: 1,
    destinationId: 3, // Tribal Heritage Village
    rating: 5,
    title: "Authentic Cultural Experience",
    content: "The tribal heritage village visit was incredible. Learning traditional crafts and experiencing the warm hospitality of the community was unforgettable. Highly recommend for cultural enthusiasts. The handicraft workshop was amazing!",
    date: "2024-07-10",
    helpful: 32,
    verified: true,
    tripType: "couple",
    likes: 58,
    dislikes: 0,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300"
    ],
    replies: [
      {
        id: 102,
        userId: 2,
        content: "Which crafts did you learn? Looking forward to trying this!",
        date: "2024-07-12",
        helpful: 8
      }
    ]
  },
  {
    id: 4,
    userId: 2,
    destinationId: 4, // Jagannath Temple Ranchi
    rating: 4,
    title: "Peaceful Spiritual Journey",
    content: "Beautiful temple with rich architecture and peaceful atmosphere. The morning prayers are especially serene. Good facilities and well-maintained premises. Perfect for those seeking spiritual solace.",
    date: "2024-06-28",
    helpful: 15,
    verified: true,
    tripType: "solo",
    likes: 28,
    dislikes: 1,
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300"
    ],
    replies: []
  },
  {
    id: 5,
    userId: 1,
    destinationId: 5, // Netarhat Hill Station
    rating: 5,
    title: "Queen of Chotanagpur Indeed!",
    content: "Netarhat truly lives up to its name. The sunrise view from the hilltop is absolutely magical. Clean air, pleasant weather, and great hiking trails. The eco-lodge we stayed at was fantastic with solar power and organic food.",
    date: "2024-05-18",
    helpful: 41,
    verified: true,
    tripType: "family",
    likes: 67,
    dislikes: 2,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300"
    ],
    replies: [
      {
        id: 103,
        userId: 2,
        content: "What's the best time to catch the sunrise?",
        date: "2024-05-20",
        helpful: 12
      }
    ]
  },
  {
    id: 6,
    userId: 2,
    destinationId: 6, // Hundru Falls
    rating: 4,
    title: "Adventure Paradise",
    content: "Hundru Falls offers an amazing adventure experience. The 320-foot drop is spectacular! Rock climbing and rappelling activities were well-organized. Safety measures are good. Best visited during monsoon for full water flow.",
    date: "2024-04-25",
    helpful: 23,
    verified: true,
    tripType: "friends",
    likes: 39,
    dislikes: 3,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300"
    ],
    replies: []
  },
  {
    id: 7,
    userId: 1,
    destinationId: 1, // Betla National Park (another review)
    rating: 4,
    title: "Great Wildlife Safari",
    content: "Second visit to Betla and it never disappoints. Saw elephants, deer, and various birds. The forest department is doing excellent conservation work. Safari guides are passionate about wildlife protection.",
    date: "2024-03-12",
    helpful: 19,
    verified: true,
    tripType: "couple",
    likes: 35,
    dislikes: 1,
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300"
    ],
    replies: []
  },
  {
    id: 8,
    userId: 2,
    destinationId: 3, // Tribal Heritage Village (another review)
    rating: 5,
    title: "Life-Changing Cultural Immersion",
    content: "Stayed overnight in the village homestay. The experience of living with a tribal family, learning their customs, and participating in their daily activities was transformative. Genuine sustainable tourism at its best!",
    date: "2024-02-08",
    helpful: 37,
    verified: true,
    tripType: "solo",
    likes: 62,
    dislikes: 0,
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300"
    ],
    replies: [
      {
        id: 104,
        userId: 1,
        content: "How do you book homestay? This sounds amazing!",
        date: "2024-02-10",
        helpful: 15
      }
    ]
  },
  {
    id: 9,
    userId: 1,
    destinationId: 2, // Dassam Falls (another review)
    rating: 4,
    title: "Perfect for Photography",
    content: "Photographer's paradise! The natural lighting and backdrop make for stunning shots. Multiple viewpoints available. Best time is early morning for softer light. The approach road could be better maintained though.",
    date: "2024-01-22",
    helpful: 26,
    verified: true,
    tripType: "solo",
    likes: 44,
    dislikes: 2,
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
    ],
    replies: []
  },
  {
    id: 10,
    userId: 2,
    destinationId: 5, // Netarhat Hill Station (another review)
    rating: 5,
    title: "Perfect Weekend Getaway",
    content: "Netarhat is perfect for a peaceful weekend retreat. Clean environment, cool climate, and beautiful landscapes. The local community is very welcoming. Great place to disconnect from city life and reconnect with nature.",
    date: "2024-01-05",
    helpful: 22,
    verified: true,
    tripType: "family",
    likes: 41,
    dislikes: 1,
    images: [
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300"
    ],
    replies: [
      {
        id: 105,
        userId: 1,
        content: "Any recommendations for family-friendly accommodations?",
        date: "2024-01-07",
        helpful: 9
      }
    ]
  }
];

// Helper functions for reviews
export const getReviewsByDestination = (destinationId) => {
  return reviews.filter(review => review.destinationId === destinationId);
};

export const getReviewsByUser = (userId) => {
  return reviews.filter(review => review.userId === userId);
};

export const getAverageRating = (destinationId) => {
  const destinationReviews = getReviewsByDestination(destinationId);
  if (destinationReviews.length === 0) return 0;
  
  const sum = destinationReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / destinationReviews.length).toFixed(1);
};

export const getTotalReviews = (destinationId) => {
  return getReviewsByDestination(destinationId).length;
};

export const getRecentReviews = (limit = 5) => {
  return reviews
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const getTopRatedReviews = (limit = 5) => {
  return reviews
    .filter(review => review.rating >= 4)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, limit);
};

export const reviewCategories = [
  { id: 'all', name: 'All Reviews', count: reviews.length },
  { id: 'excellent', name: 'Excellent (5★)', count: reviews.filter(r => r.rating === 5).length },
  { id: 'good', name: 'Good (4★)', count: reviews.filter(r => r.rating === 4).length },
  { id: 'average', name: 'Average (3★)', count: reviews.filter(r => r.rating === 3).length },
  { id: 'poor', name: 'Poor (1-2★)', count: reviews.filter(r => r.rating <= 2).length },
  { id: 'verified', name: 'Verified Only', count: reviews.filter(r => r.verified).length }
];

// Review statistics
export const reviewStats = {
  total: reviews.length,
  averageRating: (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
  verifiedPercentage: Math.round((reviews.filter(r => r.verified).length / reviews.length) * 100),
  totalHelpful: reviews.reduce((sum, review) => sum + review.helpful, 0),
  totalLikes: reviews.reduce((sum, review) => sum + review.likes, 0),
  ratingDistribution: {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  }
};

export default reviews;
