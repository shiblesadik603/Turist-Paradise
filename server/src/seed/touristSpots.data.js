/** Curated list of iconic Bangladeshi tourist destinations, used by seed/touristSpots.js. */
const touristSpots = [
  {
    name: "Cox's Bazar Sea Beach",
    slug: "coxs-bazar-sea-beach",
    description:
      "The longest natural sea beach in the world, stretching roughly 120 km along the Bay of Bengal. Golden sand, rolling waves, and spectacular sunsets make it Bangladesh's most visited coastal destination.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cox%27s_Bazaar_Sunset_Sep2019.jpg/500px-Cox%27s_Bazaar_Sunset_Sep2019.jpg",
    latitude: 21.4143,
    longitude: 91.9832,
    highlights: [
      "120 km of unbroken sand, widely cited as the longest natural sea beach in the world",
      "Broad, flat beach backed by casuarina forest along the Bay of Bengal",
      "Main gateway for onward trips to Saint Martin's Island, Himchari, and Inani Beach",
      "Hotels, seafood markets, and water sports cluster around Laboni and Sugandha points",
    ],
    attractions: [
      {
        name: "Himchari National Park",
        description:
          "A hilltop viewpoint about 12 km south with waterfalls and forest trails overlooking the Bay of Bengal.",
      },
      {
        name: "Inani Beach",
        description:
          "A wider, quieter beach further south, known for flat coral-like rock formations exposed at low tide.",
      },
      {
        name: "Laboni Point",
        description: "The main, most accessible beach point near Cox's Bazar town center.",
      },
      {
        name: "Aggameda Khyang",
        description: "A notable Buddhist monastery in Cox's Bazar town.",
      },
    ],
    rideOptions: [
      {
        mode: "Flight",
        description: "Direct flight from Dhaka to Cox's Bazar Airport, about 50 minutes to 1 hour.",
      },
      {
        mode: "Bus",
        description:
          "AC or non-AC bus from Dhaka (Saydabad) direct to Dolphin Mor, roughly 8–9 hours.",
      },
      {
        mode: "Train",
        description:
          "Train from Dhaka's Kamalapur station on the Cox's Bazar rail line, about 9–9.5 hours.",
      },
      {
        mode: "Local transport",
        description:
          "Rickshaw, auto-rickshaw, or rented bike/CNG between Laboni, Kolatoli, Himchari, and Inani points.",
      },
    ],
    guideInfo: { needed: false },
  },
  {
    name: "Sundarbans",
    slug: "sundarbans",
    description:
      "The largest mangrove forest on Earth, straddling the delta of the Ganges, Brahmaputra, and Meghna rivers. Home to the elusive Royal Bengal Tiger, saltwater crocodiles, and a maze of tidal waterways best explored by boat.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Save_the_sundarbans_20.jpg/500px-Save_the_sundarbans_20.jpg",
    latitude: 21.95,
    longitude: 89.183,
    highlights: [
      "World's largest contiguous mangrove forest, spanning roughly 10,000 sq km across Bangladesh and India",
      "UNESCO World Heritage Site and the only natural habitat of the Royal Bengal Tiger in the region",
      "Bangladesh side holds an estimated 100+ tigers alongside spotted deer, crocodiles, and rich birdlife",
      "Reachable only by boat through a maze of tidal rivers — there's no road access",
    ],
    attractions: [
      {
        name: "Katka",
        description:
          "A wildlife-viewing area with a Forest Department rest house, known for deer and boar sightings.",
      },
      {
        name: "Kotka / Kochikhali",
        description: "A coastal watchtower zone popular for spotting tigers and deer.",
      },
      {
        name: "Hiron Point (Nilkamal)",
        description: "A remote wildlife station known for tiger, deer, and crocodile sightings.",
      },
      {
        name: "Dublar Char",
        description:
          "An island in the East Wildlife Sanctuary known for spotted deer herds and a seasonal fishing settlement.",
      },
    ],
    rideOptions: [
      {
        mode: "Bus / Train / Flight",
        description: "From Dhaka to Khulna or Mongla, then onward by boat into the forest.",
      },
      {
        mode: "Launch cruise",
        description:
          "Multi-day tourist launch packages departing directly from Dhaka's Sadarghat into the Sundarbans.",
      },
      {
        mode: "Boat hire",
        description:
          "From Mongla: private motor launch, speedboat, or country boat — the only way to move within the forest.",
      },
      {
        mode: "In-forest travel time",
        description:
          "Mongla to core zones like Hiron Point or Katka takes roughly 6–10 hours by motor vessel.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A licensed forest guide and boat are required inside the Sundarbans — the waterways are unmarked and the area is protected tiger habitat.",
      guides: [
        {
          name: "Nasir Uddin (sample)",
          vehicleType: "Boat / Launch Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real licensed forest-boat operator.",
        },
        {
          name: "Abdul Malek (sample)",
          vehicleType: "Boat / Launch Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real licensed forest-boat operator.",
        },
      ],
    },
  },
  {
    name: "Sajek Valley",
    slug: "sajek-valley",
    description:
      "Known as the 'Queen of Hills,' this remote valley in the Rangamati hill tracts sits high enough to watch clouds roll through the villages below. A favorite for its cool climate and panoramic sunrise views over the Chittagong Hill Tracts.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sajek_Valley_2_%28cropped%29.jpg/500px-Sajek_Valley_2_%28cropped%29.jpg",
    latitude: 23.635,
    longitude: 92.49,
    highlights: [
      "Hill valley at 450–550 m elevation in the Kasalong mountain range, Rangamati district",
      "Nicknamed the 'Queen of Hills' for its cloud-covered ridgeline views",
      "Home to Chakma, Marma, Tripura, Lusai, and Pankua indigenous communities",
      "Frequently shrouded in cloud from mid-summer through winter, giving sea-of-clouds views",
    ],
    attractions: [
      {
        name: "Konglak Hill",
        description:
          "The valley's highest viewpoint, popular for sunrise views over the surrounding hills.",
      },
      {
        name: "Ruilui Para",
        description:
          "The main village and viewpoint cluster where most resorts and cottages are concentrated.",
      },
      {
        name: "Hajachara Waterfall",
        description: "A waterfall trek accessible from the Sajek village area.",
      },
    ],
    rideOptions: [
      { mode: "Bus", description: "Bus from Dhaka to Khagrachari, about 7–8 hours." },
      {
        mode: "Jeep",
        description:
          "Reserved jeep ('Chander Gari') from Khagrachari via Dighinala to Sajek, roughly 70 km / 3–4 hours.",
      },
      {
        mode: "Alternative route",
        description: "Via Baghaichhari by jeep or motorbike where no direct bus route exists.",
      },
      {
        mode: "Security note",
        description:
          "Travel on the Khagrachari–Sajek road sometimes runs in army-escorted convoy windows.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A local jeep driver doubles as a guide for the hill-tract route and viewpoints — helpful given the remote roads and convoy timing.",
      guides: [
        {
          name: "Rafiqul Islam (sample)",
          vehicleType: "Jeep / Chander Gari Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local jeep driver.",
        },
        {
          name: "Jahangir Alam (sample)",
          vehicleType: "Jeep / Chander Gari Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local jeep driver.",
        },
      ],
    },
  },
  {
    name: "Saint Martin's Island",
    slug: "saint-martins-island",
    description:
      "Bangladesh's only coral island, a small strip of land in the Bay of Bengal ringed by clear turquoise water. Reachable only by boat from Teknaf, it's prized for snorkeling, fresh seafood, and a slower pace of life.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Saint_Martins_Island_with_boats_in_foreground.jpg/500px-Saint_Martins_Island_with_boats_in_foreground.jpg",
    latitude: 20.6131,
    longitude: 92.3267,
    highlights: [
      "Bangladesh's only coral-influenced island, at the country's southernmost tip",
      "About 12 sq km at low tide, shrinking to roughly 5 sq km at high tide",
      "Surrounded by coral communities and seagrass beds within a protected marine area",
      "Locally called 'Narikel Jinjira' (Coconut Island) for its coconut palm-lined coastline",
    ],
    attractions: [
      {
        name: "Chera Dwip (Cheradip)",
        description:
          "A smaller sandy islet separated from the main island at high tide, reachable by boat or on foot at low tide.",
      },
      {
        name: "Narikel Jinjira Beach",
        description:
          "The coconut-palm-fringed western shoreline, popular for swimming and sunset views.",
      },
    ],
    rideOptions: [
      { mode: "Bus", description: "Overnight bus from Dhaka to Teknaf, about 10–12 hours." },
      {
        mode: "Flight + road",
        description: "Flight Dhaka–Cox's Bazar (~1 hr) then bus/car to Teknaf (~2–3 hours).",
      },
      {
        mode: "Ship",
        description:
          "Passenger ship (e.g. Keari Sindabad, Bay Cruise) from Teknaf to Saint Martin's, about 34 km, departing around 9:30am daily.",
      },
      {
        mode: "Trawler / speedboat",
        description:
          "From Namar Bazar or Jinjira Jahaj Ghat, Teknaf, as an alternative to the larger ships.",
      },
    ],
    guideInfo: { needed: false },
  },
  {
    name: "Nilgiri, Bandarban",
    slug: "nilgiri-bandarban",
    description:
      "A hill district of dense forest and terraced peaks near the Myanmar border, with Nilgiri's hilltop viewpoint offering some of the country's most dramatic above-the-clouds scenery. Home to several indigenous communities and Bangladesh's highest peaks.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Nilgiri%2C_bandarban_in_Bangladesh.png/500px-Nilgiri%2C_bandarban_in_Bangladesh.png",
    latitude: 22.1953,
    longitude: 92.2195,
    highlights: [
      "Hill viewpoint near the Myanmar border, among the country's highest accessible tourist points",
      "Known for 'sea of clouds' views where visitors look down onto cloud layers below the ridge",
      "Roughly 20 km further along the same route as Chimbuk Hill",
      "Sits in a partly military-controlled area, so travel permits or checkpoints can apply",
    ],
    attractions: [
      {
        name: "Chimbuk Hill",
        description: "A major viewpoint en route to Nilgiri, about an hour from Bandarban town.",
      },
      {
        name: "Nilachal",
        description:
          "A closer viewpoint just ~5 km from Bandarban town with sunset views over the town and hills.",
      },
      {
        name: "Shoilo Propat Waterfall",
        description: "A roadside waterfall commonly combined with Chimbuk/Nilgiri day trips.",
      },
    ],
    rideOptions: [
      { mode: "Bus", description: "Bus from Dhaka to Bandarban, about 8–10 hours." },
      {
        mode: "Flight + road",
        description:
          "Flight Dhaka–Chittagong then bus/private car to Bandarban (no direct flights to Bandarban).",
      },
      {
        mode: "Jeep",
        description:
          "Reserved 4x4 'Chander Gari' jeep from Bandarban town to Nilgiri, about 46 km / 2 hours.",
      },
      {
        mode: "Combined day trip",
        description:
          "The same jeep hire commonly combines Chimbuk, Nilgiri, Milanchhari, and Shoilo Propat in one trip.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A jeep driver/guide is effectively required for the hill road and any permit checks along the way.",
      guides: [
        {
          name: "Md. Salam (sample)",
          vehicleType: "Jeep / Chander Gari Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local jeep driver.",
        },
        {
          name: "Kamal Hossain (sample)",
          vehicleType: "Jeep / Chander Gari Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local jeep driver.",
        },
      ],
    },
  },
  {
    name: "Kaptai Lake, Rangamati",
    slug: "kaptai-lake-rangamati",
    description:
      "A vast artificial lake formed by the Karnaphuli Dam, dotted with forested islets and crossed by the famous hanging bridge. Boat trips across the lake reveal Chakma villages, floating markets, and quiet hillside pagodas.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Kaptai_Lake_in_Karnafuly%2C_Rangamati.jpg/500px-Kaptai_Lake_in_Karnafuly%2C_Rangamati.jpg",
    latitude: 22.4958,
    longitude: 92.2292,
    highlights: [
      "Largest artificial lake in Bangladesh, spanning roughly 688 sq km",
      "Created in 1961 by the Karnaphuli Hydroelectric Project dam at Kaptai",
      "Supports hydropower, fisheries, and boat-based tourism across the Rangamati hill tracts",
      "Studded with islands and hill-tribe villages connected by boat routes",
    ],
    attractions: [
      {
        name: "Rangamati Hanging Bridge (Jhulonto Bridge)",
        description:
          "A suspension footbridge in Rangamati town with panoramic lake and hill views.",
      },
      {
        name: "Shuvolong Waterfall",
        description:
          "A monsoon-season waterfall about an hour's boat ride from Rangamati town, cascading into the lake.",
      },
      {
        name: "Rajban Bihar",
        description:
          "A prominent Buddhist temple complex on the lake, seat of the Chakma royal family's Buddhist tradition.",
      },
    ],
    rideOptions: [
      {
        mode: "Bus",
        description: "Direct bus from Dhaka (Sayedabad/Fakirapool) to Rangamati, about 7–8 hours.",
      },
      {
        mode: "Train + road",
        description:
          "Train Dhaka–Chittagong, then bus/car Chittagong–Rangamati, about 2–2.5 hours.",
      },
      {
        mode: "Local bus",
        description:
          "Local bus or microbus from Rangamati bus station to lakeside points, about 1 hour.",
      },
      {
        mode: "Boat",
        description:
          "Boat hire from Reserve Bazar, Banorupa, or Hanging Bridge ghats for lake tours and Shuvolong trips.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A boat driver is needed to reach island villages and Shuvolong Waterfall across the lake.",
      guides: [
        {
          name: "Biplob Chakma (sample)",
          vehicleType: "Boat Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local boat operator.",
        },
        {
          name: "Suman Tanchangya (sample)",
          vehicleType: "Boat Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local boat operator.",
        },
      ],
    },
  },
  {
    name: "Sreemangal Tea Gardens",
    slug: "sreemangal-tea-gardens",
    description:
      "Known as the 'Tea Capital of Bangladesh,' this Sylhet town is surrounded by rolling, manicured tea estates and the seven-layered tea of local legend. Nearby forests and wetlands make it a base for birdwatching and nature walks too.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sreemangal_tea_garden_2017-08-20.jpg/500px-Sreemangal_tea_garden_2017-08-20.jpg",
    latitude: 24.3083,
    longitude: 91.7333,
    highlights: [
      "Known as the 'Tea Capital of Bangladesh', home to dozens of tea estates around the town",
      "Birthplace of the famous seven-layer tea, served at Nilkantha Tea Cabin",
      "Located in Moulvibazar district, about 190 km from Dhaka and 83 km from Sylhet",
      "Gateway to Lawachara rainforest and the surrounding Haor wetlands",
    ],
    attractions: [
      {
        name: "Lawachara National Park",
        description:
          "A rainforest reserve just 8 km from Sreemangal town, home to wild hoolock gibbons and diverse birdlife.",
      },
      {
        name: "Madhabpur Lake",
        description: "A scenic lake amid tea gardens, known for its water lilies.",
      },
      {
        name: "Nilkantha Tea Cabin",
        description: "The shop credited with inventing and popularizing seven-layer tea.",
      },
    ],
    rideOptions: [
      {
        mode: "Train",
        description: "Parabat Express and other trains from Dhaka to Sreemangal, about 6–7 hours.",
      },
      {
        mode: "Bus",
        description: "Direct bus from Dhaka to Sreemangal via the Dhaka–Sylhet highway.",
      },
      {
        mode: "CNG",
        description: "CNG auto-rickshaw round trips from town to Lawachara or Madhabpur Lake.",
      },
      {
        mode: "Local",
        description: "Rented bicycle or CNG for touring individual tea estates around town.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A CNG driver familiar with the tea estates and Lawachara access roads makes getting around much easier.",
      guides: [
        {
          name: "Foysal Ahmed (sample)",
          vehicleType: "CNG Auto-rickshaw Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local CNG driver.",
        },
        {
          name: "Rubel Mia (sample)",
          vehicleType: "CNG Auto-rickshaw Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local CNG driver.",
        },
      ],
    },
  },
  {
    name: "Paharpur (Somapura Mahavihara)",
    slug: "paharpur-somapura-mahavihara",
    description:
      "A UNESCO World Heritage Site and the largest known Buddhist monastery south of the Himalayas, dating to the 8th century. Its cross-shaped central temple and thousands of terracotta plaques offer a rare glimpse into ancient Bengal.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paharpur_Buddhist_Bihar.jpg/500px-Paharpur_Buddhist_Bihar.jpg",
    latitude: 25.0311,
    longitude: 88.9769,
    highlights: [
      "8th-century Buddhist monastery founded under Pala king Dharmapala",
      "UNESCO World Heritage Site since 1985, one of the largest Buddhist monasteries south of the Himalayas",
      "Complex covers more than 20 acres with 177 monastic cells around a cruciform central temple",
      "Central temple rises about 22 m over three terraces, decorated with terracotta plaques",
    ],
    attractions: [
      {
        name: "Mahasthangarh",
        description:
          "An ancient fortified city site roughly 70 km southeast, combinable in one trip.",
      },
      {
        name: "Kusumba Mosque",
        description:
          "A Bengal Sultanate-era mosque in Naogaon noted for its terracotta and stone ornamentation.",
      },
    ],
    rideOptions: [
      {
        mode: "Train",
        description:
          "Train from Dhaka toward the Rajshahi/Joypurhat line, then local transport to Paharpur.",
      },
      {
        mode: "Bus",
        description:
          "Direct/AC bus from Dhaka via Tangail–Jamuna Bridge–Bogra–Joypurhat, about 6 hours.",
      },
      {
        mode: "Local",
        description: "Local bus or CNG from Joypurhat or Naogaon town to the site.",
      },
      {
        mode: "Car",
        description:
          "Rented car/microbus for combining Paharpur with Mahasthangarh and Kusumba Mosque in a day trip.",
      },
    ],
    guideInfo: { needed: false },
  },
  {
    name: "Sonargaon (Panam City)",
    slug: "sonargaon-panam-city",
    description:
      "The abandoned merchant quarter of a centuries-old river port, lined with crumbling colonial-era townhouses along a single narrow street. Once the medieval capital of Bengal, it's now one of the country's most atmospheric heritage walks.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/%E0%A6%B8%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A6%BE%E0%A6%81%E0%A6%93_%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BE%E0%A6%AE_%E0%A6%A8%E0%A6%97%E0%A6%B0_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%A8_%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%AA%E0%A6%A8%E0%A6%BE-2.jpg/500px-%E0%A6%B8%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A6%BE%E0%A6%81%E0%A6%93_%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BE%E0%A6%AE_%E0%A6%A8%E0%A6%97%E0%A6%B0_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%A8_%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%AA%E0%A6%A8%E0%A6%BE-2.jpg",
    latitude: 23.656,
    longitude: 90.6042,
    highlights: [
      "Ruins of a medieval river-port merchant city, one of the earliest urban settlements still standing in Bangladesh",
      "Panam Nagar's row of 19th-century colonial-style merchant townhouses lines a single narrow street",
      "About 38 km from Dhaka in Narayanganj district, near the historic old capital of Bengal",
      "Includes the Shilpacharya Zainul Folk & Craft Museum preserving regional heritage crafts",
    ],
    attractions: [
      {
        name: "Panam Nagar",
        description: "The abandoned merchant street of ornate townhouses, the core historic site.",
      },
      {
        name: "Shilpacharya Zainul Folk and Craft Museum",
        description: "A folk-art museum founded by artist Zainul Abedin near Panam.",
      },
      {
        name: "Goaldi Mosque",
        description:
          "A mosque built in 1519 during Sultan Alauddin Husain Shah's reign, just northeast of Panam village.",
      },
    ],
    rideOptions: [
      {
        mode: "Bus",
        description:
          "Bus from Gulistan, Dhaka, to Mograpara, then CNG auto-rickshaw to Panam Nagar.",
      },
      {
        mode: "Direct bus",
        description: "Direct bus service from Narayanganj to Panam Nagar.",
      },
      {
        mode: "Car",
        description:
          "Private car/rideshare from Dhaka via the Dhaka–Chittagong highway, about 1–1.5 hours.",
      },
      {
        mode: "Local",
        description:
          "Local CNG or rickshaw to move between the museum, mosque, and Panam street within the site.",
      },
    ],
    guideInfo: { needed: false },
  },
  {
    name: "Kuakata Sea Beach",
    slug: "kuakata-sea-beach",
    description:
      "A rare beach where both sunrise and sunset can be watched over the water, earning it the nickname 'Sagar Kannya' (Daughter of the Sea). Its wide, flat sand and quieter crowds make it a peaceful alternative to Cox's Bazar.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kuakata_sea_beach_evening.jpg/500px-Kuakata_sea_beach_evening.jpg",
    latitude: 21.8029,
    longitude: 90.1809,
    highlights: [
      "One of very few beaches in the world where both sunrise and sunset are visible over open water",
      "Panoramic beach at Bangladesh's southernmost tip in Patuakhali district, about 320 km from Dhaka",
      "Beach stretch commonly cited around 18–30 km long, backed by a coastal Rakhine community",
      "Locally nicknamed 'Sagor Konya' (Daughter of the Sea)",
    ],
    attractions: [
      {
        name: "Gangamati Reserved Forest",
        description:
          "An evergreen mangrove forest at the beach's easternmost point, walkable or reachable by bicycle.",
      },
      {
        name: "Fatrar Char",
        description:
          "A mangrove river-island area near Kuakata, considered an extension of the Sundarbans ecosystem.",
      },
      {
        name: "Rakhaine Village",
        description:
          "A Buddhist Rakhine community roughly 9 km northwest, with a rural temple and large Buddha statue.",
      },
    ],
    rideOptions: [
      {
        mode: "Bus",
        description: "Direct bus from Dhaka via the Padma Bridge/Mawa route straight to Kuakata.",
      },
      {
        mode: "Launch + bus",
        description:
          "Overnight launch from Dhaka's Sadarghat to Patuakhali or Barisal, then bus onward.",
      },
      {
        mode: "Bus (from Barisal)",
        description: "Bus from Barisal Launch Port to Kuakata, about 5–6 hours.",
      },
      {
        mode: "Local",
        description:
          "Bus from Patuakhali town (~2 hours); motorcycle/CNG hire for local sights like Rakhaine Village.",
      },
    ],
    guideInfo: { needed: false },
  },
  {
    name: "Jaflong",
    slug: "jaflong",
    description:
      "A hill station on the Bangladesh-India border where the Piyain River runs clear over stone beds beneath the Khasi hills. Popular for stone collection, riverside picnics, and views across to Meghalaya's rolling hills.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Zero_Point_at_Zuflong.jpg/500px-Zero_Point_at_Zuflong.jpg",
    latitude: 25.1634,
    longitude: 92.0175,
    highlights: [
      "Hill and river-stone scenery directly on the Bangladesh-India border in Sylhet district",
      "Known for the Piyain/Dawki river's stone collection areas against a backdrop of the Khasi hills",
      "About 62 km from Sylhet city, near the Tamabil land border crossing",
      "A popular day-trip circuit combined with Lalakhal, Bichanakandi, and Bholaganj",
    ],
    attractions: [
      {
        name: "Zero Point",
        description: "The border viewpoint where the Piyain river meets the hills of Meghalaya.",
      },
      {
        name: "Lalakhal",
        description:
          "A blue-green water canal about an hour from Jaflong, reached by boat from Sarighat.",
      },
      {
        name: "Tamabil",
        description: "The official land border/immigration checkpoint near Jaflong.",
      },
    ],
    rideOptions: [
      { mode: "Bus", description: "Bus from Dhaka to Sylhet, about 6–8 hours." },
      { mode: "Local bus", description: "Local bus from Sylhet to Jaflong, about 1.5–2 hours." },
      {
        mode: "CNG",
        description:
          "CNG auto-rickshaw or local 'Laguna' van from Jaflong bus stand to Zero Point.",
      },
      {
        mode: "Boat",
        description: "Reserved boat from Sarighat to reach Lalakhal as a combined side trip.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A CNG/car driver who knows the area doubles as a guide for the Zero Point, Lalakhal, and border-area circuit.",
      guides: [
        {
          name: "Sohel Rana (sample)",
          vehicleType: "CNG Auto-rickshaw Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local CNG driver.",
        },
        {
          name: "Mizanur Rahman (sample)",
          vehicleType: "CNG Auto-rickshaw Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local CNG driver.",
        },
      ],
    },
  },
  {
    name: "Ratargul Swamp Forest",
    slug: "ratargul-swamp-forest",
    description:
      "One of very few freshwater swamp forests in the world, often called the 'Amazon of Bangladesh.' Half the year its trees stand submerged in clear water, best explored by small boat gliding between the trunks.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF%E0%A6%A4%E0%A7%87_%E0%A6%A8%E0%A6%BF%E0%A6%AE%E0%A6%9C%E0%A7%8D%E0%A6%9C%E0%A6%BF%E0%A6%A4_%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A7%81%E0%A6%B2_%E0%A6%9C%E0%A6%B2%E0%A6%BE%E0%A6%AC%E0%A6%A8%E0%A7%87%E0%A6%B0_%E0%A6%97%E0%A6%BE%E0%A6%9B.jpg/500px-%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF%E0%A6%A4%E0%A7%87_%E0%A6%A8%E0%A6%BF%E0%A6%AE%E0%A6%9C%E0%A7%8D%E0%A6%9C%E0%A6%BF%E0%A6%A4_%E0%A6%B0%E0%A6%BE%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%97%E0%A7%81%E0%A6%B2_%E0%A6%9C%E0%A6%B2%E0%A6%BE%E0%A6%AC%E0%A6%A8%E0%A7%87%E0%A6%B0_%E0%A6%97%E0%A6%BE%E0%A6%9B.jpg",
    latitude: 25.0004,
    longitude: 91.9697,
    highlights: [
      "One of the few freshwater swamp forests in the world, and the largest of its kind in Bangladesh",
      "Covers roughly 1,346 hectares on the Goyain River in Gowainghat Upazila, Sylhet",
      "Trees stand partly submerged for much of the year, fully flooded during monsoon (June–October)",
      "Sometimes nicknamed the 'Amazon of Bangladesh' for its flooded-forest canoe experience",
    ],
    attractions: [
      {
        name: "Khadimnagar National Park",
        description: "A forest and tea-garden reserve passed en route from Sylhet to Ratargul.",
      },
      {
        name: "Shringi Bridge",
        description:
          "The boat-launch point where visitors transfer from road transport to canoe for entering the swamp.",
      },
    ],
    rideOptions: [
      {
        mode: "CNG",
        description:
          "CNG auto-rickshaw from Sylhet to Gowain Ghat/Shringi Bridge, about 2.5–3 hours.",
      },
      {
        mode: "Boat",
        description:
          "Reserved trawler (engine boat) from Goain Ghat into the forest, under 1 hour.",
      },
      {
        mode: "Canoe",
        description:
          "Small wooden boat hire at the forest station to navigate among the submerged trees.",
      },
      {
        mode: "Combined trip",
        description:
          "Combinable day trip with Jaflong or Bichanakandi via the same Sylhet-based CNG/car hire.",
      },
    ],
    guideInfo: {
      needed: true,
      note: "A boat guide is required to navigate the flooded forest safely, since the submerged trees make routes hard to judge alone.",
      guides: [
        {
          name: "Anwar Hossain (sample)",
          vehicleType: "Canoe / Boat Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local boat operator.",
        },
        {
          name: "Delwar Hossain (sample)",
          vehicleType: "Canoe / Boat Driver",
          phone: "01xxx-xxxxxx (sample)",
          note: "Placeholder — replace with a real local boat operator.",
        },
      ],
    },
  },
];

module.exports = touristSpots;
