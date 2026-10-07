// ZIP codes for the six-county install area, used only by /get-a-quote's booking form
// (and by /api/lead's check on that form's submissions).
//
// Source: U.S. Census Bureau, 2020 ZCTA-to-County Relationship File
// https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt
// A ZIP is listed when at least 25% of its land area lies in the six counties, under the
// county holding most of that land. That keeps 34974 (Okeechobee — our showroom — partly in
// Glades) and leaves out 33440 (Clewiston, Hendry) and 34141 (Ochopee, Collier), which only
// clip the edge. Census ZCTAs track USPS ZIPs closely but not exactly; P.O.-box-only ZIPs
// have no ZCTA.
//
// To change the area, edit the lists below, or use EXTRA_ZIPS / EXCLUDED_ZIPS.

export const SERVICE_ZIPS_BY_COUNTY: Record<string, string[]> = {
  "Miami-Dade": [
    "33010", "33012", "33013", "33014", "33015", "33016", "33018", "33030", "33031", "33032",
    "33033", "33034", "33035", "33039", "33054", "33055", "33056", "33101", "33109", "33122",
    "33125", "33126", "33127", "33128", "33129", "33130", "33131", "33132", "33133", "33134",
    "33135", "33136", "33137", "33138", "33139", "33140", "33141", "33142", "33143", "33144",
    "33145", "33146", "33147", "33149", "33150", "33154", "33155", "33156", "33157", "33158",
    "33160", "33161", "33162", "33165", "33166", "33167", "33168", "33169", "33170", "33172",
    "33173", "33174", "33175", "33176", "33177", "33178", "33179", "33180", "33181", "33182",
    "33183", "33184", "33185", "33186", "33187", "33189", "33190", "33193", "33194", "33196",
  ],
  "Broward": [
    "33004", "33009", "33019", "33020", "33021", "33022", "33023", "33024", "33025", "33026",
    "33027", "33028", "33029", "33060", "33062", "33063", "33064", "33065", "33066", "33067",
    "33068", "33069", "33071", "33073", "33076", "33301", "33304", "33305", "33306", "33308",
    "33309", "33311", "33312", "33313", "33314", "33315", "33316", "33317", "33319", "33321",
    "33322", "33323", "33324", "33325", "33326", "33327", "33328", "33330", "33331", "33332",
    "33334", "33351", "33388", "33441", "33442",
  ],
  "Palm Beach": [
    "33401", "33403", "33404", "33405", "33406", "33407", "33408", "33409", "33410", "33411",
    "33412", "33413", "33414", "33415", "33417", "33418", "33426", "33428", "33430", "33431",
    "33432", "33433", "33434", "33435", "33436", "33437", "33444", "33445", "33446", "33449",
    "33458", "33460", "33461", "33462", "33463", "33467", "33470", "33472", "33473", "33476",
    "33477", "33478", "33480", "33483", "33484", "33486", "33487", "33493", "33496", "33498",
  ],
  "Martin": [
    "33438", "33455", "33469", "34956", "34957", "34990", "34994", "34996", "34997",
  ],
  "St. Lucie": [
    "34945", "34946", "34947", "34949", "34950", "34951", "34952", "34953", "34981", "34982",
    "34983", "34984", "34986", "34987",
  ],
  "Okeechobee": [
    "34972", "34974",
  ],
};

/** ZIPs the Census list misses (e.g. a P.O.-box ZIP a customer uses for their property). */
export const EXTRA_ZIPS: string[] = [];

/** ZIPs we don't install in even though they're in the lists above. */
export const EXCLUDED_ZIPS: string[] = [];

const SERVICE_ZIPS = new Set(
  [...Object.values(SERVICE_ZIPS_BY_COUNTY).flat(), ...EXTRA_ZIPS].filter((zip) => !EXCLUDED_ZIPS.includes(zip))
);

export function isBookableZip(zip: string): boolean {
  const z = zip.trim();
  return /^\d{5}$/.test(z) && SERVICE_ZIPS.has(z);
}
