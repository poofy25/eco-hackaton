# ReMatero — Technical Architecture

## Architecture Overview

ReMatero follows a **modular monolith** approach for MVP, designed to be decomposed into microservices as the platform scales. The architecture prioritizes developer velocity for the MVP phase while maintaining clean boundaries for future extraction.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENTS                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Web App      │  │ Mobile Web   │  │ Partner API  │              │
│  │ (SPA/SSR)    │  │ (Responsive) │  │ (Phase 3)    │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                 │                       │
└─────────┼─────────────────┼─────────────────┼───────────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                     ┌──────▼──────┐
                     │   API       │
                     │   Gateway / │
                     │   Reverse   │
                     │   Proxy     │
                     └──────┬──────┘
                            │
┌───────────────────────────┼─────────────────────────────────────────┐
│                    APPLICATION LAYER                                 │
│                           │                                         │
│  ┌────────────┐  ┌───────▼───────┐  ┌──────────────┐              │
│  │ Auth       │  │ API Server    │  │ Background   │              │
│  │ Service    │  │               │  │ Workers      │              │
│  │            │  │ ┌───────────┐ │  │              │              │
│  │ - Register │  │ │ Listings  │ │  │ - Image proc │              │
│  │ - Login    │  │ │ Module    │ │  │ - Email send │              │
│  │ - JWT/     │  │ ├───────────┤ │  │ - Notif push │              │
│  │   Session  │  │ │ Search    │ │  │ - Expiry     │              │
│  │ - OTP      │  │ │ Module    │ │  │   checks     │              │
│  └────────────┘  │ ├───────────┤ │  │ - Analytics  │              │
│                  │ │ Reserv.   │ │  │   aggregation│              │
│                  │ │ Module    │ │  └──────────────┘              │
│                  │ ├───────────┤ │                                │
│                  │ │ Messaging │ │                                │
│                  │ │ Module    │ │                                │
│                  │ ├───────────┤ │                                │
│                  │ │ Reviews   │ │                                │
│                  │ │ Module    │ │                                │
│                  │ ├───────────┤ │                                │
│                  │ │ Users     │ │                                │
│                  │ │ Module    │ │                                │
│                  │ └───────────┘ │                                │
│                  └───────┬───────┘                                │
│                          │                                        │
└──────────────────────────┼────────────────────────────────────────┘
                           │
┌──────────────────────────┼────────────────────────────────────────┐
│                    DATA LAYER                                      │
│                          │                                         │
│  ┌──────────────┐  ┌─────▼──────┐  ┌──────────────┐              │
│  │ Object       │  │ Primary    │  │ Cache        │              │
│  │ Storage      │  │ Database   │  │              │              │
│  │              │  │            │  │ - Sessions   │              │
│  │ - Images     │  │ - Users    │  │ - Search     │              │
│  │ - Documents  │  │ - Listings │  │   results    │              │
│  │ - Reports    │  │ - Messages │  │ - Listing    │              │
│  │              │  │ - Reviews  │  │   counters   │              │
│  └──────────────┘  │ - etc.     │  └──────────────┘              │
│                    └────────────┘                                  │
│                                                                    │
│  ┌──────────────┐  ┌────────────┐                                 │
│  │ Search       │  │ Job Queue  │                                 │
│  │ Index        │  │            │                                 │
│  │              │  │ - Async    │                                 │
│  │ - Full-text  │  │   tasks    │                                 │
│  │ - Geo-spatial│  │ - Scheduled│                                 │
│  │ - Faceted    │  │   jobs     │                                 │
│  └──────────────┘  └────────────┘                                 │
└────────────────────────────────────────────────────────────────────┘
```

---

## Component Descriptions

### Frontend (Client Layer)

**Type:** Single-Page Application (SPA) or Server-Side Rendered (SSR) web application

**Responsibilities:**
- Responsive UI (mobile-first design)
- Client-side routing
- Form validation and state management
- Image upload and preview
- Real-time messaging UI
- Map integration for location display

**Key Pages:**
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Search bar, category grid, featured listings |
| Search results | `/cauta` | Listing cards, filters, map view |
| Listing detail | `/anunt/:id` | Photos, details, seller info, reserve/message |
| Create listing | `/anunt/nou` | Multi-step form (photos → details → preview) |
| My listings | `/anunturile-mele` | Seller dashboard |
| My reservations | `/rezervarile-mele` | Buyer reservations |
| Messages | `/mesaje` | Conversation list and thread view |
| Profile | `/profil/:id` | Public profile with ratings |
| Settings | `/setari` | Account settings, verification |

**Tech considerations:**
- Mobile-first responsive design (60%+ traffic expected from mobile)
- Progressive image loading (thumbnails → full quality)
- Offline-capable listing drafts (service worker, Phase 2)
- Accessibility compliance (WCAG 2.1 AA)

---

### API Server (Application Layer)

**Type:** RESTful API (with potential WebSocket for real-time messaging)

**Modules:**

#### Auth Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `POST /auth/register` | Create account |
| `POST /auth/login` | Authenticate, return token |
| `POST /auth/verify-phone` | Send/verify OTP |
| `POST /auth/forgot-password` | Initiate password reset |
| `POST /auth/reset-password` | Complete password reset |
| `POST /auth/refresh` | Refresh authentication token |

#### Users Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `GET /users/:id` | Public profile |
| `PUT /users/me` | Update own profile |
| `GET /users/:id/reviews` | User's received reviews |
| `POST /users/me/verify` | Submit verification documents |

#### Listings Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `POST /listings` | Create listing |
| `GET /listings/:id` | Get listing detail |
| `PUT /listings/:id` | Update listing |
| `DELETE /listings/:id` | Delete listing |
| `GET /listings/mine` | Seller's own listings |
| `POST /listings/:id/images` | Upload images |
| `DELETE /listings/:id/images/:imgId` | Remove image |

#### Search Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `GET /search` | Full-text + filtered search |
| `GET /search/nearby` | Geospatial proximity search |
| `GET /categories` | Category tree |
| `GET /categories/:slug/listings` | Browse by category |

#### Reservations Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `POST /reservations` | Create reservation |
| `GET /reservations/mine` | My reservations (buyer/seller) |
| `PUT /reservations/:id/accept` | Seller accepts |
| `PUT /reservations/:id/reject` | Seller rejects |
| `PUT /reservations/:id/complete` | Mark completed |
| `PUT /reservations/:id/cancel` | Cancel reservation |

#### Messaging Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `GET /conversations` | List conversations |
| `GET /conversations/:id/messages` | Get messages in thread |
| `POST /conversations/:id/messages` | Send message |
| `PUT /messages/:id/read` | Mark as read |
| WebSocket `/ws/messages` | Real-time message delivery |

#### Reviews Module
| Endpoint Pattern | Operations |
|-----------------|------------|
| `POST /reviews` | Submit review |
| `GET /listings/:id/reviews` | Reviews for a listing's transactions |

---

### Auth Service

**Responsibilities:**
- User registration and credential storage
- Password hashing and verification
- JWT or session token issuance and validation
- Phone number OTP generation and verification
- Role-based access control (user, verified_user, admin)

**Security considerations:**
- Passwords: bcrypt/argon2 hashing, min 8 characters
- Tokens: short-lived access tokens (15-60 min) + refresh tokens
- OTP: 6-digit code, 5-minute expiry, 3 attempts max
- Rate limiting: login attempts, OTP requests
- CORS: restrict to known frontend origins

---

### Background Workers

**Responsibilities:**
- **Image processing:** Resize, compress, generate thumbnails on upload
- **Email delivery:** Welcome emails, password reset, notification digests
- **Push notifications:** New message, reservation updates (Phase 2)
- **Listing expiry:** Check and expire listings past their expiry date (daily)
- **Analytics aggregation:** Compute daily/weekly metrics, update cached counters
- **Saved search matching:** Match new listings against saved searches, send alerts (Phase 2)

**Implementation:**
- Job queue system for async task processing
- Scheduled jobs (cron-like) for periodic tasks
- Dead letter queue for failed jobs with retry logic

---

### Data Layer

#### Primary Database

**Type:** Relational database (SQL)

**Why relational:**
- Strong consistency requirements (reservations, transactions)
- Complex queries (filtered search with joins)
- ACID compliance for financial-adjacent operations
- Well-understood data model with clear relationships

**Key considerations:**
- Spatial indexing for geo-queries (latitude/longitude)
- Full-text search capability (or delegate to dedicated search)
- Connection pooling for concurrent access
- Read replicas for search-heavy workload (Phase 3)

See [DATA-MODEL.md](./DATA-MODEL.md) for entity details and relationships.

#### Search Index

**Purpose:** Fast full-text and faceted search for listings

**Indexed data:**
- Listing title, description (full-text)
- Category, condition, price, status (faceted filters)
- Geolocation (spatial queries, radius search)
- Seller verification status (boost factor)

**Sync strategy:**
- On listing create/update: push to search index via background worker
- On listing delete/expire: remove from index
- Full re-index capability for schema changes

#### Object Storage

**Purpose:** Store user-uploaded images and documents

**Structure:**
```
/listings/{listing_id}/
    original/{image_id}.jpg
    thumbnail/{image_id}.jpg
    medium/{image_id}.jpg
/users/{user_id}/
    avatar.jpg
/certifications/{cert_id}/
    document.pdf
```

**Image processing pipeline:**
```
Upload → Validate (type, size) → Store original → Generate thumbnail (200x200)
                                                → Generate medium (800x600)
                                                → Extract EXIF metadata
```

#### Cache Layer

**Purpose:** Reduce database load for frequently accessed data

**Cached data:**
| Data | TTL | Invalidation |
|------|-----|-------------|
| Category tree | 24h | On category update |
| Search results (popular queries) | 5 min | On new listing in matching category |
| User session data | Token lifetime | On logout |
| Listing view counts | 1h | Batch flush to DB |
| Homepage featured listings | 15 min | On manual refresh |

---

## Integration Points

### Phase 1 (MVP)

| Integration | Purpose | Type |
|-------------|---------|------|
| SMS Gateway | Phone verification OTP | API (outbound) |
| Email Service | Transactional emails | API (outbound) |
| Maps / Geocoding | Location display, address → coordinates | API (outbound) |
| Object Storage | Image and document hosting | API (outbound) |

### Phase 2

| Integration | Purpose | Type |
|-------------|---------|------|
| Logistics Partners | Transport booking and estimation | API (outbound/webhook) |
| Push Notification Service | Mobile/browser push notifications | API (outbound) |
| ANAF API | Company CUI verification | API (outbound) |
| Payment Gateway | In-platform payments (if applicable) | API (bidirectional) |

### Phase 3

| Integration | Purpose | Type |
|-------------|---------|------|
| AI/ML Service | Image recognition for auto-categorization | API (outbound) |
| Analytics Platform | Event tracking and business intelligence | SDK/API (outbound) |
| Partner APIs | Expose listing data to partners | API (inbound) |

---

## Scalability Considerations

### MVP (0-1,000 users)
- Single application server
- Single database instance
- Basic caching
- Shared hosting or single cloud instance
- **Estimated load:** < 100 requests/minute

### Growth (1,000-10,000 users)
- Horizontal scaling of API servers (load balancer)
- Database read replicas
- Dedicated search index
- CDN for static assets and images
- Background worker scaling
- **Estimated load:** 100-1,000 requests/minute

### Scale (10,000-100,000 users)
- Microservice extraction (messaging, search, notifications)
- Database sharding (geographic or tenant-based)
- Event-driven architecture for inter-service communication
- Multi-region deployment
- Auto-scaling based on load
- **Estimated load:** 1,000-10,000 requests/minute

### Scaling Strategy

```
Phase 1 (MVP)          Phase 2 (Growth)         Phase 3 (Scale)
┌─────────────┐       ┌─────────────┐          ┌─────────────┐
│ Monolith    │       │ Monolith +  │          │ Microservices│
│ Single DB   │  ───> │ Read Replica│   ───>   │ Event-driven │
│ Local cache │       │ Search index│          │ Multi-region │
│ Single host │       │ CDN + LB    │          │ Auto-scale   │
└─────────────┘       └─────────────┘          └─────────────┘
```

---

## Deployment Strategy

### MVP Deployment

```
┌──────────────────────────────────────────┐
│              Cloud Provider              │
│                                          │
│  ┌──────────┐  ┌──────────┐             │
│  │ App      │  │ Database │             │
│  │ Server   │  │ (Managed)│             │
│  │          │  │          │             │
│  │ - API    │  └──────────┘             │
│  │ - Frontend                           │
│  │ - Workers │  ┌──────────┐            │
│  │          │  │ Object   │             │
│  └──────────┘  │ Storage  │             │
│                └──────────┘             │
│                                          │
│  ┌──────────┐                           │
│  │ CDN      │                           │
│  │ (Static) │                           │
│  └──────────┘                           │
└──────────────────────────────────────────┘
```

### Deployment Practices
- **CI/CD pipeline:** automated testing → staging → production
- **Environment parity:** dev, staging, and production environments match configuration
- **Database migrations:** versioned, forward-only migrations with rollback plan
- **Zero-downtime deploys:** rolling deployment or blue-green strategy
- **Monitoring:** application logs, error tracking, uptime monitoring
- **Backup:** automated daily database backups, 30-day retention

### Environment Configuration

| Setting | Dev | Staging | Production |
|---------|-----|---------|-----------|
| Debug mode | On | On | Off |
| SSL/TLS | Optional | Required | Required |
| Email delivery | Console/Mailtrap | Real (test accounts) | Real |
| SMS delivery | Mock | Real (test numbers) | Real |
| Image storage | Local filesystem | Cloud storage | Cloud storage + CDN |
| Database | Local | Cloud (small) | Cloud (production tier) |

---

## Security Architecture

### Application Security

| Layer | Measure |
|-------|---------|
| Transport | HTTPS everywhere (TLS 1.2+) |
| Authentication | JWT with short expiry + refresh tokens |
| Authorization | Role-based access control per endpoint |
| Input validation | Server-side validation on all inputs |
| SQL injection | Parameterized queries / ORM |
| XSS | Content-Security-Policy headers, output encoding |
| CSRF | Token-based CSRF protection |
| File upload | Type validation, size limits, virus scan (Phase 2) |
| Rate limiting | Per-IP and per-user rate limits on sensitive endpoints |
| Secrets | Environment variables, never in code |

### Data Privacy

| Data | Protection |
|------|-----------|
| Passwords | Hashed (bcrypt/argon2), never stored in plain text |
| Phone numbers | Encrypted at rest, only shown when user opts in |
| ID documents | Encrypted at rest, access-controlled, auto-deleted after verification |
| Messages | Encrypted at rest, only accessible to conversation participants |
| Location (precise) | Only stored if user provides, rounded for public display |

### GDPR Compliance (Phase 2)

- Data export: users can download all their data
- Data deletion: account deletion removes all personal data
- Consent management: explicit opt-in for marketing communications
- Data retention: define and enforce retention periods
- Privacy policy: clear, accessible, in Romanian

---

## Monitoring & Observability

### MVP Monitoring

| What | Tool Type | Alert On |
|------|-----------|----------|
| Uptime | HTTP health check | Downtime > 1 min |
| Errors | Application error tracking | Error rate spike |
| Performance | Response time monitoring | P95 > 2 seconds |
| Database | Query performance | Slow queries > 1 second |
| Disk/Memory | Infrastructure metrics | > 80% utilization |

### Phase 2+ Observability

| Capability | Purpose |
|------------|---------|
| Structured logging | Searchable, queryable application logs |
| Distributed tracing | Request flow across services |
| Metrics dashboards | Real-time platform health |
| Alerting | PagerDuty/Slack notifications for critical issues |
| Error aggregation | Group and prioritize errors |

---

*Related docs: [DATA-MODEL.md](./DATA-MODEL.md) | [FEATURES.md](./FEATURES.md) | [KPI-METRICS.md](./KPI-METRICS.md)*
