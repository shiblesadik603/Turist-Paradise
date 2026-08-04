/** Proxies OpenStreetMap Overpass nearby-place searches (free, no API key required). */
const axios = require("axios");
const ApiError = require("../utils/ApiError");

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const TYPE_TAGS = {
  hotel: '["tourism"="hotel"]',
  resort: '["tourism"="resort"]',
  restaurant: '["amenity"="restaurant"]',
};

const formatAddress = (tags = {}) =>
  [tags["addr:housenumber"], tags["addr:street"], tags["addr:city"]].filter(Boolean).join(", ");

/** Shapes the response like Google's Places Nearby Search so the frontend doesn't need to change. */
const getNearbyPlaces = async ({ location, radius, type }) => {
  const tagFilter = TYPE_TAGS[type];
  if (!tagFilter) {
    throw new ApiError(400, `Unsupported place type: ${type}`);
  }

  const [lat, lng] = String(location).split(",");
  const query = `[out:json][timeout:25];(node${tagFilter}(around:${radius},${lat},${lng});way${tagFilter}(around:${radius},${lat},${lng}););out center 20;`;

  let response;
  try {
    response = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Tourists-Travel-App/1.0",
      },
    });
  } catch {
    throw new ApiError(500, "Failed to fetch data from Overpass API");
  }

  const results = (response.data.elements || [])
    .filter((el) => el.tags?.name)
    .map((el) => {
      const elLat = el.type === "node" ? el.lat : el.center?.lat;
      const elLng = el.type === "node" ? el.lon : el.center?.lon;
      return {
        place_id: `${el.type}/${el.id}`,
        name: el.tags.name,
        geometry: { location: { lat: elLat, lng: elLng } },
        vicinity: formatAddress(el.tags),
      };
    });

  return { results };
};

module.exports = { getNearbyPlaces };
