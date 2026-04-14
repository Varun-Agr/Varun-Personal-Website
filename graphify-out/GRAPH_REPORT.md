# Graph Report - .  (2026-04-14)

## Corpus Check
- 68 files · ~444,022 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 82 nodes · 79 edges · 22 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI & Layout|UI & Layout]]
- [[_COMMUNITY_Contact Form Logic|Contact Form Logic]]
- [[_COMMUNITY_Google Apps Script Backend|Google Apps Script Backend]]
- [[_COMMUNITY_Collaborators & Partners|Collaborators & Partners]]
- [[_COMMUNITY_Page Routing & Navigation|Page Routing & Navigation]]
- [[_COMMUNITY_Data Projects & Conferences|Data Projects & Conferences]]
- [[_COMMUNITY_Navbar Internals|Navbar Internals]]
- [[_COMMUNITY_Image Utilities|Image Utilities]]
- [[_COMMUNITY_AI Screening Tools|AI Screening Tools]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Network Animation|Network Animation]]
- [[_COMMUNITY_Dynamic Project Page|Dynamic Project Page]]
- [[_COMMUNITY_Next.js Config Types|Next.js Config Types]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Project Data Store|Project Data Store]]
- [[_COMMUNITY_Theme System|Theme System]]
- [[_COMMUNITY_Image Carousel|Image Carousel]]
- [[_COMMUNITY_README|README]]
- [[_COMMUNITY_Events|Events]]
- [[_COMMUNITY_World Bank|World Bank]]
- [[_COMMUNITY_J-PAL|J-PAL]]
- [[_COMMUNITY_NeurIPS|NeurIPS]]

## God Nodes (most connected - your core abstractions)
1. `Homepage (ClonePage)` - 10 edges
2. `doPost()` - 8 edges
3. `Varun Agrawal (Site Owner)` - 6 edges
4. `Contact Page` - 5 edges
5. `Work Detail Page ([slug])` - 5 edges
6. `useIST()` - 4 edges
7. `getSpreadsheetUrl()` - 4 edges
8. `Navbar Component` - 4 edges
9. `Works Page (All Projects)` - 4 edges
10. `Secure AI Futures Lab` - 4 edges

## Surprising Connections (you probably didn't know these)
- `NetworkBackground Component (Three.js)` --conceptually_related_to--> `Global CSS Styles`  [INFERRED]
  src/app/components/NetworkBackground.tsx → src/app/globals.css
- `Root Layout` --references--> `Global CSS Styles`  [EXTRACTED]
  src/app/layout.tsx → src/app/globals.css
- `Work Detail Page ([slug])` --references--> `Project Interface`  [EXTRACTED]
  src/app/work/[slug]/page.tsx → src/app/projects.ts
- `ImageCarousel Component` --shares_data_with--> `Project Interface`  [INFERRED]
  src/app/components/ImageCarousel.tsx → src/app/projects.ts
- `Homepage (ClonePage)` --calls--> `NetworkBackground Component (Three.js)`  [EXTRACTED]
  src/app/page.tsx → src/app/components/NetworkBackground.tsx

## Hyperedges (group relationships)
- **Shared Theme System (C + FONT_SANS)** — theme_module, contact_page, navbar_component [EXTRACTED 1.00]
- **Pages Consuming projects.ts Data** — projects_data_module, page_homepage, works_page, work_slug_page [EXTRACTED 1.00]
- **Pages Using Shared Navbar** — navbar_component, page_homepage, works_page, work_slug_page, events_page, contact_page [EXTRACTED 1.00]
- **Duplicated useIST Hook Across Pages** — page_homepage, contact_page, works_page, events_page [INFERRED 0.90]
- **AI Talent Pipeline Project Cluster** — project_measuremint, project_ml_research_talent_map, project_talent_index_jd, project_ai_screening_pipeline, project_recruiting_data_infra, project_talent_graph_engine [INFERRED 0.85]
- **Logo Wall Collaborators** — collaborator_uk_aisi, collaborator_far_ai, collaborator_apollo, collaborator_world_bank, collaborator_jpal, collaborator_schmidt_sciences [EXTRACTED 1.00]
- **Upcoming Conference Timeline (2026)** — conference_iclr, conference_icml, conference_neurips [EXTRACTED 1.00]
- **Contact Form Submission Pipeline** — contact_page, google_appscript, google_sheets_backend [EXTRACTED 1.00]

## Communities

### Community 0 - "UI & Layout"
Cohesion: 0.21
Nodes (13): Harry George (Design Credit), Global CSS Styles, ImageCarousel Component, Root Layout, NetworkBackground Component (Three.js), Homepage (ClonePage), useScrollReveal Hook (Intersection Observer), useTronTrail Hook (Mouse Trail Animation) (+5 more)

### Community 1 - "Contact Form Logic"
Cohesion: 0.18
Nodes (1): useIST()

### Community 2 - "Google Apps Script Backend"
Cohesion: 0.36
Nodes (9): createResponse(), doPost(), getSpreadsheetUrl(), logToCompanySheet(), logToContactSheet(), logToHiringSheet(), sendCompanyEmailNotification(), sendContactEmailNotification() (+1 more)

### Community 3 - "Collaborators & Partners"
Cohesion: 0.2
Nodes (10): Apollo Research, FAR.AI, Schmidt Sciences, UK AISI, Secure AI Futures Lab, SteadRise (Organisation), Varun Agrawal (Site Owner), AI Security Summit - Lucid Computing (2023) (+2 more)

### Community 4 - "Page Routing & Navigation"
Cohesion: 0.47
Nodes (6): Contact Page, Events Page, Google Apps Script Form Handler, Google Sheets Form Backend, Navbar Component, Theme Constants (C, FONT_SANS)

### Community 5 - "Data Projects & Conferences"
Cohesion: 0.33
Nodes (6): ICLR (Conference), ICML (Conference), Indirect Talent Sourcing Channel (WIP), ML Research Talent Map (50K Profiles), Recruiting Data Infrastructure (80K Records), Talent Graph Engine (100K+ Profiles)

### Community 6 - "Navbar Internals"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "Image Utilities"
Cohesion: 0.67
Nodes (0): 

### Community 8 - "AI Screening Tools"
Cohesion: 0.67
Nodes (3): AI Candidate Screening Pipeline, Measuremint - AI Talent Intelligence Platform, Talent Index & JD Fingerprinting

### Community 9 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Network Animation"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Dynamic Project Page"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Next.js Config Types"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Project Data Store"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Theme System"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Image Carousel"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "README"
Cohesion: 1.0
Nodes (1): Resume Next.js Template (ThemeWagon)

### Community 18 - "Events"
Cohesion: 1.0
Nodes (1): Academic Reception - New Delhi (2024)

### Community 19 - "World Bank"
Cohesion: 1.0
Nodes (1): World Bank

### Community 20 - "J-PAL"
Cohesion: 1.0
Nodes (1): J-PAL

### Community 21 - "NeurIPS"
Cohesion: 1.0
Nodes (1): NeurIPS (Conference)

## Knowledge Gaps
- **24 isolated node(s):** `Resume Next.js Template (ThemeWagon)`, `Events Page`, `Root Layout`, `useIST Hook (IST Clock + Online Status)`, `useTronTrail Hook (Mouse Trail Animation)` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Root Layout`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Network Animation`** (2 nodes): `NetworkBackground()`, `NetworkBackground.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dynamic Project Page`** (2 nodes): `generateStaticParams()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config Types`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Project Data Store`** (1 nodes): `projects.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme System`** (1 nodes): `theme.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Carousel`** (1 nodes): `ImageCarousel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `README`** (1 nodes): `Resume Next.js Template (ThemeWagon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Events`** (1 nodes): `Academic Reception - New Delhi (2024)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `World Bank`** (1 nodes): `World Bank`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `J-PAL`** (1 nodes): `J-PAL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `NeurIPS`** (1 nodes): `NeurIPS (Conference)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Homepage (ClonePage)` connect `UI & Layout` to `Collaborators & Partners`, `Page Routing & Navigation`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `Varun Agrawal (Site Owner)` connect `Collaborators & Partners` to `UI & Layout`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `Contact Page` connect `Page Routing & Navigation` to `UI & Layout`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `Resume Next.js Template (ThemeWagon)`, `Events Page`, `Root Layout` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._