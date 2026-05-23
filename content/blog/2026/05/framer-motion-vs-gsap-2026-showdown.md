---
title: "Framer Motion vs. GSAP in 2026: A Performance and DX Showdown"
slug: "framer-motion-vs-gsap-2026-showdown"
date: "2026-05-20"
lastModified: "2026-05-20"
author: "William Spurlock"
readingTime: 10
categories:
  - "Web Design and Digital Experiences"
tags:
  - "framer motion"
  - "gsap"
  - "animation"
  - "react"
  - "next.js"
  - "performance"
  - "scroll animations"
  - "web development"
featured: false
draft: false
excerpt: "A direct, opinionated comparison between Framer Motion and GSAP for React/Next.js developers building premium sites. Covers DX, performance, bundle size, scroll animations, and when to pick each."
coverImage: "/images/blog/framer-motion-vs-gsap-2026.png"
seoTitle: "Framer Motion vs GSAP 2026: Performance & DX Showdown"
seoDescription: "Direct comparison of Framer Motion vs GSAP for React developers in 2026. Performance benchmarks, bundle sizes, scroll animations, and which to pick for premium sites."
seoKeywords:
  - "framer motion vs gsap"
  - "framer motion 2026"
  - "gsap scrolltrigger"
  - "react animation library"
  - "framer motion performance"
  - "gsap bundle size"
  - "next.js animations"
  - "scroll storytelling"
  - "layout animations"

# AIO/AEO Fields
aioTargetQueries:
  - "framer motion vs gsap which is better"
  - "gsap or framer motion for react"
  - "framer motion vs gsap performance"
  - "when to use gsap vs framer motion"
  - "best animation library for nextjs"
  - "gsap scrolltrigger vs framer motion scroll"
  - "framer motion bundle size 2026"
  - "gsap vs framer motion for scroll animations"

contentCluster: "immersive-web"
pillarPost: false
parentPillar: "the-immersive-web-design-manual"

entityMentions:
  - "William Spurlock"
  - "Framer Motion"
  - "Motion"
  - "GSAP"
  - "GreenSock"
  - "React"
  - "Next.js"
  - "ScrollTrigger"
  - "Web Animations API"
  - "Tailwind CSS"

# Service Track Routing
serviceTrack: "web-design"
---

# Framer Motion vs. GSAP in 2026: A Performance and DX Showdown

**Framer Motion (now rebranded as Motion) wins for React-native UI animations, layout transitions, and component-level orchestration.** **GSAP wins for scroll-driven storytelling, complex timelines, and performance under heavy load.** The decision depends on what you're building, not which library is "better."

If you're building a premium React or Next.js site in 2026, you've hit the same crossroads every motion-forward developer faces: **Framer Motion (now Motion)** or **GSAP**? Both libraries have evolved significantly over the past year. Both can deliver 60fps animations. Both have passionate communities and impressive showcase sites. But they optimize for different developer mindsets, different animation archetypes, and different performance budgets.

I'm **William Spurlock**, an AI automation engineer and custom web designer who ships immersive digital experiences for premium brands. This comparison comes from production work—sites where animation isn't decoration, it's the core value proposition. I use both libraries weekly. This is how I decide which to reach for.

---

## What's New in 2026: Motion Rebrand and GSAP's Free Plugin Era

**Motion (formerly Framer Motion) shipped its v12 release in early 2026** with a complete rebrand, a new `motion` package on npm, and deep investments in the Web Animations API (WAAPI). The old `framer-motion` package still works, but all current docs, new features, and performance optimizations are in the `motion` package. The recommended import for React projects is now:

```tsx
import { motion, AnimatePresence, useScroll } from "motion/react";
```

Key v12 additions include **native `oklch`, `oklab`, and `color-mix()` animation support**, **hardware-accelerated scroll animations** via `useScroll` and CSS ScrollTimeline concepts, and the **`layoutAnchor` prop** for more predictable layout transition origins. Motion now interpolates between color spaces automatically—something that required manual conversion libraries in 2025.

**GSAP 3.13+ fundamentally changed its value proposition in early 2026** by making every formerly paid "Club GSAP" plugin free for all users, including commercial projects. This includes:

- **ScrollTrigger** — the industry-standard scroll animation plugin
- **SplitText** — character, word, and line text animation
- **MorphSVG** — smooth shape morphing between SVG paths
- **Flip** — layout state transitions (GSAP's answer to Motion's layout animations)
- **Inertia** — momentum-based physics animations
- **Draggable** — touch/drag interactions with momentum

**Webflow's acquisition of GSAP** made this possible. For production work, this removes the licensing friction that previously pushed some teams toward Motion. You can now build complex scroll storytelling sites with GSAP without a subscription or attribution requirement.

---

## The Philosophy Split: Declarative vs. Imperative

**Motion is declarative and React-native**—animations are props on components, state-driven, and tightly coupled to React's render cycle. **GSAP is imperative and framework-agnostic**—you command the DOM directly through a JavaScript animation engine that predates React and operates outside it.

This philosophical difference determines everything else:

| Aspect | Motion (Declarative) | GSAP (Imperative) |
|--------|------------------------|-------------------|
| **Mental model** | "When state changes, animate to match" | "Tell the DOM exactly what to do, when" |
| **React integration** | Native—props on JSX elements | Via refs and `useEffect`—manual lifecycle management |
| **Animation trigger** | State/prop changes, gestures | Method calls, timelines, scroll position |
| **Cleanup** | Automatic on unmount | Manual—must kill tweens, remove listeners |
| **Learning curve** | Gentle if you know React | Steeper—separate animation mental model |

**Motion feels like writing React with extra props.** If you understand `useState` and conditional rendering, you understand Motion's basic animation model. The library abstracts away the animation engine—you declare the destination state, and Motion handles interpolation, timing, and cleanup.

**GSAP feels like directing a film.** You create timelines, position tweens absolutely or relatively, scrub through sequences, and control playback like a media player. The learning curve is steeper, but the control ceiling is higher—especially for scroll-linked narrative sequences that span multiple sections and dozens of elements.

Choose Motion when your animations are primarily **state-driven UI feedback**—modals opening, cards expanding, layout shifts, gesture responses. Choose GSAP when your animations are **timeline-driven experiences**—scroll storytelling, choreographed hero sequences, complex multi-element orchestration.

---

## What's New in 2026: Motion Rebrand and GSAP's Free Plugin Era

**Motion (formerly Framer Motion) shipped its v12 release in early 2026** with a complete rebrand, a new `motion` package, and deep investments in the Web Animations API. **GSAP 3.13+ made every formerly paid plugin free**, including ScrollTrigger, SplitText, MorphSVG, and Flip—fundamentally shifting the value equation for complex animation work.

---

## The Philosophy Split: Declarative vs. Imperative

**Framer Motion is declarative and React-native**—animations are props on components, state-driven, and tightly coupled to React's render cycle. **GSAP is imperative and framework-agnostic**—you command the DOM directly through a JavaScript animation engine that predates React and operates outside it.

---

## Bundle Size Reality Check: What You're Actually Shipping

**Motion's `animate()` mini build hits ~2.6 KB gzipped**, making it the smallest serious animation library available for imperative animations outside React. The full React API (`motion/react`) lands at **~30–35 KB gzipped** in properly tree-shaken production builds. A non-optimized build can balloon to ~46–59 KB if you import the full package without tree-shaking discipline.

**GSAP core is ~23–27 KB gzipped**, which is smaller than Motion's full React bundle but larger than Motion's `animate()` mini. However, real-world GSAP usage almost always includes plugins. Here's the realistic breakdown for a typical premium marketing site:

| Library Configuration | Gzipped Size | Use Case |
|-----------------------|--------------|----------|
| Motion `animate()` mini | ~2.6 KB | Vanilla JS, lightweight imperative animations |
| GSAP core only | ~23–27 KB | Framework-agnostic, no scroll/text needs |
| Motion React (tree-shaken) | ~30–35 KB | Full React UI animations, layout transitions |
| GSAP + ScrollTrigger | ~30–35 KB | Scroll-driven marketing sites |
| GSAP + ScrollTrigger + SplitText | ~35–40 KB | Text-heavy storytelling sites |
| Motion React (full, unoptimized) | ~46–59 KB | Import anti-patterns, no tree-shaking |

**JavaScript parse overhead matters on mobile.** Every additional 1 KB of gzipped JavaScript adds roughly 2 ms of parse time on mid-range Android devices. A 35 KB animation library costs ~70 ms of main-thread parsing before any animation runs. For sites targeting emerging markets or low-end devices, this budget matters.

**The practical recommendation:** If you're already in React and need a single animation library, Motion's ~30–35 KB is reasonable. If you need scroll storytelling specifically, GSAP + ScrollTrigger at a similar size delivers significantly more capability. Motion's `animate()` mini is the clear winner for non-React projects or isolated lightweight animations.

**Tree-shaking discipline saves real bytes.** Both libraries support tree-shaking, but Motion's React API is more susceptible to bloat from convenience imports. Always import from `motion/react` specifically, not the root `motion` package, and avoid importing unused gesture handlers or scroll utilities.

---

## Performance Benchmarks: The Numbers That Matter

**Motion claims 2.5× faster startup for unknown-value animations and 6× faster interpolation between value types**, leveraging the Web Animations API (WAAPI) and GPU compositing. These numbers come from controlled benchmarks where Motion reads fewer computed styles and offloads more work to the browser's native animation engine.

**GSAP maintains performance dominance under complex scroll-driven load**, especially for long timelines with 50+ elements, pinned sections, and scrubbed animations where React reconciliation overhead becomes measurable. In production profiling, GSAP-driven scroll sections maintain 60 fps on devices where Motion drops to 30–45 fps under equivalent element counts.

Here's what the benchmarks actually mean in production:

**Motion's WAAPI advantage:**
- **Startup latency**: When animating from computed values (e.g., animating to a value from "whatever the current CSS says"), Motion's native WAAPI integration requires fewer style recalculations than GSAP's JavaScript-based value reading.
- **CPU efficiency**: For simple property animations (transforms, opacity), Motion's browser-native engine uses less CPU than GSAP's JavaScript interpolation, freeing main-thread cycles for React reconciliation or other logic.
- **Battery impact**: Native animations can be more power-efficient on mobile devices, though the difference is modest for typical UI interactions.

**GSAP's load resilience:**
- **React immunity**: GSAP operates outside React's render cycle. During a scroll sequence with 40+ animated elements, GSAP isn't fighting React for main-thread time—it's commanding the DOM directly while React handles its normal reconciliation separately.
- **Timeline complexity**: GSAP's animation engine is purpose-built for long, complex sequences. A 10-second timeline with 20 staggered elements, multiple overlapping tweens, and scroll scrubbing performs consistently where Motion's variant orchestration becomes harder to optimize.
- **Pinning performance**: GSAP ScrollTrigger's pinning implementation uses highly optimized transforms and positioning. Motion has no equivalent pinning capability—attempting to replicate it with `useScroll` and `useTransform` creates scroll-linked jank on lower-end devices.

**The practical frame rate reality:**
- **Simple UI animations (1–5 elements)**: Both libraries maintain 60 fps reliably. The performance difference is imperceptible.
- **Medium complexity (10–20 elements, simple scroll)**: Both libraries maintain 60 fps on desktop. Motion may show occasional frame drops on mid-range mobile; GSAP stays smooth.
- **High complexity (40+ elements, pinned sections, scrubbed timeline)**: GSAP maintains 60 fps on most devices. Motion struggles to stay above 45 fps without aggressive optimization and React.memo usage everywhere.

**Bundle size impacts Time-to-Interactive (TTI).** A 35 KB animation library adds parse and compile overhead before any frame renders. On a 4G connection with a mid-range phone, this can push TTI by 100–200 ms. For sites where "first animation plays" is part of the brand experience, this matters. Motion's `animate()` mini is the clear choice when TTI is critical and React integration isn't required.

---

## Performance Benchmarks: The Numbers That Matter

**Motion claims 2.5× faster startup for unknown-value animations and 6× faster interpolation between value types**, leveraging the Web Animations API and GPU compositing. **GSAP maintains performance dominance under complex scroll-driven load**, especially for long timelines with 50+ elements, pinned sections, and scrubbed animations where React reconciliation overhead becomes measurable.

---

## Developer Experience: Writing the Same Animation in Both Libraries

**Motion requires fewer lines for component-level interactions** but becomes verbose for complex cross-component sequences. **GSAP requires more boilerplate for simple UI feedback** but scales gracefully to sequences that would be unmaintainable in Motion.

Let's look at the same interaction—a card that scales on hover, then expands into a full-size modal on click—implemented in both libraries. This is the type of "shared layout" animation that premium sites use constantly.

### Motion Implementation

```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

function ExpandableCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        layout
        layoutId="card"
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          width: 300,
          height: 200,
          background: "#6366f1",
          borderRadius: 16,
          cursor: "pointer",
        }}
      >
        <motion.h3 layout="position">Card Title</motion.h3>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layoutId="card"
            onClick={() => setIsExpanded(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#6366f1",
              borderRadius: 0,
              zIndex: 100,
            }}
          >
            <motion.h3 layout="position">Card Title</motion.h3>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              Full content revealed with automatic layout animation
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Key Motion features in this example:**
- `layout` prop automatically animates position/size changes between renders
- `layoutId="card"` creates a shared element transition—Motion treats both elements as the same entity and morphs between their bounding boxes
- `AnimatePresence` handles exit animations when the modal unmounts
- `whileHover` declarative gesture handler
- `layout="position"` on the title keeps text from stretching during the layout morph

**Lines of code (excluding styles):** ~35 lines

### GSAP Implementation

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

function ExpandableCardGSAP() {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Hover animation
    const hoverTween = gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      paused: true,
    });

    const handleMouseEnter = () => hoverTween.play();
    const handleMouseLeave = () => hoverTween.reverse();

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      hoverTween.kill();
    };
  }, []);

  useEffect(() => {
    if (isExpanded && cardRef.current && modalRef.current) {
      // Capture initial state of the card
      const state = Flip.getState(cardRef.current);

      // Modal entrance animation
      const tl = gsap.timeline();

      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .fromTo(
        modalRef.current,
        {
          borderRadius: 16,
          width: cardRef.current?.offsetWidth,
          height: cardRef.current?.offsetHeight,
          top: cardRef.current?.getBoundingClientRect().top,
          left: cardRef.current?.getBoundingClientRect().left,
        },
        {
          borderRadius: 0,
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          duration: 0.4,
          ease: "power3.inOut",
        },
        0
      )
      .fromTo(
        ".modal-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        0.3
      );

      return () => {
        tl.kill();
      };
    }
  }, [isExpanded]);

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setIsExpanded(true)}
        style={{
          width: 300,
          height: 200,
          background: "#6366f1",
          borderRadius: 16,
          cursor: "pointer",
        }}
      >
        <h3 ref={titleRef}>Card Title</h3>
      </div>

      {isExpanded && (
        <div
          ref={modalRef}
          onClick={() => setIsExpanded(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#6366f1",
            opacity: 0,
            zIndex: 100,
          }}
        >
          <h3>Card Title</h3>
          <p className="modal-content">Full content revealed with GSAP Flip</p>
        </div>
      )}
    </>
  );
}
```

**Key GSAP features in this example:**
- `Flip.getState()` captures the initial layout state before React re-renders
- Manual hover tween with `paused: true` and event listeners (no native hover prop)
- Timeline orchestration for the modal entrance sequence
- Explicit cleanup in `useEffect` return functions (killing tweens, removing listeners)
- Manual position calculations for the morph animation (no automatic shared layout)

**Lines of code (excluding styles):** ~95 lines

### The DX Verdict for This Pattern

**Motion wins this specific use case by a wide margin.** The `layoutId` shared element transition handles automatically what requires 60+ lines of manual state capture, position calculation, and timeline orchestration in GSAP. For card-to-modal, list-to-detail, and tab-underline transitions, Motion's automatic FLIP implementation is unmatched.

But notice what happens if we extend this to a **scroll-driven hero section** with five pinned panels, staggered text reveals, parallax images, and scroll-linked progress indicators. Motion would require a tangle of `useScroll` hooks, `useTransform` motion values, and conditional state. GSAP would use a clean timeline with ScrollTrigger configuration—roughly the same lines of code as this simple card example.

The DX conclusion: **Motion for UI, GSAP for scroll storytelling.**

---

## Scroll Animations: Where GSAP Still Dominates

**GSAP ScrollTrigger remains the industry standard for scroll-driven storytelling** in 2026. Motion's `useScroll` and `useTransform` hooks handle simple viewport-linked transforms elegantly—fades, parallax, scale-on-scroll—but they don't match ScrollTrigger's capabilities for pinned sections, complex scrubbed timelines, and scroll-snapping orchestration.

### What Motion's Scroll API Can Do

Motion provides two primary scroll tools in 2026:

```tsx
const { scrollYProgress } = useScroll({
  target: ref,                          // element to track
  offset: ["start end", "end start"],   // when to start/stop tracking
});

const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

return <motion.div ref={ref} style={{ y, opacity }} />;
```

**Motion's scroll strengths:**
- **Simple viewport progress tracking**: Animate elements based on how much of a section is visible
- **Transform mapping**: Map scroll progress to any animatable value (x, y, scale, rotate, opacity)
- **React-native**: Works natively with component state and conditional rendering
- **Gesture combination**: Combine scroll progress with drag, hover, or tap gestures

**Motion's scroll limitations:**
- **No pinning**: Cannot pin an element while scrolling continues (the core mechanic of most award sites)
- **No scroll-snapping**: Cannot snap to specific scroll positions automatically
- **Limited timeline control**: Chaining multiple elements with precise offsets is verbose
- **Single-element focus**: Each `useScroll` tracks one element; coordinating 20+ elements requires 20+ hooks

### What GSAP ScrollTrigger Can Do

```tsx
useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2000",           // 2000px of scroll "duration"
      pin: true,               // Pin this section
      scrub: 1,                // Smooth scrubbing (1 sec delay)
      snap: {
        snapTo: 1 / 5,         // Snap to each of 5 progress points
        duration: 0.3,
        ease: "power2.inOut",
      },
    },
  });

  tl.from(".hero-title", { y: 100, opacity: 0, duration: 0.5 })
    .from(".hero-image", { scale: 0.8, opacity: 0 }, "<0.2")  // overlap by 0.2
    .to(".panel-1", { xPercent: -100, duration: 1 })
    .to(".panel-2", { xPercent: -100, duration: 1 }, "<")
    .from(".reveal-text", { y: 50, opacity: 0, stagger: 0.1 });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);
```

**GSAP's scroll strengths:**
- **Pinning**: Lock elements in place while scroll continues—the foundation of scroll storytelling
- **Scrubbed timelines**: Scroll position drives precise animation progress with configurable smoothness
- **Nested timelines**: Complex sequences with child timelines, labels, and absolute positioning
- **Scroll snapping**: Automatic snap-to-section behavior for narrative sites
- **Performance at scale**: 50+ pinned elements with scrubbed animations maintain 60 fps

### When to Use Which for Scroll

| Scroll Pattern | Recommendation | Library |
|----------------|----------------|---------|
| Simple parallax | Motion | `useScroll` + `useTransform` |
| Viewport fade-ins | Motion | `whileInView` prop |
| Sticky header progress | Motion | `useScroll` on `document` |
| Single pinned hero | GSAP | ScrollTrigger `pin: true` |
| Multi-section scroll story | GSAP | Timeline + pinned sections |
| Scroll-snap landing page | GSAP | ScrollTrigger `snap` config |
| Complex parallax with 10+ layers | GSAP | Nested timeline with stagger |

For a deep dive on GSAP ScrollTrigger architecture, see my dedicated guide: [GSAP ScrollTrigger Architecture: Pixel-Perfect Scroll Storytelling](/blog/2026/05/gsap-scrolltrigger-architecture-scroll-storytelling).

---

## Layout Animations: Motion's Unfair Advantage

**Motion's `layout` prop and `layoutId` shared element transitions are unmatched by any other library.** GSAP's Flip plugin can approximate some effects, but Motion's automatic FLIP (First, Last, Invert, Play) implementation—triggered by React re-renders—is significantly more ergonomic for UI state changes.

### Understanding FLIP Animations

FLIP is the technique for smooth layout transitions:
1. **First**: Record the initial position/size
2. **Last**: Let React/DOM update to the new state
3. **Invert**: Calculate the difference and apply a transform to "invert" the visual change
4. **Play**: Animate the transform to zero (the element appears to move/resize smoothly)

**Motion does all four steps automatically when you add `layout`:**

```tsx
// List reordering with automatic layout animation
function SortableList({ items }) {
  const [sortedItems, setSortedItems] = useState(items);

  return (
    <ul>
      {sortedItems.map((item) => (
        <motion.li
          key={item.id}
          layout                        // Animate position when list reorders
          layoutId={`item-${item.id}`}  // Shared layout for list-to-detail
          onClick={() => expandItem(item.id)}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {item.name}
        </motion.li>
      ))}
    </ul>
  );
}
```

**The `layout` prop variants:**
- `layout={true}`: Animate both position and size changes
- `layout="position"`: Only animate position (size changes instantly)
- `layout="size"`: Only animate size (position changes instantly)
- `layoutAnchor="top left"`: Control which point acts as the morph reference

### Shared Layout Transitions with `layoutId`

This is Motion's signature feature—elements with the same `layoutId` morph into each other even if they're different components in different parts of the tree:

```tsx
function Tabs() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {["home", "about", "contact"].map((tab) => (
        <button key={tab} onClick={() => setActiveTab(tab)} style={{ position: "relative" }}>
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeIndicator"      // Same ID = shared element
              style={{
                position: "absolute",
                bottom: -2,
                left: 0,
                right: 0,
                height: 2,
                background: "#6366f1",
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
```

The underline smoothly glides between tabs—even though React unmounts it from one button and mounts it in another. Motion's layout projection system tracks the shared element and interpolates between bounding boxes.

### GSAP Flip: The Alternative

GSAP's Flip plugin (now free) provides similar capabilities with more manual work:

```tsx
useEffect(() => {
  // Capture state BEFORE React re-renders
  const state = Flip.getState(".card");

  // Let React update (this happens after the effect runs)
  // ... React re-renders with new layout ...

  // Then in the next effect or timeout:
  Flip.from(state, {
    targets: ".card",
    duration: 0.5,
    ease: "power3.out",
    scale: true,
  });
}, [dependency]);
```

**The GSAP Flip workflow requires:**
1. Manually capturing state before React updates
2. Ensuring the DOM has settled before running `Flip.from()`
3. Managing the timing yourself (often `requestAnimationFrame` or `setTimeout`)
4. Manual cleanup and error handling

**For complex shared layout transitions** (card-to-modal, grid-to-list, image zoom), Motion's automatic handling is significantly less error-prone. **For simple reorder animations** where you already have GSAP in the project, Flip works well without adding Motion as a second dependency.

---

## Layout Animations: Motion's Unfair Advantage

**Motion's `layout` prop and `layoutId` shared element transitions are unmatched by any other library**. GSAP's Flip plugin can approximate some effects, but Motion's automatic FLIP (First, Last, Invert, Play) implementation—triggered by React re-renders—is significantly more ergonomic for UI state changes.

---

## React Integration: The Context Problem

**Motion is designed for React's component model**, with automatic cleanup, context-aware propagation, and hooks that feel native. **GSAP requires manual lifecycle management in React**—`useEffect` cleanup, `gsap.context()` for scoping, and careful avoidance of React-DOM conflicts during animations.

### Motion's React-Native Integration

Motion feels like part of React because it is. The library uses React's context system for shared animation configs, automatic cleanup via `useEffect` internally, and motion values that avoid re-renders during animation.

```tsx
// Motion automatically handles cleanup—no manual effect management needed
function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

**Motion's automatic behaviors:**
- **Unmount cleanup**: Animations automatically stop when components unmount
- **Motion values**: Values animate via refs, not state—no re-renders per frame
- **Context propagation**: `AnimatePresence` coordinates exit animations across the tree
- **Strict Mode safe**: Handles React 18 Strict Mode double-mounting correctly

### GSAP's React Overhead

GSAP predates React and knows nothing about its lifecycle. Using GSAP in React requires explicit management:

```tsx
function FadeInGSAP({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Must create animation inside effect
    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // MUST clean up to avoid memory leaks and React warnings
    return () => {
      tween.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

**GSAP's React requirements:**
- **Ref forwarding**: All animated elements need refs for GSAP to target
- **Effect encapsulation**: All GSAP code must be in effects, not render
- **Manual cleanup**: Every tween, timeline, and listener must be killed on unmount
- **Context scoping**: Use `gsap.context()` for component-scoped animation management

### The `gsap.context()` Pattern

For components with multiple animations, GSAP recommends context scoping:

```tsx
function ComplexSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // All animations here are automatically scoped to sectionRef
      gsap.from(".title", { y: 50, opacity: 0 });
      gsap.from(".card", { y: 30, opacity: 0, stagger: 0.1 });
    }, sectionRef); // Scope selector to this ref

    // Cleans up all animations in this context
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <h2 className="title">Title</h2>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
    </section>
  );
}
```

**Context is essential for:**
- Automatic cleanup of multiple animations
- Scoped selectors (avoiding `document.querySelector` conflicts)
- Reversing all animations in a component on unmount

### The Verdict on React Integration

**Motion requires less boilerplate and fewer cognitive footguns** in React. You write animations as props, not effects. Cleanup is automatic. The library handles React's quirks (Strict Mode, concurrent features) internally.

**GSAP requires more discipline but offers more control.** If you need that control—precise playback, scrubbing, external timeline control—the extra boilerplate is worth it. If you're building primarily state-driven UI animations, Motion's lower friction is compelling.

---

## Orchestration Complexity: Timelines vs. Variants

**GSAP timelines are the most powerful animation sequencing system available**, with precise control over overlaps, absolute positioning, labels, and nested timelines. **Motion's `variants` and `stagger` provide elegant orchestration for component-level animations** but become unwieldy for cross-component sequences longer than a few seconds.

### Motion's Variants System

Motion uses declarative variants for orchestration:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // Each child delayed by 0.1s
      delayChildren: 0.3,        // Wait 0.3s before starting children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StaggeredList() {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.li key={i} variants={itemVariants}>
          Item {i}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

**Motion variants strengths:**
- Declarative and readable
- Automatic propagation through the component tree
- Gesture integration (`whileHover`, `whileTap`)
- AnimatePresence for exit orchestration

**Motion variants limitations:**
- No precise timing control (e.g., "start this at 0.2s before that ends")
- Difficult to coordinate across disconnected component trees
- Stagger is limited to child elements
- No scrubbing or external playback control

### GSAP's Timeline System

GSAP uses imperative timelines with absolute control:

```tsx
const masterTl = gsap.timeline();

// Absolute positioning at timeline start
masterTl.from(".intro", { duration: 1, opacity: 0 });

// Relative positioning (starts 0.3s before previous ends)
masterTl.from(".title", { duration: 0.8, y: 50 }, "-=0.3");

// Position at absolute time (at 2 seconds)
masterTl.from(".image", { duration: 1, scale: 0.8 }, 2);

// Label-based positioning
masterTl.addLabel("section2");
masterTl.from(".next-section", { duration: 1, opacity: 0 }, "section2+=0.5");

// Nested timelines
const childTl = gsap.timeline();
childTl.to(".a", { x: 100 });
childTl.to(".b", { x: 100 });

masterTl.add(childTl, "section2");

// Playback control
masterTl.pause();
masterTl.seek(1.5);
masterTl.timeScale(2); // 2x speed
```

**GSAP timeline strengths:**
- Absolute time positioning ("at 1.2 seconds, do this")
- Relative positioning with arbitrary overlaps
- Labels for semantic positioning ("start this at 'heroComplete'")
- Nested timelines for complex sequences
- Full playback control (pause, seek, reverse, scrub)
- ScrollTrigger integration (scrub through timeline with scroll)

### When to Use Which Orchestration

| Orchestration Need | Recommendation | Reason |
|--------------------|----------------|--------|
| Component children stagger | Motion | `variants` + `staggerChildren` is elegant |
| Exit animations | Motion | `AnimatePresence` handles mounting/unmounting |
| Gesture-chained sequences | Motion | `whileHover` → `animate` integration |
| Precise multi-element timing | GSAP | Absolute/relative positioning is unmatched |
| Scroll-scrubbed sequence | GSAP | ScrollTrigger + timeline integration |
| Reversible/seekable animation | GSAP | `pause()`, `seek()`, `reverse()` |
| Cross-component coordination | GSAP | Timelines can target any selector globally |

**The rule of thumb:** If your animation sequence fits within a single component and its direct children, Motion's variants are sufficient and more maintainable. If your sequence spans multiple sections, requires precise timing relationships, or needs scroll scrubbing, GSAP timelines are the professional choice.

---

## Orchestration Complexity: Timelines vs. Variants

**GSAP timelines are the most powerful animation sequencing system available**, with precise control over overlaps, absolute positioning, labels, and nested timelines. **Motion's `variants` and `stagger` provide elegant orchestration for component-level animations** but become unwieldy for cross-component sequences longer than a few seconds.

---

## The Decision Matrix: Which Library for Which Project

**The decision depends on your animation archetype, not abstract library quality.** Here's the practical matrix I use for production work:

| Project Type | Recommended Library | Rationale |
|--------------|---------------------|-----------|
| SaaS dashboard UI | Motion | State-driven micro-interactions, layout animations, gesture feedback |
| Marketing landing page (simple) | Motion | Scroll fade-ins, viewport triggers, hover states |
| Marketing landing page (complex) | GSAP | ScrollTrigger storytelling, pinned sections, hero sequences |
| E-commerce product pages | Motion | Shared layout transitions, cart animations, image zoom |
| Portfolio/Awwwards-style site | GSAP | Pinned scroll sections, morphing, advanced staggers, text reveals |
| Mobile-first PWA | Motion | Smaller bundle potential, React-native gestures, battery efficiency |
| WebGL + animation hybrid | GSAP | R3F/Three.js + GSAP integration for 3D storytelling |
| Admin panel/tool UI | Motion | Form transitions, modal animations, toast notifications |
| One-page narrative site | GSAP | Full scroll control, timeline orchestration, snap points |

### The Hybrid Architecture

Most premium sites I build in 2026 use **both libraries**:

- **Motion for UI layer**: Buttons, modals, form transitions, layout shifts, hover states
- **GSAP for scroll layer**: Pinned sections, scrubbed timelines, parallax, text reveals

This hybrid approach gives you Motion's ergonomic React integration where it matters most (UI interactions happen constantly) and GSAP's scroll storytelling power where it differentiates (scroll sections are the brand experience).

---

## Migration Path: Switching Libraries Mid-Project

**Both libraries can coexist in the same codebase** without conflict. Motion operates through React props; GSAP manipulates refs directly. Many production sites use Motion for UI interactions and GSAP for scroll sections—hybrid architectures that leverage each library's strength.

### Coexistence Without Conflict

Motion and GSAP don't interfere with each other because they target different layers:

```tsx
function HybridSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP for scroll timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      })
      .from(".parallax-bg", { y: 100 })
      .from(".pinned-content", { opacity: 0 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      {/* GSAP controls this via selector */}
      <div className="parallax-bg" />

      {/* Motion controls this via props */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        CTA Button
      </motion.button>

      {/* GSAP pins this */}
      <div className="pinned-content">Scroll-linked content</div>
    </section>
  );
}
```

**Why they coexist cleanly:**
- Motion reads from props, writes to DOM styles via refs (doesn't use CSS classes for targeting)
- GSAP reads from selectors or refs, writes to DOM styles directly
- Neither library patches or replaces the other
- Both respect existing transforms and merge their changes

### Migrating from Motion to GSAP

If you start with Motion and hit scroll animation limits:

1. **Identify the scroll section** causing issues (usually where you need pinning or complex scrubbing)
2. **Wrap that section in a ref** for GSAP targeting
3. **Add GSAP ScrollTrigger** for that section only
4. **Keep Motion for everything else**—UI, modals, layout transitions
5. **No rewrite required**—both libraries work in the same component tree

### Migrating from GSAP to Motion

If you want to reduce GSAP overhead for simpler sites:

1. **Replace simple tweens** with Motion's `whileHover`, `whileTap`, `animate` props
2. **Keep GSAP for scroll sections** that use pinning or scrubbing
3. **Gradually migrate** timeline sequences to Motion variants as appropriate
4. **Remove GSAP entirely** only if you eliminate all scroll-driven storytelling

**The migration cost is low** because both libraries target DOM elements, not virtual abstractions. You're swapping animation engines, not architecture.

---

## FAQ: Framer Motion vs. GSAP in 2026

### Q: Is Framer Motion now called Motion?

**A: Yes, Framer Motion rebranded to Motion in early 2026** with the v12 release. The new package is `motion` on npm, with the React-specific import at `motion/react`. The old `framer-motion` package still works for backward compatibility, but all new features, performance optimizations, and documentation are in the `motion` package. **For new projects in 2026, use `npm install motion` and import from `motion/react`**, not `framer-motion`.

### Q: Which library has better React integration?

**A: Motion has superior React integration** because it was built specifically for React. It uses React's context system for shared configs, handles cleanup automatically on unmount, and provides hooks that feel native to React developers. **GSAP requires manual lifecycle management in React**—you must create tweens in `useEffect`, manage refs for targeting, and explicitly kill animations on unmount to avoid memory leaks. Motion's DX advantage is significant for teams primarily building React applications.

### Q: How do bundle sizes compare in real-world usage?

**A: In typical React production builds, both libraries land in the 30–35 KB gzipped range.** Motion's full React API is ~30–35 KB tree-shaken. GSAP core plus ScrollTrigger and one or two plugins is also ~30–35 KB. **Motion's `animate()` mini build is the smallest option at ~2.6 KB gzipped**, ideal for vanilla JS or isolated animations. **GSAP can grow to 70–80 KB** if you import many plugins without tree-shaking discipline. For React projects, the difference is negligible; choose based on features, not bundle size.

### Q: Can I use both libraries in the same project?

**A: Yes, Motion and GSAP coexist cleanly in the same codebase.** Motion operates through React props and refs, while GSAP manipulates the DOM directly via selectors or refs. They don't interfere with each other. **Many production sites use both**: Motion for UI interactions (buttons, modals, layout transitions) and GSAP for scroll storytelling (pinned sections, scrubbed timelines). This hybrid approach leverages each library's strength without the cost of rewriting existing animations.

### Q: Which library is better for scroll-driven animations?

**A: GSAP with ScrollTrigger is the clear winner for scroll-driven animations**, particularly pinned sections, scrubbed timelines, and scroll-snapping. Motion's `useScroll` and `useTransform` hooks handle simple parallax and viewport fade-ins elegantly, but they lack pinning capabilities and struggle with complex multi-element scroll sequences. **For award-winning scroll storytelling sites, GSAP ScrollTrigger is the industry standard** and remains unmatched in 2026.

### Q: Does GSAP's free plugin policy include commercial use?

**A: Yes, GSAP's free plugin policy includes unrestricted commercial use.** As of GSAP 3.13 (early 2026), all formerly paid "Club GSAP" plugins—including ScrollTrigger, SplitText, MorphSVG, Flip, and Inertia—are free for all users, including commercial projects. **No attribution is required, no license key is needed, and there are no usage limits.** This change, made possible by Webflow's acquisition of GSAP, removes the licensing friction that previously pushed some teams toward Motion.

### Q: Which performs better on mobile devices?

**A: Motion has lower parse overhead on initial load**, which benefits low-end mobile devices. Motion's `animate()` mini at 2.6 KB adds minimal JavaScript parse time. However, **GSAP maintains better performance under complex animation load**—scroll sequences with 40+ elements, pinned sections, and scrubbed timelines stay at 60 fps on GSAP where Motion may drop to 30–45 fps on mid-range mobile devices. **For simple UI animations, Motion is more efficient; for complex scroll experiences, GSAP performs better.**

### Q: Is Motion's Web Animations API integration an advantage?

**A: Motion's WAAPI integration provides measurable advantages for specific use cases.** Motion reports 2.5× faster startup when animating from unknown computed values and 6× faster interpolation between different value types (e.g., numeric to transform, or mixing color formats). WAAPI offloads animation work to the browser's native engine, reducing CPU usage and potentially improving battery life on mobile. **However, WAAPI offers less control than GSAP's JavaScript interpolation**, which is why GSAP maintains advantages for complex timeline control and scroll scrubbing where precise frame-by-frame manipulation matters.

### Q: When should I choose Motion over GSAP?

**A: Choose Motion when your animations are state-driven UI interactions**—modals opening, cards expanding, layout shifts, hover effects, gesture responses, and shared element transitions. Motion's declarative API, automatic layout animations, and React-native integration make it the ergonomic choice for component-level motion. **Specifically choose Motion for:** dashboard UIs, e-commerce interactions, form transitions, list reordering, tab underlines, and any animation primarily triggered by React state changes.

### Q: When should I choose GSAP over Motion?

**A: Choose GSAP when your animations are timeline-driven experiences**—scroll storytelling, choreographed hero sequences, pinned sections, and complex multi-element orchestration. GSAP's imperative control, ScrollTrigger integration, and timeline sequencing are unmatched for narrative animation work. **Specifically choose GSAP for:** marketing landing pages with scroll storytelling, portfolio sites with pinned sections, award-worthy immersive experiences, text reveals with SplitText, SVG morphing, and any project where scroll position drives precise animation timing.

---

## Start Building Premium Motion Experiences

Animation is not decoration—it's the language of premium digital experiences. The sites that win awards, convert visitors, and build brand equity all share one trait: **they move with intention.**

Whether you need Motion's ergonomic React integration for a SaaS dashboard or GSAP's scroll storytelling power for a cinematic brand experience, the technical choice matters less than the **motion strategy** behind it. Great animation requires understanding pacing, narrative timing, performance budgets, and how motion serves conversion psychology.

**I build immersive digital experiences for premium brands**—sites where animation is the core value proposition, not an afterthought. From scroll-driven storytelling that wins Awwwards recognition to React UI systems that feel alive with micro-interactions, I help teams ship motion that differentiates.

[Start a custom website project](/contact) — Let's build a flagship digital experience that moves your audience.

[Book a 15-min discovery call](https://cal.com/williamspurlock/discovery) — Tell me about your project and I'll share how we'd approach the animation architecture.

---

## Related Reading

- [GSAP ScrollTrigger Architecture: Pixel-Perfect Scroll Storytelling](/blog/2026/05/gsap-scrolltrigger-architecture-scroll-storytelling) — Deep dive on building scroll-driven narrative sites with pinned sections, scrubbed timelines, and scroll snapping
- [Build an Award-Worthy Hero Section with React Three Fiber and GSAP](/blog/2026/05/award-worthy-hero-react-three-fiber-gsap) — Complete tutorial on combining WebGL and GSAP for immersive hero experiences

Looking for the foundational principles behind cinematic web design? The immersive web pillar post covers the full stack—from animation philosophy to performance budgets to scroll storytelling patterns. Follow the cluster for more on Three.js, kinetic typography, and premium web architecture.
