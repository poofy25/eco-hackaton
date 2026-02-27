# ReMatero — Feature Breakdown

## Phase 1: MVP (Weeks 1-6)

### 1.1 Authentication & User Management

**F1.1.1 — Registration**
- Email + password registration
- Phone number verification (SMS OTP)
- Account type selection: Individual / Company
- Terms of service acceptance

> **User Story:** *Ca utilizator nou, vreau să mă înregistrez rapid cu email și telefon, ca să pot începe să listez sau să caut materiale.* *(As a new user, I want to register quickly with email and phone so I can start listing or searching for materials.)*

**F1.1.2 — Login & Session**
- Email/password login
- "Remember me" persistent session
- Password reset via email

**F1.1.3 — User Profile**
- Display name, avatar, bio
- Location (city + optional address)
- Contact preferences (in-app only / phone visible)
- Account type badge (Individual / Company)
- Profile completeness indicator

> **User Story:** *Ca vânzător, vreau să am un profil complet cu informații despre firma mea, ca să inspir încredere cumpărătorilor.* *(As a seller, I want a complete profile with info about my company to inspire buyer trust.)*

---

### 1.2 Listing Management

**F1.2.1 — Create Listing**
- Title (free text, max 100 chars)
- Description (rich text, max 2000 chars)
- Category selection (hierarchical — see [DATA-MODEL.md](./DATA-MODEL.md))
- Condition rating: Nou (New) / Foarte bun (Very good) / Bun (Good) / Acceptabil (Acceptable)
- Photos: 1-10 images, first is cover
- Quantity + unit (buc/pieces, m², m³, kg, tone, paleti)
- Price: per unit / per lot / negociabil / gratis (free/donation)
- Location: city + address or map pin
- Availability: Disponibil acum / Disponibil din [date]

> **User Story:** *Ca vânzător, vreau să creez un anunț cu poze, descriere și preț în mai puțin de 3 minute, ca să nu pierd timp.* *(As a seller, I want to create a listing with photos, description and price in under 3 minutes.)*

**F1.2.2 — Edit / Delete Listing**
- Edit all fields post-creation
- Mark as "Vândut" (Sold) / "Rezervat" (Reserved) / "Retras" (Withdrawn)
- Delete with confirmation dialog
- Edit history visible to owner

**F1.2.3 — My Listings Dashboard**
- List view of all seller's listings
- Filter by status: Active / Reserved / Sold / Withdrawn
- Quick actions: edit, mark sold, delete
- View count and inquiry count per listing

> **User Story:** *Ca vânzător, vreau să văd toate anunțurile mele într-un singur loc și să le gestionez rapid.* *(As a seller, I want to see all my listings in one place and manage them quickly.)*

---

### 1.3 Search & Discovery

**F1.3.1 — Search**
- Full-text search across title + description
- Search suggestions / autocomplete
- Recent searches history

**F1.3.2 — Filters**
- Category (hierarchical tree)
- Location: city / radius (5km, 10km, 25km, 50km)
- Condition: Nou / Foarte bun / Bun / Acceptabil
- Price range: min-max slider
- Availability: Disponibil acum only
- Price type: Gratis / Cu preț
- Sort by: Relevance / Price (asc/desc) / Distance / Date posted

**F1.3.3 — Browse by Category**
- Visual category grid on homepage
- Category hierarchy:
  - Zidărie (Masonry): cărămidă, BCA, blocuri beton
  - Lemn (Wood): cherestea, grinzi, parchet, OSB, placaj
  - Metal: oțel beton, profile, tablă, țevi
  - Finisaje (Finishes): gresie, faianță, parchet, vopsea
  - Instalații (Plumbing/Electrical): țevi, cabluri, prize, robineți
  - Acoperișuri (Roofing): țiglă, tablă, izolație
  - Izolații (Insulation): polistiren, vată minerală, folie
  - Feronerie (Hardware): șuruburi, cuie, dibluri, balamale
  - Uși & Ferestre (Doors & Windows)
  - Altele (Other)

> **User Story:** *Ca cumpărător, vreau să filtrez materialele după categorie, locație și stare, ca să găsesc rapid ce am nevoie în apropierea mea.* *(As a buyer, I want to filter materials by category, location, and condition to quickly find what I need nearby.)*

---

### 1.4 Reservation System

**F1.4.1 — Reserve Material**
- "Rezervă" button on listing
- Buyer confirms quantity needed
- Optional message to seller
- Reservation valid for 48 hours (configurable by seller: 24h/48h/72h)

**F1.4.2 — Reservation Management**
- Seller receives notification of reservation
- Seller actions: Accept / Reject / Counter-offer
- Buyer actions: Confirm pickup / Cancel
- Auto-expire after timeout
- Status flow: Pending → Accepted → Confirmed Pickup → Completed / Cancelled / Expired

> **User Story:** *Ca cumpărător, vreau să rezerv materialul care mă interesează, ca să nu fie vândut altcuiva până ajung să-l ridic.* *(As a buyer, I want to reserve the material I'm interested in so it's not sold to someone else before I pick it up.)*

---

### 1.5 Messaging

**F1.5.1 — Conversation Threads**
- 1:1 messaging between buyer and seller
- Linked to specific listing
- Text messages with timestamps
- Photo sharing in chat
- Read receipts

**F1.5.2 — Notifications**
- New message notification (in-app)
- Email notification for unread messages (after 1 hour)
- Reservation status change notifications

> **User Story:** *Ca cumpărător, vreau să pot discuta cu vânzătorul despre detalii și să negociez prețul, fără să dau numărul meu de telefon.* *(As a buyer, I want to discuss details with the seller and negotiate price without sharing my phone number.)*

---

### 1.6 Ratings & Reviews (Basic)

**F1.6.1 — Post-Transaction Rating**
- Triggered after reservation is marked "Completed"
- Star rating (1-5) + optional text review
- Both parties can rate each other
- Review visible on user profile

> **User Story:** *Ca cumpărător, vreau să las o recenzie după tranzacție, ca să ajut alți cumpărători să știe dacă vânzătorul e de încredere.* *(As a buyer, I want to leave a review after the transaction to help other buyers know if the seller is trustworthy.)*

---

## Phase 2: Growth (Weeks 7-14)

### 2.1 Verified Certification

**F2.1.1 — Seller Verification**
- Company document upload (CUI, registration certificate)
- Identity verification for individuals
- "Verificat" badge on profile and listings
- See [TRUST-SYSTEM.md](./TRUST-SYSTEM.md) for full certification design

### 2.2 Logistics Partner Integration

**F2.2.1 — Transport Estimation**
- Estimated transport cost based on distance + weight
- Partner transport booking (redirect to partner)
- Pickup/delivery scheduling

### 2.3 Advanced Search

**F2.3.1 — Saved Searches**
- Save search criteria
- Email/push notifications when new matching listings appear
- Search frequency: instant / daily digest / weekly

**F2.3.2 — Map View**
- Map-based browsing with listing pins
- Cluster view for dense areas
- "Search this area" on map pan

### 2.4 Enhanced Notifications

**F2.4.1 — Push Notifications**
- New message, reservation update, saved search match
- Price drop alerts for watched listings
- Configurable notification preferences

### 2.5 Reviews V2

**F2.5.1 — Detailed Reviews**
- Category-specific ratings (accuracy, communication, punctuality)
- Photo reviews (buyer can upload photos of received materials)
- Seller response to reviews
- Review helpfulness voting

---

## Phase 3: Scale (Weeks 15-26)

### 3.1 Pro Certification

**F3.1.1 — Technical Reports**
- Professional material inspection reports
- Lab test results upload
- Structural integrity certification for load-bearing materials
- See [TRUST-SYSTEM.md](./TRUST-SYSTEM.md)

### 3.2 Analytics Dashboard

**F3.2.1 — Seller Analytics**
- Views, inquiries, conversion rates per listing
- Revenue tracking
- Best-performing categories and pricing insights
- Environmental impact summary (kg diverted, CO2 saved)

**F3.2.2 — Platform Analytics (Admin)**
- User growth, listing volume, transaction velocity
- Category demand heatmaps
- Geographic coverage analysis
- See [KPI-METRICS.md](./KPI-METRICS.md)

### 3.3 API for Partners

**F3.3.1 — Public API**
- Listing search API for partner integrations
- Webhook notifications for listing events
- OAuth2 authentication
- Rate limiting and usage tiers

### 3.4 Mobile App

**F3.4.1 — Native Mobile**
- iOS and Android native apps
- Camera integration for quick listing
- Push notifications
- Offline-capable listing drafts

### 3.5 AI Categorization

**F3.5.1 — Smart Listing**
- Photo recognition for material type and condition
- Auto-suggest category, condition, estimated price
- Description generation from photos
- Duplicate listing detection

---

## Feature Priority Matrix

| Feature | Impact | Effort | Phase | Priority |
|---------|--------|--------|-------|----------|
| Listing CRUD | Critical | Medium | 1 | P0 |
| Search & Filter | Critical | Medium | 1 | P0 |
| Auth & Profiles | Critical | Low | 1 | P0 |
| Reservation | High | Medium | 1 | P0 |
| Messaging | High | Medium | 1 | P1 |
| Basic Ratings | Medium | Low | 1 | P1 |
| Seller Verification | High | Medium | 2 | P1 |
| Saved Searches | Medium | Low | 2 | P2 |
| Map View | Medium | Medium | 2 | P2 |
| Logistics Integration | High | High | 2 | P2 |
| Pro Certification | Medium | High | 3 | P3 |
| Analytics Dashboard | Medium | High | 3 | P3 |
| Mobile App | High | Very High | 3 | P3 |
| AI Categorization | Medium | High | 3 | P3 |

---

*Related docs: [OVERVIEW.md](./OVERVIEW.md) | [DATA-MODEL.md](./DATA-MODEL.md) | [USER-FLOWS.md](./USER-FLOWS.md) | [ARCHITECTURE.md](./ARCHITECTURE.md)*
