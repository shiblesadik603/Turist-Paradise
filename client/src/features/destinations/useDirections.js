import { useCallback, useState } from "react";
import { calculateDistance, provideWaterCrossingAlternatives } from "./directionsHelpers";

const OSRM_ROUTE_URL = "https://router.project-osrm.org/route/v1/driving";

/** Drives the "Get Directions" flow: geolocation → OSRM driving route → falls back to alternative-transport suggestions. */
export const useDirections = () => {
  const [directions, setDirections] = useState(null);
  const [travelDetails, setTravelDetails] = useState(null);

  const reset = useCallback(() => {
    setDirections(null);
    setTravelDetails(null);
  }, []);

  const getDirections = (selectedSpot) => {
    if (!selectedSpot) {
      alert("Please select a tourist spot first.");
      return;
    }

    reset();

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const destination = {
          lat: parseFloat(selectedSpot.latitude),
          lng: parseFloat(selectedSpot.longitude),
        };
        const straightLineDistance = calculateDistance(
          latitude,
          longitude,
          destination.lat,
          destination.lng
        );

        try {
          const url = `${OSRM_ROUTE_URL}/${longitude},${latitude};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.code !== "Ok" || !data.routes?.length) {
            throw new Error("No route found");
          }

          const route = data.routes[0];
          const routeCoords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          const distanceKm = route.distance / 1000;
          const durationMin = route.duration / 60;
          const distanceRatio = distanceKm / straightLineDistance;

          setDirections(routeCoords);
          setTravelDetails({
            type: "route_found",
            distance: `${distanceKm.toFixed(1)} km`,
            duration:
              durationMin >= 60
                ? `${(durationMin / 60).toFixed(1)} hours`
                : `${Math.round(durationMin)} mins`,
            travelMode: "Driving",
            straightLineDistance: `${straightLineDistance.toFixed(1)} km`,
            routeComplexity: distanceRatio > 2 ? "complex" : "direct",
            distanceRatio: distanceRatio.toFixed(1),
            warnings: [],
          });
        } catch {
          const alternatives = provideWaterCrossingAlternatives(straightLineDistance);
          setTravelDetails({
            type: "no_route_found",
            straightLineDistance: alternatives.straightLineDistance,
            alternatives: alternatives.alternatives,
            message:
              "No driving route found. This might be due to a water body between locations, or the route isn't mapped.",
          });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to get your current location. Please enable location services.");
      }
    );
  };

  return { directions, travelDetails, getDirections, resetDirections: reset };
};
