import type { Job, Location, MediaAsset, NewsItem, Partner, Project, Publication, Report, Story } from '@/types/content';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 60
): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error('WORDPRESS_API_URL is missing.');
  }

  const res = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  return json.data;
}

export function isWordPressConfigured() {
  return Boolean(WORDPRESS_API_URL);
}

export interface WordPressContentSlot {
  key: string;
  headline?: string;
  subtext?: string;
  eyebrow?: string;
  caption?: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface RawWordPressContentSlot extends Omit<WordPressContentSlot, 'image'> {
  image?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

type RawImage = {
  node?: {
    sourceUrl?: string;
    altText?: string;
  };
};

type RawNode<T> = {
  id?: string;
  slug?: string;
  title?: string;
} & T;

function imageUrl(image?: RawImage | string): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  return image.node?.sourceUrl;
}

function imageAlt(image?: RawImage): string | undefined {
  return image?.node?.altText;
}

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function nodes<T>(value?: T[]): T[] {
  return value ?? [];
}

async function safeGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 120
): Promise<T | null> {
  if (!isWordPressConfigured()) {
    return null;
  }

  try {
    return await fetchGraphQL<T>(query, variables, revalidate);
  } catch (error) {
    console.error('WordPress content fetch failed:', error);
    return null;
  }
}

export async function fetchContentSlot(key: string, revalidate = 300): Promise<WordPressContentSlot | null> {
  if (!isWordPressConfigured()) {
    return null;
  }

  const data = await fetchGraphQL<{
    fradContentSlots?: {
      nodes: Array<{
        contentSlotFields?: RawWordPressContentSlot;
      }>;
    };
  }>(
    QUERIES.contentSlot,
    { key },
    revalidate
  );

  const slot = data.fradContentSlots?.nodes[0]?.contentSlotFields;

  if (!slot) {
    return null;
  }

  return {
    ...slot,
    image: slot.image?.node
      ? {
          sourceUrl: slot.image.node.sourceUrl,
          altText: slot.image.node.altText,
        }
      : undefined,
  };
}

export async function fetchProjects(limit = 12): Promise<Project[]> {
  const data = await safeGraphQL<{
    fradProjects?: {
      nodes: Array<RawNode<{
        projectFields?: {
          status?: Project['status'];
          donor?: string;
          location?: string;
          sectors?: string[];
          startDate?: string;
          endDate?: string;
          targetPopulation?: string;
          summary?: string;
          problemStatement?: string;
          fradResponse?: string;
          keyActivities?: string[];
          results?: string[];
          featuredImage?: RawImage;
          photos?: Array<{ image?: RawImage }>;
          featuredOnHomepage?: boolean;
        };
      }>>;
    };
  }>(QUERIES.projects, { first: limit }, 180);

  return nodes(data?.fradProjects?.nodes).map((node) => {
    const fields = node.projectFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'project',
      slug: node.slug ?? '',
      title: node.title ?? 'FRAD project record',
      status: fields.status ?? 'planned',
      donor: fields.donor,
      location: fields.location ?? 'Public-safe location',
      sectors: list<string>(fields.sectors),
      startDate: fields.startDate ?? '',
      endDate: fields.endDate,
      targetPopulation: fields.targetPopulation,
      summary: fields.summary ?? 'Project information is documented through FRAD programme reporting.',
      problemStatement: fields.problemStatement,
      fradResponse: fields.fradResponse,
      keyActivities: list<string>(fields.keyActivities),
      results: list<string>(fields.results),
      featuredImage: imageUrl(fields.featuredImage),
      photos: list<{ image?: RawImage }>(fields.photos).map((photo) => imageUrl(photo.image)).filter(Boolean) as string[],
      featuredOnHomepage: Boolean(fields.featuredOnHomepage),
    };
  });
}

export async function fetchStories(limit = 12): Promise<Story[]> {
  const data = await safeGraphQL<{
    fradStories?: {
      nodes: Array<RawNode<{
        storyFields?: {
          storyType?: Story['storyType'];
          sector?: string;
          location?: string;
          date?: string;
          consentStatus?: Story['consentStatus'];
          namePseudonym?: string;
          summary?: string;
          fullStory?: string;
          featuredImage?: RawImage;
          photos?: Array<{ image?: RawImage }>;
          relatedProject?: string;
          featuredOnHomepage?: boolean;
          protectionSensitive?: boolean;
        };
      }>>;
    };
  }>(QUERIES.stories, { first: limit }, 180);

  return nodes(data?.fradStories?.nodes).map((node) => {
    const fields = node.storyFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'story',
      slug: node.slug ?? '',
      title: node.title ?? 'FRAD field story',
      storyType: fields.storyType ?? 'field',
      sector: fields.sector,
      location: fields.location,
      date: fields.date ?? '',
      consentStatus: fields.consentStatus ?? 'pending',
      namePseudonym: fields.namePseudonym,
      summary: fields.summary ?? 'Story information is shared with consent, protection, and dignity safeguards.',
      fullStory: fields.fullStory ?? '',
      featuredImage: imageUrl(fields.featuredImage),
      photos: list<{ image?: RawImage }>(fields.photos).map((photo) => imageUrl(photo.image)).filter(Boolean) as string[],
      relatedProject: fields.relatedProject,
      featuredOnHomepage: Boolean(fields.featuredOnHomepage),
      protectionSensitive: Boolean(fields.protectionSensitive),
    };
  });
}

export async function fetchNews(limit = 12): Promise<NewsItem[]> {
  const data = await safeGraphQL<{
    fradNewsItems?: {
      nodes: Array<RawNode<{
        newsFields?: {
          category?: string;
          date?: string;
          location?: string;
          summary?: string;
          body?: string;
          featuredImage?: RawImage;
          relatedProject?: string;
          relatedSector?: string;
          pressRelease?: boolean;
        };
      }>>;
    };
  }>(QUERIES.news, { first: limit }, 180);

  return nodes(data?.fradNewsItems?.nodes).map((node) => {
    const fields = node.newsFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'news',
      slug: node.slug ?? '',
      title: node.title ?? 'FRAD update',
      category: fields.category ?? 'Update',
      date: fields.date ?? '',
      location: fields.location,
      summary: fields.summary ?? 'Official update from FRAD Foundation communications.',
      body: fields.body ?? '',
      featuredImage: imageUrl(fields.featuredImage),
      relatedProject: fields.relatedProject,
      relatedSector: fields.relatedSector,
      pressRelease: Boolean(fields.pressRelease),
    };
  });
}

export async function fetchReports(limit = 12): Promise<Report[]> {
  const data = await safeGraphQL<{
    fradReports?: {
      nodes: Array<RawNode<{
        reportFields?: {
          reportType?: Report['reportType'];
          year?: string;
          donor?: string;
          sector?: string;
          location?: string;
          summary?: string;
          pdfUrl?: string;
          coverImage?: RawImage;
          relatedProject?: string;
          datePublished?: string;
        };
      }>>;
    };
  }>(QUERIES.reports, { first: limit }, 180);

  return nodes(data?.fradReports?.nodes).map((node) => {
    const fields = node.reportFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'report',
      slug: node.slug ?? '',
      title: node.title ?? 'FRAD report',
      reportType: fields.reportType ?? 'project',
      year: fields.year ?? '',
      donor: fields.donor,
      sector: fields.sector,
      location: fields.location,
      summary: fields.summary,
      pdfUrl: fields.pdfUrl,
      coverImage: imageUrl(fields.coverImage),
      relatedProject: fields.relatedProject,
      datePublished: fields.datePublished ?? '',
    };
  });
}

export async function fetchPublications(limit = 12): Promise<Publication[]> {
  const data = await safeGraphQL<{
    fradPublications?: {
      nodes: Array<RawNode<{
        publicationFields?: {
          publicationType?: Publication['publicationType'];
          authors?: string[];
          year?: string;
          abstract?: string;
          sector?: string;
          location?: string;
          keywords?: string[];
          pdfUrl?: string;
          coverImage?: RawImage;
          citation?: string;
          relatedProject?: string;
          datePublished?: string;
        };
      }>>;
    };
  }>(QUERIES.publications, { first: limit }, 180);

  return nodes(data?.fradPublications?.nodes).map((node) => {
    const fields = node.publicationFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'publication',
      slug: node.slug ?? '',
      title: node.title ?? 'FRAD publication',
      publicationType: fields.publicationType ?? 'report',
      authors: list<string>(fields.authors),
      year: fields.year ?? '',
      abstract: fields.abstract,
      sector: fields.sector,
      location: fields.location,
      keywords: list<string>(fields.keywords),
      pdfUrl: fields.pdfUrl,
      coverImage: imageUrl(fields.coverImage),
      citation: fields.citation,
      relatedProject: fields.relatedProject,
      datePublished: fields.datePublished ?? '',
    };
  });
}

export async function fetchJobs(limit = 12): Promise<Job[]> {
  const data = await safeGraphQL<{
    fradJobs?: {
      nodes: Array<RawNode<{
        jobFields?: Omit<Job, 'id' | 'slug' | 'title'>;
      }>>;
    };
  }>(QUERIES.jobs, { first: limit }, 120);

  return nodes(data?.fradJobs?.nodes).map((node) => {
    const fields: Partial<Omit<Job, 'id' | 'slug' | 'title'>> = node.jobFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'job',
      slug: node.slug ?? '',
      title: node.title ?? 'FRAD vacancy',
      department: fields.department ?? 'Programme',
      location: fields.location ?? 'Nigeria',
      employmentType: fields.employmentType ?? 'contract',
      duration: fields.duration,
      deadline: fields.deadline ?? '',
      summary: fields.summary ?? '',
      responsibilities: list<string>(fields.responsibilities),
      requirements: list<string>(fields.requirements),
      howToApply: fields.howToApply ?? '',
      applicationLink: fields.applicationLink,
      status: fields.status ?? 'closed',
      pdfAttachment: fields.pdfAttachment,
      datePosted: fields.datePosted ?? '',
    };
  });
}

export async function fetchPartners(limit = 24): Promise<Partner[]> {
  const data = await safeGraphQL<{
    fradPartners?: {
      nodes: Array<RawNode<{
        partnerFields?: {
          partnerType?: Partner['partnerType'];
          logo?: RawImage;
          website?: string;
          activePast?: Partner['activePast'];
          approvedToDisplay?: boolean;
          relatedProjects?: string[];
          description?: string;
        };
      }>>;
    };
  }>(QUERIES.partners, { first: limit }, 300);

  return nodes(data?.fradPartners?.nodes).map((node) => {
    const fields = node.partnerFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'partner',
      name: node.title ?? 'FRAD partner',
      partnerType: fields.partnerType ?? 'network',
      logo: imageUrl(fields.logo),
      website: fields.website,
      activePast: fields.activePast ?? 'active',
      approvedToDisplay: Boolean(fields.approvedToDisplay),
      relatedProjects: list<string>(fields.relatedProjects),
      description: fields.description,
    };
  });
}

export async function fetchLocations(limit = 24): Promise<Location[]> {
  const data = await safeGraphQL<{
    fradLocations?: {
      nodes: Array<RawNode<{
        locationFields?: Omit<Location, 'id'>;
      }>>;
    };
  }>(QUERIES.locations, { first: limit }, 300);

  return nodes(data?.fradLocations?.nodes).map((node) => {
    const fields: Partial<Omit<Location, 'id'>> = node.locationFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'location',
      region: fields.region ?? node.title ?? 'Public region',
      state: fields.state ?? '',
      lga: fields.lga,
      officeType: fields.officeType,
      sectorsActive: list<string>(fields.sectorsActive),
      description: fields.description,
      coordinates: fields.coordinates,
      securitySensitive: Boolean(fields.securitySensitive),
      displayPublicly: fields.displayPublicly ?? true,
    };
  });
}

export async function fetchMediaAssets(limit = 24): Promise<MediaAsset[]> {
  const data = await safeGraphQL<{
    fradMediaAssets?: {
      nodes: Array<RawNode<{
        mediaAssetFields?: {
          mediaType?: MediaAsset['mediaType'];
          image?: RawImage;
          videoUrl?: string;
          caption?: string;
          location?: string;
          sector?: string;
          consentStatus?: MediaAsset['consentStatus'];
          publicSafe?: boolean;
          duration?: string;
          dateCaptured?: string;
          featuredOnHomepage?: boolean;
        };
      }>>;
    };
  }>(QUERIES.mediaAssets, { first: limit }, 300);

  return nodes(data?.fradMediaAssets?.nodes).map((node) => {
    const fields = node.mediaAssetFields ?? {};
    return {
      id: node.id ?? node.slug ?? node.title ?? 'media',
      title: node.title ?? 'FRAD field media',
      mediaType: fields.mediaType ?? 'image',
      image: imageUrl(fields.image),
      videoUrl: fields.videoUrl,
      alt: imageAlt(fields.image),
      caption: fields.caption,
      location: fields.location,
      sector: fields.sector,
      consentStatus: fields.consentStatus ?? 'pending',
      publicSafe: Boolean(fields.publicSafe),
      duration: fields.duration,
      dateCaptured: fields.dateCaptured,
      featuredOnHomepage: Boolean(fields.featuredOnHomepage),
    };
  });
}

export const QUERIES = {
  contentSlot: `
    query GetContentSlot($key: String!) {
      fradContentSlots(where: { metaQuery: { metaArray: [{ key: "slot_key", value: $key, compare: EQUAL_TO }] } }) {
        nodes {
          contentSlotFields {
            key
            headline
            subtext
            eyebrow
            caption
            videoUrl
            ctaText
            ctaLink
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
  emergencyAlerts: `
    query GetActiveAlerts {
      fradAlerts(where: { status: PUBLISH }) {
        nodes {
          id
          title
          alertFields {
            message
            ctaText
            ctaLink
            startDate
            endDate
            active
            priority
          }
        }
      }
    }
  `,
  impactStats: `
    query GetImpactStats {
      fradImpactStats(where: { status: PUBLISH }) {
        nodes {
          id
          impactFields {
            number
            label
            period
            sector
            location
            source
            showOnHomepage
            showOnImpactPage
            approved
          }
        }
      }
    }
  `,
  projects: `
    query GetProjects($first: Int = 12) {
      fradProjects(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          projectFields {
            status
            donor
            location
            sectors
            startDate
            endDate
            targetPopulation
            summary
            problemStatement
            fradResponse
            keyActivities
            results
            featuredOnHomepage
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            photos {
              image {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  `,
  stories: `
    query GetStories($first: Int = 12) {
      fradStories(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          storyFields {
            storyType
            sector
            location
            date
            consentStatus
            namePseudonym
            summary
            fullStory
            relatedProject
            featuredOnHomepage
            protectionSensitive
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            photos {
              image {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  `,
  news: `
    query GetNews($first: Int = 12) {
      fradNewsItems(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          newsFields {
            category
            date
            location
            summary
            body
            relatedProject
            relatedSector
            pressRelease
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
  reports: `
    query GetReports($first: Int = 12) {
      fradReports(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          reportFields {
            reportType
            year
            donor
            sector
            location
            summary
            pdfUrl
            relatedProject
            datePublished
            coverImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
  publications: `
    query GetPublications($first: Int = 12) {
      fradPublications(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          publicationFields {
            publicationType
            authors
            year
            abstract
            sector
            location
            keywords
            pdfUrl
            citation
            relatedProject
            datePublished
            coverImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
  jobs: `
    query GetJobs($first: Int = 12) {
      fradJobs(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          jobFields {
            department
            location
            employmentType
            duration
            deadline
            summary
            responsibilities
            requirements
            howToApply
            applicationLink
            status
            pdfAttachment
            datePosted
          }
        }
      }
    }
  `,
  partners: `
    query GetPartners($first: Int = 24) {
      fradPartners(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          partnerFields {
            partnerType
            website
            activePast
            approvedToDisplay
            relatedProjects
            description
            logo {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
  locations: `
    query GetLocations($first: Int = 24) {
      fradLocations(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          locationFields {
            region
            state
            lga
            officeType
            sectorsActive
            description
            coordinates {
              lat
              lng
            }
            securitySensitive
            displayPublicly
          }
        }
      }
    }
  `,
  mediaAssets: `
    query GetMediaAssets($first: Int = 24) {
      fradMediaAssets(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          mediaAssetFields {
            mediaType
            videoUrl
            caption
            location
            sector
            consentStatus
            publicSafe
            duration
            dateCaptured
            featuredOnHomepage
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
} as const;
