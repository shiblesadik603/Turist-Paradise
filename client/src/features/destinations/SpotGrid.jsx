import { SpotCard } from "./SpotCard";

/** Search results grid with loading/error/empty states. */
export const SpotGrid = ({ spots, loading, error, onSelectSpot }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    }}
  >
    {loading ? (
      <p>Loading tourist spots...</p>
    ) : error ? (
      <p style={{ color: "#e53e3e" }}>{error}</p>
    ) : spots.length === 0 ? (
      <p>No tourist spots found.</p>
    ) : (
      spots.map((spot) => (
        <SpotCard key={spot._id} spot={spot} onClick={() => onSelectSpot(spot)} />
      ))
    )}
  </div>
);
