# FRAD Foundation Website Rebuild README

## Premium Humanitarian Website Using Next.js + Headless WordPress

---

## 1. Project Vision

Build a new premium public website for **FRAD Foundation** that reflects the seriousness, credibility, and field presence of a growing Nigerian humanitarian and development organization.

The website must be custom-built with a **Next.js frontend** and powered by **WordPress used only as a headless CMS**.

This is not a normal WordPress website.
This is not an Elementor NGO template.
This is not a donation-theme redesign.

This should be a serious, fast, beautiful, donor-ready humanitarian platform that makes FRAD look:

**Real. Active. Nigerian-led. Field-rooted. Credible. Nationally relevant. Partnership-ready. Internationally ambitious without overclaiming.**

The site should take inspiration from:

- **MSF** for humanitarian seriousness, urgency, field credibility, and clean emergency-response communication.
- **IRC** for structure, programme clarity, crisis framing, and institutional confidence.
- **charity: water** for beauty, spacing, storytelling, emotional clarity, and modern digital polish.

Do not copy any of these organizations directly.

The final website should feel like:

> The seriousness of MSF, the structure of IRC, the beauty of charity: water, and the identity of FRAD Foundation.

---

## 2. Core Principle

The most important rule of this project is:

> **Next.js controls the beauty. WordPress controls the content.**

FRAD staff should be able to update dynamic content without touching code.

They should be able to manage:

- Jobs
- Consultancies
- Internships
- Publications
- Reports
- Research outputs
- Projects
- Stories
- News
- Partners
- Locations
- Impact statistics
- Emergency alerts
- Policies
- Contact information
- Donation links
- Featured homepage content

But they should **not** be editing complex page layouts.

Staff should edit structured content.
The frontend should render that content inside fixed, premium, well-designed templates.

This protects the design quality over time.

---

## 3. Architecture

Use the following architecture:

```txt
Frontend:
Next.js + TypeScript + Tailwind CSS

CMS:
WordPress used only as a headless CMS

Public Website:
fradfoundation.org

CMS/Admin:
cms.fradfoundation.org/wp-admin
or
fradfoundation.org/cms

Frontend Hosting:
Vercel, Cloudflare Pages, or similar

WordPress Hosting:
Reliable managed WordPress host

API:
WPGraphQL preferred
WordPress REST API acceptable if there is a strong technical reason

Media:
WordPress Media Library, Cloudinary, or another optimized media system

Donations:
Paystack donation integration, Paystack payment page, or secure Paystack donation link

DNS/Security:
Cloudflare recommended
```

The public-facing website must be rendered by Next.js.

WordPress must not be used as the public theme layer.

---

## 4. Recommended Technical Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- WordPress Headless CMS
- WPGraphQL
- Advanced Custom Fields
- ACF to WPGraphQL
- Custom Post Types
- Role-based WordPress access
- Draft/review/approval publishing workflow
- Vercel for frontend hosting
- Managed WordPress hosting for CMS
- Cloudflare for DNS, CDN, caching, and security
- Paystack for donations
- Resend, Brevo, SMTP, or similar for form notifications
- Vercel Analytics, Plausible, or Google Analytics if approved

Avoid:

- Elementor
- Divi
- WPBakery
- Public WordPress themes
- WooCommerce unless FRAD truly needs a shop
- Heavy animation libraries
- Uncontrolled page builders
- Random NGO templates
- Template counters
- Unverified claims

---

## 5. FRAD Positioning

The website must position FRAD as:

> A Nigerian humanitarian and development organization delivering lifesaving and resilience-building support to crisis-affected communities across Northeast and Northwest Nigeria, with coordination presence in Abuja and growing ambition for regional and international partnership.

The website must not make FRAD look like a Borno-only NGO.

It must clearly show:

- Northeast Nigeria operations
- Northwest Nigeria operations
- Abuja coordination presence
- Nigerian-led identity
- Community-rooted implementation
- Field credibility
- National relevance
- Growing technical capacity
- Partnership readiness
- Future regional/international ambition without overclaiming

Use careful language.

Acceptable:

> FRAD is building the systems, partnerships, and technical capacity to grow as a credible African humanitarian and development actor.

Avoid:

> FRAD works globally.

unless officially approved.

Do not claim FRAD is an international NGO unless that becomes officially true.

---

## 6. Fixed Organizational Content

The developer or AI agent must not invent the following:

- Mission
- Vision
- Values
- Legal name
- Registration details
- Approved organizational description
- Approved programme descriptions
- Approved donor list
- Approved partner list
- Approved impact numbers
- Approved office addresses
- Approved safeguarding channels
- Approved complaint channels

Use only FRAD-approved content.

If approved content is unavailable, create clean CMS placeholders marked:

> Awaiting approved FRAD content.

Do not generate new mission, vision, values, impact numbers, partners, or legal statements.

---

## 7. Website Goals

The website must immediately answer:

1. What is FRAD?
2. Where does FRAD work?
3. Who does FRAD serve?
4. What sectors does FRAD work in?
5. What proof exists that FRAD is active?
6. Who has FRAD partnered with?
7. What projects has FRAD implemented or currently implements?
8. What reports and publications are available?
9. How can someone apply for jobs?
10. How can someone donate?
11. How can someone partner with FRAD?
12. How can communities send complaints or feedback?
13. How does FRAD protect dignity, safety, accountability, and safeguarding?

The website should make visitors feel:

> FRAD is real. FRAD is active. FRAD is credible. FRAD is organized. FRAD is growing. FRAD is ready for larger partnerships.

---

## 8. Brand Feeling

The website should feel:

- Humanitarian
- Clean
- Serious
- Beautiful
- Field-based
- Modern
- Dignified
- Trustworthy
- Nigerian-led
- African
- Donor-ready
- Community-sensitive
- Institutionally mature

Avoid:

- Generic NGO templates
- Excessive animations
- Pity-based storytelling
- Random stock photos
- Fake counters
- Vague slogans
- Heavy page builders
- Cluttered layouts
- Overly corporate styling
- AI-sounding text
- Savior language
- Charity clichés

---

## 9. Visual Identity

Use FRAD’s existing brand colors.

The developer must inspect:

- FRAD logo
- Current brand materials
- Existing website assets
- Official documents
- Approved presentation templates, if available

If exact colors are not available, create a temporary design system around:

- FRAD green
- FRAD blue
- FRAD gold/orange accent
- Deep charcoal
- Warm off-white
- Soft neutral backgrounds

Suggested temporary CSS tokens:

```css
:root {
  --frad-green-900: #0b3d2e;
  --frad-green-700: #146b4d;
  --frad-green-500: #229b6e;

  --frad-blue-900: #103a5c;
  --frad-blue-700: #176b9a;

  --frad-gold-500: #f4a51c;
  --frad-orange-600: #e06b2d;

  --charcoal-950: #111827;
  --charcoal-700: #374151;

  --neutral-100: #f7f5ef;
  --neutral-50: #fbfaf7;

  --white: #ffffff;
}
```

Do not copy the colors of MSF, IRC, or charity: water.

FRAD must remain visually distinct.

---

## 10. Typography

Recommended pairing:

```txt
Headings:
Manrope

Body:
Inter
```

Alternative heading fonts:

- Sora
- Poppins
- Space Grotesk

Alternative body fonts:

- Source Sans 3
- Noto Sans

Rules:

- Headings must feel strong, serious, and modern.
- Body text must be highly readable.
- Minimum body size: 16px.
- Use generous line spacing.
- Avoid decorative fonts.
- Use consistent hierarchy.
- Avoid long walls of text.

---

## 11. Photography Direction

Use real FRAD photos wherever possible.

Photography should show:

- Field teams at work
- Community engagement
- Nutrition screening
- WASH response
- Hygiene promotion
- Women and children receiving services with dignity
- PHC and community settings
- Emergency response
- Training and supervision
- Logistics and field movement
- Northeast Nigeria context
- Northwest Nigeria context
- Staff working respectfully with communities
- Coordination with government and partners where approved

Avoid:

- Exploitative images
- Graphic suffering
- Identifiable GBV survivors
- Children in undignified situations
- Random foreign stock photos
- Photos without consent
- Images revealing sensitive security locations
- Medical images that expose children or patients
- Poverty-porn storytelling

Every image must have:

- Alt text
- Consent status where relevant
- Optimized file size
- WebP/AVIF version where possible

---

## 12. Voice and Content Style

The writing should be:

- Clear
- Human
- Concise
- Evidence-based
- Field-informed
- Dignified
- Donor-ready
- Non-exaggerated
- Practical
- Nigerian/African in identity without becoming informal

Use terms such as:

- Crisis-affected communities
- Displaced families
- Women and girls
- Children under five
- Persons with disabilities
- Vulnerable host communities
- Locally led humanitarian action
- Lifesaving assistance
- Resilience-building support
- Accountability
- Inclusion
- Protection
- Community engagement
- Evidence-informed programming
- Frontline teams
- Government systems
- Humanitarian coordination

Avoid:

- The less privileged
- Putting smiles on faces
- Touching lives
- Poor masses
- Helpless victims
- Saving Africa
- Kids need help
- There is no big thing than your concern
- Generic filler text
- Unverified claims
- AI-sounding motivational language

---

## 13. Main Sitemap

Build the website with this structure:

```txt
/
  Home

/about
  About FRAD
  Mission, Vision and Values
  Governance
  Our Approach
  Accountability and Safeguarding

/where-we-work
  Overview
  Northeast Nigeria
  Northwest Nigeria
  Abuja Coordination
  Regional/International Ambition

/what-we-do
  Programme Overview

/what-we-do/nutrition-health
/what-we-do/wash
/what-we-do/protection-gbv
/what-we-do/education
/what-we-do/livelihoods-resilience
/what-we-do/peacebuilding-social-cohesion
/what-we-do/emergency-response
/what-we-do/innovation-digital-systems

/projects
  Projects Portfolio

/projects/[project-slug]
  Project Detail Pages

/impact
  Impact Overview
  Impact Numbers
  Stories of Change
  Reports

/stories
  Field Stories
  Community Stories
  Staff Stories
  Photo Essays

/stories/[story-slug]

/news
  Updates
  Announcements
  Press Releases

/news/[news-slug]

/careers
  Careers Hub

/careers/jobs
/careers/jobs/[job-slug]

/careers/consultancies
/careers/consultancies/[consultancy-slug]

/careers/internships
/careers/fraud-warning

/publications
  Publications Library

/publications/reports
/publications/research
/publications/assessments
/publications/policy-briefs
/publications/annual-reports

/research
  Research and Learning Hub

/research/projects
/research/publications
/research/collaborate
/research/ethics

/partners
  Donors
  Partners
  Government Coordination
  Partnership Opportunities

/reports
  Reports and Accountability Hub

/reports/annual-reports
/reports/project-reports
/reports/policies
/reports/accountability

/donate
  Donation Page

/contact
  Contact
  Offices
  Feedback and Complaints
  Safeguarding Channel
```

The careers, publications, research, reports, and projects sections should feel like specialist hubs but remain inside one unified FRAD website.

Do not create multiple disconnected websites unless FRAD specifically requests that later.

---

## 14. Main Navigation

Desktop navigation:

```txt
About
Where We Work
What We Do
Impact
Projects
Publications
Careers
Partner With Us
Donate
```

Optional secondary navigation:

```txt
Stories
News
Reports
Contact
```

Header requirements:

- FRAD logo on the left
- Clear Donate button
- Partner With Us link or button
- Sticky header after scroll
- Clean dropdowns
- No clutter
- No shop/cart icon unless FRAD has a real shop
- Mobile-first menu
- Full-screen mobile navigation
- Accessible keyboard navigation

---

## 15. Homepage Order

The homepage must follow this order:

1. Emergency alert banner
2. Header/navigation
3. Hero section
4. Impact numbers strip
5. Who we are
6. Where we work
7. What we do
8. Featured current response
9. Field story
10. Projects in focus
11. Publications/reports highlight
12. Partner logos
13. Accountability section
14. Donation/partnership CTA
15. Footer

---

## 16. Homepage Hero

Hero headline:

> Nigerian-led humanitarian action for communities affected by crisis.

Hero subtext:

> FRAD Foundation delivers lifesaving and resilience-building support across Northeast and Northwest Nigeria, working with communities, government, donors, and partners to improve access to nutrition, health, WASH, protection, education, livelihoods, and peacebuilding services.

Primary CTA:

```txt
See Our Impact
```

Secondary CTA:

```txt
Partner With Us
```

Tertiary link:

```txt
Where We Work
```

Design rules:

- Full-width hero
- Strong FRAD field image
- Dark overlay
- Large serious headline
- Clear call to action
- No hero carousel
- No random background video unless optimized
- Mobile-first layout
- Fast-loading image

---

## 17. Emergency Alert Banner

Emergency alerts must be editable from WordPress.

Fields:

- Alert title
- Message
- CTA text
- CTA link
- Start date
- End date
- Active/inactive
- Priority level

Example alert text:

> Responding to humanitarian needs across Northeast and Northwest Nigeria.

or:

> Cholera preparedness and response activities are ongoing in affected communities.

The banner must be optional and should not display when inactive or expired.

---

## 18. Impact Numbers

Impact numbers must be editable from WordPress.

Use only verified numbers.

Fields:

- Number
- Label
- Period
- Sector
- Location
- Source
- Display on homepage: yes/no
- Display on impact page: yes/no
- Approval status

Examples:

```txt
[X]+ people reached
[X] states with operational presence
[X] LGAs supported
[X]+ women and girls reached
[X]+ children supported
```

Do not invent numbers.

Do not use fake animated counters.

If numbers are pending, display:

> FRAD’s latest impact figures are being updated from approved programme reports.

Impact numbers should only display when a source has been added and approval status is marked approved.

---

## 19. Homepage “Who We Are”

Title:

> Who We Are

Suggested copy:

> FRAD Foundation is a Nigerian humanitarian and development organization supporting communities affected by conflict, displacement, food insecurity, disease outbreaks, and limited access to essential services. We work through frontline teams, community structures, government systems, and partners to deliver practical support where needs are urgent.

Identity cards:

1. Nigerian-led
2. Community-rooted
3. Field-focused
4. Partnership-driven

CTA:

```txt
Learn About FRAD
```

---

## 20. Homepage “Where We Work”

Title:

> Where We Work

Suggested copy:

> FRAD works across crisis-affected communities in Northeast and Northwest Nigeria, with coordination support from Abuja and a long-term ambition to grow as a credible African humanitarian and development actor.

Include:

- Nigeria map
- Northeast highlight
- Northwest highlight
- Abuja marker
- Location cards

Location cards:

- Northeast Nigeria
- Northwest Nigeria
- Abuja Coordination Office
- Regional/International Ambition

CTA:

```txt
Explore Our Locations
```

Map requirements:

- Lightweight
- Mobile-friendly
- Accessible
- Editable location data from WordPress
- Avoid heavy GIS unless necessary
- Do not expose sensitive field locations

---

## 21. Homepage “What We Do”

Title:

> What We Do

Subtitle:

> FRAD supports communities through integrated humanitarian and development programmes that address immediate needs while strengthening long-term resilience.

Cards:

1. Nutrition & Health
2. WASH
3. Protection & GBV
4. Education
5. Livelihoods & Resilience
6. Peacebuilding & Social Cohion
7. Emergency Response
8. Innovation & Digital Systems

Each card should include:

- Icon
- Title
- Short description
- Link to sector page
- Related image or visual accent if appropriate

---

## 22. Featured Current Response

This section must be editable from WordPress.

Fields:

- Title
- Location
- Sectors
- Donor/partner
- Timeframe
- Summary
- Key activities
- People reached/targeted
- Photos
- Related project
- CTA
- Security-sensitive toggle
- Approval status

Example title:

> Integrated Nutrition and WASH Response in Borno State

Rules:

- Do not expose sensitive security details.
- Do not publish unapproved donor names.
- Do not publish unverified reach figures.
- Do not include photos without consent.
- Do not reveal exact sensitive field locations.

---

## 23. Field Story Section

Use one featured story.

Storytelling must show dignity, not pity.

Fields:

- Title
- Location
- Sector
- Date
- Summary
- Image
- Related project
- Consent status
- Name/pseudonym
- Protection sensitivity
- Featured on homepage: yes/no

Example title:

> Early referral helped a child receive care

CTA:

```txt
Read More Stories
```

Story rules:

- Use consented stories only.
- Avoid identifiable GBV survivor stories.
- Avoid exposing children.
- Avoid graphic clinical details.
- Use pseudonyms where necessary.
- Focus on dignity, access, resilience, and community agency.

---

## 24. Projects in Focus

Show three featured projects.

Fields:

- Project title
- Location
- Status
- Sectors
- Donor/partner
- Duration
- Summary
- Key result
- Image
- CTA
- Featured on homepage: yes/no

CTA:

```txt
View All Projects
```

---

## 25. Publications and Reports Highlight

Show latest approved reports and publications.

Fields:

- Title
- Type
- Year
- Sector
- Summary
- PDF
- Cover image
- Related project
- CTA
- Approval status

CTA:

```txt
Visit Publications Library
```

Frontend should show:

- Report cards
- Publication cards
- PDF download button
- Date/year
- Type
- Sector
- Short summary

---

## 26. Partner Logos

Display only approved partner logos.

Fields:

- Partner name
- Logo
- Partner type
- Active/past
- Approval to display: yes/no
- Website
- Related projects
- Short description

Rules:

- Do not display unapproved logos.
- Do not imply current partnership if the relationship is past.
- Clearly label past partners if needed.
- Use grayscale logos with color hover if desired.
- Do not invent partners.
- Do not use donor logos without permission.

---

## 27. Donation CTA

Title:

> Support locally led humanitarian action.

Copy:

> Your support helps FRAD respond faster, reach vulnerable communities, and strengthen lifesaving services for women, children, displaced families, persons with disabilities, and crisis-affected households.

Buttons:

```txt
Donate
Partner With Us
```

Suggested donation amounts:

```txt
₦5,000
₦10,000
₦25,000
₦50,000
₦100,000
Custom amount
```

Rules:

- Use Paystack securely.
- Do not make unverified cost claims.
- Do not say “₦5,000 saves a child” unless FRAD has approved costing.
- Include donation contact email.
- Include donor privacy note.
- Explain receipt process if applicable.

---

## 28. WordPress CMS Requirements

WordPress must be configured as a structured CMS, not a page builder.

Create custom post types for:

- Jobs
- Consultancies
- Internships
- Projects
- Stories
- News
- Reports
- Publications
- Research Projects
- Partners
- Locations
- Sectors
- Impact Statistics
- Emergency Alerts
- Team Members, if approved
- Policies
- Homepage Featured Content
- Contact Details
- Office Locations

Use:

- Advanced Custom Fields
- WPGraphQL
- ACF to WPGraphQL
- Custom post type registration
- Role-based permissions
- Approval workflow

Do not rely on normal blog posts for everything.

Do not allow staff to edit complex page layouts.

---

## 29. Hardcoded vs CMS-Controlled Content

### Controlled by Next.js

These should be fixed in code:

- Page layouts
- Section order
- Header design
- Footer design
- Typography
- Spacing
- Colors
- Grid systems
- Card styles
- Filter UI
- Detail page templates
- Donation page structure
- Careers page structure
- Publications library structure
- Project detail structure
- Story detail structure
- Sector page structure

### Controlled by WordPress

These should be editable from the CMS:

- Jobs
- Consultancies
- Internships
- Reports
- Publications
- Research projects
- Projects
- Stories
- News
- Emergency alerts
- Impact statistics
- Partner logos
- Locations
- Sector content
- Homepage featured items
- Featured response
- Contact details
- Office addresses
- Donation link
- Complaint/safeguarding contacts
- Policies

This is non-negotiable.

FRAD staff should update content, not redesign the website.

---

## 30. CMS User Roles

Create role-based access.

Suggested roles:

### Super Admin

Can manage everything.

### Communications Editor

Can manage:

- News
- Stories
- Photos
- Homepage featured content
- Emergency alerts

### HR Editor

Can manage:

- Jobs
- Consultancies
- Internships
- Career pages
- Fraud warning

### Programmes Editor

Can manage:

- Projects
- Sector updates
- Locations
- Field activity updates
- Impact statistics

### MEAL/Research Editor

Can manage:

- Reports
- Publications
- Research projects
- Assessments
- Learning products
- Policy briefs

### Partnerships Editor

Can manage:

- Partners
- Donor pages
- Partnership opportunities

### Reviewer/Approver

Can review and approve content before publication.

Use workflow:

```txt
Draft → Review → Approved → Published
```

Do not allow every staff member to publish directly.

---

## 31. Admin Dashboard Experience

The WordPress dashboard must be cleaned up for non-technical users.

Hide unnecessary menus from non-admin roles:

- Appearance
- Themes
- Plugins
- Comments, if not used
- WooCommerce, unless needed
- Elementor or page builder menus
- Tools not relevant to the user role

Each editor should only see the content areas relevant to their responsibility.

The admin experience should feel simple, structured, and safe.

---

## 32. Required CMS Content Types and Fields

### 32.1 Jobs

Fields:

- Job title
- Department
- Location
- Employment type
- Duration
- Deadline
- Summary
- Responsibilities
- Requirements
- How to apply
- Application email/link
- Status: open/closed
- PDF attachment
- Date posted

Frontend features:

- Filter by location
- Filter by type
- Open/closed status
- Deadline display
- Job detail page
- Apply button
- Fraud warning

---

### 32.2 Consultancies

Fields:

- Consultancy title
- Location
- Duration
- Deadline
- TOR summary
- Scope of work
- Deliverables
- Eligibility
- How to apply
- PDF attachment
- Status

---

### 32.3 Internships

Fields:

- Internship title
- Department
- Location
- Duration
- Eligibility
- Summary
- How to apply
- Deadline
- Status

---

### 32.4 Publications

Fields:

- Title
- Publication type
- Authors
- Year
- Abstract
- Sector
- Location
- Keywords
- PDF upload
- Cover image
- Citation
- Related project
- Related research
- Date published

Frontend features:

- Search
- Filter by year
- Filter by sector
- Filter by publication type
- Filter by location
- Download button
- Citation section

---

### 32.5 Reports

Fields:

- Report title
- Report type
- Year
- Donor/project
- Sector
- Location
- Summary
- PDF upload
- Cover image
- Related project
- Date published

Report types:

- Annual Report
- Project Report
- Situation Report
- Assessment Report
- Evaluation Report
- Policy Document
- Audit/Financial Summary, if approved

---

### 32.6 Research Projects

Fields:

- Research title
- Research theme
- Team/lead
- Status
- Study location
- Summary
- Objectives
- Methods summary
- Ethics approval status
- Outputs
- Related publications
- Related project
- Contact person

Rules:

- Do not publish sensitive research data.
- Do not publish identifiable participant information.
- Do not publish research that lacks internal approval.

---

### 32.7 Projects

Fields:

- Project title
- Status
- Donor/partner
- Location
- Sectors
- Start date
- End date
- Target population
- Summary
- Problem statement
- FRAD response
- Key activities
- Results
- Photos
- Reports
- Stories
- Featured on homepage: yes/no

Frontend features:

- Filter by sector
- Filter by location
- Filter by donor/partner
- Filter by active/completed
- Project detail pages

---

### 32.8 Stories

Fields:

- Title
- Story type
- Sector
- Location
- Date
- Consent status
- Name/pseudonym
- Summary
- Full story
- Photos
- Related project
- Featured on homepage: yes/no
- Protection sensitivity

Story ethics:

- Use consented stories only.
- Avoid identifiable GBV survivor stories.
- Avoid exposing children.
- Avoid pity language.
- Use pseudonyms where needed.
- Do not publish sensitive case information.

---

### 32.9 News

Fields:

- Title
- Category
- Date
- Location
- Summary
- Body
- Featured image
- Related project
- Related sector
- Press release yes/no

---

### 32.10 Partners

Fields:

- Partner name
- Partner type
- Logo
- Website
- Active/past
- Approval to display yes/no
- Related projects
- Short description

Partner types:

- Donor
- UN Agency
- Government
- INGO
- NNGO
- Technical Partner
- Private Sector
- Network/Cluster

---

### 32.11 Locations

Fields:

- Region
- State
- LGA
- Office/site type
- Sectors active there
- Projects
- Short description
- Map coordinates optional
- Security-sensitive yes/no
- Display publicly yes/no

Do not display sensitive locations without approval.

---

### 32.12 Sectors

Fields:

- Sector name
- Short description
- Full description
- Icon
- Featured image
- Key activities
- Related projects
- Related stories
- Related reports

---

### 32.13 Impact Statistics

Fields:

- Number
- Label
- Year/period
- Sector
- Location
- Source
- Display on homepage yes/no
- Display on impact page yes/no
- Approval status

---

### 32.14 Emergency Alerts

Fields:

- Alert title
- Message
- CTA text
- CTA link
- Start date
- End date
- Active/inactive
- Priority level

---

### 32.15 Policies

Fields:

- Policy title
- Category
- Summary
- PDF upload
- Year
- Display publicly yes/no

Examples:

- Safeguarding Policy
- PSEA Policy
- Child Protection Policy
- Anti-Fraud Policy
- Data Protection Policy
- Whistleblowing Policy
- Code of Conduct

---

## 33. About Page

The About page should include:

1. Hero
2. Who FRAD is
3. FRAD story
4. Mission
5. Vision
6. Values
7. How FRAD works
8. Governance
9. Accountability and safeguarding
10. CTA

Important:

Use FRAD-approved mission, vision, and values only.

If unavailable, show placeholders in the CMS marked:

> Awaiting approved FRAD content.

Do not invent mission, vision, or values.

---

## 34. Where We Work Page

Sections:

1. Hero
2. Nigeria map
3. Northeast Nigeria
4. Northwest Nigeria
5. Abuja coordination
6. Regional/international ambition
7. Location-specific projects
8. CTA

Suggested copy:

> FRAD works across crisis-affected communities in Northeast and Northwest Nigeria, supported by coordination and partnership engagement through Abuja.

Map requirements:

- Lightweight
- Mobile-friendly
- Accessible
- Editable location data from WordPress
- Avoid heavy GIS unless necessary
- Do not expose sensitive locations
- Use public-safe location data only

---

## 35. What We Do Page

Sections:

1. Hero
2. Integrated programming explanation
3. Sector grid
4. Cross-cutting approaches
5. Featured projects
6. Related reports
7. CTA

Sector pages:

```txt
/what-we-do/nutrition-health
/what-we-do/wash
/what-we-do/protection-gbv
/what-we-do/education
/what-we-do/livelihoods-resilience
/what-we-do/peacebuilding-social-cohesion
/what-we-do/emergency-response
/what-we-do/innovation-digital-systems
```

Each sector page should include:

1. Problem
2. FRAD response
3. Key activities
4. Where we do this work
5. Related projects
6. Related stories
7. Related reports
8. CTA

---

## 36. Sector Page Guidance

### Nutrition & Health

Focus areas:

- Community nutrition screening
- Referral
- SAM/MAM support where applicable
- OTP/CMAM support where applicable
- Stabilization Centre support only if approved for public communication
- IYCF-E
- Maternal nutrition
- Health education
- PHC linkages
- Digital tools where approved

Avoid unapproved claims.

---

### WASH

Focus areas:

- Safe water
- Sanitation
- Hygiene promotion
- WASH NFI
- Cholera prevention/response
- Menstrual hygiene where applicable
- Waste management
- Community engagement

---

### Protection & GBV

Focus areas:

- GBV risk mitigation
- Safe referral
- Community awareness
- Dignity
- Women and girls
- Child protection linkages
- Legal identity/HLP if applicable
- Accountability to affected populations

Do not publish sensitive survivor information.

---

### Education

Focus areas:

- Education in emergencies
- Safe learning
- Learning materials
- Back-to-school support
- Community mobilization
- Child protection linkages

---

### Livelihoods & Resilience

Focus areas:

- Skills
- Household resilience
- Food security
- Women/youth empowerment
- Savings groups
- Livelihood inputs
- Recovery support

---

### Peacebuilding & Social Cohesion

Focus areas:

- Dialogue
- Community peace structures
- Youth engagement
- Women-led peacebuilding
- Conflict sensitivity
- Social cohesion

---

### Emergency Response

Focus areas:

- Rapid needs assessment
- Emergency WASH
- Nutrition screening/referral
- NFI support
- Disease outbreak support
- Coordination
- Community mobilization

---

### Innovation & Digital Systems

Focus areas:

- Digital data collection
- Offline-first field tools
- Reporting dashboards
- Referral support
- Programme quality tools
- Connectivity support
- Responsible data use

Do not overstate tools that are still in development or pilot.

---

## 37. Careers Hub

Careers should feel like a proper specialist hub.

Structure:

```txt
/careers
/careers/jobs
/careers/jobs/[job-slug]
/careers/consultancies
/careers/consultancies/[consultancy-slug]
/careers/internships
/careers/fraud-warning
```

Careers homepage sections:

1. Hero
2. Why work with FRAD
3. Current openings
4. Consultancies
5. Internships/volunteers if applicable
6. Fraud warning
7. Application guidance

Fraud warning:

> FRAD does not request payment from applicants at any stage of recruitment.

Jobs must be editable by HR from WordPress.

---

## 38. Publications Library

Publications should feel like a serious knowledge hub.

Structure:

```txt
/publications
/publications/reports
/publications/research
/publications/assessments
/publications/policy-briefs
/publications/annual-reports
```

Features:

- Search
- Filter by year
- Filter by sector
- Filter by publication type
- Filter by location
- PDF download
- Cover images
- Citation
- Related projects
- Related research

This section should be editable by MEAL, research, or communications staff from WordPress.

---

## 39. Research and Learning Hub

Structure:

```txt
/research
/research/projects
/research/publications
/research/collaborate
/research/ethics
```

Purpose:

Position FRAD as not only implementing projects but also learning, documenting, researching, and improving humanitarian practice.

Sections:

1. Research focus areas
2. Active research/learning projects
3. Publications
4. Assessments
5. Learning briefs
6. Ethics and responsible data
7. Collaboration CTA

Rules:

- Do not publish sensitive datasets.
- Do not publish identifiable participant information.
- Do not publish draft research without approval.
- Do not publish ethics-sensitive content casually.

---

## 40. Projects Portfolio

Structure:

```txt
/projects
/projects/[project-slug]
```

Features:

- Filter by sector
- Filter by region
- Filter by state
- Filter by donor/partner
- Filter by active/completed
- Project cards
- Project detail pages

Each project detail page should include:

1. Hero
2. Summary
3. Location
4. Duration
5. Donor/partner
6. Target population
7. Problem
8. FRAD response
9. Key activities
10. Results
11. Photos
12. Related stories
13. Related reports
14. CTA

---

## 41. Reports and Accountability Hub

Structure:

```txt
/reports
/reports/annual-reports
/reports/project-reports
/reports/policies
/reports/accountability
```

Must include:

- Annual reports
- Project reports
- Policy documents
- Safeguarding/PSEA information
- Complaints and feedback
- Accountability statement
- Downloadable PDFs

This section should show FRAD as transparent, accountable, and institutionally serious.

---

## 42. Donate Page

Donation page sections:

1. Hero
2. Why support FRAD
3. Donation form or Paystack button
4. Suggested amounts
5. What support helps
6. Accountability note
7. FAQs
8. Contact for donations

Donation copy:

> Your support helps FRAD respond faster, reach vulnerable communities, and strengthen lifesaving services for women, children, displaced families, persons with disabilities, and crisis-affected households.

Rules:

- Do not make unverified cost claims.
- Use Paystack securely.
- Explain receipt process.
- Include donation contact email.
- Include donor privacy note.
- Include secure payment reassurance.

---

## 43. Contact Page

Include:

- Maiduguri office
- Abuja office
- Northwest office/hub if approved
- General email
- Phone number
- Partnership contact
- Media contact if available
- Feedback/complaint contact
- Safeguarding/PSEA contact
- Contact form

Contact form fields:

- Name
- Email
- Phone optional
- Organization optional
- Reason for contact
- Message
- Consent checkbox

Reason options:

- Partnership
- Donation
- Media
- Career
- Complaint/Feedback
- Safeguarding concern
- General enquiry

Complaint and feedback section:

> FRAD welcomes feedback and complaints from communities, partners, staff, and stakeholders. Reports are handled with confidentiality and in line with FRAD’s safeguarding and accountability commitments.

---

## 44. Footer

Footer must include:

- FRAD logo
- Short description
- Quick links
- What We Do links
- Where We Work links
- Careers
- Publications
- Reports
- Donate
- Contact
- Social media
- CAC/legal statement
- Privacy policy
- Safeguarding/complaints link
- Copyright

Footer description:

> FRAD Foundation is a Nigerian humanitarian and development organization supporting crisis-affected communities across Northeast and Northwest Nigeria through nutrition, health, WASH, protection, education, livelihoods, peacebuilding, and emergency response.

---

## 45. Frontend Component Library

Build reusable components in Next.js.

Required components:

- Header
- Mobile Navigation
- Footer
- Hero
- Emergency Alert Banner
- Impact Stat Card
- Programme Card
- Project Card
- Story Card
- Report Card
- Publication Card
- Job Card
- Partner Logo Grid
- Location Card
- Map Section
- CTA Section
- Donation Panel
- Search and Filter Bar
- Breadcrumbs
- PDF Download Card
- Image Gallery
- Quote/Testimonial Card
- Accordion
- Contact Form
- Newsletter Form, optional
- Pagination
- Empty State
- Loading State
- Error State
- CMS Preview Banner

All components must be responsive.

---

## 46. Suggested Repository Structure

Use a clean, maintainable structure.

```txt
frad-website/
  app/
    page.tsx
    about/
    where-we-work/
    what-we-do/
    projects/
    careers/
    publications/
    research/
    reports/
    stories/
    news/
    partners/
    donate/
    contact/
    not-found.tsx

  components/
    global/
    layout/
    sections/
    cards/
    forms/
    navigation/
    cms/
    ui/

  lib/
    wordpress.ts
    graphql.ts
    seo.ts
    utils.ts
    constants.ts

  types/
    wordpress.ts
    content.ts
    seo.ts

  styles/
    globals.css

  public/
    images/
    icons/
```

The codebase must be clean enough for another developer to inherit.

---

## 47. Design Rules

Use:

- Large clean sections
- Strong white space
- Professional typography
- Real images
- Clear CTAs
- Subtle motion only
- Good contrast
- Mobile-first layouts
- Consistent card design
- Clean filters and libraries
- Strong visual hierarchy
- Serious humanitarian tone

Avoid:

- Hero sliders
- Heavy animations
- Template counters
- Random icon packs
- Too many colors
- Overcrowded sections
- Generic NGO stock photos
- Long blocks of text
- Confusing dropdown menus
- WooCommerce/cart language
- Flashy charity aesthetics
- Pity-driven design

---

## 48. Performance Requirements

Targets:

```txt
Mobile Lighthouse Performance: 85+
Accessibility: 95+
Best Practices: 90+
SEO: 95+
```

Requirements:

- Image optimization
- Lazy loading
- WebP/AVIF
- Compressed PDFs
- Minimal JavaScript
- Avoid bloated libraries
- CDN
- Caching
- Static generation where possible
- Incremental Static Regeneration for updated CMS content
- Optimized fonts
- No unnecessary client-side rendering
- No huge homepage payload

---

## 49. Accessibility Requirements

Meet basic WCAG standards.

Requirements:

- Proper heading hierarchy
- Alt text
- Keyboard navigation
- Good contrast
- Visible focus states
- Accessible forms
- Labelled fields
- Descriptive buttons
- No flashing animations
- Mobile-friendly tap targets
- Text not embedded only in images
- Screen-reader friendly navigation
- Meaningful link text

---

## 50. SEO Requirements

Implement:

- SEO titles
- Meta descriptions
- Open Graph images
- Schema markup for nonprofit/NGO
- XML sitemap
- Robots.txt
- Canonical URLs
- Clean slugs
- Breadcrumbs
- Alt text
- 404 page
- Redirect old URLs
- Structured data where appropriate

Target search themes:

- FRAD Foundation
- Future Resilience and Development Foundation
- Nigerian humanitarian NGO
- Humanitarian NGO in Nigeria
- NGO in Borno
- NGO in Northwest Nigeria
- Nutrition NGO Nigeria
- WASH NGO Nigeria
- Protection NGO Nigeria
- Local NGO Nigeria
- Humanitarian response Northeast Nigeria
- Humanitarian response Northwest Nigeria

---

## 51. Security Requirements

### WordPress Backend

- HTTPS
- Strong admin passwords
- 2FA if possible
- Limited admin users
- Role-based access
- Security plugin or server-level security
- Regular backups
- Plugin minimization
- Disable unnecessary plugins
- Restrict file uploads
- Keep WordPress updated
- Keep plugins updated
- Disable public access to unnecessary endpoints
- Protect login page where possible

### Frontend

- HTTPS
- Secure forms
- Spam protection
- Environment variables protected
- No exposed API secrets
- Secure donation integration
- Validate form inputs
- Rate-limit forms if possible

---

## 52. Content Governance

Add editorial workflow:

```txt
Draft → Review → Approved → Published
```

Recommended rules:

- HR can draft jobs.
- Communications can draft stories/news.
- MEAL can draft reports/publications.
- Programmes can draft project updates.
- Partnerships can draft partner entries.
- Management/comms lead approves before publishing.

Every content item should have:

- Author/editor
- Date created
- Last updated
- Status
- Reviewed by
- Published date

Content requiring special approval:

- Partner logos
- Donor names
- Impact numbers
- Photos of children
- Photos of women and girls
- Stories involving protection, GBV, or children
- Safeguarding pages
- Complaint channels
- Research outputs
- Project results
- Financial/audit summaries
- Office addresses
- Field locations

If approval is unclear, the content remains draft.

---

## 53. Humanitarian Communication Ethics

The website must protect dignity and safety.

Rules:

- Use consented photos and stories.
- Do not expose GBV survivors.
- Do not reveal sensitive locations.
- Do not use children’s distress for emotional manipulation.
- Use pseudonyms where needed.
- Avoid graphic medical images.
- Avoid political claims.
- Avoid unverifiable superiority claims.
- Avoid savior language.
- Avoid “before and after” exploitation.
- Focus on dignity, access, resilience, and community agency.
- Do not publish identifiable personal data.
- Do not publish patient or beneficiary records.
- Do not use tragedy as decoration.

---

## 54. Data and Privacy

Include:

- Privacy policy page
- Cookie notice if needed
- Data protection statement
- Donation privacy statement
- Form consent checkbox
- Secure handling of complaint/safeguarding reports

Do not publish personal data without approval.

Do not collect unnecessary sensitive data through public forms.

Complaint and safeguarding forms must be handled carefully and confidentially.

---

## 55. Migration From Current Website

Before rebuilding:

1. Audit current FRAD website.
2. List all pages.
3. Identify pages to keep, rewrite, merge, or delete.
4. Extract useful content.
5. Remove placeholder/template content.
6. Remove duplicate menus.
7. Remove cart/shop elements unless needed.
8. Fix spelling and grammar.
9. Preserve useful URLs where possible.
10. Redirect old URLs to new pages.
11. Compress useful images.
12. Replace low-quality images where needed.
13. Remove unverified impact claims.

Remove:

- Tab Title
- No products in the cart
- Kids need help
- Fake volunteer counters
- Unverified impact numbers
- Duplicate navigation
- Placeholder sections
- Generic NGO text
- Broken pages
- Low-quality images
- Unused shop/cart language
- Unapproved claims

---

## 56. Launch Checklist

### Content

- Mission/vision/values approved
- About copy approved
- Programme pages approved
- Impact numbers verified
- Partner logos approved
- Photos consented
- Stories reviewed
- Reports uploaded
- Jobs module tested
- Publications module tested
- Contact details confirmed
- Complaint/safeguarding channels confirmed
- Donation flow tested
- Privacy policy added
- Safeguarding page reviewed

### Design

- Homepage complete
- Mobile design tested
- Tablet design tested
- Desktop design tested
- Typography consistent
- Colors consistent
- Images optimized
- Cards consistent
- Navigation clean
- Footer complete
- Empty states designed
- Error states designed

### Technical

- Next.js deployed
- WordPress CMS secured
- API connected
- Forms working
- Paystack working
- Sitemap generated
- Robots.txt configured
- 404 page created
- Old URLs redirected
- Backups active
- Analytics added if approved
- Performance tested
- Accessibility tested
- SEO metadata tested

### Governance

- CMS roles created
- Editorial workflow tested
- Admin guide prepared
- Staff trained
- Publishing responsibilities assigned
- Content approval process confirmed

---

## 57. AI Agent Development Order

Build in this order:

1. Set up Next.js project.
2. Set up TypeScript.
3. Set up Tailwind design system.
4. Set up global typography and color tokens.
5. Set up WordPress backend.
6. Create custom post types.
7. Create ACF fields.
8. Connect fields to WPGraphQL or REST API.
9. Build WordPress role-based access.
10. Build global layout: header, footer, navigation.
11. Build homepage.
12. Build About page.
13. Build Where We Work page.
14. Build What We Do and sector pages.
15. Build Projects module.
16. Build Careers module.
17. Build Publications module.
18. Build Reports module.
19. Build Research hub.
20. Build Stories/news modules.
21. Build Partners page.
22. Build Donate page.
23. Build Contact/complaints forms.
24. Add SEO.
25. Add accessibility improvements.
26. Optimize performance.
27. Add preview workflow if possible.
28. Test CMS editing.
29. Test mobile responsiveness.
30. Prepare launch checklist.
31. Prepare admin training guide.
32. Remove all placeholder content.
33. Launch after approval.

---

## 58. Admin Training Guide Requirement

The developer must prepare a simple admin guide for FRAD staff.

The guide should explain:

- How to log into the CMS
- How to create a job vacancy
- How to close a job vacancy
- How to upload a report
- How to upload a publication
- How to add a project
- How to add a story
- How to add a news update
- How to add partner logos safely
- How to update impact numbers
- How to activate/deactivate emergency alerts
- How to update contact details
- How to preview content
- How to submit content for review
- What staff must not edit
- What content requires approval

This guide should be written for non-technical staff.

---

## 59. Do Not Do

Do not:

- Use a WordPress public theme.
- Use Elementor for the public frontend.
- Allow staff to edit complex layouts.
- Copy MSF, IRC, or charity: water directly.
- Invent FRAD mission, vision, or values.
- Invent impact numbers.
- Invent partners.
- Use fake testimonials.
- Use random stock photography.
- Use exploitative imagery.
- Create many disconnected websites.
- Leave placeholder content.
- Use WooCommerce/cart elements unless needed.
- Overstate international presence.
- Overstate digital tools or pilot systems.
- Publish sensitive locations.
- Publish survivor details.
- Build a beautiful but unmaintainable site.
- Build a site that FRAD staff cannot update.
- Build a site that looks like a generic NGO template.

---

## 60. Success Criteria

The rebuilt website is successful if:

- It looks premium and humanitarian.
- It does not look like a generic WordPress NGO theme.
- Non-technical staff can update key sections.
- Jobs can be posted by HR.
- Publications can be uploaded by MEAL/research.
- Reports can be uploaded and filtered.
- Projects can be updated by programmes.
- Stories/news can be updated by communications.
- Impact numbers can be updated with sources.
- Partner logos can be managed safely.
- Emergency alerts can be activated quickly.
- FRAD’s Northeast, Northwest, Abuja, and future ambition are clear.
- The donation journey is clean.
- The partnership pathway is clear.
- The website is fast.
- The website is mobile-friendly.
- The website is accessible.
- The website is secure.
- The CMS is simple enough for staff.
- The design remains protected from accidental damage.

The final impression should be:

> FRAD is a serious Nigerian humanitarian and development organization with frontline credibility, national reach, strong local roots, growing technical capacity, and international partnership potential.

---

## 61. Final Build Instruction

Build FRAD Foundation’s public website as a custom Next.js humanitarian platform connected to WordPress used only as a headless CMS.

The public frontend must be premium, fast, beautiful, mobile-first, and inspired by MSF, IRC, and charity: water without copying them.

The backend must allow non-technical FRAD staff to manage dynamic sections such as jobs, consultancies, publications, research, reports, projects, stories, news, partners, impact statistics, locations, emergency alerts, programme updates, policies, and contact details.

Preserve FRAD’s approved mission, vision, values, colors, identity, and organizational language.

Do not build a generic WordPress NGO site.

Do not give FRAD a website that looks good on launch day but becomes messy after six months.

Build a website that makes FRAD look:

**Real. Active. Credible. Nigerian-led. Field-rooted. Nationally relevant. Technically capable. Internationally ambitious. Ready for bigger partnerships.**

# frad
