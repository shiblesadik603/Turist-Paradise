import { SpotCard } from "./SpotCard";

/** Search results grid with loading/error/empty states. */
export const SpotGrid = ({ spots, loading, error, onSelectSpot }) => {
  if (loading) {
    return (
      <div className="spots-loading">
        <div className="spots-loading__spinner" />
        Loading destinations...
      </div>
    );
  }

  if (error) {
    return <p className="spots-error">{error}</p>;
  }

  if (spots.length === 0) {
    return <p className="spots-empty">No destinations found. Try a different search.</p>;
  }

  return (
    <div className="spot-grid">
      {spots.map((spot) => (
        <SpotCard key={spot._id} spot={spot} onClick={() => onSelectSpot(spot)} />
      ))}
    </div>
  );
};
