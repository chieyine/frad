# FRAD Foundation Website Rebuild

## UI/UX, Product Management, Design System, and User Experience Specification

---

# 1. Product Vision

Build FRAD Foundation’s website as a serious humanitarian digital platform, not a decorative NGO brochure.

The website must serve five main purposes:

1. **Credibility**
   Show that FRAD is real, active, organized, and field-rooted.

2. **Partnership**
   Help donors, UN agencies, INGOs, government actors, and technical partners understand FRAD’s capacity.

3. **Recruitment**
   Allow HR to publish jobs, consultancies, internships, and fraud warnings easily.

4. **Knowledge and accountability**
   Make reports, publications, research outputs, policies, and learning products easy to access.

5. **Public communication**
   Communicate FRAD’s work clearly, beautifully, ethically, and with dignity.

This website is not only a frontend project.
It is a **humanitarian product** with different users, workflows, permissions, content types, and trust requirements.

---

# 2. Product Principles

Every design and product decision must follow these principles:

## 2.1 Seriousness Before Decoration

The website should feel serious before it feels beautiful.

Beauty is important, but FRAD must not look like a charity template trying too hard.

The visual tone should communicate:

* Field credibility
* Institutional maturity
* Humanitarian discipline
* Local leadership
* Donor readiness
* Community dignity

Avoid flashy effects that reduce seriousness.

---

## 2.2 Structured Content Over Free Editing

FRAD staff should not be editing page layouts.

They should be filling structured fields.

Example:

Bad:
```txt
Staff edits entire project page using page builder blocks.
```

Good:
```txt
Staff fills:
Project title
Location
Sector
Donor
Duration
Summary
Activities
Results
Photos
Reports
Stories
```

Then the Next.js frontend renders the content beautifully.

---

## 2.3 Humanitarian Dignity Over Pity

The site must not use suffering as decoration.

Avoid:
* Crying children as emotional hooks
* Graphic medical images
* Exploitative before/after images
* “Helpless victims” language
* Manipulative donation copy

Use:
* Dignified field photography
* Practical humanitarian language
* Community agency
* Evidence
* Accountability
* Respect

---

## 2.4 Clear User Journeys

Every major visitor should immediately know where to go.

Donor:
```txt
Home → Impact → Projects → Reports → Partner With Us
```

Job applicant:
```txt
Home → Careers → Jobs → Job Detail → Apply
```

Research partner:
```txt
Home → Research → Publications → Collaborate
```

Community/stakeholder:
```txt
Home → Contact → Feedback/Complaint/Safeguarding
```

Journalist:
```txt
Home → News → Reports → Media Contact
```

---

## 2.5 Fast, Mobile-First, Low-Frustration

Many users will access the website on mobile and unstable internet.

The site must be:
* Fast
* Clean
* Lightweight
* Easy to navigate
* Easy to read
* Not dependent on heavy animations
* Not buried under large videos
* Not overloaded with scripts

---

# 3. Primary User Personas

## 3.1 Institutional Donor / UN / INGO Partner
Needs to know:
* Is FRAD credible?
* Where does FRAD work?
* What sectors does FRAD cover?
* What projects has FRAD implemented?
* Who has FRAD worked with?
* Can FRAD manage grants?
* Does FRAD have reports?
* Does FRAD understand accountability, safeguarding, and MEAL?
* Is FRAD ready for larger partnerships?

Key pages:
* Home
* About
* Where We Work
* What We Do
* Projects
* Impact
* Reports
* Partners
* Contact / Partner With Us

---

## 3.2 Government / Coordination Actor
Needs to know:
* Is FRAD operational in relevant states/LGAs?
* What sectors does FRAD support?
* Does FRAD coordinate with government?
* Does FRAD work in humanitarian coordination structures?
* Does FRAD have accountability systems?

Key pages:
* Where We Work
* What We Do
* Projects
* Reports
* Contact

---

## 3.3 Job Applicant
Needs to know:
* Are there current openings?
* Where is the job located?
* What is the deadline?
* What are the requirements?
* How do I apply?
* Is recruitment free?
* Is this vacancy genuine?

Key pages:
* Careers
* Jobs
* Consultancies
* Internships
* Fraud Warning

---

## 3.4 FRAD Staff / CMS Editor
Needs to do:
* Add a job
* Close a job
* Upload a report
* Add a project
* Add a story
* Add a partner logo
* Update an impact number
* Activate an emergency alert
* Update contact details

---

## 3.5 Community Member / Affected Population / Stakeholder
Needs to know:
* How can I contact FRAD?
* How can I send feedback?
* How can I report misconduct or safeguarding concerns?
* Will my report be handled confidentially?

Key pages:
* Contact
* Feedback and Complaints
* Safeguarding/PSEA

---

## 3.6 Researcher / Academic / Technical Partner
Needs to know:
* Does FRAD produce knowledge?
* Are there publications?
* Are there assessments?
* Can we collaborate?
* Does FRAD follow ethical data practices?

Key pages:
* Research
* Publications
* Reports
* Projects
* Contact

---

# 4. Core Product Modules

## 4.1 Homepage Module
Required sections:
1. Emergency alert banner
2. Hero
3. Impact numbers
4. Who we are
5. Where we work
6. What we do
7. Featured current response
8. Featured field story
9. Projects in focus
10. Latest reports/publications
11. Partners
12. Accountability/safeguarding
13. Donation/partnership CTA
14. Footer

---

## 4.2 Careers Module
Pages:
```txt
/careers
/careers/jobs
/careers/jobs/[slug]
/careers/consultancies
/careers/consultancies/[slug]
/careers/internships
/careers/fraud-warning
```

---

## 4.3 Publications Module
Pages:
```txt
/publications
/publications/reports
/publications/research
/publications/assessments
/publications/policy-briefs
/publications/annual-reports
/publications/[slug]
```

---

## 4.4 Reports and Accountability Module
Pages:
```txt
/reports
/reports/annual-reports
/reports/project-reports
/reports/policies
/reports/accountability
```

---

## 4.5 Projects Module
Pages:
```txt
/projects
/projects/[slug]
```

---

## 4.6 Stories Module
Pages:
```txt
/stories
/stories/[slug]
```

---

## 4.7 Where We Work Module
Page:
```txt
/where-we-work
```

---

## 4.8 What We Do Module
Pages:
```txt
/what-we-do
/what-we-do/nutrition-health
/what-we-do/wash
/what-we-do/protection-gbv
/what-we-do/education
/what-we-do/livelihoods-resilience
/what-we-do/peacebuilding-social-cohesion
/what-we-do/emergency-response
/what-we-do/innovation-digital-systems
```

---

## 4.9 Research and Learning Module
Pages:
```txt
/research
/research/projects
/research/publications
/research/collaborate
/research/ethics
```

---

## 4.10 Donate Module
Page:
```txt
/donate
```

---

## 4.11 Contact, Feedback, and Safeguarding Module
Page:
```txt
/contact
```

---

# 5. Global UI Components
* 5.1 Header
* 5.2 Footer
* 5.3 Hero Component
* 5.4 Emergency Alert Banner
* 5.5 Impact Stat Card
* 5.6 Programme/Sector Card
* 5.7 Project Card
* 5.8 Story Card
* 5.9 Publication/Report Card
* 5.10 Job Card
* 5.11 Search and Filter Bar
* 5.12 Breadcrumbs
* 5.13 CTA Section
* 5.14 Empty State Component
* 5.15 Loading State
* 5.16 Error State
* 5.17 CMS Preview Banner

---

# 6. Page-Level UX Specification
* 6.1 Homepage UX
* 6.2 About Page UX
* 6.3 Where We Work UX
* 6.4 What We Do UX
* 6.5 Project Detail UX
* 6.6 Careers UX
* 6.7 Publications UX
* 6.8 Contact UX

---

# 7. Visual Design System
* 7.1 Layout (12-column desktop grid, max width 1200–1320px)
* 7.2 Spacing Scale
* 7.3 Typography Scale (Manrope + Inter + Playfair Display)
* 7.4 Color System (FRAD Green, Blue, Gold, Charcoal, Neutral Ivory)
* 7.5 Button System
* 7.6 Card System
* 7.7 Icons
* 7.8 Imagery (Dignity-safe, principled field photography)
* 7.9 Motion (Subtle, dignified transitions)

---

# 8. UX Writing Rules
* Dignified humanitarian copy ("crisis-affected communities", "locally led response")
* Zero manipulative fundraising language
* Clear, action-oriented button copy
* Human empty and error states

---

# 9. Product Requirements by Feature
* 9.1 Search
* 9.2 Filters
* 9.3 Forms (Contact, Partnership, Complaints, Safeguarding/PSEA)
* 9.4 CMS Preview
* 9.5 Approval Workflow
* 9.6 Role-Based Admin Experience

---

# 10. CMS Product Experience
* Headless WordPress CMS with structured ACF fields and WPGraphQL
* Role-Based Access Control (Super Admin, HR Editor, MEAL Editor, Programmes Editor, Communications Editor)

---

# 11–22. Architecture, Mobile UX, Accessibility, Performance, SEO & Roadmap
* 11. Information Architecture Rules
* 12. Mobile UX Requirements
* 13. Accessibility Requirements (Lighthouse 95+, WCAG 2.2 AA)
* 14. Performance Requirements (Lighthouse 85+ mobile, AVIF/WebP)
* 15. SEO & Discoverability
* 16. Analytics & Product Measurement
* 17. Security & Privacy UX
* 18. Bad Design Prevention Rules
* 19. Design Quality Acceptance Criteria
* 20. Page Acceptance Criteria
* 21. Product Roadmap
* 22. AI Agent Instruction
