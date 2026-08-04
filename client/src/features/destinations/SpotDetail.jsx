import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import * as destinationsApi from "../../api/destinations.api";
import * as mapsApi from "../../api/maps.api";
import Weather from "../weather/Weather";
import { useDirections } from "./useDirections";
import { SpotMap } from "./SpotMap";
import { NearbyActionButtons } from "./NearbyActionButtons";
import { TravelDetailsPanel } from "./TravelDetailsPanel";
import { getTourTypeLabel } from "./spotCategories";
import { getRideIcon } from "./rideOptionIcons";
import "./SpotDetail.css";

export const SpotDetail = () => {
  const { slug } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { directions, travelDetails, getDirections, resetDirections } = useDirections();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSpot(null);
    resetDirections();
    setNearbyPlaces([]);
    setSelectedPlace(null);

    destinationsApi
      .getSpotBySlug(slug)
      .then((response) => setSpot(response.data.data))
      .catch((err) => {
        console.error(err);
        setError("We couldn't find that destination. It may have been moved or removed.");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchNearbyPlaces = (type) => {
    if (!spot) return;
    mapsApi
      .getNearbyPlaces(`${spot.latitude},${spot.longitude}`, 5000, type)
      .then((response) => {
        const places = response.data.data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          address: place.vicinity,
        }));
        setNearbyPlaces(places);
      })
      .catch((err) => console.error("Error fetching places:", err));
  };

  if (loading) {
    return (
      <div className="spot-detail-status">
        <div className="spot-detail-status__spinner" />
        Loading destination...
      </div>
    );
  }

  if (error || !spot) {
    return (
      <div className="spot-detail-status">
        <p>{error}</p>
        <Link to="/home" className="spot-detail__back-link">
          <ArrowBackIcon fontSize="small" /> Back to destinations
        </Link>
      </div>
    );
  }

  const tourType = getTourTypeLabel(spot.name);
  const hasAttractions = spot.attractions?.length > 0;
  const hasRideOptions = spot.rideOptions?.length > 0;
  const hasHighlights = spot.highlights?.length > 0;
  const guideNeeded = spot.guideInfo?.needed;

  return (
    <div className="spot-detail">
      <div className="spot-detail__hero">
        <img src={spot.imageUrl} alt="" className="spot-detail__hero-bg" />
        <div className="spot-detail__hero-scrim" />
        <div className="spot-detail__hero-content">
          <Link to="/home#destinations" className="spot-detail__back-link">
            <ArrowBackIcon fontSize="small" /> All destinations
          </Link>
          {tourType && <span className="spot-detail__eyebrow">{tourType}</span>}
          <h1 className="spot-detail__title">{spot.name}</h1>
        </div>
      </div>

      <div className="spot-detail__body">
        <section className="detail-section">
          <h2 className="detail-section__title">Overview</h2>
          <p className="spot-detail__description">{spot.description}</p>
          <div className="spot-detail__facts">
            <span>
              <strong>Coordinates:</strong> {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
            </span>
            {tourType && (
              <span>
                <strong>Tour type:</strong> {tourType}
              </span>
            )}
          </div>
        </section>

        {hasHighlights && (
          <section className="detail-section">
            <h2 className="detail-section__title">Highlights</h2>
            <ul className="highlights-list">
              {spot.highlights.map((highlight) => (
                <li key={highlight}>
                  <CheckCircleIcon fontSize="small" className="highlights-list__icon" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasAttractions && (
          <section className="detail-section">
            <h2 className="detail-section__title">Tourist Spots You Can Visit Here</h2>
            <p className="detail-section__subtitle">
              Places within this area worth building into your itinerary.
            </p>
            <div className="attractions-grid">
              {spot.attractions.map((attraction) => (
                <div key={attraction.name} className="attraction-card">
                  <h3>{attraction.name}</h3>
                  <p>{attraction.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasRideOptions && (
          <section className="detail-section">
            <h2 className="detail-section__title">Getting There &amp; Around</h2>
            <div className="ride-options">
              {spot.rideOptions.map((ride) => {
                const Icon = getRideIcon(ride.mode);
                return (
                  <div key={ride.mode} className="ride-option">
                    <span className="ride-option__icon">
                      <Icon fontSize="inherit" />
                    </span>
                    <div>
                      <h3>{ride.mode}</h3>
                      <p>{ride.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="detail-section">
          <h2 className="detail-section__title">Need a Local Guide?</h2>
          {guideNeeded ? (
            <>
              <p className="detail-section__subtitle">{spot.guideInfo.note}</p>
              <div className="guide-disclaimer">
                <InfoIcon fontSize="small" />
                Sample contacts for demonstration only — replace with real local guides before
                launch.
              </div>
              <div className="guide-grid">
                {spot.guideInfo.guides.map((guide) => (
                  <div key={guide.name} className="guide-card">
                    <h3>{guide.name}</h3>
                    <span className="guide-card__vehicle">{guide.vehicleType}</span>
                    <span className="guide-card__phone">
                      <PhoneIcon fontSize="small" /> {guide.phone}
                    </span>
                    <p>{guide.note}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="detail-section__subtitle">
              No guide is required here — this destination is straightforward to navigate on your
              own.
            </p>
          )}
        </section>

        <section className="detail-section">
          <h2 className="detail-section__title">Nearby Places &amp; Directions</h2>
          <NearbyActionButtons
            onFetchNearby={fetchNearbyPlaces}
            onGetDirections={() => getDirections(spot)}
          />
          {travelDetails && <TravelDetailsPanel travelDetails={travelDetails} />}
        </section>

        <section className="detail-section">
          <h2 className="detail-section__title">Map</h2>
          <SpotMap
            selectedSpot={spot}
            nearbyPlaces={nearbyPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={setSelectedPlace}
            directions={directions}
          />
        </section>

        <section className="detail-section">
          <h2 className="detail-section__title">Weather</h2>
          <div className="weather-card">
            <Weather lat={spot.latitude} lon={spot.longitude} />
          </div>
        </section>
      </div>
    </div>
  );
};
