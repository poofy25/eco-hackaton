
# SALVIO — Full Marketplace App Prompt

Role: Act as a World-Class Senior Product Designer and Lead Frontend Engineer with deep expertise in marketplace UX, e-commerce systems, and ecological design.
Objective: Architect a high-fidelity, production-ready construction materials marketplace web application called Salvio — a platform where construction companies and stores sell leftover/surplus building materials (free or monetized) to other businesses and individual buyers, solving the ecological waste crisis in the construction industry.

Aesthetic Identity: "Clean Ecological Premium" / "Trustworthy Sustainability." The app should feel like a bridge between a modern fintech product (Stripe, Linear) and an environmentally conscious brand (Patagonia, Aesop). Every surface should communicate trust, clarity, and ecological purpose without feeling preachy or NGO-like.

---

## 1. CORE DESIGN SYSTEM (STRICT)

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Forest (Primary) | #1B4332 | Primary actions, nav, key UI elements |
| Sage (Secondary) | #52796F | Secondary buttons, tags, supporting elements |
| Terracotta (Accent) | #C75D2C | CTAs, alerts, urgency indicators, sale badges |
| Sand (Background) | #F5F2EB | App background, page canvas |
| Chalk (Surface) | #FFFFFF | Cards, modals, input fields |
| Charcoal (Text) | #1A1A1A | Body text, headings |
| Stone (Muted Text) | #6B7280 | Captions, timestamps, secondary text |
| Eco Green (Success) | #16A34A | Impact metrics, "waste saved" indicators |

### Typography

- Headings: "Plus Jakarta Sans" — Bold/Semibold, tight tracking (`-0.02em`).
- Body: "Inter" — Clean, highly legible.
- Mission/Quotes: "Fraunces" — Italic Serif (sparingly).
- Data/Metrics: "JetBrains Mono" — Monospace for stats/IDs.

### Visual Language

- Global CSS noise overlay (0.03 opacity) on Sand background.
- Elevation: Multi-level shadow system (shadow-sm to shadow-lg).
- Iconography: Lucide React (Stroke width 1.5).
- Every view should surface impact data (recycling, CO2 saved, waste diverted).

---

## 4. TECHNICAL REQUIREMENTS

### Tech Stack

- Next.js 15+ (App Router)
- React 19
- Tailwind CSS v4
- GSAP 3 (for animations)
- Lucide React
- Recharts

### Key Rules

- Functional components & hooks only.
- All animations must respect `prefers-reduced-motion`.
- All data should be realistic mock data, NO placeholders.
- Semantic HTML and accessibility (WCAG AA) are mandatory.

---

## 5. EXECUTION DIRECTIVE

"Build an ecosystem, not just a marketplace. Every pixel must communicate trust and ecological intent. Eradicate generic patterns — this is Salvio."
