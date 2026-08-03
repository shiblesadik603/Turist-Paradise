import { useCallback, useState } from "react";
import { calculateDistance, provideWaterCrossingAlternatives } from "./directionsHelpers";

/** Drives the "Get Directions" flow: geolocation → try driving/transit/walking → falls back to alternative-transport suggestions. */
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
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        const destination = {
          lat: parseFloat(selectedSpot.latitude),
          lng: parseFloat(selectedSpot.longitude),
        };

        // Enhanced travel modes with priorities
        const travelModes = [
          { mode: window.google.maps.TravelMode.DRIVING, name: "Driving", allowFerries: true },
          {
            mode: window.google.maps.TravelMode.TRANSIT,
            name: "Public Transit",
            allowFerries: true,
          },
          { mode: window.google.maps.TravelMode.WALKING, name: "Walking", allowFerries: true },
        ];

        const directionsService = new window.google.maps.DirectionsService();
        const distanceService = new window.google.maps.DistanceMatrixService();

        const straightLineDistance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          destination.lat,
          destination.lng
        );

        const tryNextTravelMode = (index) => {
          if (index >= travelModes.length) {
            // All travel modes failed, provide water crossing alternatives
            const alternatives = provideWaterCrossingAlternatives(straightLineDistance);

            setTravelDetails({
              type: "no_route_found",
              straightLineDistance: alternatives.straightLineDistance,
              alternatives: alternatives.alternatives,
              message:
                "No direct route found. This might be due to a water body between locations.",
            });

            return;
          }

          const currentMode = travelModes[index];
          const request = {
            origin: userLocation,
            destination: destination,
            travelMode: currentMode.mode,
            provideRouteAlternatives: true,
            avoidFerries: !currentMode.allowFerries,
            avoidHighways: false,
            avoidTolls: false,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          };

          directionsService.route(request, (result, status) => {
            if (status === "OK") {
              const route = result.routes[0];
              const leg = route.legs[0];

              // Check for ferry warnings or water crossings
              const hasWaterCrossing = route.warnings?.some(
                (warning) =>
                  warning.toLowerCase().includes("ferry") ||
                  warning.toLowerCase().includes("water") ||
                  warning.toLowerCase().includes("bridge")
              );

              // Check if the route distance is significantly longer than straight-line distance
              const routeDistanceKm = parseFloat(leg.distance.text.replace(/[^\d.]/g, ""));
              const distanceRatio = routeDistanceKm / straightLineDistance;

              setDirections(result);
              setTravelDetails({
                type: "route_found",
                distance: leg.distance.text,
                duration: leg.duration.text,
                travelMode: currentMode.name,
                straightLineDistance: `${straightLineDistance.toFixed(1)} km`,
                hasWaterCrossing: hasWaterCrossing,
                routeComplexity: distanceRatio > 2 ? "complex" : "direct",
                warnings: route.warnings || [],
                ferryInfo: hasWaterCrossing
                  ? "This route may include water crossings or ferries"
                  : null,
              });
            } else if (status === "ZERO_RESULTS" || status === "NOT_FOUND") {
              // Try next travel mode
              tryNextTravelMode(index + 1);
            } else {
              console.error(`Directions request failed: ${status}`);
              tryNextTravelMode(index + 1);
            }
          });
        };

        // Also try Distance Matrix API for additional information
        distanceService.getDistanceMatrix(
          {
            origins: [userLocation],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false,
          },
          (response, status) => {
            if (status === "OK" && response.rows[0].elements[0].status === "OK") {
              // Distance Matrix found a route, proceed with directions
              tryNextTravelMode(0);
            } else {
              // Distance Matrix also failed, likely water crossing
              const alternatives = provideWaterCrossingAlternatives(straightLineDistance);
              setTravelDetails({
                type: "no_route_found",
                straightLineDistance: alternatives.straightLineDistance,
                alternatives: alternatives.alternatives,
                message: "No land route available. Consider alternative transportation methods.",
              });
            }
          }
        );
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to get your current location. Please enable location services.");
      }
    );
  };

  return { directions, travelDetails, getDirections, resetDirections: reset };
};
