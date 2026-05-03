// Course catalogue aligned to the Ethiopian Ministry of Education (MoE) Grade 9–12
// student textbooks and the NEAEA university entrance examination blueprint.
// Lighter detail per course (3–4 units) so every subject across both streams is covered.

export type Track =
  | "g9"
  | "g10"
  | "g11-natural"
  | "g11-social"
  | "g12-natural"
  | "g12-social"
  | "euee";

export interface Lesson {
  title: string;
  duration: string;
  preview?: boolean;
}

export interface Module {
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  initials: string;
  credentials: string[];
}

export interface Course {
  slug: string;
  track: Track;
  title: string;
  subject: string;
  lessons: number;
  students: string;
  level: string;
  color: string;
  tagline: string;
  description: string;
  duration: string;
  language: string;
  rating: number;
  reviews: number;
  price: string;
  outcomes: string[];
  modules: Module[];
  instructor: Instructor;
}

export const trackLabels: Record<Track, string> = {
  g9: "Grade 9",
  g10: "Grade 10",
  "g11-natural": "Grade 11 · Natural Science",
  "g11-social": "Grade 11 · Social Science",
  "g12-natural": "Grade 12 · Natural Science",
  "g12-social": "Grade 12 · Social Science",
  euee: "EUEE Exam Prep",
};

// Reusable instructor profiles --------------------------------------------------
const solomon: Instructor = {
  name: "Dr. Solomon Tadesse",
  title: "Senior Mathematics Lecturer · AAU",
  bio: "PhD in Applied Mathematics from Addis Ababa University with 18 years teaching the MoE mathematics syllabus and EUEE preparation. Former curriculum advisor to the Ministry of Education.",
  initials: "ST",
  credentials: ["PhD Applied Math, AAU", "MoE curriculum advisor", "Author · 3 EUEE books"],
};
const yonas: Instructor = {
  name: "Mr. Yonas Bekele",
  title: "Physics Master Teacher",
  bio: "Former national physics olympiad coach. 14 years teaching the Ethiopian physics textbook syllabus across Grade 9–12 and preparing students for NEAEA exams.",
  initials: "YB",
  credentials: ["MSc Physics, AAiT", "National Olympiad coach", "10k+ students taught"],
};
const hanna: Instructor = {
  name: "Dr. Hanna Girma",
  title: "Chemistry Lecturer · Bahir Dar University",
  bio: "PhD in Organic Chemistry. Has guided 5,000+ students through MoE chemistry units and EUEE chemistry with a 92% top-quartile success rate.",
  initials: "HG",
  credentials: ["PhD Organic Chemistry", "92% top-quartile EUEE", "Published researcher"],
};
const meron: Instructor = {
  name: "Dr. Meron Asefa",
  title: "Biology Lecturer · Jimma University",
  bio: "PhD in Cell Biology. 11 years teaching the MoE biology textbook units with consistently top-decile NEAEA results.",
  initials: "MA",
  credentials: ["PhD Cell Biology", "Top-decile EUEE results", "Visual learning expert"],
};
const tigist: Instructor = {
  name: "Ms. Tigist Alemu",
  title: "English Language Specialist",
  bio: "MA in TESOL from the University of Edinburgh. 12 years teaching the MoE English textbook syllabus and NEAEA English. Former British Council senior trainer.",
  initials: "TA",
  credentials: ["MA TESOL, Edinburgh", "Ex–British Council", "IELTS examiner"],
};
const tsehay: Instructor = {
  name: "ወ/ሮ ፀሐይ መንግስቱ",
  title: "Amharic Language Scholar",
  bio: "MA in Ethiopian Languages from AAU. Author of two widely-used Amharic grammar textbooks and 20-year veteran of secondary school instruction following the MoE Amharic syllabus.",
  initials: "TM",
  credentials: ["MA Ethiopian Languages", "Author · 2 textbooks", "20 years teaching"],
};
const abebe: Instructor = {
  name: "Mr. Abebe Worku",
  title: "Geography Teacher · 15 years experience",
  bio: "Geography educator and former examiner for the Ethiopian Secondary Education Certificate. Specialises in physical geography of the Horn of Africa and economic geography of Ethiopia.",
  initials: "AW",
  credentials: ["BA Geography, AAU", "Former NEAEA examiner", "Author · Atlas of Ethiopia"],
};
const mulu: Instructor = {
  name: "Dr. Mulu Demissie",
  title: "Historian · Mekelle University",
  bio: "PhD in Ethiopian History. Teaches the MoE history syllabus from ancient civilisations through modern Ethiopia, with a research focus on the Aksumite and Zagwe periods.",
  initials: "MD",
  credentials: ["PhD History", "Published historian", "Aksumite specialist"],
};
const fikru: Instructor = {
  name: "Mr. Fikru Tesfaye",
  title: "Economics & Civics Lecturer",
  bio: "MA in Economics. Teaches the MoE economics and civics syllabi with a focus on Ethiopia's macroeconomic context and the FDRE constitution.",
  initials: "FT",
  credentials: ["MA Economics, AAU", "Civics curriculum reviewer", "12 years teaching"],
};
const dawit: Instructor = {
  name: "Mr. Dawit Haile",
  title: "Mathematics Teacher · 12 years experience",
  bio: "Beloved Grade 9–10 math teacher whose Amharic-language video lessons have helped 30,000+ Ethiopian students master the MoE mathematics units.",
  initials: "DH",
  credentials: ["BEd Mathematics", "30k+ students taught", "Amharic-first instruction"],
};

// Colour helpers --------------------------------------------------------------
const C = {
  emerald: "var(--emerald)",
  gold: "var(--gold)",
  terracotta: "var(--terracotta)",
} as const;

// Course catalogue ------------------------------------------------------------
export const courses: Course[] = [
  // ============================== GRADE 9 ==============================
  {
    slug: "g9-mathematics",
    track: "g9",
    title: "Grade 9 Mathematics",
    subject: "Mathematics",
    lessons: 36,
    students: "8.9k",
    level: "Foundation",
    color: C.emerald,
    tagline: "The full MoE Grade 9 mathematics textbook, taught clearly.",
    description:
      "Covers every unit of the Ethiopian Grade 9 mathematics textbook — number systems, equations, geometry and statistics — with worked examples and unit assessments.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 1832,
    price: "ETB 300 · one-time",
    outcomes: [
      "Master rational and real number operations",
      "Solve linear equations and inequalities",
      "Apply plane geometry and trigonometric ratios",
      "Read and summarise statistical data",
    ],
    modules: [
      {
        title: "Unit 1 — The Number System",
        summary: "Rational numbers, real numbers and exponents.",
        lessons: [
          { title: "Rational vs irrational numbers", duration: "16 min", preview: true },
          { title: "Laws of exponents", duration: "18 min" },
          { title: "Approximation & scientific notation", duration: "14 min" },
        ],
      },
      {
        title: "Unit 2 — Solving Equations",
        summary: "Linear equations, inequalities and word problems.",
        lessons: [
          { title: "Linear equations in one variable", duration: "20 min" },
          { title: "Linear inequalities", duration: "18 min" },
          { title: "Systems of two equations", duration: "22 min" },
        ],
      },
      {
        title: "Unit 3 — Plane Geometry & Trigonometry",
        summary: "Angles, similarity and right-triangle ratios.",
        lessons: [
          { title: "Congruence & similarity", duration: "20 min" },
          { title: "Sine, cosine, tangent", duration: "22 min" },
        ],
      },
      {
        title: "Unit 4 — Statistics & Probability",
        summary: "Data collection, central tendency and basic probability.",
        lessons: [
          { title: "Mean, median, mode", duration: "16 min" },
          { title: "Probability of simple events", duration: "18 min" },
        ],
      },
    ],
    instructor: dawit,
  },
  {
    slug: "g9-physics",
    track: "g9",
    title: "Grade 9 Physics",
    subject: "Physics",
    lessons: 28,
    students: "5.4k",
    level: "Foundation",
    color: C.gold,
    tagline: "Vectors, motion and energy from the MoE Grade 9 textbook.",
    description:
      "Walks through every unit of the Grade 9 physics textbook — measurement, motion, forces, work, energy and heat — with demonstrations using everyday objects.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 947,
    price: "ETB 300 · one-time",
    outcomes: [
      "Use SI units and significant figures correctly",
      "Describe motion in one dimension",
      "Apply Newton's laws to simple systems",
      "Explain heat transfer in everyday contexts",
    ],
    modules: [
      {
        title: "Unit 1 — Physics & Measurement",
        summary: "SI units, scalars, vectors and uncertainty.",
        lessons: [
          { title: "What is physics?", duration: "12 min", preview: true },
          { title: "SI units & conversions", duration: "16 min" },
        ],
      },
      {
        title: "Unit 2 — Motion in a Straight Line",
        summary: "Position, velocity and acceleration.",
        lessons: [
          { title: "Distance vs displacement", duration: "14 min" },
          { title: "Equations of uniform acceleration", duration: "20 min" },
        ],
      },
      {
        title: "Unit 3 — Forces & Newton's Laws",
        summary: "The three laws and free-body diagrams.",
        lessons: [
          { title: "Newton's three laws", duration: "20 min" },
          { title: "Friction & normal force", duration: "16 min" },
        ],
      },
      {
        title: "Unit 4 — Work, Energy & Heat",
        summary: "Energy forms, conservation, and heat transfer.",
        lessons: [
          { title: "Kinetic & potential energy", duration: "16 min" },
          { title: "Conduction, convection, radiation", duration: "18 min" },
        ],
      },
    ],
    instructor: yonas,
  },
  {
    slug: "g9-chemistry",
    track: "g9",
    title: "Grade 9 Chemistry",
    subject: "Chemistry",
    lessons: 26,
    students: "4.8k",
    level: "Foundation",
    color: C.terracotta,
    tagline: "Atoms, the periodic table and chemical bonding — Grade 9 textbook.",
    description:
      "Follows the MoE Grade 9 chemistry textbook through atomic structure, the periodic table, chemical bonding and the chemistry of common substances.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 612,
    price: "ETB 300 · one-time",
    outcomes: [
      "Describe atomic structure and isotopes",
      "Read and use the periodic table",
      "Explain ionic and covalent bonds",
      "Balance simple chemical equations",
    ],
    modules: [
      {
        title: "Unit 1 — Structure of the Atom",
        summary: "Sub-atomic particles, isotopes and electron configuration.",
        lessons: [
          { title: "Inside the atom", duration: "16 min", preview: true },
          { title: "Electron configuration", duration: "18 min" },
        ],
      },
      {
        title: "Unit 2 — The Periodic Table",
        summary: "Periods, groups and periodic trends.",
        lessons: [
          { title: "Reading the periodic table", duration: "16 min" },
          { title: "Trends in atomic radius & reactivity", duration: "18 min" },
        ],
      },
      {
        title: "Unit 3 — Chemical Bonding",
        summary: "Ionic, covalent and metallic bonds.",
        lessons: [
          { title: "Ionic vs covalent", duration: "20 min" },
          { title: "Lewis structures", duration: "18 min" },
        ],
      },
      {
        title: "Unit 4 — Chemical Reactions",
        summary: "Equations, types of reactions and stoichiometry basics.",
        lessons: [
          { title: "Balancing equations", duration: "20 min" },
          { title: "Types of reactions", duration: "18 min" },
        ],
      },
    ],
    instructor: hanna,
  },
  {
    slug: "g9-biology",
    track: "g9",
    title: "Grade 9 Biology",
    subject: "Biology",
    lessons: 28,
    students: "5.1k",
    level: "Foundation",
    color: C.emerald,
    tagline: "Cells, classification and human biology from the MoE textbook.",
    description:
      "Complete walk-through of the Grade 9 biology textbook — cell biology, classification of living things, human biology and biotechnology fundamentals.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 743,
    price: "ETB 300 · one-time",
    outcomes: [
      "Identify cell organelles and their functions",
      "Classify living things using taxonomic ranks",
      "Describe the human digestive and circulatory systems",
      "Explain basic biotechnology concepts",
    ],
    modules: [
      {
        title: "Unit 1 — Biology & Technology",
        summary: "What biology studies and its applications.",
        lessons: [
          { title: "Branches of biology", duration: "12 min", preview: true },
          { title: "Microscopes & lab safety", duration: "14 min" },
        ],
      },
      {
        title: "Unit 2 — Cell Biology",
        summary: "Cell structure, organelles and cell division.",
        lessons: [
          { title: "Plant vs animal cells", duration: "18 min" },
          { title: "Mitosis & meiosis", duration: "20 min" },
        ],
      },
      {
        title: "Unit 3 — Classification of Living Things",
        summary: "Five kingdoms and binomial nomenclature.",
        lessons: [
          { title: "The five kingdoms", duration: "16 min" },
          { title: "Naming species", duration: "14 min" },
        ],
      },
      {
        title: "Unit 4 — Human Biology",
        summary: "Digestion, circulation and respiration.",
        lessons: [
          { title: "The digestive system", duration: "20 min" },
          { title: "Heart & circulation", duration: "18 min" },
        ],
      },
    ],
    instructor: meron,
  },
  {
    slug: "g9-english",
    track: "g9",
    title: "Grade 9 English",
    subject: "English",
    lessons: 24,
    students: "6.7k",
    level: "Foundation",
    color: C.gold,
    tagline: "Reading, grammar, writing and speaking — full Grade 9 syllabus.",
    description:
      "Covers all skill strands from the MoE Grade 9 English textbook: reading comprehension, grammar in use, writing paragraphs, listening and speaking.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 1102,
    price: "ETB 300 · one-time",
    outcomes: [
      "Read short stories and articles for meaning",
      "Use core grammar tenses correctly",
      "Write structured paragraphs and short essays",
      "Speak with clear pronunciation and intonation",
    ],
    modules: [
      {
        title: "Reading & Comprehension",
        summary: "Skim, scan and infer from short texts.",
        lessons: [
          { title: "Active reading basics", duration: "16 min", preview: true },
          { title: "Inference & main idea", duration: "18 min" },
        ],
      },
      {
        title: "Grammar in Use",
        summary: "Tenses, articles and sentence structure.",
        lessons: [
          { title: "Present, past & future tenses", duration: "20 min" },
          { title: "Articles & prepositions", duration: "16 min" },
        ],
      },
      {
        title: "Writing",
        summary: "Sentences, paragraphs and short essays.",
        lessons: [
          { title: "Topic sentences", duration: "14 min" },
          { title: "Five-paragraph essay structure", duration: "20 min" },
        ],
      },
    ],
    instructor: tigist,
  },
  {
    slug: "g9-amharic",
    track: "g9",
    title: "የ9ኛ ክፍል አማርኛ",
    subject: "Amharic",
    lessons: 22,
    students: "7.2k",
    level: "Foundation",
    color: C.terracotta,
    tagline: "የኢ.ፌ.ዴ.ሪ. ትምህርት ሚኒስቴር የ9ኛ ክፍል አማርኛ መማሪያ መጽሐፍ ሙሉ ሽፋን።",
    description:
      "የ9ኛ ክፍል የአማርኛ መማሪያ መጽሐፍን በሙሉ የሚሸፍን ኮርስ — ሰዋስው፣ የቃላት ጥናት፣ ድርሰት እና የንባብ ችሎታ።",
    duration: "8 weeks",
    language: "Amharic",
    rating: 4.9,
    reviews: 1284,
    price: "ETB 300 · one-time",
    outcomes: [
      "ሰዋስውን (grammar) በትክክል መጠቀም",
      "ድርሰት በመዋቅር መጻፍ",
      "የግሥ አጠቃቀም መማር",
      "ጽሑፍን አንብቦ መረዳት",
    ],
    modules: [
      {
        title: "ፊደላትና ቃላት",
        summary: "የፊደል ገበታ፣ የቃል አወቃቀር።",
        lessons: [
          { title: "የፊደል ገበታ ጥልቅ ግምገማ", duration: "16 min", preview: true },
          { title: "ቅጥያዎችና መጠቀሚያቸው", duration: "18 min" },
        ],
      },
      {
        title: "ግሥና ሰዋስው",
        summary: "የግሥ መሰረታዊ ቅርጾችና የጊዜ አጠቃቀም።",
        lessons: [
          { title: "የግሥ መሰረታዊ ቅርጾች", duration: "20 min" },
          { title: "የጊዜ አጠቃቀም", duration: "18 min" },
        ],
      },
      {
        title: "ድርሰት መጻፍ",
        summary: "ዓረፍተ ነገር፣ አንቀጽ እና ድርሰት።",
        lessons: [
          { title: "የዓረፍተ ነገር መዋቅር", duration: "22 min" },
          { title: "ድርሰት መጻፍ", duration: "24 min" },
        ],
      },
    ],
    instructor: tsehay,
  },
  {
    slug: "g9-geography",
    track: "g9",
    title: "Grade 9 Geography",
    subject: "Geography",
    lessons: 22,
    students: "3.9k",
    level: "Foundation",
    color: C.gold,
    tagline: "Earth, maps and the geography of Ethiopia and the Horn of Africa.",
    description:
      "Walks through the MoE Grade 9 geography textbook — map reading, the earth in space, physical geography of Ethiopia and the Horn of Africa.",
    duration: "8 weeks",
    language: "English",
    rating: 4.7,
    reviews: 421,
    price: "ETB 300 · one-time",
    outcomes: [
      "Read and interpret topographic maps",
      "Explain the earth's motion and seasons",
      "Describe Ethiopia's relief, climate and drainage",
      "Locate the countries of the Horn of Africa",
    ],
    modules: [
      {
        title: "Maps & Map Reading",
        summary: "Scale, symbols and grid references.",
        lessons: [
          { title: "Reading topographic maps", duration: "16 min", preview: true },
          { title: "Latitude & longitude", duration: "14 min" },
        ],
      },
      {
        title: "The Earth in Space",
        summary: "Solar system, rotation and revolution.",
        lessons: [
          { title: "Day, night & seasons", duration: "18 min" },
          { title: "Time zones", duration: "14 min" },
        ],
      },
      {
        title: "Physical Geography of Ethiopia",
        summary: "Relief, drainage and climate regions.",
        lessons: [
          { title: "Ethiopia's relief regions", duration: "20 min" },
          { title: "Rivers & lakes of Ethiopia", duration: "18 min" },
        ],
      },
    ],
    instructor: abebe,
  },
  {
    slug: "g9-history",
    track: "g9",
    title: "Grade 9 History",
    subject: "History",
    lessons: 22,
    students: "3.4k",
    level: "Foundation",
    color: C.terracotta,
    tagline: "From ancient civilisations to the medieval world — Grade 9 textbook.",
    description:
      "Covers the MoE Grade 9 history syllabus: introduction to history, ancient civilisations of Africa, peoples and states in the Horn, and the medieval world.",
    duration: "8 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 389,
    price: "ETB 300 · one-time",
    outcomes: [
      "Explain how historians work with sources",
      "Describe ancient African civilisations",
      "Outline the rise of the Aksumite state",
      "Compare medieval Ethiopian and world events",
    ],
    modules: [
      {
        title: "What is History?",
        summary: "Sources, periodisation and historical thinking.",
        lessons: [
          { title: "Primary vs secondary sources", duration: "14 min", preview: true },
          { title: "How historians date events", duration: "12 min" },
        ],
      },
      {
        title: "Ancient African Civilisations",
        summary: "Egypt, Nubia, Kush and early Ethiopia.",
        lessons: [
          { title: "Ancient Egypt & Nubia", duration: "20 min" },
          { title: "Pre-Aksumite cultures", duration: "18 min" },
        ],
      },
      {
        title: "The Aksumite State",
        summary: "Rise, religion, trade and decline of Aksum.",
        lessons: [
          { title: "Rise of Aksum", duration: "22 min" },
          { title: "Christianity & coinage", duration: "20 min" },
        ],
      },
    ],
    instructor: mulu,
  },
  {
    slug: "g9-civics",
    track: "g9",
    title: "Grade 9 Civics & Ethical Education",
    subject: "Civics",
    lessons: 18,
    students: "4.1k",
    level: "Foundation",
    color: C.emerald,
    tagline: "Democracy, the constitution and civic responsibility.",
    description:
      "Walks through the MoE civics syllabus: democratic values, the FDRE constitution, rule of law, and the responsibilities of citizens.",
    duration: "6 weeks",
    language: "English · Amharic explanations",
    rating: 4.7,
    reviews: 512,
    price: "ETB 300 · one-time",
    outcomes: [
      "Define democracy and its principles",
      "Outline the structure of the FDRE constitution",
      "Explain rights and duties of citizens",
      "Apply ethical reasoning to civic issues",
    ],
    modules: [
      {
        title: "Democracy & Democratic Values",
        summary: "What democracy means in practice.",
        lessons: [
          { title: "Pillars of democracy", duration: "14 min", preview: true },
          { title: "Free elections", duration: "12 min" },
        ],
      },
      {
        title: "The FDRE Constitution",
        summary: "Structure of government and federal system.",
        lessons: [
          { title: "Federal & regional powers", duration: "18 min" },
          { title: "Three branches of government", duration: "16 min" },
        ],
      },
      {
        title: "Rights, Duties & Ethics",
        summary: "Human rights, civic duties and ethical reasoning.",
        lessons: [
          { title: "Human rights in Ethiopia", duration: "16 min" },
          { title: "Civic responsibility", duration: "14 min" },
        ],
      },
    ],
    instructor: fikru,
  },

  // ============================== GRADE 10 ==============================
  {
    slug: "g10-mathematics",
    track: "g10",
    title: "Grade 10 Mathematics",
    subject: "Mathematics",
    lessons: 38,
    students: "8.4k",
    level: "Foundation",
    color: C.emerald,
    tagline: "Polynomials, coordinate geometry and trigonometry — Grade 10 textbook.",
    description:
      "Full coverage of the MoE Grade 10 mathematics textbook: polynomial functions, coordinate geometry, trigonometric functions, vectors and probability.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 1402,
    price: "ETB 300 · one-time",
    outcomes: [
      "Work with polynomial and rational functions",
      "Apply coordinate geometry to lines and circles",
      "Use trigonometric identities and equations",
      "Compute probabilities of compound events",
    ],
    modules: [
      {
        title: "Unit 1 — Polynomial Functions",
        summary: "Operations, roots and graphs of polynomials.",
        lessons: [
          { title: "Polynomial division", duration: "20 min", preview: true },
          { title: "Remainder & factor theorem", duration: "22 min" },
        ],
      },
      {
        title: "Unit 2 — Exponential & Logarithmic",
        summary: "Properties, equations and graphs.",
        lessons: [
          { title: "Laws of logarithms", duration: "20 min" },
          { title: "Solving exponential equations", duration: "18 min" },
        ],
      },
      {
        title: "Unit 3 — Trigonometric Functions",
        summary: "Unit circle, identities and equations.",
        lessons: [
          { title: "Unit circle fluency", duration: "22 min" },
          { title: "Trig identities", duration: "24 min" },
        ],
      },
      {
        title: "Unit 4 — Coordinate Geometry & Vectors",
        summary: "Lines, circles and vectors in the plane.",
        lessons: [
          { title: "Equations of lines", duration: "18 min" },
          { title: "Vectors in 2D", duration: "20 min" },
        ],
      },
    ],
    instructor: dawit,
  },
  {
    slug: "g10-physics",
    track: "g10",
    title: "Grade 10 Physics",
    subject: "Physics",
    lessons: 30,
    students: "5.2k",
    level: "Foundation",
    color: C.gold,
    tagline: "Mechanics, waves and electricity — Grade 10 MoE textbook.",
    description:
      "Covers the Grade 10 physics textbook: motion in two dimensions, dynamics, work and energy, oscillations and waves, and current electricity.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 821,
    price: "ETB 300 · one-time",
    outcomes: [
      "Solve 2D kinematics and projectile problems",
      "Apply work–energy theorem to mechanical systems",
      "Describe wave properties and superposition",
      "Analyse simple DC circuits with Ohm's law",
    ],
    modules: [
      {
        title: "Motion in Two Dimensions",
        summary: "Vectors, projectiles and circular motion.",
        lessons: [
          { title: "Vector addition", duration: "18 min", preview: true },
          { title: "Projectile motion", duration: "22 min" },
        ],
      },
      {
        title: "Work, Energy & Power",
        summary: "Energy conservation in mechanical systems.",
        lessons: [
          { title: "Work–energy theorem", duration: "20 min" },
          { title: "Power & efficiency", duration: "16 min" },
        ],
      },
      {
        title: "Oscillations & Waves",
        summary: "Simple harmonic motion and wave behaviour.",
        lessons: [
          { title: "Simple harmonic motion", duration: "22 min" },
          { title: "Wave superposition", duration: "20 min" },
        ],
      },
      {
        title: "Current Electricity",
        summary: "Ohm's law, series and parallel circuits.",
        lessons: [
          { title: "Ohm's law", duration: "18 min" },
          { title: "Series & parallel circuits", duration: "20 min" },
        ],
      },
    ],
    instructor: yonas,
  },
  {
    slug: "g10-chemistry",
    track: "g10",
    title: "Grade 10 Chemistry",
    subject: "Chemistry",
    lessons: 28,
    students: "4.6k",
    level: "Foundation",
    color: C.terracotta,
    tagline: "Stoichiometry, solutions and acid–base chemistry.",
    description:
      "Follows the MoE Grade 10 chemistry textbook: chemical reactions and stoichiometry, energy changes, solutions, acids and bases, and an introduction to organic chemistry.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 558,
    price: "ETB 300 · one-time",
    outcomes: [
      "Perform mole calculations and stoichiometry",
      "Work with concentrations of solutions",
      "Apply pH and titration concepts",
      "Identify simple organic compounds",
    ],
    modules: [
      {
        title: "Stoichiometry",
        summary: "Moles, molar mass and reaction calculations.",
        lessons: [
          { title: "The mole concept", duration: "20 min", preview: true },
          { title: "Limiting reagents", duration: "22 min" },
        ],
      },
      {
        title: "Solutions",
        summary: "Concentration, molarity and dilution.",
        lessons: [
          { title: "Molarity & molality", duration: "18 min" },
          { title: "Dilution problems", duration: "16 min" },
        ],
      },
      {
        title: "Acids, Bases & Salts",
        summary: "pH, indicators and titration.",
        lessons: [
          { title: "pH & pOH", duration: "20 min" },
          { title: "Acid–base titration", duration: "22 min" },
        ],
      },
      {
        title: "Intro to Organic Chemistry",
        summary: "Hydrocarbons and functional groups.",
        lessons: [
          { title: "Alkanes, alkenes, alkynes", duration: "20 min" },
          { title: "Naming organic compounds", duration: "18 min" },
        ],
      },
    ],
    instructor: hanna,
  },
  {
    slug: "g10-biology",
    track: "g10",
    title: "Grade 10 Biology",
    subject: "Biology",
    lessons: 26,
    students: "4.7k",
    level: "Foundation",
    color: C.emerald,
    tagline: "Genetics, ecology and human health — Grade 10 textbook.",
    description:
      "Covers the MoE Grade 10 biology textbook: heredity, evolution, ecology and human health including communicable diseases relevant to Ethiopia.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 671,
    price: "ETB 300 · one-time",
    outcomes: [
      "Solve Mendelian genetics problems",
      "Describe natural selection and adaptation",
      "Explain energy flow in ecosystems",
      "Identify common communicable diseases",
    ],
    modules: [
      {
        title: "Heredity & Genetics",
        summary: "Mendel's laws and inheritance patterns.",
        lessons: [
          { title: "Mendel's experiments", duration: "20 min", preview: true },
          { title: "Punnett squares", duration: "18 min" },
        ],
      },
      {
        title: "Evolution",
        summary: "Natural selection and evidence for evolution.",
        lessons: [
          { title: "Natural selection", duration: "20 min" },
          { title: "Fossil & molecular evidence", duration: "16 min" },
        ],
      },
      {
        title: "Ecology",
        summary: "Ecosystems, food webs and biogeochemical cycles.",
        lessons: [
          { title: "Food chains & webs", duration: "18 min" },
          { title: "Carbon & nitrogen cycles", duration: "20 min" },
        ],
      },
      {
        title: "Human Health",
        summary: "Communicable diseases and public health.",
        lessons: [
          { title: "Malaria & TB in Ethiopia", duration: "18 min" },
          { title: "HIV/AIDS prevention", duration: "16 min" },
        ],
      },
    ],
    instructor: meron,
  },
  {
    slug: "g10-english",
    track: "g10",
    title: "Grade 10 English",
    subject: "English",
    lessons: 24,
    students: "6.1k",
    level: "Foundation",
    color: C.gold,
    tagline: "Reading literature, advanced grammar and essay writing.",
    description:
      "Covers the MoE Grade 10 English textbook: literary reading, advanced grammar, essay writing, and listening & speaking strategies.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 982,
    price: "ETB 300 · one-time",
    outcomes: [
      "Read and analyse short literary texts",
      "Use complex grammar structures",
      "Plan and write structured essays",
      "Take effective notes from lectures",
    ],
    modules: [
      {
        title: "Reading Literature",
        summary: "Short stories, poetry and themes.",
        lessons: [
          { title: "Theme & character", duration: "18 min", preview: true },
          { title: "Reading poetry", duration: "20 min" },
        ],
      },
      {
        title: "Advanced Grammar",
        summary: "Conditionals, passive voice and reported speech.",
        lessons: [
          { title: "Conditional sentences", duration: "20 min" },
          { title: "Active vs passive", duration: "18 min" },
        ],
      },
      {
        title: "Essay Writing",
        summary: "Argumentative and expository essays.",
        lessons: [
          { title: "Building an argument", duration: "20 min" },
          { title: "Editing for clarity", duration: "16 min" },
        ],
      },
    ],
    instructor: tigist,
  },
  {
    slug: "g10-amharic",
    track: "g10",
    title: "የ10ኛ ክፍል አማርኛ",
    subject: "Amharic",
    lessons: 22,
    students: "6.4k",
    level: "Foundation",
    color: C.terracotta,
    tagline: "ሰዋስው፣ ሥነ-ጽሑፍ እና የድርሰት ክሂሎት።",
    description:
      "የ10ኛ ክፍል የአማርኛ መማሪያ መጽሐፍን ሙሉ በሙሉ የሚሸፍን ኮርስ — ሰዋስው፣ ሥነ-ጽሑፍ፣ የንባብ እና የድርሰት ክሂሎት።",
    duration: "8 weeks",
    language: "Amharic",
    rating: 4.9,
    reviews: 1041,
    price: "ETB 300 · one-time",
    outcomes: [
      "ሥነ-ጽሑፋዊ ጽሑፍን መረዳት",
      "የጽሑፍ ድርሰት ማቀድና መጻፍ",
      "ሰዋስውን በላቀ ደረጃ መጠቀም",
      "ግጥምን ማንበብና መተርጎም",
    ],
    modules: [
      {
        title: "ላቀ ሰዋስው",
        summary: "የቃላት ዓይነቶችና የዓረፍተ ነገር መዋቅር።",
        lessons: [
          { title: "የቃላት ዓይነቶች", duration: "18 min", preview: true },
          { title: "የውሁድ ዓረፍተ ነገር", duration: "20 min" },
        ],
      },
      {
        title: "ሥነ-ጽሑፍ",
        summary: "አጭር ልብ-ወለድ፣ ግጥምና ድራማ።",
        lessons: [
          { title: "የልብ-ወለድ ትንተና", duration: "22 min" },
          { title: "ግጥምን መተርጎም", duration: "20 min" },
        ],
      },
      {
        title: "ድርሰት",
        summary: "የክርክርና የገለጻ ድርሰት መጻፍ።",
        lessons: [
          { title: "የክርክር ድርሰት", duration: "22 min" },
          { title: "ማስተካከያ", duration: "16 min" },
        ],
      },
    ],
    instructor: tsehay,
  },
  {
    slug: "g10-geography",
    track: "g10",
    title: "Grade 10 Geography",
    subject: "Geography",
    lessons: 22,
    students: "3.6k",
    level: "Foundation",
    color: C.gold,
    tagline: "Population, economic activities and Africa.",
    description:
      "Covers the MoE Grade 10 geography textbook: population geography, economic activities of Ethiopia, environment and the geography of Africa.",
    duration: "8 weeks",
    language: "English",
    rating: 4.7,
    reviews: 358,
    price: "ETB 300 · one-time",
    outcomes: [
      "Interpret population pyramids",
      "Describe Ethiopia's main economic activities",
      "Analyse environmental challenges in the Horn",
      "Locate major regions of Africa",
    ],
    modules: [
      {
        title: "Population Geography",
        summary: "Distribution, density and demographic transition.",
        lessons: [
          { title: "Reading population pyramids", duration: "18 min", preview: true },
          { title: "Migration", duration: "16 min" },
        ],
      },
      {
        title: "Economic Activities of Ethiopia",
        summary: "Agriculture, manufacturing and services.",
        lessons: [
          { title: "Ethiopian agriculture", duration: "20 min" },
          { title: "Manufacturing & trade", duration: "18 min" },
        ],
      },
      {
        title: "Geography of Africa",
        summary: "Physical and human geography of the continent.",
        lessons: [
          { title: "African regions", duration: "20 min" },
          { title: "Climate of Africa", duration: "18 min" },
        ],
      },
    ],
    instructor: abebe,
  },
  {
    slug: "g10-history",
    track: "g10",
    title: "Grade 10 History",
    subject: "History",
    lessons: 22,
    students: "3.2k",
    level: "Foundation",
    color: C.terracotta,
    tagline: "Modern Ethiopia and the world from 1800 to today.",
    description:
      "Covers the MoE Grade 10 history syllabus: 19th-century Ethiopia, the scramble for Africa, the Italian invasions, modern Ethiopian state-building and major 20th-century world events.",
    duration: "8 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 412,
    price: "ETB 300 · one-time",
    outcomes: [
      "Explain the Battle of Adwa and its significance",
      "Outline 20th-century Ethiopian governments",
      "Describe African decolonisation",
      "Connect Ethiopian to world history events",
    ],
    modules: [
      {
        title: "19th-century Ethiopia",
        summary: "Tewodros, Yohannes, Menelik and unification.",
        lessons: [
          { title: "Tewodros II's reforms", duration: "18 min", preview: true },
          { title: "Battle of Adwa", duration: "22 min" },
        ],
      },
      {
        title: "20th-century Ethiopia",
        summary: "Haile Selassie, Italian occupation and the Derg.",
        lessons: [
          { title: "Italian invasion 1935–41", duration: "20 min" },
          { title: "Revolution of 1974", duration: "20 min" },
        ],
      },
      {
        title: "Africa & the World",
        summary: "Decolonisation, Cold War and globalisation.",
        lessons: [
          { title: "African independence movements", duration: "18 min" },
          { title: "Pan-Africanism", duration: "16 min" },
        ],
      },
    ],
    instructor: mulu,
  },

  // ============================== GRADE 11 — NATURAL SCIENCE ==============================
  {
    slug: "g11-natural-mathematics",
    track: "g11-natural",
    title: "Grade 11 Mathematics (Natural)",
    subject: "Mathematics",
    lessons: 42,
    students: "4.8k",
    level: "Advanced",
    color: C.emerald,
    tagline: "Functions, sequences and intro to calculus for the science stream.",
    description:
      "Covers the MoE Grade 11 Mathematics for Natural Sciences textbook — relations and functions, sequences and series, introduction to limits, derivatives and applications.",
    duration: "12 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 612,
    price: "ETB 300 · one-time",
    outcomes: [
      "Analyse polynomial, rational and trigonometric functions",
      "Work with arithmetic and geometric sequences",
      "Compute limits and continuity",
      "Apply derivatives to optimisation",
    ],
    modules: [
      {
        title: "Relations & Functions",
        summary: "Domain, range and function transformations.",
        lessons: [
          { title: "Function families", duration: "20 min", preview: true },
          { title: "Inverse functions", duration: "22 min" },
        ],
      },
      {
        title: "Sequences & Series",
        summary: "Arithmetic, geometric and infinite series.",
        lessons: [
          { title: "Arithmetic sequences", duration: "18 min" },
          { title: "Sum of geometric series", duration: "20 min" },
        ],
      },
      {
        title: "Limits & Continuity",
        summary: "Intuitive and formal limits, continuity at a point.",
        lessons: [
          { title: "Intuition behind limits", duration: "20 min" },
          { title: "One-sided limits", duration: "18 min" },
        ],
      },
      {
        title: "Derivatives",
        summary: "Power, product, quotient and chain rules.",
        lessons: [
          { title: "Definition of derivative", duration: "22 min" },
          { title: "Chain rule mastery", duration: "24 min" },
        ],
      },
    ],
    instructor: solomon,
  },
  {
    slug: "g11-natural-physics",
    track: "g11-natural",
    title: "Grade 11 Physics",
    subject: "Physics",
    lessons: 38,
    students: "3.9k",
    level: "Advanced",
    color: C.gold,
    tagline: "Vectors, dynamics and electromagnetism for the science stream.",
    description:
      "Covers the MoE Grade 11 physics textbook: vector mechanics, dynamics, fluid mechanics, heat and electromagnetism — with worked exam-style problems.",
    duration: "12 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 478,
    price: "ETB 300 · one-time",
    outcomes: [
      "Apply vector methods to mechanics problems",
      "Analyse rotational dynamics",
      "Describe fluid pressure and Bernoulli's principle",
      "Apply Coulomb's law and Gauss's law qualitatively",
    ],
    modules: [
      {
        title: "Vector Mechanics",
        summary: "2D and 3D vector operations in physics.",
        lessons: [
          { title: "Dot & cross product", duration: "22 min", preview: true },
          { title: "Equilibrium of forces", duration: "20 min" },
        ],
      },
      {
        title: "Rotational Dynamics",
        summary: "Torque, angular momentum and moment of inertia.",
        lessons: [
          { title: "Torque & angular acceleration", duration: "22 min" },
          { title: "Conservation of angular momentum", duration: "20 min" },
        ],
      },
      {
        title: "Fluid Mechanics",
        summary: "Pressure, buoyancy and fluid flow.",
        lessons: [
          { title: "Pascal's & Archimedes' principles", duration: "20 min" },
          { title: "Bernoulli's equation", duration: "22 min" },
        ],
      },
      {
        title: "Electrostatics",
        summary: "Charge, Coulomb's law and electric fields.",
        lessons: [
          { title: "Coulomb's law", duration: "20 min" },
          { title: "Electric field & potential", duration: "22 min" },
        ],
      },
    ],
    instructor: yonas,
  },
  {
    slug: "g11-natural-chemistry",
    track: "g11-natural",
    title: "Grade 11 Chemistry",
    subject: "Chemistry",
    lessons: 36,
    students: "3.6k",
    level: "Advanced",
    color: C.terracotta,
    tagline: "Atomic structure, gases and chemical equilibrium.",
    description:
      "Covers the MoE Grade 11 chemistry textbook: atomic structure & periodicity, gas laws, chemical kinetics, equilibrium and acid–base equilibria.",
    duration: "12 weeks",
    language: "English",
    rating: 4.8,
    reviews: 391,
    price: "ETB 300 · one-time",
    outcomes: [
      "Apply quantum-model concepts to atomic structure",
      "Solve gas law problems",
      "Use rate laws and reaction order",
      "Calculate equilibrium constants",
    ],
    modules: [
      {
        title: "Atomic Structure & Periodicity",
        summary: "Quantum numbers and the modern periodic table.",
        lessons: [
          { title: "Quantum numbers", duration: "22 min", preview: true },
          { title: "Periodic trends revisited", duration: "20 min" },
        ],
      },
      {
        title: "Gases",
        summary: "Ideal gas law and kinetic theory.",
        lessons: [
          { title: "Ideal gas law", duration: "20 min" },
          { title: "Kinetic theory", duration: "18 min" },
        ],
      },
      {
        title: "Chemical Kinetics",
        summary: "Rate laws and reaction mechanisms.",
        lessons: [
          { title: "Rate laws", duration: "22 min" },
          { title: "Activation energy", duration: "18 min" },
        ],
      },
      {
        title: "Chemical Equilibrium",
        summary: "Le Chatelier's principle and Kc.",
        lessons: [
          { title: "Equilibrium constant", duration: "20 min" },
          { title: "Le Chatelier in action", duration: "18 min" },
        ],
      },
    ],
    instructor: hanna,
  },
  {
    slug: "g11-natural-biology",
    track: "g11-natural",
    title: "Grade 11 Biology",
    subject: "Biology",
    lessons: 36,
    students: "3.7k",
    level: "Advanced",
    color: C.emerald,
    tagline: "Biochemistry, microbiology and plant biology.",
    description:
      "Covers the MoE Grade 11 biology textbook: biochemistry, enzymes, microbiology, plant structure & function, and ecology in depth.",
    duration: "12 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 521,
    price: "ETB 300 · one-time",
    outcomes: [
      "Identify carbohydrates, lipids, proteins and nucleic acids",
      "Describe enzyme action and inhibition",
      "Outline microbial classification and useful microbes",
      "Explain plant transport and reproduction",
    ],
    modules: [
      {
        title: "Biochemistry",
        summary: "The four major biomolecules.",
        lessons: [
          { title: "Carbohydrates & lipids", duration: "22 min", preview: true },
          { title: "Proteins & nucleic acids", duration: "24 min" },
        ],
      },
      {
        title: "Enzymes",
        summary: "Mechanism, specificity and inhibition.",
        lessons: [
          { title: "How enzymes work", duration: "20 min" },
          { title: "Enzyme inhibition", duration: "18 min" },
        ],
      },
      {
        title: "Microbiology",
        summary: "Bacteria, viruses and useful microbes.",
        lessons: [
          { title: "Bacterial structure", duration: "18 min" },
          { title: "Viruses & disease", duration: "20 min" },
        ],
      },
      {
        title: "Plant Biology",
        summary: "Tissues, transport and reproduction.",
        lessons: [
          { title: "Xylem & phloem transport", duration: "22 min" },
          { title: "Plant reproduction", duration: "20 min" },
        ],
      },
    ],
    instructor: meron,
  },
  {
    slug: "g11-natural-english",
    track: "g11-natural",
    title: "Grade 11 English",
    subject: "English",
    lessons: 24,
    students: "4.5k",
    level: "Intermediate",
    color: C.gold,
    tagline: "Academic reading and writing for science students.",
    description:
      "Strengthens the academic English needed for science study and the EUEE — analytical reading, scientific vocabulary and structured argumentative writing.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 642,
    price: "ETB 300 · one-time",
    outcomes: [
      "Read scientific and academic texts efficiently",
      "Use academic vocabulary precisely",
      "Write argumentative essays with evidence",
      "Improve listening to lectures",
    ],
    modules: [
      {
        title: "Academic Reading",
        summary: "Critical reading of academic prose.",
        lessons: [
          { title: "Reading for argument", duration: "20 min", preview: true },
          { title: "Note-taking from texts", duration: "18 min" },
        ],
      },
      {
        title: "Academic Writing",
        summary: "Argumentative essays and summaries.",
        lessons: [
          { title: "Thesis statements", duration: "18 min" },
          { title: "Citing evidence", duration: "20 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        summary: "Lectures, discussions and presentations.",
        lessons: [
          { title: "Following lectures", duration: "16 min" },
          { title: "Group discussion skills", duration: "18 min" },
        ],
      },
    ],
    instructor: tigist,
  },

  // ============================== GRADE 11 — SOCIAL SCIENCE ==============================
  {
    slug: "g11-social-mathematics",
    track: "g11-social",
    title: "Grade 11 Mathematics (Social)",
    subject: "Mathematics",
    lessons: 32,
    students: "3.4k",
    level: "Intermediate",
    color: C.emerald,
    tagline: "Math for social sciences — functions, statistics and matrices.",
    description:
      "Covers the MoE Grade 11 Mathematics for Social Sciences textbook: relations and functions, statistics & probability, matrices and applications to social science.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 412,
    price: "ETB 300 · one-time",
    outcomes: [
      "Analyse functions used in social sciences",
      "Compute descriptive statistics",
      "Use matrices to solve linear systems",
      "Apply probability to real-world data",
    ],
    modules: [
      {
        title: "Relations & Functions",
        summary: "Linear, quadratic and exponential models.",
        lessons: [
          { title: "Modelling with functions", duration: "20 min", preview: true },
          { title: "Inverse & composition", duration: "18 min" },
        ],
      },
      {
        title: "Statistics",
        summary: "Measures of centre, spread and correlation.",
        lessons: [
          { title: "Variance & standard deviation", duration: "20 min" },
          { title: "Correlation", duration: "18 min" },
        ],
      },
      {
        title: "Matrices",
        summary: "Operations and solving linear systems.",
        lessons: [
          { title: "Matrix operations", duration: "20 min" },
          { title: "Inverse & determinants", duration: "22 min" },
        ],
      },
    ],
    instructor: solomon,
  },
  {
    slug: "g11-social-geography",
    track: "g11-social",
    title: "Grade 11 Geography",
    subject: "Geography",
    lessons: 28,
    students: "2.8k",
    level: "Advanced",
    color: C.gold,
    tagline: "Earth systems, regional geography and economic geography.",
    description:
      "Covers the MoE Grade 11 geography textbook: earth's atmosphere and climate, regional geography of Ethiopia, economic geography and resource use.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 318,
    price: "ETB 300 · one-time",
    outcomes: [
      "Explain global climate systems",
      "Compare Ethiopia's regional economies",
      "Analyse natural resource distribution",
      "Interpret thematic maps",
    ],
    modules: [
      {
        title: "Atmosphere & Climate",
        summary: "Weather systems and climate classification.",
        lessons: [
          { title: "Global wind patterns", duration: "20 min", preview: true },
          { title: "Climate of Ethiopia", duration: "22 min" },
        ],
      },
      {
        title: "Regional Geography of Ethiopia",
        summary: "Highlands, lowlands and rift valley.",
        lessons: [
          { title: "Highland regions", duration: "20 min" },
          { title: "The Great Rift Valley", duration: "18 min" },
        ],
      },
      {
        title: "Economic Geography",
        summary: "Resources, industry and trade.",
        lessons: [
          { title: "Mineral resources of Ethiopia", duration: "18 min" },
          { title: "Hydropower & GERD", duration: "22 min" },
        ],
      },
    ],
    instructor: abebe,
  },
  {
    slug: "g11-social-history",
    track: "g11-social",
    title: "Grade 11 History",
    subject: "History",
    lessons: 28,
    students: "2.6k",
    level: "Advanced",
    color: C.terracotta,
    tagline: "World history with a focus on Africa and Ethiopia.",
    description:
      "Covers the MoE Grade 11 history syllabus: world history from antiquity to the modern era, with deep dives on African and Ethiopian developments.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 287,
    price: "ETB 300 · one-time",
    outcomes: [
      "Compare ancient civilisations across continents",
      "Explain medieval Ethiopian dynasties",
      "Analyse the impact of European expansion",
      "Trace 20th-century African political change",
    ],
    modules: [
      {
        title: "Medieval Ethiopia",
        summary: "Zagwe, Solomonic dynasty and Christian–Muslim relations.",
        lessons: [
          { title: "Lalibela & the Zagwe", duration: "20 min", preview: true },
          { title: "Solomonic restoration", duration: "22 min" },
        ],
      },
      {
        title: "Early Modern World",
        summary: "Renaissance, Reformation and Age of Exploration.",
        lessons: [
          { title: "European expansion", duration: "20 min" },
          { title: "Slavery & resistance", duration: "22 min" },
        ],
      },
      {
        title: "Modern Africa",
        summary: "Colonialism, decolonisation and pan-Africanism.",
        lessons: [
          { title: "Scramble for Africa", duration: "18 min" },
          { title: "African independence", duration: "20 min" },
        ],
      },
    ],
    instructor: mulu,
  },
  {
    slug: "g11-social-economics",
    track: "g11-social",
    title: "Grade 11 Economics",
    subject: "Economics",
    lessons: 26,
    students: "2.9k",
    level: "Advanced",
    color: C.emerald,
    tagline: "Microeconomics with Ethiopian case studies.",
    description:
      "Covers the MoE Grade 11 economics textbook: introduction to economics, demand & supply, theory of consumer behaviour, theory of the firm and market structures.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 342,
    price: "ETB 300 · one-time",
    outcomes: [
      "Define core economic concepts",
      "Analyse demand and supply equilibrium",
      "Compute elasticity",
      "Compare market structures",
    ],
    modules: [
      {
        title: "Intro to Economics",
        summary: "Scarcity, choice and opportunity cost.",
        lessons: [
          { title: "What economists study", duration: "16 min", preview: true },
          { title: "Production possibility frontier", duration: "18 min" },
        ],
      },
      {
        title: "Demand & Supply",
        summary: "Equilibrium, shifts and elasticity.",
        lessons: [
          { title: "Law of demand & supply", duration: "20 min" },
          { title: "Price elasticity", duration: "20 min" },
        ],
      },
      {
        title: "Market Structures",
        summary: "Perfect competition, monopoly and oligopoly.",
        lessons: [
          { title: "Perfect competition", duration: "20 min" },
          { title: "Monopoly power", duration: "20 min" },
        ],
      },
    ],
    instructor: fikru,
  },
  {
    slug: "g11-social-civics",
    track: "g11-social",
    title: "Grade 11 Civics",
    subject: "Civics",
    lessons: 18,
    students: "3.1k",
    level: "Intermediate",
    color: C.gold,
    tagline: "Federalism, rule of law and the constitution.",
    description:
      "Covers the MoE Grade 11 civics syllabus: democratic institutions, federalism in Ethiopia, rule of law and good governance.",
    duration: "8 weeks",
    language: "English · Amharic explanations",
    rating: 4.7,
    reviews: 281,
    price: "ETB 300 · one-time",
    outcomes: [
      "Explain Ethiopian federalism",
      "Describe rule of law in practice",
      "Analyse good governance principles",
      "Engage in civic dialogue",
    ],
    modules: [
      {
        title: "Federalism in Ethiopia",
        summary: "Why federalism, regional states and self-rule.",
        lessons: [
          { title: "Federal vs unitary states", duration: "16 min", preview: true },
          { title: "Regional states", duration: "18 min" },
        ],
      },
      {
        title: "Rule of Law",
        summary: "Judicial independence and accountability.",
        lessons: [
          { title: "Independent judiciary", duration: "16 min" },
          { title: "Anti-corruption", duration: "16 min" },
        ],
      },
      {
        title: "Good Governance",
        summary: "Transparency, participation and accountability.",
        lessons: [
          { title: "Transparency in practice", duration: "16 min" },
          { title: "Civic participation", duration: "16 min" },
        ],
      },
    ],
    instructor: fikru,
  },

  // ============================== GRADE 12 — NATURAL SCIENCE ==============================
  {
    slug: "g12-natural-mathematics",
    track: "g12-natural",
    title: "Grade 12 Mathematics (Natural)",
    subject: "Mathematics",
    lessons: 46,
    students: "5.1k",
    level: "Advanced",
    color: C.emerald,
    tagline: "Calculus, vectors and statistics — Grade 12 Natural Science.",
    description:
      "Covers the MoE Grade 12 Mathematics for Natural Sciences textbook: integration, applications of calculus, three-dimensional geometry, statistics and probability.",
    duration: "14 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 824,
    price: "ETB 300 · one-time",
    outcomes: [
      "Master integration techniques",
      "Apply calculus to area, volume and motion",
      "Work with 3D vectors and planes",
      "Solve probability and combinatorics problems",
    ],
    modules: [
      {
        title: "Integration",
        summary: "Indefinite, definite and techniques of integration.",
        lessons: [
          { title: "Antiderivatives", duration: "22 min", preview: true },
          { title: "u-substitution & by parts", duration: "26 min" },
        ],
      },
      {
        title: "Applications of Calculus",
        summary: "Areas, volumes and optimisation.",
        lessons: [
          { title: "Area between curves", duration: "22 min" },
          { title: "Volumes of revolution", duration: "24 min" },
        ],
      },
      {
        title: "Three-Dimensional Geometry",
        summary: "Vectors, lines and planes in space.",
        lessons: [
          { title: "Vectors in 3D", duration: "22 min" },
          { title: "Equation of a plane", duration: "20 min" },
        ],
      },
      {
        title: "Probability & Statistics",
        summary: "Combinatorics, distributions and inference basics.",
        lessons: [
          { title: "Permutations & combinations", duration: "20 min" },
          { title: "Normal distribution", duration: "22 min" },
        ],
      },
    ],
    instructor: solomon,
  },
  {
    slug: "g12-natural-physics",
    track: "g12-natural",
    title: "Grade 12 Physics",
    subject: "Physics",
    lessons: 42,
    students: "4.6k",
    level: "Advanced",
    color: C.gold,
    tagline: "Electromagnetism, optics and modern physics.",
    description:
      "Covers the MoE Grade 12 physics textbook: electromagnetism, electromagnetic induction, optics, atomic and nuclear physics — the EUEE-critical topics.",
    duration: "14 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 712,
    price: "ETB 300 · one-time",
    outcomes: [
      "Apply Kirchhoff's laws to circuits",
      "Explain electromagnetic induction",
      "Solve geometric and wave optics problems",
      "Describe nuclear reactions and decay",
    ],
    modules: [
      {
        title: "Electromagnetism",
        summary: "Magnetic field, force on currents and Ampère's law.",
        lessons: [
          { title: "Magnetic force on a wire", duration: "22 min", preview: true },
          { title: "Ampère's law", duration: "20 min" },
        ],
      },
      {
        title: "Electromagnetic Induction",
        summary: "Faraday's & Lenz's laws and AC circuits.",
        lessons: [
          { title: "Faraday's law", duration: "22 min" },
          { title: "Transformers & AC", duration: "20 min" },
        ],
      },
      {
        title: "Optics",
        summary: "Reflection, refraction, lenses and interference.",
        lessons: [
          { title: "Lens equation", duration: "20 min" },
          { title: "Young's double slit", duration: "22 min" },
        ],
      },
      {
        title: "Atomic & Nuclear Physics",
        summary: "Photoelectric effect, atomic models and decay.",
        lessons: [
          { title: "Photoelectric effect", duration: "20 min" },
          { title: "Radioactive decay", duration: "22 min" },
        ],
      },
    ],
    instructor: yonas,
  },
  {
    slug: "g12-natural-chemistry",
    track: "g12-natural",
    title: "Grade 12 Chemistry",
    subject: "Chemistry",
    lessons: 40,
    students: "4.2k",
    level: "Advanced",
    color: C.terracotta,
    tagline: "Thermodynamics, electrochemistry and organic chemistry.",
    description:
      "Covers the MoE Grade 12 chemistry textbook: thermodynamics, electrochemistry, hydrocarbons & functional groups, polymers and industrial chemistry.",
    duration: "14 weeks",
    language: "English",
    rating: 4.9,
    reviews: 596,
    price: "ETB 300 · one-time",
    outcomes: [
      "Apply enthalpy, entropy and free energy",
      "Predict redox reactions and cell potentials",
      "Name organic compounds across functional groups",
      "Describe key polymers and industrial processes",
    ],
    modules: [
      {
        title: "Thermodynamics",
        summary: "Enthalpy, entropy and Gibbs free energy.",
        lessons: [
          { title: "Hess's law", duration: "20 min", preview: true },
          { title: "Spontaneity & free energy", duration: "22 min" },
        ],
      },
      {
        title: "Electrochemistry",
        summary: "Redox, galvanic and electrolytic cells.",
        lessons: [
          { title: "Standard electrode potentials", duration: "22 min" },
          { title: "Electrolysis", duration: "20 min" },
        ],
      },
      {
        title: "Organic Chemistry",
        summary: "Hydrocarbons, alcohols, carbonyls and acids.",
        lessons: [
          { title: "IUPAC naming review", duration: "20 min" },
          { title: "Reactions of functional groups", duration: "24 min" },
        ],
      },
      {
        title: "Polymers & Industry",
        summary: "Addition & condensation polymers, industrial chemistry.",
        lessons: [
          { title: "Polymerisation", duration: "18 min" },
          { title: "Ethiopian industrial chemistry", duration: "20 min" },
        ],
      },
    ],
    instructor: hanna,
  },
  {
    slug: "g12-natural-biology",
    track: "g12-natural",
    title: "Grade 12 Biology",
    subject: "Biology",
    lessons: 40,
    students: "4.4k",
    level: "Advanced",
    color: C.emerald,
    tagline: "Genetics, human physiology and biotechnology.",
    description:
      "Covers the MoE Grade 12 biology textbook: molecular genetics, human physiology in detail, immunity, biotechnology and behaviour & ecology.",
    duration: "14 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 723,
    price: "ETB 300 · one-time",
    outcomes: [
      "Explain DNA replication, transcription and translation",
      "Describe nervous, endocrine and reproductive systems",
      "Outline the immune response",
      "Explain modern biotechnology applications",
    ],
    modules: [
      {
        title: "Molecular Genetics",
        summary: "DNA, RNA, replication and protein synthesis.",
        lessons: [
          { title: "DNA replication", duration: "22 min", preview: true },
          { title: "Transcription & translation", duration: "24 min" },
        ],
      },
      {
        title: "Human Physiology",
        summary: "Nervous, endocrine and reproductive systems.",
        lessons: [
          { title: "Nervous system", duration: "22 min" },
          { title: "Endocrine system", duration: "20 min" },
        ],
      },
      {
        title: "Immunity",
        summary: "Innate & adaptive immunity and vaccines.",
        lessons: [
          { title: "Adaptive immune response", duration: "20 min" },
          { title: "How vaccines work", duration: "18 min" },
        ],
      },
      {
        title: "Biotechnology",
        summary: "Genetic engineering and applications.",
        lessons: [
          { title: "PCR & cloning", duration: "20 min" },
          { title: "Biotech in agriculture", duration: "18 min" },
        ],
      },
    ],
    instructor: meron,
  },
  {
    slug: "g12-natural-english",
    track: "g12-natural",
    title: "Grade 12 English",
    subject: "English",
    lessons: 24,
    students: "4.8k",
    level: "Advanced",
    color: C.gold,
    tagline: "Advanced reading and exam-ready writing.",
    description:
      "Covers the Grade 12 English syllabus with a focus on advanced reading comprehension, vocabulary, grammar precision and EUEE-style writing tasks.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 712,
    price: "ETB 300 · one-time",
    outcomes: [
      "Read dense academic passages efficiently",
      "Master 1,000+ academic vocabulary words",
      "Eliminate common grammar traps",
      "Write structured analytical essays",
    ],
    modules: [
      {
        title: "Advanced Reading",
        summary: "Strategies for dense academic texts.",
        lessons: [
          { title: "Skim, scan & SQ3R", duration: "20 min", preview: true },
          { title: "Inference questions", duration: "20 min" },
        ],
      },
      {
        title: "Grammar Precision",
        summary: "High-frequency exam grammar.",
        lessons: [
          { title: "Subject–verb agreement", duration: "18 min" },
          { title: "Modifiers & parallelism", duration: "20 min" },
        ],
      },
      {
        title: "Exam Writing",
        summary: "Argumentative and analytical essays.",
        lessons: [
          { title: "Planning under time pressure", duration: "16 min" },
          { title: "Editing in 5 minutes", duration: "14 min" },
        ],
      },
    ],
    instructor: tigist,
  },

  // ============================== GRADE 12 — SOCIAL SCIENCE ==============================
  {
    slug: "g12-social-mathematics",
    track: "g12-social",
    title: "Grade 12 Mathematics (Social)",
    subject: "Mathematics",
    lessons: 32,
    students: "3.0k",
    level: "Intermediate",
    color: C.emerald,
    tagline: "Linear programming, calculus essentials and statistics.",
    description:
      "Covers the MoE Grade 12 Mathematics for Social Sciences textbook: linear programming, introduction to calculus, statistical inference and mathematical applications in finance and economics.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 358,
    price: "ETB 300 · one-time",
    outcomes: [
      "Solve linear programming problems graphically",
      "Apply derivatives in economics",
      "Compute confidence intervals",
      "Calculate compound interest and annuities",
    ],
    modules: [
      {
        title: "Linear Programming",
        summary: "Constraints, feasible region and optimisation.",
        lessons: [
          { title: "Graphical method", duration: "22 min", preview: true },
          { title: "Maximisation problems", duration: "20 min" },
        ],
      },
      {
        title: "Calculus Essentials",
        summary: "Derivatives and integrals for social sciences.",
        lessons: [
          { title: "Marginal analysis", duration: "20 min" },
          { title: "Area under demand curve", duration: "20 min" },
        ],
      },
      {
        title: "Statistics & Finance",
        summary: "Sampling, confidence and time-value of money.",
        lessons: [
          { title: "Sampling distributions", duration: "18 min" },
          { title: "Compound interest", duration: "20 min" },
        ],
      },
    ],
    instructor: solomon,
  },
  {
    slug: "g12-social-geography",
    track: "g12-social",
    title: "Grade 12 Geography",
    subject: "Geography",
    lessons: 28,
    students: "2.7k",
    level: "Advanced",
    color: C.gold,
    tagline: "Development, environment and the global economy.",
    description:
      "Covers the MoE Grade 12 geography textbook: development geography, environment and sustainability, urbanisation, and geography of the global economy.",
    duration: "10 weeks",
    language: "English",
    rating: 4.8,
    reviews: 296,
    price: "ETB 300 · one-time",
    outcomes: [
      "Compare measures of development",
      "Analyse environmental sustainability",
      "Describe urbanisation trends in Ethiopia",
      "Explain global trade patterns",
    ],
    modules: [
      {
        title: "Development Geography",
        summary: "GDP, HDI and indicators of development.",
        lessons: [
          { title: "What is development?", duration: "18 min", preview: true },
          { title: "HDI in detail", duration: "20 min" },
        ],
      },
      {
        title: "Environment & Sustainability",
        summary: "Climate change and natural resource management.",
        lessons: [
          { title: "Climate change in the Horn", duration: "20 min" },
          { title: "Sustainable resource use", duration: "18 min" },
        ],
      },
      {
        title: "Urbanisation",
        summary: "Cities, land use and Addis Ababa.",
        lessons: [
          { title: "Urbanisation in Ethiopia", duration: "20 min" },
          { title: "Addis Ababa growth", duration: "18 min" },
        ],
      },
    ],
    instructor: abebe,
  },
  {
    slug: "g12-social-history",
    track: "g12-social",
    title: "Grade 12 History",
    subject: "History",
    lessons: 28,
    students: "2.5k",
    level: "Advanced",
    color: C.terracotta,
    tagline: "Contemporary Ethiopian and world history.",
    description:
      "Covers the MoE Grade 12 history syllabus: Ethiopia from the Derg through EPRDF and beyond, the Cold War, and contemporary global issues.",
    duration: "10 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 268,
    price: "ETB 300 · one-time",
    outcomes: [
      "Explain Derg and EPRDF eras",
      "Describe the Cold War's impact on Africa",
      "Outline contemporary regional conflicts",
      "Analyse globalisation",
    ],
    modules: [
      {
        title: "Contemporary Ethiopia",
        summary: "From the Derg to today.",
        lessons: [
          { title: "Derg era", duration: "20 min", preview: true },
          { title: "EPRDF & federal era", duration: "22 min" },
        ],
      },
      {
        title: "Cold War & Africa",
        summary: "Superpower rivalry and African states.",
        lessons: [
          { title: "Cold War in the Horn", duration: "20 min" },
          { title: "Non-alignment", duration: "18 min" },
        ],
      },
      {
        title: "Contemporary World",
        summary: "Globalisation and global institutions.",
        lessons: [
          { title: "UN, AU and global institutions", duration: "20 min" },
          { title: "Globalisation today", duration: "18 min" },
        ],
      },
    ],
    instructor: mulu,
  },
  {
    slug: "g12-social-economics",
    track: "g12-social",
    title: "Grade 12 Economics",
    subject: "Economics",
    lessons: 28,
    students: "3.1k",
    level: "Advanced",
    color: C.emerald,
    tagline: "Macroeconomics with a focus on Ethiopia.",
    description:
      "Covers the MoE Grade 12 economics textbook: national income accounting, money and banking, fiscal & monetary policy, international trade and the Ethiopian economy.",
    duration: "10 weeks",
    language: "English",
    rating: 4.9,
    reviews: 401,
    price: "ETB 300 · one-time",
    outcomes: [
      "Compute GDP and national income",
      "Explain monetary and fiscal policy",
      "Analyse Ethiopia's balance of trade",
      "Describe the role of the National Bank of Ethiopia",
    ],
    modules: [
      {
        title: "National Income",
        summary: "GDP, GNP and national accounts.",
        lessons: [
          { title: "Calculating GDP", duration: "20 min", preview: true },
          { title: "Real vs nominal GDP", duration: "18 min" },
        ],
      },
      {
        title: "Money & Banking",
        summary: "Functions of money and central banking.",
        lessons: [
          { title: "How banks create money", duration: "20 min" },
          { title: "National Bank of Ethiopia", duration: "18 min" },
        ],
      },
      {
        title: "International Trade",
        summary: "Exchange rates, exports and imports.",
        lessons: [
          { title: "Comparative advantage", duration: "20 min" },
          { title: "Ethiopia's trade balance", duration: "18 min" },
        ],
      },
    ],
    instructor: fikru,
  },
  {
    slug: "g12-social-civics",
    track: "g12-social",
    title: "Grade 12 Civics",
    subject: "Civics",
    lessons: 18,
    students: "2.9k",
    level: "Intermediate",
    color: C.gold,
    tagline: "Active citizenship, ethics and global issues.",
    description:
      "Covers the MoE Grade 12 civics syllabus: active citizenship, professional ethics, peace and conflict resolution, and global citizenship.",
    duration: "8 weeks",
    language: "English · Amharic explanations",
    rating: 4.7,
    reviews: 246,
    price: "ETB 300 · one-time",
    outcomes: [
      "Practice active citizenship",
      "Apply professional ethics",
      "Mediate basic conflicts",
      "Discuss global citizenship",
    ],
    modules: [
      {
        title: "Active Citizenship",
        summary: "Volunteering, voting and civic engagement.",
        lessons: [
          { title: "Civic engagement", duration: "16 min", preview: true },
          { title: "Voter education", duration: "14 min" },
        ],
      },
      {
        title: "Professional Ethics",
        summary: "Workplace ethics and integrity.",
        lessons: [
          { title: "Codes of conduct", duration: "16 min" },
          { title: "Whistleblowing", duration: "14 min" },
        ],
      },
      {
        title: "Peace & Global Citizenship",
        summary: "Conflict resolution and global issues.",
        lessons: [
          { title: "Mediation basics", duration: "16 min" },
          { title: "Global citizenship", duration: "14 min" },
        ],
      },
    ],
    instructor: fikru,
  },

  // ============================== EUEE PREP (NEAEA) ==============================
  {
    slug: "euee-mathematics-natural",
    track: "euee",
    title: "EUEE Mathematics — Natural Stream",
    subject: "Math · Exam",
    lessons: 80,
    students: "6.5k",
    level: "Exam Prep",
    color: C.emerald,
    tagline: "Every NEAEA mathematics topic for the natural-science stream.",
    description:
      "Comprehensive EUEE math prep aligned to the NEAEA blueprint for the natural-science stream — algebra, calculus, vectors, statistics — with 12 timed mock papers from the last 10 years of past exams.",
    duration: "16 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 1240,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA math (natural) syllabus",
      "Solve 1,000+ exam-style problems",
      "Sit 12 full-length timed mock papers",
      "Learn every speed shortcut and trap",
    ],
    modules: [
      {
        title: "Algebra & Functions",
        summary: "Polynomials, exponentials and logs.",
        lessons: [
          { title: "Polynomial mastery", duration: "26 min", preview: true },
          { title: "Exponential & log equations", duration: "28 min" },
        ],
      },
      {
        title: "Calculus",
        summary: "Limits, derivatives and integrals tested by NEAEA.",
        lessons: [
          { title: "Derivatives toolkit", duration: "24 min" },
          { title: "Integration techniques", duration: "26 min" },
        ],
      },
      {
        title: "Vectors & Geometry",
        summary: "2D/3D vectors, planes and conics.",
        lessons: [
          { title: "Vectors in 3D", duration: "22 min" },
          { title: "Conic sections", duration: "20 min" },
        ],
      },
      {
        title: "Mock Papers & Strategy",
        summary: "12 timed past-paper-style mocks with walkthroughs.",
        lessons: [
          { title: "Mock 1 — diagnostic", duration: "180 min" },
          { title: "Time management masterclass", duration: "20 min" },
        ],
      },
    ],
    instructor: solomon,
  },
  {
    slug: "euee-mathematics-social",
    track: "euee",
    title: "EUEE Mathematics — Social Stream",
    subject: "Math · Exam",
    lessons: 60,
    students: "3.8k",
    level: "Exam Prep",
    color: C.emerald,
    tagline: "Math prep tailored to the social-science NEAEA paper.",
    description:
      "EUEE math prep for the social-science stream — functions, statistics, matrices, linear programming and finance math — with 8 timed mock papers.",
    duration: "12 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 642,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA math (social) syllabus",
      "Master statistics and probability",
      "Solve linear programming questions fast",
      "Sit 8 full-length timed mock papers",
    ],
    modules: [
      {
        title: "Functions & Sequences",
        summary: "Linear, quadratic and exponential models.",
        lessons: [
          { title: "Function families", duration: "22 min", preview: true },
          { title: "Geometric series", duration: "20 min" },
        ],
      },
      {
        title: "Statistics & Probability",
        summary: "Descriptive stats and probability rules.",
        lessons: [
          { title: "Mean, median, variance", duration: "20 min" },
          { title: "Conditional probability", duration: "22 min" },
        ],
      },
      {
        title: "Linear Programming & Matrices",
        summary: "Optimisation and matrix methods.",
        lessons: [
          { title: "Graphical LP", duration: "22 min" },
          { title: "Matrix inverses", duration: "20 min" },
        ],
      },
      {
        title: "Mock Papers",
        summary: "8 full-length mocks with walkthroughs.",
        lessons: [
          { title: "Mock 1 — diagnostic", duration: "150 min" },
          { title: "Trap patterns", duration: "20 min" },
        ],
      },
    ],
    instructor: solomon,
  },
  {
    slug: "euee-physics",
    track: "euee",
    title: "EUEE Physics — Full Review",
    subject: "Physics · Exam",
    lessons: 70,
    students: "4.9k",
    level: "Exam Prep",
    color: C.gold,
    tagline: "Mechanics to modern physics — every NEAEA physics topic.",
    description:
      "Complete EUEE physics review aligned to the NEAEA blueprint: mechanics, thermodynamics, waves, electromagnetism, optics and modern physics, with 10 timed mocks.",
    duration: "14 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 821,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA physics syllabus",
      "Solve 800+ exam-style problems",
      "Sit 10 timed mock papers",
      "Master vector & circuit shortcuts",
    ],
    modules: [
      {
        title: "Mechanics",
        summary: "Kinematics, dynamics, energy and rotation.",
        lessons: [
          { title: "Newton's laws review", duration: "22 min", preview: true },
          { title: "Rotational dynamics", duration: "24 min" },
        ],
      },
      {
        title: "Electromagnetism",
        summary: "Electrostatics, circuits and induction.",
        lessons: [
          { title: "Kirchhoff's laws", duration: "24 min" },
          { title: "Electromagnetic induction", duration: "22 min" },
        ],
      },
      {
        title: "Waves & Optics",
        summary: "Sound, light, lenses and interference.",
        lessons: [
          { title: "Lens & mirror equations", duration: "22 min" },
          { title: "Interference & diffraction", duration: "20 min" },
        ],
      },
      {
        title: "Modern Physics & Mocks",
        summary: "Photoelectric effect, nuclear and timed mocks.",
        lessons: [
          { title: "Photoelectric effect", duration: "20 min" },
          { title: "Mock 1 — diagnostic", duration: "150 min" },
        ],
      },
    ],
    instructor: yonas,
  },
  {
    slug: "euee-chemistry",
    track: "euee",
    title: "EUEE Chemistry — Full Review",
    subject: "Chemistry · Exam",
    lessons: 68,
    students: "4.5k",
    level: "Exam Prep",
    color: C.terracotta,
    tagline: "Every NEAEA chemistry topic, taught for speed and accuracy.",
    description:
      "Complete EUEE chemistry review: atomic structure, stoichiometry, equilibrium, thermodynamics, electrochemistry and organic chemistry, with 10 mocks.",
    duration: "14 weeks",
    language: "English",
    rating: 4.9,
    reviews: 738,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA chemistry syllabus",
      "Master stoichiometry and equilibrium",
      "Predict organic reactions confidently",
      "Sit 10 timed mock papers",
    ],
    modules: [
      {
        title: "Physical Chemistry",
        summary: "Stoichiometry, gases, kinetics and equilibrium.",
        lessons: [
          { title: "Stoichiometry shortcuts", duration: "22 min", preview: true },
          { title: "Equilibrium fast", duration: "24 min" },
        ],
      },
      {
        title: "Thermodynamics & Electrochemistry",
        summary: "Enthalpy, free energy and cell potentials.",
        lessons: [
          { title: "Hess's law", duration: "20 min" },
          { title: "Cell potentials", duration: "22 min" },
        ],
      },
      {
        title: "Organic Chemistry",
        summary: "Hydrocarbons through carboxylic acids.",
        lessons: [
          { title: "IUPAC mastery", duration: "22 min" },
          { title: "Reaction roadmap", duration: "26 min" },
        ],
      },
      {
        title: "Mock Papers",
        summary: "10 timed papers with walkthroughs.",
        lessons: [
          { title: "Mock 1 — diagnostic", duration: "150 min" },
          { title: "Common trap topics", duration: "20 min" },
        ],
      },
    ],
    instructor: hanna,
  },
  {
    slug: "euee-biology",
    track: "euee",
    title: "EUEE Biology — Full Review",
    subject: "Biology · Exam",
    lessons: 72,
    students: "4.8k",
    level: "Exam Prep",
    color: C.emerald,
    tagline: "Cells to ecosystems — organised the way NEAEA tests.",
    description:
      "Complete EUEE biology review: cell biology, biochemistry, genetics, human physiology, immunity, ecology and biotechnology — with 8 timed mocks.",
    duration: "14 weeks",
    language: "English · Amharic explanations",
    rating: 4.9,
    reviews: 723,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA biology syllabus",
      "Memorise diagrams with mnemonics",
      "Master genetics & physiology",
      "Sit 8 timed mock exams",
    ],
    modules: [
      {
        title: "Cell Biology & Biochemistry",
        summary: "Organelles, biomolecules and enzymes.",
        lessons: [
          { title: "Organelles deep dive", duration: "24 min", preview: true },
          { title: "Enzymes & metabolism", duration: "22 min" },
        ],
      },
      {
        title: "Genetics & Evolution",
        summary: "Mendelian to molecular genetics.",
        lessons: [
          { title: "Punnett & pedigree", duration: "22 min" },
          { title: "DNA → protein", duration: "26 min" },
        ],
      },
      {
        title: "Human Physiology & Immunity",
        summary: "All body systems, plus the immune response.",
        lessons: [
          { title: "Circulatory & respiratory", duration: "22 min" },
          { title: "Immune response", duration: "20 min" },
        ],
      },
      {
        title: "Ecology & Mocks",
        summary: "Ecosystems and 8 timed mock exams.",
        lessons: [
          { title: "Biogeochemical cycles", duration: "20 min" },
          { title: "Mock 1 — diagnostic", duration: "150 min" },
        ],
      },
    ],
    instructor: meron,
  },
  {
    slug: "euee-english",
    track: "euee",
    title: "EUEE English — Full Review",
    subject: "English · Exam",
    lessons: 60,
    students: "5.1k",
    level: "Exam Prep",
    color: C.gold,
    tagline: "Reading, grammar, and vocabulary — pace yourself like a champion.",
    description:
      "Strategic EUEE English prep: reading comprehension, vocabulary in context, grammar precision and exam pacing, with 10 timed mocks.",
    duration: "12 weeks",
    language: "English",
    rating: 4.8,
    reviews: 856,
    price: "ETB 300 · one-time",
    outcomes: [
      "Read passages 2x faster with full comprehension",
      "Master 1,500 high-frequency NEAEA vocabulary words",
      "Eliminate every common grammar trap",
      "Sit 10 timed mock papers",
    ],
    modules: [
      {
        title: "Reading Comprehension",
        summary: "Active reading for dense academic passages.",
        lessons: [
          { title: "Skim, scan, structure", duration: "18 min", preview: true },
          { title: "Inference questions decoded", duration: "22 min" },
        ],
      },
      {
        title: "Vocabulary in Context",
        summary: "1,500 words taught the way NEAEA asks them.",
        lessons: [
          { title: "Roots, prefixes, suffixes", duration: "24 min" },
          { title: "Tone & connotation", duration: "20 min" },
        ],
      },
      {
        title: "Grammar & Sentence Structure",
        summary: "Every grammar pattern NEAEA tests.",
        lessons: [
          { title: "Subject–verb agreement traps", duration: "18 min" },
          { title: "Modifiers & parallelism", duration: "22 min" },
        ],
      },
    ],
    instructor: tigist,
  },
  {
    slug: "euee-geography",
    track: "euee",
    title: "EUEE Geography — Full Review",
    subject: "Geography · Exam",
    lessons: 50,
    students: "2.9k",
    level: "Exam Prep",
    color: C.gold,
    tagline: "Map skills, Ethiopia and the world — for the social-science paper.",
    description:
      "Complete EUEE geography review for the social-science stream: physical, human and economic geography of Ethiopia, Africa and the world, with 8 timed mocks.",
    duration: "12 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 412,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA geography syllabus",
      "Read maps and stats fast",
      "Memorise Ethiopia's regions cold",
      "Sit 8 timed mock papers",
    ],
    modules: [
      {
        title: "Physical Geography",
        summary: "Earth systems, climate and landforms.",
        lessons: [
          { title: "Climate systems", duration: "22 min", preview: true },
          { title: "Ethiopia's relief", duration: "20 min" },
        ],
      },
      {
        title: "Human Geography",
        summary: "Population, urbanisation and migration.",
        lessons: [
          { title: "Population pyramids", duration: "18 min" },
          { title: "Urbanisation in Ethiopia", duration: "20 min" },
        ],
      },
      {
        title: "Economic Geography & Mocks",
        summary: "Resources, trade and timed mocks.",
        lessons: [
          { title: "Hydropower & GERD", duration: "22 min" },
          { title: "Mock 1 — diagnostic", duration: "120 min" },
        ],
      },
    ],
    instructor: abebe,
  },
  {
    slug: "euee-history",
    track: "euee",
    title: "EUEE History — Full Review",
    subject: "History · Exam",
    lessons: 50,
    students: "2.7k",
    level: "Exam Prep",
    color: C.terracotta,
    tagline: "Aksum to today — every NEAEA history topic.",
    description:
      "Complete EUEE history review: ancient and medieval Ethiopia, modern Ethiopia, Africa and world history, with 8 timed mocks aligned to NEAEA's blueprint.",
    duration: "12 weeks",
    language: "English · Amharic explanations",
    rating: 4.8,
    reviews: 389,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA history syllabus",
      "Memorise dates & dynasties with mnemonics",
      "Compare Ethiopian to world events",
      "Sit 8 timed mock papers",
    ],
    modules: [
      {
        title: "Ancient & Medieval Ethiopia",
        summary: "Aksum, Zagwe and Solomonic eras.",
        lessons: [
          { title: "Rise of Aksum", duration: "22 min", preview: true },
          { title: "Lalibela & Zagwe", duration: "20 min" },
        ],
      },
      {
        title: "Modern Ethiopia",
        summary: "Tewodros to the present.",
        lessons: [
          { title: "Battle of Adwa", duration: "22 min" },
          { title: "Derg & EPRDF eras", duration: "24 min" },
        ],
      },
      {
        title: "Africa & World — Mocks",
        summary: "Decolonisation, Cold War and timed mocks.",
        lessons: [
          { title: "African independence", duration: "20 min" },
          { title: "Mock 1 — diagnostic", duration: "120 min" },
        ],
      },
    ],
    instructor: mulu,
  },
  {
    slug: "euee-economics",
    track: "euee",
    title: "EUEE Economics — Full Review",
    subject: "Economics · Exam",
    lessons: 48,
    students: "3.2k",
    level: "Exam Prep",
    color: C.emerald,
    tagline: "Micro & macroeconomics with Ethiopian context.",
    description:
      "Complete EUEE economics review: microeconomics, macroeconomics, money & banking, international trade and the Ethiopian economy, with 8 timed mocks.",
    duration: "12 weeks",
    language: "English",
    rating: 4.9,
    reviews: 458,
    price: "ETB 300 · one-time",
    outcomes: [
      "Cover 100% of NEAEA economics syllabus",
      "Master demand–supply graphs",
      "Calculate GDP, inflation and elasticity",
      "Sit 8 timed mock papers",
    ],
    modules: [
      {
        title: "Microeconomics",
        summary: "Demand, supply, elasticity and market structures.",
        lessons: [
          { title: "Demand–supply equilibrium", duration: "20 min", preview: true },
          { title: "Market structures", duration: "22 min" },
        ],
      },
      {
        title: "Macroeconomics",
        summary: "GDP, inflation, unemployment and policy.",
        lessons: [
          { title: "Calculating GDP", duration: "22 min" },
          { title: "Monetary & fiscal policy", duration: "24 min" },
        ],
      },
      {
        title: "Trade & Mocks",
        summary: "International trade and 8 timed mocks.",
        lessons: [
          { title: "Comparative advantage", duration: "20 min" },
          { title: "Mock 1 — diagnostic", duration: "120 min" },
        ],
      },
    ],
    instructor: fikru,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
