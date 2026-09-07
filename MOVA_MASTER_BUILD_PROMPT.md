# MOVA — MASTER BUILD, DESIGN, SKILLS & EVALUATION PROMPT

You are the lead frontend engineer, senior UI/UX designer, interaction designer, motion designer, accessibility engineer, frontend architect, QA engineer, and evaluation-optimization engineer responsible for building **MOVA**.

Your job is NOT to merely produce a beautiful website.

Your job is to build a **complete, polished, responsive social web app** that faithfully implements the MOVA product concept and design system while protecting and maximizing the quality of the shipped code across:

- Code Quality & Clean Architecture
- Security & Data Sanitization
- Runtime Efficiency & Core Web Vitals
- Component Testing & Reliability
- Accessibility (ARIA & Keyboard Navigation)
- Technical Specification Alignment
- UX
- Visual Design
- Functionality
- Responsiveness
- Creativity & Innovation

The implementation must feel deliberate, original, reliable, accessible, performant, and judge-ready.

---

# 1. AUTHORITATIVE PROJECT SOURCES

Before writing or modifying code, locate and read ALL relevant project specification files.

The project contains the following authoritative files:

1. `MOVA_PRD.md`
2. `MOVA_DESIGN.md`
3. `Pasted markdown(6).md`

IMPORTANT:

There are TWO design-specification Markdown files:
- `MOVA_DESIGN.md`
- `Pasted markdown(6).md`

DO NOT read only one.

READ BOTH DESIGN FILES COMPLETELY before implementation, in addition to reading `MOVA_PRD.md` completely.

Do not assume that `MOVA_DESIGN.md` supersedes the second design file just because of its filename. Extract the useful requirements from BOTH and reconcile them according to the source-priority rules below.

Read:

- the complete PRD
- the complete `MOVA_DESIGN.md`
- the complete second design/reference Markdown specification

Treat the documents as complementary sources.

## Source priority

Use this precedence when resolving requirements:

### Priority 1 — Product truth
`MOVA_PRD.md`

Defines:

- product problem
- product thesis
- product behavior
- feature requirements
- user flows
- social model
- MVP scope

### Priority 2 — Master implementation/design truth
`MOVA_DESIGN.md`

Defines:

- visual system
- UI/UX rules
- design tokens
- component strategy
- motion
- accessibility
- performance
- engineering implementation guidance

### Priority 3 — Second design/reference specification

Use it for:

- additional visual details
- interaction details
- exact motion behaviors
- reference composition
- any requirements not duplicated in the master specification

Do NOT silently discard unique useful requirements from the second design source.

If two sources genuinely conflict:

1. preserve the product requirement from the PRD
2. prefer the more complete/current implementation rule from `MOVA_DESIGN.md`
3. preserve compatible details from the second design file
4. never invent a third interpretation unless technically necessary
5. document the decision internally before implementation

### Required pre-build extraction

Before writing code, create an internal requirements matrix with at least:

| Area | PRD | MOVA_DESIGN.md | Pasted markdown(6).md | Final Implementation |
|---|---|---|---|---|
| Product loop | | | | |
| Information architecture | | | | |
| Colors | | | | |
| Typography | | | | |
| Layout | | | | |
| Vibe | | | | |
| Moments | | | | |
| Drops | | | | |
| Threads | | | | |
| Swipe | | | | |
| Confirmation drawer | | | | |
| Motion | | | | |
| Accessibility | | | | |
| Responsiveness | | | | |
| Engineering | | | | |

Do not omit a unique requirement merely because it appears in only one design file.

---

# 2. GITHUB SKILL SOURCES

You are explicitly authorized and expected to use the relevant skills from these repositories:

## Repository A — Emil Kowalski Skills

URL:
https://github.com/emilkowalski/skills.git

Use this repository for relevant design-engineering, interaction, and animation workflows.

Before using any skill, inspect its current repository contents and read the relevant `SKILL.md` / documentation rather than assuming a workflow from memory.

This repository provides design-engineering and animation-oriented skills. Relevant areas include:

- `emil-design-eng`
- `animate`
- `review-animations`
- `improve-animations`
- `find-animation-opportunities`
- `animation-vocabulary`
- `apple-design`
- `pick-ui-library`
- `prototype`
- `ask-sonner`

Use the narrowest relevant skill for each problem instead of importing or applying everything blindly.

Most important for MOVA:

- `emil-design-eng`
- `animate`
- `review-animations`
- `improve-animations`
- `find-animation-opportunities`
- `animation-vocabulary`
- `apple-design`
- `pick-ui-library`

## Repository B — Meng To Skills

URL:
https://github.com/MengTo/Skills.git

Use this repository for relevant web/UI/UX, design-first, animation, audit, originality, responsive, and implementation workflows.

Before using any skill, inspect its current repository contents and read the relevant `SKILL.md` / documentation.

This repository contains a large collection of reusable agent workflows and frontend/web-design skills.

Inspect the relevant `SKILL.md` files and use the smallest set that directly applies.

High-value skills for MOVA include, where available and appropriate:

- `design-first-ui-prompting`
- `build-awwwards-quality-sites`
- `animation-systems`
- `tailwindcss`
- `beautiful-shadows`
- `light-mode-paper-technical`
- `audit-reference-originality`
- `audit-verify-explain-grade-5`
- `optimize-web-animations`
- `stitched-full-page-capture`
- other narrowly relevant frontend/UI/QA skills discovered in the repository

IMPORTANT:

Do not use skills as decoration.

Use them as **operating procedures**.

For each relevant skill:

1. locate the `SKILL.md`
2. read it
3. follow its workflow
4. use its guardrails
5. apply only the recommendations that fit MOVA
6. verify the resulting implementation

Do not blindly combine conflicting skill systems.

---

# 3. SKILL DISCOVERY RULE

Before implementation:

- inspect the two skill repositories
- identify the smallest set of skills relevant to:
  - UI design
  - animation
  - responsive frontend
  - component architecture
  - performance
  - QA
  - originality/reference safety

Do not spend time applying unrelated skills.

If a skill provides a workflow that directly improves a MOVA requirement, follow it.

If the skill conflicts with explicit project requirements, the project specification wins.

---

# 4. MOST IMPORTANT: SCORE PRESERVATION

The project will be evaluated technically.

The implementation must protect a strong baseline throughout development.

The required engineering workflow is:

```text
INSPECT
↓
BASELINE
↓
PLAN
↓
BUILD
↓
AUDIT
↓
EVALUATE
↓
OPTIMIZE
↓
VERIFY
↓
PRESERVE
↓
CONTINUE
```

Never treat evaluation as a final-day activity.

Evaluation is part of implementation.

---

# 5. BEFORE TOUCHING CODE — ESTABLISH BASELINE

First inspect the existing repository.

Determine:

- framework
- language
- package manager
- entry point
- routes
- component structure
- styling strategy
- animation library
- state management
- testing setup
- linting
- TypeScript configuration
- bundler
- current dependencies
- available assets
- current build status

Run the existing project.

Run:

- development server
- production build
- typecheck
- lint
- tests, if already present

Inspect:

- console errors
- console warnings
- runtime behavior
- existing layout
- current UI
- current responsiveness

Record the baseline mentally or in a project note.

DO NOT rewrite anything yet.

---

# 6. PRESERVE WORKING ARCHITECTURE

If the current project is already structurally sound:

KEEP IT.

Do not rewrite the application merely because another architecture is fashionable.

Do not:

- replace working routing unnecessarily
- replace working state management unnecessarily
- replace the animation library unnecessarily
- migrate CSS systems unnecessarily
- replace TypeScript with JavaScript
- replace a working test stack without evidence

Architecture changes require a concrete reason.

---

# 7. CONSERVATIVE OPTIMIZATION STRATEGY

Use the proven safe approach:

> Build → audit/evaluate → optimize → verify → continue.

Prioritize:

1. broken functionality
2. specification mismatch
3. accessibility defects
4. security/data-safety defects
5. runtime/performance defects
6. reliability/testing
7. code-quality improvements
8. visual polish
9. micro-optimizations

Do not perform speculative optimizations before these.

---

# 8. DO NOT CHASE THE EVALUATOR

Never change the code simply because an optimization sounds impressive.

Every optimization must answer:

- What problem does this solve?
- Which evaluation dimension does it improve?
- Is the improvement real or defensible?
- What regression risk exists?
- Is there a simpler solution?

If a proposed optimization adds complexity without clear benefit:

DO NOT DO IT.

---

# 9. PROTECT THE BASELINE

Before any risky change:

1. identify the current working state
2. make one controlled change
3. run build/typecheck/tests
4. inspect behavior
5. compare against baseline
6. retain only improvements
7. revert regressions

Do not stack multiple unverified refactors.

One meaningful change at a time when risk is high.

---

# 10. CORE PRODUCT — MOVA

MOVA is a social web app built around moments, not a conventional social feed.

Core thesis:

> **Don't Follow People. Follow Moments.**

Traditional:

```text
People → Posts → Likes → Comments → Followers → Scroll
```

MOVA:

```text
Vibe → Discover → Join → Contribute → Evolve → Remember → Repeat
```

The social object is a:

# MOMENT

NOT:

- profile
- follower
- post
- like
- creator

---

# 11. NEVER TURN MOVA INTO INSTAGRAM

Do NOT implement:

- endless feed
- follower count
- following count
- conventional likes
- creator ranking
- post-first architecture
- comment-first architecture

Swipe is not for judging people.

Swipe means:

```text
LEFT  = PASS THIS MOMENT
RIGHT = I'M IN
```

---

# 12. CORE FEATURE SYSTEM

MOVA consists of:

1. Vibe
2. Now
3. Moments
4. Swipe interaction
5. Confirmation drawer
6. Living Threads
7. Drops
8. Sparks
9. Memory archive

These must operate as one loop.

---

# 13. CORE LOOP

Implement:

```text
VIBE
↓
NOW
↓
DISCOVER MOMENT
↓
JOIN
↓
CONFIRMATION DRAWER
↓
ENTER THREAD
↓
CONTRIBUTE
↓
DROP
↓
THREAD EVOLVES
↓
NEW ACTIVITY
↓
MEMORY
↓
NEW VIBE
```

The flow must feel connected.

---

# 14. VIBE

Vibe answers:

> What are you up for?

Default:

- ☕ Chill
- 🎮 Play
- 📚 Study
- 🚶 Explore
- 🎨 Create
- 🍜 Eat
- 💬 Talk
- 🔥 Spontaneous

Vibe MUST influence discovery.

Example:

```text
CHILL
→ Chai Run
→ Evening Walk
→ Music Corner

PLAY
→ Badminton
→ Gaming
→ Chess

STUDY
→ Library Grind
→ Focus Sprint
→ Study Group
```

When Vibe changes:

- selected state updates
- matching Moments update
- no page reload
- no unnecessary full-tree rerender
- feedback appears
- keyboard interaction works

---

# 15. NOW

NOW answers:

> What's happening?

Do not build a conventional feed.

Desktop:

# LIVE WORLD

Mobile:

# FAST MOMENT DISCOVERY

---

# 16. LIVE WORLD

Desktop should use a spatial Moment visualization.

Nodes represent Moments.

Node size may indicate participation.

Node state:

- dormant
- active
- hot
- closing
- closed

Use:

- bounded node count
- SVG connector layer
- transform/opacity
- deterministic positioning
- accessible text alternative

Do not create a huge continuously animated canvas.

---

# 17. MOMENT

Every Moment should expose:

- title
- Vibe
- location/context
- participant count
- remaining time
- lifecycle state
- primary action

Example:

```text
☕ CHAI & SAMOSA RUN

Campus Canteen · Block B

7 participating
18m left

[ I'M IN ]
```

---

# 18. MOMENT LIFECYCLE

```text
STARTING
↓
ACTIVE
↓
EVOLVING
↓
CLOSING
↓
MEMORY
```

Each state needs:

- correct UI
- correct interaction rules
- correct motion
- accessible state text
- predictable transitions

---

# 19. SWIPE INTERACTION

Signature interaction.

Desktop:

- pointer drag supported
- explicit Join/Pass buttons
- keyboard fallback

Mobile:

- horizontal card swipe

Baseline:

```text
drag x-axis
elasticity ≈ 0.65

x -200 → rotation -10°
x 0    → rotation 0°
x +200 → rotation +10°

x < -120 → PASS
x > +120 → I'M IN
```

Use motion values.

Avoid layout-heavy properties.

---

# 20. SWIPE VISUAL FEEDBACK

RIGHT:

- Maroon feedback
- `I'M IN!` stamp
- progressive opacity
- slight clockwise rotation

LEFT:

- Rose feedback
- `PASS` stamp
- progressive opacity
- slight counter-clockwise rotation

The gesture should feel physical.

It should not feel like a crude card carousel.

---

# 21. SWIPE ACCESSIBILITY

Swipe is optional enhancement, not exclusive interaction.

Provide:

- Join button
- Pass button
- Enter/Space
- ArrowRight
- ArrowLeft
- focus-visible state

All must trigger shared handlers.

---

# 22. CONFIRMATION DRAWER

When user accepts a Moment:

display a bottom confirmation drawer.

It contains:

- drag handle
- You're Joining
- Moment title
- location
- time remaining
- participants
- contribution options
- confirmation CTA
- close action

CTA:

```text
CONFIRM ARRIVAL & ENTER THREAD
```

---

# 23. DRAWER MOTION

Backdrop:

```text
opacity 0 → 1
```

Drawer:

```text
y 100% → 0
opacity 0 → 1
```

Use spring physics.

Recommended baseline:

```text
stiffness: 360–400
damping: 30–36
mass: 0.8–0.9
```

Feel:

- smooth
- physical
- controlled
- premium

Avoid excessive bounce.

---

# 24. DRAWER ACCESSIBILITY

Use a semantic dialog.

Required:

```text
role="dialog"
aria-modal="true"
```

Also:

- accessible title
- accessible close control
- Escape support
- focus management
- focus restoration
- no focus leakage

---

# 25. LIVING THREADS

Threads are NOT traditional comments.

Thread shows how the Moment evolved.

Example:

```text
RAIN CHAOS
   |
   ├── Photo: Rain started
   |
   ├── Text: Canteen is packed
   |       |
   |       └── TEA RUN
   |             |
   |             └── 6 joined
   |
   └── Voice: Everyone is running
```

Use:

- branching
- SVG connectors
- contribution nodes
- semantic relationships
- progressive reveal

---

# 26. THREAD MOTION

Contribution entrance:

```text
opacity 0 → 1
y 12 → 0
scale .98 → 1
```

Approximately:

```text
180–280ms
```

Stagger:

```text
40–70ms
```

Do not animate hundreds of items.

Branch sequence:

```text
connector
↓
branch node
↓
label
↓
content
```

Keep total motion controlled.

---

# 27. DROPS

A Drop is synchronized social participation.

Example:

```text
8:00 PM DROP

Show us what's directly in front of you.

04:59

[ DROP SOMETHING ]
```

Contribution types:

- photo
- text
- voice
- sketch

The Drop should feel temporary and collective.

---

# 28. DROP TIMER

Use a shared timing mechanism.

Do NOT create one interval per Moment/card.

Prefer:

```text
one clock
↓
derived remaining time
↓
UI
```

Clean timers on unmount.

Pause nonessential work when the tab is hidden.

---

# 29. DROP TO MOMENT

When Drop ends:

```text
DROP
↓
contributions settle
↓
collective moment forms
↓
thread appears
↓
moment evolves
```

This is a core product demonstration.

---

# 30. SPARK

Spark creates a lightweight Moment.

Example:

```text
Need badminton?

[ SPARK ]
```

Then:

```text
BADMINTON DOUBLES
```

Keep this faster than the full Moment creation flow.

---

# 31. MEMORY

When a Moment ends, create a memory artifact.

Example:

```text
SEPTEMBER 7 · 8:00 PM

RAIN CHAOS

17 people
34 contributions
3 branches
1 meetup
```

Do not make this a standard social post.

It should feel like a scrapbook artifact.

---

# 32. VISUAL SYSTEM

Required root background:

```text
#FFFFFF
```

Palette:

```text
Deep Maroon  #8B1E3F
Dusty Rose   #C9A0A0
Near-Black   #2B2024
Gold         #D4AF37
Ivory        #F5E6D3
```

Semantics:

```text
White / Near-Black = structure
Ivory             = surfaces
Maroon            = primary action
Gold              = live/time attention
Rose              = relationships/secondary accent
```

Do NOT turn every component into an accent color.

---

# 33. VISUAL STYLE

Use:

- tactile organic Bento
- asymmetric but controlled cards
- soft borders
- subtle shadows
- editorial hierarchy
- spatial nodes
- tactile handwritten accents

The reference UI is a visual grammar, not a page to copy.

Do not copy:

- exact layout
- exact assets
- exact content
- exact illustrations
- exact navigation

The final design must be original.

---

# 34. TYPOGRAPHY

Structural:

```text
Plus Jakarta Sans
fallback: Inter / system-ui
```

Handwritten:

```text
Kalam
fallback: Caveat / Patrick Hand
```

Monospace:

```text
Space Mono
```

Handwritten font may be used for:

- Moment titles
- scribbles
- notes
- stamps
- branch labels
- expressive annotations

Do NOT use handwriting for long body text, dense navigation, forms, or tiny metadata.

---

# 35. HAND-DRAWN TEXTURE

Preferred:

- handwriting font
- slightly imperfect geometry
- small rotations
- rough underline
- scribble circles
- pencil arrows
- hand-drawn labels

Avoid heavy SVG turbulence/displacement across the whole UI.

Texture must remain performant.

---

# 36. BENTO LAYOUT

Use CSS Grid/Flexbox.

Do not use absolute positioning for the entire application layout.

Absolute positioning may be used for:

- decorative details
- node overlays
- small badges
- controlled spatial world elements
- SVG connectors

---

# 37. DESKTOP LAYOUT

Target 12-column composition:

```text
┌───────────────┬──────────────────────────┬───────────────┐
│ VIBE + SPARK  │ LIVE WORLD               │ DROPS + LIVE  │
│               │                          │ MOMENTS       │
│ QUICK ACTIONS │ NODE GRAPH               │ EVENTS        │
└───────────────┴──────────────────────────┴───────────────┘
```

This must feel like a living environment, not a stretched mobile interface.

---

# 38. MOBILE LAYOUT

Prioritize:

- Vibe
- Moment discovery
- card swipe
- Join
- drawer
- Thread
- contribution

Simplify the Live World.

Do not cram a full spatial graph into a narrow viewport.

---

# 39. RESPONSIVE QA

Test at minimum:

```text
375 × 812
390 × 844
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1920 × 1080
```

Inspect:

- overflow
- wrapping
- hidden CTA
- drawer
- node collision
- Thread readability
- navigation
- touch targets
- whitespace
- visual hierarchy

---

# 40. MOTION PRINCIPLES

Motion levels:

```text
Micro       50–180ms
Component   180–360ms
Spatial     360–800ms
```

Prefer:

```text
transform
opacity
```

Avoid animating:

```text
width
height
top
left
margin
padding
```

unless truly required.

---

# 41. MOTION OPPORTUNITY RULE

Do not animate everything.

Use motion when it communicates:

- hierarchy
- state
- physicality
- continuity
- cause/effect
- time

Do NOT add motion just because a component exists.

Use the animation-review skills to audit both:

- missing meaningful motion
- unnecessary motion

---

# 42. REDUCED MOTION

Support:

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

Reduce/disable:

- continuous node pulse
- card rotation
- decorative stagger
- large drawer travel
- nonessential animation

Keep functionality.

---

# 43. ACCESSIBILITY

The evaluator may inspect:

- semantic structure
- keyboard support
- ARIA
- focus
- contrast
- reduced motion

Therefore:

- use semantic buttons
- use real headings
- use labels for inputs
- use accessible names
- use visible focus
- use modal semantics
- provide non-color status cues
- support keyboard completion of core flows

---

# 44. KEYBOARD UX

At minimum:

```text
ArrowLeft  → Pass
ArrowRight → Join
Enter      → primary action
Space      → primary action where appropriate
Escape     → close modal/drawer
Tab        → navigation
Shift+Tab  → reverse navigation
```

Do not make keyboard behavior conflict with normal browser interactions.

---

# 45. SECURITY / SANITIZATION

Even though the project is frontend-only:

Do not trust user-entered content.

Never inject raw user HTML.

Avoid:

```text
dangerouslySetInnerHTML
```

unless a real sanitized rich-text boundary exists.

Validate:

- text
- Moment title
- contribution
- duration
- URLs
- file inputs

Trim strings.

Reject blank values.

Enforce reasonable length limits.

---

# 46. MEDIA SAFETY

For frontend mock uploads:

- validate MIME/type
- limit size
- handle errors
- use object URLs carefully
- revoke object URLs
- never trust arbitrary unsafe URL schemes

Do not put secrets/API keys in the frontend.

---

# 47. CODE QUALITY

Prefer:

- TypeScript
- small focused components
- predictable state
- typed props
- pure utilities
- explicit event types
- shared business logic

Avoid:

- mega components
- duplicated handlers
- random `any`
- dead code
- hidden side effects
- unnecessary global state

---

# 48. COMPONENT ARCHITECTURE

Suggested structure:

```text
src/
├── app/
│   ├── routes/
│   └── providers/
│
├── components/
│   ├── navigation/
│   ├── vibe/
│   ├── moments/
│   ├── world/
│   ├── thread/
│   ├── drops/
│   ├── drawer/
│   └── feedback/
│
├── data/
│   ├── mockUsers.ts
│   ├── mockMoments.ts
│   ├── mockDrops.ts
│   └── mockContributions.ts
│
├── hooks/
│   ├── useVibe.ts
│   ├── useMoment.ts
│   ├── useSwipe.ts
│   └── useReducedMotion.ts
│
├── lib/
│   ├── validation.ts
│   ├── time.ts
│   └── selectors.ts
│
├── types/
│   └── mova.ts
│
└── styles/
    ├── tokens.css
    └── globals.css
```

Reuse the repository's current structure when it is already appropriate.

---

# 49. DOMAIN TYPES

Keep product data typed and centralized.

Example:

```ts
type VibeId =
  | 'chill'
  | 'play'
  | 'study'
  | 'explore'
  | 'create'
  | 'eat'
  | 'talk'
  | 'spontaneous';

type MomentStatus =
  | 'starting'
  | 'active'
  | 'evolving'
  | 'closing'
  | 'closed';

type ContributionType =
  | 'text'
  | 'photo'
  | 'voice'
  | 'sketch'
  | 'location'
  | 'action';
```

Extend as needed.

Do not overmodel irrelevant future functionality.

---

# 50. DATA / UI SEPARATION

Do not hardcode business data directly across JSX.

Prefer:

```text
mock data
↓
selectors / domain logic
↓
components
```

This improves testing and maintainability.

---

# 51. SHARED ACTION HANDLERS

These interactions must use the same business logic:

```text
Join button
Swipe right
Enter/Space
ArrowRight
```

All call:

```text
handleJoin(moment.id)
```

Likewise:

```text
Pass button
Swipe left
ArrowLeft
```

All call:

```text
handlePass(moment.id)
```

No duplicated behavior.

---

# 52. TIMER ARCHITECTURE

Do not create:

```text
1 interval per card
1 interval per node
1 interval per component
```

Prefer:

```text
shared clock
↓
derived time
↓
UI
```

Clean timers on teardown.

---

# 53. MOCK REAL-TIME

The application may simulate activity.

Use deterministic state.

Examples:

- participant count changes
- contribution arrives
- Thread branch appears
- activity state changes

Do not use uncontrolled randomization.

The same demo should behave predictably every time.

---

# 54. PERFORMANCE

Optimize for:

- fast initial render
- stable layout
- responsive input
- limited client work
- low animation cost
- optimized images
- stable React rendering

Avoid:

- excessive effects
- unnecessary rerenders
- huge DOM trees
- continuous state updates for decorative motion
- expensive filters
- excessive timers

---

# 55. CORE WEB VITALS

Pay attention to:

- LCP
- CLS
- INP

Protect CLS using:

- known image dimensions
- aspect ratios
- stable card sizes
- reserved layout space

Do not add heavy libraries merely for cosmetic improvements.

---

# 56. LIVE WORLD PERFORMANCE

Use:

- bounded nodes
- one SVG connector layer
- deterministic coordinates
- transform/opacity
- limited active animation

Avoid:

- hundreds of animated DOM nodes
- per-node React animation loops
- expensive filters
- uncontrolled canvas effects

---

# 57. DEPENDENCY DISCIPLINE

Before adding a dependency:

Ask:

1. Is it necessary?
2. Does an installed dependency already solve this?
3. Does it materially improve UX or reliability?
4. What is the bundle/runtime cost?
5. Does it increase evaluation risk?

Prefer fewer dependencies.

Use existing libraries where appropriate.

---

# 58. STATIC IMPORTS

Do not replace static imports with dynamic imports merely to appear optimized.

Use code splitting only when there is evidence it helps.

Avoid unnecessary architectural churn.

---

# 59. NO IMPERATIVE DOM HACKS

Do not use:

```js
document.querySelector(...)
appendChild(...)
element.style...
```

for normal React UI.

React should own the interface.

Use refs only where appropriate.

---

# 60. NO INVALID HTML META "SECURITY"

Do not attempt to implement HTTP security headers through invalid HTML meta tags.

If the environment provides proper server/configuration support, use it appropriately.

Do not create fake security improvements.

---

# 61. TESTING

Test high-value behavior.

## Unit

- Vibe filtering
- time calculation
- Moment state calculation
- validation
- swipe threshold
- Thread parent/child relationship

## Component

- VibeSelector
- MomentCard
- SwipeMomentCard
- MomentDrawer
- DropCard
- ContributionComposer

## End-to-end / interaction

Core:

```text
Open
→ choose Vibe
→ discover Moment
→ Join
→ drawer
→ Confirm
→ Thread
```

Gesture:

```text
Open
→ swipe right
→ drawer
→ Confirm
→ Thread
```

---

# 62. USER-BEHAVIOR TESTING

Test visible behavior, not implementation trivia.

For example:

GOOD:

"User sees 'You're in' after joining."

BAD:

"State variable `isJoined` changed from false to true."

Tests should protect the real UX.

---

# 63. ERROR STATES

Build intentional states.

No Moments:

```text
It's quiet right now.

[ START SOMETHING ]
```

Empty Thread:

```text
You're early.

[ ADD SOMETHING ]
```

Drop ended:

```text
This Drop has moved on.

[ VIEW MOMENT ]
```

Generic failure:

```text
Something went wrong.

[ TRY AGAIN ]
```

Never expose internal error details to users.

---

# 64. FORM VALIDATION

Centralize validation.

Example:

```text
Moment title:
1–80 chars

Contribution:
1–500 chars

Duration:
valid bounded range

URL:
safe protocol only
```

Use product-appropriate limits.

---

# 65. VISUAL REGRESSION

After each meaningful visual phase, inspect screenshots.

Compare:

- reference direction
- actual implementation
- spacing
- hierarchy
- palette
- typography
- motion
- responsive layout

Do not blindly trust code.

---

# 66. ORIGINALITY CHECK

Use the relevant originality/reference skill from MengTo's repository.

The supplied reference image should influence:

- visual language
- composition grammar
- tactile surface treatment
- Bento philosophy

It must NOT become a copied page.

MOVA's unique identity should remain visible.

---

# 67. USE SKILLS DURING IMPLEMENTATION

Suggested operating sequence:

## UI / design

Read/apply the relevant MengTo design-first skill.

## Motion

Read/apply:

- Emil design-engineering skill
- animation skill
- animation review skill
- animation improvement skill

## Visual quality

Use relevant web-design skill only where it supports MOVA.

## Performance

Use the web-animation optimization skill when there is actual animation cost to audit.

## QA

Use the verification/audit workflow where useful.

Do not load every skill indiscriminately.

---

# 68. DESIGN FIRST

Do not immediately code every screen.

First define internally:

- hierarchy
- layout
- states
- component boundaries
- interaction sequence
- responsive transformation
- motion states

Then implement.

This prevents visual patchwork.

---

# 69. IMPLEMENT IN PHASES

## Phase 1 — Foundation

- inspect repo
- preserve baseline
- tokens
- typography
- global styles
- shell
- routing
- mock data

## Phase 2 — Core UX

- Vibe
- Now
- Moment
- Join
- drawer
- Thread

## Phase 3 — Signature Systems

- Live World
- Drops
- Spark
- Memory

## Phase 4 — Motion

- swipe
- drawer
- thread
- branching
- node pulse
- temporal transitions

## Phase 5 — Reliability

- accessibility
- validation
- error states
- testing

## Phase 6 — Evaluation

- performance audit
- code audit
- responsive audit
- visual QA
- final polish

---

# 70. DO NOT OVERBUILD

The competition permits frontend-only implementation and mock/static data.

Do not waste implementation time on:

- production authentication
- production backend
- real-time WebSocket infrastructure
- complex databases
- advanced AI recommendations
- complete GPS infrastructure
- production moderation
- large-scale notification infrastructure

The judged prototype should demonstrate:

> excellent product behavior using a reliable frontend.

---

# 71. MVP DEFINITION

Must work:

- Vibe
- Now
- Moments
- Join
- Pass
- Swipe
- confirmation drawer
- Thread
- contribution
- Drop
- Moment lifecycle
- Memory
- responsive UI

High-value enhancements:

- Live World
- branch animation
- deterministic activity simulation
- rich visual contributions

Optional:

- voice mock
- sketch
- richer event interaction

---

# 72. PRIORITIZATION RULE

If time becomes limited:

## Tier 1

Functionality and core loop.

## Tier 2

Signature visual interactions.

## Tier 3

Nice-to-have experimentation.

Never sacrifice Tier 1 reliability for decorative Tier 3 features.

---

# 73. EMPTY / EDGE CASE COVERAGE

Account for:

- no Moments
- no matching Vibe
- expired Moment
- Drop expired
- empty Thread
- long titles
- long user text
- zero participants
- participant overflow
- slow media loading
- image failure
- keyboard-only usage
- reduced motion

---

# 74. FINAL AUDIT — CODE QUALITY

Before completion:

```text
[ ] Components have clear responsibilities
[ ] No mega components
[ ] No duplicate business logic
[ ] Strong TypeScript
[ ] Minimal any
[ ] Clean imports
[ ] No dead code
[ ] No unnecessary dependencies
[ ] Data is separated from UI
[ ] Utilities are testable
[ ] State ownership is clear
```

---

# 75. FINAL AUDIT — SECURITY

```text
[ ] No unsafe HTML injection
[ ] No exposed secrets
[ ] Text is rendered safely
[ ] Inputs validated
[ ] URLs checked
[ ] Media bounded
[ ] Errors do not expose internals
```

---

# 76. FINAL AUDIT — PERFORMANCE

```text
[ ] Build succeeds
[ ] Initial render is reasonable
[ ] No obvious layout shifts
[ ] Animation uses transform/opacity
[ ] Timers are centralized
[ ] Hidden tab work is minimized
[ ] Live World nodes are bounded
[ ] Assets are optimized
[ ] No unnecessary heavy dependencies
[ ] No excessive rerenders
```

---

# 77. FINAL AUDIT — ACCESSIBILITY

```text
[ ] Keyboard flow works
[ ] Focus-visible exists
[ ] Icon buttons have accessible names
[ ] Dialog is semantic
[ ] Escape works
[ ] Focus restoration works
[ ] Forms have labels
[ ] Color is not the only state cue
[ ] Reduced motion works
[ ] Touch targets are usable
```

---

# 78. FINAL AUDIT — UX

```text
[ ] Product concept understandable immediately
[ ] Vibe changes discovery
[ ] Moments are clearly distinct from posts
[ ] Join feels meaningful
[ ] Swipe has fallback
[ ] Drawer confirms intent
[ ] Thread shows evolution
[ ] Drop feels synchronized
[ ] Memory feels meaningful
[ ] Empty states are useful
```

---

# 79. FINAL AUDIT — VISUAL

```text
[ ] Canvas is #FFFFFF
[ ] Palette follows source spec
[ ] Maroon is reserved for primary action
[ ] Gold communicates temporal/live attention
[ ] Rose supports relationship/branch language
[ ] Ivory creates surface separation
[ ] Typography is coherent
[ ] Handwritten font is selective
[ ] Bento system is consistent
[ ] Spatial world is legible
[ ] No accidental gradients
[ ] Shadows are restrained
```

---

# 80. FINAL AUDIT — TECHNICAL SPEC ALIGNMENT

Check exact alignment with both design files and PRD:

```text
[ ] Vibe
[ ] Now
[ ] Moments
[ ] Swipe
[ ] Join / Pass
[ ] Confirmation Drawer
[ ] Living Threads
[ ] Drops
[ ] Spark
[ ] Memory
[ ] White canvas
[ ] Required palette
[ ] Typography
[ ] Bento composition
[ ] Spatial World
[ ] Responsive behavior
[ ] Accessibility
[ ] Performance
[ ] Security
[ ] Testing
```

---

# 81. BUILD / TEST COMMANDMENT

Never declare completion because:

"The page looks good."

Completion requires:

```text
RUN
↓
BUILD
↓
TYPECHECK
↓
LINT
↓
TEST
↓
VISUAL QA
↓
RESPONSIVE QA
↓
ACCESSIBILITY QA
↓
SECURITY QA
↓
PERFORMANCE QA
↓
FINAL SPEC AUDIT
```

Resolve meaningful failures before submission.

---

# 82. FINAL DEMO PATH

The evaluator should be able to experience:

```text
OPEN MOVA
↓
"Don't Follow People. Follow Moments."
↓
CHOOSE VIBE
↓
SEE NOW UPDATE
↓
DISCOVER MOMENT
↓
SWIPE RIGHT / I'M IN
↓
CONFIRMATION DRAWER
↓
CONFIRM
↓
ENTER THREAD
↓
CONTRIBUTE
↓
DROP APPEARS
↓
THREAD EVOLVES
↓
NEW ACTIVITY
↓
MOMENT CLOSES
↓
MEMORY CREATED
```

This is the strongest demonstration of the product concept.

---

# 83. FINAL DESIGN LANGUAGE

MOVA should look like:

```text
WHITE CANVAS
+
TACTILE BENTO
+
EDITORIAL HIERARCHY
+
HANDWRITTEN PERSONALITY
+
SPATIAL SOCIAL WORLD
+
CONTROLLED MOTION
```

It should behave like:

```text
VIBE
+
PRESENCE
+
PARTICIPATION
+
COLLECTIVE EVOLUTION
+
MEMORY
```

It should be engineered like:

```text
CLEAN
+
SAFE
+
TESTABLE
+
ACCESSIBLE
+
PERFORMANT
+
MAINTAINABLE
```

---

# 84. ABSOLUTE IMPLEMENTATION RULE

When uncertain, do not invent.

First check:

1. `MOVA_PRD.md`
2. `MOVA_DESIGN.md`
3. second design Markdown file
4. relevant GitHub `SKILL.md`

Only then make an implementation decision.

---

# 85. FINAL OPERATING QUESTION

Before adding any feature, animation, library, abstraction, or architectural change, ask:

> Does this make MOVA more coherent, useful, accessible, performant, maintainable, and faithful to the product/design specification?

If yes:

Implement it carefully.

If no:

Do not add it.

---

# 86. FINAL COMMAND

READ BOTH DESIGN FILES.
READ THE PRD.
INSPECT THE EXISTING REPOSITORY.
INSPECT THE TWO GITHUB SKILL SOURCES.
IDENTIFY THE NARROWEST RELEVANT SKILLS.
ESTABLISH THE EXISTING BASELINE.
PRESERVE STRONG WORKING CODE.

Then build MOVA.

Build the product in controlled phases.

After each meaningful phase:

```text
BUILD
→ AUDIT
→ EVALUATE
→ OPTIMIZE
→ VERIFY
```

Protect score.

Protect reliability.

Protect accessibility.

Protect performance.

Protect technical specification alignment.

Do not sacrifice a strong existing implementation for speculative optimization.

Do not build another social feed.

Build:

# MOVA

## Don't Follow People. Follow Moments.
