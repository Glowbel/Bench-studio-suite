# Jeweler App — UI Kit

A high-fidelity recreation of the studio app's core screens. **There is no codebase to recreate from** — this kit is an *original design* built from the brief's description of what the app does, working entirely within the Filigree visual foundation.

The user (the jeweler) should review this and tell me where the actual app should diverge from these mockups.

## What's here

| File | What it is |
|---|---|
| `index.html` | The interactive demo. Click around the four screens, open a piece, draft a letter, sketch a price. |
| `App.jsx` | App shell + screen routing |
| `Shell.jsx` | Sidebar nav + top bar with ornament chrome |
| `Atoms.jsx` | Button / Chip / Card / Input / Orb / Divider — small reusable parts |
| `LedgerScreen.jsx` | Home — list of pieces in process |
| `PieceScreen.jsx` | Single-piece detail — stones, materials, price, client notes |
| `LettersScreen.jsx` | Correspondence — draft replies that hold context |
| `MaterialsScreen.jsx` | Wire & stone inventory |
| `data.js` | Placeholder client and piece data |

## Screens

1. **Ledger** — pieces in process, finished, and laid aside. The room of the studio. Filter chips at the top, piece cards below.
2. **Piece** — a single piece's full record. Stones, wire, time held, price worked out, the client's original dream-words quoted in italics. The "bezel setting" card pattern at its most literal.
3. **Letters** — correspondence drafting. Past letters from a client on the left, the reply being shaped on the right. Soft enough to write into; structured enough to hold the thread.
4. **Materials** — inventory of wires (by gauge & metal) and stones (by type & size). Quiet table, gentle.

## Notes

- This is a **single-user studio app**, not a marketplace or storefront. Everything reads as the jeweler's private workspace.
- Voice and microcopy follow the Content Fundamentals in the root `README.md` — first-person and bare-imperative, no "you", no emoji.
- The triskelion ornament appears once in the sidebar as a quiet anchor. It is not used as a decoration anywhere else.
- All interactive paths are mocked — typing in a field updates local state; "Begin a piece" adds a placeholder card; nothing persists.
