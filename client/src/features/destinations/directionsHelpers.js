/** Great-circle distance between two lat/lng points, in kilometers. */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/** Suggested alternative transport options when no road route exists (e.g. a water crossing). */
export const provideWaterCrossingAlternatives = (straightLineDistance) => {
  const alternativeInfo = {
    type: "water_crossing",
    straightLineDistance: `${straightLineDistance.toFixed(1)} km`,
    alternatives: [],
  };

  alternativeInfo.alternatives.push({
    method: "Ferry Service",
    description: "Look for ferry services that operate between your location and the destination",
    icon: "⛴️",
  });

  if (straightLineDistance > 100) {
    alternativeInfo.alternatives.push({
      method: "Flight",
      description: "Consider flying to the nearest airport to your destination",
      icon: "✈️",
    });
  }

  alternativeInfo.alternatives.push({
    method: "Land Route",
    description:
      "Try finding a route that goes around the water body via bridges or alternative paths",
    icon: "🌉",
  });

  alternativeInfo.alternatives.push({
    method: "Private Boat/Water Taxi",
    description: "Look for private boat services or water taxis in the area",
    icon: "🚤",
  });

  return alternativeInfo;
};
