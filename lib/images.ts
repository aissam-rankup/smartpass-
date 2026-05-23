// Verified Unsplash photos sourced from live Unsplash search pages.
// Each URL was scraped from a topic-specific search and matched to the
// intended subject. Organized by topic so swapping is easy.

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  // ---------- Hero / surf ----------
  heroDesertSunset: u("photo-1581353458680-6dae683fcc6c"), // traveler at sunset in desert — editorial
  heroSurfer: u("photo-1635009445997-a1941d8c73c1"),       // man riding wave
  heroLineup: u("photo-1697145808130-dfc61fcdf820"),       // group carrying surfboards on beach
  surfStanding: u("photo-1669542755424-1fde4e999962"),     // surfers with boards on shoreline
  surfBoards: u("photo-1660788102262-4c5aee4e47a5"),       // surfboards stacked
  surfPaddle: u("photo-1675271815142-2b8c5373d091"),       // paddling out
  surfCarrying: u("photo-1634658344791-72a0bb33f307"),     // man carrying board through water
  surfTaghazoutCar: u("photo-1667143297520-382b68c0dc7c"), // vehicle with surfboard — surf-town vibe
  surfWaves: u("photo-1537174621888-eba6137cf6c9"),        // surfers riding waves

  // ---------- Cities ----------
  cityAgadir: u("photo-1710092538995-4af0c11a3f3c"),       // beach with mountain background
  cityMarrakech: u("photo-1653323792487-6ecc6217040b"),    // horse-drawn carriage + minaret
  cityMarrakechSouk: u("photo-1569440703456-29b9c31765ca"),// marketplace
  cityEssaouira: u("photo-1624802751971-d425380ee247"),    // blue & white boats
  cityEssaouiraRamparts: u("photo-1743963790208-07ce117cdfc6"), // rampart wall over ocean
  cityTaghazout: u("photo-1538053367502-742497073841"),    // white building near sea (Taghazout)
  cityTaghazoutBoats: u("photo-1538050558691-dfaad62c8ea0"),// blue boats Taghazout
  cityOuarzazate: u("photo-1461237439866-5a557710c921"),   // group riding camels on dune
  cityCasablanca: u("photo-1696259629194-5411989d6675"),   // Hassan II Mosque clock tower

  // ---------- Categories / partners ----------
  restaurantTagine: u("photo-1682370207954-c8a9cccaabb4"), // plate with food and vegetables
  restaurantSpread: u("photo-1517315314851-5d0c36a36e02"), // cooked meat on dishware
  restaurantTagineCookware: u("photo-1557509959-69ef137d9339"), // beige clay tagine
  hotelRiad: u("photo-1599859725763-4a16c9468890"),         // palm + white-blue architecture
  marrakechMinaret: u("photo-1640263408299-8972236d0590"), // tall tower with clock
  hammamArch: u("photo-1750981088715-fed23a7bf7c2"),       // arched passage
  hammamAlley: u("photo-1750981091095-8fd793e19cd9"),      // orange alleyway with dark door
  hammamDoors: u("photo-1750981089377-2883600c08b8"),      // man walks by doors and rugs
  souksSpices: u("photo-1713607763620-dbfe9c10b3ff"),      // colorful spice bags
  souksMarket: u("photo-1772580310425-63f2290c2ba7"),      // bustling marketplace
  souksBaskets: u("photo-1580746738099-1cb74f972feb"),     // woven baskets
  desertCamels: u("photo-1535191059345-c16453b851b2"),     // group riding camels
  desertCamelsSolo: u("photo-1559586616-361e18714958"),    // camels in landscape
  desertWalk: u("photo-1510952267577-fc96d5ca660a"),       // man walking with camels
  desertTent: u("photo-1613169620329-6785c004d900"),       // bedouin tent under night
  desertCamelBeach: u("photo-1613057157282-cc3cbe630b26"), // camel on beach
  taxiRoad: u("photo-1473445730015-841f29a9490b"),         // open road (kept from seed)
  taxiMorocco: u("photo-1775599326332-765a4175d159"),      // yellow Moroccan taxis on street
  taxiPetit: u("photo-1705765276710-51b6362f9ea7"),        // small red car parked before storefront
  beachAgadirAerial: u("photo-1536868313473-7480e7c169f8"),// aerial of beach
  beachAgadirMountain: u("photo-1710092538995-4af0c11a3f3c"), // beach with mountain
  cultureMarketColor: u("photo-1675266410217-f335c2535545"),  // colorful market
  lighthouseEssaouira: u("photo-1611943529357-2f99f4400355"), // lighthouse silhouette at dusk
};

export type ImgKey = keyof typeof IMG;
