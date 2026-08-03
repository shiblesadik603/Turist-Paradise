import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";

/** The map panel for the selected spot: its marker, nearby-place markers, and any rendered directions. */
export const SpotMap = ({
  selectedSpot,
  nearbyPlaces,
  selectedPlace,
  onSelectPlace,
  directions,
}) => (
  <div
    style={{
      width: "50%",
      height: "500px",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
    }}
  >
    <GoogleMap
      center={{
        lat: parseFloat(selectedSpot.latitude),
        lng: parseFloat(selectedSpot.longitude),
      }}
      zoom={12}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      <Marker
        position={{
          lat: parseFloat(selectedSpot.latitude),
          lng: parseFloat(selectedSpot.longitude),
        }}
      />
      {nearbyPlaces.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          title={place.name}
          onClick={() => onSelectPlace(place)}
        />
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          onCloseClick={() => onSelectPlace(null)}
        >
          <div>
            <h3>{selectedPlace.name}</h3>
            <p>{selectedPlace.address}</p>
          </div>
        </InfoWindow>
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  </div>
);
