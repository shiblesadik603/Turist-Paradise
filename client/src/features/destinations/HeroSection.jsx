import SearchIcon from "@mui/icons-material/Search";

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cox%27s_Bazaar_Sunset_Sep2019.jpg/500px-Cox%27s_Bazaar_Sunset_Sep2019.jpg";

/** Full-bleed hero with a search bar that filters the Destinations grid below. */
export const HeroSection = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section className="hero">
      <img src={HERO_IMAGE} alt="" className="hero__bg" />
      <div className="hero__scrim" />
      <div className="hero__content">
        <span className="hero__eyebrow">Discover Bangladesh</span>
        <h1 className="hero__title">Find Your Next Adventure</h1>
        <p className="hero__subtitle">
          Beaches, hills, forests, and centuries of history — explore Bangladesh&apos;s most iconic
          destinations and plan your trip in one place.
        </p>

        <form className="hero__search" onSubmit={handleSubmit}>
          <SearchIcon className="hero__search-icon" />
          <input
            type="text"
            placeholder="Search destinations by name…"
            value={searchQuery}
            onChange={onSearchChange}
            aria-label="Search destinations"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
};
