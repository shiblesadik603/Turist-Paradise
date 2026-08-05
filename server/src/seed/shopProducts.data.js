/** Curated product catalog for the shop, grouped by category, used by seed/shopProducts.js. */
const shopProducts = {
  power: [
    {
      id: "pwr-001",
      product_name: "PowerCore 20000mAh Portable Power Bank",
      price: 34.99,
      description:
        "High-capacity battery pack with dual USB-A ports and fast charging — enough to recharge a phone 4-5 times on a single trip.",
      battery_capacity: "20000mAh",
      usb_ports: 2,
      weight: "400g",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Varta_57961_powerbank.jpg/500px-Varta_57961_powerbank.jpg",
    },
    {
      id: "pwr-002",
      product_name: "Universal Travel Plug Adapter",
      price: 19.99,
      description:
        "All-in-one adapter covering 150+ countries' outlet types, with dual USB ports for charging devices alongside your laptop.",
      plug_types: ["UK", "EU", "US", "AU"],
      img_url: "https://upload.wikimedia.org/wikipedia/commons/9/98/Mains_plug_travel_adaptor.jpg",
    },
    {
      id: "pwr-003",
      product_name: "Foldable Solar Panel Charger",
      price: 44.99,
      description:
        "Lightweight, fold-out solar panel for keeping devices topped up on multi-day treks and off-grid stays.",
      solar_output: "14W",
      weight: "480g",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Portable_solar_panel.jpg/500px-Portable_solar_panel.jpg",
    },
    {
      id: "pwr-004",
      product_name: "Compact 10000mAh Power Bank",
      price: 24.99,
      description:
        "Pocket-sized backup battery that slips into any daypack — a lighter alternative for shorter trips.",
      battery_capacity: "10000mAh",
      usb_ports: 1,
      weight: "220g",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cheero_powerbank_%26_Samsung_Galaxy_S4_20140910.jpg/500px-Cheero_powerbank_%26_Samsung_Galaxy_S4_20140910.jpg",
    },
  ],
  sleep: [
    {
      id: "slp-001",
      product_name: "Contoured Sleep Eye Mask",
      price: 9.99,
      description:
        "Soft, lightweight eye mask that blocks out cabin lights on overnight flights and buses for better rest on the move.",
      material: "Cotton blend",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Sleep_mask.jpg",
    },
    {
      id: "slp-002",
      product_name: "Compact Travel Pillow",
      price: 14.99,
      description:
        "Plush, packable pillow that compresses down to fit in a daypack — support for your neck wherever you catch some sleep.",
      material: "Memory foam blend",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Average_White_Pillow.jpg/500px-Average_White_Pillow.jpg",
    },
    {
      id: "slp-003",
      product_name: "Noise-Reducing Foam Earplugs",
      price: 6.99,
      description:
        "Soft foam earplugs that mould to your ear canal, taking the edge off noisy hostels, flights, and street noise.",
      material: "Foam",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Disposable_foam_earplugs.jpg",
    },
    {
      id: "slp-004",
      product_name: "Emergency Thermal Blanket",
      price: 7.99,
      description:
        "Compact, foil-lined blanket that retains body heat — a reassuring extra layer for cold overnight buses or unplanned stays.",
      packed_size: "10 x 10 cm",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Emergency_blanket_20110709.jpg",
    },
  ],
  bags: [
    {
      id: "bag-001",
      product_name: "Trailblazer Travel Backpack",
      category: "backpack",
      price: 59.99,
      description:
        "A 40L carry-on-friendly backpack with padded straps and multiple compartments, built for weeks on the road.",
      capacity: "40L",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Backpack_Wikipedia.JPG/500px-Backpack_Wikipedia.JPG",
    },
    {
      id: "bag-002",
      product_name: "Weekender Duffel Bag",
      category: "duffel bag",
      price: 49.99,
      description:
        "Durable duffel with a wide zip opening and reinforced base, equally at home on a weekend trip or at the gym.",
      material: "Leather",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg/500px-Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg",
    },
    {
      id: "bag-003",
      product_name: "Compact Toiletry Bag",
      category: "toiletry bag",
      price: 16.99,
      description:
        "Hanging toiletry organizer with a water-resistant lining, keeping every bottle and brush in its own spot.",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Kulturbeutel1.jpg",
    },
    {
      id: "bag-004",
      product_name: "Hardside Rolling Suitcase",
      category: "luggage",
      price: 89.99,
      description:
        "Scratch-resistant hardshell case on smooth spinner wheels, sized for a week-long trip through airports and cobblestones alike.",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/2/27/Maleta2.jpg",
    },
  ],
  rain: [
    {
      id: "rain-001",
      product_name: "Compact Travel Umbrella",
      price: 14.99,
      description:
        "Windproof, folding umbrella that collapses small enough to live permanently in your daypack's side pocket.",
      packed_size: "25 cm folded",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/An_umbrella.jpg/500px-An_umbrella.jpg",
    },
    {
      id: "rain-002",
      product_name: "Packable Rain Poncho",
      price: 11.99,
      description:
        "Lightweight, full-coverage poncho that packs into its own pouch — quick emergency cover for sudden downpours.",
      material: "PVC",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Cyclist_wearing_a_yellow_rain_poncho_in_Shanghai%2C_China_--_June_2011.jpg/500px-Cyclist_wearing_a_yellow_rain_poncho_in_Shanghai%2C_China_--_June_2011.jpg",
    },
    {
      id: "rain-003",
      product_name: "Waxed Cotton Rain Hat",
      price: 22.99,
      description:
        "Classic waxed-cotton hat that sheds rain while staying breathable — a sturdier alternative to a hood on wet hikes.",
      material: "Waxed cotton",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Waxed_Rain_Hat.jpg/500px-Waxed_Rain_Hat.jpg",
    },
    {
      id: "rain-004",
      product_name: "Windproof Golf Umbrella",
      price: 18.99,
      description:
        "Extra-large canopy with a reinforced windproof frame, built to survive gusty weather better than a compact umbrella.",
      canopy_diameter: "120 cm",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cloth_umbrellas.jpg/500px-Cloth_umbrellas.jpg",
    },
  ],
  security: [
    {
      id: "sec-001",
      product_name: "TSA-Approved Luggage Padlock",
      price: 9.99,
      description:
        "Combination padlock that TSA agents can open with a master key, so checked luggage can be inspected without cutting the lock.",
      lock_type: "Combination",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Solex_99_30_padlock_with_keys_%28DSCF2659%29.jpg/500px-Solex_99_30_padlock_with_keys_%28DSCF2659%29.jpg",
    },
    {
      id: "sec-002",
      product_name: "Portable Door Lock Alarm",
      price: 15.99,
      description:
        "Wedge-style lock that jams under hotel or Airbnb doors and sounds a 120dB alarm if someone tries to force entry.",
      sound_level: "120dB",
      activation: "Pull-pin or button",
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Door_Jam_Lock_for_Hotels_and_Travel.jpg/500px-Door_Jam_Lock_for_Hotels_and_Travel.jpg",
    },
    {
      id: "sec-003",
      product_name: "Hidden Travel Money Wallet",
      price: 13.99,
      description:
        "Slim, discreet wallet worn under clothing to keep cash, cards, and a spare key safe from pickpockets in crowded areas.",
      material: "Nylon",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/6/67/Wallet.jpg",
    },
    {
      id: "sec-004",
      product_name: "Combination Cable Lock",
      price: 12.99,
      description:
        "Retractable steel cable lock for securing luggage to a rack or bed frame overnight on trains and in hostel dorms.",
      cable_length: "1.8m",
      lock_type: "Combination",
      img_url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Lock-001.JPG",
    },
  ],
};

module.exports = shopProducts;
