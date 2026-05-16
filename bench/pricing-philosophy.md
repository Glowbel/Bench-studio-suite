# Bench — Pricing Philosophy & Commission Intake
*Design spec for the Bench pricing system.*
*Source: April 2026 design session.*
*After pricing feature ships: distill locked patterns → bench/CLAUDE.md ARCHITECTURE | delete this file.*

---

## The Commission Intake Process

When a customer approaches, Jordan intuitively: shows them his library to filter for resonance, reads their vulnerability and openness, assesses whether he can find genuine connection with their vision. This process is sophisticated and effective — it just lives in his instincts rather than in a formal system. The pricing tool needs to make this visible and walkable.

## The Two Pricing Tracks

**Heart commission** — work that Jordan is deeply connected to. Prices at "what would I need to accept to part with this." The five seventy-five wirework piece is the clearest example. Materials were fifteen to twenty dollars. Hours were maybe six. But the piece had accumulated meaning, spiritual significance, artistic integrity. It sat in his case for years at three ten because three ten felt cheap. Five seventy-five felt like the covenant price — the threshold where he could let it go to someone worthy of it.

**Technical commission** — work that is primarily craft execution. Prices at components: materials plus labor plus complexity plus consumables plus margin.

**The key insight:** Sacred work earns premium pricing not despite the heart connection but because of it. Underpricing heart work dishonors it. It tells the buyer — and Jordan himself — that it's worth less. The price is part of the covenant between the piece and its new keeper.

**The hidden trap:** When something lives deep in Jordan's heart, he instinctively wants to charge less — as if money is the wrong currency for something sacred. This needs to be consciously reframed. The more heart-connected the piece, the higher the floor. Not lower.

## The Slider Concept

The pricing tool needs a spectrum — not a fixed formula — that moves between two poles:

```
"What would I need to part with this" ←————→ "What did this actually cost me"
```

Where Jordan places a piece on that spectrum determines how the pricing formula weights itself. This is the most important UI element in the entire pricing system.

## The Intake Sequence

Before any pricing calculation, the tool needs to walk through:

1. **Connection** — Do I feel genuinely connected to this person?
2. **Vision** — Can I find my thread inside their vision?
3. **Heart posture** — Where am I on the spectrum today? Am I in flow or in technical mode?
4. **Technical assessment** — Materials, labor, complexity, consumables, unknowns
5. **Price** — Weighted by where the piece lands on the slider

**The one question that does everything:** "Tell me what's meaningful to you about this piece. Not the specs — why does it matter?"

## The Skill Domains

Jordan has identified multiple distinct craft domains, each with its own mastery curve:

- Flex shaft mastery
- File work
- Polishing and finishing (instinctually sharp — high mastery)
- Soldering (solid results, but still building intuitive speed — extra time cost)
- Microscope work
- Stone and metal knowledge
- Tool selection
- Customer communication
- Spatial and contextual awareness
- Engraving (free-form and pattern-based)

**Labor rates:**
- Base work: $35–$40 per hour
- High precision: $60–$70 per hour
- Research and new skill acquisition: $20–$30 per hour
- Application of newly acquired skill: $45 per hour

**Complexity is discovered mid-work**, not always upfront. The pricing system needs to accommodate mid-project adjustment without making Jordan feel like he failed to assess correctly.
