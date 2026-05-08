# MASTER — Design & Strategy
*The full suite. Philosophy, relationships, release strategy, open questions.*
*Load in design and brainstorm threads alongside working-dynamic.md.*
*Last updated: May 2026*

---

# THE SUITE — FOUR APPS, ONE PHILOSOPHY

**Philosophy:** Infrastructure enables creativity. The system holds what the mind
shouldn't have to. When the operational layer works invisibly, the creative layer
can go fully alive.

**The arc:** Raw idea → finished work → sold piece.

```
CONSTELLATION (divergent creative)
    ↓ ideas crystallize
DECISION WIZARD (navigate — three-tool suite)
    ↓ path chosen
THE BENCH (convergent operations)
    ↓ work executed + scheduled
SPATIAL CALENDAR (time perception layer)
    ↓
WEBSITE (published + sold)
```

---

## The Bench
*Studio operations cockpit. The convergent engine.*

Customers, pieces, skills, timer, finances, schedule.
Remembers everything so the jeweler doesn't have to.

**The Bench holds what the mind shouldn't have to track —
so when Jordan is at the bench, he is fully present there.**

Supabase already wired. One KV table `bench_data`, upsert pattern.
`pieces_published` table planned — not yet built. Foundation for website.

---

## Constellation
*Divergent creative companion.*

Holds vapor — half-formed commissions, material hunches, budget constraints
that haven't crystallized yet. Ideas accumulate mass through interaction
and crystallize into formal records.

**The mineral metaphor is the philosophical core.**
Ideas are elemental. Interaction is pressure. Crystallization is the phase
transition from thought to committed work. The stone is a record of the
creative journey — unreplicable, earned, beautiful.

**The bridge philosophy:**
*"If you trust that crystallized things are held well on the other side,
you can afford to be ruthless about releasing things that don't earn it."*
The bridge is not infrastructure. It is the proof of concept for the philosophy.

Two modes: Creative (entropy, drift, dissolution) and Structure (organization,
orbital lanes, gravitational bias toward clarity).

---

## Decision Wizard — Three-Tool Suite
*Values-informed navigation for complex decisions.*

**Not one tool — a three-tool suite with gateway routing.**

Gateway entry: *"What's unclear for you right now?"*
- "I'm not sure what direction I should even be heading" → Zoom Out
- "I know the direction, but choosing between ways to do it" → Decision Wizard
- "I know what I'm leaning toward but need to understand the real cost" → Count the Cost

Tools are interwoven, not sequential. User can move between them.
After any tool: "Do you have clarity now, or do you need to go deeper?"

**The Feasibility Principle:**
Feasibility = mental clarity + emotional alignment + physical execution capacity.
Not just "can I do this" — can I carry this forward without burning out?

**Emotional UX principle — non-negotiable:**
Acknowledge the weight before starting to solve. Hold the tension.
Move forward anyway. Feel personal — not generic advice, not a productivity system.

---

## Spatial Calendar
*Time perception layer. A 3D tunnel where time comes at you.*

Instead of a flat grid, the user moves through time. Schedule blocks travel
down a 3D tunnel toward a NOW threshold and are consumed as they pass through it.

Two modes: Map (calibration/edit) and Clock (real-time anchored viewer).

Part of The Bench suite. May also release as standalone — same dual-track
distribution decision as Constellation.

---

## The Website
*Public-facing extension of The Bench.*

Piece record → publish → `pieces_published` Supabase table → website → Square payment → purchase.
No third-party commerce tools. Single-file HTML, same pattern as The Bench.
Supabase already wired — adding a second table is straightforward.
Depends on Pieces tab (Phase 6) being built first.

---

# HOW THE APPS RELATE

**Constellation → Bench (The Bridge):**
Crystallized ideas cross via `constellationId` on `leads[]`.
Preview bubble — bidirectional, user confirms before committing.
⚠ Data shape not designed. Do not wire without dedicated integration session.

**Wizard → Bench:**
After decision is made, wizard output routes to a Skills node for execution.
The wizard identifies the path. Skills walks it.
Not yet designed. Needs dedicated session.

**Spatial Calendar → Bench:**
How the spatial calendar connects to lead records and Idea Space in The Bench.
Not yet designed. Phase 8 of the calendar build plan.

**Constellation → Wizard:**
Count the Cost → Constellation Structure Mode bridge identified.
Cost Mapper surfaces inventory. Structure Mode organizes it.
Needs session after both tools exist.

**Values Card in The Bench:**
A dedicated card in The Bench carousel holding Jordan's core values.
Established once, referenced by all decision tools downstream.
Not yet built. Natural future integration point.

---

# RELEASE STRATEGY

## Distribution — Locked April 2026

**Track 1 — Direct file distribution (current, keep forever):**
Single HTML file. Parser constraints stay. Works everywhere with zero friction.
Email it, share a link, it just works. Updates = send a new file. This is a feature.

**Track 2 — App Store (future, when ready):**
Capacitor wraps the existing HTML file. App code stays completely unchanged.
One-time config at submission (~50-100 lines). No rewrite.
Supabase cross-device sync works automatically in the wrapped version.

## Release Tiers (preliminary)

| Tier | What | Model |
|------|------|-------|
| The Bench | Core studio ops | Free / freemium |
| Constellation standalone | Creative ideation for any creative pro | Paid |
| Constellation + Bench | The bridge as the premium feature | Paid tier |
| Spatial Calendar | Standalone or bundled | TBD |
| Decision Wizard | Standalone or bundled with Constellation | TBD |

**Architecture requirements:**
- Keep all apps independently functional — no hard dependencies
- All bridges are additive, not structural
- Supabase RLS policies need confirmation before real user data
- Authentication needed for multi-user — not designed yet
- Parser constraints go away when hosted — plan for that migration

---

# OPEN DESIGN QUESTIONS
*Needs dedicated sessions before any code is written.*

1. Constellation → Bench bridge — data shape, routing, preview bubble design
2. Wizard gateway — exact wording, routing logic between three tools
3. Zoom Out tool — question sequence, output format, routing logic
4. Count the Cost sandbox — prompt wording, AI scene-setting, reflection mechanics
5. Spatial Calendar → Bench bridge — connection to lead records and Idea Space
6. Decision Wizard Phase Two — voice input, Whisper + Claude API integration
7. Constellation structure mode — minimum viable orbital lane snapping
8. Values Card in The Bench — where it lives, how it's referenced
9. Product release tiers — pricing, authentication, distribution details
10. Website design — visual language, piece display, Square integration UX
11. Constellation structure mode → Bench bridge — how structured decisions flow to todos
12. Event Operations Mode in The Bench — bulk repricing, inventory visibility, distribution channels
    (depends on Pieces tab Phase 6 first)
