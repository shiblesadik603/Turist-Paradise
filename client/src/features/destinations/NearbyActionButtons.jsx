import { ActionButton } from "./ActionButton";

/** Hotels/Restaurants/Resorts nearby-search shortcuts, plus the Get Directions trigger. */
export const NearbyActionButtons = ({ onFetchNearby, onGetDirections }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "20px",
    }}
  >
    <ActionButton
      onClick={() => onFetchNearby("hotel")}
      color="#667eea"
      hoverColor="#5a67d8"
      shadowColor="rgba(102, 126, 234, 0.3)"
      hoverShadowColor="rgba(102, 126, 234, 0.4)"
    >
      🏨 Hotels
    </ActionButton>
    <ActionButton
      onClick={() => onFetchNearby("restaurant")}
      color="#48bb78"
      hoverColor="#38a169"
      shadowColor="rgba(72, 187, 120, 0.3)"
      hoverShadowColor="rgba(72, 187, 120, 0.4)"
    >
      🍽️ Restaurants
    </ActionButton>
    <ActionButton
      onClick={() => onFetchNearby("resort")}
      color="#ed8936"
      hoverColor="#dd6b20"
      shadowColor="rgba(237, 137, 54, 0.3)"
      hoverShadowColor="rgba(237, 137, 54, 0.4)"
    >
      🏖️ Resorts
    </ActionButton>
    <ActionButton
      onClick={onGetDirections}
      color="#e53e3e"
      hoverColor="#c53030"
      shadowColor="rgba(229, 62, 62, 0.3)"
      hoverShadowColor="rgba(229, 62, 62, 0.4)"
    >
      🗺️ Get Directions
    </ActionButton>
  </div>
);
