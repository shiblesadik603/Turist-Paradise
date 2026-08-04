import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import TerrainIcon from "@mui/icons-material/Terrain";
import ForestIcon from "@mui/icons-material/Forest";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { TOUR_TYPES } from "./spotCategories";

const ICONS = {
  beach: BeachAccessIcon,
  terrain: TerrainIcon,
  forest: ForestIcon,
  heritage: AccountBalanceIcon,
};

/** 2x2 grid of tour-type category cards; clicking one filters the Destinations grid below. */
export const TourTypes = ({ onSelectType }) => (
  <section className="section tour-types">
    <h2 className="section__title">Tour Types</h2>
    <p className="section__subtitle">Pick a kind of trip, then explore the spots that fit it.</p>

    <div className="tour-types__grid">
      {TOUR_TYPES.map((type) => {
        const Icon = ICONS[type.icon];
        return (
          <button
            key={type.id}
            type="button"
            className="tour-type-card"
            onClick={() => onSelectType(type)}
          >
            <div className="tour-type-card__image-wrap">
              <img src={type.image} alt="" className="tour-type-card__image" />
              <span className="tour-type-card__icon">
                <Icon fontSize="inherit" />
              </span>
            </div>
            <h3 className="tour-type-card__label">{type.label}</h3>
            <p className="tour-type-card__description">{type.description}</p>
          </button>
        );
      })}
    </div>
  </section>
);
