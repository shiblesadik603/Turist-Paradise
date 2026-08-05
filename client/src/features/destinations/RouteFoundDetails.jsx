/** Renders distance/duration/mode plus ferry, bridge, complex-route, and warning callouts for a found route. */
export const RouteFoundDetails = ({ travelDetails }) => (
  <>
    <h4
      style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#2d3748",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      🗺️ Travel Information
      {travelDetails.requiresFerry && (
        <span
          style={{
            fontSize: "0.75rem",
            backgroundColor: "#3182ce",
            color: "white",
            padding: "2px 8px",
            borderRadius: "12px",
          }}
        >
          Ferry Required
        </span>
      )}
      {travelDetails.hasBridges && !travelDetails.requiresFerry && (
        <span
          style={{
            fontSize: "0.75rem",
            backgroundColor: "#48bb78",
            color: "white",
            padding: "2px 8px",
            borderRadius: "12px",
          }}
        >
          Bridge Crossing
        </span>
      )}
      {travelDetails.routeComplexity === "complex" && (
        <span
          style={{
            fontSize: "0.75rem",
            backgroundColor: "#ed8936",
            color: "white",
            padding: "2px 8px",
            borderRadius: "12px",
          }}
        >
          Long Route
        </span>
      )}
    </h4>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        marginBottom: "10px",
      }}
    >
      <div>
        <span style={{ fontWeight: "600", color: "#4a5568" }}>Distance:</span>
        <span style={{ marginLeft: "8px", color: "#667eea" }}>{travelDetails.distance}</span>
      </div>
      <div>
        <span style={{ fontWeight: "600", color: "#4a5568" }}>Duration:</span>
        <span style={{ marginLeft: "8px", color: "#667eea" }}>{travelDetails.duration}</span>
      </div>
      <div>
        <span style={{ fontWeight: "600", color: "#4a5568" }}>Mode:</span>
        <span style={{ marginLeft: "8px", color: "#667eea" }}>{travelDetails.travelMode}</span>
      </div>
      <div>
        <span style={{ fontWeight: "600", color: "#4a5568" }}>Straight Line:</span>
        <span style={{ marginLeft: "8px", color: "#667eea" }}>
          {travelDetails.straightLineDistance}
        </span>
      </div>
    </div>

    {travelDetails.requiresFerry && (
      <div
        style={{
          backgroundColor: "#e6f3ff",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #b3d9ff",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>⛴️</span>
          <div>
            <div style={{ fontWeight: "600", color: "#1a365d", fontSize: "0.9rem" }}>
              Ferry Required
            </div>
            <div style={{ color: "#2c5282", fontSize: "0.85rem", marginTop: "2px" }}>
              This route requires taking a ferry. Check ferry schedules and costs before traveling.
            </div>
          </div>
        </div>
      </div>
    )}

    {travelDetails.hasBridges && !travelDetails.requiresFerry && (
      <div
        style={{
          backgroundColor: "#f0fff4",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #9ae6b4",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🌉</span>
          <div>
            <div style={{ fontWeight: "600", color: "#22543d", fontSize: "0.9rem" }}>
              Route includes bridge crossings
            </div>
            <div style={{ color: "#2f855a", fontSize: "0.85rem", marginTop: "2px" }}>
              Normal road route with bridge crossings over rivers or waterways.
            </div>
          </div>
        </div>
      </div>
    )}

    {travelDetails.routeComplexity === "complex" && (
      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ffeaa7",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>⚠️</span>
          <div>
            <div style={{ fontWeight: "600", color: "#856404", fontSize: "0.9rem" }}>
              Long detour route (×{travelDetails.distanceRatio} straight-line distance)
            </div>
            <div style={{ color: "#975a16", fontSize: "0.85rem", marginTop: "2px" }}>
              {travelDetails.routeNote ||
                "This route involves significant detours around geographical features"}
            </div>
          </div>
        </div>
      </div>
    )}

    {travelDetails.warnings && travelDetails.warnings.length > 0 && (
      <div
        style={{
          backgroundColor: "#f7fafc",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          marginTop: "10px",
        }}
      >
        <div
          style={{ fontWeight: "600", color: "#2d3748", fontSize: "0.9rem", marginBottom: "5px" }}
        >
          Route Information:
        </div>
        {travelDetails.warnings.map((warning, index) => (
          <div
            key={index}
            style={{
              color: "#4a5568",
              fontSize: "0.85rem",
              marginBottom: "3px",
              paddingLeft: "8px",
            }}
          >
            • {warning}
          </div>
        ))}
      </div>
    )}
  </>
);
