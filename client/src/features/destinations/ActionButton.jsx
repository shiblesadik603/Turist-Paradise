/** A pill button with a base/hover color pair and a lift-on-hover effect, used by the spot action row. */
export const ActionButton = ({
  onClick,
  color,
  hoverColor,
  shadowColor,
  hoverShadowColor,
  children,
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "12px 20px",
      backgroundColor: color,
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: `0 2px 8px ${shadowColor}`,
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = hoverColor;
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = `0 4px 12px ${hoverShadowColor}`;
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = color;
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = `0 2px 8px ${shadowColor}`;
    }}
  >
    {children}
  </button>
);
