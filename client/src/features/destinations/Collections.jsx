import { COLLECTIONS } from "./spotCategories";

/** Horizontal-scrolling row of curated collection cards; clicking one filters Destinations. */
export const Collections = ({ onSelectCollection }) => (
  <section className="section collections">
    <h2 className="section__title">Collections</h2>
    <p className="section__subtitle">Curated groupings for the way you like to travel.</p>

    <div className="collections__row">
      {COLLECTIONS.map((collection) => (
        <button
          key={collection.id}
          type="button"
          className="collection-card"
          onClick={() => onSelectCollection(collection)}
        >
          <img src={collection.image} alt="" className="collection-card__image" />
          <div className="collection-card__scrim" />
          <span className="collection-card__label">{collection.label}</span>
        </button>
      ))}
    </div>
  </section>
);
