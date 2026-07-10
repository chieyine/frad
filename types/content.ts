/* ============================================================
   FRAD Foundation Content Type Definitions
   Maps to WordPress Custom Post Types (README section 32)
   ============================================================ */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ImpactStat {
  id: string;
  number: string;
  label: string;
  period?: string;
  sector?: string;
  location?: string;
  source?: string;
  showOnHomepage: boolean;
  showOnImpactPage: boolean;
  approved: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  status: 'active' | 'completed' | 'planned';
  donor?: string;
  location: string;
  sectors: string[];
  startDate: string;
  endDate?: string;
  targetPopulation?: string;
  summary: string;
  problemStatement?: string;
  fradResponse?: string;
  keyActivities?: string[];
  results?: string[];
  featuredImage?: string;
  photos?: string[];
  featuredOnHomepage: boolean;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  storyType: 'field' | 'community' | 'staff' | 'photo-essay';
  sector?: string;
  location?: string;
  date: string;
  consentStatus: 'consented' | 'pending';
  namePseudonym?: string;
  summary: string;
  fullStory: string;
  featuredImage?: string;
  photos?: string[];
  relatedProject?: string;
  featuredOnHomepage: boolean;
  protectionSensitive: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  location?: string;
  summary: string;
  body: string;
  featuredImage?: string;
  relatedProject?: string;
  relatedSector?: string;
  pressRelease: boolean;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract';
  duration?: string;
  deadline: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  howToApply: string;
  applicationLink?: string;
  status: 'open' | 'closed';
  pdfAttachment?: string;
  datePosted: string;
}

export interface Consultancy {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration?: string;
  deadline: string;
  torSummary: string;
  scopeOfWork?: string;
  deliverables?: string[];
  eligibility?: string;
  howToApply: string;
  pdfAttachment?: string;
  status: 'open' | 'closed';
}

export interface Publication {
  id: string;
  slug: string;
  title: string;
  publicationType: 'report' | 'research' | 'assessment' | 'policy-brief' | 'annual-report';
  authors?: string[];
  year: string;
  abstract?: string;
  sector?: string;
  location?: string;
  keywords?: string[];
  pdfUrl?: string;
  coverImage?: string;
  citation?: string;
  relatedProject?: string;
  datePublished: string;
}

export interface Partner {
  id: string;
  name: string;
  partnerType: 'donor' | 'un-agency' | 'government' | 'ingo' | 'nngo' | 'technical' | 'private-sector' | 'network';
  logo?: string;
  website?: string;
  activePast: 'active' | 'past';
  approvedToDisplay: boolean;
  relatedProjects?: string[];
  description?: string;
}

export interface Location {
  id: string;
  region: string;
  state: string;
  lga?: string;
  officeType?: string;
  sectorsActive?: string[];
  description?: string;
  coordinates?: { lat: number; lng: number };
  securitySensitive: boolean;
  displayPublicly: boolean;
}

export interface Sector {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon?: string;
  featuredImage?: string;
  keyActivities?: string[];
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  reportType: 'annual' | 'project' | 'situation' | 'assessment' | 'evaluation' | 'policy' | 'audit';
  year: string;
  donor?: string;
  sector?: string;
  location?: string;
  summary?: string;
  pdfUrl?: string;
  coverImage?: string;
  relatedProject?: string;
  datePublished: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  mediaType: 'image' | 'video';
  image?: string;
  videoUrl?: string;
  alt?: string;
  caption?: string;
  location?: string;
  sector?: string;
  consentStatus: 'approved' | 'pending';
  publicSafe: boolean;
  duration?: string;
  dateCaptured?: string;
  featuredOnHomepage: boolean;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  summary?: string;
  pdfUrl?: string;
  year: string;
  displayPublicly: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  reason: 'partnership' | 'donation' | 'media' | 'career' | 'complaint' | 'safeguarding' | 'general';
  message: string;
  consent: boolean;
}
