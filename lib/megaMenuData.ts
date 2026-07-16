export interface MegaSubItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaSection {
  title: string;
  href: string;
  items: MegaSubItem[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  description: string;
  sections: MegaSection[];
}

export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
    description: 'Who FRAD is, how we are governed, and where we work.',
    sections: [
      {
        title: 'Organization',
        href: '/about',
        items: [
          { label: 'About FRAD', href: '/about', description: 'Our identity and institutional profile.' },
          { label: 'Mission, Vision & Values', href: '/about/mission-vision-values' },
          { label: 'Governance & Leadership', href: '/about/governance' },
          { label: 'Approach & Accountability', href: '/about/accountability' },
        ],
      },
      {
        title: 'Locations',
        href: '/where-we-work',
        items: [
          { label: 'Operational Overview', href: '/where-we-work' },
          { label: 'Northeast Nigeria', href: '/where-we-work/northeast' },
          { label: 'Northwest Nigeria', href: '/where-we-work/northwest' },
          { label: 'Abuja Coordination', href: '/where-we-work/abuja' },
        ],
      },
    ],
  },
  {
    id: 'our-work',
    label: 'Our Work',
    href: '/what-we-do',
    description: 'Eight connected programme areas spanning response and recovery.',
    sections: [
      {
        title: 'Humanitarian Response',
        href: '/what-we-do',
        items: [
          { label: 'Nutrition & Primary Health', href: '/what-we-do/nutrition-health' },
          { label: 'WASH Services', href: '/what-we-do/wash' },
          { label: 'Protection & GBV', href: '/what-we-do/protection-gbv' },
          { label: 'Emergency Response', href: '/what-we-do/emergency-response' },
        ],
      },
      {
        title: 'Recovery & Resilience',
        href: '/what-we-do',
        items: [
          { label: 'Education in Emergencies', href: '/what-we-do/education' },
          { label: 'Livelihoods & Food Security', href: '/what-we-do/livelihoods-resilience' },
          { label: 'Peacebuilding & Social Cohesion', href: '/what-we-do/peacebuilding-social-cohesion' },
          { label: 'Innovation & Digital Systems', href: '/what-we-do/innovation-digital-systems' },
        ],
      },
    ],
  },
  {
    id: 'evidence',
    label: 'Evidence',
    href: '/impact',
    description: 'Results, project records, reporting, and learning products.',
    sections: [
      {
        title: 'Results & Records',
        href: '/impact',
        items: [
          { label: 'Impact', href: '/impact' },
          { label: 'Projects', href: '/projects' },
          { label: 'Stories', href: '/stories' },
          { label: 'News', href: '/news' },
        ],
      },
      {
        title: 'Reports & Learning',
        href: '/publications',
        items: [
          { label: 'Publications', href: '/publications' },
          { label: 'Operational Reports', href: '/publications/reports' },
          { label: 'Research', href: '/publications/research' },
          { label: 'Annual Reports & Financials', href: '/publications/annual-reports', badge: 'Audited' },
        ],
      },
    ],
  },
  {
    id: 'donors',
    label: 'Donors',
    href: '/donors',
    description: 'Partnership pathways, due diligence, and financial accountability.',
    sections: [
      {
        title: 'Partner With FRAD',
        href: '/donors',
        items: [
          { label: 'Donor & Partner Hub', href: '/donors', badge: 'Start here' },
          { label: 'Due-Diligence Room', href: '/donors/due-diligence' },
          { label: 'Financial Accountability', href: '/financial-accountability' },
          { label: 'Our Partners', href: '/partners' },
        ],
      },
      {
        title: 'Funding & Contact',
        href: '/donate',
        items: [
          { label: 'Donate', href: '/donate' },
          { label: 'Fund a Project', href: '/projects' },
          { label: 'Review Reports', href: '/publications/annual-reports' },
          { label: 'Contact the Donor Desk', href: '/contact' },
        ],
      },
    ],
  },
  {
    id: 'connect',
    label: 'Connect',
    href: '/contact',
    description: 'Careers, enquiries, safeguarding, and public information.',
    sections: [
      {
        title: 'Work With Us',
        href: '/careers',
        items: [
          { label: 'Careers Hub', href: '/careers' },
          { label: 'Job Openings', href: '/careers/jobs' },
          { label: 'Consultancies', href: '/careers/consultancies' },
          { label: 'Internships', href: '/careers/internships' },
        ],
      },
      {
        title: 'Contact & Public Trust',
        href: '/contact',
        items: [
          { label: 'Contact FRAD', href: '/contact' },
          { label: 'Safeguarding Desk', href: '/safeguarding', badge: 'Confidential' },
          { label: 'Press & Media', href: '/press' },
          { label: 'Privacy', href: '/privacy' },
        ],
      },
    ],
  },
];
