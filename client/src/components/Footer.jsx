import { Link } from "react-router-dom";
import "./Footer.css";

const DESTINATIONS = [
  "Cox's Bazar Sea Beach",
  "Sundarbans",
  "Sajek Valley",
  "Saint Martin's Island",
  "Sreemangal Tea Gardens",
  "Kuakata Sea Beach",
];

export const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__brand">
        <span className="site-footer__logo">Tourists</span>
        <p>Your companion for exploring Bangladesh — real destinations, real trip planning.</p>
      </div>

      <div className="site-footer__col">
        <h3>Explore</h3>
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/travelplan">Plan a Trip</Link>
        <Link to="/savedplan">My Trips</Link>
      </div>

      <div className="site-footer__col">
        <h3>Destinations</h3>
        {DESTINATIONS.map((name) => (
          <Link key={name} to="/home#destinations">
            {name}
          </Link>
        ))}
      </div>
    </div>

    <div className="site-footer__bottom">
      <span>© {new Date().getFullYear()} Tourists. All rights reserved.</span>
    </div>
  </footer>
);
