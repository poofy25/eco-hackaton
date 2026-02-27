# ReMatero — Business Model & Monetization

## Revenue Model Overview

ReMatero operates on a **freemium + commission** hybrid model. The platform is free to use at a basic level (to drive adoption), with revenue generated through promoted listings, transaction commissions, and subscription plans for professional sellers.

```
Revenue Streams
├── 1. Promoted Listings (primary, MVP)
├── 2. Transaction Commission (Phase 2)
├── 3. Subscription Plans (Phase 2)
├── 4. Logistics Partner Fees (Phase 2)
└── 5. Advertising & Partnerships (Phase 3)
```

---

## Revenue Stream Details

### 1. Promoted Listings (MVP — Phase 1)

The simplest and most immediate revenue source. Sellers pay to boost listing visibility.

| Product | Price | Duration | Effect |
|---------|-------|----------|--------|
| **Anunț Promovat** *(Promoted)* | 15 RON | 7 days | Highlighted in search results, "Promovat" badge |
| **Anunț Urgent** *(Urgent)* | 25 RON | 3 days | Top of search results + "Urgent" badge + push to nearby buyers |
| **Pachet Vizibilitate** *(Visibility pack)* | 49 RON | 7 days | Promoted + featured on homepage carousel |

**Why this works for MVP:**
- Zero friction — sellers understand "pay to boost" immediately
- No platform dependency — transaction happens off-platform anyway
- Low price point — accessible even to individuals
- Measurable ROI — sellers see view count increase

### 2. Transaction Commission (Phase 2)

When in-platform reservation tracking is mature enough to reliably attribute transactions.

| Transaction Type | Commission | Cap |
|-----------------|-----------|-----|
| Free listings (donations) | 0% | — |
| Transactions < 500 RON | 5% | 25 RON |
| Transactions 500-5,000 RON | 4% | 200 RON |
| Transactions > 5,000 RON | 3% | 500 RON |

**Commission is charged to the seller** (buyer pays listed price).

**Why deferred to Phase 2:**
- Requires reliable transaction tracking
- Users need to trust the platform before accepting commissions
- Free transactions drive initial volume and network effects

### 3. Subscription Plans (Phase 2)

Monthly/annual plans for professional sellers (companies, contractors, demolition firms).

| Plan | Monthly | Annual | Features |
|------|---------|--------|----------|
| **Gratuit** *(Free)* | 0 RON | 0 RON | 5 active listings, basic profile, standard search |
| **Profesional** | 99 RON/mo | 990 RON/yr | 50 active listings, Verified badge, priority support, bulk upload, 3 promoted listings/mo included |
| **Business** | 249 RON/mo | 2,490 RON/yr | Unlimited listings, Pro badge, analytics dashboard, API access, 10 promoted listings/mo, dedicated account manager |

**Value justification for Profesional (99 RON/mo):**
- A single sale of surplus materials typically recovers 500-5,000+ RON
- Disposal fees for the same materials: 200-2,000 RON saved
- Net value of subscription: easily 10-50x the monthly cost

### 4. Logistics Partner Fees (Phase 2)

Revenue share from transport partners integrated into the platform.

| Model | Fee |
|-------|-----|
| Referral commission | 10-15% of transport fee |
| Featured partner placement | Monthly fixed fee from partner |

**Potential partners:** local transport companies, courier services with truck capacity, crane rental companies.

### 5. Advertising & Partnerships (Phase 3)

| Product | Description | Price Model |
|---------|-------------|-------------|
| Construction supplier ads | Banner ads for new material suppliers | CPM / Monthly |
| Tool rental partnerships | Cross-promote tool rental alongside materials | Revenue share |
| Insurance partner | Construction material quality insurance | Per-policy commission |

---

## Pricing Strategy

### Phase 1 (MVP) — Growth Focus
- **All listings free** (no commission)
- **Only revenue:** promoted listings (optional, self-service)
- **Goal:** maximize user acquisition and listing volume
- **Metric:** listings created, not revenue

### Phase 2 — Monetization Introduction
- Introduce subscription plans (grandfather early users with extended free trial)
- Introduce commission on transactions >500 RON
- Launch logistics partnerships
- **Goal:** achieve unit economics breakeven

### Phase 3 — Revenue Optimization
- Full commission structure active
- Premium features and API access
- Advertising and partnership revenue
- **Goal:** profitability and growth reinvestment

---

## Cost Structure

### Fixed Costs (Monthly)

| Cost | MVP Estimate | Scale Estimate |
|------|-------------|----------------|
| Hosting & infrastructure | 200-500 RON | 2,000-5,000 RON |
| Domain & SSL | 50 RON | 50 RON |
| SMS verification (OTP) | 100-300 RON | 500-2,000 RON |
| Email service | 0-100 RON | 200-500 RON |
| Image storage & CDN | 50-200 RON | 500-2,000 RON |
| **Total fixed** | **400-1,150 RON** | **3,250-9,550 RON** |

### Variable Costs (Per Transaction)

| Cost | Per Transaction |
|------|----------------|
| Payment processing | 1.5-2.5% (when payments go through platform) |
| SMS notifications | 0.15 RON per SMS |
| Image processing | ~0.01 RON per image |

### Team Costs (Post-MVP)

| Role | Phase |
|------|-------|
| 1 Full-stack developer | MVP (founder/co-founder) |
| 1 Community/support manager | Phase 2 |
| 1 Sales/partnerships | Phase 2 |
| 1 Additional developer | Phase 3 |

---

## Revenue Projections (MVP Phase — Months 1-6)

### Assumptions
- Pilot: 5 partner companies, 100 initial listings
- Organic growth: 20% month-over-month listing growth
- Promoted listing conversion: 5% of sellers promote at least 1 listing
- Average promoted listing price: 20 RON

| Month | Active Listings | Active Users | Promoted Listings | Revenue (RON) |
|-------|:--------------:|:------------:|:-----------------:|:-------------:|
| 1 | 100 | 150 | 5 | 100 |
| 2 | 150 | 250 | 10 | 200 |
| 3 | 220 | 400 | 15 | 300 |
| 4 | 330 | 600 | 25 | 500 |
| 5 | 500 | 900 | 40 | 800 |
| 6 | 750 | 1,300 | 60 | 1,200 |
| **Total M1-M6** | | | | **3,100 RON** |

### Break-even Analysis (Phase 2 — Months 7-12)

With subscription + commission revenue:

| Revenue Source | Monthly (M12 target) |
|----------------|:-------------------:|
| Promoted listings | 2,500 RON |
| Subscriptions (15 Professional + 3 Business) | 2,232 RON |
| Commissions (50 transactions, avg 1,000 RON, 4%) | 2,000 RON |
| Logistics referrals | 500 RON |
| **Total Monthly Revenue** | **7,232 RON** |
| **Total Monthly Costs** | **~6,000 RON** |
| **Net** | **+1,232 RON** |

---

## Key Financial Metrics

| Metric | Definition | Target (M12) |
|--------|-----------|:------------:|
| CAC (Customer Acquisition Cost) | Marketing spend / new users | < 10 RON |
| LTV (Lifetime Value) | Average revenue per user over lifetime | > 50 RON |
| LTV:CAC Ratio | | > 5:1 |
| Monthly Burn Rate | Total monthly costs | < 6,000 RON |
| Runway | Cash reserves / burn rate | > 12 months |
| Gross Margin | (Revenue - variable costs) / Revenue | > 70% |

---

## Competitive Pricing Context

| Platform | Listing Fee | Commission | Promoted Listing |
|----------|-----------|-----------|-----------------|
| OLX Romania | Free | 0% | 10-40 RON |
| Facebook Marketplace | Free | 0% | Boost from 5 RON |
| Autovit (cars) | Free-premium | 0% | 15-50 RON |
| **ReMatero** | **Free** | **3-5% (Phase 2)** | **15-49 RON** |

ReMatero's pricing is competitive with general marketplaces while offering domain-specific value (categorization, certification, trust) that justifies the Phase 2 commission.

---

## Go-to-Market Strategy

### Phase 1: Supply-Side Focus (Months 1-3)
- **Direct outreach** to 20-30 construction companies in Bucharest
- **Offer:** free account setup + listing assistance + 3 months of free promoted listings
- **Goal:** 50-100 quality listings to attract buyers
- **Channel:** LinkedIn, construction industry events, direct sales

### Phase 2: Demand-Side Growth (Months 3-6)
- **SEO:** optimize for "materiale constructii second hand", "cărămidă ieftină", etc.
- **Content marketing:** blog posts on renovation savings, material reuse guides
- **Social proof:** case studies from pilot companies (kg saved, money saved)
- **Referral program:** "Invită un prieten, primești un anunț promovat gratuit"

### Phase 3: Network Effects (Months 6-12)
- **Community:** construction material reuse community events
- **Partnerships:** architecture schools, NGOs, municipality waste programs
- **PR:** environmental impact story (tons diverted from landfill)

---

*Related docs: [OVERVIEW.md](./OVERVIEW.md) | [KPI-METRICS.md](./KPI-METRICS.md) | [FEATURES.md](./FEATURES.md)*
