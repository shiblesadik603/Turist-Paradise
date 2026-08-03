/** A single tourist spot tile in the search results grid. */
export const SpotCard = ({ spot, onClick }) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "300px",
      textAlign: "center",
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.target.style.transform = "translateY(-5px)";
      e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    }}
  >
    <img
      src={spot.imageUrl}
      alt={spot.name}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
      }}
    />
    <div style={{ padding: "10px" }}>
      <h2 style={{ fontSize: "18px", margin: "10px 0" }}>{spot.name}</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>{spot.description}</p>
      <p style={{ fontSize: "12px", color: "#888" }}>
        Latitude: {spot.latitude}, Longitude: {spot.longitude}
      </p>
    </div>
  </div>
);
