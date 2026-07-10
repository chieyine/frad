export interface MegaSubItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaSection {
  title?: string;
  items: MegaSubItem[];
}

export interface MegaFeaturedCard {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  sections?: MegaSection[];
  featuredCard?: MegaFeaturedCard;
}

export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: 'who-we-are',
    label: 'About',
    href: '/about',
    sections: [
      {
        title: 'FRAD Foundation',
        items: [
          {
            label: 'About FRAD Foundation',
            href: '/about',
            description: 'A Nigerian-led humanitarian and development organization.',
          },
          {
            label: 'Mission, Vision & Values',
            href: '/about/mission-vision-values',
            description: 'The purpose, principles, and values guiding our work.',
          },
          {
            label: 'Governance & Leadership',
            href: '/about/governance',
            description: 'How FRAD is led, governed, and held accountable.',
          },
          {
            label: 'Safeguarding & PSEA Charter',
            href: '/about/accountability',
            badge: 'PSEA / AAP',
            description: 'Confidential reporting, community feedback, and protection commitments.',
          },
        ],
      },
      {
        title: 'Where We Work',
        items: [
          {
            label: 'Operational Overview',
            href: '/where-we-work',
            description: 'Public-safe view of FRAD presence across Nigeria.',
          },
          {
            label: 'Northeast Nigeria (BAY States)',
            href: '/where-we-work/northeast',
            badge: 'Frontline',
            description: 'Humanitarian response across Borno, Adamawa, and Yobe.',
          },
          {
            label: 'Northwest Nigeria Operations',
            href: '/where-we-work/northwest',
            description: 'Community support in a growing response corridor.',
          },
          {
            label: 'Abuja National Coordination',
            href: '/where-we-work/abuja',
            description: 'Partnerships, compliance, and national representation.',
          },
        ],
      },
    ],
    featuredCard: {
      eyebrow: 'About FRAD',
      title: 'Nigerian-led. Field-rooted. Accountable.',
      description: "Understand FRAD's leadership, footprint, and commitments to the communities we serve.",
      ctaLabel: 'Read about FRAD',
      ctaHref: '/about',
    },
  },
  {
    id: 'what-we-do',
    label: 'What We Do',
    href: '/what-we-do',
    sections: [
      {
        title: 'Emergency and Essential Services',
        items: [
          {
            label: 'Integrated Programme Overview',
            href: '/what-we-do',
            description: 'How FRAD connects urgent response with longer-term recovery.',
          },
          {
            label: 'Nutrition & Primary Health',
            href: '/what-we-do/nutrition-health',
            badge: 'Core Sector',
            description: 'Nutrition screening, referral pathways, and health linkages.',
          },
          {
            label: 'WASH Services',
            href: '/what-we-do/wash',
            description: 'Safe water, sanitation, hygiene promotion, and cholera readiness.',
          },
          {
            label: 'Protection & GBV Case Management',
            href: '/what-we-do/protection-gbv',
            description: 'Risk reduction, safe referral, dignity, and community awareness.',
          },
          {
            label: 'Emergency Response Mechanisms',
            href: '/what-we-do/emergency-response',
            badge: 'Rapid Dispatch',
            description: 'Rapid assessment and first-line support during emergencies.',
          },
        ],
      },
      {
        title: 'Recovery and Resilience',
        items: [
          {
            label: 'Education in Emergencies (EiE)',
            href: '/what-we-do/education',
            description: 'Safe learning, materials, and community mobilisation.',
          },
          {
            label: 'Livelihoods & Food Security',
            href: '/what-we-do/livelihoods-resilience',
            description: 'Skills, household resilience, and food security support.',
          },
          {
            label: 'Peacebuilding & Social Cohesion',
            href: '/what-we-do/peacebuilding-social-cohesion',
            description: 'Community dialogue, dispute mediation, and social recovery.',
          },
          {
            label: 'Innovation & Digital MEAL Systems',
            href: '/what-we-do/innovation-digital-systems',
            description: 'Responsible data, field tools, and programme quality systems.',
          },
        ],
      },
    ],
    featuredCard: {
      eyebrow: 'Programme model',
      title: 'Eight connected programme areas',
      description: 'See how FRAD brings technical sectors together around community needs.',
      ctaLabel: 'View programme areas',
      ctaHref: '/what-we-do',
    },
  },
  {
    id: 'impact-research',
    label: 'Evidence',
    href: '/impact',
    sections: [
      {
        title: 'Proof of Work',
        items: [
          {
            label: 'Impact',
            href: '/impact',
            badge: 'Sources',
            description: 'Impact figures with period, context, and source discipline.',
          },
          {
            label: 'Projects',
            href: '/projects',
            description: 'Project records with sectors, status, and evidence.',
          },
          {
            label: 'Stories',
            href: '/stories',
            description: 'Dignity-centred stories published with consent and care.',
          },
          {
            label: 'News',
            href: '/news',
            description: 'Official updates, field notes, and public statements.',
          },
        ],
      },
      {
        title: 'Reports and Learning',
        items: [
          {
            label: 'All Publications & Reports',
            href: '/publications',
            description: 'Reports, assessments, policy briefs, and learning products.',
          },
          {
            label: 'Operational & Situation Reports',
            href: '/publications/reports',
            description: 'Field assessments, situation reports, and project reporting.',
          },
          {
            label: 'Frontline Participatory Research',
            href: '/publications/research',
            description: 'Research and learning from FRAD programme contexts.',
          },
          {
            label: 'Audited Annual Reports & Financials',
            href: '/publications/annual-reports',
            badge: 'Audited',
            description: 'Annual reporting and institutional accountability documents.',
          },
        ],
      },
    ],
    featuredCard: {
      eyebrow: 'Evidence library',
      title: 'Reports, stories, and project records',
      description: "Explore the documents and public records that support FRAD's work.",
      ctaLabel: 'Open evidence library',
      ctaHref: '/publications/annual-reports',
    },
  },
  {
    id: 'work-with-us',
    label: 'Work With Us',
    href: '/contact',
    sections: [
      {
        title: 'Careers',
        items: [
          {
            label: 'Careers Hub & Working Culture',
            href: '/careers',
            description: 'Open roles, working culture, and recruitment guidance.',
          },
          {
            label: 'Staff Job Openings',
            href: '/careers/jobs',
            description: 'Current programme, technical, and support roles.',
          },
          {
            label: 'Consultancies & Expert Rosters',
            href: '/careers/consultancies',
            description: 'Specialist assignments and short-term terms of reference.',
          },
          {
            label: 'Internships & Fellowship Pathway',
            href: '/careers/internships',
            description: 'Entry-level opportunities for early-career talent.',
          },
        ],
      },
      {
        title: 'Institutional Engagement',
        items: [
          {
            label: 'Partner With FRAD Foundation',
            href: '/partners',
            badge: 'Institutional',
            description: 'Partnership routes for donors, agencies, and technical actors.',
          },
          {
            label: 'Safeguarding & PSEA Reporting Desk',
            href: '/contact#safeguarding',
            badge: 'Confidential',
            description: 'Confidential channel to report safeguarding concerns or misconduct.',
          },
          {
            label: 'General Offices & Headquarters',
            href: '/contact',
            description: 'Contact FRAD for partnership, media, and general enquiries.',
          },
        ],
      },
    ],
    featuredCard: {
      eyebrow: 'Confidential Channel',
      title: 'Safeguarding & PSEA Reporting',
      description: 'We enforce zero tolerance for sexual exploitation and abuse. All reports are strictly confidential.',
      ctaLabel: 'Contact the safeguarding desk',
      ctaHref: '/contact',
    },
  },
];
