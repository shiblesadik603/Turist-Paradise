import "./AuthLayout.css";

/**
 * Shared split-screen shell for Login/Signup: a full-bleed hero photo with
 * an accent card on one side, a clean form panel on the other.
 */
export const AuthLayout = ({
  heroImage,
  heroAlt,
  accentImage,
  accentAlt,
  eyebrow,
  tagline,
  subtitle,
  children,
}) => (
  <div className="auth-layout">
    <div className="auth-hero">
      <img className="auth-hero__image" src={heroImage} alt={heroAlt} />
      <div className="auth-hero__scrim" />

      <div className="auth-hero__brand">
        <span className="auth-hero__brand-mark">✈</span>
        Tourists
      </div>

      <div className="auth-hero__copy">
        <span className="auth-hero__eyebrow">{eyebrow}</span>
        <h1 className="auth-hero__tagline">{tagline}</h1>
        <p className="auth-hero__subtitle">{subtitle}</p>
      </div>

      <div className="auth-hero__accent">
        <img src={accentImage} alt={accentAlt} />
      </div>
    </div>

    <div className="auth-panel">
      <div className="auth-panel__inner">{children}</div>
    </div>
  </div>
);
