# Salvio Design System & Guidelines

This document outlines the design language, styling conventions, and component structures used in the Salvio application. **Any agent building new components or pages MUST adhere strictly to these rules to maintain visual consistency with the existing application.**

## 1. Core Aesthetic

The application uses a **clean, utilitarian, neo-brutalist** design aesthetic.

- **Strictly sharp edges:** NO rounded corners anywhere.
- **Framed layouts:** Heavy use of thin, solid borders to separate sections and frame content.
- **High contrast:** Stark black-on-white or black-on-yellow combinations.

## 2. Tailwind Configuration (v4)

The project uses Tailwind CSS v4 with inline theme configuration in `globals.css`.

- Do not import standard Tailwind colors if they conflict; rely on the CSS variables.
- A custom config overrides all border radii to `0px`.

## 3. Colors

- **Primary Accent (Deep Teal / Yellow):** `#FED601` (Mapped to `--deep-teal-400` to `600` internally, often used as `bg-[#FED601]`). Used for primary buttons, highlights, and active states.

- **Backgrounds:**
  - App Background: `#FAFAFA`
  - Card/Input Backgrounds (Off-white): `#FAF9F6`
  - Clean White: `#FFFFFF` (Used for navbar, main container background)
- **Text & Borders:**
  - Primary Text: `black-900` (`#000000`)
  - Secondary Text: `black-500` (`#767676`)
  - Borders: Primary borders use `black-300` (`#d6d6d6`). Darker borders use `black-900`.

## 4. Typography

- **Font Family:** `Inter` (Sans-serif) for BOTH headings and body text.

- **Headings (`h1`-`h6`):**
  - Must use the `font-heading` class.
  - Styling: `font-bold`, `tracking-tight` (letter-spacing: -0.04em), `line-height: 1.1`.
  - Usually `text-black-900`.
- **Body Text:**
  - Standard body text is `text-black-500` or `text-black-900` with standard line height `1.3`.
- **Uppercase treatments:** Frequently used for small labels, buttons, and navigation links (e.g., `text-xs font-bold uppercase tracking-wider`).

## 5. UI Elements & Components

### Layout Containers

- The main content wrapper should always be constrained and bordered: `mx-auto max-w-7xl border-x border-black-300 bg-white`.

- Sections are divided horizontally using `border-b border-black-300`.

### Borders & Radius (CRITICAL)

- **NEVER USE ROUNDED CORNERS.** Use `rounded-none` or rely on the global reset (`--radius-*: 0px`).

- Almost all components (cards, inputs, buttons, dropdowns) must have a 1px solid border. Usually `border border-black-300` or `border border-black-900`.

### Buttons & Links

- **Primary CTA Button:** `bg-[#FED601] text-black-900 border border-black-900 hover:bg-black-900 hover:text-[#FED601] transition-colors`. Sharp hover color inversions.

- **Secondary/Outline Button:** `border border-black-900 bg-transparent px-4 py-2 text-sm font-semibold text-black-900 hover:bg-[#FED601] transition-colors`.
- **Navigation Links:** `hover:underline transition-all` or background shifts.

### Inputs & Forms

- Large, brutalist inputs with significant padding (e.g., `py-4 pl-6`).

- Styles: `border border-black-300 bg-[#FAF9F6] text-black-900 focus:outline-none focus:ring-0 focus:border-black-500 focus:bg-white transition-colors`.

### Badges / Pills

- Used for categories or statuses.

- Example: `bg-[#FED601]/20 border border-[#FED601] px-2 py-0.5 text-[11px] font-bold text-black-900 rounded-none`.
- Alternative (Black): `bg-black-500 px-2.5 py-1 text-xs font-semibold text-white rounded-none`.

### Cards (e.g., ListingCard)

- Container: `border border-black-300 rounded-none bg-white p-3`.

- Images: Should be wrapped in a container with a subtle background (`bg-[#FAF9F6] border border-black-300`) and use `aspect-[4/3]`. Image hover effect: `transition-transform duration-300 hover:scale-105`.
- Layout rules: Do not include arbitrary UI buttons (like heart or share hover buttons), user avatars, or complex multi-line metadata. Use a single category tag for status, and strictly keep it minimal, omitting distance, location, and discount percentages.
- Hover state on the card itself: No shadow or floating effect. Keep it flat. (See `.card-hover` in globals.css - transforms are explicitly removed).

## 6. Icons

- Use `lucide-react` icons.

- Standard sizing: `h-4 w-4` or `h-5 w-5`.
- Stroke width: Often customized to `strokeWidth={1.5}` or `strokeWidth={2}` for bolder appearance.
- Color: Usually inherit from text color or explicitly `text-black-900` / `text-black-500`.

## Summary Checklist for Agents

When creating a new component, ask yourself:

1. [ ] Are all corners explicitly sharp (`rounded-none` / global zero radius)?
2. [ ] Are borders applied to delineate the component (`border border-black-300`)?
3. [ ] Is the font Inter, and are headings using `font-heading tracking-tight leading-[1.1]` (with normal sentence casing, avoiding random all-caps)?
4. [ ] Are interactive elements using solid color swaps on hover (e.g., to `#FED601` or `black-900`) instead of shadows?
5. [ ] Is the layout confined within the `max-w-7xl border-x` container if it's a page section?
