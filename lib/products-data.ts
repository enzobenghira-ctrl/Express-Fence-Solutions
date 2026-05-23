export interface ProductData {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  image: string;
  alt: string;
  bg: string;
  desc: string;
  // Detail page
  heroImage: string;
  overview: string[];
  wpcRole: string;
  composition: { label: string; pct: number; color: string }[];
  construction: { title: string; body: string }[];
  gallery: { src: string; alt: string }[];
  features: { title: string; desc: string }[];
}

export const productsData: ProductData[] = [
  {
    slug: "fences",
    num: "01",
    name: "WPC Fences",
    tagline: "Durable & Beautiful",
    image: "/images/fence-waterway-turf.jpg",
    alt: "WPC composite fence waterway Miami Florida",
    bg: "linear-gradient(135deg, #D4CFC0 0%, #BDB8A8 100%)",
    desc: "Looks like real wood — without warping, rotting, or repainting. Built for Florida's heat, humidity, and salt air.",
    heroImage: "/images/fence-teak-long-hero.png",
    overview: [
      "Our WPC fence panels combine the warmth and beauty of natural wood with the durability of modern polymer engineering. The result is a fence that looks stunning on day one — and continues to look that way decades later.",
      "Unlike wood fences that require sanding, staining, and repainting every few years, WPC fences are engineered to resist Florida's intense UV exposure, high humidity, and salt air. No warping. No rotting. No termite damage.",
    ],
    wpcRole:
      "For fencing, WPC is extruded into hollow-core or solid-core profiles — the same cross-section repeated across every board, giving you consistent color and grain throughout the entire panel, not just on the surface.",
    composition: [
      { label: "Recycled Wood Fiber", pct: 60, color: "#8B7355" },
      { label: "HDPE Polymer Binder", pct: 35, color: "#4A7C59" },
      { label: "UV Stabilizers & Additives", pct: 5, color: "#B8965A" },
    ],
    construction: [
      {
        title: "Hollow-Core Extrusion Profiles",
        body:
          "Each fence board is extruded as a hollow-core WPC profile — reducing weight while maintaining structural rigidity. The internal chambers add thermal stability and prevent expansion under Florida's heat.",
      },
      {
        title: "Aluminum Post Sleeve System",
        body:
          "Posts use a galvanized steel or aluminum structural core wrapped in a matching WPC sleeve. This gives the post real structural strength for wind loads while maintaining a seamless wood-look finish from top to bottom.",
      },
      {
        title: "Tongue-and-Groove Interlocking Panels",
        body:
          "Boards lock together with a precision tongue-and-groove system, eliminating visible gaps and creating a tight, clean panel face. This joint design also allows for minor thermal expansion without buckling.",
      },
      {
        title: "Co-Extrusion Surface Capping",
        body:
          "Premium boards feature a co-extruded polymer cap layer on all four sides. This capping layer is denser than the core and acts as a moisture and UV shield, protecting the wood fiber inside.",
      },
    ],
    gallery: [
      { src: "/images/fence-black-modern-home.jpg", alt: "Black WPC horizontal fence modern home Miami" },
      { src: "/images/fence-grey-decorative-top.png", alt: "Grey WPC fence with decorative laser-cut top" },
      { src: "/images/fence-dark-grey-autumn.png", alt: "Dark grey WPC composite fence with autumn garden" },
    ],
    features: [
      { title: "Zero Maintenance", desc: "No painting, sealing, or sanding — ever. Rinse with water to clean." },
      { title: "Termite & Rot Proof", desc: "No organic material exposed. Insects and moisture cannot penetrate the composite core." },
      { title: "UV Color Stable", desc: "UV absorbers built into the polymer prevent fading and discoloration in direct sun." },
      { title: "Florida-Rated Wind Resistance", desc: "Engineered profiles tested for South Florida's hurricane-season wind loads." },
      { title: "Consistent Grain & Color", desc: "Extrusion process delivers uniform color and grain across every board — no knots or variability." },
      { title: "Eco-Friendly", desc: "Made from up to 95% recycled content. No deforestation, no formaldehyde, no VOCs." },
    ],
  },
  {
    slug: "pergolas",
    num: "02",
    name: "WPC Pergolas",
    tagline: "Year-Round Outdoor Living",
    image: "/images/pergola-wpc-tropical.png",
    alt: "WPC pergola tropical outdoor living Miami",
    bg: "linear-gradient(135deg, #C8C2A8 0%, #B8B298 100%)",
    desc: "Transform your outdoor space. UV-resistant, weatherproof, zero maintenance.",
    heroImage: "/images/pergola-key-west.jpeg",
    overview: [
      "A WPC pergola turns any outdoor space into a true year-round living area — shaded, beautiful, and built to withstand South Florida's sun, humidity, and salt air without any ongoing maintenance.",
      "Traditional wood pergolas begin deteriorating the moment they're exposed to Florida's climate. WPC pergolas are engineered from the start to perform in these exact conditions, holding their structure and appearance for decades without ever needing to be sealed, stained, or repainted.",
    ],
    wpcRole:
      "Pergola applications demand larger structural profiles than fencing. WPC for pergolas uses higher-density solid-core extrusions for posts and beams, capable of spanning wider openings and supporting the dead load of roof elements without deflection.",
    composition: [
      { label: "Recycled Wood Fiber", pct: 55, color: "#8B7355" },
      { label: "HDPE Polymer Binder", pct: 38, color: "#4A7C59" },
      { label: "UV Stabilizers & Additives", pct: 7, color: "#B8965A" },
    ],
    construction: [
      {
        title: "Solid-Core Structural Beams",
        body:
          "Pergola posts and primary beams use solid-core WPC extrusions with higher polymer content for maximum density and load-bearing capacity. These profiles can span up to 14 feet without intermediate support.",
      },
      {
        title: "Post-and-Beam Assembly",
        body:
          "The structural system uses an aluminum or galvanized steel hidden bracket system at every connection point. Hardware is fully concealed within the WPC profiles, giving a clean, seamless wood-look finish at every joint.",
      },
      {
        title: "Open Rafter Roof System",
        body:
          "Roof rafters are WPC profiles set at regular intervals, providing shade and architectural definition while allowing airflow. Rafter spacing, angle, and depth can all be customized to the design.",
      },
      {
        title: "Powder-Coated Aluminum Integration",
        body:
          "For maximum span capability, structural elements use powder-coated aluminum cores wrapped in co-extruded WPC sleeves — delivering the strength of aluminum with the warmth of wood.",
      },
    ],
    gallery: [
      { src: "/images/pergola-wpc-tropical.png", alt: "WPC pergola tropical garden Miami outdoor living" },
      { src: "/images/decking-pergola-aerial.png", alt: "Aerial view WPC pergola with outdoor kitchen" },
    ],
    features: [
      { title: "UV & Moisture Resistant", desc: "Will not bleach, grey, warp, or swell regardless of weather exposure." },
      { title: "Structural Integrity", desc: "Engineered to support shade sails, lighting, and fans without deflection." },
      { title: "Custom Sizing", desc: "Posts, beams, and rafters fabricated to your exact dimensions and layout." },
      { title: "Zero Maintenance", desc: "Never needs sealing, painting, or staining. Occasional rinse is all it takes." },
      { title: "Salt Air Resistant", desc: "Polymer binder prevents corrosion in coastal Miami environments." },
      { title: "Fully Concealed Hardware", desc: "All structural brackets and fasteners hidden inside the WPC profiles." },
    ],
  },
  {
    slug: "cladding",
    num: "03",
    name: "WPC Cladding",
    tagline: "Premium Wall Finish",
    image: "/images/wall-slat-interior.png",
    alt: "WPC wood slat wall cladding interior",
    bg: "linear-gradient(135deg, #D8D0BC 0%, #C4BAA4 100%)",
    desc: "Premium wood aesthetics for exterior and interior surfaces — without any upkeep.",
    heroImage: "/images/wall-slat-interior.png",
    overview: [
      "WPC cladding delivers the rich warmth of real wood paneling on any wall surface — interior feature walls, exterior building facades, pool decks, and garden walls — with zero ongoing maintenance.",
      "Traditional timber cladding on exterior surfaces requires repainting or re-staining every two to three years, especially in South Florida's climate. WPC cladding is designed to look identical to the day it was installed for decades, with no seasonal maintenance program.",
    ],
    wpcRole:
      "Cladding profiles are extruded as thin, flat boards — typically 20–25mm thick — in a range of widths from 90mm to 200mm. The narrow profile and hidden fastener system create a seamless, continuous surface free of visible screws or fixings.",
    composition: [
      { label: "Recycled Wood Fiber", pct: 65, color: "#8B7355" },
      { label: "PVC or HDPE Polymer", pct: 30, color: "#4A7C59" },
      { label: "UV Stabilizers & Pigments", pct: 5, color: "#B8965A" },
    ],
    construction: [
      {
        title: "Tongue-and-Groove or Shiplap Profile",
        body:
          "Cladding boards interlock with precision tongue-and-groove or shiplap edges, creating a seamless surface without visible gaps. The interlocking joint also prevents water infiltration on exterior applications.",
      },
      {
        title: "Hidden Clip Fastener System",
        body:
          "Boards are fixed to the substrate using concealed stainless steel clips that lock into the board profile. No screws or nails are visible on the finished surface — resulting in a clean, uninterrupted wood-look face.",
      },
      {
        title: "Ventilated Cavity Design",
        body:
          "Exterior cladding installations use a battened sub-frame that creates an air gap behind the boards. This ventilated cavity prevents moisture buildup, reduces thermal transfer, and meets building code requirements.",
      },
      {
        title: "Co-Extruded Cap Layer",
        body:
          "The outer cap layer — co-extruded with higher polymer density — provides an additional moisture and UV barrier while creating the rich, textured surface that mimics real wood grain.",
      },
    ],
    gallery: [
      { src: "/images/cladding-teak-restaurant.png", alt: "Teak WPC vertical slat cladding restaurant interior" },
      { src: "/images/cladding-teak-living-room.png", alt: "Teak WPC cladding luxury living room with fireplace" },
    ],
    features: [
      { title: "Interior & Exterior Use", desc: "Same material performs in indoor feature walls and outdoor-facing facades." },
      { title: "Moisture Proof", desc: "Impervious to water damage, mold, and humidity — ideal for pool surrounds." },
      { title: "No Visible Fixings", desc: "Hidden clip system creates a seamless, uninterrupted wall surface." },
      { title: "Uniform Color & Grain", desc: "Extrusion guarantees identical color and texture across every board, every batch." },
      { title: "Fire-Rated Options", desc: "Certain profiles meet Class B fire-rating requirements for commercial use." },
      { title: "Cut & Shape On-Site", desc: "WPC boards can be cut, routed, and finished with standard woodworking tools." },
    ],
  },
  {
    slug: "decking",
    num: "04",
    name: "WPC Decking",
    tagline: "Slip-Resistant & Stunning",
    image: "/images/decking-grey-closeup.png",
    alt: "WPC grey decking close up with planters",
    bg: "linear-gradient(135deg, #C4C0B0 0%, #B0AC9C 100%)",
    desc: "Stays beautiful through years of Florida sun and rain. No sealing, no sanding.",
    heroImage: "/images/decking-dark-grey-hero.png",
    overview: [
      "WPC decking is one of the most popular applications of Wood Plastic Composite technology globally — and for good reason. It delivers the natural beauty of real wood underfoot, with none of the maintenance, splintering, or seasonal degradation that comes with timber.",
      "On Florida waterfront properties, pool decks, and outdoor entertainment areas, WPC decking has become the benchmark for premium outdoor flooring. The material handles standing water, direct sun, and heavy foot traffic without fading, cupping, or cracking.",
    ],
    wpcRole:
      "Decking uses either solid-core or hollow-core WPC boards, typically 140mm–150mm wide and 25mm thick. The board surface is grooved or brushed to create a slip-resistant texture — critical around pools and in Florida rain. Hollow-core boards reduce weight and cost on elevated decks without compromising surface hardness.",
    composition: [
      { label: "Recycled Wood Fiber", pct: 60, color: "#8B7355" },
      { label: "HDPE Polymer Binder", pct: 35, color: "#4A7C59" },
      { label: "UV Stabilizers & Additives", pct: 5, color: "#B8965A" },
    ],
    construction: [
      {
        title: "Grooved Anti-Slip Surface",
        body:
          "The deck board surface is precision-grooved during extrusion to provide consistent slip resistance. Unlike wood, which loses its grip when wet, WPC's grooved profile maintains traction even around pools and in heavy rain.",
      },
      {
        title: "Hidden Clip Fastener System",
        body:
          "Boards are fixed using stainless steel hidden clips that engage in the board's grooves, leaving a perfectly smooth deck surface with no exposed screws, no nail pops, and no trip hazards.",
      },
      {
        title: "Aluminum or Galvanized Steel Sub-Frame",
        body:
          "The supporting joist framework is typically aluminum or galvanized steel, not wood. This ensures the structural base is just as rot-resistant as the deck boards above, eliminating the most common point of failure in composite deck installations.",
      },
      {
        title: "Thermal Expansion Gap Design",
        body:
          "The hidden clip system automatically maintains a 5–6mm expansion gap between boards. This gap allows for thermal movement without buckling in Florida's heat while preventing debris accumulation.",
      },
    ],
    gallery: [
      { src: "/images/decking-grey-closeup.png", alt: "Grey WPC decking close up with planters Miami" },
      { src: "/images/decking-dark-grey-pond.png", alt: "Dark grey WPC decking beside pond with outdoor seating" },
    ],
    features: [
      { title: "Splinter-Free", desc: "No exposed wood fibers — safe barefoot for children, pets, and guests." },
      { title: "Anti-Slip Grooved Surface", desc: "Textured profile maintains grip when wet — ideal for pool surrounds." },
      { title: "No Seasonal Maintenance", desc: "No sealing, sanding, or staining. Soap and water is the only cleaning needed." },
      { title: "Fade Resistant", desc: "UV stabilizers prevent color change even in Florida's direct sun for 25+ years." },
      { title: "Waterfront Approved", desc: "Resistant to salt spray, standing water, and high humidity without swelling." },
      { title: "No Subfloor Rot", desc: "Paired with aluminum joists — the entire system is rot-resistant, top to bottom." },
    ],
  },
  {
    slug: "gates",
    num: "05",
    name: "WPC Gates",
    tagline: "Secure in Style",
    image: "/images/gate-charcoal-single.jpg",
    alt: "WPC charcoal gate with white aluminum frame Miami",
    bg: "linear-gradient(135deg, #CCB898 0%, #B8A080 100%)",
    desc: "Custom composite gates — warmth of wood, strength of modern materials.",
    heroImage: "/images/gate-dark-grey-sliding-hero.png",
    overview: [
      "WPC gates combine the visual warmth of real wood with the structural strength required for a functional, secure entry point. From pedestrian walk-through gates to large double-swing driveway entrances, WPC delivers a premium look that holds up under daily use.",
      "In South Florida's climate, traditional wood gates are high-maintenance liability — warping in humidity, swelling in rain, and fading in UV. WPC gates are designed for this environment: dimensionally stable, moisture-resistant, and color-stable year after year.",
    ],
    wpcRole:
      "Gates use a combination of WPC infill panels and a structural aluminum or galvanized steel frame. The frame carries all hinge and latch loads, while WPC panels fill the interior for the wood-look finish. This hybrid design gives you the best of both materials — structural integrity from metal, aesthetics from WPC.",
    composition: [
      { label: "Recycled Wood Fiber", pct: 58, color: "#8B7355" },
      { label: "HDPE Polymer Binder", pct: 37, color: "#4A7C59" },
      { label: "UV Stabilizers & Additives", pct: 5, color: "#B8965A" },
    ],
    construction: [
      {
        title: "Aluminum Structural Frame",
        body:
          "Every gate is built on a welded aluminum or powder-coated steel structural frame. The frame handles all mechanical loads — hinges, latches, wind pressure, and daily operation — entirely independently of the WPC infill.",
      },
      {
        title: "WPC Infill Panel System",
        body:
          "WPC boards slot into the aluminum frame using a recessed channel system, filling the gate face with the natural wood-look finish. Boards are free to expand and contract independently of the frame without binding or buckling.",
      },
      {
        title: "Stainless Steel Hardware",
        body:
          "All hinges, pivots, latches, and locksets are marine-grade stainless steel — rated for coastal environments. Hardware is selected for the gate's weight, span, and intended use (pedestrian, driveway, pool perimeter).",
      },
      {
        title: "Custom Sizing & Swing Direction",
        body:
          "Gates are fabricated to your exact opening dimensions. Single swing, double swing, sliding, and cantilever configurations are all available, with swing direction and latch position set to suit your site.",
      },
    ],
    gallery: [
      { src: "/images/gate-teak-tropical.jpeg", alt: "Teak WPC gate with black aluminum frame tropical Miami garden" },
      { src: "/images/gate-double-swing-render.png", alt: "Double swing WPC gate rendered design" },
    ],
    features: [
      { title: "Hybrid Frame + WPC Construction", desc: "Metal frame handles all structural loads; WPC delivers the aesthetic finish." },
      { title: "Custom Fabrication", desc: "Built to your exact opening, swing direction, and height requirements." },
      { title: "Marine-Grade Hardware", desc: "Stainless steel pivots and latches rated for South Florida's salt air exposure." },
      { title: "Dimensional Stability", desc: "WPC infill will not swell, warp, or jam in rain or high humidity." },
      { title: "Automated Gate Ready", desc: "Frame designs accommodate standard automation motor mounts and access control." },
      { title: "Matching Fence System", desc: "Gates are designed to match your WPC fence exactly — same color, profile, and grain." },
    ],
  },
  {
    slug: "benches",
    num: "06",
    name: "WPC Benches",
    tagline: "Lasting Comfort",
    image: "/images/bench-wpc-outdoor.png",
    alt: "WPC bench outdoor living Miami",
    bg: "linear-gradient(135deg, #C8C8B8 0%, #B4B4A4 100%)",
    desc: "Splinter-free, weather-resistant outdoor seating that stays looking new.",
    heroImage: "/images/bench-teak-park-hero.png",
    overview: [
      "WPC benches bring the same material science that makes composite fences and decking so durable to outdoor seating — delivering furniture that is splinter-free, weatherproof, and maintenance-free for the life of the product.",
      "Traditional teak or hardwood benches require annual oiling to maintain their color and prevent surface degradation. WPC benches require nothing — they are designed to sit in Florida's outdoor environment year-round, without covers, without treatment, and without fading.",
    ],
    wpcRole:
      "Bench seat boards and back slats use solid WPC extrusions — typically 90mm–120mm wide and 30mm thick — for the rigidity and weight-bearing capacity required for seating. The higher board thickness used in benches versus fencing ensures a firm, stable sitting surface with no flex.",
    composition: [
      { label: "Recycled Wood Fiber", pct: 62, color: "#8B7355" },
      { label: "HDPE Polymer Binder", pct: 33, color: "#4A7C59" },
      { label: "UV Stabilizers & Additives", pct: 5, color: "#B8965A" },
    ],
    construction: [
      {
        title: "Solid-Core WPC Seat Boards",
        body:
          "Unlike hollow-core profiles used in fencing, bench boards are solid-core to provide the rigidity and load-bearing capacity needed for seating. The result is a firm, stable surface with no flex or bounce under weight.",
      },
      {
        title: "Powder-Coated Aluminum Frame",
        body:
          "The structural frame is powder-coated aluminum — lightweight, rust-proof, and available in black, charcoal, white, or custom color to complement the WPC board color. Frame legs are fitted with adjustable leveling feet.",
      },
      {
        title: "Stainless Steel Through-Bolts",
        body:
          "Seat boards are secured to the frame using stainless steel through-bolts with concealed nut plates. No visible screw heads on the seating surface — and stainless hardware won't stain the WPC boards with rust streaks.",
      },
      {
        title: "Smooth Rounded Edges",
        body:
          "All board edges are routed to a 5mm radius during fabrication — eliminating the sharp or splintering edges that develop on timber seating over time, making WPC benches safe and comfortable from day one to decades later.",
      },
    ],
    gallery: [
      { src: "/images/bench-wpc-outdoor.png", alt: "WPC outdoor bench seating Miami garden" },
      { src: "/images/bench-teak-closeup.webp", alt: "Teak WPC bench with black cast iron frame outdoor pathway" },
    ],
    features: [
      { title: "Splinter-Free Always", desc: "Smooth WPC surface never splinters, cracks, or develops sharp edges with age." },
      { title: "Zero Maintenance", desc: "No oiling, sealing, or painting — ever. Wipe clean with soapy water." },
      { title: "Rust-Proof Frame", desc: "Powder-coated aluminum frame with no steel components that can corrode." },
      { title: "UV Color Stable", desc: "Board color holds true in direct Florida sun for the life of the product." },
      { title: "Weight & Weather Rated", desc: "Solid-core boards and aluminum frame engineered for outdoor load and weather exposure." },
      { title: "Coordinating Design", desc: "Available in colors that match your WPC fence, gate, or decking for a unified aesthetic." },
    ],
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return productsData.find((p) => p.slug === slug);
}
