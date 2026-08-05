import VerifiedIcon from "@mui/icons-material/Verified";
import MapIcon from "@mui/icons-material/Map";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const VALUES = [
  {
    icon: VerifiedIcon,
    title: "Verified Destinations",
    description:
      "Every spot is checked for accurate coordinates, real photos, and current details.",
  },
  {
    icon: MapIcon,
    title: "Nearby & Directions",
    description:
      "See nearby hotels and get directions from wherever you are, for every destination.",
  },
  {
    icon: AutoAwesomeIcon,
    title: "AI Trip Planning",
    description:
      "Generate a day-by-day itinerary — hotels, sights, and pricing — in a couple of clicks.",
  },
];

/** Trust/value-proposition band — no fabricated ratings or review counts. */
export const QualityBand = () => (
  <section className="quality">
    <div className="quality__inner">
      <h2 className="section__title">Why Explore With Us</h2>
      <div className="quality__grid">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="quality-item">
            <span className="quality-item__icon">
              <Icon fontSize="inherit" />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
