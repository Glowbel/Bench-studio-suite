# HARD RULES — Jordan's Studio Suite
*Load this in every project, every session. These never change without a deliberate decision.*
*Last updated: May 2026*

---

## PARSER CONSTRAINTS — ALL APPS, ALL THREADS, FOREVER

- No arrow functions (`=>`) — use `function` keyword
- No template literals (backticks) — use string concatenation
- No spread operators (`...`) — use `Object.assign({}, obj)` / `arr.concat([item])`
- No CSS custom properties as inline `style=` values
- No `--` inside HTML string literals
- No `<` comparison in JS → use `!(a >= b)`
- No `in` operator → use `Object.prototype.hasOwnProperty.call()`
- No frameworks, no build tools, no imports
- Single self-contained `.html` file always (until The Bench split is complete)

These constraints are intentional and permanent for the HTML distribution track.
A single file that opens anywhere with zero setup is a product advantage, not a limitation.
Parser constraints go away only when hosted (Vercel/Netlify) — plan for that migration.

---

## NO BASE64 IMAGES. EVER.

Embedding base64 images in HTML caused a critical incident in April 2026.
The Bench file grew so large it broke context windows across multiple threads.
Required an emergency surgical strip script to recover.

**All images must be external file paths only:**
```javascript
SKILLS_CARD_IMGS["compendium"] = "assets/skills/compendium.jpg";
```

If any thread suggests embedding images inline — refuse. Reference this rule. No exceptions.
This applies to all four apps: The Bench, Constellation, Decision Wizard, Spatial Calendar.

---

## CODE QUALITY — NON-NEGOTIABLE

- No DOM rebuilds during live interactions (drag, slider, gesture, tick)
- In-place DOM updates only during active interactions
- No `render()` calls mid-gesture
- Flash-free is a first-class requirement
- No DOM queries in animation/physics hot paths — cache references
- New features call existing systems — they don't duplicate them
- State lives in a single state object — never scattered across closures
- No orphaned code — if something is removed, clean its CSS, bindings, state fields

---

## THE WORKING CONTRACT

Every session follows this method. No exceptions.

1. **Read before writing** — read both docs completely, grep file for relevant functions before touching anything
2. **One thing at a time** — one bug, one feature, scoped, built, verified, delivered
3. **Diagnose before fixing** — state root cause before writing a line
4. **Diff before delivering** — state exactly what changed, how many lines, and why
5. **Verify before shipping** — use `node --check` for syntax validation. A broken file never ships.
6. **Ask before assuming** — ambiguous request? Pause and ask.
7. **Update the handoff before closing** — the next thread depends on it

**Jordan cannot read code. He tests by feel and interaction.
If you ship broken or bloated code, he cannot catch it. That responsibility is entirely yours.**

---

## SYNTAX VALIDATION

Use `node --check /tmp/test.js` — correct validator for browser JS patterns.
`new Function()` and `vm.Script` give false positives on valid browser JS. Do not use them.

---

## URGENT FLAGS (as of May 2026)

⚠ **The Bench split is required before any integration work.**
File is ~2,950 lines. Attempting to merge apps without splitting first is the nightmare scenario.
Full split spec in `bench-master-lean.md`. Dedicated session only — not inline during other work.

⚠ **Constellation is ~8,200 lines and also needs splitting.**
Same pattern as The Bench. Dedicated session only. Do before any integration work.

⚠ **Do not wire any app bridges without dedicated integration sessions.**
Constellation → Bench, Wizard → Bench, Spatial Calendar → Bench all require their own sessions.
