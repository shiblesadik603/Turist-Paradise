import { useEffect, useRef, useState } from "react";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

/** Free, no-key destination search using OpenStreetMap's Nominatim geocoder, restricted to Bangladesh. */
export const PlaceAutocomplete = ({ placeholder, onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return undefined;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams({
        q: query,
        format: "json",
        countrycodes: "bd",
        limit: "6",
      });

      fetch(`${NOMINATIM_URL}?${params}`, { headers: { "Accept-Language": "en" } })
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setOpen(true);
        })
        .catch(() => setSuggestions([]));
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setOpen(false);
    onChange({ label: place.display_name, value: place });
  };

  return (
    <div className="place-autocomplete">
      <input
        type="text"
        className="place-autocomplete__input"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(null);
        }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && suggestions.length > 0 && (
        <ul className="place-autocomplete__list">
          {suggestions.map((place) => (
            <li key={place.place_id} onMouseDown={() => handleSelect(place)}>
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
