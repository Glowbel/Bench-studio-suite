# NotallyX — Filigree Visual Transition Map
*Read this before touching any visual resource file.*
*Last updated: May 2026*

---

## WHAT THIS IS

NotallyX currently runs Material Design 3 with a purple-blue (indigo) palette, system light/dark mode, and standard MD3 component styling. Filigree is dark-first, jeweler's-studio aesthetic — obsidian backgrounds, teal/violet/gold accents, Cormorant Garamond type, bezel shadows that make surfaces feel physically held.

This document maps every NotallyX visual token to its Filigree equivalent. No code is changed here. This is the reference for the coding session that applies the redesign.

Filigree source: `designs/SYSTEM.md` + `designs/tokens.css`

---

## STRATEGY

Filigree has no true light mode. The translation strategy:

- **Dark theme becomes canonical** — the obsidian palette is the primary experience
- **Light theme gets a warm parchment pass** — `mist-100` text on a warmer `#f0ede8` ground, primary teal, keeping MD3 structure
- **Contrast variants** — preserved structurally, re-tuned to Filigree's obsidian scale
- **MD3 component framework stays** — only the token values change, not the component classes

---

## COLOR TOKEN MAP — DARK THEME (values-night/colors.xml)

| MD3 Role | Current | Filigree Value | Notes |
|---|---|---|---|
| `md_theme_primary` | #B7C4FF | `#4acc85` (teal-300) | alive accent · focus rings |
| `md_theme_onPrimary` | #1E2D61 | `#1c1d22` (ink-950) | text on teal |
| `md_theme_primaryContainer` | #364479 | `#094428` (teal-700) | pressed / deep teal |
| `md_theme_onPrimaryContainer` | #DCE1FF | `#f3f6f5` (mist-100) | text on teal container |
| `md_theme_secondary` | #C2C5DD | `#b083d8` (violet-300) | discovery · letters |
| `md_theme_onSecondary` | #2B3042 | `#1c1d22` (ink-950) | text on violet |
| `md_theme_secondaryContainer` | #424659 | `#4d2580` (violet-700) | deep violet container |
| `md_theme_onSecondaryContainer` | #DEE1F9 | `#f3f6f5` (mist-100) | text on violet container |
| `md_theme_tertiary` | #E3BADA | `#f0d28a` (gold-300) | ceremony · rare · earned |
| `md_theme_onTertiary` | #43273F | `#1c1d22` (ink-950) | text on gold |
| `md_theme_tertiaryContainer` | #5C3D57 | `#9a7c3d` (gold-600) | deep gold container |
| `md_theme_onTertiaryContainer` | #FFD7F5 | `#f3f6f5` (mist-100) | text on gold container |
| `md_theme_error` | #FFB4AB | `#e08888` | lighter danger for dark bg |
| `md_theme_onError` | #690005 | `#1c1d22` (ink-950) | text on error |
| `md_theme_errorContainer` | #93000A | `#5a1a1a` | deep error container |
| `md_theme_onErrorContainer` | #FFDAD6 | `#d8dfdc` (mist-200) | text on error container |
| `md_theme_background` | #121318 | `#1c1d22` (ink-950) | page background |
| `md_theme_onBackground` | #E3E1E9 | `#d8dfdc` (mist-200) | default body text |
| `md_theme_surface` | #121318 | `#1c1d22` (ink-950) | surface = background |
| `md_theme_onSurface` | #E3E1E9 | `#d8dfdc` (mist-200) | text on surface |
| `md_theme_surfaceVariant` | #45464F | `#353953` (ink-700) | divider / subtle fill |
| `md_theme_onSurfaceVariant` | #C6C5D0 | `#b3bdba` (mist-300) | secondary text |
| `md_theme_outline` | #90909A | `#8a9692` (mist-400) | border · input stroke |
| `md_theme_outlineVariant` | #45464F | `#404663` (ink-600) | subtle border |
| `md_theme_scrim` | #000000 | `#0a0b0e` | scrim — near-black, not pure |
| `md_theme_inverseSurface` | #E3E1E9 | `#d8dfdc` (mist-200) | inverse surface |
| `md_theme_inverseOnSurface` | #2F3036 | `#2c2f42` (ink-800) | text on inverse |
| `md_theme_inversePrimary` | #4E5C92 | `#168258` (teal-500) | inverse primary |

### Surface containers (dark) — obsidian stack

| Role | Current | Filigree | Obsidian level |
|---|---|---|---|
| `surfaceContainerLowest` | #0D0E13 | `#14151a` (bg-sunken) | deepest well |
| `surfaceContainerLow` | #1A1B21 | `#1c1d22` (ink-950) | page level |
| `surfaceContainer` | #1E1F25 | `#232531` (ink-900) | card / panel |
| `surfaceContainerHigh` | #292A2F | `#2c2f42` (ink-800) | raised card / hover |
| `surfaceContainerHighest` | #34343A | `#353953` (ink-700) | topmost surface |
| `surfaceDim` | #121318 | `#1c1d22` (ink-950) | dimmed = background |
| `surfaceBright` | #38393F | `#353953` (ink-700) | brightened surface |

### Custom NotallyX colors

| Name | Current | Filigree | Notes |
|---|---|---|---|
| `ContainerLight` | #FAF8FF | `#f3f6f5` (mist-100) | light container |
| `ContainerDark` | #1A1B21 | `#1c1d22` (ink-950) | already close |
| `ContainerSuperDark` | #000000 | `#0a0b0e` | near-black, never pure |
| `TextLight` | #F1F0F7 | `#f3f6f5` (mist-100) | strong emphasis text |
| `TextDark` | #1A1B21 | `#232531` (ink-900) | text on light bg |
| `TextDarkLight` | #261A1B21 | `#40232531` | same with alpha |

---

## COLOR TOKEN MAP — LIGHT THEME (values/colors.xml)

Filigree is dark-first so the light theme is a secondary concern. Strategy: warm parchment ground, teal primary, mist text.

| MD3 Role | Current | Filigree Light |
|---|---|---|
| `md_theme_primary` | #7285D0 | `#168258` (teal-500) |
| `md_theme_onPrimary` | #FFFFFF | `#f3f6f5` (mist-100) |
| `md_theme_primaryContainer` | #DCE1FF | `#ccf2d5` (teal-100) |
| `md_theme_onPrimaryContainer` | #05164B | `#094428` (teal-700) |
| `md_theme_secondary` | #595D72 | `#7c44b8` (violet-500) |
| `md_theme_onSecondary` | #FFFFFF | `#f3f6f5` |
| `md_theme_secondaryContainer` | #DEE1F9 | `#e6d2f5` (violet-100) |
| `md_theme_onSecondaryContainer` | #161B2C | `#4d2580` (violet-700) |
| `md_theme_tertiary` | #75546F | `#9a7c3d` (gold-600) |
| `md_theme_onTertiary` | #FFFFFF | `#f3f6f5` |
| `md_theme_tertiaryContainer` | #FFD7F5 | `#f5e8c0` (warm gold tint) |
| `md_theme_onTertiaryContainer` | #2C1229 | `#6b5029` |
| `md_theme_background` | #FAF8FF | `#f0ede8` (warm parchment) |
| `md_theme_onBackground` | #1A1B21 | `#232531` (ink-900) |
| `md_theme_surface` | #FAF8FF | `#f0ede8` |
| `md_theme_onSurface` | #1A1B21 | `#232531` (ink-900) |
| `md_theme_surfaceVariant` | #E2E1EC | `#e0ddd8` |
| `md_theme_onSurfaceVariant` | #45464F | `#4c537a` (ink-500) |
| `md_theme_outline` | #767680 | `#5e6a66` (mist-500) |
| `md_theme_outlineVariant` | #C6C5D0 | `#b3bdba` (mist-300) |
| Surface containers | #FFF → #E3E1E9 | parchment stack: #f0ede8 → #d8d4cc |

---

## COMPONENT TRANSITIONS

### AppTheme

```xml
<!-- Current: Theme.Material3.Light.NoActionBar -->
<!-- Change to: Theme.Material3.Dark.NoActionBar as primary -->
<!-- Light variant: Theme.Material3.Light.NoActionBar with parchment tokens -->
```

### NavigationView (drawer)

```
Current:  colorSurface background
Filigree: ink-900 (#232531) background gradient — linear(ink-900 → #08090d)
          right border: 1px ink-600 + subtle teal glow shadow
```

### FileChip / FilterChip

```
Current:  colorOnSurface text + stroke, standard MD3 shape
Filigree: teal variant — color teal-300 (#4acc85)
          border rgba(95,213,193,0.35) | bg rgba(15,90,82,0.30)
          font: label-small → Cormorant small-caps when typography is in scope
          For filter chips: muted variant — color mist-300, plain border
```

### ReminderChip

```
Current:  MaterialComponents.Chip.Action default
Filigree: violet variant — color violet-300 (#b083d8)
          border rgba(176,131,216,0.35) | bg rgba(38,15,68,0.50)
```

### RoundedTextInput

```
Current:  boxBackgroundColor = secondaryContainer, 50% corner radius, no stroke
Filigree: boxBackgroundColor = ink-600 (#404663)
          boxStrokeColor on focus = teal-300 (#4acc85)
          corner size: 8dp (radius-md) — less pill, more refined
```

### FloatingActionButtonPrimary

```
Current:  colorPrimary bg, colorOnPrimary icon
Filigree: bg teal-700 (#094428) | icon mist-100 (#f3f6f5)
          elevation shadow: 0 8px 24px rgba(0,0,0,0.50), 0 0 32px rgba(95,213,193,0.06)
```

### PreferenceHeader

```
Current:  colorPrimary text
Filigree: teal-300 (#4acc85) text | Cormorant small-caps (when typography in scope)
```

### ModalBottomSheet

```
Current:  colorSurface bg, flat corners top
Filigree: ink-900 (#232531) bg | whisper border-top rgba(61,72,88,0.20)
          elevation: e3 shadow pattern
```

### AlertDialog (Material3)

```
Current:  colorSurface bg
Filigree: ink-900 (#232531) bg | border rgba(61,72,88,0.40)
          elevation: 0 24px 64px rgba(0,0,0,0.60), 0 0 80px rgba(124,68,184,0.10)
```

---

## FILES TO MODIFY (coding session)

1. `app/src/main/res/values/colors.xml` — light theme token values
2. `app/src/main/res/values-night/colors.xml` — dark theme token values (primary target)
3. `app/src/main/res/values/themes.xml` — AppTheme + all component styles
4. `app/src/main/res/values-night/themes.xml` — dark theme overrides
5. `app/src/main/res/values-v23/themes.xml` — v23+ status/nav bar colors
6. `app/src/main/res/values-v26/themes.xml` — v26+ icon tinting
7. `app/src/main/res/values-v27/themes.xml` — v27+ light nav bar
8. `app/src/main/res/values/notallyx_background.xml` — custom bg color (`#7184D0` → teal-500)
9. `app/src/main/res/values/dimens.xml` — touch targets, animation timing

---

## TYPOGRAPHY SCOPE NOTE

Filigree uses **Cormorant Garamond** (serif display) and **JetBrains Mono** (mono).

Android path:
- Add as downloadable font via `res/font/` + `font_provider_certificate` OR
- Bundle the TTF files directly under `res/font/cormorant_garamond_*.ttf`
- Create `res/values/type.xml` with `TextAppearance` overrides pointing to Cormorant

**Decision needed before coding:** is typography in scope for this pass, or colors-only first?

Colors-only pass is lower risk and faster. Typography is a second layer.

---

## DIMENSION MAP

| NotallyX | Current | Filigree |
|---|---|---|
| Nav animation | 300ms | 280ms (dur-base) |
| Min touch target | 14dp | 14dp (unchanged) |
| Corner radius (rounded inputs) | 50% (pill) | 8dp (radius-md) — more refined |
| Chip corner | MD3 default (~8dp) | `radius-full` (9999px) for label chips |
| Card corner | MD3 default | 12dp (radius-lg) |
| Dialog corner | MD3 default | 12dp (radius-lg) |
| Bottom sheet top corner | 0dp (flat) | 12dp (radius-lg) top only |

---

## CONTRAST VARIANTS

NotallyX defines `_mediumContrast` and `_highContrast` color variants for accessibility.

Strategy for Filigree translation:
- **Medium contrast:** use the mid-step Filigree color (e.g. teal-300 → teal-200 text, teal-500 containers)
- **High contrast:** use mist-100 text everywhere on dark, teal-300/violet-300/gold-300 for actions — maximum legibility, still within Filigree palette

These variants only need updating in `values/colors.xml` and `values-night/colors.xml`.

---

## SESSION CRYSTAL

Snapshot of where this work pauses:
- NotallyX source copied unmodified to `notally/` in this repo
- Full color map and component guide written here
- No NotallyX files have been changed
- Next session: start with `values-night/colors.xml` (dark theme primary) → then `themes.xml` → then handle contrast variants
- Typography decision is a prerequisite for that session
