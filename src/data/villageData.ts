/**
 * KANTHERU VILLAGE SERVICE HUB - EASY-TO-EDIT SAMPLE DATA FILE
 * -----------------------------------------------------------
 * Edit any street names, water schedules, medicines, schemes, or sample contacts here.
 * NOTE: All phone numbers, doctor names, registration numbers, and scheme names are marked SAMPLE.
 * NOTE: Do not add rupee amounts or calendar dates to schemes.
 */

import villageBanner from '../assets/images/kantheru_village_banner_1794532305391.jpg';
import phcClinic from '../assets/images/kantheru_phc_clinic_1794532306354.jpg';
import waterTanker from '../assets/images/village_water_tanker_1794532306515.jpg';
import doctorPortrait from '../assets/images/doctor_radhika_portrait_1794532307252.jpg';

export type LangMode = 'bi' | 'te' | 'en';

export interface BiString {
  te: string;
  en: string;
}

export interface StreetSchedule {
  id: string;
  ward: number;
  name: BiString;
  day: BiString;
  timeSlot: BiString;
  isNext: boolean;
  icon: 'road' | 'school' | 'temple' | 'farm';
}

export type WaterProblemType = 'no-water' | 'low-pressure' | 'came-late' | 'dirty-water';

export interface WaterReport {
  id: string;
  streetId: string;
  problemType: WaterProblemType;
  when: 'today' | 'yesterday' | 'other';
  note?: string;
  timeLabel: BiString;
  status: 'new' | 'resolved';
}

export interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  purpose: BiString;
  unitLabel: BiString;
  available: boolean;
  requiresPrescription?: boolean;
}

export interface ConsultationBooking {
  id: string;
  patientName: BiString;
  mode: 'online' | 'clinic';
  age: number;
  temp: string;
  feverDays: number;
  symptoms: string[];
  allergies: string;
  timeLabel: BiString;
  status: 'waiting' | 'completed' | 'attended';
}

export interface MedicineOrder {
  id: string;
  recipientName: string;
  streetId: string;
  phone: string;
  itemsSummary: BiString;
  prescriptionFile?: string;
  status: 'new' | 'on-way' | 'delivered';
}

export interface SchemeItem {
  id: string;
  category: 'farmer' | 'family';
  name: BiString;
  shortDesc: BiString;
  benefitTag: BiString;
  iconType: 'sprout' | 'shield' | 'seed' | 'tractor' | 'pension' | 'ration' | 'health' | 'edu';
  whoCanApply: BiString[];
  documentsNeeded: BiString[];
  stepsToApply: { title: BiString; desc: BiString }[];
}

export interface SchemeAlertItem {
  id: string;
  schemeId: string;
  title: BiString;
  audience: BiString;
  recency: BiString;
}

export interface ChatQA {
  id: string;
  chip: BiString;
  keywords: string[];
  title: BiString;
  steps: BiString[];
  urgentNote?: BiString;
}

// Generated visual assets imported so Vite bundles them into dist/assets/
export const ASSETS = {
  villageBanner,
  phcClinic,
  waterTanker,
  doctorPortrait,
};

export const SAMPLE_CONTACTS = {
  emergency108: {
    name: { te: 'అత్యవసర ఆంబులెన్స్ (108)', en: 'Emergency Ambulance (108)' },
    phone: '108',
    note: { te: 'తీవ్రమైన అత్యవసర పరిస్థితుల్లో వెంటనే 108 కి కాల్ చేయండి.', en: 'Call 108 immediately for life-threatening emergencies.' },
  },
  phc104: {
    name: { te: 'కాంతేరు ప్రాథమిక ఆరోగ్య కేంద్రం (SAMPLE)', en: 'Kantheru PHC Helpline (SAMPLE)' },
    phone: '104 (SAMPLE)',
    note: { te: 'ఆరోగ్య సలహా మరియు క్లినిక్ సమయాల కోసం', en: 'For health guidance and PHC clinic hours' },
  },
  waterLineman: {
    name: { te: 'నీటి లైన్‌మ్యాన్ శ్రీనివాసరావు (SAMPLE)', en: 'Water Lineman Srinivasa Rao (SAMPLE)' },
    phone: '+91 90000 12345 (SAMPLE)',
    note: { te: 'ట్యాప్ లైన్లు & వాల్వ్ సమాచారం కోసం', en: 'For tap line & valve enquiries' },
  },
  tankerTollFree: {
    name: { te: 'అత్యవసర వాటర్ ట్యాంకర్ (SAMPLE)', en: 'Emergency Water Tanker (SAMPLE)' },
    phone: '1800-425-0014 (SAMPLE)',
    note: { te: 'ఉచిత వాటర్ ట్యాంకర్ అభ్యర్థన కోసం', en: 'For free village water tanker request' },
  },
  sachivalayam: {
    name: { te: 'కాంతేరు గ్రామ సచివాలయం (SAMPLE)', en: 'Kantheru Grama Sachivalayam (SAMPLE)' },
    phone: '1902 (SAMPLE)',
    note: { te: 'పథకాలు మరియు ధృవీకరణ సహాయం కోసం', en: 'For scheme verification and helpdesk' },
  },
  adminHelpline: {
    name: { te: 'సహాయ కేంద్రం హెల్ప్‌లైన్ (SAMPLE)', en: 'Staff Portal Helpline (SAMPLE)' },
    phone: '1800-425-1234 (SAMPLE)',
    note: { te: 'అధికారుల పోర్టల్ సహాయం కోసం', en: 'For Village Secretariat staff assistance' },
  },
};

export const SAMPLE_DOCTOR = {
  name: {
    te: 'డా. కె. రాధిక, MBBS, DGO (SAMPLE)',
    en: 'Dr. K. Radhika, MBBS, DGO (SAMPLE)',
  },
  regNo: 'APMC/SAMPLE-84920',
  clinic: {
    te: 'కాంతేరు పీహెచ్‌సీ (ప్రాథమిక ఆరోగ్య కేంద్రం)',
    en: 'Kantheru PHC (Primary Health Centre)',
  },
  hours: {
    te: 'ఈరోజు ఉదయం 11:00 AM - 1:00 PM',
    en: 'Today 11:00 AM - 1:00 PM',
  },
};

export const INITIAL_STREETS: StreetSchedule[] = [
  {
    id: 'main-street',
    ward: 1,
    name: { te: 'ప్రధాన వీధి', en: 'Main Street' },
    day: { te: 'సోమవారం', en: 'Monday' },
    timeSlot: { te: 'ఉదయం 6:00 - 8:00', en: '6:00 AM - 8:00 AM' },
    isNext: false,
    icon: 'road',
  },
  {
    id: 'school-road',
    ward: 2,
    name: { te: 'పాఠశాల రోడ్డు', en: 'School Road' },
    day: { te: 'మంగళవారం', en: 'Tuesday' },
    timeSlot: { te: 'ఉదయం 6:00 - 8:00', en: '6:00 AM - 8:00 AM' },
    isNext: false,
    icon: 'school',
  },
  {
    id: 'temple-street',
    ward: 3,
    name: { te: 'గుడి వీధి', en: 'Temple Street' },
    day: { te: 'గురువారం', en: 'Thursday' },
    timeSlot: { te: 'ఉదయం 6:00 - 8:00', en: '6:00 AM - 8:00 AM' },
    isNext: true,
    icon: 'temple',
  },
  {
    id: 'farm-colony',
    ward: 4,
    name: { te: 'రైతు కాలనీ', en: 'Farm Colony' },
    day: { te: 'శుక్రవారం', en: 'Friday' },
    timeSlot: { te: 'ఉదయం 6:00 - 8:00', en: '6:00 AM - 8:00 AM' },
    isNext: false,
    icon: 'farm',
  },
];

export const PROBLEM_TYPES: {
  id: WaterProblemType;
  label: BiString;
  shortDesc: BiString;
}[] = [
  {
    id: 'no-water',
    label: { te: 'నీరు రాలేదు', en: 'No Water' },
    shortDesc: { te: 'సరఫరా పూర్తిగా ఆగిపోయింది', en: 'Supply did not arrive' },
  },
  {
    id: 'low-pressure',
    label: { te: 'తక్కువ ఒత్తిడి', en: 'Low Pressure' },
    shortDesc: { te: 'నీరు చాలా నెమ్మదిగా వస్తోంది', en: 'Very slow tap flow' },
  },
  {
    id: 'came-late',
    label: { te: 'ఆలస్యంగా వచ్చింది', en: 'Came Late' },
    shortDesc: { te: 'సమయం దాటిన తర్వాత వచ్చింది', en: 'Arrived past schedule' },
  },
  {
    id: 'dirty-water',
    label: { te: 'మురికి నీరు', en: 'Dirty / Brown Water' },
    shortDesc: { te: 'రంగు మారిన లేదా వాసన నీరు', en: 'Muddy or foul-smelling' },
  },
];

export const INITIAL_WATER_REPORTS: WaterReport[] = [
  {
    id: 'REP-101',
    streetId: 'main-street',
    problemType: 'no-water',
    when: 'yesterday',
    timeLabel: { te: 'నిన్న ఉదయం 8:00 AM', en: 'Yesterday 8:00 AM' },
    status: 'resolved',
  },
  {
    id: 'REP-102',
    streetId: 'school-road',
    problemType: 'came-late',
    when: 'other',
    timeLabel: { te: '2 రోజుల క్రితం', en: '2 days ago' },
    status: 'resolved',
  },
  {
    id: 'REP-103',
    streetId: 'temple-street',
    problemType: 'low-pressure',
    when: 'today',
    timeLabel: { te: 'ఈరోజు ఉదయం 6:30 AM', en: 'Today 6:30 AM' },
    status: 'new',
  },
  {
    id: 'REP-104',
    streetId: 'temple-street',
    problemType: 'low-pressure',
    when: 'yesterday',
    timeLabel: { te: 'నిన్న ఉదయం 7:15 AM', en: 'Yesterday 7:15 AM' },
    status: 'new',
  },
  {
    id: 'REP-105',
    streetId: 'farm-colony',
    problemType: 'dirty-water',
    when: 'today',
    timeLabel: { te: 'ఈరోజు ఉదయం 7:00 AM', en: 'Today 7:00 AM' },
    status: 'new',
  },
  {
    id: 'REP-106',
    streetId: 'farm-colony',
    problemType: 'no-water',
    when: 'today',
    timeLabel: { te: 'ఈరోజు ఉదయం 7:10 AM', en: 'Today 7:10 AM' },
    status: 'new',
  },
  {
    id: 'REP-107',
    streetId: 'farm-colony',
    problemType: 'low-pressure',
    when: 'yesterday',
    timeLabel: { te: 'నిన్న సాయంత్రం', en: 'Yesterday evening' },
    status: 'new',
  },
  {
    id: 'REP-108',
    streetId: 'farm-colony',
    problemType: 'low-pressure',
    when: 'yesterday',
    timeLabel: { te: 'నిన్న ఉదయం', en: 'Yesterday morning' },
    status: 'new',
  },
];

export const WATER_SAFETY_TIPS: {
  num: number;
  tag: BiString;
  title: BiString;
  desc: BiString;
}[] = [
  {
    num: 1,
    tag: { te: 'సురక్షిత నిల్వ', en: 'Safe Storage' },
    title: { te: 'నీటిని శుభ్రమైన మూత ఉన్న పాత్రలలో నిల్వ చేయండి', en: 'Store drinking water in clean, tightly covered containers' },
    desc: { te: 'దుమ్ము మరియు కీటకాలు పడకుండా ఎప్పుడూ మూత పెట్టండి.', en: 'Keep lids tightly closed to prevent dust and insects.' },
  },
  {
    num: 2,
    tag: { te: 'పాత్రల శుభ్రత', en: 'Regular Washing' },
    title: { te: 'నిల్వ పాత్రలను క్రమం తప్పకుండా కడగాలి', en: 'Scrub and wash containers daily before refilling' },
    desc: { te: 'ప్రతిరోజూ కొత్త నీరు నింపే ముందు బిందెలను శుభ్రంగా తోమండి.', en: 'Wash pots and drums thoroughly before adding fresh water.' },
  },
  {
    num: 3,
    tag: { te: 'మరిగించడం', en: 'Boil Well' },
    title: { te: 'త్రాగే ముందు నీటిని బాగా మరిగించండి', en: 'Boil water at a rolling boil for 10 minutes before drinking' },
    desc: { te: 'నీరు కనీసం 10 నిమిషాలు ఉడికిన తర్వాత చల్లార్చి త్రాగండి.', en: 'Let boiled water cool naturally in a covered vessel.' },
  },
  {
    num: 4,
    tag: { te: 'మురికి నీరు నివారించండి', en: 'Dirty Water' },
    title: { te: 'మురికిగా కనిపించే నీటిని త్రాగవద్దు', en: 'Never drink visibly discolored, foul-smelling, or turbid water' },
    desc: { te: 'రంగు మారిన నీరు వస్తే వెంటనే పంచాయతీకి నివేదించండి.', en: 'Report brown or cloudy water immediately to the Panchayat.' },
  },
  {
    num: 5,
    tag: { te: 'కాలువలకు దూరం', en: 'Away From Drains' },
    title: { te: 'త్రాగునీటిని మురుగు కాలువలకు దూరంగా ఉంచండి', en: 'Keep drinking pots and taps well separated from open gutters' },
    desc: { te: 'కుళాయిల దగ్గర నీరు నిల్వ కాకుండా శుభ్రంగా ఉంచండి.', en: 'Keep tap surroundings clean and dry.' },
  },
];

export const HIGH_PPM_SOLUTIONS: { title: BiString; desc: BiString }[] = [
  {
    title: { te: 'RO ఫిల్టర్ ఉపయోగించండి', en: 'Use an RO membrane filter for high mineral reduction' },
    desc: { te: 'అధిక లవణాలు (TDS/PPM) తొలగించడానికి RO ప్యూరిఫయర్ సహాయపడుతుంది.', en: 'Reverse Osmosis removes excess dissolved salts.' },
  },
  {
    title: { te: 'పంచాయతీ శుద్ధి నీటిని ఎంచుకోండి', en: 'Get safer drinking water from the Panchayat RO Plant' },
    desc: { te: 'కాంతేరు గ్రామంలోని రక్షిత మంచినీటి కేంద్రం నుండి త్రాగునీరు తీసుకోండి.', en: 'Collect tested low-TDS drinking water from the village RO plant.' },
  },
  {
    title: { te: 'వనరును పరీక్షించమని పంచాయతీని అడగండి', en: 'Request Panchayat officials to run laboratory water tests' },
    desc: { te: 'బోరు లేదా బావి నీటిని సచివాలయం ద్వారా పరీక్ష చేయించుకోండి.', en: 'Ask Grama Sachivalayam staff for periodic source testing.' },
  },
];

export const INITIAL_MEDICINES: MedicineItem[] = [
  {
    id: 'paracetamol',
    name: 'Paracetamol 650mg',
    dosage: '1 Strip (10 tablets)',
    purpose: { te: 'జ్వరం & ఒళ్ళు నొప్పులు', en: 'Fever & Body Pain' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: true,
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine 10mg',
    dosage: '1 Strip (10 tablets)',
    purpose: { te: 'జలుబు & అలెర్జీ', en: 'Cold & Allergy' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: true,
  },
  {
    id: 'ors',
    name: 'ORS Drink Packets',
    dosage: '1 Packet (200ml mix)',
    purpose: { te: 'డీహైడ్రేషన్ & శక్తి', en: 'Dehydration & Energy' },
    unitLabel: { te: 'ప్యాకెట్', en: 'Packet' },
    available: true,
  },
  {
    id: 'metformin',
    name: 'Metformin 500mg',
    dosage: '1 Strip (10 tablets)',
    purpose: { te: 'షుగర్ (మధుమేహం)', en: 'Sugar / Diabetes' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: false,
    requiresPrescription: true,
  },
  {
    id: 'amlodipine',
    name: 'Amlodipine 5mg',
    dosage: '1 Strip (10 tablets)',
    purpose: { te: 'బీపీ (రక్తపోటు)', en: 'Blood Pressure' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: false,
    requiresPrescription: true,
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin 500mg',
    dosage: '1 Strip (5 tablets)',
    purpose: { te: 'ఇన్ఫెక్షన్', en: 'Bacterial Infection' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: true,
    requiresPrescription: true,
  },
  {
    id: 'pantoprazole',
    name: 'Pantoprazole 40mg',
    dosage: '1 Strip (10 tablets)',
    purpose: { te: 'ఎసిడిటీ & గ్యాస్', en: 'Acidity & Gastric' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: false,
  },
  {
    id: 'iron',
    name: 'Iron & Folic Acid Tablets',
    dosage: '1 Strip (10 tablets)',
    purpose: { te: 'రక్తహీనత', en: 'Anemia & Weakness' },
    unitLabel: { te: 'స్ట్రిప్', en: 'Strip' },
    available: true,
  },
];

export const CONSULT_SYMPTOMS: BiString[] = [
  { te: 'దగ్గు', en: 'Cough' },
  { te: 'వాంతులు', en: 'Vomiting' },
  { te: 'తలనొప్పి', en: 'Headache' },
  { te: 'ఒళ్ళు నొప్పులు', en: 'Body pain' },
  { te: 'దద్దుర్లు', en: 'Rash' },
  { te: 'విరేచనాలు', en: 'Loose motions' },
];

export const INITIAL_CONSULTATIONS: ConsultationBooking[] = [
  {
    id: 'CON-201',
    patientName: { te: 'రమేష్ బాబు (SAMPLE)', en: 'Ramesh Babu (SAMPLE)' },
    mode: 'online',
    age: 42,
    temp: '100.4°F',
    feverDays: 2,
    symptoms: ['Cough', 'Headache'],
    allergies: 'None',
    timeLabel: { te: 'వీడియో కాల్ • 10:15 AM', en: 'Video Call • 10:15 AM' },
    status: 'completed',
  },
  {
    id: 'CON-202',
    patientName: { te: 'లక్ష్మి దేవినేని (SAMPLE)', en: 'Lakshmi Devineni (SAMPLE)' },
    mode: 'clinic',
    age: 58,
    temp: '98.6°F',
    feverDays: 0,
    symptoms: ['Body pain'],
    allergies: 'None',
    timeLabel: { te: 'క్లినిక్ విజిట్ • 11:15 AM', en: 'Clinic Visit • 11:15 AM' },
    status: 'waiting',
  },
  {
    id: 'CON-203',
    patientName: { te: 'సీతారామయ్య (SAMPLE)', en: 'Seetharamaiah (SAMPLE)' },
    mode: 'clinic',
    age: 64,
    temp: '99.2°F',
    feverDays: 1,
    symptoms: ['Body pain'],
    allergies: 'Sulfa drugs',
    timeLabel: { te: 'అత్యవసర విభాగం • ఆసుపత్రి', en: 'Acute Care • PHC Clinic' },
    status: 'attended',
  },
];

export const INITIAL_MEDICINE_ORDERS: MedicineOrder[] = [
  {
    id: '#1032',
    recipientName: 'Venkatesh G. (SAMPLE)',
    streetId: 'temple-street',
    phone: '98765 00101 (SAMPLE)',
    itemsSummary: { te: '3 మందులు • హోమ్ డెలివరీ', en: '3 items • Home Delivery' },
    status: 'new',
  },
  {
    id: '#1031',
    recipientName: 'Padmavathi K. (SAMPLE)',
    streetId: 'farm-colony',
    phone: '98765 00102 (SAMPLE)',
    itemsSummary: { te: 'ఆశా కార్యకర్త ద్వారా రవాణా', en: 'Dispatched via ASHA worker' },
    status: 'on-way',
  },
  {
    id: '#1029',
    recipientName: 'Subba Rao M. (SAMPLE)',
    streetId: 'main-street',
    phone: '98765 00103 (SAMPLE)',
    itemsSummary: { te: 'నేరుగా పంపిణీ అయింది', en: 'Delivered to doorstep' },
    status: 'delivered',
  },
];

// IMPORTANT: Zero rupee amounts and zero dates in schemes! All names marked SAMPLE.
export const SCHEMES: SchemeItem[] = [
  // FARMER SCHEMES
  {
    id: 'rythu-bharosa',
    category: 'farmer',
    name: { te: 'రైతు భరోసా (SAMPLE)', en: 'Rythu Bharosa (SAMPLE)' },
    shortDesc: { te: 'రైతు కుటుంబాలకు పెట్టుబడి సహాయం', en: 'Farmer input financial support' },
    benefitTag: { te: 'ఎరువులు, విత్తనాల ఖర్చుల సహకారం', en: 'Seeds & input support' },
    iconType: 'sprout',
    whoCanApply: [
      { te: 'రైతు కుటుంబం', en: 'Farmer family residing in the village' },
      { te: 'సొంత భూమి లేదా కౌలు రైతు కార్డు కలిగి ఉండాలి', en: 'Holds land title or valid tenant farmer card' },
      { te: 'ఆధార్ కార్డు మరియు బ్యాంకు ఖాతా కలిగి ఉండాలి', en: 'Has valid Aadhaar card and linked bank account' },
    ],
    documentsNeeded: [
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar card' },
      { te: 'భూమి పట్టాదారు పాస్ పుస్తకం', en: 'Land passbook (Pattadar)' },
      { te: 'బ్యాంకు పాస్ పుస్తకం', en: 'Bank passbook' },
      { te: 'రేషన్ / రైస్ కార్డు', en: 'Ration / Rice card' },
    ],
    stepsToApply: [
      {
        title: { te: 'పత్రాలు సిద్ధం చేసుకోండి', en: 'Collect documents' },
        desc: { te: 'అన్ని అసలు పత్రాలు మరియు జిరాక్స్ కాపీలు సిద్ధం చేసుకోండి.', en: 'Keep original documents and photocopies ready.' },
      },
      {
        title: { te: 'గ్రామ సచివాలయానికి వెళ్ళండి', en: 'Visit Village Secretariat / RBK' },
        desc: { te: 'కాంతేరు గ్రామ సచివాలయ రైతు భరోసా కేంద్రాన్ని సందర్శించండి.', en: 'Visit Kantheru Secretariat RBK center.' },
      },
      {
        title: { te: 'వ్యవసాయ సహాయకుడికి సమర్పించండి', en: 'Submit to Agriculture Assistant' },
        desc: { te: 'గ్రామ వ్యవసాయ సహాయకుడికి (VAA) దరఖాస్తు ఇవ్వండి.', en: 'Hand over application form to the Village Agriculture Assistant.' },
      },
      {
        title: { te: 'రసీదు భద్రపరుచుకోండి', en: 'Keep your receipt' },
        desc: { te: 'దరఖాస్తు రసీదు సంఖ్యను జాగ్రత్తగా దాచుకోండి.', en: 'Keep your stamped acknowledgement slip safely.' },
      },
    ],
  },
  {
    id: 'crop-insurance',
    category: 'farmer',
    name: { te: 'పంట బీమా (SAMPLE)', en: 'Crop Insurance (SAMPLE)' },
    shortDesc: { te: 'పంట నష్టపోయినప్పుడు పరిహారం', en: 'Help when crops are damaged' },
    benefitTag: { te: 'ప్రకృతి వైపరీత్యాల రక్షణ', en: 'Weather damage protection' },
    iconType: 'shield',
    whoCanApply: [
      { te: 'సాగు చేస్తున్న రైతులు మరియు కౌలు రైతులు', en: 'Active cultivators and tenant farmers' },
      { te: 'ఇ-క్రాప్ నమోదు చేసుకున్న పంట భూమి ఉండాలి', en: 'Crop must be recorded under e-Crop survey' },
      { te: 'ఆధార్ మరియు బ్యాంకు ఖాతా వివరాలు ఉండాలి', en: 'Valid Aadhaar and bank passbook required' },
    ],
    documentsNeeded: [
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar card' },
      { te: 'ఇ-క్రాప్ నమోదు రసీదు', en: 'e-Crop registration slip' },
      { te: 'భూమి పట్టాదారు లేదా కౌలు కార్డు', en: 'Land passbook or CCRC tenant card' },
      { te: 'బ్యాంకు పాస్ పుస్తకం', en: 'Bank passbook' },
    ],
    stepsToApply: [
      {
        title: { te: 'ఇ-క్రాప్ తనిఖీ చేయండి', en: 'Verify e-Crop entry' },
        desc: { te: 'మీ పంట వివరాలు ఇ-క్రాప్‌లో నమోదయ్యాయో లేదో చూడండి.', en: 'Confirm your planted crop is registered in e-Crop.' },
      },
      {
        title: { te: 'ఆర్‌బికె కేంద్రాన్ని సందర్శించండి', en: 'Visit Kantheru RBK' },
        desc: { te: 'సచివాలయం లేదా రైతు భరోసా కేంద్రంలో సంప్రదించండి.', en: 'Visit the Village Secretariat or RBK helpdesk.' },
      },
      {
        title: { te: 'బీమా పత్రం సమర్పించండి', en: 'Submit insurance form' },
        desc: { te: 'పత్రాలతో పాటు బీమా దరఖాస్తును VAA కు అందజేయండి.', en: 'Submit the form with supporting documents to VAA.' },
      },
      {
        title: { te: 'ధృవీకరణ రసీదు పొందండి', en: 'Collect confirmation' },
        desc: { te: 'నమోదు రసీదును జాగ్రత్తగా ఉంచుకోండి.', en: 'Retain the stamped acknowledgement receipt.' },
      },
    ],
  },
  {
    id: 'seed-subsidy',
    category: 'farmer',
    name: { te: 'విత్తన సబ్సిడీ (SAMPLE)', en: 'Seed Subsidy (SAMPLE)' },
    shortDesc: { te: 'నాణ్యమైన విత్తనాలు & ఎరువుల సహాయం', en: 'Help with quality seeds and inputs' },
    benefitTag: { te: 'ధృవీకరించిన విత్తనాల సరఫరా', en: 'Certified seed distribution' },
    iconType: 'seed',
    whoCanApply: [
      { te: 'కాంతేరు గ్రామ పరిధిలోని రైతులు', en: 'Farmers cultivating within Kantheru village' },
      { te: 'సొంత భూమి లేదా కౌలు సాగు కలిగి ఉండాలి', en: 'Own land or verified leased land' },
      { te: 'గ్రామ వ్యవసాయ కేంద్రంలో నమోదు అయి ఉండాలి', en: 'Registered with the local RBK' },
    ],
    documentsNeeded: [
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar card' },
      { te: 'భూమి పాస్ పుస్తకం / కౌలు పత్రం', en: 'Land passbook or lease document' },
      { te: 'మొబైల్ నంబర్', en: 'Active mobile number' },
    ],
    stepsToApply: [
      {
        title: { te: 'విత్తన రకం ఎంచుకోండి', en: 'Select seed variety' },
        desc: { te: 'కావాల్సిన వరి లేదా ఇతర విత్తనాల వివరాలను నమోదు చేయండి.', en: 'Check available certified seeds at RBK.' },
      },
      {
        title: { te: 'బయోమెట్రిక్ నమోదు చేయండి', en: 'Complete biometric check' },
        desc: { te: 'ఆధార్ ఆధారిత నమోదు సచివాలయంలో పూర్తి చేయండి.', en: 'Verify identity at the RBK counter.' },
      },
      {
        title: { te: 'విత్తనాలు తీసుకోండి', en: 'Collect seed bags' },
        desc: { te: 'నిర్ణీత కేంద్రం నుండి నాణ్యమైన విత్తన సంచులు పొందండి.', en: 'Collect certified seed bags and receipt.' },
      },
    ],
  },
  {
    id: 'tenant-farmer',
    category: 'farmer',
    name: { te: 'కౌలు రైతు సహాయం (SAMPLE)', en: 'Tenant Farmer Support (SAMPLE)' },
    shortDesc: { te: 'కౌలు రైతులకు ప్రత్యేక ఆర్థిక రక్షణ', en: 'Special support for farmers who rent land' },
    benefitTag: { te: 'పంట రుణాలు & ఇన్‌పుట్ రక్షణ', en: 'Crop loan & input protection' },
    iconType: 'tractor',
    whoCanApply: [
      { te: 'భూమిని కౌలుకు తీసుకొని సాగు చేస్తున్న రైతులు', en: 'Landless or tenant cultivators renting farmland' },
      { te: 'CCRC (పంట సాగుదారు హక్కు పత్రం) కలిగి ఉండాలి', en: 'Must hold valid Crop Cultivator Rights Card (CCRC)' },
      { te: 'ఆధార్ మరియు బ్యాంకు ఖాతా ఉండాలి', en: 'Valid Aadhaar and bank account' },
    ],
    documentsNeeded: [
      { te: 'CCRC కౌలు రైతు కార్డు', en: 'CCRC Tenant Card' },
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar card' },
      { te: 'బ్యాంకు పాస్ పుస్తకం', en: 'Bank passbook' },
      { te: 'భూమి యజమాని అంగీకార పత్రం', en: 'Landowner consent copy' },
    ],
    stepsToApply: [
      {
        title: { te: 'CCRC కార్డు కోసం దరఖాస్తు చేయండి', en: 'Apply for CCRC card' },
        desc: { te: 'గ్రామ రెవెన్యూ అధికారి (VRO) వద్ద CCRC పొందండి.', en: 'Obtain CCRC card via Village Revenue Officer.' },
      },
      {
        title: { te: 'సచివాలయంలో నమోదు చేయండి', en: 'Register at Secretariat' },
        desc: { te: 'VAA ద్వారా పథకానికి ఆన్‌లైన్ నమోదు చేయించండి.', en: 'Submit CCRC & Aadhaar to VAA.' },
      },
      {
        title: { te: 'రసీదు తీసుకోండి', en: 'Get acknowledgement' },
        desc: { te: 'దరఖాస్తు నంబర్ ఉన్న స్లిప్ తీసుకోండి.', en: 'Keep acknowledgement slip for tracking.' },
      },
    ],
  },

  // FAMILY & INDIVIDUAL SCHEMES
  {
    id: 'pension-scheme',
    category: 'family',
    name: { te: 'పింఛను కానుక (SAMPLE)', en: 'Pension Scheme (SAMPLE)' },
    shortDesc: { te: 'వృద్ధులు మరియు వితంతువులకు నెలవారీ సహాయం', en: 'Monthly support for elders and widows' },
    benefitTag: { te: 'నెలవారీ సామాజిక భద్రత', en: 'Monthly social security support' },
    iconType: 'pension',
    whoCanApply: [
      { te: 'వృద్ధులు, వితంతువులు, దివ్యాంగులు మరియు ఒంటరి మహిళలు', en: 'Senior citizens, widows, persons with disabilities, single women' },
      { te: 'గ్రామ సచివాలయ నిబంధనల ప్రకారం అర్హత ఉన్న కుటుంబం', en: 'Meets household eligibility norms at Panchayat' },
      { te: 'తెల్ల రేషన్ కార్డు / రైస్ కార్డు ఉండాలి', en: 'Holds valid Rice / White Ration Card' },
    ],
    documentsNeeded: [
      { te: 'ఆధార్ కార్డు (వయస్సు ధృవీకరణ)', en: 'Aadhaar card (Age proof)' },
      { te: 'రైస్ / రేషన్ కార్డు', en: 'Rice / Ration card' },
      { te: 'బ్యాంకు పాస్ పుస్తకం', en: 'Bank passbook' },
      { te: 'అవసరమైతే వితంతు/వైకల్య ధృవీకరణ పత్రం', en: 'Widow / Disability certificate if applicable' },
    ],
    stepsToApply: [
      {
        title: { te: 'పత్రాలు సిద్ధం చేయండి', en: 'Prepare documents' },
        desc: { te: 'ఆధార్, రేషన్ కార్డు మరియు సంబంధిత సర్టిఫికెట్లు సిద్ధం చేయండి.', en: 'Gather Aadhaar, ration card, and required certificates.' },
      },
      {
        title: { te: 'గ్రామ సచివాలయానికి వెళ్ళండి', en: 'Visit Grama Sachivalayam' },
        desc: { te: 'సంక్షేమ సహాయకుడిని కలిసి పింఛను ఫారమ్ తీసుకోండి.', en: 'Meet the Welfare Assistant for the pension form.' },
      },
      {
        title: { te: 'భౌతిక తనిఖీ', en: 'Local verification' },
        desc: { te: 'గ్రామ సిబ్బంది ఇంటి వద్ద వివరాలను ధృవీకరిస్తారు.', en: 'Panchayat staff verify household details locally.' },
      },
      {
        title: { te: 'రసీదు పొందండి', en: 'Collect receipt' },
        desc: { te: 'నమోదు పూర్తయిన తర్వాత రసీదును తీసుకోండి.', en: 'Keep your application reference slip safely.' },
      },
    ],
  },
  {
    id: 'ration-card',
    category: 'family',
    name: { te: 'రేషన్ కార్డు ప్రయోజనాలు (SAMPLE)', en: 'Ration Card Benefits (SAMPLE)' },
    shortDesc: { te: 'నెలకు రాయితీ బియ్యం మరియు సరుకులు', en: 'Subsidized food grains and essentials' },
    benefitTag: { te: 'కుటుంబ ఆహార భద్రత', en: 'Household food security' },
    iconType: 'ration',
    whoCanApply: [
      { te: 'కాంతేరు గ్రామంలో నివసిస్తున్న అర్హులైన కుటుంబాలు', en: 'Eligible resident families in Kantheru village' },
      { te: 'కొత్త కుటుంబ సభ్యుల చేరిక లేదా కొత్త కార్డు కోసం', en: 'New households or member additions' },
    ],
    documentsNeeded: [
      { te: 'కుటుంబ సభ్యులందరి ఆధార్ కార్డులు', en: 'Aadhaar cards of all family members' },
      { te: 'నివాస ధృవీకరణ పత్రం', en: 'Address / Residence proof' },
      { te: 'వివాహ లేదా జనన ధృవీకరణ పత్రం (కొత్త చేరికలకు)', en: 'Marriage or birth certificate (if adding members)' },
    ],
    stepsToApply: [
      {
        title: { te: 'సచివాలయంలో దరఖాస్తు తీసుకోండి', en: 'Get form at Secretariat' },
        desc: { te: 'డిజిటల్ అసిస్టెంట్ వద్ద రైస్ కార్డు సేవ కోసం అడగండి.', en: 'Request Rice Card service at the Digital Assistant desk.' },
      },
      {
        title: { te: 'వివరాలు నమోదు చేయండి', en: 'Submit family details' },
        desc: { te: 'సభ్యుల ఆధార్ మరియు ఫోటోలు అందజేయండి.', en: 'Provide member Aadhaar copies for e-KYC.' },
      },
      {
        title: { te: 'విచారణ & కార్డు జారీ', en: 'Verification & issue' },
        desc: { te: 'అధికారుల తనిఖీ తర్వాత కొత్త కార్డు మంజూరు అవుతుంది.', en: 'Card is issued after Panchayat verification.' },
      },
    ],
  },
  {
    id: 'health-insurance',
    category: 'family',
    name: { te: 'ఆరోగ్య రక్షణ (SAMPLE)', en: 'Health Insurance (SAMPLE)' },
    shortDesc: { te: 'ఆసుపత్రి ఖర్చుల కోసం ఆరోగ్య బీమా', en: 'Help with hospital treatment costs' },
    benefitTag: { te: 'ఉచిత వైద్య చికిత్స కవరేజ్', en: 'Cashless hospital care support' },
    iconType: 'health',
    whoCanApply: [
      { te: 'తెల్ల రేషన్ కార్డు / రైస్ కార్డు ఉన్న కుటుంబాలు', en: 'Families holding White Ration / Rice Card' },
      { te: 'ఆరోగ్యశ్రీ అర్హత ప్రమాణాలకు లోబడి ఉన్నవారు', en: 'Families meeting village health card criteria' },
    ],
    documentsNeeded: [
      { te: 'ఆరోగ్య కార్డు లేదా రైస్ కార్డు', en: 'Health card or Rice card' },
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar card' },
      { te: 'ఫోన్ నంబర్', en: 'Registered mobile number' },
    ],
    stepsToApply: [
      {
        title: { te: 'కార్డు స్థితి తనిఖీ చేయండి', en: 'Check card status' },
        desc: { te: 'సచివాలయంలో లేదా ఆరోగ్య మిత్ర వద్ద కార్డు స్థితి చూడండి.', en: 'Verify family health card at Secretariat or PHC.' },
      },
      {
        title: { te: 'e-KYC పూర్తి చేయండి', en: 'Complete e-KYC' },
        desc: { te: 'కుటుంబ సభ్యులందరి వేలిముద్రలు నమోదు చేయండి.', en: 'Link Aadhaar biometrics for all family members.' },
      },
      {
        title: { te: 'ఆసుపత్రిలో వినియోగించండి', en: 'Use at empaneled clinics' },
        desc: { te: 'నమోదిత ఆసుపత్రులలో కార్డు చూపించి ఉచిత సేవ పొందండి.', en: 'Show health card at empaneled hospitals.' },
      },
    ],
  },
  {
    id: 'education-support',
    category: 'family',
    name: { te: 'విద్యా దీవెన & వసతి (SAMPLE)', en: 'Education Support (SAMPLE)' },
    shortDesc: { te: 'పిల్లల చదువు మరియు పాఠశాల సహాయం', en: 'Help for children schooling & college fees' },
    benefitTag: { te: 'విద్యార్థుల చదువు సహాయం', en: 'Student education assistance' },
    iconType: 'edu',
    whoCanApply: [
      { te: 'పాఠశాల లేదా కళాశాలలో చదువుతున్న విద్యార్థులు', en: 'Students enrolled in recognized schools or colleges' },
      { te: 'అర్హత గల గ్రామ కుటుంబాల విద్యార్థులు', en: 'Students from eligible rural households' },
    ],
    documentsNeeded: [
      { te: 'విద్యార్థి మరియు తల్లి ఆధార్ కార్డు', en: 'Student & Mother Aadhaar cards' },
      { te: 'పాఠశాల / కళాశాల బోనాఫైడ్ సర్టిఫికెట్', en: 'School / College bonafide certificate' },
      { te: 'రైస్ కార్డు & బ్యాంకు పాస్ పుస్తకం', en: 'Rice card & Bank passbook' },
    ],
    stepsToApply: [
      {
        title: { te: 'విద్యా సంస్థ ధృవీకరణ', en: 'School verification' },
        desc: { te: 'చదువుతున్న పాఠశాల నుండి బోనాఫైడ్ పత్రం తీసుకోండి.', en: 'Collect enrollment certificate from school/college.' },
      },
      {
        title: { te: 'సచివాలయంలో నమోదు', en: 'Submit at Secretariat' },
        desc: { te: 'విద్యా సహాయకుడికి పత్రాలు అందజేసి బయోమెట్రిక్ వేయండి.', en: 'Submit documents to Education Assistant with e-KYC.' },
      },
      {
        title: { te: 'రసీదు భద్రపరచండి', en: 'Keep acknowledgement' },
        desc: { te: 'దరఖాస్తు సంఖ్యను జాగ్రత్తగా దాచుకోండి.', en: 'Store reference number safely.' },
      },
    ],
  },
];

export const SCHEME_ALERTS: SchemeAlertItem[] = [
  {
    id: 'alert-1',
    schemeId: 'rythu-bharosa',
    title: { te: 'రైతు భరోసా ఖరీఫ్ విడత (SAMPLE)', en: 'Rythu Bharosa Kharif Update (SAMPLE)' },
    audience: { te: 'రైతు కుటుంబాల కోసం', en: 'For farmer families' },
    recency: { te: 'నేడు అందింది', en: 'Today' },
  },
  {
    id: 'alert-2',
    schemeId: 'tenant-farmer',
    title: { te: 'సున్నా వడ్డీ పంట రుణాలు (SAMPLE)', en: 'Zero Interest Crop Loans (SAMPLE)' },
    audience: { te: 'సకాలంలో రుణం చెల్లించే రైతుల కోసం', en: 'For prompt repaying farmers' },
    recency: { te: 'నిన్న అందింది', en: 'Yesterday' },
  },
  {
    id: 'alert-3',
    schemeId: 'pension-scheme',
    title: { te: 'చేయూత & ఆసరా సహాయం (SAMPLE)', en: 'Cheyutha & Pension Support (SAMPLE)' },
    audience: { te: 'మహిళా స్వయం సహాయక సంఘాలు & వృద్ధులు', en: 'For women SHG members & elders' },
    recency: { te: 'కొత్త సమాచారం', en: 'Recent update' },
  },
];

export const HEALTH_CHAT_QA: ChatQA[] = [
  {
    id: 'fever',
    chip: { te: 'జ్వరం వస్తే ఏం చేయాలి?', en: 'What to do for fever?' },
    keywords: ['fever', 'temp', 'hot', 'జ్వరం', 'వేడి'],
    title: { te: 'జ్వరం వచ్చినప్పుడు ప్రాథమిక సూచనలు', en: 'General Fever Guidance' },
    steps: [
      { te: 'తగినంత విశ్రాంతి తీసుకోండి మరియు ధారాళంగా నీరు త్రాగండి.', en: 'Take adequate rest and drink plenty of clean water/fluids.' },
      { te: 'శరీర ఉష్ణోగ్రతను చల్లని తడి గుడ్డతో తుడవండి.', en: 'Sponge the body gently with a cool, clean damp cloth.' },
      { te: 'డాక్టర్ గతంలో సూచించినట్లయితే అవసరమైతే పారాసిటమాల్ మాత్ర తీసుకోండి.', en: 'Take Paracetamol tablet only as advised by a doctor.' },
      { te: 'జ్వరం 2 రోజుల కంటే ఎక్కువ ఉంటే కాంతేరు పీహెచ్‌సీ డాక్టర్‌ను సంప్రదించండి.', en: 'If fever lasts more than 2 days, visit Kantheru PHC immediately.' },
    ],
  },
  {
    id: 'ors',
    chip: { te: 'ORS ఎలా తయారు చేయాలి?', en: 'How to prepare ORS?' },
    keywords: ['ors', 'dehydration', 'motion', 'loose', 'విరేచనాలు', 'నీరసం'],
    title: { te: 'ORS ద్రావణం తయారీ విధానం', en: 'How to Prepare ORS Safely' },
    steps: [
      { te: '1 లీటరు శుభ్రమైన, మరిగించి చల్లార్చిన త్రాగునీరు తీసుకోండి.', en: 'Take 1 liter of clean, boiled and cooled drinking water.' },
      { te: 'దానిలో ఒక పూర్తి ORS ప్యాకెట్ పొడిని కలిపి బాగా కరగనివ్వండి.', en: 'Empty 1 full ORS packet into the water and stir until dissolved.' },
      { te: 'ప్రతి విరేచనం తర్వాత కొద్దికొద్దిగా త్రాగండి; 24 గంటల్లోపే వాడండి.', en: 'Sip frequently after loose motions; use within 24 hours.' },
      { te: 'ప్యాకెట్ లేకపోతే గ్లాసు నీటిలో చిటికెడు ఉప్పు, చెంచా చక్కెర కలపండి.', en: 'If no packet: mix a pinch of salt and 1 tsp sugar in a glass of safe water.' },
    ],
  },
  {
    id: 'tablet',
    chip: { te: 'Tablet ఎప్పుడు వేసుకోవాలి?', en: 'When to take tablet?' },
    keywords: ['tablet', 'medicine', 'pill', 'dose', 'మాత్ర', 'మందు'],
    title: { te: 'మందులు వాడేటప్పుడు జాగ్రత్తలు', en: 'Safe Medicine Habits' },
    steps: [
      { te: 'వైద్యుడు లేదా ఆరోగ్య కార్యకర్త చెప్పిన సమయానికే మాత్రలు వేసుకోండి.', en: 'Take medicines only at the timings prescribed by a doctor.' },
      { te: 'చాలా మాత్రలు ఆహారం తిన్న తర్వాత మంచినీటితో వేసుకోవాలి.', en: 'Most tablets should be taken after food with clean water.' },
      { te: 'సొంతంగా యాంటీబయాటిక్ మందులు కొని వాడవద్దు.', en: 'Never take antibiotics without a doctor prescription.' },
    ],
  },
  {
    id: 'doctor',
    chip: { te: 'ఎప్పుడు డాక్టర్‌ను కలవాలి?', en: 'When to see a doctor?' },
    keywords: ['doctor', 'hospital', 'emergency', 'clinic', 'డాక్టర్', 'ఆసుపత్రి'],
    title: { te: 'వెంటనే వైద్యుడిని కలవాల్సిన లక్షణాలు', en: 'When to Visit PHC or Call 108' },
    steps: [
      { te: 'జ్వరం 2 రోజులు తగ్గకపోతే లేదా 102°F దాటితే పీహెచ్‌సీకి వెళ్ళండి.', en: 'Visit PHC if fever lasts over 2 days or exceeds 102°F.' },
      { te: 'పిల్లలు లేదా వృద్ధులు నీరు త్రాగలేకపోతే వెంటనే చూపించండి.', en: 'Seek care immediately if children or elders cannot keep fluids down.' },
      { te: 'శ్వాస తీసుకోవడంలో ఇబ్బంది, మూర్ఛ లేదా తీవ్ర రక్తస్రావం ఉంటే 108 కి కాల్ చేయండి.', en: 'For breathing trouble, fits, or heavy bleeding, call 108 immediately.' },
    ],
  },
];

export const SCHEME_CHAT_QA: ChatQA[] = [
  {
    id: 'rythu-bharosa-chat',
    chip: { te: 'Rythu Bharosa ఎలా apply చేయాలి?', en: 'How to apply for Rythu Bharosa?' },
    keywords: ['rythu', 'bharosa', 'farmer', 'రైతు', 'భరోసా'],
    title: { te: 'రైతు భరోసా దరఖాస్తు విధానం (SAMPLE)', en: 'Steps to apply for Rythu Bharosa (SAMPLE)' },
    steps: [
      { te: 'ఆధార్ కార్డు, భూమి పట్టాదారు పాస్ పుస్తకం, బ్యాంకు పాస్ పుస్తకం సిద్ధం చేసుకోండి.', en: 'Keep Aadhaar, Land passbook, and Bank passbook ready.' },
      { te: 'కాంతేరు రైతు భరోసా కేంద్రం (RBK) లేదా గ్రామ సచివాలయానికి వెళ్ళండి.', en: 'Visit Kantheru RBK or Village Secretariat center.' },
      { te: 'వ్యవసాయ సహాయకుడికి (VAA) దరఖాస్తు పత్రం సమర్పించండి.', en: 'Submit the application form to the Agriculture Assistant (VAA).' },
      { te: 'దరఖాస్తు రసీదు తీసుకోండి.', en: 'Collect your stamped acknowledgement slip.' },
    ],
  },
  {
    id: 'pension-chat',
    chip: { te: 'పింఛను పథకం వివరాలు?', en: 'Pension scheme details?' },
    keywords: ['pension', 'widow', 'old', 'పింఛను', 'పెన్షన్', 'వృద్ధ'],
    title: { te: 'పింఛను కానుక దరఖాస్తు విధానం (SAMPLE)', en: 'How to apply for Pension Scheme (SAMPLE)' },
    steps: [
      { te: 'ఆధార్ కార్డు, రైస్ కార్డు మరియు బ్యాంకు పాస్ పుస్తకం తీసుకోండి.', en: 'Bring Aadhaar card, Rice card, and Bank passbook.' },
      { te: 'కాంతేరు గ్రామ సచివాలయంలోని సంక్షేమ సహాయకుడిని కలవండి.', en: 'Meet the Welfare Assistant at Kantheru Grama Sachivalayam.' },
      { te: 'వయస్సు లేదా వితంతు/దివ్యాంగ ధృవీకరణ పత్రం జతచేయండి.', en: 'Attach age proof or relevant certificate.' },
      { te: 'నమోదు రసీదు తీసుకొని పంచాయతీలో నిర్ధారించుకోండి.', en: 'Collect your receipt and confirm status at Panchayat office.' },
    ],
  },
  {
    id: 'ration-chat',
    chip: { te: 'రేషన్ కార్డు సహాయం?', en: 'Ration card help?' },
    keywords: ['ration', 'rice', 'card', 'రేషన్', 'రైస్'],
    title: { te: 'రేషన్ / రైస్ కార్డు సేవలు (SAMPLE)', en: 'Ration / Rice Card Steps (SAMPLE)' },
    steps: [
      { te: 'కుటుంబ సభ్యులందరి ఆధార్ కార్డు కాపీలు తీసుకోండి.', en: 'Collect Aadhaar copies for all family members.' },
      { te: 'గ్రామ సచివాలయంలో డిజిటల్ అసిస్టెంట్ వద్ద దరఖాస్తు చేయండి.', en: 'Apply through the Digital Assistant at Grama Sachivalayam.' },
      { te: 'విచారణ పూర్తయిన తర్వాత రసీదు ద్వారా స్థితి తెలుసుకోండి.', en: 'Track verification status using your acknowledgement slip.' },
    ],
  },
  {
    id: 'crop-insurance-chat',
    chip: { te: 'పంట బీమా ఎలా?', en: 'How to get crop insurance?' },
    keywords: ['crop', 'insurance', 'damage', 'పంట', 'బీమా'],
    title: { te: 'పంట బీమా నమోదు విధానం (SAMPLE)', en: 'Crop Insurance Registration (SAMPLE)' },
    steps: [
      { te: 'మీ సాగు పంట ఇ-క్రాప్‌లో నమోదు అయిందో లేదో ఆర్‌బికెలో చూడండి.', en: 'Verify your crop is registered in e-Crop at RBK.' },
      { te: 'భూమి పాస్ పుస్తకం లేదా CCRC కౌలు కార్డు, ఆధార్ తీసుకువెళ్ళండి.', en: 'Carry Land passbook or CCRC tenant card and Aadhaar.' },
      { te: 'VAA సహాయంతో పంట బీమా దరఖాస్తు పూర్తి చేసి రసీదు పొందండి.', en: 'Submit form via VAA and keep stamped receipt.' },
    ],
  },
];
