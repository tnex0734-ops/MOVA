# MOVA — MASTER DESIGN SPECIFICATION (`DESIGN.md`)

**Product:** MOVA (Responsive Social Web App)  
**Document Type:** Universal Design System & Antigravity Agent Blueprint (`DESIGN.md`)  
**Product Thesis:** *"Don't Follow People. Follow Moments."*  
**Visual Style:** Tactile Organic Bento Grid & Spatial Node-Link Architecture  
**Palette:** Pure White Background (`#FFFFFF`) with a 5-color chromatic palette  
**Primary Interaction:** Physics-based swipe (Accept / Decline) + slide-up bottom confirmation drawer  
**Implementation:** Frontend-only, mock/static data allowed  
**Primary Goal:** Deliver a distinctive social web experience while preserving strong accessibility, runtime efficiency, component reliability, maintainability, and evaluator-safe engineering.

> **Source alignment:** This file preserves the design language, palette, typography, interaction model, spatial Bento/node architecture, and implementation direction from the supplied MOVA master design specification. fileciteturn2file0L4-L10

---

# 0. DESIGN + ENGINEERING NORTH STAR

MOVA is not an Instagram/Twitter/Reddit clone with a different skin.

It is a social web experience where:

- **Vibe** = what you are up for now.
- **Now World** = what is happening around you.
- **Moment** = a temporary shared social experience.
- **Drop** = a synchronized community prompt.
- **Living Thread** = a moment that evolves through contributions and branches.
- **Memory** = the resulting scrapbook-like artifact.

The product loop is:

```text
YOUR VIBE
   ↓
NOW WORLD
   ↓
DISCOVER A MOMENT
   ↓
PASS  ←────────────→  I'M IN
                         ↓
                CONFIRMATION DRAWER
                         ↓
                 ENTER THE THREAD
                         ↓
                 CONTRIBUTE / BRANCH
                         ↓
                   SYNCHRONIZED DROP
                         ↓
                  MOMENT EVOLVES
                         ↓
                   MEMORY ARCHIVE
                         ↓
                    NEW VIBE
```

### Core behavioral principle

> **People don't build audiences. They build moments.**

### Core implementation principle

> **Visual ambition must never be purchased with fragile architecture.**

Every visual effect must be implemented with maintainable React state, composable components, semantic HTML, GPU-friendly CSS transforms, and progressive enhancement.

---

# 1. PRODUCT ESSENCE & CORE INTERACTION LOOP

MOVA redesigns social networking away from permanent follower feeds toward real-time shared experiences.

The supplied design specification defines the core flow as **Vibe → Now World → Swipe decision → Confirmation Drawer → Living Branched Thread → synchronized five-minute Drop → Moment Memory Archive**. fileciteturn2file0L14-L76

## 1.1 Canonical Interaction Map

```text
┌──────────────────────────┐
│        YOUR VIBE         │
│  "What are you up for?"  │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│        NOW WORLD         │
│ Spatial Bento + Nodes    │
└────────────┬─────────────┘
             ↓
       ┌─────┴─────┐
       ↓           ↓
  SWIPE LEFT   SWIPE RIGHT
     PASS         I'M IN
       │           │
       │           ↓
       │    ┌────────────────────┐
       │    │ CONFIRMATION       │
       │    │ DRAWER             │
       │    └─────────┬──────────┘
       │              ↓
       │    ┌────────────────────┐
       │    │ LIVING BRANCHED    │
       │    │ THREAD             │
       │    └─────────┬──────────┘
       │              ↓
       │    ┌────────────────────┐
       │    │ SYNCHRONIZED       │
       │    │ 5-MIN DROP         │
       │    └─────────┬──────────┘
       │              ↓
       │    ┌────────────────────┐
       │    │ MOMENT MEMORY      │
       │    │ ARCHIVE             │
       │    └────────────────────┘
       │
       └──────────────→ NEXT MOMENT
```

---

# 2. PRODUCT PRINCIPLES

## 2.1 Participation Over Consumption

A user should have a meaningful action available without needing to scroll through an endless feed.

## 2.2 Moments Over Profiles

Identity is secondary to context. The primary unit of social interaction is the Moment.

## 2.3 Temporary Over Permanent

Moments start, become active, evolve, and eventually close.

## 2.4 Context Over Popularity

Prioritize current Vibe, relevance, and participation state over vanity metrics.

## 2.5 Lightweight Contribution

Users can add photo, voice, sketch, text, or a quick action without opening a complex composer.

## 2.6 Collective Over Creator-Centric

MOVA is about a group becoming part of an experience instead of a creator collecting an audience.

## 2.7 Explainable Interaction

The interface should make it obvious why a Moment is shown and what will happen after the user joins.

## 2.8 Accessible by Default

Gesture-based interactions must always have visible button equivalents and keyboard support.

---

# 3. INFORMATION ARCHITECTURE

```text
MOVA
│
├── NOW
│   ├── Live World
│   ├── Active Moments
│   └── Context / Location
│
├── VIBE
│   ├── Current Vibe
│   ├── Vibe Selector
│   └── Optional Vibe Detail
│
├── DROPS
│   ├── Active Drop
│   ├── Upcoming Drops
│   └── Completed Drops
│
└── MOMENTS
    ├── Active Moments
    ├── Closed Moments
    └── Memory Archive
```

### Navigation rule

Do not add a conventional:

- Followers page
- Following page
- Reels page
- Creator dashboard
- Likes page
- Explore feed

unless a later product decision proves that the feature advances the MOVA interaction model.

### Thread rule

**Thread is not a top-level destination.**

A Thread is a state inside a Moment.

---

# 4. DESIGN TOKENS

The supplied design specification uses a pure white canvas, warm Ivory surfaces, Near-Black typography, Deep Maroon and Gold focal accents, and Dusty Rose for graph/branch treatment. fileciteturn2file0L82-L98

## 4.1 Color Tokens

| Token | Value | Usage |
|---|---|---|
| `bg-canvas` | `#FFFFFF` | Global page background |
| `surface-ivory` | `#F5E6D3` | Bento panels, Moment cards, pill surfaces |
| `surface-card` | `#FFFFFF` | Inner cards, popovers, drawers |
| `text-primary` | `#2B2024` | Headings, core text, card titles |
| `text-muted` | `#66555B` | Secondary metadata, timestamps, location |
| `accent-maroon` | `#8B1E3F` | Primary CTA, selected state, accept action |
| `accent-maroon-hover` | `#731833` | Hover / pressed state |
| `accent-gold` | `#D4AF37` | Countdown, active Drop, participant pulse |
| `accent-gold-light` | `#F5E8BA` | Soft Gold surface |
| `accent-rose` | `#C9A0A0` | Branch connectors, secondary accents |
| `border-soft` | `rgba(43,32,36,0.08)` | Bento outlines and dividers |

### Accessibility note

The original specification records contrast ratios for core text and accent usage. fileciteturn2file0L88-L98

For implementation, do not assume a color is accessible merely because its hex value is listed here. Verify actual foreground/background combinations in the shipped UI, especially on:

- Ivory surfaces
- Gold surfaces
- Rose connectors
- Disabled-looking controls
- Small metadata text

Never communicate meaning through color alone.

---

## 4.2 CSS Variables

```css
:root {
  --canvas-bg: #ffffff;
  --surface-ivory: #f5e6d3;
  --surface-card: #ffffff;

  --color-maroon: #8b1e3f;
  --color-maroon-hover: #731833;
  --color-gold: #d4af37;
  --color-gold-light: #f5e8ba;
  --color-rose: #c9a0a0;

  --text-nearblack: #2b2024;
  --text-muted: #66555b;

  --border-bento: rgba(43, 32, 36, 0.09);

  --shadow-bento:
    0 4px 20px -2px rgba(43, 32, 36, 0.05),
    0 2px 6px -1px rgba(43, 32, 36, 0.02);

  --shadow-drawer:
    0 -20px 48px -8px rgba(43, 32, 36, 0.16);

  --radius-bento: 28px;
  --radius-card: 20px;
  --radius-pill: 9999px;

  --content-max-width: 1440px;
  --page-gutter: clamp(16px, 2vw, 32px);
}
```

---

# 5. TYPOGRAPHY SYSTEM

The supplied specification defines a dual typography architecture: expressive handwritten typography for organic social moments and modern sans-serif typography for structural UI, with monospace numerals for synchronized time and counts. fileciteturn2file0L169-L207

## 5.1 Expressive Layer

**Family:** Kalam / Caveat / Patrick Hand  
**Token:** `font-crayon`

Use for:

- Moment titles
- User scribbles
- Annotations
- Organic labels
- `I'M IN!`
- `PASS`
- Memory notes

Do not use the crayon font for dense body copy.

## 5.2 Structural UI Layer

**Family:** Plus Jakarta Sans / Inter  
**Token:** `font-sans`

Weights:

- 400 Regular
- 500 Medium
- 600 Semi-Bold
- 700 Bold

Use for:

- Navigation
- Buttons
- Body text
- Inputs
- Metadata
- System states

Avoid thin weights.

## 5.3 Tabular Time Layer

**Family:** Space Mono  
**Token:** `font-mono`

Use for:

- Drop countdowns
- Time remaining
- Participant numbers where tabular stability helps
- Compact event timestamps

---

# 6. FONT LOADING

The supplied design file specifies Google Font loading for Kalam, Plus Jakarta Sans, and Space Mono, plus an SVG roughness filter for optional tactile treatment. fileciteturn2file0L212-L227

## Implementation preference

For the evaluated production build:

1. Prefer self-hosted/project-bundled fonts when available.
2. If remote Google Fonts are used, load only the required families and weights.
3. Avoid adding multiple redundant font families.
4. Ensure the system fallback remains usable if the web font fails.
5. Do not make critical layout dimensions depend on late font loading.

Recommended fallback stack:

```css
font-family:
  "Plus Jakarta Sans",
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

---

# 7. RESPONSIVE WEB APP ARCHITECTURE

MOVA is a **responsive social web app**, not a phone mockup placed inside a desktop browser.

## 7.1 Desktop

Use the larger viewport for:

- Spatial Live World
- Bento layout
- Persistent Vibe controls
- Right-side Drops / active events
- Moment detail panel
- Spatial graph

## 7.2 Tablet

Use:

- Two-column layout
- Collapsible Vibe rail
- Scrollable Moments
- Compact Drop panel

## 7.3 Mobile

Use:

- Single-column content
- Compact Live Moments
- Sticky current Vibe
- Thumb-friendly actions
- Bottom navigation only where it improves usability
- Swipe card interaction with visible alternatives

## Responsive rule

Do not simply shrink desktop components.

Change composition intentionally:

```text
DESKTOP
Live World + Vibe Rail + Moment Detail

        ↓ responsive transformation

TABLET
Vibe + Live World
Moment Detail becomes overlay / drawer

        ↓ responsive transformation

MOBILE
Vibe + Live Moment Stack
Moment Detail becomes full-screen sheet
```

---

# 8. SPATIAL BENTO GRID & NODE-GRAPH

The supplied specification defines a desktop composition with a left Vibe/Spark area, central Live World, and right Drops/events rail, with an interactive node graph in the middle. fileciteturn2file0L231-L253

## 8.1 Canonical Desktop Layout

```text
┌────────────────────────────────────────────────────────────────────────┐
│ MOVA      [ Search moments, spots, vibes... ]       Arun · ☕ Chill     │
├────────────────────┬───────────────────────────────┬───────────────────┤
│ LEFT: VIBE + SPARK  │ CENTER: LIVE WORLD           │ RIGHT: DROPS       │
│                     │                               │                   │
│ User avatar/status  │ Overview metrics              │ Active Drop        │
│ 8 Vibe selectors    │                               │ Countdown          │
│ Spark quick box     │ Spatial nodes                  │ Contribution CTA  │
│                     │                               │                   │
│                     │ Chai Run ●                    │ Live Moments       │
│                     │       \                       │                   │
│                     │        ● Samosa Branch        │ Upcoming Events   │
└────────────────────┴───────────────────────────────┴───────────────────┘
```

## 8.2 Overview Metric Ribbon

Example:

```text
24 TOTAL     142 IN     2 DROPS
```

These are product signals, not competitive vanity metrics.

Avoid follower counts or like totals.

## 8.3 Node Semantics

### Root Moment Node

Represents an active Moment.

### Branch Node

Represents an activity or conversation that emerged from a Moment.

### User Anchor

Represents the user's current context in the Live World.

### Active Pulse

Signals new activity.

## 8.4 Connector Specifications

The supplied spec calls for:

- Dusty Rose connector stroke
- `stroke-width: 2px`
- `stroke-dasharray: 4 6`
- SVG paths / smooth Bezier curves
- Concentric active Moment nodes
- Soft pulse animation around active nodes. fileciteturn2file0L258-L268

Implementation guidance:

- Use an SVG layer behind node buttons.
- Keep interactive nodes as real DOM buttons.
- Never make SVG text/path geometry the only accessible interaction target.
- Use `pointer-events: none` on decorative connector layers.
- Use stable IDs for node references.
- Render only visible or active graph elements when the graph becomes large.

---

# 9. VIBE SYSTEM

## 9.1 Vibe Selector

Canonical options:

| ID | Emoji | Label |
|---|---|---|
| `v1` | ☕ | Chill |
| `v2` | 🎮 | Play |
| `v3` | 📚 | Study |
| `v4` | 🚶 | Explore |
| `v5` | 🎨 | Create |
| `v6` | 🍜 | Eat |
| `v7` | 💬 | Talk |
| `v8` | 🔥 | Spontaneous |

The source file uses the same eight Vibe labels and emojis in its mock data schema. fileciteturn2file0L583-L596

## 9.2 Vibe Behavior

Selecting a Vibe:

1. Updates current Vibe.
2. Updates the selected state.
3. Reorders/filter-scores relevant Moments.
4. Updates copy where helpful.
5. Does not navigate away from Now unless the user explicitly chooses to.

## 9.3 Custom Vibe Detail

Optional examples:

> Looking for chai.

> Studying until 9 PM.

> Anyone up for badminton?

Keep custom Vibe text lightweight.

---

# 10. NOW WORLD

## 10.1 Purpose

NOW is the primary surface for discovering what's happening.

The interface must not resemble a conventional feed.

### User question

> **What's happening?**

### System answer

A spatial or card-based collection of active Moments.

## 10.2 Moment Information Hierarchy

1. Moment title
2. Vibe
3. Location/context
4. Participant count
5. Time remaining
6. Activity state
7. Join action

Example:

```text
☕ CHAI & SAMOSA RUN

Campus Canteen · Block B
7 people in
18 min left

[I'M IN]
```

---

# 11. MOMENT SYSTEM

A Moment is the core social object.

## 11.1 Moment Lifecycle

```text
STARTING
   ↓
ACTIVE
   ↓
EVOLVING
   ↓
CLOSED
   ↓
MEMORY
```

### STARTING

Moment has been created but participation is low.

### ACTIVE

People are joining.

### EVOLVING

Contributions create new branches or actions.

### CLOSED

Timer ends or the activity is completed.

### MEMORY

A completed artifact remains in the user's archive.

---

# 12. CREATE MOMENT

User flow:

```text
CREATE MOMENT
      ↓
What are you doing?
      ↓
Where?
      ↓
Who can join?
      ↓
How long?
      ↓
CREATE
```

Example:

```text
What are you doing?
[ Getting chai ]

Where?
[ Campus Canteen ]

Who can join?
[ Anyone nearby ]

Duration
[ 30 min ]

[ CREATE MOMENT ]
```

The new Moment immediately enters the Now World.

---

# 13. CARD SWIPE SYSTEM

The source design specification defines swipe-left for Pass and swipe-right for I'm In, with rotation, stamp reveal, thresholds, and Framer Motion gesture configuration. fileciteturn2file0L273-L313

## 13.1 Interaction Rules

```text
Drag Left
→ PASS
→ Rotation: 0° → -8°
→ Rose treatment
→ PASS stamp

Drag Right
→ I'M IN
→ Rotation: 0° → +8°
→ Maroon treatment
→ I'M IN! stamp

Threshold
→ ±120px
```

## 13.2 Accessibility Requirement

Swipe is an enhancement, never the only path.

Every swipeable card must also expose:

```text
[PASS]
[I'M IN]
```

as real buttons.

Keyboard:

- `ArrowLeft` → Pass
- `ArrowRight` → Join
- `Escape` → close preview/drawer
- `Enter` / `Space` → activate focused action

Do not hijack global arrow keys while the user is typing in an input.

---

# 14. SWIPE MOTION IMPLEMENTATION

Use Framer Motion or equivalent declarative motion.

Reference behavior:

```tsx
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.65}
/>
```

Recommended interpolation:

```tsx
const rotate = useTransform(x, [-200, 200], [-10, 10]);

const acceptStampOpacity = useTransform(x, [40, 120], [0, 1]);
const passStampOpacity = useTransform(x, [-120, -40], [1, 0]);
```

Use explicit output ranges. Do not leave transform mappings incomplete.

### Swipe completion

```tsx
const handleDragEnd = (_event, info) => {
  if (info.offset.x > SWIPE_THRESHOLD) {
    onAccept();
    return;
  }

  if (info.offset.x < -SWIPE_THRESHOLD) {
    onDecline();
  }
};
```

Keep this function small and pure.

Do not mutate the DOM imperatively.

---

# 15. CONFIRMATION DRAWER

The supplied specification defines a dimmed backdrop and a bottom sheet that fades and slides upward using spring motion, with a participant roster, quick contribution actions, and a full-width confirmation CTA. fileciteturn2file0L318-L371

## 15.1 Entry

```text
Initial
opacity: 0
y: 100%

Target
opacity: 1
y: 0%

Transition
spring
stiffness: 380
damping: 32
mass: 0.85
```

## 15.2 Drawer Contents

1. Drag handle
2. “You're Joining” label
3. Moment title
4. Location + remaining time
5. Participant roster
6. Live pulse
7. Quick contribution actions
8. Full-width confirmation CTA

Primary CTA:

> **CONFIRM ARRIVAL & ENTER THREAD**

## 15.3 Drawer Accessibility

The drawer must:

- Use a semantic dialog/sheet pattern.
- Have an accessible title.
- Trap focus while open.
- Restore focus to the triggering control on close.
- Close with `Escape`.
- Keep the backdrop separate from the dialog itself.
- Use inert/aria-hidden behavior for underlying content as appropriate.
- Avoid announcing decorative animation as content.

---

# 16. LIVING BRANCHED THREAD

## 16.1 Concept

Traditional:

```text
POST
├── Comment
├── Comment
└── Comment
```

MOVA:

```text
MOMENT
│
├── PHOTO
│
├── VOICE
│
├── TEXT
│
└── BRANCH
     │
     ├── CONTRIBUTION
     ├── ACTIVITY
     └── NEW MOMENT
```

## 16.2 Example

Root:

### RAIN CHAOS

Contribution:

> Rain just started.

Next:

📷 Photo

Then:

> Everyone is running toward the canteen.

Branch:

### CANTEEN

Then:

> They're giving tea.

Branch:

### TEA RUN

Then:

> Who's joining?

Result:

**6 people join.**

The Thread has transitioned from content to activity.

---

# 17. CONTRIBUTION SYSTEM

Supported contribution types:

- Photo
- Text
- Voice Note
- Crayon Sketch
- Location
- Reaction
- Action

## 17.1 Contribution Composer

Use a compact action bar:

```text
[ Photo ] [ Voice ] [ Sketch ] [ Write ]
```

Avoid a large multi-field composer.

## 17.2 Contribution Principles

- Fast
- Optional
- Contextual
- Accessible
- Non-performative

---

# 18. DROP SYSTEM

## 18.1 Definition

A Drop is a synchronized temporary community prompt.

Example:

# 8:00 PM DROP

> **Show us what is directly in front of you right now.**

```text
04:58

[ DROP PHOTO ]
```

## 18.2 Drop Lifecycle

```text
UPCOMING
   ↓
ACTIVE
   ↓
FINAL COUNTDOWN
   ↓
CLOSED
   ↓
BECOMES / FEEDS A MOMENT
```

## 18.3 Drop Contribution Types

- Photo
- Text
- Voice
- Sketch

## 18.4 Countdown

Use tabular numerals:

```text
04:58
04:57
04:56
```

The countdown should be based on a stable target timestamp rather than decrementing blindly every render.

Prefer:

```ts
remaining = Math.max(0, targetTime - Date.now());
```

with a controlled interval for UI refresh.

Do not create a new interval on every render.

---

# 19. DROP → MOMENT TRANSFORMATION

A Drop is a social ignition mechanism.

```text
DROP
"Show us your evening."
        ↓
Users contribute
        ↓
Photos + voice + text
        ↓
Collective activity emerges
        ↓
MOMENT
        ↓
Thread branches
        ↓
New social action
```

This is one of MOVA's defining interaction models.

---

# 20. SPARK

A Spark is a lightweight trigger for starting a Moment.

Example:

> Anyone craving dosa?

User selects:

# SPARK

Other users respond.

MOVA surfaces:

### DOSA HUNT

```text
4 people
20 min
[ I'M IN ]
```

## Spark Flow

```text
SPARK
 ↓
INTEREST
 ↓
MOMENT
 ↓
PARTICIPANTS
 ↓
ACTIVITY
```

Spark must stay intentionally lightweight.

---

# 21. JOIN / I'M IN

MOVA replaces the conventional Like action with participation-focused actions.

Primary action labels:

- `I'M IN`
- `JOIN`
- `ADD TO MOMENT`

Avoid:

- Like
- Retweet
- Share count as a primary CTA
- Follower count

The interface should reward participation.

Example:

```text
CHAI RUN

5 people are here

[ I'M IN ]
```

After activation:

> Arun joined the Moment.

---

# 22. MOMENT MEMORY ARCHIVE

When a Moment closes, it becomes a lightweight memory artifact.

Example:

# SEPTEMBER 7 · 8:00 PM

## RAIN CHAOS

17 participants  
34 contributions  
3 branches  
1 real-world activity

The archive is not a feed.

It is:

> **Things that happened.**

---

# 23. IDENTITY MODEL

MOVA minimizes traditional profile mechanics.

Instead of:

```text
ARUN
2,340 Followers
482 Following
126 Posts
```

Use:

```text
ARUN

CURRENT VIBE
☕ Looking for chai

RECENT MOMENTS
• Chai Run
• Rain Chaos
• Campus Jam

SHARED EXPERIENCES
8 Moments
23 Contributions
5 Joined Activities
```

The system communicates participation rather than popularity.

---

# 24. MOMENT CARD DATA MODEL

```ts
export interface MomentData {
  id: string;
  title: string;
  vibe: string;
  location: string;
  participants: number;
  timeRemaining: string;
  status?: "starting" | "active" | "evolving" | "closed";
  branchCount?: number;
}
```

Prefer literal union types for finite state values.

---

# 25. MOCK DATA SCHEMA

The supplied source includes the following canonical Vibe and Moment mock data patterns. fileciteturn2file0L583-L629

```ts
export const mockVibes = [
  { id: "v1", emoji: "☕", label: "Chill" },
  { id: "v2", emoji: "🎮", label: "Play" },
  { id: "v3", emoji: "📚", label: "Study" },
  { id: "v4", emoji: "🚶", label: "Explore" },
  { id: "v5", emoji: "🎨", label: "Create" },
  { id: "v6", emoji: "🍜", label: "Eat" },
  { id: "v7", emoji: "💬", label: "Talk" },
  { id: "v8", emoji: "🔥", label: "Spontaneous" },
] as const;

export const mockMoments = [
  {
    id: "m101",
    title: "Chai & Samosa Run",
    vibe: "Chill",
    location: "Campus Canteen, Block B",
    participants: 7,
    timeRemaining: "18 min",
    status: "active",
  },
  {
    id: "m102",
    title: "Library Calculus Sprint",
    vibe: "Study",
    location: "2nd Floor Quiet Zone",
    participants: 12,
    timeRemaining: "42 min",
    status: "active",
  },
  {
    id: "m103",
    title: "Badminton Doubles Match",
    vibe: "Play",
    location: "Hostel Court 2",
    participants: 3,
    timeRemaining: "25 min",
    status: "starting",
  },
] as const;

export const activeDrop = {
  id: "d201",
  title: "Show us what is directly in front of you right now.",
  targetTime: Date.now() + 298_000,
  totalParticipants: 24,
} as const;
```

### Data discipline

Do not duplicate the same mock object in multiple components.

Keep mock data centralized.

Components receive data through typed props.

---

# 26. REACT COMPONENT ARCHITECTURE

Recommended structure:

```text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── TopBar.tsx
│   │   └── ResponsiveNavigation.tsx
│   │
│   ├── vibe/
│   │   ├── VibeSelector.tsx
│   │   └── VibeChip.tsx
│   │
│   ├── now/
│   │   ├── LiveWorld.tsx
│   │   ├── LiveNode.tsx
│   │   ├── ConnectorLayer.tsx
│   │   └── MomentCard.tsx
│   │
│   ├── moment/
│   │   ├── MomentView.tsx
│   │   ├── ParticipantStack.tsx
│   │   ├── Thread.tsx
│   │   ├── ThreadBranch.tsx
│   │   ├── Contribution.tsx
│   │   └── JoinAction.tsx
│   │
│   ├── drops/
│   │   ├── ActiveDrop.tsx
│   │   ├── DropCountdown.tsx
│   │   └── ContributionComposer.tsx
│   │
│   ├── overlays/
│   │   ├── JoinDrawer.tsx
│   │   └── Dialog.tsx
│   │
│   └── archive/
│       └── MomentArchive.tsx
│
├── data/
│   ├── mockVibes.ts
│   ├── mockMoments.ts
│   ├── mockDrops.ts
│   └── mockContributions.ts
│
├── hooks/
│   ├── useMomentTimer.ts
│   ├── useSwipeDecision.ts
│   └── useReducedMotion.ts
│
├── lib/
│   ├── constants.ts
│   └── formatters.ts
│
├── styles/
│   ├── globals.css
│   └── tokens.css
│
└── tests/
    ├── VibeSelector.test.tsx
    ├── MomentCard.test.tsx
    ├── JoinDrawer.test.tsx
    └── DropCountdown.test.tsx
```

### Architecture rule

Keep UI rendering, domain data, and interaction state separate.

Do not place large data arrays inside deeply nested UI components.

---

# 27. SWIPE COMPONENT — CLEAN IMPLEMENTATION BLUEPRINT

The supplied source includes a combined swipeable card + confirmation drawer component. fileciteturn2file0L367-L579

For the evaluated build, split that prototype into smaller components rather than shipping one monolithic component.

Recommended composition:

```tsx
<MomentCard
  moment={moment}
  onAccept={handleAccept}
  onDecline={handleDecline}
/>

<JoinDrawer
  open={joinOpen}
  moment={selectedMoment}
  onClose={handleCloseJoin}
  onConfirm={handleConfirmJoin}
/>
```

## 27.1 Swipeable Moment Card

```tsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import type { MomentData } from "../../data/mockMoments";

const SWIPE_THRESHOLD = 120;

type Props = {
  moment: MomentData;
  onAccept: () => void;
  onDecline: () => void;
};

export function MomentCard({ moment, onAccept, onDecline }: Props) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const acceptOpacity = useTransform(x, [40, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -40], [1, 0]);

  return (
    <motion.article
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
          onAccept();
        } else if (info.offset.x < -SWIPE_THRESHOLD) {
          onDecline();
        }
      }}
      className="relative..."
      aria-label={`${moment.title}, ${moment.participants} people participating`}
    >
      <motion.span
        style={{ opacity: acceptOpacity }}
        aria-hidden="true"
      >
        I'M IN!
      </motion.span>

      <motion.span
        style={{ opacity: passOpacity }}
        aria-hidden="true"
      >
        PASS
      </motion.span>

      {/* Semantic card content */}

      <div role="group" aria-label="Moment actions">
        <button type="button" onClick={onDecline}>
          Pass
        </button>

        <button type="button" onClick={onAccept}>
          I'm in
        </button>
      </div>
    </motion.article>
  );
}
```

### Important evaluator-safe changes

- No `any` for event arguments.
- Explicit transform output ranges.
- Accessible button fallback.
- Decorative stamps marked `aria-hidden`.
- Domain data typed.
- Event handlers passed in rather than hidden global side effects.
- No direct DOM manipulation.

---

# 28. JOIN DRAWER — ACCESSIBLE IMPLEMENTATION BLUEPRINT

Use a proper dialog pattern.

```tsx
type JoinDrawerProps = {
  open: boolean;
  moment: MomentData | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function JoinDrawer({
  open,
  moment,
  onClose,
  onConfirm,
}: JoinDrawerProps) {
  if (!open || !moment) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close join dialog"
        className="absolute inset-0 bg-[#2B2024]/25 backdrop-blur-sm"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-drawer-title"
        className="absolute bottom-0 left-0 right-0 mx-auto max-w-lg..."
      >
        <h2 id="join-drawer-title">{moment.title}</h2>

        <p>
          {moment.location} · {moment.timeRemaining} left
        </p>

        <div aria-label={`${moment.participants} people participating`}>
          {/* Participant roster */}
        </div>

        <div aria-label="Contribution options">
          {/* Photo / Voice / Sketch */}
        </div>

        <button type="button" onClick={onConfirm}>
          Confirm arrival & enter thread
        </button>
      </section>
    </div>
  );
}
```

### Production requirement

Use a tested accessible dialog primitive if the project already includes one. Do not hand-roll focus trapping unless necessary.

---

# 29. MOTION SYSTEM

Motion is part of MOVA's visual language, but it must remain purposeful.

## 29.1 Allowed Motion

- Node pulse
- Card drag
- Drawer slide
- Branch emergence
- Drop countdown transitions
- Join confirmation
- Moment state change
- Archive fade

## 29.2 Motion Principles

1. Fast feedback.
2. Smooth but not floaty.
3. No perpetual motion that distracts.
4. Avoid layout-triggering animations.
5. Prefer `transform` and `opacity`.
6. Honor `prefers-reduced-motion`.

## 29.3 Reduced Motion

Example:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Do not remove core functionality when motion is reduced.

---

# 30. BENTO CARD SYSTEM

## 30.1 Bento Container

```css
.bento {
  border: 1.5px solid var(--border-bento);
  background: var(--surface-ivory);
  border-radius: var(--radius-bento);
  box-shadow: var(--shadow-bento);
}
```

## 30.2 Inner Card

```css
.card {
  background: var(--surface-card);
  border-radius: var(--radius-card);
}
```

Use spacing and hierarchy before relying on shadow.

---

# 31. ICONOGRAPHY

Use Lucide or another consistent icon set.

Recommended icons from the existing direction:

- `MapPin`
- `Clock`
- `Users`
- `Camera`
- `Mic`
- `Edit3`
- `X`
- `Check`

Rules:

- Use icons with labels when meaning is not obvious.
- Do not use emoji as the only indicator of function.
- Keep stroke weight visually consistent.
- Give icon-only buttons accessible labels.

---

# 32. SEARCH / DISCOVERY

The desktop top bar can include:

```text
Q  Search moments, spots, vibes...
```

Search should discover:

- Moment titles
- Contexts
- Locations
- Vibes

It should not become a global social-content search engine.

Use static mock filtering for the hackathon.

---

# 33. EMPTY / LOADING / ERROR STATES

## Quiet World

> **It's quiet right now.**

CTA:

`START SOMETHING`

Secondary:

`CHANGE VIBE`

## Early Thread

> **You're early. Start the thread.**

CTA:

`ADD SOMETHING`

## Drop Closed

> **That Drop passed.**

CTA:

`VIEW MOMENT`

## Failed Action

> **That didn't land. Try again.**

Provide a visible retry action.

---

# 34. FRONTEND-ONLY IMPLEMENTATION

The competition allows mock/static data.

Therefore:

## Use

- React
- Vite
- TypeScript
- Tailwind CSS or existing project CSS architecture
- Framer Motion if already installed
- Lucide React if already installed
- Local mock data
- Client-side state

## Do not over-engineer

Avoid introducing:

- Backend services
- Auth infrastructure
- WebSocket servers
- Database layers
- Cloud functions
- AI recommendation APIs
- complex third-party SDKs

unless explicitly necessary for the final concept.

The frontend is the product being judged.

---

# 35. CODE QUALITY & EVALUATION-SAFE ENGINEERING

This section is mandatory for the shipped implementation.

The target is not merely to make the design look impressive.

The target is to preserve a high score across:

1. **Code Quality & Clean Architecture**
2. **Security & Data Sanitization**
3. **Runtime Efficiency & Core Web Vitals**
4. **Component Testing & Reliability**
5. **Accessibility (ARIA & Keyboard Navigation)**
6. **Technical Specification Alignment**

## 35.1 Baseline Rule

**Build → Audit → Optimize → Verify → Continue**

Never make a broad refactor without first establishing a working baseline.

## 35.2 Preserve Working Architecture

Do not:

- Rewrite stable components without evidence.
- Replace static imports with dynamic imports just for theoretical optimization.
- Introduce speculative abstraction.
- Add libraries for problems the existing stack already solves.
- Trade a strong working score for an unverified optimization.

## 35.3 Static Imports

Prefer explicit static imports:

```tsx
import { MomentCard } from "./components/MomentCard";
```

Do not use dynamic imports unless there is a clear measured performance reason and the evaluator/build pipeline supports the change.

## 35.4 No Imperative DOM Manipulation

Do not use:

```js
document.querySelector(...)
document.getElementById(...)
element.innerHTML = ...
```

Use React state, refs only where appropriate, and declarative rendering.

## 35.5 No Invalid HTML Meta Headers

Do not add HTTP response headers through unsupported HTML meta tags.

Security headers belong in the server/deployment layer if applicable, not as fake HTML metadata.

## 35.6 Sanitization

Even with mock data:

- Render text as text.
- Avoid `dangerouslySetInnerHTML`.
- Do not evaluate or execute arbitrary strings.
- Validate any simulated URL before rendering.
- Keep data typed.

## 35.7 Dependency Discipline

Before adding a package:

1. Check whether the project already has an equivalent.
2. Check bundle impact.
3. Check evaluator/build compatibility.
4. Add only when the package materially improves the implementation.

---

# 36. PERFORMANCE / CORE WEB VITALS

## 36.1 Rendering

Avoid:

- Huge DOM trees for decorative elements.
- Unnecessary re-renders of the entire Live World.
- Recomputing complex graph geometry on every render.
- Layout-triggering animations.

Prefer:

- `transform`
- `opacity`
- Memoization where measured
- Stable keys
- Small components
- CSS-based effects

## 36.2 Timers

For Drop countdowns:

- Store one target timestamp.
- Update display at a controlled cadence.
- Clear timers on unmount.
- Do not use one interval per card.

## 36.3 Images

- Use explicit dimensions/aspect-ratio containers.
- Lazy-load offscreen images.
- Compress mock assets.
- Avoid large assets when a smaller one visually works.

## 36.4 Motion

Prefer compositor-friendly properties.

Avoid animating:

- `width`
- `height`
- `top`
- `left`
- layout-heavy grid properties

when `transform: translate/scale` can achieve the same result.

## 36.5 Bundle Discipline

Do not import large packages when a small local utility is sufficient.

---

# 37. ACCESSIBILITY CONTRACT

Every major feature must satisfy:

## Navigation

- Semantic landmarks.
- Keyboard access.
- Visible focus state.

## Buttons

- Real `<button>` elements.
- Accessible accessible names.
- Disabled state communicated semantically.

## Swipe

- Button alternative.
- Keyboard alternative.

## Dialog

- `role="dialog"`
- `aria-modal="true"`
- Labelled title.
- Escape to close.
- Focus management.

## Live Updates

For Drop state and meaningful system announcements, use an appropriate live region.

Example:

```tsx
<p aria-live="polite" className="sr-only">
  Drop ends in {formattedTime}
</p>
```

Do not continuously spam screen readers every second.

Prefer meaningful milestones if needed.

## Color

Never use color as the sole state indicator.

## Reduced Motion

Honor `prefers-reduced-motion`.

---

# 38. SECURITY & DATA SAFETY

Even though MOVA is frontend-only:

## Input Safety

Treat all user-entered Vibe/Moment text as untrusted.

Render:

```tsx
<p>{moment.title}</p>
```

not raw HTML.

## URLs

When mock images or links are configurable, constrain accepted origins.

## Sensitive Data

Do not collect or persist unnecessary personal data.

The MVP can use anonymous mock users.

## Client Storage

Use local storage only for non-sensitive prototype state if necessary.

Never put secrets in frontend code.

---

# 39. TESTING STRATEGY

Testing should focus on the actual interaction loop.

## 39.1 Component Tests

### `VibeSelector`

Verify:

- Selection changes.
- Only one active Vibe where intended.
- Keyboard activation works.
- Accessible label exists.

### `MomentCard`

Verify:

- Pass button works.
- Join button works.
- Swipe threshold triggers correct callback.
- Card renders participant count and time.
- No missing accessible labels.

### `JoinDrawer`

Verify:

- Opens with selected Moment.
- Close action works.
- Escape closes.
- Confirm action fires.
- Dialog has labelled title.

### `DropCountdown`

Verify:

- Countdown decreases.
- Reaches zero safely.
- Timer cleans up.
- Closed state renders.

### `Thread`

Verify:

- Branches render.
- Contributions render.
- New branch action works.

## 39.2 Integration Flow

Test:

```text
Choose Vibe
→ Open Moment
→ Join
→ Confirm Drawer
→ Enter Thread
→ Add Contribution
→ Drop
→ Moment Memory
```

This is the most important end-to-end flow.

---

# 40. EVALUATION AUDIT CHECKLIST

Before submission, run a deliberate audit.

## Code Quality & Clean Architecture

- [ ] Components are small and reusable.
- [ ] Domain data is centralized.
- [ ] Types are explicit.
- [ ] No unexplained global state.
- [ ] No dead code.
- [ ] No duplicated mock data.
- [ ] No unnecessary dependencies.
- [ ] Static imports preserved unless measured otherwise.

## Security & Data Sanitization

- [ ] No `dangerouslySetInnerHTML`.
- [ ] No `innerHTML`.
- [ ] No `eval`.
- [ ] No secrets in source.
- [ ] User-entered text rendered safely.
- [ ] No fake security headers in HTML.

## Runtime Efficiency & Core Web Vitals

- [ ] No unnecessary interval proliferation.
- [ ] No render loops.
- [ ] Decorative SVG is bounded.
- [ ] Images are optimized.
- [ ] Main content renders quickly.
- [ ] Motion uses transform/opacity.
- [ ] No needless dynamic imports.

## Component Testing & Reliability

- [ ] Core components tested.
- [ ] Join flow tested.
- [ ] Drop timer tested.
- [ ] Thread branching tested.
- [ ] Responsive interaction tested.
- [ ] Empty states tested.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Dialog focus is managed.
- [ ] Swipe actions have buttons.
- [ ] Icon-only buttons have labels.
- [ ] Reduced motion supported.
- [ ] Color is not sole state indicator.
- [ ] Live regions are used sparingly and appropriately.

## Technical Specification Alignment

- [ ] White canvas remains canonical.
- [ ] Ivory Bento cards remain canonical.
- [ ] Maroon is primary action color.
- [ ] Gold is used for Drops / countdown / pulse.
- [ ] Crayon typography remains expressive rather than structural.
- [ ] Spatial Live World exists on desktop.
- [ ] Swipe interaction exists where specified.
- [ ] Confirmation drawer exists.
- [ ] Living Thread exists.
- [ ] Drop exists.
- [ ] Memory archive exists.

---

# 41. OPTIMIZATION WORKFLOW

Use this sequence throughout development:

```text
1. BUILD
   ↓
2. AUDIT
   ↓
3. EVALUATE
   ↓
4. IDENTIFY HIGH-CONFIDENCE ISSUES
   ↓
5. OPTIMIZE THE SMALLEST SAFE SURFACE
   ↓
6. VERIFY
   ↓
7. REPEAT
```

### Optimization priority

Prefer:

**High evidence + low risk**

over:

**High novelty + uncertain benefit**

Examples of safe improvements:

- Fixing accessibility labels.
- Removing duplicated calculations.
- Cleaning up unused imports.
- Centralizing constants.
- Correcting timer cleanup.
- Reducing unnecessary renders.
- Adding tests around existing behavior.

Avoid speculative changes that might destabilize the app.

---

# 42. RESPONSIVE QA MATRIX

| Area | Desktop | Tablet | Mobile |
|---|---|---|---|
| Live World | Spatial node graph | Compact graph | Stacked active Moments |
| Vibe | Persistent rail | Collapsible panel | Sticky compact selector |
| Drops | Right rail | Inline panel | Top/inline card |
| Moment Detail | Side panel | Overlay | Full-screen sheet |
| Swipe | Optional card stack | Card stack | Primary gesture |
| Thread | Spatial branch graph | Scrollable branches | Vertical branch layout |
| Archive | Multi-column | Two-column | Single-column |

---

# 43. VISUAL QA CHECKLIST

## Canvas

- [ ] Root background is pure white.
- [ ] No accidental gray body background.
- [ ] No unintended dark mode.

## Cards

- [ ] Ivory Bento surfaces are consistent.
- [ ] Borders are subtle.
- [ ] Radius hierarchy is consistent.

## Typography

- [ ] Structural UI uses sans.
- [ ] Organic annotations use crayon font.
- [ ] Countdown uses monospace.
- [ ] No excessive handwritten text.

## Nodes

- [ ] Active node visibly pulses.
- [ ] Connectors remain subtle.
- [ ] Branches are understandable.
- [ ] Nodes remain interactive/accessible.

## Motion

- [ ] Swipe feels responsive.
- [ ] Drawer entry is smooth.
- [ ] Reduced motion works.
- [ ] No animation blocks interaction.

---

# 44. DESIGN DO / DON'T

## DO

- Make the Now World visually alive.
- Use temporary Moments.
- Let Threads branch.
- Make Vibe useful.
- Make Drops synchronized.
- Use motion as semantic feedback.
- Keep participation one or two actions away.

## DON'T

- Add a conventional feed.
- Add follower counts.
- Use likes as the primary action.
- Turn Threads into standard comments.
- Overuse crayon typography.
- Overuse animation.
- Add backend complexity that does not improve the demo.
- Sacrifice accessible controls for gesture novelty.

---

# 45. HERO / LANDING COPY

## Primary

# Don't Follow People. Follow Moments.

## Supporting

> A social web experience built around what people are feeling, doing, and experiencing right now.

## CTA

# ENTER MOVA

Alternative short copy:

> See what's happening. Share your vibe. Join a moment.

---

# 46. PRODUCT VOICE

Instead of:

> Create a social post.

Use:

> **Start something.**

Instead of:

> Engage with content.

Use:

> **Join the moment.**

Instead of:

> No new posts.

Use:

> **It's quiet right now.**

Instead of:

> Status updated.

Use:

> **Your vibe changed.**

Instead of:

> Event expired.

Use:

> **That moment passed.**

---

# 47. FINAL DEMO SCENARIO

The judging demo should tell one continuous story.

## Step 1 — Enter

Hero:

> **Don't Follow People. Follow Moments.**

Click:

`ENTER MOVA`

## Step 2 — Vibe

Prompt:

> **What's your vibe?**

Choose:

☕ Chill

## Step 3 — Now

Live World reveals:

- Chai Run — 7 people
- Campus Walk — 3 people
- Music Corner — 9 people

## Step 4 — Join

Open Chai Run.

Swipe right or press:

`I'M IN`

## Step 5 — Drawer

Confirmation:

> You're Joining  
> Chai Run  
> Campus Canteen · 18 min left

Click:

`CONFIRM ARRIVAL & ENTER THREAD`

## Step 6 — Thread

See:

- Photo
- Voice
- Text
- Branch

A new branch appears:

### SNACK RUN

## Step 7 — Drop

The synchronized Drop begins:

> **SHOW US YOUR EVENING**

`04:58`

User submits a contribution.

## Step 8 — Moment evolves

More mock contributions appear.

A new branch becomes:

### CAMPUS MEETUP

## Step 9 — Memory

Moment closes.

MOVA generates:

### CHAI RUN

7 participants  
12 contributions  
2 branches

## Step 10 — Loop

Prompt:

> **What's your vibe now?**

Choose:

🎮 Play

The Live World changes.

The social loop has restarted.

---

# 48. TECHNICAL SPECIFICATION

## Core Stack

```text
React
TypeScript
Vite
Tailwind CSS OR existing project styling system
Framer Motion
Lucide React
```

Use the project's existing versions whenever possible.

Do not upgrade tooling during the hackathon unless there is a concrete blocker.

## Data

Frontend mock/static data.

## State

Local React state or a lightweight existing state utility.

## Persistence

Optional local storage for non-sensitive prototype preferences.

## Routing

Use a simple route structure only if multiple URL-addressable screens are needed.

Avoid adding routing complexity for modal-only states.

---

# 49. PERFORMANCE BUDGET MINDSET

The visual product should remain fast.

Priorities:

1. Fast first render.
2. Minimal blocking resources.
3. Small initial JS.
4. Stable layout.
5. Responsive interactions.
6. Controlled animation.
7. Optimized media.

Do not optimize based on guesses.

Measure first when possible, then make the smallest change likely to help.

---

# 50. FINAL AGENT INSTRUCTIONS

When implementing MOVA:

## Visual Enforcement

1. Root page background must remain `#FFFFFF`.
2. Bento panels use `#F5E6D3`.
3. Primary actions use `#8B1E3F`.
4. Drop/countdown/pulse uses `#D4AF37`.
5. Branch connectors use `#C9A0A0`.
6. Structural text uses sans.
7. Expressive annotations use crayon font.
8. Countdown uses monospace.

These constraints originate from the supplied MOVA design specification. fileciteturn2file0L635-L659

## Interaction Enforcement

1. Swipe left = Pass.
2. Swipe right = I'm In.
3. Threshold = 120px.
4. Show contextual stamps.
5. Successful Join opens the confirmation drawer.
6. Drawer slides from the bottom.
7. Confirmation enters the Thread.
8. Thread can branch.
9. Drop is synchronized and temporary.
10. Closed Moment becomes a Memory artifact.

## Engineering Enforcement

1. Keep static imports by default.
2. Avoid imperative DOM APIs.
3. Do not introduce invalid HTML security headers.
4. Avoid unsafe HTML injection.
5. Keep domain data centralized.
6. Prefer typed props and finite state unions.
7. Extract reusable primitives instead of building monoliths.
8. Test the core interaction loop.
9. Make swipe behavior keyboard-accessible.
10. Respect reduced motion.
11. Clean up timers and listeners.
12. Do not make speculative optimization changes without verification.
13. Preserve a working baseline before major refactors.
14. Favor small, evidence-backed improvements.
15. Run an audit after meaningful changes.

---

# 51. DEFINITION OF DONE

MOVA is ready for submission when:

## Product

- [ ] The social concept is understandable in under 30 seconds.
- [ ] The product clearly does not resemble a traditional feed.
- [ ] Vibe changes discovery.
- [ ] Moments can be joined.
- [ ] Drops create synchronized participation.
- [ ] Threads can branch.
- [ ] Moments can close and become memories.

## Design

- [ ] White + Ivory + Maroon + Gold + Rose palette is consistent.
- [ ] Bento system is consistent.
- [ ] Spatial Live World works on desktop.
- [ ] Mobile has a deliberate composition.
- [ ] Motion feels purposeful.
- [ ] Typography hierarchy is consistent.

## Engineering

- [ ] TypeScript compiles cleanly.
- [ ] No console errors in the core journey.
- [ ] Core component tests pass.
- [ ] No obvious unsafe rendering patterns.
- [ ] No timer/listener leaks.
- [ ] Keyboard navigation works.
- [ ] Reduced motion works.
- [ ] Responsive behavior is verified.
- [ ] Build is deterministic.
- [ ] No unnecessary dependencies were introduced.

## Evaluation

- [ ] Code Quality & Clean Architecture audited.
- [ ] Security & Data Sanitization audited.
- [ ] Runtime Efficiency & Core Web Vitals audited.
- [ ] Component Testing & Reliability audited.
- [ ] Accessibility audited.
- [ ] Technical Specification Alignment audited.
- [ ] Existing strengths were preserved before optimization.

---

# 52. FINAL PRODUCT DEFINITION

# MOVA

## Don't Follow People. Follow Moments.

MOVA is a responsive social web app that transforms social interaction from a feed-based activity into a real-time shared experience.

Users begin with their **Vibe**.

They enter the **Now World** and discover what is happening.

They **Join Moments** instead of liking posts.

They participate in synchronized **Drops**.

Their contributions create living, branching **Threads**.

Threads can turn into activities.

Activities create new Moments.

Completed experiences become **Memories**.

The loop is:

```text
VIBE
 ↓
NOW
 ↓
DISCOVER
 ↓
JOIN
 ↓
DROP
 ↓
THREAD
 ↓
ACTIVITY
 ↓
MEMORY
 ↓
NEW VIBE
```

### The fundamental shift

> **Traditional social media asks: “What did people post?”**

> **MOVA asks: “What can we experience together right now?”**

---

# 53. FINAL ONE-MINUTE PITCH

> **MOVA is a social web app built around moments, not feeds.**
>
> Most social platforms ask us to follow people, consume posts, and react to content. MOVA asks a different question: **what are you up for right now?**
>
> Users choose a Vibe, discover what's happening in the Live World, and join temporary Moments around them. At specific times, Drops bring people together around shared prompts. Their photos, messages, voice notes, and actions don't form a conventional comment section — they form a living Thread that can branch into new activities.
>
> A chai run can become a snack hunt. A rain photo can become a campus meetup. A five-minute Drop can become a memory shared by twenty people.
>
> **MOVA doesn't help people build audiences. It helps people build moments.**
>
> **Don't follow people. Follow moments.**

---

# 54. MASTER DESIGN RULE

Every feature decision must pass two tests.

## Product test

> **Does this help people participate in something happening now?**

## Engineering test

> **Does this improve or preserve the product without creating unnecessary implementation risk?**

If a feature fails the first test, it does not belong in MOVA.

If an implementation fails the second test, simplify it.

---

# END OF `DESIGN.md`
