# FILIGREE × BENCH — DESIGN SYSTEM REFERENCE
*Authoritative design language for the Bench Studio Suite.*
*Read this when Jordan names a color, component, pattern, or context.*
*Last updated: May 2026*

---

## HOW TO USE THIS DOCUMENT

Jordan directs traffic by name. When he says:
- "use the ceremony divider" → see `[divider] gold`
- "bezel-gold card" → see `[card] + bezel-gold values`
- "chip-violet" → see `[chip] violet`
- "silver metal state" → see `[bench-metals] silver`
- "teal context" → see `CONTEXT → COLOR MAP`

Source CSS lives at `designs/tokens.css` (copy into any HTML `<style>` block).
Component patterns live at `designs/bench/ui_kits/jeweler-app/app.css`.
Live previews at `designs/bench/preview/[component].html`.

---

## COLOR PALETTE

```
[obsidian] — the dark ground. Never pure black.
  ink-950: #1c1d22   page bg
  ink-900: #232531   card / panel surface
  ink-800: #2c2f42   raised card / hover state
  ink-700: #353953   divider / subtle fill / progress track
  ink-600: #404663   border-strong / input fill
  ink-500: #4c537a   twilight / muted border / inactive icons

[verdigris] — the alive primary. Jordan calls it "teal".
  teal-300: #4acc85  glow accent | focus rings | alive state | icon active
  teal-500: #168258  primary action
  teal-700: #094428  deep verdant | pressed | gradient start
  teal-900: #051a10  near-black verdant | bezel fill | toggle track
  context:  workshop | bench active | tasks | nodes | skill progress

[amethyst] — deep secondary. Jordan calls it "violet".
  violet-300: #b083d8  highlight | ceremony glow | icon
  violet-500: #7c44b8  secondary action
  violet-700: #4d2580  deep violet | pressed | gradient start
  violet-900: #260f44  near-black violet | bezel fill | toggle track
  context:    constellation | discovery | door | reflection | letters

[aurum] — ceremony accent. Use sparingly. Jordan calls it "gold".
  gold-300: #f0d28a  highlight | text on dark gold surfaces
  gold-400: #d9b465  the only gold most surfaces see
  gold-600: #9a7c3d  deep gold | gradient start | muted accent
  context:  completion | milestone | delivered | payment | mastery

[mist] — text and parchment. Never pure white.
  mist-100: #f3f6f5  strong emphasis | headings (fg-strong)
  mist-200: #d8dfdc  primary text on dark (default fg)
  mist-300: #b3bdba  body text | secondary (fg-muted)
  mist-400: #8a9692  helper | secondary labels (fg-subtle)
  mist-500: #5e6a66  muted | disabled | faint (fg-faint)

[bench-metals] — the three-state progress system. Locked.
  copper: #b87333   not started | locked | dim | ghost
  silver: #c0c8cc   active | in progress | walking the path
  gold:   #c9a96e   complete | mastered | finished (distinct from aurum gold)
  rule:   drives arc + connector lines ONLY — never type-color elements
          metal-color and type-color are two independent signals, never competing
```

---

## SEMANTIC ROLES

```
[semantic]
  bg:          ink-950   page background
  bg-raised:   ink-900   card / panel
  bg-hover:    ink-800   hover state
  bg-sunken:   #14151a   sunken input / inset

  fg:          mist-200  default body text
  fg-strong:   mist-100  headings / emphasis
  fg-muted:    mist-300  secondary text
  fg-subtle:   mist-400  labels / helpers
  fg-faint:    mist-500  disabled / placeholder

  border:       rgba(61, 72, 88, 0.40)
  border-strong: rgba(61, 72, 88, 0.70)
  border-faint:  rgba(61, 72, 88, 0.20)

  accent:      teal-500  primary interactive
  ceremony:    gold-400  rare warm accent
  accent-2:    violet-500 secondary interactive
```

---

## TYPOGRAPHY

```
[fonts]
  display: "Cormorant Garamond", Georgia, serif
  mono:    "JetBrains Mono", "Courier New", monospace
  (Bench classic: DM Mono fills the mono role — same usage rules)

[scale]
  xs: 12px  sm: 14px  base: 16px  md: 18px
  lg: 22px  xl: 28px  2xl: 36px   3xl: 48px  4xl: 64px

[registers — use these names when directing]
  display:  cormorant | wt 500 | heading sizes | letter-spacing -0.01em
  body:     cormorant | italic | fg-muted | reading text | line-height 1.55
  caps:     cormorant | small-caps | letter-spacing 0.16–0.20em | labels / eyebrows
  mono:     jetbrains | font-feature "tnum" | stats / measurements / percentages
  price:    cormorant | wt 500 | old-style figures | letter-spacing -0.01em
  spec:     cormorant | italic | craft measurements (wire gauge, stone size, weight)
  quiet:    cormorant | italic | 13px | fg-subtle | ambient notes / sidebar journal

[line-height]
  tight: 1.1   snug: 1.3   base: 1.55   loose: 1.7

[letter-spacing]
  tight: -0.02em  snug: -0.01em  base: 0  wide: 0.04em  wider: 0.12em
```

---

## SPACING

```
space-1: 4px    space-2: 8px    space-3: 12px   space-4: 16px   space-5: 24px
space-6: 32px   space-7: 48px   space-8: 64px   space-9: 96px   space-10: 128px
```

---

## RADIUS

```
sm: 4px   md: 8px   lg: 12px   xl: 20px   full: 9999px
```

---

## MOTION

```
ease-settle: cubic-bezier(0.25, 0.8, 0.25, 1)  default | settling | closing
ease-rise:   cubic-bezier(0.16, 1, 0.3, 1)      entrances | opening | appearing

dur-quick:  160ms   micro-interactions
dur-base:   280ms   standard transitions
dur-slow:   480ms   page-level changes
dur-breath: 2400ms  ambient breathing animations

keyframe: breathe | 0%,100% opacity 0.65 | 50% opacity 1.0
keyframe: shimmer | translateX -100% → 400% (progress fill sweep)
keyframe: comet-pulse | scale 0.9 → 1.25 at leading edge of fill
```

---

## BEZEL SYSTEM — surfaces feel "set like a stone"

```
The signature visual vocabulary. Applied to cards, panels, active surfaces.
Bezel = inset glow that makes a surface feel physically held, not floating.

[named levels]
  bezel-1: inset 0 0 36px rgba(95,213,193,0.05)                                        whisper
  bezel-2: inset 0 0 28px rgba(95,213,193,0.10)                                        soft
  bezel-3: inset 0 0 22px rgba(95,213,193,0.18)                                        present
  bezel-4: inset 0 0 16px rgba(95,213,193,0.30)                                        strong
  bezel-5: inset 0 0 8px rgba(95,213,193,0.45), inset 0 0 0 1px rgba(95,213,193,0.45) sharp · rim of light

[color shortcuts — use these in component CSS]
  bezel-teal:          inset 0 0 24px rgba(95,213,193,0.08)
  bezel-teal-strong:   inset 0 0 32px rgba(95,213,193,0.16)
  bezel-gold:          inset 0 0 28px rgba(217,180,101,0.14)
  bezel-gold-strong:   inset 0 0 18px rgba(217,180,101,0.30), inset 0 0 0 1px rgba(217,180,101,0.22)
  bezel-violet:        inset 0 0 24px rgba(176,131,216,0.08)
  bezel-violet-strong: inset 0 0 32px rgba(176,131,216,0.18)

[rule] color follows context map (see below) — teal=work | gold=ceremony | violet=discovery
```

---

## ELEVATION — outer shadows

```
e1: 0 1px 2px rgba(0,0,0,0.45)                                                card at rest
e2: 0 8px 24px rgba(0,0,0,0.50), 0 0 32px rgba(95,213,193,0.06)              card hover / lifted
e3: 0 24px 64px rgba(0,0,0,0.60), 0 0 80px rgba(124,68,184,0.10)             modal / overlay
```

---

## ORB GLOWS — the "alive" ambient element

```
orb-teal:   radial-gradient(circle, rgba(74,204,133,0.55) 0%, rgba(74,204,133,0.15) 40%, transparent 70%)
orb-violet: radial-gradient(circle, rgba(176,131,216,0.50) 0%, rgba(176,131,216,0.12) 40%, transparent 70%)
orb-gold:   radial-gradient(circle, rgba(240,210,138,0.55) 0%, rgba(240,210,138,0.12) 40%, transparent 70%)

vignette (page background):
  radial-gradient(ellipse 80% 60% at 75% 20%, rgba(95,213,193,0.05), transparent 60%),
  radial-gradient(ellipse 70% 50% at 15% 85%, rgba(124,68,184,0.06), transparent 60%)
  rule: single layer on body | never stack multiples
```

---

## COMPONENT PATTERNS

```
[card]
  base:     bg ink-900 | border rgba(61,72,88,0.40) | radius 12px | padding 22px 24px
  at-rest:  box-shadow bezel-[color] + e1
  on-hover: box-shadow bezel-[color]-strong + e2 | border rgba([color-rgb],0.25) | translateY(-1px)
  teal:     workshop | node | active skill
  gold:     piece | commission | finished work
  violet:   letters | clients | correspondence

[chip]
  shape:    inline-flex | gap 6-7px | radius full | padding 4px 11px
  font:     display | small-caps | 11–12px | letter-spacing 0.12em
  dot:      5-6px circle | glow currentColor
  teal:     color teal-300 | border rgba(95,213,193,0.35) | bg rgba(15,90,82,0.30)
  gold:     color gold-300 | border rgba(217,180,101,0.40) | bg rgba(40,28,12,0.60)
  violet:   color violet-300 | border rgba(176,131,216,0.35) | bg rgba(38,15,68,0.50)
  muted:    color fg-muted | plain border

[button]
  primary:   bg teal-700 | border rgba(95,213,193,0.30) | box-shadow bezel-teal
             hover: bg teal-500 | bezel-teal-strong + outer glow
  secondary: bg ink-800 | border | box-shadow bezel-violet subtle
             hover: bg ink-700 | bezel-violet stronger
  ceremony:  bg linear(#2a1d10,#1a1208) | color gold-300 | border rgba(gold,0.40) | bezel-gold
             hover: bezel-gold-strong + outer gold glow
  ghost:     transparent | color mist-300
             hover: color mist-100 | bg rgba(255,255,255,0.04)

[toggle]
  off:       bg ink-700 | dot mist-400 | calm
  on-teal:   bg teal-900→teal-700 | border teal@50% | dot radial(white→teal-300→teal-500)
             dot-shadow: 0 0 14px teal@95%, 0 0 28px teal@50%
             trailing motes: 2 dots left 18/12px | trail-fade 2.4s | mix-blend screen
             animation: toggle-breath-teal 4s + toggle-dot-teal 2.4s
  on-gold:   bg dark-gold gradient | border gold@55% | dot radial(white→gold-300→gold-600)
             animation: toggle-breath-gold 4s + toggle-dot-gold 2.4s
  on-violet: bg violet-900→violet-700 | border violet@50% | dot radial(white→violet-300→violet-500)
             animation: toggle-breath-violet 4s + toggle-dot-violet 2.4s

[checkbox]
  off:       bg ink-800 | border-strong | svg stroke-dashoffset 24 (path hidden)
  on-teal:   bg teal-700→teal-900 | border teal@55% | bezel-teal
             svg: draws on (dashoffset 24→0, 600ms) | teal drop-shadow
             corner mote: 3px dot top-right | check-mote 3s anim
  on-gold:   bg gold-dark | border gold@55% | bezel-gold | svg gold stroke
  on-violet: bg violet-700→violet-900 | border violet@55% | bezel-violet | svg violet stroke

[progress]
  track:    bg ink-700 | height 8px | radius full | inset shadow
  fill:     gradient [color]-700→[color]-500→[color]-300 | glow box-shadow
  shimmer:  translucent white band | translateX(-100%→400%) 2.8s linear infinite
  comet:    radial-gradient orb at right edge | scale 0.9→1.25 pulse 2s
  teal:     #094428→#168258→#4acc85 | glow rgba(95,213,193,0.50)
  gold:     #3d2a0a→#9a7c3d→#f0d28a | glow rgba(217,180,101,0.50)
  violet:   #260f44→#7c44b8→#b083d8 | glow rgba(176,131,216,0.50)

[divider]
  teal:     1px | linear-gradient center-peak teal@48% | glow shadow teal
            context: between workshop zones | active work sections
  gold:     1px | linear-gradient center-peak gold@48% | warm glow shadow
            context: ceremony moments | milestone | delivered | finished
  violet-ornament: breathing SVG | center gem (concentric rings + lens shapes + diamond pips)
                   color violet-300 | drop-shadow breath 6s | width min(560px,100%)
                   context: discovery | constellation | door | archive | reflection
  whisper:  1px | rgba(61,72,88,0.20) | barely there
            context: between list items | within sections | structural only

[sidenav-item]
  default:  color fg-muted | bg transparent | radius md | padding 10px 14px | font-body 14px
  hover:    color mist-100 | bg rgba(255,255,255,0.025)
  active:   color mist-100 | bg ink-800 | box-shadow bezel-teal | icon glow teal-300@50%
  transition: all 240ms ease-settle

[sidebar]
  width:         260px
  bg:            linear-gradient(180deg, ink-900, #08090d)
  border-right:  1px border + box-shadow 1px rgba(95,213,193,0.04)
  padding:       22px 18px 18px
  sections:      mark (logo) | sidenav | flex:1 | footer
  footer:        cormorant italic 13px | fg-subtle | border-top | ambient journal note
```

---

## HERALDIC MARK — the triskelion

```
[geometry]
  outer border: triple concentric circles r=90/95/100 | 3 diamond markers at 120° apart
  scroll arms:  3 triskele comma-shapes | outer sweep (stroke 2.0) + inner ribbon (1.1, 0.75 opacity)
                movement pips (diamond fills) | root chevron | bud-tip circles
  center unity: r=6 ring (1.3) + r=2.4 solid fill + r=12 outer halo (0.5, 0.45 opacity)
  SVG:          viewBox="0 0 220 220" | translate(110,110) center | currentColor driven

[metal states]
  copper: color #b87333 | opacity 0.65 | drop-shadow rgba(184,115,51,0.40) | no animation
  silver: color #c0c8cc | teal glow | drop-shadow chain | mark-breath 5.5s anim
  gold:   color #c9a96e | warm gold glow | double drop-shadow | mark-breath-gold 5s anim

[sizing rule — size = earned presence]
  copper: 80px   silver: 112px   gold: 144px

[role]
  skill crests | brand mark | section anchors
  same SVG path, state expressed through color + glow only
```

---

## CONTEXT → COLOR MAP

```
This is the traffic system. Color choice is never arbitrary.

teal   →  workshop | bench active | tasks in queue | nodes | skill progress
           toggles ON (work) | active sidenav item | progress fills (craft)

gold   →  completion | pieces finished | payment received | delivery
           milestones | mastery reached | ceremony | the rare and earned

violet →  constellation | discovery | door | reflection | ideas forming
           letters | clients | correspondence | archive | anything not-yet-known

copper →  not started | locked | ghost | placeholder | dim | before
silver →  in progress | active path | walking | current | during
whisper→  structure only | list separators | background grid | never calls attention
```

---

## PAGE VIGNETTE

```
Applied as background layers on body. Never stacked or doubled.

background:
  radial-gradient(ellipse 80% 60% at 75% 20%, rgba(95,213,193,0.05), transparent 60%),
  radial-gradient(ellipse 70% 50% at 15% 85%, rgba(124,68,184,0.06), transparent 60%),
  #1c1d22;
```

---

## DESKTOP LAYOUT SHELL (in progress — not yet in app)

```
[two-panel — current direction]
  left:    260px sidebar | vertical sidenav | persistent
  right:   flex:1 main content | padding 24px 40px | overflow-y auto

[capsule on desktop]
  position:  top of content area | centered or right-of-center
  collapsed: never (always visible on desktop) | collapse logic = mobile only
  shape:     less rounded than mobile | more contained | 3-5 tasks visible
  modes:     focus (1 task) | broad (full list) | default (3-5 tasks)

[three-panel — future consideration]
  left:    sidebar nav
  center:  main content
  right:   capsule as persistent panel
```

---

## SOURCE FILES

```
designs/tokens.css                              CSS custom properties — copy into any <style>
designs/bench/colors_and_type.css              Full Filigree token source
designs/bench/ui_kits/jeweler-app/app.css      Component CSS (.fg-* classes)
designs/bench/preview/[component].html         Live component previews (open in browser)
designs/bench/index.html                       Fusion lab — controls, dividers, surfaces, mark
designs/index.html                             Design lab landing page (Fusion + System tabs)
```
