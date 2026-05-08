# CONSTELLATION — Bubble Interactions & Tools
*Design spec. Load in design threads when discussing Constellation features.*
*Do not build any flagged section without a dedicated design session.*
*Last updated: May 2026 (sourced from design sessions 1–4 + scenario stress-test)*

---

## SUMMONING A BUBBLE — The Field Gesture

**Long press anywhere on the field** → small radial menu appears at press point:
- Voice note — records raw audio, stores as-is
- Voice to distill — records audio, AI distills into clean label, preserves raw
- Text — keyboard input, AI distills on submit
- Sketch — opens sketch bubble type at that position

The bubble is born where you press. It belongs to the field, not to a toolbar.
There is no plus button. The gesture is the declaration.

---

## BUBBLE TYPES

**Standard Bubble** — default. Holds voice notes, text fragments, distilled labels.
Accumulates mass through meaningful interaction.

**Sketch Bubble** — dedicated spatial design workspace. Full spec below.

*(Future types TBD as system develops)*

---

## BUBBLE MASS & VISUAL STATES

Mass accumulates through meaningful interaction only.
Passive taps do not count. Only active refinements add weight.

**⚠ DO NOT BUILD visual states without a dedicated design session first.**
Visual references and motion references must be established before any code.

**Five states — each must be a fundamentally different visual object, not a brightness variation:**

1. **Flicker** — vapor cloud, wispy, semi-transparent, irregular edges, no defined center. Proto-stellar.
2. **Glow** — defined shape emerging from the cloud. Soft edges. Has been touched.
3. **Pulse** — distinct object with slow breathing rim. Brightens and dims on slow cycle. Accumulating.
4. **Radiance** — visible atmospheric layers. Warm inner glow, cooler outer halo. Field bends faintly toward it.
5. **Corona** — rotating wispy surround. Field deforms visibly. Other bubbles drift in its direction. The dominant idea.

Each state is tunable in visibility per bubble — a dial adjusting how loudly the state speaks.

**Manual gravity override** — long-press + drag upward lets user manually increment mass state.
A declaration of intent, not inflation. System honors it and adjusts physics.

---

## BUBBLE ZOOM — The Interior

Tapping a bubble causes it to rush toward the viewer, expanding to fill ~86% of the viewport.
The field remains faintly visible at the edges. You are immersed but haven't forgotten where you are.

**Inside the expanded bubble:**
- Existing notes drift as floating italic fragments
- A weight arc traces the rim showing accumulated mass
- Moons/linked sub-bubbles continue orbiting in the interior
- Whisper input at the bottom — soft, italicized: *"add a thought…"*

**Whisper input behavior:**
- Tap → type loosely or speak
- On submit → AI distills ramble into a clean label, surfaces it briefly
- Raw input preserved as a floating note inside the bubble
- Both raw note and distilled label always stored. Raw is never discarded.

**Three exit gestures — all three implemented, not redundant:**
- Tap outside the rim
- Drag the rim downward
- Pinch to close
*(Temporary back button while gestures are being refined)*

---

## BUBBLE LINKING — Proximity and Orbital Gestures

**When dragging a bubble toward another**, at proximity threshold the target reveals three concentric zones:

**Zone 1 — Core:** The bubble itself. Unchanged.

**Zone 2 — Planetary ring** (1 bubble-radius out): Solid dotted border. Label: *planetary link.*
- Target = planet, dragged = moon
- Target gains small mass increment
- Dragged bubble begins orbiting
- Confirmation: filament of bonding light flashes and fades

**Zone 3 — Mutual ring** (2 bubble-radii out): Lighter dotted border. Label: *mutual link.*
- Peer tether, neither gains mass
- Softer filament connects them
- They drift together without hierarchy

**Contact dwell:** 600ms before zones appear.

**Mass-driven drift (passive):** As one linked bubble accumulates more mass than its peer,
the lighter one begins drifting into natural orbit. No gesture required.
Physics suggests, user decides.

**Override rule:** Drag-onto gesture always supersedes passive physics.
User intention supersedes gravity calculation. The physics inform but never imprison.

---

## THE SKETCH BUBBLE — Full Spec

### Purpose
Not a replacement for pen and paper. A receiver of what pen and paper produces, made precise.
Its honest value: millimetric stone placement on top of a gesture the hand already made.

### Source Material (two valid inputs — treated identically once inside)
- **Paper sketch photographed** — draw freely at any size, photograph, upload
- **Physical piece photographed** — a real piece of jewelry, photographed, uploaded for annotation

Both land as the photo layer. The grid and tools overlay on top.

### The Layer Stack — Three Independent Layers, Each Togglable

**Photo layer** — original uploaded image. Can be hidden once line overlay is established.

**Line layer** — system-traced pencil-style overlay acknowledging the drawing's structure.
Traces outer boundary, inner structural lines, detail lines. Light pencil aesthetic.
*I see what you made. I understand its shape.*
- Subtly editable: tap a line segment to reveal endpoints, drag to make micro-corrections
- Not full vector editing — physical gesture micro-corrections only
- Feels like refinement, not Illustrator

**Stone layer** — all placed stones with setting indicators. Can be hidden independently.
Stone data (size, cut, setting type) is data, not decoration — feeds the piece record on crystallization.

### The Millimetric Grid
- Snap points at intersections (faint dots), light grid lines
- Scale indicator in corner showing real mm
- All stone placement snaps to this grid
- Drawing mode does NOT snap — freehand only

### Stone Tool
**Shape picker** (slides up from bottom): round, oval, pear, trillion, cushion, emerald, marquise, baguette.

**Each stone placed on grid:**
- Faint facet lines suggesting the cut (gesture toward it, not a render)
- Setting indicator at the setting position:
  - **Prong:** four dots arranged around center circle, sized to stone diameter
  - **Bezel:** continuous rim line around stone perimeter
  - **Tube:** single clean circle, slightly larger than stone
- Measurement tag on edge showing current size in mm
- Pinch to resize — number updates live
- Tap number → type exact value (e.g. 2.1mm) → snaps to grid
- Drag to reposition. Rotate gesture. Tap for color swatch.
- **Color fill = color wash, not a render.** A gesture toward the material.
  Palette: amethyst purple, emerald green, sapphire blue, citrine yellow, ruby red, diamond clear, custom.

**Multiple stones:** Independent. Each has its own size, shape, setting, color.

### Draw Mode
- Free line tool. No shape recognition. No snapping. Round cap.
- Variable weight (light press = thin, firm press = thicker if pressure-sensitive device available)
- Eraser that feels like refinement, not deletion
- The stones are precise anchors. The lines are the gesture around them.

### Technical Annotations
Wire gauge, number of wires, wrapping pattern, material spec — low-ceremony text fragments.
Notes to a future self. Not formal piece records yet. Feed the piece record on crystallization.

### Export
- Layer-selectable clean image (choose which layers are visible in export)
- White or dark background option
- Shareable with customers at any stage
- Stone data (size, cut, setting type, color) travels with piece record as structured data on crystallization

### What the Sketch Produces on Crystallization
- Reference image → travels to The Bench as the piece's origin visual
- Stone specs → populate Idea Space reference cards + eventually piece Materials tab
- Technical annotations → populate as notes on the piece record
- The original sketch is never discarded — it remains as the record of where the piece began

### ⚠ Notes for Coding Session
- Line layer tracing (photo → pencil overlay) is technically complex. Needs its own scoped spec before building.
- Stone SVG shape library needs to be built — all cut shapes as precise SVG paths.
- The prong indicator is a specific component: four dots around a center circle, scalable to stone diameter.
- Draw mode must have **zero shape recognition and zero snapping.** Non-negotiable.
- Visual states must not be built until design session with visual/motion references.

### ? Future — Setting Builder
Design custom setting configurations inside the sketch tool. Not in scope. Door left open.

---

## BUBBLE COUNT CONSTRAINT

Maximum 3–5 active bubbles at one time. This is a cortisol management decision.
You cannot hold forty open loops. The constraint is the relief.

**Implementation:** Soft resistance rather than hard cap.
Adding a 6th bubble should feel like a decision, not an error.

---

## DISSOLUTION — Conscious Release

Choosing to let something go deserves its own ceremony — equal ritual to crystallization.

A dissolved bubble leaves a ghost trace in the field for a session or two.
Proof the thing existed and was consciously released, not just lost.

On the silver mesh/grid (future layer): when a bubble dissolves, the well it created
slowly exhales back toward flat. Not erased — healed.

**Dissolution is as valid as crystallization. It needs equal design attention.**

*The dissolution gesture — what the user physically does — has not yet been designed.
Do not build dissolution animation until the gesture is locked.*

---

## COLLABORATIVE BUBBLES

When two people contribute to the same constellation, their bubbles carry a slightly
purple emanation distinguishing their contributions from the primary user's.
Ownership visible in the field without labeling it.

*Low daily utility. High relational significance. Not in scope yet. Door left open.*

---

## CRYSTALLIZATION

A bubble crystallizes when it has accumulated sufficient mass through meaningful
interaction, OR when manually promoted via long-press gesture.

**Auto-crystallization** (earned through weight threshold): locks immediately.

**Manual crystallization** (forced): 6-second grace window with quiet fading undo ghost before locking.

**The crystallization moment must feel ceremonial.** Earned. Like the video game moment
of combining elements into something rare. Not a notification. Not a confirmation dialog. A reward.

On the mesh/grid: a sudden snap — the grid collapsing sharply inward.
A visible phase transition in the fabric of the space itself.

**The crystallization render:**
At crystallization, the system generates a mid-fidelity vision image from all accumulated content.
- NOT photorealistic — mid-fidelity, illustrated, like an expert sketch brought partially to life
- A direction, not a destination. Room for imagination. Room for the physical piece to be better.
- Stored as a fourth layer in the sketch bubble
- The basis for the customer-facing vision document

**⚠ Developer note on render style:** Do NOT use a photorealism API or prompt style.
The render must feel permeable. Photorealistic renders lock customer expectations
in ways that harm the fabrication relationship.

---

## PERSONAL CONSTELLATION NODES

Not everything that crystallizes crosses the bridge to The Bench.
Some things crystallize into permanence, not production:
- Creative origin stories
- Personal work and explorations
- Dissolved commissions that mattered but didn't proceed
- Reference constellations

These are valid. They are honored. They live in the constellation drawer under Unlinked.
They do not need a piece record to have meaning.
