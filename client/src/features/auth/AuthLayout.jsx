import "./AuthLayout.css";

/**
 * Full-bleed background photo (perfectly centered/cropped via object-fit: cover)
 * with a glass card holding the form, used by both Login and Signup.
 */
export const AuthLayout = ({ heroImage, heroAlt, eyebrow, tagline, subtitle, children }) => (
  <div className="auth-page">
    <img className="auth-page__bg" src={heroImage} alt={heroAlt} />
    <div className="auth-page__scrim" />

    <div className="auth-page__content">
      <div className="auth-page__intro">
        <span className="auth-page__eyebrow">{eyebrow}</span>
        <h1 className="auth-page__tagline">{tagline}</h1>
        {subtitle && <p className="auth-page__subtitle">{subtitle}</p>}
      </div>

      <div className="auth-card">{children}</div>
    </div>
  </div>
);
