# ReMatero — Certification & Trust System

## Philosophy

Trust is the #1 barrier in the second-hand construction materials market. Buyers fear poor quality, misrepresented condition, and wasted trips. Sellers fear no-shows and unfair reviews. ReMatero's trust system addresses both sides through a progressive certification model, transparent ratings, and fraud prevention.

**Core principle:** Trust is earned incrementally. Every user starts at Basic and can progress through verification tiers based on behavior and documentation.

---

## Certification Tiers

### Tier 1: Basic (Default — All Users)

**Requirements:**
- Completed registration (email + phone verified)
- Profile filled (name, city, account type)
- At least 1 listing with photos

**What it provides:**
- Can create listings with photos + description
- Subject to community ratings
- Standard search visibility
- Basic profile badge: "Membru" *(Member)*

**Trust signals for buyers:**
- Photo requirements (min 1, recommended 3+)
- Seller profile with city, member since date
- Rating average and count displayed
- Response rate and response time metrics

**Listing quality standards:**
| Requirement | Rule |
|-------------|------|
| Photos | Min 1 photo, recommended 3+ showing different angles |
| Title | 5-100 characters, descriptive |
| Description | Min 20 characters, must describe material condition |
| Category | Must select from category tree (no "Uncategorized") |
| Condition | Must select condition rating |
| Location | City is required |

---

### Tier 2: Verified (Phase 2)

**Requirements:**
- All Basic requirements met
- **Companies:** Upload CUI certificate + company registration
- **Individuals:** Upload ID card (both sides)
- Admin review and approval (2-3 business days)
- Minimum 3 completed transactions with average rating ≥ 3.5

**What it provides:**
- "Verificat ✓" badge on profile and all listings
- Boosted visibility in search results (+15% ranking boost)
- Can add phone number visibility to listings
- Access to bulk listing tools
- Priority customer support
- Monthly performance summary email

**Verification process:**
```
User submits documents
        │
        ▼
Admin reviews (2-3 business days)
        │
        ├── Approved → Badge granted, valid 1 year
        │
        ├── More info needed → Request sent to user
        │
        └── Rejected → Reason provided, can reapply in 30 days
```

**Document requirements:**
| Account Type | Required Documents | Verification Check |
|-------------|-------------------|-------------------|
| Company | CUI certificate, registration doc | CUI validity via ANAF API, company active status |
| Individual | ID card (front + back) | Name matches profile, valid ID |

---

### Tier 3: Pro (Phase 3)

**Requirements:**
- All Verified requirements met
- Minimum 20 completed transactions, average rating ≥ 4.0
- Professional material inspection capability (own or partner)
- Signed quality commitment agreement

**What it provides:**
- "Pro ⭐" badge on profile and listings
- Top visibility in search results (+30% ranking boost)
- Can attach technical inspection reports to listings
- Can attach lab test results for materials
- Featured in "Vânzători de încredere" *(Trusted sellers)* section
- Access to analytics dashboard
- Dedicated account manager
- API access for bulk operations

**Technical reports include:**
- Material composition and grade
- Structural integrity assessment (for load-bearing materials)
- Moisture content (for wood)
- Dimensions accuracy verification
- Photo documentation by inspector
- Digital signature and timestamp

---

## Tier Comparison

| Feature | Basic | Verified ✓ | Pro ⭐ |
|---------|:-----:|:----------:|:------:|
| Create listings | ✓ | ✓ | ✓ |
| Photos required | 1+ | 1+ | 3+ |
| Identity verified | — | ✓ | ✓ |
| Search boost | — | +15% | +30% |
| Bulk listing tools | — | ✓ | ✓ |
| Technical reports | — | — | ✓ |
| Analytics dashboard | — | — | ✓ |
| Priority support | — | ✓ | ✓ |
| Trusted seller badge | — | — | ✓ |
| API access | — | — | ✓ |
| Cost | Free | Free | Subscription |

---

## Rating & Review System

### Rating Structure

**Post-transaction rating (both parties):**
- Overall star rating: 1-5 stars
- Optional text review (max 1000 characters)

**Phase 2 — Detailed category ratings:**
| Category | Description |
|----------|-------------|
| Acuratețe *(Accuracy)* | Material matched description and photos |
| Comunicare *(Communication)* | Responsiveness and clarity |
| Punctualitate *(Punctuality)* | On time for pickup/meeting |

### Rating Display

**Profile rating:**
```
★★★★☆ 4.2 (34 recenzii)
─────────────────────────
★★★★★  ████████████░  68%
★★★★☆  ████░░░░░░░░  18%
★★★☆☆  ██░░░░░░░░░░   8%
★★☆☆☆  █░░░░░░░░░░░   3%
★☆☆☆☆  █░░░░░░░░░░░   3%
```

**Individual review:**
```
Cristina B. ★★★★★
"Parchetul era exact ca în poze, foarte bine întreținut.
 Elena a fost super comunicativă și punctuală."
Acum 3 zile
```

### Rating Rules

| Rule | Implementation |
|------|---------------|
| Rating window | 14 days after transaction marked "Completed" |
| One rating per transaction per party | Enforced by unique constraint (reservation_id + reviewer_id) |
| Minimum transactions for average display | Average shown after 3+ reviews; before that, show count only |
| Rating manipulation prevention | Cannot rate own transactions, rate limiting (max 5 reviews/day) |
| Review editing | Can edit within 24h of submission |
| Seller response | Seller can post one public reply to each review (Phase 2) |

### Trust Score Calculation

```
trust_score = (
    0.4 × normalized_rating_avg +
    0.2 × normalized_transaction_count +
    0.2 × response_rate +
    0.1 × profile_completeness +
    0.1 × account_age_factor
)
```

Where:
- `normalized_rating_avg` = rating_avg / 5.0
- `normalized_transaction_count` = min(completed_transactions / 50, 1.0)
- `response_rate` = messages_responded / messages_received (within 24h)
- `profile_completeness` = filled_fields / total_fields
- `account_age_factor` = min(account_age_days / 365, 1.0)

Trust score is used internally for search ranking, not displayed directly to users.

---

## Fraud Prevention

### Listing Fraud

| Risk | Prevention |
|------|-----------|
| Fake photos (stolen from internet) | Require original photos (EXIF data check), reverse image search (Phase 3) |
| Misleading condition | Standardized condition definitions with photo examples |
| Price manipulation (fake low prices for visibility) | Flag anomalous pricing, require actual transaction for "Sold" status |
| Ghost listings (never intend to sell) | Auto-expire after 30 days, flag sellers with high rejection rate |
| Duplicate listings | Detect similar title + photos from same seller |

### User Fraud

| Risk | Prevention |
|------|-----------|
| Fake accounts | Phone verification required, rate-limit account creation per phone |
| Rating manipulation (self-reviews) | Cannot rate own transactions, detect pattern (same IP, device fingerprint) |
| Shill bidding / fake reservations | Track reservation completion rate, flag users with high cancellation |
| Harassment / spam | Message rate limiting, report & block functionality |

### Automated Flags

The system automatically flags for admin review when:
- A listing gets 3+ reports
- A user's rating drops below 2.0
- Reservation cancellation rate exceeds 50% (min 5 transactions)
- Account created with previously banned phone number
- Listing price is >70% below average for category and condition

---

## Reporting Mechanism

### How to Report

**From listing:** "⚠ Raportează acest anunț" *(Report this listing)*
**From profile:** "⚠ Raportează acest utilizator" *(Report this user)*
**From chat:** "⚠ Raportează conversația" *(Report this conversation)*

### Report Categories

| Category | Examples |
|----------|---------|
| Anunț înșelător *(Misleading listing)* | Photos don't match reality, wrong condition rating |
| Conținut inadecvat *(Inappropriate content)* | Offensive language, unrelated materials |
| Posibilă fraudă *(Possible fraud)* | Suspicious pricing, asking for payment outside platform |
| Comportament abuziv *(Abusive behavior)* | Harassment in messages, threats |
| Spam | Duplicate listings, promotional content |
| Altceva *(Other)* | Free text description |

### Resolution Process

```
Report submitted
      │
      ▼
Auto-classified by category
      │
      ▼
Admin queue (priority: fraud > abuse > misleading > spam > other)
      │
      ├── Dismiss (no violation) → Reporter notified
      │
      ├── Warning → Offender notified, record on file
      │
      ├── Content removal → Listing/review removed, offender notified
      │
      ├── Temporary suspension → 7/30 day ban
      │
      └── Permanent ban → Account deactivated
```

### Escalation Thresholds

| Threshold | Action |
|-----------|--------|
| 1st report | Logged, admin reviews if category is fraud/abuse |
| 3 reports on same listing | Listing auto-hidden pending review |
| 3 reports on same user (30-day window) | Account flagged for priority review |
| 5+ reports confirmed | Automatic 7-day suspension |
| 2+ suspensions | Permanent ban review |

---

## Trust Badges Visual Guide

```
┌─────────────────────────────────────┐
│  Basic       │  Membru              │
│              │  ○ Unverified        │
│              │  Grey badge          │
├──────────────┼──────────────────────┤
│  Verified    │  Verificat ✓         │
│              │  Blue badge          │
│              │  ID/company verified │
├──────────────┼──────────────────────┤
│  Pro         │  Pro ⭐              │
│              │  Gold badge          │
│              │  Technical reports   │
└──────────────┴──────────────────────┘
```

---

*Related docs: [FEATURES.md](./FEATURES.md) | [USER-FLOWS.md](./USER-FLOWS.md) | [BUSINESS-MODEL.md](./BUSINESS-MODEL.md)*
