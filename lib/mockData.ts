// FRAD Foundation offline mock datasets for headless CMS fallback
import type { Project, Story, NewsItem, Report, Publication, Job, Partner, Location, MediaAsset, EmergencyAlert, ImpactStat } from '@/types/content';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'wash-gwoza',
    slug: 'wash-gwoza',
    title: 'Emergency Solar-Powered Boreholes in Gwoza LGA',
    status: 'active',
    donor: 'Nigeria Humanitarian Fund (NHF)',
    location: 'Gwoza, Borno State',
    sectors: ['WASH'],
    startDate: '2026-01-10',
    endDate: '2026-12-31',
    targetPopulation: '18,500 displaced persons',
    summary: 'Improving access to safe water through solar-powered boreholes, hygiene promotion, and training for community water committees.',
    problemStatement: 'Persistent conflict and seasonal water shortages left displaced families dependent on high-cost water trucking or contaminated surface sources.',
    fradResponse: 'FRAD constructed two solar-powered boreholes and worked with community water committees to support routine operation and maintenance.',
    keyActivities: [
      'Geophysical surveying and deep well drilling',
      'Installation of solar arrays and hybrid submersible pumps',
      'Construction of high-volume overhead tank storage',
      'Establishment and training of community water management desks'
    ],
    results: [
      '18,500 individuals gained immediate access to clean, safe drinking water.',
      'Water collection times reduced by 75% for women and children.',
      'Recorded zero cholera outbreaks in target project sectors during peak season.'
    ],
    featuredImage: '/images/frad-water-access.jpg',
    featuredOnHomepage: true
  },
  {
    id: 'nutrition-jere',
    slug: 'nutrition-jere',
    title: 'Integrated Primary Health & Nutrition Outreach in Jere LGA',
    status: 'active',
    donor: 'Save the Children International',
    location: 'Jere, Borno State',
    sectors: ['Nutrition & Health'],
    startDate: '2026-02-15',
    endDate: '2026-10-31',
    targetPopulation: '12,000 mothers and infants',
    summary: 'Community nutrition screening, outpatient therapeutic care, referral support, health education, and mother-to-mother support groups.',
    problemStatement: 'High levels of acute malnutrition among children under five due to displacement and disrupted primary healthcare services.',
    fradResponse: 'FRAD deployed mobile health teams and established outreach points for nutrition screening, referral, and maternal and child health services.',
    keyActivities: [
      'Malnutrition screening using MUAC tape metrics',
      'Distribution of Ready-to-Use Therapeutic Food (RUTF)',
      'Maternal healthcare, infant vaccination, and referral pathways',
      'Hygiene education and infant feeding counselling'
    ],
    results: [
      '5,800 children screened for acute malnutrition.',
      '92% cure rate achieved for admitted severe acute malnutrition cases.',
      '2,500 pregnant and lactating women trained in healthy feeding practices.'
    ],
    featuredImage: '/images/frad-field-hero.jpg',
    featuredOnHomepage: true
  },
  {
    id: 'protection-maiduguri',
    slug: 'protection-maiduguri',
    title: 'Survivor-Centred Protection and GBV Support',
    status: 'active',
    donor: 'Global Survivors Fund (GSF)',
    location: 'Maiduguri, Borno State',
    sectors: ['Protection & GBV'],
    startDate: '2026-03-01',
    endDate: '2026-11-30',
    targetPopulation: '4,500 women and adolescent girls',
    summary: 'Confidential case management, safe referrals, psychosocial support, legal assistance, and dignity kits for women and adolescent girls.',
    problemStatement: 'Displaced women and adolescent girls face heightened protection threats and lack safe, confidential channels for care.',
    fradResponse: 'FRAD established safe spaces and deployed trained case managers to deliver trauma-informed care and secure referral pathways.',
    keyActivities: [
      'Establishing women-friendly safe spaces',
      'Psychosocial support and trauma counselling',
      'Distribution of emergency dignity kits',
      'Community training on protection and GBV prevention'
    ],
    results: [
      '1,200 survivors received confidential counselling and legal referrals.',
      '3,000 dignity kits containing solar lights and hygiene materials distributed.',
      'GBV referral response times reduced by 40% in coordination with local actors.'
    ],
    featuredImage: '/images/frad-programme-outreach.jpg',
    featuredOnHomepage: false
  }
];

export const MOCK_STORIES: Story[] = [
  {
    id: 'clean-water-story',
    slug: 'clean-water-story',
    title: 'Clean water brings more time for family and work',
    storyType: 'field',
    sector: 'WASH',
    location: 'Jere LGA, Borno State',
    date: '2026-06-15',
    consentStatus: 'consented',
    namePseudonym: 'Amina',
    summary: 'A mother in Jere shares how a nearby water point changed her daily routine and gave her more time for family and work.',
    fullStory: 'Before FRAD constructed the solar-powered water access points, Amina walked three hours daily to collect water, often missing livelihood opportunities. Her youngest suffered from seasonal diarrheal diseases. With safe water now five minutes away, Amina spends more time on her small tailoring trade, and her children are healthy.',
    featuredImage: '/images/frad-water-access.jpg',
    featuredOnHomepage: true,
    protectionSensitive: false
  },
  {
    id: 'resilient-kitchen-story',
    slug: 'resilient-kitchen-story',
    title: 'Mothers sharing practical nutrition knowledge',
    storyType: 'community',
    sector: 'Nutrition & Health',
    location: 'MMC, Borno State',
    date: '2026-05-22',
    consentStatus: 'consented',
    namePseudonym: 'Fatima',
    summary: 'A mother-to-mother support group shares practical ways to prepare nutritious meals using locally available foods.',
    fullStory: 'Fatima joined the FRAD nutrition circle after her toddler was discharged from the Outpatient Therapeutic Programme. Through the support group, she learned to supplement infant diets with local legumes and leafy greens, ensuring long-term recovery and preventing relapse.',
    featuredImage: '/images/frad-field-hero.jpg',
    featuredOnHomepage: true,
    protectionSensitive: false
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'gbv-sector-sops',
    slug: 'gbv-sector-sops',
    title: 'Borno State GBV referral procedures validated',
    category: 'Operational',
    date: '2026-05-26',
    location: 'Maiduguri, Borno State',
    summary: 'State coordination actors and GBV partners validated standard operating procedures for safe, survivor-centred care and referral.',
    body: 'FRAD joined UN agencies, public institutions, and local organisations in the validation workshop for the Borno State GBV Standard Operating Procedures. The procedures set out coordinated and confidential pathways for referral, counselling, and legal support across Jere, MMC, and Gwoza.',
    featuredImage: '/images/frad-programme-outreach.jpg',
    pressRelease: true
  },
  {
    id: 'stabilization-center',
    slug: 'stabilization-center',
    title: 'Maternal and child stabilisation centre commissioned',
    category: 'Programmes',
    date: '2026-05-07',
    location: 'Nganaram Bulabulin, Borno State',
    summary: 'An expanded stabilisation ward will strengthen clinical care for children experiencing severe acute malnutrition with medical complications.',
    body: 'With funding from NHF/OCHA, the stabilisation centre expands local treatment capacity by 15 beds. Maternal health counselling, MUAC screening, and referral services are integrated to support children and caregivers during treatment and after discharge.',
    featuredImage: '/images/frad-field-hero.jpg',
    pressRelease: false
  }
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 'annual-report-2025',
    slug: 'annual-report-2025',
    title: 'FRAD Foundation Annual Report 2025',
    reportType: 'annual',
    year: '2025',
    summary: 'An annual review of FRAD programmes, partnerships, organisational development, and financial performance.',
    datePublished: '2026-01-15',
    coverImage: '/images/frad-logo.jpg'
  },
  {
    id: 'rapid-wash-needs-2026',
    slug: 'rapid-wash-needs-2026',
    title: 'Rapid WASH & Security Needs Assessment Gwoza',
    reportType: 'assessment',
    year: '2026',
    summary: 'Field assessment detailing water scarcity levels, security constraints on infrastructure, and priority community actions.',
    datePublished: '2026-03-10',
    coverImage: '/images/frad-water-access.jpg'
  }
];

export const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: 'localization-displacement-brief',
    slug: 'localization-displacement-brief',
    title: 'Localization of Humanitarian Leadership in Displacement Contexts',
    publicationType: 'policy-brief',
    authors: ['FRAD MEAL & Policy Team'],
    year: '2026',
    abstract: 'This policy brief draws on programme learning from Jere and Gwoza to examine the role of community leadership in WASH and protection programmes.',
    citation: 'FRAD Foundation Policy Brief Series, No. 3 (2026)',
    datePublished: '2026-04-01',
    coverImage: '/images/frad-programme-outreach.jpg'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'health-nutrition-coordinator',
    slug: 'health-nutrition-coordinator',
    title: 'Health & Nutrition Coordinator',
    department: 'Programmes',
    location: 'Maiduguri, Borno State',
    employmentType: 'full-time',
    deadline: '2026-08-30',
    summary: 'The Health and Nutrition Coordinator leads programme quality, supervises mobile health teams, and coordinates with public health authorities and partners.',
    responsibilities: [
      'Oversee implementation of CMAM outreach and OTP nutrition operations.',
      'Coordinate with Jere and MMC local health authorities.',
      'Supervise MUAC screening and therapeutic food distribution records.',
      'Ensure safeguarding and confidentiality metrics are met in clinical settings.'
    ],
    requirements: [
      'Degree in Medicine, Public Health, Nursing, or related nutrition field.',
      'Minimum 4 years managing nutrition and health programmes in humanitarian settings.',
      'Deep understanding of Borno Jere/MMC local context and language.',
      'Proven donor compliance experience with NHF or UN agencies.'
    ],
    howToApply: 'Send your CV and a 1-page cover letter detailing your Jere/MMC coordination experience to careers@fradfoundation.org with the subject line: HNC-2026-MDG.',
    status: 'open',
    datePosted: '2026-07-01'
  },
  {
    id: 'meal-officer',
    slug: 'meal-officer',
    title: 'Monitoring, Evaluation, Accountability & Learning (MEAL) Officer',
    department: 'Operations',
    location: 'Damaturu, Yobe State',
    employmentType: 'full-time',
    deadline: '2026-09-15',
    summary: 'The MEAL Officer supports programme monitoring, community feedback, data quality, learning, and reporting across FRAD activities.',
    responsibilities: [
      'Manage Jere/MMC community toll-free feedback database registries.',
      'Conduct post-distribution monitoring and collect participant stories.',
      'Verify results data and report stats against indicators.',
      'Ensure protection policies and consent records are strictly filed.'
    ],
    requirements: [
      'Degree in Statistics, Social Sciences, Computer Science, or MEAL related fields.',
      'Minimum 2 years experience running MEAL systems in Northeast Nigeria.',
      'Proficiency in KoboToolbox, ODK, and digital data validation tools.',
      'Commitment to AAP principles and safeguarding desk systems.'
    ],
    howToApply: 'Submit your application package online at careers@fradfoundation.org referencing MEAL-YOB-2026.',
    status: 'open',
    datePosted: '2026-07-05'
  }
];

export const MOCK_PARTNERS: Partner[] = [
  { id: 'nhf', name: 'Nigeria Humanitarian Fund (NHF)', partnerType: 'donor', activePast: 'active', approvedToDisplay: true },
  { id: 'unops', name: 'UNOPS', partnerType: 'un-agency', activePast: 'active', approvedToDisplay: true },
  { id: 'gsf', name: 'Global Survivors Fund', partnerType: 'donor', activePast: 'active', approvedToDisplay: true },
  { id: 'sci', name: 'Save the Children', partnerType: 'ingo', activePast: 'active', approvedToDisplay: true },
  { id: 'nrc', name: 'Norwegian Refugee Council', partnerType: 'ingo', activePast: 'active', approvedToDisplay: true }
];

export const MOCK_LOCATIONS: Location[] = [
  { id: 'maiduguri-hq', region: 'Maiduguri HQ', state: 'Borno State', officeType: 'Headquarters', sectorsActive: ['All'], securitySensitive: false, displayPublicly: true },
  { id: 'damaturu-office', region: 'Damaturu Office', state: 'Yobe State', officeType: 'Sub-Office', sectorsActive: ['WASH', 'Nutrition & Health'], securitySensitive: false, displayPublicly: true },
  { id: 'northwest-office', region: 'Northwest Base', state: 'Zamfara State', officeType: 'Field Base', sectorsActive: ['Protection & GBV', 'Livelihoods'], securitySensitive: false, displayPublicly: true }
];

export const MOCK_MEDIA: MediaAsset[] = [
  { id: 'media-water', title: 'Solar Borehole Gwoza', mediaType: 'image', image: '/images/frad-water-access.jpg', caption: 'Deep hybrid borehole commissioning in Borno State.', location: 'Gwoza LGA', sector: 'WASH', consentStatus: 'approved', publicSafe: true, featuredOnHomepage: true },
  { id: 'media-outreach', title: 'Community Outreach', mediaType: 'image', image: '/images/frad-programme-outreach.jpg', caption: 'Staff reviewing protection charters with community leaders.', location: 'Maiduguri', sector: 'Protection', consentStatus: 'approved', publicSafe: true, featuredOnHomepage: true }
];

export const MOCK_ALERTS: EmergencyAlert[] = [];

export const MOCK_IMPACT_STATS: ImpactStat[] = [
  {
    id: 'stat-founded',
    number: '2019',
    label: 'Founded and registered in Nigeria',
    period: 'Since inception',
    source: '/about',
    showOnHomepage: true,
    showOnImpactPage: true,
    approved: true,
  },
  {
    id: 'stat-sectors',
    number: '8',
    label: 'Integrated programme areas',
    period: 'Current',
    source: '/what-we-do',
    showOnHomepage: true,
    showOnImpactPage: true,
    approved: true,
  },
  {
    id: 'stat-regions',
    number: '3',
    label: 'Operating regions across Nigeria',
    period: 'Current',
    source: '/where-we-work',
    showOnHomepage: true,
    showOnImpactPage: true,
    approved: true,
  },
  {
    id: 'stat-leadership',
    number: '100%',
    label: 'Nigerian-led and community-rooted',
    period: 'Current',
    source: '/about/governance',
    showOnHomepage: true,
    showOnImpactPage: true,
    approved: true,
  },
];
