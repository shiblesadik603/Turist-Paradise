/** Duration/travelers/budget stats, hotel cards, and itinerary timeline for one trip plan. Shared by the inline "just generated" view and the saved-trips modal. */
export const TripPlanDetails = ({ plan }) => (
  <>
    <div className="trip-stats">
      <div className="trip-stat">
        <span className="trip-stat__icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
          </svg>
        </span>
        <span className="trip-stat__label">Duration</span>
        <span className="trip-stat__value">{plan.duration}</span>
      </div>
      <div className="trip-stat">
        <span className="trip-stat__icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.27c-.41.55-.63 1.24-.59 1.93V22h-6v-2h4v-4h-2.5l-2.54-7.63A1.5 1.5 0 0 0 4.54 8H3c-.8 0-1.54.37-2.01 1L0 15v7h2v-6h2.5l2.04 6.13c.41 1.02 1.37 1.87 2.46 1.87H9c.8 0 1.54-.37 2.01-1l4.7-6.27c.41-.55.63-1.24.59-1.93V6h6v2h-4v4h2.5l2.04 6.13c.41 1.02 1.37 1.87 2.46 1.87H22v-2h-2z" />
          </svg>
        </span>
        <span className="trip-stat__label">Travelers</span>
        <span className="trip-stat__value">{plan.travelers}</span>
      </div>
      <div className="trip-stat">
        <span className="trip-stat__icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
          </svg>
        </span>
        <span className="trip-stat__label">Budget</span>
        <span className="trip-stat__value">{plan.budget}</span>
      </div>
    </div>

    <div className="trip-section">
      <h4>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 13c1.65 0 3-1.35 3-3S8.65 7 7 7s-3 1.35-3 3 1.35 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
        </svg>
        Hotels
      </h4>
      <div className="hotel-grid">
        {plan.hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <div className="hotel-card__header">
              <h5>{hotel.hotelName}</h5>
              {hotel.price && <span className="hotel-card__price">{hotel.price}</span>}
            </div>
            <p className="hotel-card__address">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {hotel.hotelAddress}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="trip-section">
      <h4>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
        Itinerary
      </h4>
      <div className="itinerary-timeline">
        {plan.itinerary.map((day, index) => (
          <div key={index} className="itinerary-day">
            <div className="itinerary-day__header">
              <span className="itinerary-day__badge">Day {day.day}</span>
              <h5>{day.theme}</h5>
            </div>
            <ul className="itinerary-day__places">
              {day.plan.map((place, idx) => (
                <li key={idx}>
                  <strong>{place.placeName}</strong>
                  <p>{place.placeDetails}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </>
);
