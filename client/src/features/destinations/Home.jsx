import { useEffect, useState } from "react";
import * as destinationsApi from "../../api/destinations.api";
import { HeroSection } from "./HeroSection";
import { TourTypes } from "./TourTypes";
import { Collections } from "./Collections";
import { FeaturedSpots } from "./FeaturedSpots";
import { QualityBand } from "./QualityBand";
import { AboutSection } from "./AboutSection";
import { SpotGrid } from "./SpotGrid";
import "./Home.css";

const scrollToDestinations = () => {
  document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Home = () => {
  const [touristSpots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterLabel, setActiveFilterLabel] = useState(null);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [spotsError, setSpotsError] = useState(null);

  useEffect(() => {
    destinationsApi
      .getSpots()
      .then((response) => {
        const spots = response.data.data;
        setSpots(spots);
        setFilteredSpots(spots);
      })
      .catch((err) => {
        console.error(err);
        setSpotsError("Failed to load tourist spots. Please try again later.");
      })
      .finally(() => setSpotsLoading(false));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setActiveFilterLabel(null);
    const lowerQuery = query.toLowerCase();
    setFilteredSpots(touristSpots.filter((spot) => spot.name.toLowerCase().includes(lowerQuery)));
  };

  const handleSearchSubmit = () => {
    scrollToDestinations();
  };

  const applyGroupFilter = (label, names) => {
    setSearchQuery("");
    setActiveFilterLabel(label);
    setFilteredSpots(touristSpots.filter((spot) => names.includes(spot.name)));
    scrollToDestinations();
  };

  const handleSelectTourType = (type) => applyGroupFilter(type.label, type.spots);
  const handleSelectCollection = (collection) =>
    applyGroupFilter(collection.label, collection.spots);

  const clearFilter = () => {
    setSearchQuery("");
    setActiveFilterLabel(null);
    setFilteredSpots(touristSpots);
  };

  return (
    <div className="home">
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <TourTypes onSelectType={handleSelectTourType} />
      <Collections onSelectCollection={handleSelectCollection} />
      <FeaturedSpots spots={touristSpots} />
      <QualityBand />
      <AboutSection />

      <section className="section destinations" id="destinations">
        <h2 className="section__title">Destinations</h2>
        <p className="section__subtitle">Browse every spot, or search by name above.</p>

        {activeFilterLabel && (
          <div className="destinations__filter-chip">
            Showing: <strong>{activeFilterLabel}</strong>
            <button type="button" onClick={clearFilter}>
              Clear ×
            </button>
          </div>
        )}

        <SpotGrid spots={filteredSpots} loading={spotsLoading} error={spotsError} />
      </section>
    </div>
  );
};
