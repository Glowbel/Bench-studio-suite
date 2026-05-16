# PRODUCT STRATEGY
*Cross-app strategy, distribution, release tiers, integration bridges, strategic open questions.*
*Fetch when work touches release planning, distribution, pricing, cross-app integration, or strategic decisions that aren't scoped to a single app.*
*For per-app philosophy and current state, see the relevant `[app]/CLAUDE.md`. For the why, see `vision.md`.*
*Last updated: May 2026*

---

## THE SUITE — AT A GLANCE

```
CONSTELLATION (divergent — ideas as minerals)
 ↓ ideas crystallize
DECISION WIZARD (navigate — three-tool suite)
 ↓ path chosen
THE BENCH (convergent — studio cockpit)
 ↓ work executed + scheduled
SPATIAL CALENDAR (time perception)
 ↓
WEBSITE (published + sold)
```

Four apps, one philosophy: infrastructure enables creativity. The arc is raw idea → finished work → sold piece.

---

## DISTRIBUTION STRATEGY

*Locked April 2026. Two tracks, additive — track 2 doesn't replace track 1.*

### Track 1 — Direct file distribution (current, keep forever)

Single HTML file. Parser constraints stay. Works everywhere with zero friction.
Email it, share a link, it just works. Updates = send a new file.

This is a feature, not a limitation. Some users will always prefer this.

### Track 2 — App Store (future, when ready)

Capacitor wraps the existing HTML file. App code stays completely unchanged.
One-time config at submission (~50–100 lines). No rewrite required.
Supabase cross-device sync works automatically in the wrapped version.

**Implication for code:** parser constraints stay until the hosted/wrapped migration. Plan for it but don't pre-optimize.

### Track 3 — Netlify branch deploy (active, per this repo)

Each app branch deploys to its own Netlify URL automatically on push.
Enables live testing and sharing without email-the-file workflow.
Same HTML file — no structural changes. Just a hosting layer.

---

## RELEASE TIERS — PRELIMINARY

| Tier | What | Model |
|------|------|-------|
| The Bench | Core studio ops | Free / freemium |
| Constellation standalone | Creative ideation for any creative pro | Paid |
| Constellation + Bench | The bridge as the premium feature | Paid tier |
| Spatial Calendar | Standalone or bundled | TBD |
| Decision Wizard | Standalone or bundled with Constellation | TBD |

**Strategic insight:** the bridge is the premium feature. Standalone apps create the demand; the integration creates the upgrade path.

---

## ARCHITECTURE REQUIREMENTS — CROSS-APP

These constraints exist to keep the suite flexible across distribution paths and release tiers.

```
[constraints]
apps: independently functional | no hard dependencies
bridges: additive only | never structural
supabase.rls: needs confirmation before real user data
auth: required for multi-user | not yet designed
parser: constraints lift when hosted (Vercel/Netlify) | plan migration
```

If any feature would force two apps to depend on each other to function, stop. That breaks distribution flexibility.

---

## INTEGRATION BRIDGES — ALL GATED

*None of these are wired. Each requires a dedicated integration session before any code.*

```
constellation → bench (THE BRIDGE)
  data: crystallized ideas cross via constellationId on leads[]
  ux: preview bubble, bidirectional, user confirms before commit
  status: data shape not designed
  blocker: ⚠ do not wire without dedicated integration session
  meaning: the bridge is the proof of concept for the philosophy
    "if you trust crystallized things are held well on the other side,
    you can afford to be ruthless about releasing things that don't earn it"

wizard → bench
  data: decision output routes to a Skills node for execution
  ux: wizard identifies the path | skills walks it
  status: not yet designed
  blocker: needs dedicated session

spatial calendar → bench
  data: spatial calendar connects to lead records and Idea Space
  status: not yet designed
  blocker: phase 8 of calendar build plan

constellation → wizard
  data: count the cost ↔ constellation structure mode bridge
  ux: cost mapper surfaces inventory | structure mode organizes it
  status: identified, not designed
  blocker: needs session after both tools exist

constellation structure mode → bench
  data: how structured decisions flow to todos
  status: identified, not designed

values card in the bench
  what: a dedicated card in the bench carousel holding Jordan's core values
  purpose: established once, referenced by all decision tools downstream
  status: not yet built
  meaning: natural future integration point — single source of values truth
```

---

## STRATEGIC OPEN QUESTIONS

*Cross-app or strategic. Per-app open questions live in the relevant `[app]/CLAUDE.md`.*

```
1. release tiers — final pricing, authentication, distribution details
2. website design — visual language, piece display, Square integration UX
3. values card in the bench — where it lives, how it's referenced
4. event operations mode in the bench — bulk repricing, inventory visibility,
   distribution channels (depends on Pieces tab Phase 6 first)
5. authentication — required for multi-user, not yet designed
6. supabase RLS — policies need confirmation before real user data
7. hosted migration — when, how, what changes when parser constraints lift
```

These don't have homes in any single app doc. They surface during strategy or integration sessions.

---

## FETCH TRIGGERS — WHEN TO PULL THIS DOC

```
fetch when:
  release / pricing / distribution touches the work
  integration session between two apps
  authentication or RLS comes up
  hosted migration planning
  Values Card or other cross-app concepts surface
  strategic decisions that don't fit a single app

do not fetch when:
  working inside a single app on its own phase work
  the relevant app doc already has the answer
```

---

## A NOTE ON EVOLUTION

This doc holds strategy, not philosophy. When a strategic question gets answered, it moves out of OPEN QUESTIONS and into the relevant section (or into a per-app doc if it becomes app-specific).

When all bridges are designed and shipped, the INTEGRATION BRIDGES section becomes a record of what was built. When that happens, this doc becomes thinner — strategy that's been resolved doesn't need to keep speaking.
