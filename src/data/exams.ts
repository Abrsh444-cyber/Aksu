// Static MCQ practice banks — one quiz per subject across grades.
// Designed to mirror the Ethiopian MoE textbook content + NEAEA EUEE style.
// Pure client-side; no backend required.

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exam {
  slug: string;
  title: string;
  subject: string;
  level: string; // e.g. "Grade 9–10", "EUEE", "All grades"
  description: string;
  durationMin: number;
  color: string;
  questions: MCQ[];
}

const C = {
  emerald: "oklch(0.45 0.13 165)",
  gold: "oklch(0.72 0.15 75)",
  terracotta: "oklch(0.58 0.16 35)",
  coffee: "oklch(0.32 0.04 45)",
  indigo: "oklch(0.42 0.12 265)",
  rose: "oklch(0.55 0.16 15)",
};

export const exams: Exam[] = [
  // -------------------- MATHEMATICS --------------------
  {
    slug: "mathematics",
    title: "Mathematics Practice Test",
    subject: "Mathematics",
    level: "Grade 9 – EUEE",
    description:
      "Mixed practice covering algebra, geometry, trigonometry, sequences and probability from the MoE syllabus.",
    durationMin: 15,
    color: C.emerald,
    questions: [
      {
        id: "m1",
        question: "If 2x + 5 = 17, what is the value of x?",
        options: ["4", "6", "8", "11"],
        correctIndex: 1,
        explanation: "2x = 17 − 5 = 12, so x = 6.",
      },
      {
        id: "m2",
        question: "The value of sin 30° + cos 60° is:",
        options: ["0", "1/2", "1", "√3/2"],
        correctIndex: 2,
        explanation: "sin 30° = 1/2 and cos 60° = 1/2, so the sum equals 1.",
      },
      {
        id: "m3",
        question: "Which of the following is an irrational number?",
        options: ["3/4", "√9", "√2", "0.25"],
        correctIndex: 2,
        explanation: "√2 cannot be expressed as a ratio of two integers, so it is irrational.",
      },
      {
        id: "m4",
        question: "The slope of the line passing through (1, 2) and (3, 8) is:",
        options: ["2", "3", "4", "6"],
        correctIndex: 1,
        explanation: "Slope = (8 − 2) / (3 − 1) = 6 / 2 = 3.",
      },
      {
        id: "m5",
        question: "What is the 10th term of the arithmetic sequence 3, 7, 11, 15, …?",
        options: ["35", "39", "40", "43"],
        correctIndex: 1,
        explanation: "a₁ = 3, d = 4. a₁₀ = 3 + (10 − 1)·4 = 3 + 36 = 39.",
      },
      {
        id: "m6",
        question: "If log₁₀ 1000 = x, then x =",
        options: ["2", "3", "4", "10"],
        correctIndex: 1,
        explanation: "10³ = 1000, so log₁₀ 1000 = 3.",
      },
      {
        id: "m7",
        question: "The probability of getting an even number when rolling a fair die is:",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correctIndex: 2,
        explanation: "There are 3 even outcomes (2, 4, 6) out of 6, so probability = 3/6 = 1/2.",
      },
      {
        id: "m8",
        question: "Solve: x² − 5x + 6 = 0",
        options: ["x = 1, 6", "x = 2, 3", "x = −2, −3", "x = 0, 5"],
        correctIndex: 1,
        explanation: "Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3.",
      },
    ],
  },

  // -------------------- PHYSICS --------------------
  {
    slug: "physics",
    title: "Physics Practice Test",
    subject: "Physics",
    level: "Grade 9 – EUEE",
    description:
      "Mechanics, electricity, waves and modern physics — sampled from the MoE textbook units.",
    durationMin: 15,
    color: C.gold,
    questions: [
      {
        id: "p1",
        question: "The SI unit of force is the:",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctIndex: 1,
        explanation: "Force is measured in Newtons (N), defined as kg·m/s².",
      },
      {
        id: "p2",
        question: "A car moving at 20 m/s decelerates uniformly to rest in 4 s. Its deceleration is:",
        options: ["4 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
        correctIndex: 1,
        explanation: "a = (v − u) / t = (0 − 20) / 4 = −5 m/s², so deceleration = 5 m/s².",
      },
      {
        id: "p3",
        question: "Which quantity is a vector?",
        options: ["Mass", "Time", "Temperature", "Velocity"],
        correctIndex: 3,
        explanation: "Velocity has both magnitude and direction; the others are scalars.",
      },
      {
        id: "p4",
        question: "Ohm's law is expressed as:",
        options: ["V = IR", "P = VI", "F = ma", "E = mc²"],
        correctIndex: 0,
        explanation: "Voltage equals current times resistance: V = IR.",
      },
      {
        id: "p5",
        question: "The frequency of a wave is 50 Hz and its wavelength is 6 m. Its speed is:",
        options: ["56 m/s", "300 m/s", "44 m/s", "12 m/s"],
        correctIndex: 1,
        explanation: "v = f·λ = 50 × 6 = 300 m/s.",
      },
      {
        id: "p6",
        question: "Work done is zero when:",
        options: [
          "Force and displacement are parallel",
          "Force is perpendicular to displacement",
          "Force is twice the displacement",
          "There is no friction",
        ],
        correctIndex: 1,
        explanation: "W = F·d·cosθ. When θ = 90°, cos θ = 0, so W = 0.",
      },
      {
        id: "p7",
        question: "Light travels fastest in:",
        options: ["Glass", "Water", "Vacuum", "Diamond"],
        correctIndex: 2,
        explanation: "The speed of light is maximum in vacuum (≈ 3 × 10⁸ m/s).",
      },
      {
        id: "p8",
        question: "The unit of electric power is the:",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctIndex: 3,
        explanation: "Electric power is measured in watts (W), where 1 W = 1 J/s.",
      },
    ],
  },

  // -------------------- CHEMISTRY --------------------
  {
    slug: "chemistry",
    title: "Chemistry Practice Test",
    subject: "Chemistry",
    level: "Grade 9 – EUEE",
    description:
      "Atomic structure, periodic table, bonding, stoichiometry and acids/bases from the MoE syllabus.",
    durationMin: 15,
    color: C.terracotta,
    questions: [
      {
        id: "c1",
        question: "The atomic number of an element is the number of:",
        options: ["Neutrons", "Protons", "Electrons + neutrons", "Nucleons"],
        correctIndex: 1,
        explanation: "Atomic number = number of protons in the nucleus.",
      },
      {
        id: "c2",
        question: "Which of the following is a noble gas?",
        options: ["Oxygen", "Nitrogen", "Argon", "Chlorine"],
        correctIndex: 2,
        explanation: "Argon is in Group 18 — the noble gases.",
      },
      {
        id: "c3",
        question: "The pH of a neutral solution at 25 °C is:",
        options: ["0", "7", "10", "14"],
        correctIndex: 1,
        explanation: "Pure water at 25 °C has pH = 7, which is neutral.",
      },
      {
        id: "c4",
        question: "How many moles of H₂O are in 36 g of water? (M = 18 g/mol)",
        options: ["1", "2", "3", "18"],
        correctIndex: 1,
        explanation: "n = m / M = 36 / 18 = 2 mol.",
      },
      {
        id: "c5",
        question: "The bond between Na and Cl in NaCl is:",
        options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
        correctIndex: 1,
        explanation: "Sodium transfers an electron to chlorine, forming an ionic bond.",
      },
      {
        id: "c6",
        question: "Which gas is produced when an acid reacts with a metal like zinc?",
        options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Chlorine"],
        correctIndex: 1,
        explanation: "Zn + 2HCl → ZnCl₂ + H₂↑. Hydrogen gas is released.",
      },
      {
        id: "c7",
        question: "The chemical formula of ammonia is:",
        options: ["NH₂", "NH₃", "N₂H₄", "NH₄"],
        correctIndex: 1,
        explanation: "Ammonia is NH₃.",
      },
      {
        id: "c8",
        question: "Oxidation is best defined as:",
        options: [
          "Gain of electrons",
          "Loss of electrons",
          "Gain of protons",
          "Loss of mass",
        ],
        correctIndex: 1,
        explanation: "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain.",
      },
    ],
  },

  // -------------------- BIOLOGY --------------------
  {
    slug: "biology",
    title: "Biology Practice Test",
    subject: "Biology",
    level: "Grade 9 – EUEE",
    description:
      "Cells, genetics, human physiology, ecology and evolution — aligned to the MoE biology textbooks.",
    durationMin: 15,
    color: C.emerald,
    questions: [
      {
        id: "b1",
        question: "The basic structural unit of all living organisms is the:",
        options: ["Tissue", "Cell", "Organ", "Molecule"],
        correctIndex: 1,
        explanation: "All living organisms are composed of one or more cells.",
      },
      {
        id: "b2",
        question: "Photosynthesis takes place mainly in the:",
        options: ["Mitochondria", "Nucleus", "Chloroplasts", "Ribosomes"],
        correctIndex: 2,
        explanation: "Chloroplasts contain chlorophyll and carry out photosynthesis.",
      },
      {
        id: "b3",
        question: "Human red blood cells transport oxygen using:",
        options: ["Plasma", "Platelets", "Hemoglobin", "White cells"],
        correctIndex: 2,
        explanation: "Hemoglobin in red blood cells binds and transports oxygen.",
      },
      {
        id: "b4",
        question: "The number of chromosomes in a normal human somatic cell is:",
        options: ["23", "44", "46", "48"],
        correctIndex: 2,
        explanation: "Humans have 23 pairs of chromosomes, totalling 46.",
      },
      {
        id: "b5",
        question: "The process by which plants lose water through leaves is called:",
        options: ["Respiration", "Transpiration", "Photosynthesis", "Translocation"],
        correctIndex: 1,
        explanation: "Transpiration is the loss of water vapour from leaves, mainly through stomata.",
      },
      {
        id: "b6",
        question: "An organism that makes its own food is called a:",
        options: ["Heterotroph", "Autotroph", "Decomposer", "Parasite"],
        correctIndex: 1,
        explanation: "Autotrophs (e.g. plants) produce their own food via photosynthesis.",
      },
      {
        id: "b7",
        question: "The genetic material in most organisms is:",
        options: ["DNA", "RNA", "Protein", "Lipid"],
        correctIndex: 0,
        explanation: "DNA stores hereditary information in nearly all living organisms.",
      },
      {
        id: "b8",
        question: "Which blood vessel carries oxygen-rich blood from the heart to the body?",
        options: ["Vena cava", "Pulmonary artery", "Aorta", "Pulmonary vein"],
        correctIndex: 2,
        explanation: "The aorta carries oxygenated blood from the left ventricle to the body.",
      },
    ],
  },

  // -------------------- ENGLISH --------------------
  {
    slug: "english",
    title: "English Practice Test",
    subject: "English",
    level: "Grade 9 – EUEE",
    description:
      "Grammar, vocabulary and reading comprehension in the EUEE multiple-choice style.",
    durationMin: 15,
    color: C.indigo,
    questions: [
      {
        id: "e1",
        question: "Choose the correct form: She ____ to Addis Ababa every weekend.",
        options: ["go", "goes", "going", "gone"],
        correctIndex: 1,
        explanation: "Third-person singular present takes 's': she goes.",
      },
      {
        id: "e2",
        question: "Choose the correct synonym of 'rapid':",
        options: ["Slow", "Quick", "Heavy", "Empty"],
        correctIndex: 1,
        explanation: "'Rapid' and 'quick' both mean fast.",
      },
      {
        id: "e3",
        question: "The opposite of 'generous' is:",
        options: ["Kind", "Selfish", "Friendly", "Honest"],
        correctIndex: 1,
        explanation: "A generous person gives freely; a selfish person does not.",
      },
      {
        id: "e4",
        question: "Identify the noun: The students study hard every evening.",
        options: ["study", "hard", "evening", "students"],
        correctIndex: 3,
        explanation: "'Students' is a noun (plural of student).",
      },
      {
        id: "e5",
        question: "Choose the correctly punctuated sentence:",
        options: [
          "Where are you going.",
          "Where are you going!",
          "Where are you going?",
          "Where, are you going?",
        ],
        correctIndex: 2,
        explanation: "Direct questions end with a question mark.",
      },
      {
        id: "e6",
        question: "If it ____ tomorrow, we will stay at home.",
        options: ["rains", "rained", "will rain", "raining"],
        correctIndex: 0,
        explanation: "First conditional uses present simple in the 'if' clause.",
      },
      {
        id: "e7",
        question: "Choose the passive voice of: 'The chef cooked the meal.'",
        options: [
          "The meal cooks the chef.",
          "The meal was cooked by the chef.",
          "The meal is cooking the chef.",
          "The meal has cook by the chef.",
        ],
        correctIndex: 1,
        explanation: "Passive: object + be + past participle + by + agent.",
      },
      {
        id: "e8",
        question: "Choose the word with the correct spelling:",
        options: ["Recieve", "Receive", "Receeve", "Receeve"],
        correctIndex: 1,
        explanation: "'I before E except after C': receive.",
      },
    ],
  },

  // -------------------- GEOGRAPHY --------------------
  {
    slug: "geography",
    title: "Geography Practice Test",
    subject: "Geography",
    level: "Grade 9 – EUEE",
    description:
      "Physical and human geography of Ethiopia and the world from the MoE textbooks.",
    durationMin: 15,
    color: C.gold,
    questions: [
      {
        id: "g1",
        question: "The capital city of Ethiopia is:",
        options: ["Mekelle", "Bahir Dar", "Addis Ababa", "Hawassa"],
        correctIndex: 2,
        explanation: "Addis Ababa is the capital and largest city of Ethiopia.",
      },
      {
        id: "g2",
        question: "The longest river in Africa is the:",
        options: ["Congo", "Niger", "Zambezi", "Nile"],
        correctIndex: 3,
        explanation: "The Nile is the longest river in Africa, around 6,650 km long.",
      },
      {
        id: "g3",
        question: "Which Ethiopian region contains the Danakil Depression?",
        options: ["Tigray", "Afar", "Amhara", "Oromia"],
        correctIndex: 1,
        explanation: "The Danakil Depression is located in the Afar region.",
      },
      {
        id: "g4",
        question: "Lines of latitude run:",
        options: ["North–South", "East–West", "Diagonally", "Around the poles only"],
        correctIndex: 1,
        explanation: "Latitude lines run east–west and measure distance north or south of the equator.",
      },
      {
        id: "g5",
        question: "The largest lake in Ethiopia is:",
        options: ["Lake Tana", "Lake Abaya", "Lake Ziway", "Lake Hawassa"],
        correctIndex: 0,
        explanation: "Lake Tana, source of the Blue Nile, is Ethiopia's largest lake.",
      },
      {
        id: "g6",
        question: "Which climate zone covers most of the Ethiopian highlands?",
        options: ["Bereha", "Kolla", "Woina Dega", "Dega"],
        correctIndex: 2,
        explanation: "Woina Dega (1,500–2,400 m) covers most of the inhabited highlands.",
      },
      {
        id: "g7",
        question: "Which mineral is Ethiopia's most exported metal?",
        options: ["Gold", "Iron", "Copper", "Aluminium"],
        correctIndex: 0,
        explanation: "Gold is Ethiopia's most exported metal mineral.",
      },
      {
        id: "g8",
        question: "The Great Rift Valley passes through Ethiopia from:",
        options: ["East to West", "Northeast to Southwest", "North to South", "West to East"],
        correctIndex: 1,
        explanation: "The Ethiopian Rift Valley runs from northeast (Afar) to southwest (Kenya border).",
      },
    ],
  },

  // -------------------- HISTORY --------------------
  {
    slug: "history",
    title: "History Practice Test",
    subject: "History",
    level: "Grade 9 – EUEE",
    description:
      "Ethiopian and world history milestones from the MoE Grade 9–12 history textbooks.",
    durationMin: 15,
    color: C.terracotta,
    questions: [
      {
        id: "h1",
        question: "The Battle of Adwa was fought in:",
        options: ["1886", "1896", "1906", "1936"],
        correctIndex: 1,
        explanation: "Ethiopia defeated Italy at the Battle of Adwa on 1 March 1896.",
      },
      {
        id: "h2",
        question: "The Aksumite Kingdom adopted Christianity during the reign of:",
        options: ["Ezana", "Kaleb", "Lalibela", "Tewodros"],
        correctIndex: 0,
        explanation: "King Ezana of Aksum converted to Christianity in the 4th century AD.",
      },
      {
        id: "h3",
        question: "Emperor Menelik II established Addis Ababa as the capital in:",
        options: ["1855", "1872", "1886", "1896"],
        correctIndex: 2,
        explanation: "Addis Ababa was founded as the imperial capital in 1886.",
      },
      {
        id: "h4",
        question: "The Derg regime came to power in Ethiopia in:",
        options: ["1960", "1974", "1977", "1991"],
        correctIndex: 1,
        explanation: "The Derg overthrew Emperor Haile Selassie in 1974.",
      },
      {
        id: "h5",
        question: "The rock-hewn churches of Lalibela were built during which dynasty?",
        options: ["Aksumite", "Zagwe", "Solomonic", "Gondarine"],
        correctIndex: 1,
        explanation: "The Lalibela churches were built under the Zagwe dynasty (12th–13th century).",
      },
      {
        id: "h6",
        question: "The Italian occupation of Ethiopia lasted approximately:",
        options: ["2 years", "5 years", "10 years", "20 years"],
        correctIndex: 1,
        explanation: "Italy occupied Ethiopia from 1936 to 1941 — about 5 years.",
      },
      {
        id: "h7",
        question: "World War I began in:",
        options: ["1905", "1914", "1918", "1939"],
        correctIndex: 1,
        explanation: "World War I began in 1914 and ended in 1918.",
      },
      {
        id: "h8",
        question: "The Federal Democratic Republic of Ethiopia was officially established in:",
        options: ["1991", "1993", "1995", "2000"],
        correctIndex: 2,
        explanation: "The FDRE constitution was ratified in 1995.",
      },
    ],
  },

  // -------------------- ECONOMICS --------------------
  {
    slug: "economics",
    title: "Economics Practice Test",
    subject: "Economics",
    level: "Grade 11 – EUEE",
    description:
      "Microeconomics, macroeconomics and the Ethiopian economy from the MoE textbooks.",
    durationMin: 15,
    color: C.indigo,
    questions: [
      {
        id: "ec1",
        question: "Economics is best defined as the study of:",
        options: [
          "Government policies",
          "How people allocate scarce resources",
          "Money and banking only",
          "International trade",
        ],
        correctIndex: 1,
        explanation: "Economics studies how individuals and societies allocate scarce resources.",
      },
      {
        id: "ec2",
        question: "If demand increases while supply remains constant, equilibrium price will:",
        options: ["Decrease", "Stay the same", "Increase", "Become zero"],
        correctIndex: 2,
        explanation: "Higher demand with unchanged supply pushes price up.",
      },
      {
        id: "ec3",
        question: "GDP stands for:",
        options: [
          "General Domestic Product",
          "Gross Domestic Product",
          "Gross Direct Profit",
          "General Direct Production",
        ],
        correctIndex: 1,
        explanation: "GDP = Gross Domestic Product, total value of goods and services produced.",
      },
      {
        id: "ec4",
        question: "Inflation refers to:",
        options: [
          "A general fall in prices",
          "A general rise in prices",
          "Unemployment only",
          "Currency revaluation",
        ],
        correctIndex: 1,
        explanation: "Inflation is a sustained increase in the general price level.",
      },
      {
        id: "ec5",
        question: "Ethiopia's economy is predominantly based on:",
        options: ["Manufacturing", "Mining", "Agriculture", "Tourism"],
        correctIndex: 2,
        explanation: "Agriculture employs the majority of Ethiopia's labour force.",
      },
      {
        id: "ec6",
        question: "Opportunity cost refers to:",
        options: [
          "The price of a good",
          "The next best alternative forgone",
          "Total cost of production",
          "Average tax rate",
        ],
        correctIndex: 1,
        explanation: "Opportunity cost is the value of the best alternative given up.",
      },
      {
        id: "ec7",
        question: "Which institution is the central bank of Ethiopia?",
        options: ["CBE", "Awash Bank", "NBE", "Dashen Bank"],
        correctIndex: 2,
        explanation: "The National Bank of Ethiopia (NBE) is the country's central bank.",
      },
      {
        id: "ec8",
        question: "A progressive tax system means:",
        options: [
          "Everyone pays the same amount",
          "Higher incomes pay a higher rate",
          "Higher incomes pay a lower rate",
          "Only businesses are taxed",
        ],
        correctIndex: 1,
        explanation: "In a progressive system, the tax rate increases as income increases.",
      },
    ],
  },

  // -------------------- CIVICS --------------------
  {
    slug: "civics",
    title: "Civics & Ethical Education Practice Test",
    subject: "Civics",
    level: "Grade 9 – Grade 12",
    description:
      "Citizenship, the FDRE constitution, democracy and ethical values from the MoE syllabus.",
    durationMin: 12,
    color: C.rose,
    questions: [
      {
        id: "cv1",
        question: "The FDRE Constitution was ratified in:",
        options: ["1991", "1993", "1995", "2000"],
        correctIndex: 2,
        explanation: "The Constitution of the Federal Democratic Republic of Ethiopia came into force in 1995.",
      },
      {
        id: "cv2",
        question: "Sovereignty in Ethiopia resides in:",
        options: [
          "The Prime Minister",
          "The Parliament only",
          "The Nations, Nationalities and Peoples",
          "The Military",
        ],
        correctIndex: 2,
        explanation:
          "Article 8 of the Constitution states sovereignty resides in the Nations, Nationalities and Peoples.",
      },
      {
        id: "cv3",
        question: "Which is NOT a fundamental democratic right?",
        options: [
          "Freedom of expression",
          "Freedom of religion",
          "Right to a private army",
          "Right to vote",
        ],
        correctIndex: 2,
        explanation: "Forming a private army is not a recognised democratic right.",
      },
      {
        id: "cv4",
        question: "The minimum voting age in Ethiopia is:",
        options: ["16", "18", "21", "25"],
        correctIndex: 1,
        explanation: "Ethiopian citizens 18 and over have the right to vote.",
      },
      {
        id: "cv5",
        question: "Which value is central to good citizenship?",
        options: ["Cheating", "Honesty", "Corruption", "Discrimination"],
        correctIndex: 1,
        explanation: "Honesty is a core ethical value taught throughout civics education.",
      },
      {
        id: "cv6",
        question: "The three branches of government in Ethiopia are:",
        options: [
          "Federal, Regional, Local",
          "Executive, Legislative, Judicial",
          "Civil, Military, Religious",
          "National, Regional, Zonal",
        ],
        correctIndex: 1,
        explanation: "Government power is separated into Executive, Legislative and Judicial branches.",
      },
    ],
  },

  // -------------------- AMHARIC --------------------
  {
    slug: "amharic",
    title: "Amharic Practice Test (አማርኛ)",
    subject: "Amharic",
    level: "Grade 9 – Grade 12",
    description: "ሙከራዎች ከ MoE አማርኛ መማሪያ መጻሕፍት — ሰዋሰው፣ ቃላት እና ጽሑፍ ግንዛቤ።",
    durationMin: 12,
    color: C.coffee,
    questions: [
      {
        id: "am1",
        question: "የ‹‹አባት›› ብዙ ቁጥር ቅጽል ምንድን ነው?",
        options: ["አባት", "አባቶች", "አባታት", "አባታችን"],
        correctIndex: 1,
        explanation: "የ‹‹አባት›› ብዙ ቁጥር ‹‹አባቶች›› ነው።",
      },
      {
        id: "am2",
        question: "‹‹ቆንጆ›› የሚለው ቃል ተቃራኒ ቃል የትኛው ነው?",
        options: ["ጥሩ", "መልከ መልካም", "አስቀያሚ", "ደስ የሚል"],
        correctIndex: 2,
        explanation: "‹‹ቆንጆ›› ማለት መልከ መልካም ነው፤ ተቃራኒው ‹‹አስቀያሚ›› ነው።",
      },
      {
        id: "am3",
        question: "‹‹እኔ ወደ ትምህርት ቤት እሄዳለሁ›› በዚህ አረፍተ ነገር ውስጥ ግሥ የትኛው ነው?",
        options: ["እኔ", "ወደ", "ትምህርት ቤት", "እሄዳለሁ"],
        correctIndex: 3,
        explanation: "‹‹እሄዳለሁ›› ግሥ ሲሆን የተነጋሪውን ድርጊት ያሳያል።",
      },
      {
        id: "am4",
        question: "የኢትዮጵያ ብሔራዊ ቋንቋ የቱ ነው?",
        options: ["ኦሮምኛ", "ትግርኛ", "አማርኛ", "ሶማልኛ"],
        correctIndex: 2,
        explanation: "አማርኛ የኢትዮጵያ ፌዴራል መንግሥት የሥራ ቋንቋ ነው።",
      },
      {
        id: "am5",
        question: "‹‹ትልቅ›› ለሚለው ቃል ተመሳሳይ ቃል የትኛው ነው?",
        options: ["ትንሽ", "ጠባብ", "ግዙፍ", "ብርቱ"],
        correctIndex: 2,
        explanation: "‹‹ትልቅ›› እና ‹‹ግዙፍ›› ተመሳሳይ ትርጉም አላቸው።",
      },
      {
        id: "am6",
        question: "‹‹ሰላም›› የሚለው ቃል የትኛውን ስሜት ይገልጻል?",
        options: ["ጦርነት", "ጭንቀት", "መረጋጋት", "ፍርሃት"],
        correctIndex: 2,
        explanation: "‹‹ሰላም›› ማለት መረጋጋት እና ጸጥታ ማለት ነው።",
      },
    ],
  },
];

export function getExamBySlug(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}

// Map a course slug -> exam slug for the "Take exam" button on course pages.
const courseToExam: Record<string, string> = {
  // Mathematics
  "g9-mathematics": "mathematics",
  "g10-mathematics": "mathematics",
  "g11-mathematics-natural": "mathematics",
  "g11-mathematics-social": "mathematics",
  "g12-mathematics-natural": "mathematics",
  "g12-mathematics-social": "mathematics",
  "euee-mathematics-natural": "mathematics",
  "euee-mathematics-social": "mathematics",
  // Physics
  "g9-physics": "physics",
  "g10-physics": "physics",
  "g11-physics": "physics",
  "g12-physics": "physics",
  "euee-physics": "physics",
  // Chemistry
  "g9-chemistry": "chemistry",
  "g10-chemistry": "chemistry",
  "g11-chemistry": "chemistry",
  "g12-chemistry": "chemistry",
  "euee-chemistry": "chemistry",
  // Biology
  "g9-biology": "biology",
  "g10-biology": "biology",
  "g11-biology": "biology",
  "g12-biology": "biology",
  "euee-biology": "biology",
  // English
  "g9-english": "english",
  "g10-english": "english",
  "g11-english": "english",
  "g12-english": "english",
  "euee-english": "english",
  // Geography
  "g9-geography": "geography",
  "g10-geography": "geography",
  "g11-geography": "geography",
  "g12-geography": "geography",
  "euee-geography": "geography",
  // History
  "g9-history": "history",
  "g10-history": "history",
  "g11-history": "history",
  "g12-history": "history",
  "euee-history": "history",
  // Economics
  "g11-economics": "economics",
  "g12-economics": "economics",
  "euee-economics": "economics",
  // Civics
  "g9-civics": "civics",
  "g10-civics": "civics",
  "g11-civics": "civics",
  "g12-civics": "civics",
  // Amharic
  "g9-amharic": "amharic",
  "g10-amharic": "amharic",
};

export function getExamForCourse(courseSlug: string): Exam | undefined {
  const slug = courseToExam[courseSlug];
  if (!slug) return undefined;
  return getExamBySlug(slug);
}
