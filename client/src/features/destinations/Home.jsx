import { useEffect, useState } from "react";
import * as destinationsApi from "../../api/destinations.api";
import * as mapsApi from "../../api/maps.api";
import { useDirections } from "./useDirections";
import { SpotGrid } from "./SpotGrid";
import { SpotDetailsPanel } from "./SpotDetailsPanel";

export const Home = () => {
  const [touristSpots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]); // To store filtered spots
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [spotsError, setSpotsError] = useState(null);

  const { directions, travelDetails, getDirections, resetDirections } = useDirections();

  useEffect(() => {
    destinationsApi
      .getSpots()
      .then((response) => {
        const spots = response.data.data;
        setSpots(spots);
        setFilteredSpots(spots); // Initialize with all spots
      })
      .catch((err) => {
        console.error(err);
        setSpotsError("Failed to load tourist spots. Please try again later.");
      })
      .finally(() => setSpotsLoading(false));
  }, []);

  // Handle search query changes
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = touristSpots.filter((spot) => spot.name.toLowerCase().includes(query));
    setFilteredSpots(filtered);
  };

  const fetchNearbyPlaces = (lat, lng, type) => {
    const radius = 5000; // 20 km
    mapsApi
      .getNearbyPlaces(`${lat},${lng}`, radius, type)
      .then((response) => {
        const places = response.data.data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          address: place.vicinity,
        }));
        setNearbyPlaces(places);
      })
      .catch((error) => console.error("Error fetching places:", error));
  };

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot);
    // Clear previous travel details and directions
    resetDirections();
    // Fetch nearby places for the new spot
    fetchNearbyPlaces(spot.latitude, spot.longitude, "hotel");

    // Smooth scroll to map section
    setTimeout(() => {
      const mapSection = document.getElementById("map-section");
      if (mapSection) {
        mapSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Clear directions and travel details when selected spot changes
  useEffect(() => {
    resetDirections();
  }, [selectedSpot, resetDirections]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        overflowY: "auto",
        maxHeight: "90vh",
        marginTop: "30px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Tourist Spots</h2>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: "50%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <SpotGrid
        spots={filteredSpots}
        loading={spotsLoading}
        error={spotsError}
        onSelectSpot={handleSelectSpot}
      />

      {selectedSpot && (
        <SpotDetailsPanel
          selectedSpot={selectedSpot}
          nearbyPlaces={nearbyPlaces}
          selectedPlace={selectedPlace}
          onSelectPlace={setSelectedPlace}
          directions={directions}
          travelDetails={travelDetails}
          onFetchNearby={(type) =>
            fetchNearbyPlaces(selectedSpot.latitude, selectedSpot.longitude, type)
          }
          onGetDirections={() => getDirections(selectedSpot)}
        />
      )}
    </div>
  );
};
