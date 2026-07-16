import type { IconName } from '@/components/ui/Icon';

export const SITE_NAME = 'FRAD Foundation';
export const SITE_DESCRIPTION =
  'FRAD Foundation is a Nigerian humanitarian and development organisation supporting crisis-affected communities across Northeast and Northwest Nigeria through nutrition, health, WASH, protection, education, livelihoods, peacebuilding, and emergency response.';
export const SITE_URL = 'https://fradfoundation.org';

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const NAV_ITEMS: NavLink[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About FRAD', href: '/about' },
      { label: 'Mission, Vision & Values', href: '/about/mission-vision-values' },
      { label: 'Governance', href: '/about/governance' },
      { label: 'Our Approach', href: '/about/our-approach' },
      { label: 'Accountability & Safeguarding', href: '/about/accountability' },
    ],
  },
  {
    label: 'Where We Work',
    href: '/where-we-work',
    children: [
      { label: 'Overview', href: '/where-we-work' },
      { label: 'Northeast Nigeria', href: '/where-we-work/northeast' },
      { label: 'Northwest Nigeria', href: '/where-we-work/northwest' },
      { label: 'Abuja Coordination', href: '/where-we-work/abuja' },
    ],
  },
  {
    label: 'What We Do',
    href: '/what-we-do',
    children: [
      { label: 'Programme Overview', href: '/what-we-do' },
      { label: 'Nutrition & Health', href: '/what-we-do/nutrition-health' },
      { label: 'WASH', href: '/what-we-do/wash' },
      { label: 'Protection & GBV', href: '/what-we-do/protection-gbv' },
      { label: 'Education', href: '/what-we-do/education' },
      { label: 'Livelihoods & Resilience', href: '/what-we-do/livelihoods-resilience' },
      { label: 'Peacebuilding & Social Cohesion', href: '/what-we-do/peacebuilding-social-cohesion' },
      { label: 'Emergency Response', href: '/what-we-do/emergency-response' },
      { label: 'Innovation & Digital Systems', href: '/what-we-do/innovation-digital-systems' },
    ],
  },
  {
    label: 'Impact',
    href: '/impact',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Publications',
    href: '/publications',
    children: [
      { label: 'All Publications', href: '/publications' },
      { label: 'Reports', href: '/publications/reports' },
      { label: 'Research', href: '/publications/research' },
      { label: 'Policy Briefs', href: '/publications/policy-briefs' },
      { label: 'Annual Reports', href: '/publications/annual-reports' },
    ],
  },
  {
    label: 'Careers',
    href: '/careers',
    children: [
      { label: 'Careers Hub', href: '/careers' },
      { label: 'Jobs', href: '/careers/jobs' },
      { label: 'Consultancies', href: '/careers/consultancies' },
      { label: 'Internships', href: '/careers/internships' },
    ],
  },
  {
    label: 'Partner With Us',
    href: '/partners',
  },
];

export const SECONDARY_NAV = [
  { label: 'Stories', href: '/stories' },
  { label: 'News', href: '/news' },
  { label: 'Media', href: '/media' },
  { label: 'Reports', href: '/reports' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: 'https://erp.fradfoundation.org' },
];

export const SECTORS: Array<{ title: string; slug: string; description: string; icon: IconName }> = [
  {
    title: 'Nutrition & Health',
    slug: 'nutrition-health',
    description: 'Community nutrition screening, referral, maternal nutrition, health education, and PHC linkages.',
    icon: 'heart-pulse',
  },
  {
    title: 'WASH',
    slug: 'wash',
    description: 'Safe water, sanitation, hygiene promotion, cholera prevention, and community engagement.',
    icon: 'droplet',
  },
  {
    title: 'Protection & GBV',
    slug: 'protection-gbv',
    description: 'GBV risk mitigation, safe referral, community awareness, and services that protect the rights and dignity of women and girls.',
    icon: 'shield',
  },
  {
    title: 'Education',
    slug: 'education',
    description: 'Education in emergencies, safe learning, teaching materials, and community mobilisation.',
    icon: 'book-open',
  },
  {
    title: 'Livelihoods & Resilience',
    slug: 'livelihoods-resilience',
    description: 'Skills, household resilience, food security, women and youth empowerment, and savings groups.',
    icon: 'sprout',
  },
  {
    title: 'Peacebuilding & Social Cohesion',
    slug: 'peacebuilding-social-cohesion',
    description: 'Dialogue, community peace structures, youth engagement, and conflict sensitivity.',
    icon: 'rings',
  },
  {
    title: 'Emergency Response',
    slug: 'emergency-response',
    description: 'Rapid needs assessment, emergency WASH, nutrition screening, NFI support, and coordination.',
    icon: 'zap',
  },
  {
    title: 'Innovation & Digital Systems',
    slug: 'innovation-digital-systems',
    description: 'Digital data collection, offline-first field tools, reporting dashboards, and responsible data use.',
    icon: 'cpu',
  },
];

/* Public focus areas and delivery notes per sector, shared by the sector
   explorer dashboard and the sector detail pages. */
export const SECTOR_DETAILS: Record<string, { focus: string[]; note: string }> = {
  'nutrition-health': {
    focus: ['Community screening', 'Referral pathways', 'Maternal and child nutrition', 'PHC linkages'],
    note: 'Community-based management of acute malnutrition, infant and young child feeding, and support to primary health facilities.',
  },
  wash: {
    focus: ['Safe water', 'Sanitation', 'Hygiene promotion', 'Cholera preparedness'],
    note: 'Water access, sanitation, and hygiene promotion designed and maintained with the communities who use them.',
  },
  'protection-gbv': {
    focus: ['GBV risk mitigation', 'Safe referral', 'Community awareness', 'AAP'],
    note: 'Survivor-centred protection work with confidential referral pathways and community-led risk mitigation.',
  },
  education: {
    focus: ['Education in emergencies', 'Safe learning', 'Learning materials', 'Community mobilisation'],
    note: 'Safe learning spaces, teaching and learning materials, and community mobilisation for children in crisis.',
  },
  'livelihoods-resilience': {
    focus: ['Household resilience', 'Food security', 'Skills support', 'Women and youth empowerment'],
    note: 'Skills, savings groups, and household support that help families recover income and absorb future shocks.',
  },
  'peacebuilding-social-cohesion': {
    focus: ['Dialogue', 'Peace structures', 'Youth engagement', 'Conflict sensitivity'],
    note: 'Community dialogue and youth-led peace structures, delivered with conflict sensitivity across all programmes.',
  },
  'emergency-response': {
    focus: ['Rapid assessment', 'Emergency WASH', 'Nutrition screening', 'NFI support'],
    note: 'Rapid needs assessment and first-line response, coordinated with government and humanitarian partners.',
  },
  'innovation-digital-systems': {
    focus: ['Data collection', 'Offline-first tools', 'Programme quality', 'Responsible data'],
    note: 'Offline-first digital data collection and reporting systems, built around responsible data practice.',
  },
};

export const IDENTITY_CARDS = [
  { title: 'Nigerian-led', description: 'Founded and led by Nigerians with experience of the communities and contexts where we work.', icon: 'flag' },
  { title: 'Community-centred', description: 'Listening to communities and involving them in decisions throughout each programme.', icon: 'users' },
  { title: 'Present and responsive', description: 'Working close to communities so programmes can respond to changing needs.', icon: 'map-pin' },
  { title: 'Partnership-driven', description: 'Working with public institutions, donors, humanitarian organisations, and civil society.', icon: 'link' },
] as const;

export const FOOTER_LINKS = {
  about: [
    { label: 'About FRAD', href: '/about' },
    { label: 'Mission & Vision', href: '/about/mission-vision-values' },
    { label: 'Governance', href: '/about/governance' },
    { label: 'Accountability', href: '/about/accountability' },
  ],
  programmes: [
    { label: 'Nutrition & Health', href: '/what-we-do/nutrition-health' },
    { label: 'WASH', href: '/what-we-do/wash' },
    { label: 'Protection & GBV', href: '/what-we-do/protection-gbv' },
    { label: 'Education', href: '/what-we-do/education' },
    { label: 'Emergency Response', href: '/what-we-do/emergency-response' },
  ],
  resources: [
    { label: 'Donor Hub', href: '/donors' },
    { label: 'Due Diligence', href: '/donors/due-diligence' },
    { label: 'Financial Accountability', href: '/financial-accountability' },
    { label: 'Projects', href: '/projects' },
    { label: 'Publications', href: '/publications' },
    { label: 'Reports', href: '/reports' },
    { label: 'Media Library', href: '/media' },
    { label: 'Careers', href: '/careers' },
    { label: 'Stories', href: '/stories' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    { label: 'Partner With Us', href: '/partners' },
    { label: 'Donate', href: '/donate' },
    { label: 'News', href: '/news' },
    { label: 'Press Desk', href: '/press' },
    { label: 'Safeguarding', href: '/safeguarding' },
    { label: 'Login', href: 'https://erp.fradfoundation.org' },
  ],
};
