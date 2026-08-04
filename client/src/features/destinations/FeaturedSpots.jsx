import { Link } from "react-router-dom";
import { FEATURED_SPOT_NAMES, getTourTypeLabel } from "./spotCategories";

/** Large feature cards for a handful of standout spots, pulled from the live spots list. */
export const FeaturedSpots = ({ spots }) => {
  const featured = FEATURED_SPOT_NAMES.map((name) =>
    spots.find((spot) => spot.name === name)
  ).filter(Boolean);

  if (featured.length === 0) return null;

  return (
    <section className="section featured">
      <h2 className="section__title">Featured Destinations</h2>
      <p className="section__subtitle">A few of the most unforgettable spots to start with.</p>

      <div className="featured__grid">
        {featured.map((spot) => (
          <div key={spot._id} className="featured-card">
            <div className="featured-card__image-wrap">
              <img src={spot.imageUrl} alt={spot.name} className="featured-card__image" />
              <span className="featured-card__badge">Featured</span>
            </div>
            <div className="featured-card__body">
              <span className="featured-card__type">{getTourTypeLabel(spot.name)}</span>
              <h3 className="featured-card__name">{spot.name}</h3>
              <p className="featured-card__description">{spot.description}</p>
              <Link to={`/destinations/${spot.slug}`} className="featured-card__cta">
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
