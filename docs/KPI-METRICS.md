# ReMatero — Success Metrics & KPIs

## Metrics Framework

ReMatero tracks three categories of metrics: **Platform Health** (is the marketplace working?), **User Engagement** (are users active and satisfied?), and **Impact** (are we achieving our environmental mission?).

```
                    ┌─────────────────────┐
                    │   North Star Metric  │
                    │   Kg of materials    │
                    │   successfully       │
                    │   reused per month   │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
 ┌────────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
 │ Platform Health │  │ User Engagement│  │ Environmental  │
 │ Metrics         │  │ Metrics        │  │ Impact Metrics │
 └─────────────────┘  └────────────────┘  └────────────────┘
```

---

## North Star Metric

**Kilograms of materials successfully reused per month**

This single metric captures the core value proposition: materials diverted from landfill through the platform. It correlates with:
- Transaction volume (more transactions = more kg)
- Listing quality (accurate listings = completed transactions)
- User satisfaction (happy users = repeat transactions)
- Environmental impact (direct measurement)

---

## 1. Platform Health Metrics

### MVP KPIs (Phase 1)

| KPI | Definition | Target (M3) | Target (M6) |
|-----|-----------|:-----------:|:-----------:|
| Active listings | Listings with status "active" | 150 | 500 |
| New listings / week | Listings created in last 7 days | 20 | 50 |
| Listing sell-through rate | % of listings that reach "Completed" status | 15% | 25% |
| Time to first reservation | Median days from listing creation to first reservation | < 10 days | < 7 days |
| Time to transaction | Median days from listing to completed transaction | < 14 days | < 10 days |
| Reservation completion rate | % of reservations that reach "Completed" | 40% | 55% |
| Listing quality score | % of listings with 3+ photos AND 50+ char description | 50% | 70% |

### Supply & Demand Balance

| Metric | Definition | Healthy Range |
|--------|-----------|:------------:|
| Listings per active buyer | Active listings / users who searched in last 7 days | 0.5 - 3.0 |
| Buyer-to-seller ratio | Active buyers / active sellers | 3:1 - 8:1 |
| Category coverage | % of categories with at least 5 active listings | > 60% |
| Geographic coverage | Number of cities with 10+ active listings | Growing MoM |
| Listing freshness | % of active listings updated in last 14 days | > 70% |

### Funnel Metrics

```
Search impressions (listing appears in search results)
    │
    ▼  CTR (Click-through rate) — Target: > 8%
Listing views
    │
    ▼  Contact rate — Target: > 12%
Messages sent OR Reservations made
    │
    ▼  Reservation rate — Target: > 20% of contacts
Reservations created
    │
    ▼  Completion rate — Target: > 55%
Completed transactions
    │
    ▼  Review rate — Target: > 40%
Reviews submitted
```

---

## 2. User Engagement Metrics

### Acquisition

| KPI | Definition | Target (M3) | Target (M6) |
|-----|-----------|:-----------:|:-----------:|
| New registrations / week | Users who completed registration | 30 | 80 |
| Registration completion rate | Started registration / completed (incl. phone verify) | > 70% | > 75% |
| First listing rate | % of new sellers who create a listing within 7 days | > 50% | > 60% |
| First search rate | % of new buyers who perform a search within 24 hours | > 80% | > 85% |
| Organic vs. referred | % of new users from organic search vs. referral | Track | Track |

### Activation

| KPI | Definition | Target |
|-----|-----------|:------:|
| Seller activation | Created account → published first listing within 7 days | > 50% |
| Buyer activation | Created account → made first reservation within 14 days | > 20% |
| Profile completion | % of users with complete profile (all fields + avatar) | > 40% |

### Retention

| KPI | Definition | Target (M6) |
|-----|-----------|:-----------:|
| DAU / MAU | Daily active users / Monthly active users | > 15% |
| Seller retention (30-day) | % of sellers active in month N who are active in month N+1 | > 50% |
| Buyer retention (30-day) | % of buyers active in month N who are active in month N+1 | > 35% |
| Repeat transaction rate | % of users with 2+ completed transactions | > 25% |
| Listing renewal rate | % of expired listings that are relisted | > 20% |

### Engagement

| KPI | Definition | Target |
|-----|-----------|:------:|
| Messages per listing | Average message threads per active listing | 1.5 - 3.0 |
| Response rate | % of messages responded to within 24h | > 70% |
| Avg. response time | Median time to first reply to a message | < 4 hours |
| Session duration | Average time spent per session | > 3 min |
| Sessions per week | Average sessions per active user per week | > 2 |
| Search-to-view ratio | Searches that result in at least 1 listing view | > 60% |

### Satisfaction

| KPI | Definition | Target |
|-----|-----------|:------:|
| Average rating | Platform-wide average transaction rating | > 4.0 |
| NPS (Net Promoter Score) | Quarterly survey | > 30 |
| Support ticket rate | Support requests per 100 transactions | < 5 |
| Dispute rate | Disputes per 100 completed transactions | < 3% |
| Churn reason tracking | Top 3 reasons for account deactivation | Track |

---

## 3. Environmental Impact Metrics

### Waste Diversion

| KPI | Definition | Calculation |
|-----|-----------|-------------|
| **Kg reused / month** | Total weight of materials in completed transactions | Sum of (quantity × unit weight) for completed transactions |
| **Tons reused / year** | Annual rollup | Monthly × 12 (annualized) |
| **Listings donated** | % of completed transactions that were free | Count where price_type = 'free' and status = 'completed' |
| **Material types reused** | Diversity of categories in completed transactions | Distinct categories in completed transactions |

### CO2 Equivalent Saved

Materials reused avoid both disposal emissions and production emissions for new materials.

| Material Category | CO2 saved per ton reused | Source |
|-------------------|:------------------------:|--------|
| Cărămidă (Brick) | 0.24 t CO2 | EU construction LCA data |
| Oțel (Steel) | 1.85 t CO2 | World Steel Association |
| Lemn (Wood) | 0.72 t CO2 | EU timber industry |
| Beton (Concrete) | 0.13 t CO2 | IPCC guidelines |
| Gresie/Faianță (Tiles) | 0.55 t CO2 | EU ceramics industry |
| Plastic (PVC pipes etc.) | 2.30 t CO2 | PlasticsEurope |
| Sticlă (Glass/windows) | 0.85 t CO2 | EU glass industry |

**Platform-level calculation:**
```
monthly_co2_saved = Σ (completed_kg_by_category × co2_factor_by_category)
```

### Cost Savings

| KPI | Definition | Calculation |
|-----|-----------|-------------|
| Buyer savings / transaction | Estimated savings vs. buying new | (new_price_estimate - actual_price) per transaction |
| Seller recovery / transaction | Revenue from materials that would be disposed | actual_price per transaction |
| Disposal costs avoided | Estimated disposal fees saved by sellers | Avg disposal cost × kg sold |
| Total platform savings / month | Sum of buyer savings + seller recovery + disposal avoided | Running total |

**Savings estimates for common materials:**

| Material | New Price (RON/unit) | Typical ReMatero Price | Buyer Savings |
|----------|:-------------------:|:---------------------:|:-------------:|
| Cărămidă (per buc) | 1.5 | 0.5 | 67% |
| BCA (per buc) | 8 | 3-4 | 50-63% |
| Parchet stejar (per m²) | 200 | 60-100 | 50-70% |
| Oțel beton (per kg) | 5 | 2-3 | 40-60% |
| Gresie (per m²) | 80 | 20-40 | 50-75% |

---

## Dashboard Design (Phase 3)

### Public Impact Dashboard
Visible on the platform homepage:

```
┌─────────────────────────────────────────────────────┐
│              ReMatero — Impact în cifre             │
│                                                     │
│   🏗️ 12,450 kg    💰 185,000 RON    🌍 3.2 tone   │
│   materiale       economii          CO2 evitat      │
│   reutilizate     totale            saved           │
│                                                     │
│   📦 1,234        👥 890            ⭐ 4.3          │
│   anunțuri        utilizatori       rating mediu    │
│   publicate       activi                            │
└─────────────────────────────────────────────────────┘
```

### Seller Analytics Dashboard (Phase 3)

| Widget | Data |
|--------|------|
| Listing performance | Views, inquiries, reservations per listing |
| Revenue summary | Total earned, average price, trend |
| Category insights | Which materials sell fastest |
| Buyer demographics | Location distribution of inquiries |
| Environmental impact | Personal kg reused, CO2 saved |
| Rating trend | Rating over time, recent reviews |

### Admin Analytics Dashboard (Phase 3)

| Widget | Data |
|--------|------|
| User growth | Registrations, activations, retention curves |
| Listing volume | Created, sold, expired, by category |
| Transaction velocity | Daily/weekly completed transactions |
| Geographic heatmap | Listings and demand by region |
| Revenue breakdown | By stream (promoted, commission, subscription) |
| Trust health | Verification rates, dispute rates, report volume |
| Category demand | Search volume vs. listing supply by category |

---

## Reporting Cadence

| Report | Audience | Frequency | Key Metrics |
|--------|----------|-----------|-------------|
| Daily pulse | Team | Daily | New listings, transactions, revenue |
| Weekly health | Team | Weekly | Funnel metrics, retention, engagement |
| Monthly impact | Stakeholders | Monthly | Kg reused, CO2 saved, cost savings, user growth |
| Quarterly review | Board/investors | Quarterly | Revenue, unit economics, NPS, growth trends |

---

## Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| New listings / day | < 3 | < 1 |
| Reservation completion rate | < 40% | < 25% |
| Seller response rate (24h) | < 60% | < 40% |
| Avg. rating | < 3.8 | < 3.5 |
| Dispute rate | > 5% | > 10% |
| Registration completion | < 60% | < 45% |

---

*Related docs: [OVERVIEW.md](./OVERVIEW.md) | [BUSINESS-MODEL.md](./BUSINESS-MODEL.md) | [FEATURES.md](./FEATURES.md)*
