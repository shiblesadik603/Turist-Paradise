/** Server-side Gemini call — moved out of the browser so it can run as a background job instead of blocking the request. */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const AI_PROMPT =
  "Generate Travel Plan for Location :{location},for {totalDays} Days for {traveler} with a {budget} budget,Give me a Hotels options list with HotelName,Hotel address,Price,Hotel image url,geo coordinates,rating,description and suggest itinerary with placeName,Place Details,Place image url,Geo coordinates,Ticket pricing,time t travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format";

// A worked example, fed as chat history, conditions the model to reliably return this
// exact JSON shape (hotels[] + itinerary.dayN.{theme,plan}) — ported verbatim from the
// client-side prompt this replaces.
const SEED_HISTORY = [
  {
    role: "user",
    parts: [
      {
        text: "Generate Travel Plan for Location :Sajek Valley,for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with HotelName,Hotel address,Price,Hotel image url,geo coordinates,rating,description and suggest itinerary with placeName,Place Details,Place image url,Geo coordinates,Ticket pricing,time t travel each of the location for given days with each day plan with best time to visit in JSON format",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: '```json\n{\n  "location": "Sajek Valley",\n  "duration": "3 Days",\n  "travelers": "Couple",\n  "budget": "Cheap",\n  "hotels": [\n    {\n      "hotelName": "Megh Adhar Eco Resort",\n      "hotelAddress": "Konglak Para, Sajek, Rangamati",\n      "price": "BDT 1500 - BDT 2500 per night",\n      "hotelImageUrl": "https://example.com/megh_adhar_resort.jpg",\n      "geoCoordinates": {\n        "latitude": 23.6623,\n        "longitude": 92.2912\n      },\n       "rating": "4.0",\n       "description":"Basic but clean accommodation with stunning views. Offers dormitory-style rooms and some private huts."\n    },\n     {\n      "hotelName": "Sajek Resort",\n       "hotelAddress": "Near Helipad, Sajek Valley",\n       "price": "BDT 1800 - BDT 3000 per night",\n       "hotelImageUrl": "https://example.com/sajek_resort.jpg",\n        "geoCoordinates": {\n        "latitude": 23.6610,\n        "longitude": 92.2875\n       },\n        "rating": "3.8",\n       "description":"Offers basic rooms with good view of valley ,restaurant available with local food"\n\n      },\n    {\n      "hotelName": "Jumghor Eco Resort",\n      "hotelAddress": "Rui Lui Para, Sajek, Rangamati",\n      "price": "BDT 1200 - BDT 2000 per night",\n      "hotelImageUrl": "https://example.com/jumghor_eco_resort.jpg",\n      "geoCoordinates": {\n        "latitude": 23.6682,\n        "longitude": 92.2975\n      },\n       "rating": "3.5",\n       "description":"Budget-friendly option with simple accommodations. Focuses on eco-friendly practices."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "Arrival and Sunset Views",\n      "plan": [\n          {\n              "placeName": "Travel to Sajek Valley from Khagrachari",\n                "placeDetails": "Take a reserved Chander Gari from Khagrachari to Sajek. The journey takes around 2-3 hours and offers scenic views. It is best to start early.",\n                "placeImageUrl":"https://example.com/sajek_road.jpg",\n                "geoCoordinates": {\n                 "latitude": 23.6256,\n                  "longitude": 92.1965\n                  },\n                "ticketPricing": "BDT 2500 - 3500 for the car (round trip, can be shared with other couples)",\n               "timeToTravel": "2-3 hours",\n               "bestTimeToVisit":"Early Morning"\n           },\n        {\n          "placeName": "Check-in to Hotel",\n          "placeDetails": "Arrive at your pre-booked hotel, settle in, and refresh.",\n            "placeImageUrl":"https://example.com/hotel_sajek.jpg",\n          "geoCoordinates": {\n            "latitude": null,\n            "longitude": null\n          },\n            "ticketPricing": "Included in hotel price",\n          "timeToTravel": "N/A",\n          "bestTimeToVisit":"Afternoon"\n         },\n        {\n          "placeName": "Helipad Area",\n          "placeDetails": "Explore the Helipad area, a popular spot for panoramic views of the valley and surrounding hills. This is the highest point and a great spot for sunset views",\n           "placeImageUrl":"https://example.com/helipad_sajek.jpg",\n          "geoCoordinates": {\n            "latitude": 23.6615,\n            "longitude": 92.2880\n          },\n            "ticketPricing": "Free",\n          "timeToTravel": "5-10 mins from most hotels",\n           "bestTimeToVisit":"Sunset"\n        },\n        {\n            "placeName":"Sunset at Sajek",\n            "placeDetails":"Enjoy breathtaking sunset views from anywhere in Sajek. There are multiple viewpoints around the valley.",\n            "placeImageUrl":"https://example.com/sajek_sunset.jpg",\n            "geoCoordinates": {\n                "latitude": 23.6619,\n                "longitude": 92.2896\n              },\n                "ticketPricing":"Free",\n            "timeToTravel":"N/A",\n             "bestTimeToVisit":"Sunset"\n        },\n        {\n            "placeName":"Dinner at Local Restaurant",\n            "placeDetails":"Enjoy a basic dinner at one of the local restaurants. They offer rice,vegetable,chicken etc",\n             "placeImageUrl":"https://example.com/local_food_sajek.jpg",\n             "geoCoordinates": {\n               "latitude": null,\n                "longitude": null\n              },\n               "ticketPricing": "BDT 150-250 per person",\n              "timeToTravel": "Walking distance from your hotel",\n               "bestTimeToVisit":"Evening"\n        }\n\n      ]\n    },\n    "day2": {\n      "theme": "Exploring Sajek Villages and Sunrise",\n      "plan": [\n         {\n          "placeName": "Sunrise View",\n            "placeDetails": "Wake up early to catch the sunrise from a viewpoint near your hotel. The early morning views of the valley are magical.",\n            "placeImageUrl":"https://example.com/sajek_sunrise.jpg",\n             "geoCoordinates": {\n                 "latitude": null,\n                "longitude": null\n             },\n              "ticketPricing": "Free",\n             "timeToTravel": "N/A",\n            "bestTimeToVisit":"Sunrise"\n        },\n        {\n            "placeName": "Konglak Para",\n            "placeDetails": "Visit Konglak Para, the highest village in Sajek. It\'s a small tribal village. Take time to interact with the local community and learn about their culture.",\n            "placeImageUrl":"https://example.com/konglak_para.jpg",\n           "geoCoordinates": {\n              "latitude": 23.6650,\n               "longitude": 92.2935\n             },\n           "ticketPricing": "Free",\n            "timeToTravel": "30 mins walk from Helipad",\n            "bestTimeToVisit":"Morning"\n        },\n        {\n          "placeName": "Luchai Village",\n          "placeDetails": "Explore the local market in Luchai, and see how the locals live. Try some locally made snacks. Enjoy the beauty of tribal life.",\n            "placeImageUrl":"https://example.com/luchai_village.jpg",\n           "geoCoordinates": {\n              "latitude": 23.6630,\n                "longitude": 92.2912\n            },\n            "ticketPricing": "Free",\n          "timeToTravel": "30 mins walk from helipad",\n          "bestTimeToVisit":"Afternoon"\n        },\n          {\n              "placeName": "Relax at Hotel",\n                "placeDetails": "Take some rest and relax in your hotel and enjoy valley from your room or rooftop",\n              "placeImageUrl":"https://example.com/hotel_sajek_relax.jpg",\n             "geoCoordinates": {\n                 "latitude": null,\n                   "longitude": null\n               },\n             "ticketPricing": "Free",\n              "timeToTravel": "N/A",\n             "bestTimeToVisit":"Afternoon"\n          },\n         {\n            "placeName":"Bonfire and star gazing",\n            "placeDetails":"If possible arrange a small bonfire for your self and enjoy the clear night sky of Sajek",\n           "placeImageUrl":"https://example.com/sajek_star.jpg",\n            "geoCoordinates": {\n                "latitude": null,\n                  "longitude": null\n            },\n                "ticketPricing":"BDT 300-500",\n             "timeToTravel":"At Hotel",\n             "bestTimeToVisit":"Night"\n         }\n      ]\n    },\n    "day3": {\n      "theme": "Departure",\n      "plan": [\n         {\n           "placeName": "Last Sunrise View",\n            "placeDetails":"Enjoy a final sunrise from your hotel or the helipad area.",\n           "placeImageUrl":"https://example.com/sajek_sunrise2.jpg",\n          "geoCoordinates": {\n                "latitude": null,\n                 "longitude": null\n           },\n            "ticketPricing": "Free",\n          "timeToTravel": "N/A",\n          "bestTimeToVisit":"Sunrise"\n        },\n        {\n          "placeName": "Breakfast",\n          "placeDetails": "Have breakfast at your hotel or a local restaurant.",\n            "placeImageUrl":"https://example.com/sajek_breakfast.jpg",\n           "geoCoordinates": {\n              "latitude": null,\n                "longitude": null\n            },\n           "ticketPricing": "BDT 100 - 200 per person",\n         "timeToTravel": "Walking distance",\n         "bestTimeToVisit":"Morning"\n        },\n         {\n          "placeName": "Return to Khagrachari",\n          "placeDetails": "Check out from the hotel and take a reserved Chander Gari back to Khagrachari. Plan your journey such that you arrive in Khagrachari before sunset.",\n           "placeImageUrl":"https://example.com/khagrachari_road.jpg",\n         "geoCoordinates": {\n              "latitude": 23.6256,\n              "longitude": 92.1965\n          },\n            "ticketPricing": "Same as travel to sajek",\n            "timeToTravel": "2-3 hours",\n             "bestTimeToVisit":"Morning"\n          }\n      ]\n    }\n  },\n   "notes": "This is a budget plan and does not include luxury. The itinerary is flexible and can be adjusted based on your interests. Consider purchasing local snacks and handicrafts as souvenirs. Shared transport options can be explored to save money. Always check with your hotel or local guides about the updated conditions and prices before making your travel plans"\n}\n```',
      },
    ],
  },
];

let chatSession = null;

const getChatSession = () => {
  if (chatSession) return chatSession;

  if (!env.geminiApiKey) {
    throw new ApiError(503, "AI trip planning isn't configured on this server");
  }

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
    history: SEED_HISTORY,
  });

  return chatSession;
};

/** Calls Gemini and reshapes its { itinerary: { day1: {...}, day2: {...} } } response into the array shape TripPlan.itinerary expects. */
const generateTripPlan = async ({ location, totalDays, traveler, budget }) => {
  const prompt = AI_PROMPT.replace("{location}", location)
    .replace(/{totalDays}/g, totalDays)
    .replace("{traveler}", traveler)
    .replace("{budget}", budget);

  const result = await getChatSession().sendMessage(prompt);
  const responseText = await result.response.text();
  const parsed = JSON.parse(responseText);

  const itinerary = Object.keys(parsed.itinerary).map((dayKey) => ({
    day: parseInt(dayKey.replace("day", ""), 10),
    theme: parsed.itinerary[dayKey].theme,
    plan: parsed.itinerary[dayKey].plan,
  }));

  return { hotels: parsed.hotels, itinerary };
};

module.exports = { generateTripPlan };
