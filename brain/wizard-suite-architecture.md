# DECISION WIZARD — Suite Architecture
*Design spec for the three-tool suite. Designed April 28, 2026. Not yet built.*
*Lives in Studio — Design project. Load when designing or discussing the Wizard suite.*
*Do not build any of this without first reading wizard-handoff.md for current status.*
*Last updated: May 2026*

---

## WHY THIS EXISTS

April 28 design session revealed the existing Decision Wizard has a prior-entry problem.
The tool assumed users arrive with a scoped decision and known options.
Real use revealed two prior layers that must be addressed first.

The Decision Wizard is now understood as one tool in a three-tool suite.
A gateway question routes the user to the right tool before any flow begins.

---

## GATEWAY ENTRY

Before any flow starts, the tool asks:
*"What's unclear for you right now?"*

Three routing options:
- "I'm not sure what direction I should even be heading" → **Zoom Out**
- "I know the direction, but I'm choosing between different ways to do it" → **Decision Wizard**
- "I know what I'm leaning toward, but I need to understand what it actually costs" → **Count the Cost**

**Tools are interwoven — not strictly sequential.**
- After any tool: *"Do you have clarity now, or do you need to go deeper?"*
- Backlink always available — if mapper reveals direction is unclear, route to Zoom Out
- Outro question after any complete sequence: *"What's clear? What's still unresolved?"*
- Tool tracks where user has been — does not repeat completed steps

---

## TOOL 1 — ZOOM OUT (not yet built)

**Purpose:** Clarify direction when the user can't name the real decision yet.
The surface decision often masks a deeper unresolved tension.
Zoom Out surfaces the real underlying decision before any path-mapping begins.

**Entry prompt:** *"What's pulling at you right now?"* or *"What are you circling?"*
Not "what decision do you need to make" — that assumes too much.

**Designed flow (not finalized — needs design session to lock):**
1. Name the surface tension — soft, non-committal entry
2. "What's making it hard to decide?" — surfaces the real block
3. Route: Is this a scoped decision or a deeper unresolved direction?
4. If deeper: zoom out questions that reveal the bigger pattern
5. Output: A clarified direction statement that makes the specific decision answerable

**Key insight from stress test:** Users often think they have one decision when they
actually have multiple hidden sub-paths inside it. The pre-mapper discovery is essential.

**What still needs to be locked in a design session:**
- Exact question sequence
- Output format — what does the clarified direction statement look like?
- Routing logic — how does the tool decide when the user is ready for Decision Wizard?

---

## TOOL 2 — DECISION WIZARD (built)

**Purpose:** Map values alignment across decision paths once direction is clear.
This is what's already built. No changes to core architecture needed.

Entry: User knows what they're deciding between. Has named options.
Output: Values-ranked decision paths, feasibility assessment.

The gateway handles the prior layer — by the time a user reaches this tool,
they are genuinely ready for it. No change needed to existing screens.

See `wizard-master-lean.md` for full architecture and function reference.

---

## TOOL 3 — COUNT THE COST (not yet built)

**Purpose:** Witness what a chosen path actually costs before committing.
Not intellectual analysis — embodied reckoning. Makes invisible costs visible.
For big nested decisions with emotional casualties.

Entry: User knows what they're leaning toward. Needs to feel into it honestly.

---

### Pathway A — Sandbox
*For visual and embodied thinkers.*

A guided experience into the sensory texture of the path.
Not a form. Not questions to answer. A space to inhabit the decision
while it's still safe to walk back out.

**The AI sets the scene** with 2-3 sparse, evocative sentences placing the user
inside the decision already in motion. Then gets out of the way completely.
Does not evaluate responses. Does not redirect. Witnesses. Reflects patterns
back if they emerge. Does not judge.

**Five dimensions — sparse, evocative prompts, not interrogation:**
- **Seeing** — what will you literally be looking at?
- **Hearing** — what conversations, sounds, interactions are coming?
- **Feeling** (heart) — what emotional weather comes with this path?
- **Sensing** (body) — physical texture, fatigue, what your hands are doing
- **Thinking** — what occupies your mind? What's the momentum pulling toward?

**The sandbox is safe because nothing is decided yet.**
Permission to walk in and walk out. That's what makes honest sensing possible —
no commitment pressure while inside.

**What still needs to be locked in a design session:**
- Exact prompt wording for each dimension
- How the AI sets the scene — word count, tone, what to include
- How it reflects patterns back — when, how, what triggers reflection
- Transition out — how the user exits and what they carry forward

---

### Pathway B — Logistics Breakdown
*For people who feel it but need the steps laid out.*

Honest itemization of what the path actually requires.
Time, energy, skills, resources, momentum — broken down concretely.
Not a to-do list yet. An inventory of what you're carrying.

**This is the original Phase Two intake wizard, repositioned.**
The question sequence Jordan designed in the gemstone scenario maps directly:
1. Capability assessment — "Can you do X?"
2. Goal clarification — "Money, or completion, or both?"
3. Time/effort willingness — "Fast return or maximum return?"
4. Filter to viable next steps based on answers
5. Identify ONE immediate next step that reveals what comes after
6. Repeat from new information

Sequential revelation only. One question at a time. Never front-load comparisons.

---

### Pathway C — Financial Reckoning
*For people who need the numbers.*

Real cost calculation. Up-front costs, ongoing costs, cash flow timing.
Not just net outcome — what it costs to get there.
Honest about sequence: what do you pay before you earn?

---

### Routing Between Pathways

Tool asks: *"What would help you actually understand this cost?
Do you need to see yourself in it? Do you need the pieces laid out?
Do you need to know the numbers?"*

Routes accordingly. User may need more than one pathway.
Combinations run in sequence. Tool tracks what's been completed.

**Output:** Honest reckoning with real cost. Not a decision — a witnessed reality.
The decision was already made. This is the check before the commitment.

---

## VOICE INPUT — ESSENTIAL FOR COUNT THE COST

Jordan is often in an emotional or pressured headspace when counting costs.
Writing is hard. Speaking is natural.

**Intended stack:** Whisper API (transcription) + Claude API (distillation)

Do not build without confirming integration approach in a dedicated session.
Voice input is especially critical for Pathway A (Sandbox) and the gateway entry.

---

## COUNT THE COST → CONSTELLATION STRUCTURE MODE BRIDGE

Identified April 28. Not yet designed.

Count the Cost's Logistics Breakdown (Pathway B) surfaces an inventory of
what a path requires. Constellation Structure Mode organizes complex multi-part things.
The bridge between them would let a cost inventory flow into a structured constellation.

Needs dedicated session after both tools exist and have been used.

---

## BUILD ORDER (after design session locks the above)

1. Gateway entry screen — routing logic only, small
2. Zoom Out tool — new flow, precedes existing screens
3. Count the Cost shell — pathway routing
4. Sandbox pathway (Pathway A)
5. Logistics Breakdown pathway (Pathway B — draws from original Phase Two design)
6. Financial Reckoning pathway (Pathway C)
7. Transition logic between all three tools
8. Voice input integration

Parser constraints apply throughout. File is currently clean — verify stays clean before any new code.
