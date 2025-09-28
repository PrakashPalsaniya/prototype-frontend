// src/data/dashboard.js
export const dashboardData = {
  stats: {
    totalTrips: 5,
    placesVisited: 18,
    upcomingTrips: 2,
    savedDestinations: 12
  },
  recentActivities: [
    {
      id: 1,
      type: "trip_completed",
      description: "Completed trip to Betla National Park",
      date: "2024-09-20",
      icon: "✅"
    },
    {
      id: 2,
      type: "review_posted",
      description: "Posted review for Dassam Falls",
      date: "2024-09-18",
      icon: "⭐"
    },
    {
      id: 3,
      type: "destination_saved",
      description: "Saved Netarhat Hill Station",
      date: "2024-09-15",
      icon: "❤️"
    }
  ],
  upcomingTrips: [
    {
      id: 1,
      title: "Jharkhand Cultural Circuit",
      startDate: "2024-10-15",
      duration: 5,
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300"
    },
    {
      id: 2,
      title: "Waterfall Photography Tour",
      startDate: "2024-11-02",
      duration: 3,
      status: "planning",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
    }
  ],
  recommendedDestinations: [
    {
      id: 4,
      name: "Jagannath Temple Ranchi",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300",
      reason: "Based on your interest in cultural sites"
    },
    {
      id: 5,
      name: "Netarhat Hill Station",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
      reason: "Perfect for your next nature retreat"
    }
  ]
};
