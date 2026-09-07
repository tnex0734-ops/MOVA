# MOVA — Product Requirements Document (PRD)

## Don't Follow People. Follow Moments.

**Product:** MOVA  
**Format:** Responsive Social Web App  
**Category:** Next-Generation Social Interaction  
**Implementation:** Frontend-only, mock/static data allowed  
**Primary Audience:** Gen Z / young adults  
**Document Type:** Hackathon Product Requirements Document  
**Version:** 1.0

---

# 1. Product Overview

## 1.1 What is MOVA?

MOVA is a **social web app built around real-time moments rather than permanent profiles and content feeds**.

Traditional social platforms are organized around people:

- Follow people
- View their posts
- Like their content
- Comment
- Scroll
- Repeat

MOVA changes the core social unit.

Instead of asking:

> **“Who do you want to follow?”**

MOVA asks:

> **“What are you doing, feeling, or experiencing right now?”**

Users express a current **Vibe**, discover what is happening in the **Now**, join or create temporary **Moments**, participate in synchronized **Drops**, and contribute to living **Threads** that evolve as more people participate.

The result is a social experience focused on **participation over consumption**.

---

# 2. Product Thesis

## 2.1 The Problem

Most social platforms are optimized for an endless content loop:

**Content → Scroll → Reaction → More Content → Scroll**

This creates a social experience where users often become spectators.

The challenge is to rethink social interaction beyond:

- Infinite feeds
- Likes
- Followers
- Static profiles
- Creator-centric content
- Comment sections
- Algorithmic content consumption

MOVA explores a different model:

> **Social interaction should be about entering shared moments, not watching other people's lives from a distance.**

---

# 3. Core Product Idea

## 3.1 The MOVA Loop

MOVA combines three core concepts:

### VIBE
**What are you up for right now?**

Users communicate their current state, intention, or social energy.

### DROP
**A synchronized moment everyone can participate in.**

At a specific time, the community receives a temporary prompt or event.

### THREAD
**The moment evolves as people contribute.**

Instead of comments appearing beneath a post, contributions become part of a living, branching experience.

Together they create the central loop:

```text
VIBE
  ↓
DISCOVER
  ↓
JOIN A MOMENT
  ↓
DROP
  ↓
CONTRIBUTE
  ↓
THREAD EVOLVES
  ↓
NEW ACTIVITY EMERGES
  ↓
NEW VIBE
  ↓
REPEAT
```

### Product Principle

> **People don't build audiences. They build moments.**

---

# 4. Product Positioning

## 4.1 One-Line Definition

> **MOVA is a social web experience where people connect through what is happening now instead of following people through an endless feed.**

## 4.2 Tagline

# Don't Follow People. Follow Moments.

## 4.3 Supporting Statement

> Share your current vibe, discover live moments, join collective Drops, and help experiences evolve into memories.

---

# 5. What Makes MOVA Different?

| Traditional Social | MOVA |
|---|---|
| Follow people | Join moments |
| Profiles | Current Vibe |
| Posts | Live Moments |
| Likes | Participation |
| Comments | Contributions / Branches |
| Followers | Participants |
| Feed | Live World |
| Infinite scroll | Temporary experiences |
| Creator-centric | Collective |
| Content consumption | Social participation |
| Permanent content | Time-based experiences |
| Popularity | Presence |
| Audience | Community in the moment |

MOVA should never feel like a redesigned Instagram feed.

The product must communicate a different social philosophy from the first interaction.

---

# 6. Target Users

## Primary Users

Gen Z users and young adults who:

- Want spontaneous social interaction
- Frequently discover things through communities
- Enjoy lightweight participation
- Prefer shared experiences over formal networking
- Want to find people doing similar things
- Like discovering what is happening around them
- Enjoy visual, interactive digital experiences

## Example User

### Arun

Arun has finished class at 6:30 PM.

He opens MOVA.

Instead of seeing a feed, MOVA asks:

> **What's your vibe?**

He selects:

**☕ Chill**

MOVA shows:

- Chai Run — 6 people
- Evening Walk — 3 people
- Campus Jam — 12 people

Arun joins Chai Run.

Someone contributes:

> “Meet near Block B.”

Another person posts:

> “I'm bringing samosas.”

The moment evolves into:

### CHAI + SNACK RUN

Arun joins.

The interaction started with a Vibe and ended with a real-world social experience.

---

# 7. Core Product Principles

## 7.1 Participation Over Consumption

Every major screen should provide a meaningful reason to participate.

## 7.2 Temporary Over Permanent

Moments should have a beginning, active state, and end.

## 7.3 Context Over Popularity

Show users things that are relevant to their current state, place, and time rather than popularity metrics.

## 7.4 Collective Over Individual

Content should feel like something people are building together.

## 7.5 Lightweight Interaction

Users should be able to contribute with a tap, photo, short text, voice note, or quick action.

## 7.6 No Engagement Theater

Avoid designing interactions primarily around likes, follower counts, or vanity metrics.

---

# 8. Information Architecture

The web app should contain four primary areas:

```text
MOVA
│
├── NOW
│   ├── Live World
│   ├── Live Moments
│   └── Nearby Activity
│
├── VIBE
│   ├── Current State
│   ├── Intentions
│   └── Change Vibe
│
├── DROPS
│   ├── Active Drops
│   ├── Upcoming Drops
│   └── Completed Drops
│
└── MOMENTS
    ├── Active Moments
    ├── Closed Moments
    └── Personal Memory Archive
```

### Important UX Decision

**Threads should not be a separate top-level navigation item.**

A Thread is the internal interaction structure of a Moment.

This keeps the product mentally simple.

---

# 9. Feature 1 — VIBE

## 9.1 Purpose

Vibe communicates what a user is currently feeling, doing, or available for.

Instead of maintaining a permanent social profile, MOVA focuses on the user's **current social state**.

## 9.2 Example Vibes

- ☕ Chill
- 🎮 Play
- 📚 Study
- 🚶 Explore
- 🎨 Create
- 🍜 Eat
- 🎧 Listen
- 💬 Talk
- 😴 Bored
- 🔥 Looking for something

## 9.3 Custom Vibe

Users can optionally create a lightweight custom statement.

Examples:

> Looking for chai.

> Studying until 9 PM.

> Anyone up for badminton?

> Need someone to explain calculus.

> Exploring campus photography spots.

## 9.4 Vibe Impact

Vibe is not merely a status badge.

It influences what MOVA surfaces.

Example:

```text
CURRENT VIBE
☕ CHILL
```

Relevant moments:

1. Chai Run
2. Evening Walk
3. Music Corner
4. Cafeteria Hangout

Change Vibe:

```text
🎮 PLAY
```

Now the live world changes:

1. Valorant Duo
2. Basketball
3. Chess Rush
4. FIFA Break

## 9.5 Vibe Lifecycle

```text
Choose Vibe
   ↓
Use Vibe to personalize Now
   ↓
Join a matching Moment
   ↓
Participate
   ↓
Change Vibe
```

---

# 10. Feature 2 — NOW / LIVE WORLD

## 10.1 Purpose

NOW is the main entry point to MOVA.

It answers:

> **What's happening right now?**

It should NOT resemble a content feed.

## 10.2 Live World

The desktop experience can visualize active Moments spatially.

Example:

```text
                 🎧 MUSIC
                    ●
                   /
                  /
     📚 STUDY ● ───── ● ☕ CHAI
                 \
                  \
                   ● 🌧 RAIN
                         \
                          ● ⚽ FOOTBALL
```

Each node represents a live social Moment.

## 10.3 Visual States

### Small Node
Low participation.

### Large Node
High participation.

### Pulsing Node
Active interaction.

### Fading Node
Moment nearing expiration.

### Connected Nodes
Related moments or emerging branches.

This creates a visual metaphor:

> **The social world is alive.**

## 10.4 Live Moment Cards

Each Moment should communicate:

- Title
- Vibe
- Participant count
- Time remaining
- Location/context
- Current activity
- Join CTA

Example:

### ☕ CHAI RUN

**7 people participating**  
**Campus Canteen**  
**18 min remaining**

`JOIN`

---

# 11. Feature 3 — MOMENTS

## 11.1 Purpose

A Moment is the primary social unit in MOVA.

A Moment represents something happening now or an activity people are collectively experiencing.

## 11.2 Example Moments

### Everyday

> Chai Run

> Evening Walk

> Library Grind

> Badminton?

> Cafeteria Chaos

> Rain on Campus

### More Creative

> Everyone show your desk right now.

> Find the weirdest object around you.

> What song is playing where you are?

> Show us the sky.

## 11.3 Moment Creation

User selects:

### CREATE MOMENT

**What are you doing?**

`Getting chai`

**Where?**

`Campus Canteen`

**Who can join?**

`Anyone`

**How long?**

`30 minutes`

Then:

# CREATE MOMENT

The Moment becomes visible in NOW.

---

# 12. Moment Lifecycle

Every Moment follows a lifecycle.

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

## Starting

A user creates a Moment.

## Active

People begin joining.

## Evolving

Contributions appear and the interaction develops.

## Closed

The activity ends or the timer expires.

## Memory

The completed experience becomes part of the archive.

This lifecycle is fundamental to MOVA's identity.

---

# 13. Feature 4 — DROPS

## 13.1 Purpose

Drops create synchronized participation.

A Drop is a temporary prompt delivered to a community at a specific time.

Instead of opening the app and scrolling through old content, people can participate in something **together, at the same time**.

## 13.2 Example Drop

# 8:00 PM DROP

### Show us what's directly in front of you.

**5 minutes**

Available contributions:

- Photo
- Text
- Voice
- Sketch

CTA:

# DROP SOMETHING

## 13.3 Other Drop Examples

### DROP — 7:00 PM

> What does your evening look like?

### DROP — 9:30 PM

> What song are you listening to?

### DROP — FRIDAY

> Show us the weirdest thing you saw today.

### CAMPUS DROP

> What's happening near you right now?

## 13.4 Drop Rules

A Drop should:

- Be temporary
- Have a clear prompt
- Have a participation window
- Encourage lightweight contributions
- Avoid follower-based visibility
- Become a shared Moment after participation

---

# 14. Drop → Moment Transformation

This is one of MOVA's most important interactions.

Example:

```text
DROP
"Show us your current view."
        ↓
24 people participate
        ↓
Photos + voice + text appear
        ↓
COLLECTIVE MOMENT
"Campus Evening"
        ↓
Contributions connect
        ↓
THREAD EVOLVES
```

A Drop is therefore not just a challenge.

It is a **social ignition mechanism**.

---

# 15. Feature 5 — LIVING THREADS

## 15.1 Purpose

Threads allow a Moment to evolve through contributions.

Traditional social platforms:

```text
Post
 ├── Comment
 ├── Comment
 └── Comment
```

MOVA:

```text
Moment
   │
   ├── Photo
   │
   ├── Voice
   │
   ├── Text
   │
   └── Branch
         │
         ├── New contribution
         ├── New activity
         └── New Moment
```

## 15.2 Example

Initial Moment:

# RAIN CHAOS

Someone uploads:

> “Rain just started.”

Another user adds:

📸 Photo of the rain.

Someone adds:

> “Everyone is running toward the canteen.”

That creates a branch:

### CANTEEN

Another user adds:

> “They're giving free tea.”

Another branch:

### TEA RUN

Then:

> “Who's joining?”

Now the thread has produced an actual activity.

### 6 PEOPLE JOIN

The digital interaction has influenced a real-world social action.

---

# 16. Contribution Types

Users can contribute through:

### PHOTO

Quick visual contribution.

### TEXT

Short observation or thought.

### VOICE

Fast voice note for richer context.

### SKETCH

Simple drawing or markup.

### LOCATION

Point to where something is happening.

### REACTION

Lightweight contextual reaction.

### ACTION

Turn the thread into an activity.

Examples:

> Join us

> Challenge accepted

> I'm coming

> Add yours

The goal is not to create a complex creator tool.

The goal is **low-friction participation**.

---

# 17. Feature 6 — SPARK

## 17.1 Purpose

A Spark is a tiny social trigger that can become a Moment.

Example:

> “Anyone craving dosa?”

User taps:

# SPARK

Three people respond.

MOVA creates:

### DOSA HUNT

4 people

20 minutes

The sequence becomes:

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

Spark is useful because not every interaction should require the user to formally create a full Moment.

---

# 18. Feature 7 — JOIN / I'M IN

MOVA replaces conventional likes with participation-focused actions.

Instead of:

❤️ Like

Users see:

# I'M IN

or

# JOIN

or

# ADD TO MOMENT

Example:

### CHAI RUN

5 people are here.

`I'M IN`

After interaction:

> Arun joined the Moment.

This changes the social reward from:

> “I received attention.”

to:

> “Someone joined me.”

---

# 19. Feature 8 — MOMENT MEMORY

## 19.1 Purpose

When a Moment ends, it should not remain as another permanent feed post.

Instead, it becomes a lightweight memory artifact.

Example:

# SEPTEMBER 7 · 8:00 PM

## RAIN CHAOS

17 participants  
34 contributions  
3 branches  
1 real-world activity

The archive communicates:

> **What did I experience?**

rather than:

> **What did I post?**

---

# 20. Personal Identity in MOVA

MOVA should minimize traditional profile mechanics.

Instead of:

```text
ARUN
2,340 Followers
482 Following
126 Posts
```

Use:

# ARUN

### CURRENT VIBE
☕ Looking for chai

### RECENT MOMENTS

- Chai Run
- Rain Chaos
- Campus Jam

### SHARED EXPERIENCES

8 Moments  
23 contributions  
5 joined activities

Identity is based on participation and experience.

---

# 21. Core User Flow

## Flow A — Discover and Join

```text
Open MOVA
   ↓
Select Vibe
   ↓
NOW updates
   ↓
See Live Moments
   ↓
Open Moment
   ↓
View participants
   ↓
JOIN
   ↓
Contribute
```

---

# 22. Core User Flow — Drop

```text
User opens DROPS
   ↓
Active Drop appears
   ↓
Prompt displayed
   ↓
User contributes
   ↓
Contribution appears in shared space
   ↓
More users contribute
   ↓
Drop becomes a Moment
```

---

# 23. Core User Flow — Create Moment

```text
Choose Vibe
   ↓
Create Moment
   ↓
Describe activity
   ↓
Choose context/location
   ↓
Set duration
   ↓
Publish
   ↓
Moment enters NOW
   ↓
Users join
   ↓
Thread evolves
   ↓
Moment closes
```

---

# 24. Core User Flow — Moment Evolution

```text
Someone posts observation
        ↓
Another person adds context
        ↓
Another person contributes media
        ↓
A branch emerges
        ↓
New activity forms
        ↓
People join
        ↓
New Moment created
```

This is the heart of MOVA's social graph.

---

# 25. Example Full Scenario

## Scenario: College Evening

### 6:42 PM

Arun opens MOVA.

MOVA asks:

> **WHAT'S YOUR VIBE?**

Arun chooses:

### ☕ CHILL

---

### 6:43 PM

NOW shows:

#### CHAI RUN
6 people

#### CAMPUS WALK
3 people

#### MUSIC CORNER
9 people

Arun opens:

### CHAI RUN

He sees:

> “Meeting near Block B.”

`I'M IN`

---

### 6:46 PM

Another participant adds:

> “Let's get samosas too.”

A new branch appears:

### SNACK RUN

Arun joins.

---

### 7:00 PM

A Drop begins:

# SHOW US YOUR EVENING

5 minutes.

Arun submits a photo.

Others submit:

- A sunset
- Canteen photo
- Football match
- Hostel corridor
- Voice note

The Drop becomes:

# CAMPUS EVENING

23 participants.

---

### 7:05 PM

Someone adds:

> “Why don't we all meet near the basketball court?”

A new branch appears:

### COURT MEETUP

8 people join.

---

### 7:40 PM

The Moment closes.

MOVA saves:

# CAMPUS EVENING

23 people  
41 contributions  
4 branches  
1 meetup

Arun changes his Vibe:

### 🎮 PLAY

The cycle begins again.

---

# 26. Web App Experience

## 26.1 Desktop Philosophy

MOVA should take advantage of desktop space.

The desktop interface should feel like a **living social control room** rather than a mobile app stretched horizontally.

Recommended layout:

```text
┌───────────────────────────────────────────────────────────┐
│ MOVA                          NOW             ARUN         │
├─────────────┬─────────────────────────────────┬───────────┤
│ YOUR VIBE   │           LIVE WORLD            │  MOMENT   │
│             │                                 │           │
│ ☕ Chill    │     ● Chai                     │ Chai Run  │
│ 🎮 Play     │                  ● Rain         │           │
│ 📚 Study    │       ● Study                  │ 7 people  │
│ 🚶 Explore  │                                 │           │
│ 🎨 Create   │             ● Football         │ JOIN      │
│             │                                 │           │
└─────────────┴─────────────────────────────────┴───────────┘
```

## 26.2 Mobile Philosophy

On mobile, the spatial experience becomes a compact stream of active Moments.

```text
MOVA

WHAT'S HAPPENING?

☕ CHAI RUN
7 people · 18 min

🌧 CAMPUS RAIN
24 people · Active

📚 LIBRARY GRIND
16 people · 42 min
```

The concept remains consistent while the composition changes.

---

# 27. Responsive Design Requirements

## Desktop

Prioritize:

- Spatial Live World
- Multi-column layout
- Persistent Vibe
- Moment detail panel
- Live activity visualization

## Tablet

Prioritize:

- Two-column layout
- Collapsible Vibe panel
- Scrollable live moments
- Larger interactive cards

## Mobile

Prioritize:

- Single-column layout
- Thumb-friendly actions
- Sticky Vibe
- Bottom navigation if necessary
- Fast contribution flow
- Compact Moment cards

The mobile experience should feel intentionally designed rather than simply scaled down.

---

# 28. Main Screens

## Screen 1 — Landing / Entry

Purpose:

Immediately communicate the product philosophy.

Headline:

> **Don't Follow People. Follow Moments.**

Supporting copy:

> See what's happening around you. Share your vibe. Jump into moments.

CTA:

# ENTER MOVA

---

## Screen 2 — Vibe Selector

Headline:

# WHAT'S YOUR VIBE?

Show large interactive choices.

Example:

```text
☕ CHILL
🎮 PLAY
📚 STUDY
🚶 EXPLORE
🎨 CREATE
🍜 EAT
💬 TALK
```

---

## Screen 3 — NOW

Headline:

# WHAT'S HAPPENING?

Show:

- Live World
- Active Moments
- Participant counts
- Activity state
- Time remaining

---

## Screen 4 — Moment Detail

Example:

# CHAI RUN

7 people  
18 minutes left  
Campus Canteen

### LIVE THREAD

Photo → text → voice → branch → action

Primary CTA:

# I'M IN

---

## Screen 5 — Drop

Example:

# 8:00 PM DROP

### SHOW US YOUR CURRENT VIEW

05:00

[ DROP SOMETHING ]

Contribution options:

Photo / Text / Voice / Sketch

---

## Screen 6 — Create Moment

Fields:

- What are you doing?
- Where?
- Vibe
- Duration
- Who can join?

CTA:

# CREATE MOMENT

---

## Screen 7 — Moments Archive

Headline:

# YOUR MOMENTS

Display experiences chronologically.

Example:

**Today**

Rain Chaos  
Chai Run  
Campus Jam

**Yesterday**

Midnight Gaming  
Study Sprint

---

# 29. Visual Design Direction

## 29.1 Overall Feel

MOVA should feel:

- Alive
- Contemporary
- Experimental
- Human
- Energetic
- Minimal
- Spatial
- Time-aware

Avoid making it look like a conventional social media dashboard.

## 29.2 Visual Metaphor

The primary metaphor is:

# MOVEMENT

Moments appear, grow, connect, evolve, and disappear.

## 29.3 UI Language

Potential visual elements:

- Pulsing nodes
- Soft motion
- Expanding activity rings
- Connecting lines
- Floating contribution cards
- Countdown indicators
- Temporal transitions
- Spatial clustering
- Layered content
- Contextual micro-interactions

Motion should communicate meaning rather than exist purely for decoration.

---

# 30. Suggested Visual Hierarchy

### Level 1
Moment title / current activity

### Level 2
Participant state

### Level 3
Time remaining

### Level 4
Contributions

### Level 5
Secondary metadata

The most important information should answer:

> **What is happening?**

> **Can I join?**

> **How much time do I have?**

---

# 31. Interaction Design

MOVA should favor direct and expressive interaction.

Examples:

### Tap

Join a Moment.

### Drag

Explore the Live World.

### Hover

Preview a Moment.

### Expand

Open a Thread branch.

### Swipe

Move between active Moments on mobile.

### Click-and-hold

Preview live activity.

### Quick action

Add a contribution.

---

# 32. Frontend-Only Technical Strategy

The competition allows mock/static data, so the MVP does not require a real backend.

## Suggested stack

- React
- Vite
- TypeScript or JavaScript
- Tailwind CSS or CSS modules
- Framer Motion / CSS animations
- Local mock JSON/JS data

## Data Objects

### User

```js
{
  id: 1,
  name: "Arun",
  vibe: "chill",
  vibeDetail: "Looking for chai"
}
```

### Moment

```js
{
  id: 101,
  title: "Chai Run",
  vibe: "chill",
  participants: 7,
  duration: 30,
  timeRemaining: 18,
  location: "Campus Canteen",
  status: "active"
}
```

### Drop

```js
{
  id: 201,
  title: "Show us your current view",
  duration: 5,
  status: "active"
}
```

### Contribution

```js
{
  id: 301,
  momentId: 101,
  type: "photo",
  author: "A user",
  timestamp: "8:07 PM"
}
```

---

# 33. State Management

Important UI states should include:

- Current Vibe
- Active Moment
- Joined Moments
- Active Drop
- User contributions
- Moment branches
- Moment timer
- Moment lifecycle
- UI layout state

Because this is a frontend prototype, these can be handled using local state or a simple client-side store.

---

# 34. Mock Data Strategy

The prototype should feel populated from the moment it opens.

Use realistic mock data representing:

### People

8–20 simulated users.

### Moments

10–15 active Moments.

### Drops

2–4 active/upcoming Drops.

### Contributions

30–50 mock contributions distributed across Moments.

This avoids the “empty app” effect during judging.

---

# 35. Functional MVP

The hackathon MVP should support:

### Required

- Vibe selection
- Live Moment browsing
- Moment detail view
- Join Moment interaction
- Create Moment interaction
- Active Drop
- Contribution interaction
- Thread/branch visualization
- Moment expiration simulation
- Moments archive
- Responsive desktop/mobile UI

### Nice to Have

- Simulated presence changes
- Animated Live World
- Voice contribution UI
- Location visualization
- Dynamic Drop countdown
- Small collaborative mini-games

---

# 36. What NOT to Build

Avoid spending hackathon time on:

- Real authentication
- Production backend
- Real-time WebSockets
- Full GPS infrastructure
- Complex recommendation algorithms
- Payments
- Advanced video processing
- Large-scale moderation systems
- Creator monetization
- Detailed follower systems
- Complex messaging infrastructure

The prototype should prioritize:

> **Concept clarity + interaction quality + visual polish.**

---

# 37. Accessibility Requirements

MOVA should include:

- Keyboard-accessible interactions
- Visible focus states
- Semantic buttons
- Clear labels
- Sufficient text contrast
- Reduced-motion consideration
- Accessible countdown messaging
- Alternative text for images
- ARIA labels where necessary
- No interaction that depends only on color

The product should remain usable without relying on animation alone.

---

# 38. Error and Empty States

## No nearby Moments

Display:

> **It's quiet right now.**

Then:

### CREATE A MOMENT

or

### CHANGE YOUR VIBE

## Drop has ended

Display:

> **This Drop has moved on.**

Then show:

### VIEW MOMENT

## No contributions

Display:

> **You're early. Start the thread.**

CTA:

### ADD SOMETHING

These states maintain the product's personality.

---

# 39. Product Metrics for the Prototype

Because this is a concept prototype rather than a production product, metrics should focus on interaction quality.

## Primary

### Moment Join Rate

How often users join a Moment after discovering it.

### Contribution Rate

How many participants contribute something.

### Moment Evolution Rate

How often a Moment produces a new branch or activity.

### Drop Participation Rate

How many users participate in active Drops.

## Secondary

- Average Moments joined
- Average contributions per user
- Vibe changes per session
- Completed Moments
- Number of newly created Moments

---

# 40. The Core Social Graph

Traditional social graph:

```text
ARUN → ABHINAV
ARUN → TAUSHIK
ARUN → SATYA
```

MOVA graph:

```text
ARUN
  ↓
CHAI RUN
  ↓
RAIN CHAOS
  ↓
COURT MEETUP
  ↓
CAMPUS EVENING
```

The relationship is formed through **shared experiences**.

This is a key part of the innovation.

---

# 41. Why Users Return

MOVA should create a natural reason to return without relying on infinite scrolling.

Users return because:

### Something is happening.

### A Drop is about to begin.

### Their Vibe has changed.

### Someone invited them into a Moment.

### A Moment they joined is evolving.

### A new activity has emerged.

This means the retention loop is based on **possibility**, not endless consumption.

---

# 42. Example Daily Experience

## Morning

Vibe:

### ☕ QUIET

Moment:

### Morning Study

---

## Afternoon

Vibe changes:

### 🍜 HUNGRY

Moment:

### Lunch Hunt

---

## Evening

Vibe changes:

### 🚶 EXPLORE

Drop:

### Sunset Drop

Moment:

### Campus Sunset

---

## Night

Vibe:

### 🎮 PLAY

Moment:

### Late Night Gaming

The app changes with the person.

The person does not need to maintain a permanent online identity.

---

# 43. Competitive Differentiation

MOVA should be framed as a rejection of several assumptions:

### Assumption 1
Social media requires followers.

**MOVA:** Participation is enough.

### Assumption 2
Social content should remain permanently available.

**MOVA:** Some experiences should disappear.

### Assumption 3
The primary social action is liking.

**MOVA:** The primary action is joining.

### Assumption 4
People are the main objects users follow.

**MOVA:** Moments are the main objects users enter.

### Assumption 5
Comments belong under posts.

**MOVA:** Conversations become branches of a living Moment.

---

# 44. Hackathon Demo Story

The final demo should be structured around one simple story.

## Scene 1

Open MOVA.

Headline:

> **WHAT'S YOUR VIBE?**

Select:

☕ Chill

## Scene 2

NOW shows:

### CHAI RUN
7 people

Click.

## Scene 3

Moment opens.

Someone has added:

> “Meet near Block B.”

Arun clicks:

# I'M IN

## Scene 4

A Drop begins.

### SHOW US WHAT'S IN FRONT OF YOU

Arun contributes a photo.

## Scene 5

The Drop fills with collective contributions.

The visual layout transforms into a living Thread.

## Scene 6

A branch emerges:

### SNACK RUN

Arun joins.

## Scene 7

Moment ends.

MOVA saves:

### CHAI RUN

7 participants  
12 contributions  
2 branches

Then the app asks:

> **What's your vibe now?**

The loop begins again.

---

# 45. Judging Criteria Alignment

## Problem Understanding

MOVA directly challenges conventional feed-based social interaction.

It demonstrates a clear understanding of the challenge:

> social should be about connection and participation, not just content consumption.

## User Experience

The experience is based on one understandable loop:

**Vibe → Discover → Join → Contribute → Evolve → Remember**

## Visual Design

The Live World, pulsing Moments, branching Threads, and time-based UI give MOVA a distinctive visual language.

## Functionality

The prototype can demonstrate:

- Vibe switching
- Joining
- Creating
- Contributing
- Drop countdown
- Thread expansion
- Moment lifecycle

## Responsiveness

Desktop and mobile should intentionally use different compositions while preserving the same product model.

## Code Quality

The product naturally supports reusable components:

- `VibeSelector`
- `LiveWorld`
- `MomentCard`
- `MomentView`
- `DropCard`
- `ThreadNode`
- `ContributionComposer`
- `MomentArchive`
- `ParticipantStack`

## Creativity & Innovation

MOVA replaces:

**people → followers → posts → likes**

with:

**vibes → moments → participation → collective memories**

That is the central innovation.

---

# 46. Component Architecture

Recommended frontend component structure:

```text
App
│
├── Layout
│
├── Navigation
│
├── VibeSelector
│
├── Now
│   ├── LiveWorld
│   ├── MomentCard
│   └── MomentFilters
│
├── Moment
│   ├── MomentHeader
│   ├── ParticipantStack
│   ├── Thread
│   ├── ThreadBranch
│   ├── Contribution
│   └── JoinButton
│
├── Drops
│   ├── ActiveDrop
│   ├── DropCountdown
│   └── ContributionComposer
│
├── CreateMoment
│
└── MomentsArchive
```

This keeps the interface modular and maintainable.

---

# 47. Suggested Design System

## Typography

Use a bold contemporary sans-serif for major headings.

Body text should remain simple and highly readable.

## Shape Language

Use:

- Rounded cards
- Circular nodes
- Pills for Vibes
- Soft borders
- Layered surfaces

## Motion

Use motion primarily for:

- Moment appearing
- Moment growing
- Countdown
- Thread branching
- Joining
- Contribution appearing
- Moment closing

## Color System

A dynamic palette can distinguish Moment energy:

### Calm

Muted / soft tone.

### Active

Brighter accent.

### High Energy

Stronger accent.

### Ending

Desaturated / fading.

The visual language should avoid excessive decoration.

---

# 48. Product Voice

MOVA should speak like a friend, not a corporate platform.

Instead of:

> “Create a social post.”

Say:

> **Start something.**

Instead of:

> “Engage with content.”

Say:

> **Join the moment.**

Instead of:

> “No new posts.”

Say:

> **It's quiet right now.**

Instead of:

> “Status updated.”

Say:

> **Your vibe changed.**

Instead of:

> “Event expired.”

Say:

> **That moment passed.**

This voice reinforces the product philosophy.

---

# 49. Key UX Copy

### Entry

> Don't follow people. Follow moments.

### Vibe

> What's your vibe?

### Now

> What's happening?

### Join

> I'm in.

### Contribution

> Add something.

### Empty state

> It's quiet right now.

### Creating

> Start something.

### Ending

> That moment passed.

### Archive

> Things that happened.

---

# 50. Product Success Definition

MOVA succeeds as a hackathon prototype if a judge can:

1. Understand the concept in under 30 seconds.
2. Immediately recognize that it is not a traditional social feed.
3. Change their Vibe.
4. Discover a live Moment.
5. Join it.
6. Contribute to it.
7. See the Moment evolve.
8. Understand why they would return.

The product should demonstrate a **new social behavior**, not merely a new visual style.

---

# 51. MVP Scope Summary

## Must Have

- Responsive social web app
- Vibe system
- Live Now experience
- Live Moments
- Join interaction
- Create Moment
- Drops
- Thread visualization
- Contributions
- Moment lifecycle
- Moments archive
- Mock/static data
- Responsive layouts

## Should Have

- Live World visualization
- Animated Moment states
- Branch creation
- Simulated participant activity
- Drop countdown
- Context-aware Vibe filtering

## Could Have

- Location simulation
- Voice interaction
- Mini collaborative games
- Richer visual contributions
- Advanced motion

## Won't Have in Hackathon MVP

- Production backend
- Real authentication
- Real-time infrastructure
- Complex AI recommendation
- Full location tracking
- Production moderation system

---

# 52. Final Product Definition

# MOVA

## Don't Follow People. Follow Moments.

MOVA is a responsive social web app that transforms social interaction from a feed-based activity into a **real-time shared experience**.

Users begin with their **Vibe**.

They enter the **Now** and discover what is happening.

They **Join Moments** rather than liking posts.

They participate in synchronized **Drops**.

Their contributions create living, branching **Threads**.

Moments evolve into activities.

Activities create new Moments.

Completed experiences become **Memories**.

The complete loop is:

```text
          ┌───────────────┐
          │     VIBE      │
          └───────┬───────┘
                  ↓
          ┌───────────────┐
          │      NOW      │
          │ Live Moments  │
          └───────┬───────┘
                  ↓
          ┌───────────────┐
          │     JOIN      │
          └───────┬───────┘
                  ↓
          ┌───────────────┐
          │     DROP      │
          │ Shared Prompt │
          └───────┬───────┘
                  ↓
          ┌───────────────┐
          │    THREAD     │
          │   Evolves     │
          └───────┬───────┘
                  ↓
          ┌───────────────┐
          │    ACTIVITY   │
          │    Emerges    │
          └───────┬───────┘
                  ↓
          ┌───────────────┐
          │    MEMORY     │
          └───────┬───────┘
                  ↓
             NEW VIBE
```

### The fundamental shift:

> **Traditional social media asks: “What did people post?”**

> **MOVA asks: “What can we experience together right now?”**

That is the product.

---

# 53. Final One-Minute Pitch

> **MOVA is a social web app built around moments, not feeds.**
>
> Today, most social platforms ask us to follow people, consume posts, and react to content. MOVA asks a different question: **what are you up for right now?**
>
> Users choose a Vibe, discover what's happening in the Live World, and join temporary Moments around them. At specific times, Drops bring people together around shared prompts. Their photos, messages, voice notes, and actions don't form a comment section—they form a living Thread that can branch into new activities.
>
> A chai run can become a snack hunt. A rain photo can become a campus meetup. A five-minute Drop can become a memory shared by twenty people.
>
> **MOVA doesn't help people build audiences. It helps people build moments.**
>
> **Don't follow people. Follow moments.**

---

# 54. Guiding Design Principle

Every feature decision should pass this test:

> **Does this help people participate in something happening now?**

If yes, it belongs in MOVA.

If it only helps users:

- Scroll more
- Collect followers
- Chase likes
- Build vanity metrics
- Consume endless content

then it probably does not belong in MOVA.

---

# END OF PRD
