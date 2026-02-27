
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
| Eco Green (Success/Impact) | #16A34A | Impact metrics, "waste saved" indicators, success states |

### Typography

- Headings: "Plus Jakarta Sans" — Bold/Semibold, tight tracking (`-0.02em`).
- Body: "Inter" — Clean, highly legible at all sizes.
- Impact/Mission Statements: "Fraunces" — Italic Serif for ecological messaging, manifesto quotes, and emotional moments. Use sparingly.
- Data/Metrics: "JetBrains Mono" or "IBM Plex Mono" — For impact stats, order IDs, material specs, quantities.

### Visual Language

- Border Radius System: rounded-xl (12px) for cards and containers, rounded-lg (8px) for buttons and inputs, rounded-full for avatars and badges.
- Subtle Texture: Global CSS noise overlay (SVG turbulence at 0.03 opacity) on the Sand background only — keeps surfaces warm and organic, never flat.
- Elevation: Use soft shadows (`shadow-sm` to `shadow-lg`) with a warm tint (`rgba(27, 67, 50, 0.08)`), never pure black shadows.
- Iconography: Lucide React throughout. Stroke width 1.5. Never filled icons.
- Photography: Real Unsplash images of construction materials, warehouses, building sites. Muted, warm color grading. Never stock-photo-glossy.
- Ecological Throughline: Every major view should subtly surface impact data — kg of waste diverted, CO₂ saved, materials recirculated. This is woven into the UI, not bolted on.

---

## 2. APP ARCHITECTURE — SCREENS & COMPONENTS

The app is a React SPA with the following primary views. All views share a persistent shell (navbar + sidebar on desktop, bottom nav on mobile).

---

### A. GLOBAL SHELL

#### Navbar (Top Bar)

- Fixed top, full-width, backdrop-blur-xl with bg-white/80 glassmorphism and a 1px bottom border in Stone/20.
- Left: Salvio logotype (wordmark in Forest + a small leaf-circle icon mark). Clicking returns to homepage.
- Center (Desktop): Search bar — large, prominent, with an icon prefix. Placeholder cycles through: "Search 10,000+ materials...", "Find surplus lumber near you...", "Reclaimed steel beams...". Include category dropdown trigger inside the search bar (e.g., "All Categories ▾").
- Right: Location selector (city/zip with map-pin icon), notification bell with unread badge, cart icon with item count badge, user avatar dropdown (Dashboard, Settings, List an Item, Sign Out).
- Mobile: Collapse search into an expandable search icon. Swap right-side items into a hamburger menu. Persist cart icon.

#### Sidebar (Desktop Only)

> George Mocreac:
- Collapsible left sidebar on dashboard views (Seller Dashboard, Buyer Dashboard).
- Forest background with white text, rounded-right corners (`rounded-r-2xl`).
- Navigation: Overview, My Listings, Orders, Messages, Impact Report, Settings.
- Active state: White/10 background pill with a Terracotta left-edge indicator.

#### Bottom Navigation (Mobile Only)

- 5-tab bottom nav: Home, Browse, Sell (prominent center + icon), Orders, Profile.
- "Sell" button should be elevated — either physically raised with a circular Forest background or differentiated with Terracotta.

---

### B. HOMEPAGE / DISCOVERY FEED

This is the marketplace front door. It should feel alive, curated, and trust-building.

#### Section 1: Hero Banner

- Not a traditional marketing hero. Instead, a compact, functional hero that immediately communicates value.
- Top area: Large heading — "Give Materials a **Second Life.**" (Sans-serif, with "Second Life" in Fraunces Italic). Subheading: "The marketplace for surplus construction materials. Buy for less. Sell what's left. Save the planet in the process."
- Below the headline: A quick-action row — 6–8 clickable category pills with icons: Lumber, Steel, Concrete, Fixtures, Electrical, Plumbing, Roofing, Tile & Stone. Each pill has a subtle icon (Lucide) and leads to the category browse view.
- Background: Sand color with a large, faded circular pattern or topographic map lines at low opacity — organic, not distracting.

#### Section 2: Live Impact Ticker

- A horizontal strip below the hero, spanning full width.
- Monospace font, Forest background, white text.
- Three animated counters (count-up on scroll-in): "12,450 tons diverted from landfill" | "$3.2M in materials recirculated" | "4,800+ active sellers".
- Numbers should animate with a smooth count-up effect using GSAP or a lightweight library.
- Small pulsing green dot + "Live" label on the left edge.

#### Section 3: Featured Listings Grid

- Section heading: "Just Listed" with a "View All →" link.
- Responsive grid: 4 columns desktop, 2 mobile.
- Listing Card Design (Reusable Component):
  - Rounded-xl container, Chalk background, warm shadow on hover (lift effect).
  - Top: Image (4:3 ratio, object-cover, rounded top corners). If multiple images, show a small dot indicator. Overlay badges in top-left: "FREE" (Eco Green badge) or "−70%" (Terracotta badge for discounted materials).
  - Body: Material name (semibold, truncated to 2 lines). Category tag (small, Sage background pill). Condition tag: "New Surplus" / "Lightly Used" / "As-Is" (color-coded).
  - Bottom row: Price (large, bold — or "Free" in Eco Green) on the left. Location + distance (e.g., "Brooklyn, NY · 2.4 mi") on the right in Stone text. Seller avatar (tiny circle) + seller name + rating stars.
  - Hover state: Card lifts (`translateY(-2px)`), shadow deepens, a subtle "View Details →" appears.
  - Quick actions (top-right overlay on hover): Heart/save icon, share icon.

#### Section 4: Browse by Category

- A visual grid (2 rows × 4 columns desktop) of category cards.
- Each card: Large rounded container with a moody, desaturated Unsplash background image (e.g., stacked lumber, steel beams, tile patterns), dark gradient overlay, white category name centered, item count below ("1,240 listings").
- Hover: Image zooms slightly (`scale-1.05`), overlay lightens.
- Categories: Lumber & Wood, Steel & Metal, Concrete & Masonry, Electrical, Plumbing, Fixtures & Hardware, Roofing, Tile & Stone, Insulation, Paint & Finishes, Doors & Windows, Heavy Equipment.

#### Section 5: How It Works

> George Mocreac:
- Three-step horizontal layout (stacks vertically on mobile).
- Each step: Large circled number (Forest bg), heading, 1-sentence description, and a small illustrative icon or micro-animation.
  - 1. List It — "Snap a photo, set a price (or give it away), and publish in under 60 seconds."
  - 2. Connect — "Buyers browse, message, and arrange pickup or delivery."
  - 3. Impact — "Every transaction diverts materials from landfill. Track your ecological impact in real time."
- Below the steps: A single CTA button — "Start Selling — It's Free" (Terracotta background, white text, magnetic hover).

#### Section 6: Trust & Social Proof

- Logos of construction companies / partners (greyscale, row of 6–8).
- 2–3 testimonial cards with quote, name, company, and avatar.
- A callout: "Salvio charges a small transaction fee only when you make a sale. Listing is always free."

#### Section 7: Ecological Mission Strip

- Full-width section, Charcoal background, white text.
- Large Fraunces Italic quote: *"The construction industry generates 600 million tons of waste annually. We believe every material deserves a second chance."*
- Below: A simple "Learn About Our Mission →" text link.

---

### C. CATEGORY BROWSING + SEARCH RESULTS

A unified view for both category drill-downs and search results.

#### Layout

- Left sidebar (desktop): Filters panel — sticky, scrollable.
  - Filters: Category (checkbox tree), Condition (New Surplus / Lightly Used / As-Is / Salvage), Price Range (dual-thumb slider + manual inputs), Distance (radius slider: 5mi / 10mi / 25mi / 50mi / 100mi+), Material Type, Seller Rating (min stars), "Free Items Only" toggle, Sort By (Newest / Price Low→High / Price High→Low / Nearest / Most Saved).
  - Each filter section is collapsible. Active filters show count badges.
  - "Clear All" and "Apply" buttons at the bottom.
- Main content area: Grid of Listing Cards (same component from homepage). Toggle between Grid and List view. List view shows cards in a horizontal layout with more detail visible.
- Top bar within content area: Breadcrumb (Home > Lumber & Wood), result count ("342 results"), active filter pills (removable), sort dropdown.
- Mobile: Filters collapse into a bottom sheet triggered by a "Filters" button in the top bar. Sort is a separate dropdown.

#### Empty State

- If no results: Friendly illustration (or icon), "No materials found matching your search." Suggestions: broaden filters, try different keywords, set up an alert for this search.

#### Pagination / Infinite Scroll

- Infinite scroll with a "Loading more…" skeleton state. "Back to top" floating button after scrolling.

---

### D. PRODUCT LISTING PAGE (Individual Material)

The detail view for a single listing. This is where conversion happens — it needs to build trust and provide all decision-making info.

#### Layout (Two-Column Desktop)

- Left column (60%): Image gallery.
  - Large primary image (rounded-xl, zoomable on click — lightbox).
  - Thumbnail strip below (horizontal scroll, 4–6 images).
  - If only 1 image, show a single large image with no strip.

> George Mocreac:
- Right column (40%): Sticky info panel (scrolls with page until footer).
  - Seller info (top): Avatar, name, rating (stars + review count), "Member since [year]", verified badge if applicable. "View Seller Profile" link.
  - Material name: Large, semibold heading.
  - Condition badge: Color-coded pill.
  - Price: Large, bold. If free, show "FREE" in Eco Green with a small "🌱 Giving back" label. If monetized, show price with original estimated retail value crossed out if applicable.
  - Quantity: "14 sheets available" — with a quantity selector (number input).
  - Specs table: Clean key-value pairs — Material Type, Dimensions, Weight, Color/Finish, Brand/Manufacturer, SKU (if known). Monospace for values.
  - Location: Map preview (small static map or interactive micro-map), address (city-level for privacy), distance from buyer.
  - Pickup/Delivery: Badges — "Pickup Available" / "Delivery Available" / "Shipping Available" with estimated costs if applicable.
  - Action buttons:
    - Primary: "Add to Cart" (Forest bg, white text, full width, magnetic hover with sliding bg layer).
    - Secondary: "Message Seller" (outline button, Forest border).
    - Tertiary row: Save/Heart icon, Share icon, Report icon.
  - Impact callout (small card): "Buying this item saves an estimated 24 kg of landfill waste and 18 kg of CO₂ emissions." Eco Green accent, leaf icon.

- Below the fold (full width):
  - Description: Seller-written description, rendered as prose.
  - Seller's Other Listings: Horizontal scrollable row of their other listing cards.
  - Similar Materials: Algorithm-driven row of related listings.

---

### E. CART & CHECKOUT FLOW

#### Cart Page

- Layout: Two columns. Left: Item list. Right: Order summary (sticky).
- Item row: Thumbnail, material name, seller name, quantity selector, unit price, line total, remove button.
- Items grouped by seller (since pickup logistics vary per seller). Each seller group has a header: Seller avatar + name + location.
- Order Summary: Subtotal, Salvio service fee (X% — clearly labeled and explained with a tooltip: "This fee keeps Salvio running and funds our ecological initiatives"), estimated total. "Proceed to Checkout" CTA (Terracotta, full-width).
- Empty cart: Friendly empty state — "Your cart is empty. Browse materials →".

#### Checkout Page

- Step flow: Visual stepper at the top — (1) Shipping/Pickup → (2) Payment → (3) Review & Place Order.
- Step 1 — Logistics: For each seller group, choose: Pickup (show seller address + available times) or Delivery (enter address, see estimated cost). Contact info form.
- Step 2 — Payment: Card input (clean, Stripe-like field styling). Or "No payment needed" if all items are free (skip to review).
- Step 3 — Review: Full order summary, edit links for each section, terms checkbox, "Place Order" button.
- Confirmation page: Success state with confetti or a subtle leaf animation. Order number (monospace), summary, "Your impact: You just saved X kg from landfill!" callout.

---

### F. SELLER DASHBOARD

The command center for sellers. Accessed via sidebar navigation.

#### Overview Tab

- Stats row (4 cards): Active Listings (count), Total Sales ($), Items Sold (count), Ecological Impact (kg diverted). Each card has an icon, value (large, monospace-styled number), and a small sparkline or trend arrow.
- Recent Orders: Table — Order #, Buyer name, Item(s), Date, Status (badge: Pending / Confirmed / Completed / Cancelled), Amount. Clickable rows for detail.
- Quick Actions: "List a New Item" button (prominent, Terracotta). "View All Listings" link.

#### My Listings Tab

- Grid or list of seller's own listings. Each card shows: Image thumbnail, title, price, status (Active / Paused / Sold), views count, saves count, date listed.
- Actions per listing: Edit, Pause/Activate, Mark as Sold, Delete.
- Filters: Status filter (All / Active / Paused / Sold), Sort (Newest / Oldest / Most Views).

#### List New Item Flow

> George Mocreac:
- Multi-step form (or a well-organized single page — designer's choice):
  - Photos: Drag-and-drop upload zone, up to 8 images, reorderable. First image = cover.
  - Details: Title (text input), Category (dropdown), Condition (radio: New Surplus / Lightly Used / As-Is / Salvage), Description (textarea with character count).
  - Specs: Dynamic key-value pair fields — Material, Dimensions, Weight, Brand. "Add another spec" button.
  - Pricing: Toggle: "Sell" (price input + optional "Original retail price" for comparison) or "Give Away Free" (highlighted with an eco-badge: "Free listings get 3x more visibility").
  - Quantity: Number input.
  - Location & Logistics: Auto-filled from profile, editable. Checkboxes: Pickup available, Delivery available (+ delivery radius/cost), Shipping available (+ shipping cost).
  - Preview & Publish: Shows a live preview of the listing card + detail page. "Publish Listing" button.

#### Impact Report Tab

- A dedicated view showing the seller's ecological contribution.
- Hero stat: "You've diverted 2,340 kg of materials from landfill" — large, centered, with an animated counter.
- Breakdown chart: Bar or donut chart — waste saved by category (Lumber: 800kg, Steel: 600kg, etc.). Use Recharts with the app's color palette.
- Timeline: Monthly impact over time (line chart).
- Shareable badge: A styled card/graphic — "I've saved X kg with Salvio" — with a "Share on LinkedIn" / "Download Image" button.

---

### G. BUYER DASHBOARD

#### Overview Tab

- Stats row: Orders Placed, Items Saved/Watchlist, Total Savings ($ vs. retail), Personal Impact (kg saved).
- Active Orders: Status timeline — Placed → Confirmed → Ready for Pickup/Shipped → Completed.
- Saved Items: Grid of saved/hearted listings.

#### Order History Tab

- Table of past orders with status, date, items, seller, amount. Expandable rows for detail.
- "Leave Review" prompt for completed orders without a review.

#### Saved Searches / Alerts

- List of saved searches with filters. Toggle email/push notifications when new matches appear.

---

### H. AUTHENTICATION (Sign Up / Login)

#### Visual Treatment

- Split layout (desktop): Left side = form. Right side = full-bleed image (moody warehouse / stacked materials) with the Sand noise overlay and a large Fraunces Italic quote overlay: *"One company's surplus is another's foundation."*
- Mobile: Image becomes a compact header banner, form below.

#### Sign Up Flow

- Step 1: Email + Password (or "Continue with Google").
- Step 2: Choose account type: "I want to Buy" / "I want to Sell" / "Both" (card selection with icons).
- Step 3 (Sellers): Company name, location, brief description, logo upload (optional).
- Step 3 (Buyers): Name, location, interests (optional category checkboxes for personalized feed).
- Clean validation, inline error messages, password strength indicator.

#### Login

- Simple: Email + Password, "Continue with Google", "Forgot Password?" link.
- After login: Redirect to homepage (buyers) or dashboard (sellers).

---

## 3. INTERACTION DESIGN & MICRO-INTERACTIONS

### Buttons

- Magnetic hover: Slight scale(1.02) on hover, smooth transition.
- Primary CTA (Terracotta): overflow-hidden with a sliding background layer — on hover, a lighter shade slides in from the left.
- Secondary (Forest outline): On hover, fills with Forest at 10% opacity.
- Loading states: Button text replaced with a small spinner + "Processing…"

### Cards

- Hover: translateY(-2px) lift + shadow deepening. Transition: cubic-bezier(0.4, 0, 0.2, 1) 200ms.
- Click/Tap: Subtle scale(0.98) press effect.

### Page Transitions

- Staggered fade-in for card grids — items enter with slight translateY(12px) delay per item (GSAP stagger, 0.05s each).
- Section headings: Fade-up on scroll into viewport (IntersectionObserver or GSAP ScrollTrigger).

### Toasts & Feedback

> George Mocreac:
- Non-blocking toast notifications (bottom-right desktop, top mobile): "Item added to cart", "Listing published!", "Message sent". Forest background for success, Terracotta for warnings/errors.

### Skeleton Loading States

- Every data-fetching view must have skeleton placeholders — rounded rectangles pulsing in Stone/20 to Stone/10. Match exact layout of the loaded state. Never show blank screens or spinners alone.

---

## 4. TECHNICAL REQUIREMENTS

### Tech Stack

- Next.js — Framework for React, configuring App Router.
- React 19 — Functional components, hooks only.
- Tailwind CSS — Utility-first, custom theme config extending the design system tokens.
- GSAP 3 (with ScrollTrigger) — For scroll animations, staggered reveals, count-up counters.
- Lucide React — All iconography.
- Recharts — For dashboard charts (Impact Report, seller stats).

### Animation Lifecycle

- All GSAP animations wrapped in gsap.context() within useEffect, returned in cleanup function for proper mounting/unmounting.
- Use will-change sparingly and remove after animation completes.
- Respect prefers-reduced-motion — disable non-essential animations.

### Responsive Breakpoints

- Mobile-first. Breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px.
- All views must be fully functional on mobile — no desktop-only features.

### Data & State

- Mock all data with realistic, diverse content — real material names, plausible prices, varied locations, realistic seller profiles. No "Lorem ipsum" or "Item 1, Item 2" placeholders.
- Use React Context or a lightweight state manager for cart, auth state, and user preferences.

### Image Assets

- Use real Unsplash image URLs for all materials, categories, and profile images. Varied, realistic construction material photography.
- Lazy-load all images below the fold.

### Accessibility

- Semantic HTML throughout (nav, main, section, article, aside).
- All interactive elements keyboard-navigable.
- ARIA labels on icon-only buttons.
- Color contrast meets WCAG AA minimum.

---

## 5. EXECUTION DIRECTIVE

"Do not build a marketplace; build an ecosystem. Every pixel should communicate trust, every interaction should feel weighted and intentional. The ecological mission isn't a feature — it's the DNA. A seller should feel proud listing surplus materials. A buyer should feel smart purchasing them. Both should feel the tangible impact of keeping materials out of landfills. Eradicate all generic marketplace patterns — this is Salvio, and it should feel like nothing else in the construction industry."

