# MOVA — COMPLETE PRODUCT DESIGN + FRONTEND ENGINEERING SPECIFICATION

> **Product:** MOVA  
> **Format:** Responsive Social Web App  
> **Tagline:** **Don't Follow People. Follow Moments.**  
> **Document Type:** UI/UX + Motion + Design System + Frontend Engineering Blueprint  
> **Primary Goal:** Build a visually distinctive, interaction-first social web experience while maximizing judged frontend quality across UX, visual design, functionality, responsiveness, code quality, accessibility, security/data handling, runtime performance, component reliability, and technical specification alignment.

---

# 0. SOURCE OF TRUTH

This document is the implementation source of truth for MOVA's visual system and frontend experience.

The product concept is based on the previously defined MOVA PRD and the supplied visual references:

- **Reference UI direction:** tactile organic bento layout, rounded white/ivory surfaces, dark top navigation, asymmetric cards, playful visual details, strong hierarchy, subtle motion, and spatial composition.
- **Required palette direction:** white canvas with Deep Maroon, Dusty Rose, Near-Black, Gold, and Ivory.
- **Interaction direction:** swipe to accept/decline, confirmation drawer that fades/slides from the bottom, living branching threads, synchronized Drops, and temporary Moments.
- **Implementation target:** responsive web application, frontend-first, mock/static data permitted.

### Non-negotiable product statement

> MOVA is not another feed.

The implementation must preserve the core behavioral difference:

```text
TRADITIONAL SOCIAL
People → Posts → Likes → Comments → Followers → Scroll

MOVA
Vibe → Discover → Join → Contribute → Evolve → Remember → Repeat
```

---

# 1. PRODUCT ESSENCE

## 1.1 Product Definition

MOVA is a social web app organized around **real-time shared experiences instead of permanent profiles and infinite content feeds**.

Users communicate their current state through a **Vibe**, discover active situations through **Now**, enter temporary **Moments**, participate in synchronized **Drops**, and contribute to **living Threads** that evolve as more people interact.

The core social object is not a person.

It is a **Moment**.

### Product thesis

> **People don't build audiences. They build moments.**

### Core UX question

Every significant screen should answer at least one of:

- What is happening?
- What can I join?
- What can I contribute?
- How is this moment changing?
- What can happen next?

---

# 2. DESIGN NORTH STAR

## 2.1 Experience Goal

MOVA should feel like entering a **living social environment**, not opening a content catalog.

The user should feel:

- curious
- invited
- present
- able to participate immediately
- aware of time
- aware of people without feeling popularity pressure

## 2.2 Emotional Design

The interface should communicate five emotional qualities:

### Alive
Small motion, activity signals, timers, and changing node states communicate that the world is active.

### Human
Handwritten/crayon-like accents, imperfect marks, scribbles, and tactile surfaces create personality.

### Calm
The white canvas and restrained color use prevent visual overload.

### Playful
Swipe stamps, organic connectors, doodle moments, and tiny interactions encourage exploration.

### Purposeful
Every animation and accent should help users understand state, hierarchy, or action.

---

# 3. UX PRINCIPLES

MOVA should follow practical UX principles rather than treating visual novelty as a substitute for usability.

## 3.1 Clarity Before Decoration

A user must understand the current state without decoding the visual language.

Prioritize:

1. What is happening?
2. Can I join?
3. What happens after I join?
4. What action is available now?

## 3.2 Progressive Disclosure

Do not expose every action at once.

Example:

```text
Moment Card
   ↓
Join
   ↓
Confirmation Drawer
   ↓
Enter Thread
   ↓
Contribution tools appear
```

## 3.3 Recognition Over Recall

Use familiar labels and visible state:

- Join
- Pass
- Add something
- Change vibe
- Create moment
- Drop something

Do not force users to memorize gestures.

## 3.4 Feedback

Every meaningful action should have immediate visual feedback.

Examples:

- Vibe selected → selected pill changes + gentle scale
- Join → button state changes + participant count increments
- Swipe right → `I'M IN!` stamp appears progressively
- Swipe left → `PASS` stamp appears progressively
- Contribution sent → item enters thread with a short entrance motion
- Moment closing → visual intensity decreases

## 3.5 Fitts's Law

Primary actions should be large and easy to reach.

On mobile:

- minimum comfortable touch target: approximately 44×44 CSS px
- primary CTA should be visually dominant
- avoid placing destructive/secondary actions too close to primary CTA

## 3.6 Hick's Law

Keep primary choices limited.

Vibe selector may show 6–8 options, while advanced states can be accessed through a secondary option.

## 3.7 Gestalt

Use:

- proximity for grouped metadata
- similarity for Vibe chips
- enclosure for Moment containers
- continuity for Thread branches
- figure/ground for active states

## 3.8 Jakob's Law

The experience may look new, but basic controls should remain recognizable.

Novelty belongs in:

- spatial world
- branching thread
- moment lifecycle
- motion
- visual language

Not in basic button behavior.

## 3.9 Accessibility as UX

Motion must not be required to understand content.

All meaningful information represented by:

- animation
- color
- pulse
- spatial location

must have a textual or structural equivalent.

---

# 4. PRO-MAX DESIGN DIRECTION

## 4.1 Visual Design Strategy

The UI should combine:

**Editorial SaaS structure**
+
**tactile scrapbook personality**
+
**spatial activity visualization**

This avoids two extremes:

### Too corporate
Generic dashboards, tables, flat cards.

### Too playful
Unreadable handwritten interfaces, excessive stickers, uncontrolled color.

The final balance should feel like a **high-end product designed by a playful design studio**.

---

# 5. REFERENCE UI TRANSLATION

The supplied first reference should inform the **composition language** rather than be copied literally.

## 5.1 Borrowed Principles

Use:

- strong rounded outer shell
- dominant top navigation
- white base
- large section title
- modular bento cards
- asymmetric card sizes
- small utility controls
- colorful content modules
- playful secondary illustrations
- soft shadows
- prominent rounded controls
- dense but organized desktop composition

## 5.2 Do Not Copy

Do not reproduce:

- exact layouts
- exact content
- exact illustrations
- exact card arrangement
- exact navigation icons
- exact visual assets

The reference is an inspiration for the **interaction and visual grammar**, not a template to trace.

---

# 6. COLOR SYSTEM

## 6.1 Required Base

The application root canvas must be:

```text
#FFFFFF
```

Pure white is mandatory for the page background.

Do not replace it globally with:

- dark grey
- beige
- ivory
- tinted blue
- gradient backgrounds

Ivory is a **surface color**, not the application canvas.

---

## 6.2 Primary Palette

| Token | Hex | Primary Use |
|---|---|---|
| Canvas White | `#FFFFFF` | root page background |
| Deep Maroon | `#8B1E3F` | primary CTA, selected state, accept |
| Dusty Rose | `#C9A0A0` | connectors, secondary accents, pass state |
| Near-Black | `#2B2024` | text, primary icons, header |
| Gold | `#D4AF37` | Drop attention, countdown, live indicators |
| Ivory | `#F5E6D3` | bento cards, soft surfaces, contextual containers |

---

## 6.3 Color Hierarchy

### 1. Near-Black
Default text and structure.

### 2. Deep Maroon
Primary interaction.

Use for:

- Join
- Create
- Confirm
- Selected Vibe
- Accept
- Primary links where appropriate

### 3. Gold
Attention and temporal activity.

Use for:

- Drop countdown
- Active pulse
- Live indicator
- Participant count highlight
- important but non-destructive status

### 4. Dusty Rose
Secondary visual language.

Use for:

- Thread connectors
- Pass stamp
- branch indicators
- soft accent badges

### 5. Ivory
Surface/background differentiation.

Use for:

- cards
- panels
- secondary controls
- grouped containers

### 6. White
Canvas, elevated sheets, nested content.

---

# 7. COLOR USAGE RULES

## 7.1 Never Use Color Everywhere

Color should create **attention hierarchy**, not visual noise.

Recommended rule:

```text
White / Near-Black = structure
Ivory = surfaces
Maroon = action
Gold = time / live attention
Rose = secondary visual relationship
```

## 7.2 No Uncontrolled Gradients

Do not use gradients as a default decoration.

Avoid:

- hero gradients
- random card gradients
- gradient text
- gradient buttons

MOVA's visual richness should come from:

- composition
- color blocking
- texture
- typography
- motion
- spatial relationships

## 7.3 Contrast Safety

Do not assume every palette combination is accessible.

Before shipping:

- verify normal text contrast
- verify large text contrast
- verify icon/button contrast when used as essential controls
- ensure state is not conveyed by color alone

When an accent cannot provide sufficient text contrast, place the text on a suitable light/dark surface or use Near-Black / White as the text color.

---

# 8. DESIGN TOKENS

```css
:root {
  --mova-canvas: #FFFFFF;

  --mova-maroon: #8B1E3F;
  --mova-maroon-hover: #731833;

  --mova-rose: #C9A0A0;

  --mova-nearblack: #2B2024;
  --mova-muted: #66555B;

  --mova-gold: #D4AF37;

  --mova-ivory: #F5E6D3;
  --mova-ivory-card: #FDFBF7;
  --mova-ivory-border: #EAD8C0;

  --mova-border:
    rgba(43, 32, 36, 0.09);

  --mova-shadow-soft:
    0 4px 20px -2px rgba(43, 32, 36, 0.05),
    0 2px 6px -1px rgba(43, 32, 36, 0.02);

  --mova-shadow-drawer:
    0 -20px 48px -8px rgba(43, 32, 36, 0.16);
}
```

---

# 9. TYPOGRAPHY SYSTEM

MOVA requires two complementary typographic personalities.

## 9.1 Structural UI Font

Preferred:

```text
Plus Jakarta Sans
```

Fallback:

```text
Inter
system-ui
sans-serif
```

Use for:

- navigation
- body
- metadata
- buttons
- inputs
- timestamps
- system states
- accessibility labels
- forms

Recommended weights:

- 400
- 500
- 600
- 700

Do not make body text excessively thin.

---

## 9.2 Handwritten / Crayon Font

Preferred:

```text
Kalam
```

Alternatives:

```text
Caveat
Patrick Hand
```

Use selectively for:

- Moment titles
- human notes
- scribbles
- contextual labels
- short expressive copy
- `I'M IN!`
- `PASS`
- memory annotations
- branch labels

### Important

Do NOT use the handwritten font for:

- long paragraphs
- dense navigation
- form labels
- critical instructions
- tiny metadata

The handwriting is a **personality layer**, not the primary reading font.

---

## 9.3 Monospace

Preferred:

```text
Space Mono
```

Use for:

- synchronized countdown
- time remaining
- participant counts
- live metrics
- temporal information

This makes time feel system-like and distinct from the human handwritten layer.

---

# 10. TYPOGRAPHIC SCALE

Use responsive `clamp()` values where appropriate.

Example:

```css
.mova-display {
  font-size: clamp(2.25rem, 5vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.mova-heading-xl {
  font-size: clamp(2rem, 3.2vw, 3.5rem);
  line-height: 1;
}

.mova-heading-lg {
  font-size: clamp(1.5rem, 2.4vw, 2.25rem);
}

.mova-body-lg {
  font-size: 1.125rem;
  line-height: 1.6;
}

.mova-body {
  font-size: 1rem;
  line-height: 1.5;
}

.mova-caption {
  font-size: 0.8125rem;
  line-height: 1.4;
}
```

---

# 11. HANDWRITTEN TEXTURE SYSTEM

The crayon/pencil effect must remain subtle and performant.

## Preferred approach

Use a handwriting font + imperfect geometry.

Examples:

- slightly rotated labels
- irregular underline
- hand-drawn border
- scribble icon
- rough circle behind a count
- small pencil arrow

## Avoid

Heavy SVG displacement filters everywhere.

Why:

- expensive rendering
- may hurt low-end devices
- can create inconsistent visual output
- unnecessary for most text

Use texture as an accent only.

---

# 12. SPACING SYSTEM

Base spacing should follow a consistent scale.

Recommended:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Use:

- 8px/12px gaps for compact UI
- 16px/24px for component internals
- 32px/48px for major sections
- 64px+ for large responsive composition

Avoid arbitrary one-off spacing values unless justified by the layout.

---

# 13. RADIUS SYSTEM

```text
pill = 9999px
small = 12px
control = 16px
card = 20px
bento = 28px
drawer = 28–32px
```

The interface should feel soft but not toy-like.

---

# 14. SHADOW SYSTEM

Use low-elevation shadows.

Default:

```css
box-shadow:
  0 4px 20px -2px rgba(43,32,36,.05),
  0 2px 6px -1px rgba(43,32,36,.02);
```

Elevated drawer:

```css
box-shadow:
  0 -20px 48px -8px rgba(43,32,36,.16);
```

Avoid excessive shadows on every nested element.

---

# 15. GLOBAL APP SHELL

## 15.1 Desktop

The web app should use a polished outer shell inspired by the first reference.

### Suggested structure

```text
PAGE CANVAS: WHITE

┌───────────────────────────────────────────────────────────┐
│                    MOVA APP SHELL                         │
│                                                           │
│  TOP NAVIGATION                                           │
│                                                           │
│  ┌─────────────┬──────────────────────────┬─────────────┐ │
│  │ VIBE        │ LIVE WORLD / NOW         │ DROPS       │ │
│  │ + SPARK     │                          │ + MOMENTS   │ │
│  └─────────────┴──────────────────────────┴─────────────┘ │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 15.2 Outer Shell

Desktop shell:

- centered
- wide but not edge-to-edge
- white content
- dark top navigation
- large soft radius
- subtle border
- restrained shadow

The shell should not trap the content in an unnecessarily narrow max-width.

Suggested:

```css
width: min(1440px, calc(100vw - 48px));
margin-inline: auto;
```

At smaller widths:

```css
width: min(100%, calc(100vw - 24px));
```

---

# 16. TOP NAVIGATION

## Desktop

Include:

- MOVA wordmark
- Now
- Vibe
- Drops
- Moments
- optional search
- profile/status pill

Example:

```text
MOVA     NOW    VIBE    DROPS    MOMENTS
                                      Arun  ☕
```

The navigation should remain visually quiet.

The content area should be the primary focus.

## Mobile

Use:

- compact wordmark
- current context
- accessible menu/navigation

Do not force the complete desktop nav into mobile.

---

# 17. MAIN INFORMATION ARCHITECTURE

```text
MOVA
│
├── NOW
│   ├── Live World
│   ├── Active Moments
│   ├── Nearby / Contextual Moments
│   └── Moment details
│
├── VIBE
│   ├── Current Vibe
│   ├── Quick intentions
│   └── Custom Vibe
│
├── DROPS
│   ├── Active Drop
│   ├── Upcoming Drops
│   └── Completed Drops
│
└── MOMENTS
    ├── Active
    ├── Closed
    └── Memory Archive
```

### Thread is not top-level navigation.

Thread exists inside a Moment.

---

# 18. PRIMARY HOME EXPERIENCE — NOW

The default destination should be:

# NOW

Subheading:

> **What's happening?**

The page answers:

- what is live
- where people are participating
- which Moments match the current Vibe
- what is about to begin
- what needs participation

---

# 19. DESKTOP NOW LAYOUT

Recommended 12-column layout.

```text
12 COLUMN GRID

┌───────────────┬──────────────────────────────────┬───────────────┐
│ 3 COLUMNS     │ 6 COLUMNS                        │ 3 COLUMNS     │
│               │                                  │               │
│ YOUR VIBE     │ LIVE WORLD                       │ DROPS         │
│               │                                  │               │
│ SPARK         │ METRICS                          │ LIVE MOMENTS  │
│               │                                  │               │
│ QUICK ACTIONS │ NODE GRAPH                       │ EVENTS        │
│               │                                  │               │
└───────────────┴──────────────────────────────────┴───────────────┘
```

This is the primary desktop composition.

---

# 20. LIVE WORLD

## 20.1 Purpose

The Live World is MOVA's signature visual element.

It provides a spatial representation of current social activity.

### Visual metaphor

> The social environment behaves like a living map of moments.

---

# 21. LIVE WORLD NODES

Each node represents a Moment.

A node communicates:

- Moment title
- Vibe
- participation
- activity state
- relation to another Moment
- approximate temporal urgency

## Node size

Recommended mapping:

```text
1–3 participants = small
4–8 = medium
9–20 = large
20+ = dominant
```

Do not make the difference so large that small Moments disappear.

---

# 22. NODE STATES

### Dormant

Quiet moment.

Visual:

- static
- smaller
- low visual emphasis

### Active

People are participating.

Visual:

- subtle pulse
- clearer label
- stronger contrast

### Hot

A lot of current activity.

Visual:

- wider halo
- gold accent
- stronger activity indicator

### Ending

Moment is nearing expiration.

Visual:

- reduced opacity
- smaller pulse
- countdown emphasis

### Closed

Removed from live world and moved into archive.

---

# 23. NODE ANIMATION

Default pulse:

```text
scale: 1.00 → 1.06 → 1.00
duration: 2.4s
ease: ease-in-out
```

Only active nodes pulse.

Do not animate every node at once.

For many nodes:

- cap simultaneous continuous animation
- use CSS animation
- prefer transform/opacity
- avoid layout-affecting animation

---

# 24. THREAD CONNECTORS

Use SVG for branch relationships.

Recommended:

```svg
stroke="#C9A0A0"
stroke-width="2"
stroke-dasharray="4 6"
fill="none"
```

Use curved paths where possible.

Avoid dozens of DOM-heavy animated connector components.

Prefer one SVG layer rendering multiple paths.

---

# 25. THREAD VISUAL LANGUAGE

A Thread is not a comment list.

It is:

> **a path showing how a moment changed as people participated.**

Example:

```text
RAIN CHAOS
     │
     ├──── Photo: Rain started
     │
     ├──── Text: Canteen is packed
     │              │
     │              └──── TEA RUN
     │                         │
     │                         └──── 6 joined
     │
     └──── Voice: "Everyone is running"
```

---

# 26. MOMENT CARD

Every Moment card should communicate the minimum decision-making information.

## Required fields

- title
- Vibe
- location/context
- participant count
- time remaining
- status
- primary action

## Example

```text
☕ CHILL                     18m

CHAI & SAMOSA RUN

Campus Canteen · Block B

● ● ● ● ● ● ●  7 participating

[ I'M IN ]
```

---

# 27. MOMENT CARD VISUAL TREATMENT

Surface:

```text
background: Ivory
radius: 28px
border: 1.5px soft neutral
shadow: low elevation
```

Use an occasional visual sticker/doodle, but no decorative overload.

---

# 28. MOMENT SWIPE INTERACTION

This is a signature interaction and must feel polished.

## Swipe left

Meaning:

> Pass / not for me.

## Swipe right

Meaning:

> I'm interested / I'm in.

This pattern should be most prominent in mobile card-stack browsing and can be offered as an optional interaction on desktop.

---

# 29. SWIPE MECHANICS

### Drag axis

Horizontal only:

```js
drag="x"
```

### Elasticity

Target:

```text
dragElastic ≈ 0.65
```

### Rotation

```text
x = -200 → rotation = -10°
x = 0    → rotation = 0°
x = +200 → rotation = +10°
```

### Threshold

```text
left  < -120px = PASS
right > +120px = I'M IN
```

Use measured gesture offset, not guessed velocity alone.

---

# 30. SWIPE VISUAL FEEDBACK

## Right / Accept

As x increases:

- Maroon border becomes stronger
- `I'M IN!` appears
- stamp opacity increases
- card rotates slightly clockwise
- optional tiny maroon hand-drawn mark appears

## Left / Pass

As x decreases:

- Rose border becomes stronger
- `PASS` appears
- stamp opacity increases
- card rotates slightly counter-clockwise

## Near threshold

At approximately 60–80% threshold:

- stronger stamp
- stronger action cue
- optional tactile-feeling scale feedback

Do not vibrate continuously.

---

# 31. SWIPE COMPLETION

At threshold, the card should not simply vanish without feedback.

### Accept sequence

```text
Drag right
   ↓
Threshold reached
   ↓
I'M IN! becomes obvious
   ↓
Card settles / completes
   ↓
Confirmation drawer enters
```

### Pass sequence

```text
Drag left
   ↓
PASS appears
   ↓
Card exits with direction
   ↓
Next card is staged
```

The next card should be prepared without abrupt layout reflow.

---

# 32. SWIPE ACCESSIBILITY FALLBACK

Swipe must never be the only way to interact.

Provide:

- visible Join button
- visible Pass button
- keyboard actions
- accessible labels
- focusable controls

Example keyboard mapping:

```text
Enter / Space → Join
ArrowRight → Join
ArrowLeft  → Pass
Escape → close drawer
```

Document these behaviors through accessible hints where appropriate.

---

# 33. ACCEPTANCE CONFIRMATION DRAWER

After accepting a Moment, display a bottom confirmation drawer.

Purpose:

- reassure the user what they joined
- show current context
- show participants
- offer contribution options
- prevent accidental commitment

---

# 34. DRAWER ENTER MOTION

### Backdrop

```text
opacity: 0 → 1
```

Suggested duration:

```text
180–240ms
```

### Sheet

```text
translateY: 100% → 0
opacity: 0 → 1
```

Use a spring.

Target feel:

- quick initial movement
- controlled settle
- no bounce-heavy overshoot

Recommended baseline:

```text
stiffness: 360–400
damping: 30–36
mass: 0.8–0.9
```

---

# 35. DRAWER STRUCTURE

```text
┌──────────────────────────────────────────┐
│                 ━━━━━                    │
│                                          │
│ You're Joining                           │
│ Chai & Samosa Run                        │
│ Campus Canteen · 18m left                │
│                                          │
│  ○ ○ ○ ○ ○        7 people participating │
│                                          │
│ Say something or add your view            │
│                                          │
│ [ Photo ] [ Voice ] [ Sketch ]           │
│                                          │
│ [ CONFIRM ARRIVAL & ENTER THREAD ]       │
└──────────────────────────────────────────┘
```

---

# 36. DRAWER INTERACTION

## Close

- backdrop click
- Escape
- close button

## Drag

Optional drag-to-close.

If implemented:

- restrict to vertical movement
- add resistance
- use a sensible close threshold
- return to position when threshold isn't met

## Focus

When drawer opens:

1. move focus into drawer
2. keep keyboard focus within modal
3. restore focus to original trigger on close

---

# 37. CONTRIBUTION ACTION BAR

Options:

### Photo

Fast visual contribution.

### Voice

Short voice note.

### Sketch

Handwritten contribution.

The prototype can simulate these interactions without implementing full device recording/upload infrastructure.

---

# 38. THREAD ENTRY

After confirmation:

```text
drawer closes
      ↓
Moment screen expands
      ↓
Thread content appears
      ↓
existing contributions stagger in
      ↓
composer becomes primary next action
```

The transition should feel continuous, not like a full page reload.

---

# 39. THREAD CONTENT ENTRY MOTION

Use staggered entrance:

```text
opacity: 0 → 1
y: 12px → 0
scale: 0.98 → 1
```

Duration:

```text
180–280ms
```

Stagger:

```text
40–70ms
```

Do not stagger huge lists. Cap the first visible set.

---

# 40. BRANCH CREATION MOTION

When a new branch appears:

1. connector draws in
2. branch node fades in
3. branch label appears
4. branch content settles

Suggested sequence:

```text
SVG path
stroke-dashoffset → visible

then

node:
scale .92 → 1
opacity 0 → 1

then

label:
opacity 0 → 1
x/y settle
```

Keep total interaction under approximately 600ms.

---

# 41. DROP SYSTEM

A Drop is a synchronized social event.

## Drop definition

A temporary prompt where users participate during the same time window.

Example:

# 8:00 PM DROP

> Show us what's directly in front of you.

Time:

```text
04:59
```

CTA:

# DROP SOMETHING

---

# 42. DROP UX

A Drop should make time feel important without creating anxiety.

Hierarchy:

```text
DROP
Prompt
Countdown
Participation count
Contribution action
```

Gold should visually indicate the active temporal state.

---

# 43. DROP COUNTDOWN

Use `Space Mono`.

Example:

```text
04:59
```

Countdown behavior:

- update every 1 second
- do not re-render unrelated app components unnecessarily
- announce meaningful state changes accessibly
- do not animate every digit with layout-heavy motion

---

# 44. DROP COUNTDOWN MOTION

At each second:

- small opacity/scale emphasis may be used
- do not use exaggerated bouncing
- ensure reduced-motion mode removes the visual effect while time remains readable

At the final 10 seconds:

- stronger attention state
- no flashing strobe
- use semantic text such as `Ending soon`

---

# 45. DROP STATES

### Upcoming

```text
Starts in 08:24
```

### Active

```text
04:59 left
```

### Ending soon

```text
00:09
Ending soon
```

### Closed

```text
This Drop has ended.
View the Moment
```

---

# 46. DROP TO MOMENT TRANSITION

When a Drop ends:

```text
DROP
 ↓
contributions settle
 ↓
aggregate result appears
 ↓
living thread forms
 ↓
Moment becomes the active social object
```

The user should understand that the Drop did not disappear without purpose.

It **became an experience**.

---

# 47. VIBE SYSTEM

The Vibe selector is a core product mechanism.

## Default options

```text
☕ Chill
🎮 Play
📚 Study
🚶 Explore
🎨 Create
🍜 Eat
💬 Talk
🔥 Spontaneous
```

---

# 48. VIBE SELECTOR UI

Desktop:

- vertical or compact pill list
- selected state is clear
- optional current-context illustration

Mobile:

- horizontally scrollable row or grid
- large touch targets

Selected:

```text
background: maroon
color: white
```

or a carefully designed high-contrast equivalent.

Avoid relying only on a small checkmark.

---

# 49. VIBE TRANSITION

When user changes Vibe:

```text
current selection:
scale .98 → 1.02 → 1

content:
crossfade
```

Avoid page reloads.

The Now World should update in-place.

Possible microcopy:

> Your vibe changed.

This can appear briefly as non-blocking feedback.

---

# 50. VIBE AS FILTER, NOT DECORATION

This is critical.

Vibe must affect the Moments surfaced.

Example:

```text
CHILL
→ Chai Run
→ Evening Walk
→ Music Corner

PLAY
→ Badminton
→ Gaming
→ Chess Rush

STUDY
→ Library Grind
→ Focus Sprint
→ Problem Solving
```

Even with static mock data, the change must be observable.

---

# 51. SPARK

A Spark is a quick social trigger.

Example:

> Need badminton?

Click:

# SPARK

Then:

> Badminton Doubles

is created as a temporary Moment.

This provides a lighter creation flow than a full Moment form.

---

# 52. SPARK UX

Input should feel extremely lightweight.

Example:

```text
┌──────────────────────────────────────────┐
│ ✎  Need 2 people for badminton?          │
│                                    SPARK │
└──────────────────────────────────────────┘
```

After submit:

- micro confirmation
- new Moment appears in Now
- participant count starts at creator
- Moment receives a lifecycle timer

---

# 53. MOMENT CREATION

Full creation form:

```text
WHAT ARE YOU DOING?
[ Getting chai ]

WHERE?
[ Campus Canteen ]

VIBE
[ Chill ]

DURATION
[ 30 min ]

WHO CAN JOIN?
[ Anyone ]

[ START MOMENT ]
```

Progressive disclosure can hide advanced controls.

---

# 54. MOMENT LIFECYCLE

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

---

# 55. STARTING STATE

Visual:

- subtle entry animation
- small node
- creator indicator

Message:

> You started something.

---

# 56. ACTIVE STATE

Visual:

- live pulse
- participant count
- active timer

Message:

> 7 people are here.

---

# 57. EVOLVING STATE

Triggered when:

- contributions appear
- branch forms
- participant count changes
- new activity is detected

Visual:

- branch connector enters
- Moment may expand slightly
- related node may appear

---

# 58. CLOSING STATE

When time approaches zero:

- reduce visual intensity
- emphasize remaining time
- prevent confusing new actions if the Moment is no longer joinable

Example:

> Closing soon.

---

# 59. MEMORY STATE

After closure:

```text
Moment
Participants
Contributions
Branches
Outcome
```

Example:

# RAIN CHAOS

17 participants  
34 contributions  
3 branches  
1 meetup

---

# 60. MOMENTS ARCHIVE

This is not a traditional profile.

It is an experience archive.

Heading:

> **Things that happened.**

Organize by:

- today
- yesterday
- recent moments
- optional collections

---

# 61. MEMORY CARD DESIGN

Memory should feel like a small artifact.

Use:

- white/ivory card
- one visual contribution
- date
- title
- participant count
- tiny branch diagram
- handwritten annotation

Example:

```text
SEPTEMBER 7 · 8:00 PM

RAIN CHAOS

17 people
34 contributions
3 branches

"Ended up getting chai together."
```

---

# 62. DESKTOP RESPONSIVENESS

## 1440px+

Use full three-column layout.

## 1200–1439px

Reduce side panel width and Live World padding.

## 1024–1199px

Use two-column layout:

```text
Vibe + main
Drops move below or into a collapsible panel
```

## 768–1023px

Tablet:

- two-column where possible
- Live World can become simplified
- side content stacks below primary interaction

## Below 768px

Mobile:

- one-column
- compact top bar
- horizontal Vibe control
- Moment card stack
- drawer full width
- bottom navigation if needed

---

# 63. RESPONSIVE BEHAVIOR RULE

Do not simply shrink desktop.

Desktop and mobile should preserve the same mental model while changing composition.

```text
DESKTOP
Explore a world.

MOBILE
Move through moments.
```

---

# 64. MOBILE HOME STRUCTURE

```text
┌───────────────────────────┐
│ MOVA             ☕ Chill  │
├───────────────────────────┤
│ What's happening?         │
│                           │
│ Vibe chips → → →          │
│                           │
│ Chai Run                  │
│ 7 people · 18m            │
│                           │
│ Campus Rain               │
│ 24 people · Active        │
│                           │
│ Library Grind             │
│ 12 people · 42m           │
└───────────────────────────┘
```

The spatial graph can become a simplified visual strip or expandable view.

---

# 65. MOBILE CARD STACK

The mobile card stack is the strongest place for swipe.

Keep:

- one primary card
- partial preview of next card
- drag hints
- visible fallback buttons

Example:

```text
        ┌──────────────────────┐
        │ ☕ CHILL      18m     │
        │                      │
        │ CHAI RUN             │
        │                      │
        │ Campus Canteen       │
        │                      │
        │       7 people       │
        │                      │
        │ ← PASS     I'M IN →  │
        └──────────────────────┘
```

---

# 66. DESKTOP SWIPE SUPPORT

Desktop should not require touch.

Use:

- pointer drag
- explicit Join
- explicit Pass

Optional keyboard:

```text
← = Pass
→ = Join
```

Mouse dragging can reveal the same stamps.

---

# 67. INPUT DESIGN

Inputs should be:

- white
- clear border
- high contrast text
- generous height
- rounded
- visibly focused

Avoid:

- placeholder-only labels
- ultra-thin text
- low-contrast icons
- complex floating-label experiments unless necessary

Example:

```text
┌─────────────────────────────────────────┐
│ Start something...                      │
└─────────────────────────────────────────┘
```

---

# 68. BUTTON SYSTEM

## Primary

Deep Maroon.

Used for:

- Join
- Create
- Confirm
- Start Moment

## Secondary

White / Ivory surface with border.

## Tertiary

Text action.

## Destructive

Do not automatically use Maroon for destructive actions.

Use clear destructive semantics when necessary and ensure enough contrast.

---

# 69. BUTTON STATES

Every interactive button should support:

- default
- hover
- focus-visible
- pressed
- disabled
- loading where needed
- success

Never communicate disabled state only through color.

---

# 70. ICONOGRAPHY

Use a consistent icon library such as Lucide.

Recommended characteristics:

- simple stroke icons
- rounded geometry
- 1.75–2px visual weight
- no mixed icon styles

Examples:

- MapPin
- Clock
- Users
- Camera
- Mic
- Pencil
- Plus
- X
- Check
- Search
- Sparkles where appropriate

---

# 71. DOODLES & ILLUSTRATIONS

Doodles should support hierarchy.

Good:

- little pencil line near a Moment title
- hand-drawn circle around participant count
- tiny arrow pointing to Drop
- small activity symbol

Bad:

- giant decorative characters competing with the CTA
- random stickers on every card
- unreadable handwriting
- illustrations that look like stock assets

---

# 72. MICROCOPY

MOVA should sound human.

Preferred:

```text
What's your vibe?
What's happening?
I'm in.
Add something.
Start something.
It's quiet right now.
That moment passed.
Show us what you're seeing.
```

Avoid:

```text
Submit
Engage
Interact
Content
Social Activity
Create Post
```

---

# 73. EMPTY STATES

## No Moments

> It's quiet right now.

CTA:

> Start something.

## No matching Vibe

> Nothing matches this vibe yet.

Secondary:

> Explore everything.

## Empty Thread

> You're early.

CTA:

> Add something.

## Empty Archive

> Nothing here yet.

Supporting text:

> Join a moment. Make a memory.

---

# 74. LOADING STATES

Use skeletons only where content is actually loading.

Prefer:

- soft placeholder cards
- subtle shimmer only if necessary
- no heavy animated blobs

For mock/static data, avoid fake loading for every page.

---

# 75. SUCCESS STATES

When joining:

> You're in.

When creating:

> You started something.

When contributing:

> Added to the moment.

When Drop submission succeeds:

> Dropped.

These messages should be brief.

---

# 76. ERROR STATES

Errors must be actionable.

Example:

> Something went wrong adding your contribution.

CTA:

> Try again.

Do not expose raw stack traces or implementation details.

---

# 77. MOTION DESIGN SYSTEM

Motion should be grouped into three levels.

## Level 1 — Micro

50–180ms.

Used for:

- hover
- icon state
- button feedback
- chip selection

## Level 2 — Component

180–360ms.

Used for:

- card transitions
- drawer entry
- modal
- thread contribution
- branch appearance

## Level 3 — Spatial / Emotional

360–800ms.

Used selectively for:

- world transitions
- major state change
- Moment evolution
- memory reveal

---

# 78. MOTION EASING

Recommended:

### Micro interaction

```text
ease-out
```

### Enter

```text
cubic-bezier(.2,.8,.2,1)
```

### Exit

```text
cubic-bezier(.4,0,1,1)
```

### Spring

Use spring only where it adds physicality:

- drawer
- swipe cards
- draggable nodes

Do not use spring for every text transition.

---

# 79. REDUCED MOTION

Honor:

```css
@media (prefers-reduced-motion: reduce) {
  /* remove or minimize non-essential motion */
}
```

Reduced-motion mode should:

- disable continuous node pulsing
- remove swipe rotation
- reduce drawer motion
- remove staggered decorative entrance
- preserve state changes through instant/short fades

Functionality must remain identical.

---

# 80. PERFORMANCE RULES FOR MOTION

Prefer animating:

```text
transform
opacity
```

Avoid frequently animating:

```text
width
height
top
left
margin
padding
box-shadow
filter
```

Do not cause layout thrashing.

---

# 81. SPATIAL WORLD PERFORMANCE

The Live World is potentially expensive.

Rules:

- keep node count bounded
- use CSS transforms
- batch connectors in one SVG
- avoid one large DOM tree per node
- do not continuously animate all nodes
- pause unnecessary motion when tab is hidden
- use `prefers-reduced-motion`
- keep decorative effects shallow

If the visible world becomes crowded, cluster moments.

---

# 82. CORE WEB VITALS STRATEGY

Optimize for:

- low initial JavaScript cost
- fast largest content rendering
- minimal layout shift
- responsive interaction
- stable dimensions for media
- optimized image assets
- no unnecessary client-side libraries

Avoid adding heavy libraries only for visual novelty.

---

# 83. IMAGE STRATEGY

When images are used:

- use appropriately sized assets
- avoid loading huge originals
- provide width/height or `aspect-ratio`
- lazy-load below-the-fold images
- keep hero-critical assets optimized
- use modern formats when practical

Example:

```css
.aspect-moment {
  aspect-ratio: 4 / 3;
}
```

This reduces layout shifts.

---

# 84. FRONTEND ARCHITECTURE

Recommended:

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
│   ├── drops/
│   ├── thread/
│   ├── world/
│   └── feedback/
│
├── data/
│   ├── mockMoments.ts
│   ├── mockDrops.ts
│   ├── mockUsers.ts
│   └── mockContributions.ts
│
├── hooks/
│   ├── useVibe.ts
│   ├── useMoment.ts
│   ├── useSwipe.ts
│   └── useReducedMotion.ts
│
├── lib/
│   ├── formatting.ts
│   ├── validation.ts
│   └── accessibility.ts
│
├── types/
│   └── mova.ts
│
└── styles/
    ├── tokens.css
    ├── globals.css
    └── utilities.css
```

---

# 85. COMPONENT PRINCIPLES

Components should have one clear responsibility.

Good:

```text
MomentCard
SwipeMomentCard
MomentDrawer
ThreadNode
DropCard
VibeSelector
LiveWorld
ContributionComposer
```

Avoid:

```text
MegaDashboard
MegaMomentPage
MegaSocialComponent
```

with hundreds of unrelated responsibilities.

---

# 86. REUSABLE COMPONENT CONTRACTS

## `MomentCard`

Input:

```ts
type MomentCardProps = {
  moment: Moment;
  onJoin: (id: string) => void;
  onPass?: (id: string) => void;
  interactive?: boolean;
};
```

## `VibeSelector`

```ts
type VibeSelectorProps = {
  vibes: Vibe[];
  activeVibe: VibeId;
  onChange: (id: VibeId) => void;
};
```

## `DropCard`

```ts
type DropCardProps = {
  drop: Drop;
  onContribute: (dropId: string) => void;
};
```

---

# 87. DOMAIN TYPES

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

interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  vibe: VibeId;
  vibeDetail?: string;
}

interface Moment {
  id: string;
  title: string;
  vibe: VibeId;
  locationLabel: string;
  participantCount: number;
  startAt: string;
  endAt: string;
  status: MomentStatus;
  branchCount: number;
}

interface Contribution {
  id: string;
  momentId: string;
  authorId: string;
  type: ContributionType;
  content: string;
  createdAt: string;
  parentId?: string;
}

interface Drop {
  id: string;
  prompt: string;
  startAt: string;
  endAt: string;
  participantCount: number;
  status: 'upcoming' | 'active' | 'closed';
}
```

---

# 88. STATE MANAGEMENT

Prefer simple, explicit state.

Use local component state for:

- drawer open/closed
- temporary swipe values
- selected contribution type
- form input

Use shared state/store for:

- active Vibe
- joined Moments
- active Drop
- user-created Moments
- contribution updates

Do not introduce a global state library unless the complexity genuinely requires it.

---

# 89. NO UNNECESSARY DYNAMIC IMPORTS

For this project, do not introduce code splitting or dynamic imports merely to appear optimized.

Use them only when there is a demonstrated benefit.

Reason:

- unnecessary complexity increases failure surface
- static imports simplify component relationships
- hackathon reliability matters
- evaluation should see clean architecture, not speculative optimization

---

# 90. NO IMPERATIVE DOM MANIPULATION

Avoid patterns such as:

```js
document.querySelector(...)
element.style...
appendChild(...)
```

React should own UI state and rendering.

Use:

- refs only when appropriate
- component state
- Motion values
- declarative styles

This protects maintainability and reduces state synchronization bugs.

---

# 91. SWIPE IMPLEMENTATION REQUIREMENTS

If using Framer Motion or a comparable motion library:

- use motion values
- derive rotation/opacity from x
- centralize threshold logic
- use typed event parameters
- ensure fallback buttons use the same action handler

Example architecture:

```ts
const x = useMotionValue(0);

const rotate = useTransform(
  x,
  [-200, 0, 200],
  [-10, 0, 10]
);
```

Do not duplicate join/pass behavior across gesture and button handlers.

---

# 92. SWIPE REDUCED-MOTION BEHAVIOR

When reduced motion is requested:

- allow drag if usability remains good
- remove rotation
- remove exaggerated exits
- use direct state transitions
- preserve Join/Pass actions

Do not disable the product's core actions.

---

# 93. DRAWER IMPLEMENTATION REQUIREMENTS

Use a semantic dialog/modal pattern.

Required:

- `role="dialog"`
- `aria-modal="true"`
- accessible title
- close action
- keyboard support
- focus handling
- backdrop dismissal if appropriate

The drawer is a **modal interaction**, not simply a div fixed to the bottom.

---

# 94. ACCESSIBILITY SYSTEM

## Keyboard

Every important interaction must be keyboard accessible.

Required actions:

- navigate
- select Vibe
- open Moment
- join
- pass
- open drawer
- close drawer
- contribute
- create Moment

## Focus

Use `:focus-visible`.

Never remove focus outlines without replacing them.

---

# 95. ARIA RULES

Use labels for icon-only buttons.

Example:

```jsx
<button
  aria-label="Close moment confirmation"
>
```

Use semantic headings.

Use status announcements for important async state changes.

Example:

```text
You joined Chai Run.
```

A polite live region can communicate this without interrupting.

---

# 96. COLOR-INDEPENDENT STATUS

Do not communicate:

> Active = gold  
> Closed = grey

without text or icon support.

Use:

```text
● LIVE
⌁ CLOSING SOON
✓ CLOSED
```

Color becomes reinforcement.

---

# 97. FORM ACCESSIBILITY

Every input needs:

- associated label
- useful placeholder if needed
- visible error message
- validation state
- keyboard support
- reasonable autocomplete/input mode

Never use placeholder as the sole label.

---

# 98. SECURITY & DATA SANITIZATION

Even with mock data, implement defensive boundaries.

## User-entered text

Do not inject raw HTML.

Render text as text.

Avoid:

```tsx
dangerouslySetInnerHTML
```

unless there is a real, sanitized rich-text requirement.

If rich text is introduced later:

- sanitize at a defined boundary
- allow only a strict subset of markup
- never trust user-provided HTML

---

# 99. INPUT VALIDATION

Validate:

- title length
- Vibe selection
- duration
- text contribution
- Moment creation fields

Example:

```ts
const MAX_MOMENT_TITLE = 80;
const MAX_CONTRIBUTION = 500;
```

Trim strings before storing.

Reject empty whitespace-only input.

---

# 100. SAFE URL HANDLING

If avatars, media, or links can be user-provided:

- validate protocol
- avoid unsafe `javascript:` URLs
- prefer known asset paths for mock data
- do not blindly interpolate URLs into DOM attributes

---

# 101. MOCK DATA SAFETY

Mock/static data should be deterministic.

Avoid:

```ts
Math.random()
```

on every render.

Prefer fixed IDs and deterministic seed data.

This helps:

- predictable testing
- stable screenshots
- consistent demo
- reproducible evaluation

---

# 102. RELIABILITY PRINCIPLE

Every major action should have one source of truth.

Example:

```text
Join button
Swipe right
Keyboard Enter
```

must all call:

```ts
handleJoin(moment.id)
```

not three separate implementations.

---

# 103. TESTING STRATEGY

Testing should prioritize high-value flows.

## Unit tests

Test:

- Vibe filtering
- time remaining calculations
- Moment status transitions
- validation functions
- swipe threshold logic
- contribution creation

## Component tests

Test:

- Vibe selection
- MomentCard button actions
- drawer open/close
- Drop countdown state
- empty states
- keyboard interactions

## Interaction tests

Test:

```text
Open → Vibe → Join → Drawer → Enter Thread
```

and:

```text
Open → Swipe Right → Drawer → Confirm → Thread
```

---

# 104. CRITICAL USER FLOW TEST MATRIX

| Flow | Expected Result |
|---|---|
| Select Chill | Live Moments update |
| Select Play | Play moments become prioritized |
| Click Join | Confirmation opens |
| Swipe Right | Confirmation opens |
| Swipe Left | Card is passed |
| Escape drawer | Drawer closes |
| Confirm arrival | User enters Thread |
| Add text contribution | New Thread contribution appears |
| Create Moment | New Moment enters Now |
| Drop countdown reaches zero | Drop closes |
| Closed Moment | Moves to archive |
| Keyboard navigation | All primary actions remain usable |

---

# 105. VISUAL REGRESSION CHECKS

Before submission, check at:

```text
375 × 812
390 × 844
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1920 × 1080
```

Look for:

- overflow
- clipped text
- drawer cutoff
- hidden CTA
- node overlap
- broken connectors
- unexpected wrapping
- excessive whitespace
- incorrect hierarchy

---

# 106. PERFORMANCE AUDIT

Before final submission inspect:

- bundle size
- console warnings
- unnecessary rerenders
- long-running animations
- image sizes
- layout shifts
- DOM depth
- unused dependencies
- excessive event listeners

Do not optimize blindly.

Use simple, high-confidence improvements.

---

# 107. RUNTIME EFFICIENCY

## Prefer

- CSS transitions
- transform/opacity
- memoized derived calculations where useful
- stable mock data references
- event handlers that don't trigger unrelated global state updates
- limited active animations

## Avoid

- continuous React state updates for purely visual animation
- repeated expensive filtering during animation
- large arrays recreated every render
- unnecessary effects
- interval per Moment
- interval per node

For countdowns, centralize timing updates where possible.

---

# 108. COUNTDOWN ARCHITECTURE

Prefer one timer source for a screen rather than one interval per card.

Example conceptual approach:

```text
Now Screen
   ↓
one clock
   ↓
derive timeRemaining(moment)
   ↓
render cards
```

This prevents dozens of independent intervals.

For static demo:

- compute from timestamps
- update UI on a shared cadence

---

# 109. VISIBILITY-AWARE ANIMATION

When the browser tab is hidden:

- pause nonessential continuous animation
- pause expensive loops
- resume on visibility

This keeps the prototype efficient without affecting UX.

---

# 110. TECHNICAL SPECIFICATION ALIGNMENT

The final implementation must preserve:

### Product

- Moments are primary social objects.
- Vibe influences discovery.
- Drops synchronize participation.
- Threads branch.
- Memories archive experiences.

### Visual

- white canvas
- required five-color palette
- tactile bento
- handwriting accents
- spatial node world

### Interaction

- swipe left/pass
- swipe right/join
- bottom confirmation drawer
- contribution flow
- Moment lifecycle

### Responsive

- desktop Live World
- tablet adaptive layout
- mobile moment stack

---

# 111. DESIGN ANTI-PATTERNS

Never let MOVA become:

### Instagram clone

No:

- feed
- hearts
- follower count
- creator ranking

### Reddit clone

No:

- endless nested comments
- upvote/downvote as primary mechanic

### Twitter clone

No:

- public text feed
- repost/quote workflow as core mechanic

### Dating clone

Swipe is a navigation mechanic, not a person-rating mechanic.

Cards represent **Moments**, never people.

---

# 112. IMPORTANT SWIPE SEMANTIC RULE

Never make the UI imply:

```text
Swipe = judge this person
```

It must mean:

```text
Swipe = decide whether this Moment fits me
```

The Moment is being selected.

People are not being ranked.

---

# 113. DESIGNING FOR ATTENTION WITHOUT MANIPULATION

MOVA should feel engaging without dark-pattern mechanics.

Avoid:

- fake urgency
- fake participant counts
- infinite scrolling
- deceptive notifications
- shame-based streaks
- hidden autoplay
- forced interaction

Timers represent actual Moment/Drops duration in the product model.

---

# 114. PARTICIPANT REPRESENTATION

Use small avatar circles, names, or anonymous participant markers.

Important:

Do not make participant count look like a vanity metric.

Example:

```text
● ● ● ● ●
5 participating now
```

Rather than:

```text
5,482 followers
```

The count communicates **presence**, not popularity.

---

# 115. LIVE PRESENCE INDICATOR

Optional indicator:

```text
● LIVE
```

Animation:

- small opacity pulse
- no high-frequency flashing

For reduced motion:

- static dot + label

---

# 116. SEARCH

Search should answer:

> Find a Moment, place, Vibe, or activity.

Placeholder:

```text
Search moments, spots, vibes...
```

Search categories:

- Moments
- Vibes
- Context
- Locations

Do not turn search into a replacement feed.

---

# 117. FILTERS

Potential filters:

```text
All
Nearby
Ending Soon
My Vibe
New
```

Keep filters horizontal and lightweight.

Selected state should be obvious.

---

# 118. DESKTOP LIVE WORLD INTERACTION

Click node:

```text
node selected
   ↓
node grows slightly
   ↓
side panel / Moment panel opens
   ↓
background world remains visible
```

Do not fully navigate away unless necessary.

This reinforces the "world" metaphor.

---

# 119. NODE HOVER

Desktop hover can show a small preview:

```text
☕ Chai Run

7 people
18m left

Click to enter
```

Animation:

```text
opacity .85 → 1
scale .98 → 1
```

Do not create large hover jumps.

---

# 120. NODE SELECTION

Selected Moment:

- maroon outer stroke
- gold participation indicator
- stronger label
- connected branch paths become more visible

Other unrelated nodes can reduce opacity slightly.

Avoid making the background invisible.

---

# 121. LIVE WORLD EMPTY STATE

If no active Moments:

```text
THE WORLD IS QUIET

Nothing is happening here yet.

[ START SOMETHING ]
```

Optional subtle hand-drawn arrow pointing toward Create.

---

# 122. DRAWER + WORLD COMBINATION

When drawer opens from Live World:

- world should remain behind
- selected Moment node remains visually connected
- backdrop dims page
- drawer takes focus

This creates a spatial relationship:

```text
WORLD
  ↓
selected Moment
  ↓
drawer
```

---

# 123. CREATE MOMENT ANIMATION

On open:

```text
button
 ↓
form panel scales/fades in
```

Fields appear in a short stagger.

Do not overanimate every input.

The form should feel immediate.

---

# 124. JOIN SUCCESS

After confirmation:

```text
button:
"I'm in"
   ↓
"You're in"
   ↓
participant count +1
   ↓
small avatar enters participant stack
```

The new participant avatar may:

```text
scale .8 → 1
opacity 0 → 1
```

This makes participation feel tangible.

---

# 125. PARTICIPANT STACK ANIMATION

When a new participant joins:

- avatar enters from right
- overlap position settles
- count increments

Avoid shifting the entire card layout excessively.

Reserve stable space for counts.

---

# 126. CONTRIBUTION COMPOSER

Mobile:

```text
[ + ] Add something...
```

Opening:

```text
Photo
Voice
Sketch
Text
```

Desktop can keep these actions inline.

The composer should always make the next action obvious.

---

# 127. TEXT CONTRIBUTION

Example:

```text
Say something about this moment...

[              ]
[ ADD ]
```

Limit length.

Show remaining count only when useful.

Example:

```text
0 / 500
```

Avoid persistent distracting character counters for very short fields.

---

# 128. VOICE CONTRIBUTION MOCK

For frontend prototype:

Show realistic UI:

```text
● 00:08

[ Stop ]
```

Then:

```text
Voice contribution ready

[ Add ]
[ Cancel ]
```

Do not fake browser permission flows in a misleading way.

---

# 129. SKETCH CONTRIBUTION MOCK

Use a simple canvas if implemented.

Requirements:

- pointer drawing
- clear
- undo if easy
- save
- keyboard fallback where possible

Do not make drawing mandatory to understand the product.

---

# 130. SECURITY OF SKETCH / MEDIA

If media is stored only in client state for the prototype:

- validate type if using file input
- restrict size
- use object URLs safely
- revoke object URLs when no longer needed

---

# 131. DATA FLOW

Recommended:

```text
Mock Data
    ↓
Domain Models
    ↓
Derived Selectors
    ↓
UI Components
    ↓
User Interaction
    ↓
State Mutation
    ↓
UI Re-render
```

Keep data and presentation separate.

---

# 132. DERIVED DATA

Examples:

```ts
getMomentsForVibe(moments, vibe)
getTimeRemaining(moment, now)
getMomentStatus(moment, now)
getThreadChildren(contributions, parentId)
```

These should be pure functions where possible.

Pure functions are easier to test.

---

# 133. AVOID RANDOMIZED DEMO STATE

The judge should see the same polished experience every run.

Do not rely on unpredictable:

- random node positions
- random participant counts
- random Moment titles
- random branch positions

Use deterministic layout data.

---

# 134. SPATIAL LAYOUT DATA

Example:

```ts
type WorldNodePosition = {
  x: number;
  y: number;
};

const worldPositions = {
  chai: { x: 28, y: 40 },
  rain: { x: 62, y: 26 },
  study: { x: 45, y: 68 },
};
```

Use percentages rather than hard-coded viewport pixels where appropriate.

This keeps the world responsive.

---

# 135. RESPONSIVE SPATIAL LAYOUT

Desktop:

```text
x/y percentages
```

Tablet:

- fewer nodes
- cluster related moments

Mobile:

- use a simplified list
- optionally open the World as an expandable panel

Do not squeeze 15 interconnected nodes into a narrow phone viewport.

---

# 136. DESIGN SYSTEM FILE ORGANIZATION

Recommended:

```text
design/
├── tokens.md
├── components.md
├── motion.md
├── accessibility.md
├── architecture.md
└── DESIGN.md
```

But for the hackathon, this master document remains the canonical implementation brief.

---

# 137. FIGMA / DESIGN HANDOFF PRINCIPLES

Every designed component should include:

- default
- hover
- focus
- active
- selected
- disabled
- loading
- empty
- error
- success

And where relevant:

- mobile
- tablet
- desktop
- reduced motion

---

# 138. COMPONENT STORY REQUIREMENT

Each major component should have a predictable demo state.

Examples:

### Moment Card

- normal
- selected
- joining
- passed
- expired

### Drop

- upcoming
- active
- ending
- closed

### Vibe

- default
- selected
- hover
- keyboard focus

This also improves testability.

---

# 139. ROUTING

Use simple route structure:

```text
/
 /now
 /vibe
 /drops
 /moments
 /moments/:id
```

For a small hackathon implementation, shallow routing can be acceptable.

Do not create complex route architecture without need.

---

# 140. DEEP-LINKING

Moment details should ideally be addressable:

```text
/moments/chai-run
```

Even with mock data.

This makes the demo more coherent and gives each state a stable URL when using a router.

---

# 141. PERSISTENCE

For a frontend-only prototype:

Optional:

```text
localStorage
```

for:

- current Vibe
- joined Moments
- created Moments
- basic preferences

Use only if it improves the demo.

Do not make persistence mandatory if it increases risk.

---

# 142. MOCK REAL-TIME SIMULATION

MOVA can feel alive without a backend.

Use deterministic timed simulations.

Example:

```text
Every 10–20 seconds:
- a participant count changes
- a contribution appears
- a branch becomes active
```

Do not simulate excessive activity.

The goal is believable, not chaotic.

Use a single simulation controller rather than many independent timers.

---

# 143. REAL-TIME SIMULATION SAFETY

When simulation runs:

- clean timers on unmount
- avoid state updates after unmount
- pause when the app is hidden if nonessential
- keep deterministic enough for screenshots

---

# 144. APP ERROR BOUNDARY

Use an error boundary around the main application.

If a component fails:

```text
Something went wrong.

[ Reload view ]
```

Do not expose stack traces to users.

---

# 145. CONSOLE HYGIENE

Before submission:

- no uncaught errors
- no repeated warnings
- no failed network requests that are unnecessary
- no debug logs
- no broken image references

---

# 146. TYPESCRIPT QUALITY

Prefer:

```ts
type
interface
union types
narrowing
```

Avoid:

```ts
any
```

unless there is a documented reason.

Use explicit event types.

Example:

```ts
const handleDragEnd = (
  _event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) => { ... }
```

Keep domain types centralized.

---

# 147. NULL / UNDEFINED SAFETY

Data may be incomplete.

Handle optional values safely.

Do not assume:

```ts
moment.location
moment.participants
moment.contributions
```

always exist unless the type guarantees them.

This prevents runtime failures.

---

# 148. ANIMATION COMPONENT BOUNDARIES

Prefer:

```text
SwipeMomentCard
MomentDrawer
ThreadBranch
DropCountdown
```

rather than putting all animation state into the page component.

This isolates complexity and improves testing.

---

# 149. CLEAN CODE RULE

Every component should answer:

> What UI responsibility does this own?

If the answer is several unrelated things, split it.

---

# 150. NO PREMATURE ABSTRACTIONS

Do not create:

```text
UniversalCardFactory
DynamicInteractionEngine
GenericSocialPrimitive
```

just to appear architecturally advanced.

Abstract repeated patterns only when repetition is real.

---

# 151. EVALUATION OPTIMIZATION MODEL

The engineering process must follow:

```text
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
PRESERVE BASELINE
  ↓
CONTINUE
```

Never make a large architectural change without verifying that it improved the actual result.

---

# 152. EVALUATION PARAMETERS

Optimize around the following scoring dimensions:

## 1. Code Quality & Clean Architecture

Evaluator should see:

- modular components
- clear naming
- typed data
- minimal duplication
- predictable state
- clean boundaries
- maintainable structure

## 2. Security & Data Sanitization

Evaluator should see:

- safe text rendering
- input validation
- no unsafe HTML injection
- safe URLs
- reasonable media checks

## 3. Runtime Efficiency & Core Web Vitals

Evaluator should see:

- limited client work
- efficient animation
- no avoidable layout shifts
- optimized assets
- limited effects
- stable rendering

## 4. Component Testing & Reliability

Evaluator should see:

- testable pure logic
- stable component behavior
- high-value flow coverage
- predictable UI states

## 5. Accessibility

Evaluator should see:

- semantic HTML
- keyboard support
- ARIA where needed
- visible focus
- reduced-motion support
- non-color state communication
- accessible dialogs

## 6. Technical Specification Alignment

Evaluator should see:

- correct colors
- correct layout
- correct interactions
- correct responsive behavior
- correct product concept

---

# 153. SCORE-PRESERVATION RULE

Before changing an existing working implementation:

1. record the current baseline
2. identify the specific issue
3. make the smallest safe change
4. run tests
5. run build
6. inspect visual behavior
7. compare against baseline
8. keep only improvements that do not introduce regressions

Do not trade a stable implementation for speculative optimization.

---

# 154. HIGH-RISK CHANGES TO AVOID

Avoid unless evidence requires them:

- rewriting the routing architecture
- changing the state-management system
- replacing the animation library
- adding heavy libraries
- dynamic imports everywhere
- imperative DOM hacks
- rewriting all CSS late in the project
- redesigning the entire navigation after polish
- large dependency upgrades during final hours

---

# 155. AUDIT CHECKLIST — CODE

Before final submission:

```text
[ ] No TypeScript errors
[ ] No runtime exceptions
[ ] No console warnings
[ ] No dead imports
[ ] No obvious duplicated logic
[ ] No unnecessary any
[ ] No direct unsafe HTML injection
[ ] No imperative DOM manipulation
[ ] Components have clear responsibilities
[ ] Data types are centralized
[ ] Major interactions have shared handlers
[ ] Timers are cleaned up
[ ] No unnecessary repeated intervals
```

---

# 156. AUDIT CHECKLIST — PERFORMANCE

```text
[ ] Images are optimized
[ ] No huge uncompressed assets
[ ] No layout shifts from media
[ ] Motion uses transform/opacity where possible
[ ] Hidden tab does not run unnecessary loops
[ ] Live World node count is bounded
[ ] Thread rendering is bounded/virtualized if ever large
[ ] No heavy library without clear value
[ ] Initial page renders quickly
```

---

# 157. AUDIT CHECKLIST — ACCESSIBILITY

```text
[ ] Keyboard can complete primary flow
[ ] All icon buttons have accessible names
[ ] Dialog has accessible title
[ ] Focus enters dialog
[ ] Focus returns after close
[ ] Escape closes modal where appropriate
[ ] Focus-visible styles exist
[ ] Color is not the only status signal
[ ] Reduced motion is implemented
[ ] Form labels exist
[ ] Error messages are meaningful
[ ] Touch targets are comfortable
```

---

# 158. AUDIT CHECKLIST — VISUAL

```text
[ ] Background is #FFFFFF
[ ] Palette remains controlled
[ ] Deep Maroon reserved for primary actions
[ ] Gold used for temporal/live attention
[ ] Rose used as secondary relationship accent
[ ] Handwritten font is selective
[ ] Body copy remains readable
[ ] Bento cards feel cohesive
[ ] Spatial world is legible
[ ] No accidental gradients
[ ] No inconsistent radius values
[ ] No random shadow styles
```

---

# 159. AUDIT CHECKLIST — UX

```text
[ ] User understands product within seconds
[ ] Vibe affects discovery
[ ] Moment can be joined
[ ] Swipe has visible fallback
[ ] Confirmation drawer explains what is happening
[ ] Thread is understandable
[ ] Drop is clearly time-based
[ ] Moment can be created
[ ] Closed Moment becomes memory
[ ] Empty/error states are useful
```

---

# 160. JUDGE DEMO FLOW

The demo should tell the product story in under a few minutes.

## Step 1

Landing:

> **Don't Follow People. Follow Moments.**

## Step 2

Choose Vibe:

> ☕ Chill

## Step 3

Now updates:

> Chai Run  
> Evening Walk  
> Music Corner

## Step 4

Open / swipe:

> **I'm in**

## Step 5

Drawer:

> 7 people participating

## Step 6

Enter Thread.

## Step 7

Show:

> photo + voice + text + branch

## Step 8

Show active Drop:

> **04:59**

## Step 9

Submit contribution.

## Step 10

Show Moment evolving.

## Step 11

Close Moment.

## Step 12

Show:

> **Memory created.**

---

# 161. JUDGE NARRATIVE

The verbal story:

> Most social platforms are built around people and content. We wanted to experiment with a different social primitive: the moment itself.
>
> MOVA starts with your current Vibe. It shows you what is happening now, lets you join temporary Moments, brings people together through synchronized Drops, and lets contributions branch into living Threads.
>
> Instead of endlessly consuming content, users participate in experiences.
>
> A Moment can change the next Moment.
>
> That is why the product loop is:
>
> **Vibe → Discover → Join → Contribute → Evolve → Remember.**

---

# 162. VISUAL STORYTELLING

The first screen should visually communicate the concept without explanation.

Use:

```text
NOW
WHAT'S HAPPENING?

● CHAI RUN
● RAIN CHAOS
● LIBRARY GRIND
● FOOTBALL
```

The world is active.

The user then selects a Vibe.

The world changes.

This demonstrates that the UI itself embodies the product idea.

---

# 163. DESIGN DETAILS THAT CREATE POLISH

Small details should be intentional:

### Moment card

- tiny scribble beside title
- subtle countdown
- stable avatar stack
- hand-drawn location underline

### Drop

- gold timer
- clear live indicator
- countdown typography
- small contextual doodle

### Thread

- dashed connector
- branch label
- varied contribution types

### Memory

- slightly imperfect annotation
- timestamp
- participant artifact

These should feel like one visual language.

---

# 164. DOODLE ROTATION

Small handwritten labels may use slight rotation:

```text
-2deg
+1deg
+2deg
```

Do not rotate every label.

Use rotation only on expressive elements.

---

# 165. ORGANIC BENTO RULES

Cards should not all look identical.

Vary:

- size
- alignment
- content density

But preserve:

- radius
- typography
- border treatment
- spacing rhythm

This creates personality without chaos.

---

# 166. BENTO GRID RULE

Use CSS Grid.

Avoid arbitrary absolute positioning for the primary application layout.

Absolute positioning is acceptable for:

- decorative doodles
- node overlays
- small badge placement
- SVG connectors

Not for the entire responsive shell.

---

# 167. LIVE WORLD POSITIONING RULE

The World can use relative/absolute positioning within its own bounded canvas.

Outside it:

Use normal document flow / grid / flex.

This prevents responsive layout bugs.

---

# 168. SCROLL BEHAVIOR

Desktop:

- page scrolling is acceptable
- inner scrolling should be limited
- avoid multiple nested scroll areas

Mobile:

- prefer one primary scroll context
- drawers can independently scroll when necessary

Avoid scroll-jacking.

---

# 169. HEADER BEHAVIOR

Desktop header can be sticky if useful.

It must not consume excessive vertical space.

Mobile header should remain compact.

Avoid fixed headers that cover content without appropriate offset.

---

# 170. Z-INDEX SYSTEM

Define a simple hierarchy:

```text
base content      0
floating controls 10
popover           20
backdrop          40
drawer            50
critical toast    60
```

Avoid arbitrary z-index values such as:

```text
9999
100000
999999
```

unless truly necessary.

---

# 171. TOASTS / FEEDBACK

Toasts should be:

- brief
- dismissible where appropriate
- accessible
- non-blocking

Examples:

> You're in.

> Vibe updated.

> Added to the moment.

Do not make every button click create a toast.

---

# 172. NOTIFICATION PHILOSOPHY

Do not create notification spam.

For prototype:

- keep notification UI minimal
- prioritize Moment state
- use direct context instead

MOVA should not become another platform demanding attention.

---

# 173. OPTIONAL "LIVE ACTIVITY" RIBBON

A small ribbon can show:

```text
24 people active
142 joined today
2 Drops live
```

Use it sparingly.

These are context metrics, not vanity statistics.

---

# 174. METRICS SEMANTICS

Prefer:

```text
24 active
7 participating
18m left
```

Avoid:

```text
2.4K likes
13.5K followers
```

The numbers should describe the social state.

---

# 175. MOCK CONTENT EXAMPLES

## Chill

**Chai & Samosa Run**  
Campus Canteen · 7 participating · 18m

## Study

**Library Calculus Sprint**  
2nd Floor Quiet Zone · 12 participating · 42m

## Play

**Badminton Doubles Match**  
Hostel Court 2 · 3 participating · 25m

## Explore

**Sunset Walk**  
Main Gate · 5 participating · 31m

## Create

**Poster Jam**  
Studio 3 · 6 participating · 55m

---

# 176. DROP EXAMPLES

### DROP 01

> Show us what's directly in front of you right now.

### DROP 02

> What does your evening sound like?

### DROP 03

> Find the weirdest thing around you.

### DROP 04

> Show us the sky.

### DROP 05

> What is happening where you are?

---

# 177. THREAD EXAMPLE

```text
MOMENT: CAMPUS RAIN

User 1
"Rain just started."

    │
    ├── User 2
    │   [PHOTO]
    │
    ├── User 3
    │   "Canteen is packed."
    │
    │        │
    │        └── BRANCH: TEA RUN
    │              6 joined
    │
    └── User 4
        [VOICE]
```

The branch itself is the storytelling mechanism.

---

# 178. MEMORY EXAMPLE

```text
SEPTEMBER 7
8:00 PM

CAMPUS RAIN

23 people
41 contributions
4 branches

Started as a Drop.
Ended as a chai run.
```

This is more emotionally meaningful than a list of posts.

---

# 179. DESIGN TOKEN SOURCE OF TRUTH

All UI colors should come from tokens.

Do not scatter arbitrary hex codes across JSX.

Bad:

```tsx
className="bg-[#8B1E3F]"
```

everywhere.

Better:

```tsx
className="bg-mova-maroon"
```

or CSS variable utilities.

Central tokens make visual adjustment safer.

---

# 180. COMPONENT VARIANT SOURCE OF TRUTH

Use variants for:

```text
button
badge
Moment status
Vibe state
card density
drawer state
```

Do not create one-off styles for every instance.

---

# 181. TEST DATA SOURCE OF TRUTH

Keep mock data out of presentation components.

Bad:

```tsx
<MomentCard
  title="Chai Run"
  participants={7}
  ...
/>
```

repeated dozens of times.

Better:

```ts
mockMoments
```

mapped into components.

---

# 182. NO HARDCODED BUSINESS LOGIC IN JSX

Do not embed:

```text
if participants > 10 → ...
```

in multiple components.

Put product logic in selectors or utility functions.

---

# 183. FORM VALIDATION SOURCE OF TRUTH

Centralize:

```ts
validateMomentInput()
validateContribution()
```

This improves consistency and testability.

---

# 184. EVALUATION-SAFE DEPENDENCY POLICY

Before adding a library ask:

1. Does it solve a real problem?
2. Does it significantly improve UX?
3. Does it increase bundle size?
4. Does it overlap with current dependencies?
5. Can the behavior be implemented cleanly without it?

Prefer the smallest reliable dependency set.

---

# 185. RECOMMENDED CORE STACK

A sensible frontend baseline:

```text
React
TypeScript
Vite
Tailwind CSS or organized CSS
Framer Motion
Lucide React
Vitest + React Testing Library
```

Do not add a backend for the judged MVP unless the challenge changes.

---

# 186. OPTIONAL LIBRARIES

Only add when necessary:

- schema validation library
- lightweight state store
- router
- image utility
- accessibility helper

Do not add multiple libraries that solve the same problem.

---

# 187. BUILD ORDER

## Phase 1 — Foundation

- project structure
- tokens
- typography
- app shell
- routing
- mock data
- base components

## Phase 2 — Core UX

- Vibe
- Now
- Moment card
- Join
- drawer
- Thread

## Phase 3 — Signature Visuals

- Live World
- nodes
- connectors
- Drop
- Memory

## Phase 4 — Motion

- swipe
- drawer
- thread entrance
- node pulse
- Moment transitions

## Phase 5 — Reliability

- accessibility
- validation
- error states
- tests

## Phase 6 — Evaluation

- performance audit
- responsive audit
- code cleanup
- visual polish
- regression testing

---

# 188. BUILD PRIORITY

If time becomes limited:

### Tier 1 — Must work

- Vibe
- Moment discovery
- Join
- Drawer
- Thread
- Drop
- responsive layout

### Tier 2 — High visual value

- Live World
- spatial branches
- polished swipe
- Memory artifact

### Tier 3 — Nice to have

- voice mock
- sketch
- advanced simulation
- richer event calendar

Never sacrifice Tier 1 reliability for Tier 3 decoration.

---

# 189. FINAL QUALITY BAR

Before considering MOVA finished, the project should feel:

### Conceptually

Different from conventional social media.

### Visually

Distinctive and coherent.

### Interaction-wise

Physical and responsive.

### Technically

Clean and predictable.

### Accessibility-wise

Usable with keyboard and reduced motion.

### Performance-wise

Light enough to feel immediate.

### Evaluation-wise

Easy for an evaluator to map to the stated requirements.

---

# 190. FINAL PRE-SUBMISSION GATE

## Product

```text
[ ] "Don't Follow People. Follow Moments." is obvious
[ ] Vibe is functional
[ ] Moments are the main social object
[ ] Drops work
[ ] Threads branch
[ ] Memories archive
```

## UI/UX

```text
[ ] White background
[ ] Required palette
[ ] Bento style
[ ] Handwritten accents
[ ] Clear hierarchy
[ ] Responsive layouts
[ ] Empty/error states
```

## Motion

```text
[ ] Swipe left/pass
[ ] Swipe right/join
[ ] Accept stamp
[ ] Pass stamp
[ ] Drawer fade + slide
[ ] Thread entrance
[ ] Branch animation
[ ] Drop countdown
[ ] Reduced motion
```

## Engineering

```text
[ ] TypeScript clean
[ ] Components modular
[ ] No unsafe HTML injection
[ ] No unnecessary DOM manipulation
[ ] No unnecessary dynamic imports
[ ] Timers cleaned up
[ ] Tests pass
[ ] Build passes
[ ] Console clean
```

## Evaluation

```text
[ ] Code Quality
[ ] Security/Data Sanitization
[ ] Runtime Efficiency
[ ] Core Web Vitals
[ ] Component Reliability
[ ] Accessibility
[ ] Technical Specification Alignment
```

---

# 191. FINAL PRODUCT LOOP

The complete MOVA system should be understandable as:

```text
                         ┌──────────────┐
                         │    VIBE      │
                         │ "What's my   │
                         │  state?"     │
                         └──────┬───────┘
                                ↓
                         ┌──────────────┐
                         │     NOW      │
                         │ "What's      │
                         │ happening?"  │
                         └──────┬───────┘
                                ↓
                         ┌──────────────┐
                         │    MOMENT    │
                         │ "Can I join?"│
                         └──────┬───────┘
                                ↓
                     ┌──────────┴──────────┐
                     ↓                     ↓
                SWIPE / JOIN            PASS
                     │
                     ↓
              ┌──────────────┐
              │ CONFIRMATION │
              │    DRAWER    │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │    THREAD    │
              │ "Add to it." │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │     DROP     │
              │ "Experience  │
              │  together."  │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │   EVOLVE     │
              │   / BRANCH   │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │   MEMORY     │
              │ "What did we │
              │  experience?"│
              └──────┬───────┘
                     ↓
                  NEW VIBE
```

---

# 192. FINAL DESIGN PRINCIPLE

> **MOVA is not a feed with a different color palette.**

Its interface, interaction model, motion, information architecture, and frontend architecture must all reinforce one idea:

# **Social should feel like something you enter, not something you endlessly scroll.**

The visual system expresses this through:

**Bento surfaces → tactile personality**

**Spatial nodes → social activity**

**Vibes → current state**

**Moments → temporary experiences**

**Swipes → lightweight decisions**

**Drawer → commitment confirmation**

**Threads → collective evolution**

**Drops → synchronized participation**

**Memories → experiences that remain after the moment is gone**

And the engineering system protects that experience through:

**clean architecture → safe data boundaries → performant motion → reliable components → accessible interaction → specification fidelity.**

---

# 193. IMPLEMENTATION COMMANDMENT

When making any future design or code decision, ask:

> **Does this make MOVA feel more like a living social world, while remaining clear, accessible, performant, maintainable, and faithful to the specification?**

If yes, keep it.

If not, remove it.

---

# END — MOVA COMPLETE PRODUCT DESIGN + FRONTEND ENGINEERING SPECIFICATION
