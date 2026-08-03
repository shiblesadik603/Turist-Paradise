import Weather from "../weather/Weather";
import { SpotMap } from "./SpotMap";
import { NearbyActionButtons } from "./NearbyActionButtons";
import { TravelDetailsPanel } from "./TravelDetailsPanel";

/** The full "selected spot" view: map, description, nearby-place actions, directions result, and weather. */
export const SpotDetailsPanel = ({
  selectedSpot,
  nearbyPlaces,
  selectedPlace,
  onSelectPlace,
  directions,
  travelDetails,
  onFetchNearby,
  onGetDirections,
}) => (
  <div id="map-section" style={{ paddingTop: "120px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "30px",
        gap: "40px",
      }}
    >
      <SpotMap
        selectedSpot={selectedSpot}
        nearbyPlaces={nearbyPlaces}
        selectedPlace={selectedPlace}
        onSelectPlace={onSelectPlace}
        directions={directions}
      />

      <div style={{ flex: "1" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#2d3748",
            marginBottom: "15px",
          }}
        >
          {selectedSpot.name}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#4a5568",
            lineHeight: "1.6",
            marginBottom: "25px",
          }}
        >
          {selectedSpot.description}
        </p>

        <NearbyActionButtons onFetchNearby={onFetchNearby} onGetDirections={onGetDirections} />

        {travelDetails && <TravelDetailsPanel travelDetails={travelDetails} />}
      </div>
    </div>

    {/* Weather Component */}
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e2e8f0",
      }}
    >
      <Weather lat={selectedSpot.latitude} lon={selectedSpot.longitude} />
    </div>
  </div>
);
