---
name: filigree-design
description: Use this skill to generate well-branded interfaces and assets for Filigree, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a contemplative single-user jeweler's studio app with dark backgrounds, glowing orbs, teal & violet accents, and angular-spiral ornament motifs.
user-invocable: true
---

# Filigree Design Skill

Read the `README.md` in this folder for the full brand context — content fundamentals (voice, tone, casing, vocabulary), visual foundations (colors, type, spacing, animation, hover states, shadows, radii), and iconography rules.

Then explore the rest of this folder:

- `colors_and_type.css` — drop-in stylesheet with CSS custom properties for the full color and type system. Load this on any artifact you create.
- `assets/` — the brand marks: `wordmark.svg`, `monogram.svg`, and the ornament set (`ornament-spiral-single.svg`, `ornament-spiral-triple.svg`, `ornament-divider-horizontal.svg`, `ornament-corner.svg`, `glow-orb.svg`). All use `currentColor` — set the color on a wrapping element.
- `preview/` — small reference cards showing every token and component state. Look here when you need to see how a button or card *should* look.
- `ui_kits/jeweler-app/` — the studio app UI kit. `Atoms.jsx`, `Shell.jsx`, and the four screen files are good reference for how components compose in real screens. `app.css` is the full component-level CSS.

## Working principles

1. **Dark first.** Page background is `var(--bg)` (`#06080c`), never pure `#000`. Cards step up to `var(--bg-raised)`. Pure white never appears — body text is `var(--mist-200)`.
2. **Teal is alive, violet is deep, gold is rare.** Use teal as the primary action color; violet for ceremony / mystery moments; gold only for "finished work" and price confirmations.
3. **Bezel everything.** Cards carry an inner shadow (`var(--bezel-teal)` / `--bezel-violet` / `--bezel-gold`) that makes them feel like settings holding something. This is the brand's signature.
4. **Breath, not bounce.** Animations use `var(--ease-settle)` and live in the 240–360 ms range. The 2.4 s `breathe` keyframe is only for orbs and other "alive" moments.
5. **Voice is contemplative and plainspoken.** First-person ("my pieces", "I owe"), bare imperative ("Begin a piece"), no "you", no emoji, no exclamation marks, no corporate-product words.

## When invoked

If creating visual artifacts (slides, mocks, throwaway prototypes), copy needed assets out of `assets/` and write static HTML that loads `colors_and_type.css`. Use the `<object>` tag to render ornament SVGs in a wrapping element you can color via `color: var(--teal-300)`.

If working on production code, treat this folder as the source of truth — copy the CSS tokens into the project's stylesheet system, lift component patterns out of `ui_kits/jeweler-app/app.css`, and follow the rules in `README.md`.

If the user invokes this skill without other guidance, ask what they want to build, ask a few focused questions (audience, screen vs print, interactive vs static, length/scope), then act as an expert designer and produce HTML artifacts *or* production code depending on the need. Reach for the existing components in the UI kit before drawing new things.
