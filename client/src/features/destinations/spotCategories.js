/**
 * Client-side grouping of the seeded tourist spots for the home page's Tour Types and
 * Collections sections. Keyed by exact spot name from server/src/seed/touristSpots.data.js —
 * purely presentational, doesn't require a backend field.
 */

export const TOUR_TYPES = [
  {
    id: "beaches",
    label: "Beaches & Islands",
    icon: "beach",
    description: "Golden coastlines and a coral island, from lively boardwalks to quiet shores.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cox%27s_Bazaar_Sunset_Sep2019.jpg/500px-Cox%27s_Bazaar_Sunset_Sep2019.jpg",
    spots: ["Cox's Bazar Sea Beach", "Saint Martin's Island", "Kuakata Sea Beach"],
  },
  {
    id: "hills",
    label: "Hills & Valleys",
    icon: "terrain",
    description: "Cloud-covered peaks and river-cut valleys in the Chittagong and Sylhet hills.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sajek_Valley_2_%28cropped%29.jpg/500px-Sajek_Valley_2_%28cropped%29.jpg",
    spots: ["Sajek Valley", "Nilgiri, Bandarban", "Jaflong"],
  },
  {
    id: "nature",
    label: "Forests & Wetlands",
    icon: "forest",
    description: "Mangrove tiger territory, a submerged swamp forest, and rolling tea estates.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Save_the_sundarbans_20.jpg/500px-Save_the_sundarbans_20.jpg",
    spots: [
      "Sundarbans",
      "Ratargul Swamp Forest",
      "Kaptai Lake, Rangamati",
      "Sreemangal Tea Gardens",
    ],
  },
  {
    id: "heritage",
    label: "Historical & Heritage",
    icon: "heritage",
    description: "A UNESCO monastery and an abandoned river-port city, centuries in the making.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paharpur_Buddhist_Bihar.jpg/500px-Paharpur_Buddhist_Bihar.jpg",
    spots: ["Paharpur (Somapura Mahavihara)", "Sonargaon (Panam City)"],
  },
];

export const COLLECTIONS = [
  {
    id: "sunrise-sunset",
    label: "Sunrise & Sunset Coasts",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kuakata_sea_beach_evening.jpg/500px-Kuakata_sea_beach_evening.jpg",
    spots: ["Cox's Bazar Sea Beach", "Kuakata Sea Beach"],
  },
  {
    id: "above-the-clouds",
    label: "Above the Clouds",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Nilgiri%2C_bandarban_in_Bangladesh.png/500px-Nilgiri%2C_bandarban_in_Bangladesh.png",
    spots: ["Sajek Valley", "Nilgiri, Bandarban"],
  },
  {
    id: "heritage-trails",
    label: "UNESCO & Heritage Trails",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/%E0%A6%B8%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A6%BE%E0%A6%81%E0%A6%93_%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BE%E0%A6%AE_%E0%A6%A8%E0%A6%97%E0%A6%B0_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%A8_%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%AA%E0%A6%A8%E0%A6%BE-2.jpg/500px-%E0%A6%B8%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A6%BE%E0%A6%81%E0%A6%93_%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BE%E0%A6%AE_%E0%A6%A8%E0%A6%97%E0%A6%B0_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%A8_%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%AA%E0%A6%A8%E0%A6%BE-2.jpg",
    spots: ["Paharpur (Somapura Mahavihara)", "Sonargaon (Panam City)"],
  },
  {
    id: "wild-bangladesh",
    label: "Wild Bangladesh",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF%E0%A6%A4%E0%A7%87_%E0%A6%A8%E0%A6%BF%E0%A6%AE%E0%A6%9C%E0%A7%8D%E0%A6%9C%E0%A6%BF%E0%A6%A4_%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A7%81%E0%A6%B2_%E0%A6%9C%E0%A6%B2%E0%A6%BE%E0%A6%AC%E0%A6%A8%E0%A7%87%E0%A6%B0_%E0%A6%97%E0%A6%BE%E0%A6%9B.jpg/500px-%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF%E0%A6%A4%E0%A7%87_%E0%A6%A8%E0%A6%BF%E0%A6%AE%E0%A6%9C%E0%A7%8D%E0%A6%9C%E0%A6%BF%E0%A6%A4_%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A7%81%E0%A6%B2_%E0%A6%9C%E0%A6%B2%E0%A6%BE%E0%A6%AC%E0%A6%A8%E0%A7%87%E0%A6%B0_%E0%A6%97%E0%A6%BE%E0%A6%9B.jpg",
    spots: ["Sundarbans", "Ratargul Swamp Forest"],
  },
  {
    id: "off-the-beaten-path",
    label: "Off the Beaten Path",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Zero_Point_at_Zuflong.jpg/500px-Zero_Point_at_Zuflong.jpg",
    spots: ["Jaflong", "Kaptai Lake, Rangamati", "Sreemangal Tea Gardens"],
  },
];

export const FEATURED_SPOT_NAMES = ["Saint Martin's Island", "Sajek Valley", "Sundarbans"];

/** Given a spot's name, returns the label of its tour type, or null if uncategorized. */
export const getTourTypeLabel = (spotName) => {
  const match = TOUR_TYPES.find((type) => type.spots.includes(spotName));
  return match ? match.label : null;
};
