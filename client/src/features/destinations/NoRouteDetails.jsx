/** Renders the "no road route" message plus alternative transport suggestions (ferry, flight, land route, etc). */
export const NoRouteDetails = ({ travelDetails }) => (
  <>
    <h4
      style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#dc2626",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      🚫 No Road Route Available
    </h4>

    <p style={{ color: "#4a5568", marginBottom: "15px" }}>{travelDetails.message}</p>

    <div style={{ marginBottom: "15px" }}>
      <span style={{ fontWeight: "600", color: "#4a5568" }}>Straight-line distance:</span>
      <span style={{ marginLeft: "8px", color: "#667eea" }}>
        {travelDetails.straightLineDistance}
      </span>
    </div>

    <div>
      <h5
        style={{
          fontWeight: "600",
          color: "#2d3748",
          marginBottom: "10px",
        }}
      >
        Alternative Transportation Options:
      </h5>

      {travelDetails.alternatives.map((alternative, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "12px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>{alternative.icon}</span>
          <div>
            <div style={{ fontWeight: "600", color: "#2d3748" }}>{alternative.method}</div>
            <div style={{ fontSize: "0.9rem", color: "#4a5568", marginTop: "2px" }}>
              {alternative.description}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        backgroundColor: "#e6f3ff",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #b3d9ff",
        marginTop: "15px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>💡</span>
        <span style={{ color: "#1a365d", fontSize: "0.9rem", fontWeight: "500" }}>
          Tip: Contact local travel agencies or tourism offices for the best transportation options
          to reach this destination.
        </span>
      </div>
    </div>
  </>
);
