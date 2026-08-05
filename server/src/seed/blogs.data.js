/** Demo travel blog posts, used by seed/blogs.js. Authors/commenters are demo personas, not real accounts. */
const blogs = [
  {
    title: "Chasing Sunsets in Cox's Bazar",
    place: "Cox's Bazar Sea Beach",
    authorName: "Nusrat Jahan",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cox%27s_Bazaar_Sunset_Sep2019.jpg/500px-Cox%27s_Bazaar_Sunset_Sep2019.jpg",
    content:
      "I've lived in Dhaka my whole life, but nothing prepared me for how big the sky feels standing on Cox's Bazar's beach at sunset. We got there a little before 6, found a quiet stretch away from the crowds near Kolatoli, and just sat in the sand watching the light change for almost an hour.\n\nWhat surprised me most wasn't the length of the beach — everyone tells you it's the longest in the world — it was how different it looks every twenty minutes. Gold, then pink, then this deep orange right before the sun dropped. A few fishing boats were heading back in, and their silhouettes against the water made it feel like a painting.\n\nIf you go, skip the main tourist strip in the evening and walk south a bit. It's quieter, the vendors are less pushy, and you get the whole view to yourself. Bring a mat to sit on — the sand holds the day's heat well into the night, which is honestly kind of nice.",
    comments: [
      {
        authorName: "Imran Hossain",
        text: "This is exactly the spot I was looking for! Heading there next month, thank you for the tip about walking south.",
      },
      {
        authorName: "Farzana Akter",
        text: "The sunset colors you described are so accurate, I remember seeing the exact same thing last year. Cox's Bazar never gets old.",
      },
    ],
    reactionCount: 14,
  },
  {
    title: "Lost in the Clouds: My Sajek Valley Diary",
    place: "Sajek Valley",
    authorName: "Rafiul Islam",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sajek_Valley_2_%28cropped%29.jpg/500px-Sajek_Valley_2_%28cropped%29.jpg",
    content:
      "Day one in Sajek and I already understand why people call it the Queen of Hills. We took the reserved Chander Gari from Khagrachari — three hours of switchbacks that had my stomach in knots, but every turn opened up another ridge of hills fading into blue in the distance.\n\nThe real magic happened the next morning. I woke up at 5:30, half-asleep, and stepped out of our cottage to find the entire valley below us gone — just an ocean of white cloud with hilltops poking through like islands. I've seen photos of this a hundred times but standing in it is completely different. It's cold, it's silent, and then somewhere a rooster crows from a village you can't even see anymore.\n\nWe spent the day walking to Konglak Hill and talking with a few people from the local Chakma community, who were incredibly patient with our terrible Bangla-meets-hand-gestures conversation. If you're planning a trip, give yourself two full days — one day is not enough to actually feel the place, only to see it.",
    comments: [
      {
        authorName: "Shirin Sultana",
        text: "The cloud sea at sunrise is unreal, I still think about it. Great write-up, brought back so many memories.",
      },
    ],
    reactionCount: 9,
  },
  {
    title: "Into the Sundarbans: A Boat Ride I'll Never Forget",
    place: "Sundarbans",
    authorName: "Tanjila Akter",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Save_the_sundarbans_20.jpg/500px-Save_the_sundarbans_20.jpg",
    content:
      "Three days on a launch through the Sundarbans taught me to stop expecting a tiger and start paying attention to everything else. Our guide kept saying the forest reveals itself slowly, and by day two I understood what he meant — the mangrove roots sticking out of the water like fingers, the sound of unseen birds, the way the tide completely rearranges the riverbanks twice a day.\n\nWe did see pugmarks on a muddy bank near Kotka, fresh enough that our guide got noticeably quieter and more alert for the next hour. No tiger sighting for us, but a huge monitor lizard swam right past our boat, and the spotted deer near the watchtower barely looked up as we passed.\n\nThe boat itself became part of the experience — sleeping to the sound of water against the hull, eating fish caught that same morning, no phone signal for three days straight. It's not a comfortable trip in the usual sense, but it's the closest I've felt to actually being somewhere wild in a long time.",
    comments: [
      {
        authorName: "Kamrul Hasan",
        text: "Pugmarks near Kotka, that's amazing even without a full sighting! Adding this to my bucket list.",
      },
      {
        authorName: "Nadia Rahman",
        text: "Three days with no phone signal sounds terrifying and wonderful at the same time. Great read!",
      },
    ],
    reactionCount: 21,
  },
];

module.exports = blogs;
