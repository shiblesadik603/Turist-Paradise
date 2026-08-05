import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet's default marker icon paths break under bundlers (Vite/webpack) — point them at the
// bundled image assets instead.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/** The map panel for the selected spot: its marker, nearby-place markers, and any rendered route. */
export const SpotMap = ({
  selectedSpot,
  nearbyPlaces,
  selectedPlace,
  onSelectPlace,
  directions,
}) => {
  const center = [parseFloat(selectedSpot.latitude), parseFloat(selectedSpot.longitude)];

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0",
      }}
    >
      <MapContainer center={center} zoom={12} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} />

        {nearbyPlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            eventHandlers={{ click: () => onSelectPlace(place) }}
          />
        ))}

        {selectedPlace && (
          <Popup
            position={[selectedPlace.lat, selectedPlace.lng]}
            eventHandlers={{ remove: () => onSelectPlace(null) }}
          >
            <div>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.address}</p>
            </div>
          </Popup>
        )}

        {directions && directions.length > 0 && (
          <Polyline positions={directions} pathOptions={{ color: "#2c3e50", weight: 4 }} />
        )}
      </MapContainer>
    </div>
  );
};
