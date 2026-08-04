import { Link } from "react-router-dom";

/** A single tourist spot tile in the search results grid, linking to its detail page. */
export const SpotCard = ({ spot }) => (
  <Link to={`/destinations/${spot.slug}`} className="spot-card">
    <img src={spot.imageUrl} alt={spot.name} className="spot-card__image" />
    <div className="spot-card__body">
      <h3 className="spot-card__name">{spot.name}</h3>
      <p className="spot-card__description">{spot.description}</p>
      <span className="spot-card__cta">View details</span>
    </div>
  </Link>
);
