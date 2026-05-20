# Filigree — Design System

> *"The stirrings of something alive. Beauty in subtle places. Life breathing in the subtle glow of orbs. Perfect placed geometry, ruling in an orderly way over the many detailed elements."*

**Filigree** is a working title for the design system of a jeweler's practice — a private studio app built by a wireworker of twelve years whose work is rooted in spiritual depth, mastery, and the dreams of the people they create for. The app holds the order side of the craft (pricing, records, client correspondence, project details) while honoring the contemplative, creative side that gives the work its life.

> ⚠ **Brand name is a placeholder.** *Filigree* was chosen as a working name — filigree is the wirework art the user practices, and the word carries the delicate-magical quality the brief calls for. **The user should rename this** to their actual studio or app name.

---

## Sources & inputs

This design system was created from a written brief only. No codebase, Figma file, screenshots, or existing brand assets were provided. Every visual decision below is a designer's interpretation of the brief — **everything is open to iteration**.

The brief specified:
- Dark backgrounds with subtle glowing elements
- Arcane, magical feel — "the stirrings of something alive"
- Angular spirals inspired by the armor of the leaf-man character in the film *Epic* (Pictish / Celtic / art-nouveau geometry)
- Whimsical and organic, yet ruled by perfectly placed geometry
- Teal and purple over black, with subtle glowing accents
- Values: excellence, honesty, uniqueness, beauty, spirit, truth, mastery

---

## What this app is

A single-user studio app (the jeweler's personal tool) that helps with:

- **Pricing** — material cost, time, complexity, intuition-weighting
- **Records** — past pieces, clients, materials inventory
- **Correspondence** — drafting responses with depth, holding context across long client conversations
- **Project details** — many small facts about each piece (gemstone provenance, wire gauges, settings used, dreams the client shared)
- **Spiritual + creative space** — the system itself should feel restful, ordered, and alive; not a corporate CRM

It is not a marketplace, not a storefront, not a B2B tool. It is one craftsperson's contemplative workshop ledger.

---

## Files in this system

| File / folder | Purpose |
|---|---|
| `README.md` | This document — brand context, content fundamentals, visual foundations, iconography |
| `colors_and_type.css` | CSS custom properties for color tokens + type ramp; load this on any artifact |
| `fonts/` | (empty — using Google Fonts) See *Type* in Visual Foundations |
| `assets/` | Logo marks, spiral ornaments, glow orb SVGs, divider flourishes |
| `preview/` | Small HTML cards that populate the Design System tab |
| `ui_kits/jeweler-app/` | UI kit for the studio app — components + interactive index demo |
| `SKILL.md` | Agent-Skill manifest so this system is usable from Claude Code |

---

## Content Fundamentals

Filigree's voice is **contemplative, plainspoken, and reverent without being precious.** It speaks as a craftsperson in their own studio talking quietly to themselves — not as a brand addressing a customer. The app is the user's private ledger, so most UI copy is in **first person** ("my pieces", "I owe…") or **bare imperative** ("Begin a piece", "Hold this detail"). Avoid "you" — there is no second person here.

**Tone:** Quiet. Sure. Unhurried. The interface never demands; it offers.

**Casing:** Title Case for section labels and button text. Sentence case for body and helpers. **No ALL-CAPS shouting.** Small caps (via the display serif) can be used for ceremonial labels — "ledger", "atelier", "the work" — but sparingly.

**Punctuation:** Em dashes welcome. Ellipses welcome where they fit a pause. Avoid exclamation marks. Avoid forced parallelism.

**Vocabulary:** Borrow lightly from craft and contemplative traditions, not heavily.

- ✅ *piece, work, atelier, ledger, hold, set, begin, finish, lay aside, commit*
- ✅ *gemstone, wire, gauge, bezel, prong, setting*
- ⚠ Use sparingly: *vessel, sanctum, rite, consecrate* — overused, can read costume-y
- ❌ Avoid corporate-product words: *workflow, productivity, optimize, leverage, sync, dashboard*
- ❌ Avoid casual/cute: *yay, oops, oopsie, awesome, super, totally*

**Numbers, prices, weights:** Lowercase units. `2.4 g`, `18 ga`, `$3,200`. No thousands separators below $10k is fine; use them above. Always show the unit.

**Emoji:** None. Not anywhere. If a symbol is needed, it is a spiral ornament or a small drawn glyph from the asset set, never an emoji.

**Examples of voice — same message, three registers:**

> ⚙ *Generic SaaS:* "Click here to add a new project to your dashboard."
> 🌿 *Too costume-y:* "Consecrate a new vessel of work, dear seeker."
> ✅ *Filigree:* "Begin a piece."

> ⚙ *Generic:* "You have 3 unread messages."
> ✅ *Filigree:* "Three letters waiting."

> ⚙ *Generic:* "Are you sure you want to delete this?"
> ✅ *Filigree:* "Lay this aside? It will not return."

> ⚙ *Generic:* "Saved successfully!"
> ✅ *Filigree:* "Held." *(tiny acknowledgement, no exclamation)*

> ⚙ *Generic:* "Total: $1,250.00"
> ✅ *Filigree:* "The whole — $1,250"

**Microcopy patterns:**
- Empty states are an *invitation*, not an apology. "Nothing here yet. Begin a piece."
- Errors are gentle and concrete. "I couldn't reach the cloud — try again in a moment."
- Confirmations are one word when possible. "Held." "Sent." "Done."
- Time is spoken, not stamped. "this morning", "three days ago", "in the spring"

---

## Visual Foundations

### Colors

Three families on a true-black ground, with a single warm accent kept rare.

- **Obsidian** — the base. Six steps from `--ink-950` (near-black with cool undertone) up to `--ink-500` (warm graphite). Most surfaces sit here.
- **Verdigris (Teal)** — primary spiritual color. Five steps from `--teal-100` (mint mist) down to `--teal-900` (deep oxidized copper). The "alive" color; growth, water, breath.
- **Amethyst (Violet)** — secondary spiritual color. Five steps from `--violet-100` to `--violet-900`. The "deep" color; mystery, twilight, reverence.
- **Aurum (Gold)** — accent. A single warm tone `--gold-400` used **sparingly** for ceremony moments: a price confirmation, a finished piece, a gilded ornament edge. Never decorative-only.
- **Mist** — text and parchment. Off-whites with a faint cool tint, never pure `#fff`. Body text is `--mist-300`; pure `--mist-100` is reserved for true emphasis.

Pure black `#000000` is not used; the base is `--ink-950` `#06080c` so glows have something to lift off of. Pure white is not used either.

### Type

| Role | Family | Substitution? |
|---|---|---|
| Display serif (headings, ceremonial labels) | **Cormorant Garamond** | ⚠ Google Fonts — pick a graceful classical serif if the user has a preferred face (e.g. a licensed Garamond, Tenor, Bembo) |
| Body sans (UI, paragraphs, controls) | **Outfit** | ⚠ Google Fonts — chosen for slightly organic curves without being Inter / Roboto |
| Numeric / mono (prices, weights, codes) | **JetBrains Mono** | ⚠ Substitution — any humanist mono works |

**No font files are shipped** — `fonts/` is empty by design. The CSS loads them from Google Fonts. If the user owns licensed versions of preferred faces, drop the files in `fonts/` and update `colors_and_type.css`. **Please confirm the chosen families** — type is the most important brand decision and the user has not weighed in.

Type ramp uses a fifth-based scale (1.25× per step). Display is set tight (line-height ~1.1) with slightly negative tracking. Body is set generous (line-height 1.6).

### Spacing & rhythm

Base unit is **4 px**. The scale is `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Inside cards, default padding is 24 px. Section gaps are 48 px or 64 px — generous, never cramped.

### Backgrounds

Dark surfaces are not flat. The default page background is `--ink-950` with a single subtle radial vignette — a very faint teal-violet glow placed off-center, low opacity (≤ 8 %), large radius. This is one repeating motif, **not** layered gradients everywhere. Below the fold, the vignette fades to flat.

Hand-drawn spiral ornaments live in `assets/` (see Iconography) and are used as **dividers** between major sections, never as background patterns.

No photographic imagery is part of the brand chrome — when photos appear (e.g. of finished pieces) they are full-bleed, warm-toned, and shown at large scale against the obsidian ground.

### Animation

Movement is slow and breath-like. Default duration **240–360 ms**, easing `cubic-bezier(0.25, 0.8, 0.25, 1)` (a soft, settling ease). For "alive" moments — a glow orb pulsing, a setting being committed — use a 2 s breath cycle (`ease-in-out`, infinite, opacity 0.6 ↔ 1.0). No bounces. No springs that overshoot. **Nothing decorative moves on idle except orbs.**

### Hover & press

- **Hover:** lift the inner glow by ~20 %. For text links and tertiary buttons: brighten one mist step. For primary buttons: the inner glow ring becomes visible / brighter; no color shift.
- **Press:** scale 0.98, hold for the 120 ms of the down-state, release. No color change on press.
- **Focus:** a 1 px outer ring in `--teal-300` at 60 % opacity, offset 2 px. Visible on keyboard navigation only.

### Borders

Most borders are **single hairline**, 1 px, `--ink-500` at 40 % opacity. Cards may add an **inner glow** (inset box-shadow) in teal or violet at 6–12 % opacity — this is the "bezel" effect that makes the card feel like a setting holding something.

For ceremony moments, a spiral filigree ornament (`assets/ornament-*.svg`) replaces the top or bottom border.

### Shadows & elevation

Three elevation levels, all outer shadows on dark are soft and low.

- **e1 (resting):** `0 1px 2px rgba(0,0,0,0.4)` — most cards.
- **e2 (hover / floating):** `0 8px 24px rgba(0,0,0,0.5), 0 0 32px rgba(95, 213, 193, 0.06)` — a faint teal glow joins the cast shadow.
- **e3 (modal / focus):** `0 24px 64px rgba(0,0,0,0.6), 0 0 80px rgba(124, 68, 184, 0.10)` — violet glow for full-attention surfaces.

Inner shadows ("bezel glows") are separate tokens: `--bezel-teal`, `--bezel-violet`, `--bezel-gold`.

### Corner radii

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4 px | Inputs, chips, tags |
| `--radius-md` | 8 px | Buttons, small cards |
| `--radius-lg` | 12 px | Cards, panels |
| `--radius-xl` | 20 px | Modals, prominent surfaces |
| `--radius-full` | 9999 px | Pills, avatars, orbs |

Avoid 6 px and 16 px — they read "generic SaaS". The 12 px / 20 px pairing is the brand's sweet spot.

### Cards

A Filigree card is a **bezel setting**.

- Background: `--ink-900` (one step lighter than the page).
- Border: 1 px `--ink-500` at 40 %.
- Inner glow: `inset 0 0 24px rgba(95, 213, 193, 0.06)` — barely visible, like the card is breathing.
- Radius: 12 px.
- Padding: 24 px.
- On hover: inner glow lifts to 0.12 opacity, outer shadow gains the teal-tinted ring.

Cards holding a finished piece or ceremony moment use `--bezel-violet` or `--bezel-gold` instead of teal.

### Transparency & blur

Blur is **used only** behind modals (`backdrop-filter: blur(12px) saturate(120%)`) and on the bottom of long pages as a "scroll fade". Translucent surfaces over the dark ground use 70–85 % alpha; never below 50 % (it becomes unreadable on the textured-feeling background).

### Layout rules

- Content max-width on detail screens: **720 px** (a single column for reading).
- Content max-width on ledger / list screens: **1080 px**.
- Side gutters: 32 px on desktop, 16 px on mobile.
- The top bar is **48 px tall**, fixed, with a 1 px bottom hairline and a barely-visible bottom shadow. The bar background uses 80 % alpha + 12 px backdrop blur so the vignette underneath shows through.

---

## Iconography

**Two icon systems coexist** in Filigree, by purpose:

### 1. Functional UI icons — **Lucide** (via CDN)
Used for menu items, controls, inline actions (close, edit, settings, search, filter, etc.). Stroke width **1.5 px**, color inherits `currentColor`, default size 18 px in dense UI / 20 px elsewhere. Lucide is included via CDN — the project ships no icon font, no SVG sprite. ⚠ **This is a substitution** — the brief did not specify an icon system. Lucide was chosen because its thin-stroke, slightly humanist feel matches the brand better than Heroicons (too geometric) or Phosphor (too playful). Open to change.

### 2. Brand ornaments — **custom SVGs** in `assets/`
Used for dividers, ceremony moments, the wordmark, the splash glow orb, section flourishes. These were drawn for this system from the *Epic* leaf-man-armor reference (angular spirals, triskelion-like rotational motifs). They are **decorative only**, not interactive icons.

- `assets/ornament-spiral-single.svg` — a single angular spiral, used as a list bullet at large scale or as a button-flourish.
- `assets/ornament-spiral-triple.svg` — three spirals radiating from a center point (triskelion). Used as section dividers.
- `assets/ornament-divider-horizontal.svg` — a long horizontal flourish for between major sections.
- `assets/ornament-corner.svg` — a single L-shaped corner spiral, mirrored to frame ceremony cards.
- `assets/glow-orb.svg` — a soft radial-gradient orb. The loading + "alive" element.
- `assets/wordmark.svg` — the Filigree wordmark (placeholder, to be replaced).
- `assets/monogram.svg` — a compact triskelion mark for favicons and tight spaces.

> ⚠ **These ornaments are designer-drawn.** The brief reference (the leaf-man's armor from *Epic*) describes a specific visual language. The interpretations here are inspired by that direction but are original drawings — they should be reviewed and either approved, refined, or replaced with art the user owns.

**Emoji:** never used in product UI.
**Unicode characters as icons:** never. Use Lucide for functional, custom SVG for brand.

---

## Index

| Want… | Open |
|---|---|
| Brand context and rules | `README.md` (you are here) |
| Color & type tokens | `colors_and_type.css` |
| Brand marks & ornaments | `assets/` |
| Component cards in the Design System tab | `preview/*.html` |
| The jeweler-app UI kit | `ui_kits/jeweler-app/index.html` |
| Agent skill manifest (for Claude Code) | `SKILL.md` |
