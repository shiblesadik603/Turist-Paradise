/** A single tourist spot tile in the search results grid. */
export const SpotCard = ({ spot, onClick }) => (
  <div className="spot-card" onClick={onClick}>
    <img src={spot.imageUrl} alt={spot.name} className="spot-card__image" />
    <div className="spot-card__body">
      <h3 className="spot-card__name">{spot.name}</h3>
      <p className="spot-card__description">{spot.description}</p>
      <span className="spot-card__cta">View details</span>
    </div>
  </div>
);
