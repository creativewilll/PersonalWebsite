---
title: "The Immersive Web Design Manual: Cinematic Sites in 2026"
slug: "immersive-web-design-manual"
date: "2026-05-06"
lastModified: "2026-05-06"
author: "William Spurlock"
readingTime: 60
categories:
  - "Web Design and Digital Experiences"
tags:
  - "gsap"
  - "scrolltrigger"
  - "framer motion"
  - "three.js"
  - "react three fiber"
  - "webgl"
  - "scroll storytelling"
  - "immersive design"
  - "cinematic websites"
  - "motion design"
featured: true
draft: false
excerpt: "The complete technical guide to building cinematic, scroll-driven websites that justify 5-figure budgets. GSAP ScrollTrigger architecture, Framer Motion patterns, Three.js hero sections, and performance budgets."
coverImage: "/images/blog/immersive-web-design-manual-cover.png"
seoTitle: "Immersive Web Design Manual 2026 | Cinematic Site Architecture"
seoDescription: "Master scroll-driven web design with GSAP ScrollTrigger, Framer Motion, Three.js, and React Three Fiber. Technical guide to building award-worthy immersive websites."
seoKeywords:
  - "immersive web design"
  - "gsap scrolltrigger tutorial"
  - "cinematic website design"
  - "three.js website examples"
  - "framer motion patterns"
  - "scroll storytelling"
  - "webgl animations"
  - "premium web design 2026"
  - "react three fiber"
  - "award winning website design"
aioTargetQueries:
  - "how to build immersive scroll-driven websites"
  - "best animation library for react 2026"
  - "gsap vs framer motion which to use"
  - "how to add three.js to next.js website"
  - "scrolltrigger parallax tutorial"
  - "webgl performance optimization"
  - "award website design patterns"
  - "typography motion design web"
contentCluster: "immersive-web"
pillarPost: true
entityMentions:
  - "William Spurlock"
  - "GSAP"
  - "GreenSock"
  - "Framer Motion"
  - "Three.js"
  - "React Three Fiber"
  - "Next.js"
  - "Tailwind CSS"
  - "WebGL"
  - "ScrollTrigger"
  - "Lenis"
  - "Vercel"
serviceTrack: "web-design"
---

# The Immersive Web Design Manual: Cinematic Sites in 2026

## What Makes a Website "Immersive" in 2026?

**An immersive website creates spatial depth and narrative progression through scroll-driven motion, making the viewer feel present inside the brand story rather than merely reading about it.** The term has been diluted by template markets slapping "immersive" on parallax backgrounds, so let's define what actually separates cinematic web design from decorative animation.

True immersive design operates on four axes:

| Axis | Description | Implementation |
|------|-------------|----------------|
| **Narrative Pacing** | Content unfolds rhythmically with user scroll progress | GSAP ScrollTrigger timelines with scrubbed animations |
| **Spatial Depth** | Layered planes create perceived 3D space beyond the viewport | Z-axis transforms, perspective containers, depth sorting |
| **Motion Grammar** | Consistent physics and easing create tactile feedback | Custom bezier curves, spring constants, velocity matching |
| **Conversion Architecture** | Motion guides attention toward action without interrupting flow | Progressive disclosure, micro-interactions on CTAs |

The distinction matters because **decorative animation subtracts value** while **immersive design multiplies it**. A website with floating geometric shapes that drift aimlessly is decoration. A website where those shapes respond to scroll position, reveal product features at specific beats, and settle into a conversion-focused resting state is immersive architecture.

In 2026, the technical stack for immersive work has stabilized around **GSAP ScrollTrigger** (3.14.2) for scroll coupling, **Motion** (v12.38, formerly Framer Motion) for component-level React animations, **React Three Fiber** (v9.5) for spatial hero sections, and **Lenis** for smooth scroll physics. The craft isn't in choosing the library—it's in orchestrating them so the user forgets they're looking at a browser.

The projects that justify five-figure budgets share common traits: they treat the scroll wheel as a narrative control, not just navigation; they use motion to reveal information progressively rather than displaying everything at once; and they maintain 60fps on mid-tier devices while serving desktop experiences that rival native applications. This manual covers the complete technical implementation of each trait.

## GSAP ScrollTrigger: The Foundation of Scroll-Driven Design

**GSAP ScrollTrigger is the industry-standard solution for coupling animations to scroll progress, offering pinning, scrubbing, and timeline orchestration that no native API or competitor matches.** While CSS scroll-driven animations have improved, they lack the precision, cross-browser consistency, and debugging tools required for production-grade immersive work.

GreenSock's ScrollTrigger plugin (current version 3.14.2) operates by creating trigger points that map animation progress to scroll position. Unlike Intersection Observer-based approaches that fire once at thresholds, ScrollTrigger provides continuous scrubbing—animations that advance and retreat frame-perfectly with user scroll.

### ScrollTrigger Setup and Best Practices

The initialization pattern I use on every project starts with defaults that prevent the most common production issues:

```typescript
// lib/gsap.ts - GSAP setup with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Global defaults for performance and consistency
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

ScrollTrigger.defaults({
  markers: false, // Enable only in development
  scrub: 1, // 1-second smoothing prevents jerky scroll
  anticipatePin: 1, // Reduces jump when pinning starts
  invalidateOnRefresh: true, // Recalculates on resize/orientation change
});

// Cleanup pattern for React components
export const cleanupScrollTriggers = (container?: HTMLElement) => {
  ScrollTrigger.getAll()
    .filter(st => !container || st.vars.trigger?.closest(container))
    .forEach(st => st.kill());
};
```

Critical configuration decisions that separate professional implementations from amateur work:

| Setting | Default | Recommendation | Rationale |
|---------|---------|----------------|-----------|
| `scrub` | `false` | `true` or `1` | Smooth animation tied to scroll position |
| `pin` | `false` | Use sparingly | Pins create layer promotion overhead |
| `start` | `"top bottom"` | Be explicit | Vague triggers cause inconsistent behavior |
| `end` | `"bottom top"` | Calculate dynamically | Content height changes break fixed values |
| `anticipatePin` | `0` | `1` | Prevents visual jump when pinning activates |

The **React integration pattern** that prevents memory leaks and double-triggering requires understanding component lifecycle. GSAP animations must be created in `useEffect`, cleaned up on unmount, and refreshed when layout changes:

```tsx
// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimation = (
  animationCallback: (tl: gsap.core.Timeline) => void,
  deps: unknown[] = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

    timelineRef.current = tl;
    animationCallback(tl);

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === containerRef.current)
        .forEach(st => st.kill());
    };
  }, deps);

  return containerRef;
};
```

### Pinning Strategies That Actually Work

**Pinning freezes an element in viewport while scroll continues, creating narrative beats where content evolves without moving.** This technique—essential for storytelling sequences—requires understanding browser compositing to avoid performance disasters.

There are two pinning approaches with different use cases:

1. **Element Pinning**: The trigger element stays fixed while its parent scrolls past. Use for cards that transform as the user scrolls.
2. **Container Pinning**: An entire section pins while internal elements animate. Use for full-viewport narrative sequences.

```typescript
// Element pinning for card transformation
gsap.to(".feature-card", {
  scrollTrigger: {
    trigger: ".feature-card",
    start: "top center",
    end: "+=500", // Pin for 500px of scroll
    pin: true,
    scrub: 1,
  },
  scale: 1.1,
  borderRadius: "24px",
});

// Container pinning for narrative sequence
gsap.timeline({
  scrollTrigger: {
    trigger: ".narrative-section",
    start: "top top",
    end: "+=2000", // Long pin for complex sequence
    pin: true,
    scrub: 1,
    snap: {
      snapTo: "labels", // Snap to timeline labels
      duration: { min: 0.2, max: 0.5 },
      delay: 0,
    }
  }
})
  .from(".scene-1", { opacity: 0, y: 50 })
  .addLabel("scene1")
  .to(".scene-1", { opacity: 0, y: -50 })
  .from(".scene-2", { opacity: 0, y: 50 })
  .addLabel("scene2");
```

**The mobile pinning problem**: iOS Safari and Chrome Android handle viewport changes dynamically (address bar collapse, keyboard appearance). Fixed positioning breaks in unpredictable ways. The solution is **conditional pinning**:

```typescript
// Responsive pinning that disables on mobile
ScrollTrigger.create({
  trigger: ".narrative-section",
  pin: window.innerWidth > 768, // Disable on mobile
  start: "top top",
  end: "+=1500",
  scrub: 1,
});

// Or use ScrollTrigger's built-in media queries
ScrollTrigger.matchMedia({
  "(min-width: 768px)": () => {
    gsap.to(".desktop-only-pin", {
      scrollTrigger: {
        trigger: ".desktop-only-pin",
        pin: true,
        scrub: 1,
      },
      rotation: 360,
    });
    
    // Return cleanup function
    return () => {};
  }
});
```

Pinning creates new stacking contexts and promotes elements to compositor layers. **Never pin more than three elements simultaneously**—the GPU memory overhead causes frame drops on mid-tier devices. For complex sequences, use timeline orchestration instead of multiple independent pins.

### ScrollTrigger Setup and Best Practices

*Subsection: Initialization patterns, performance defaults, and responsive behavior.*

### Pinning Strategies That Actually Work

*Subsection: Container pinning vs element pinning, common pitfalls, and mobile handling.*

## Motion (formerly Framer Motion): React-Native Animation Grammar

**Motion (formerly Framer Motion) provides the most ergonomic React animation API available, using declarative props and automatic gesture handling that makes component-level motion accessible without imperative GSAP code.** For UI micro-interactions, layout transitions, and React-native animations (gestures, hover, tap), it outperforms GSAP in developer experience and bundle size.

The library rebranded from "Framer Motion" to **Motion** in late 2025, with the import path changing from `"framer-motion"` to `"motion/react"`. Current Motion v12.38.0 provides React 19 compatibility, enhanced layout animations with `layoutRoot`, and improved spring physics that match iOS system motion more closely. The core abstraction—wrapping components with `motion` to unlock animation props—remains unchanged and elegantly simple.

> **Import migration:** Replace `import { motion } from 'framer-motion'` with `import { motion } from 'motion/react'` in all new projects. The old package still works but is deprecated.

### Motion Component Architecture

Every HTML and SVG element has a motion equivalent: `motion.div`, `motion.span`, `motion.button`, `motion.path`. These components accept animation props that automatically handle mount/unmount transitions, gesture states, and layout changes:

```tsx
// Basic motion component with variants
import { motion } from 'motion/react';

const buttonVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  hover: { 
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  tap: { scale: 0.98 }
};

<motion.button
  variants={buttonVariants}
  initial="initial"
  animate="animate"
  whileHover="hover"
  whileTap="tap"
>
  Get Started
</motion.button>
```

The **variant system** is Framer Motion's superpower. Instead of declaring animation values inline, you define states and transition between them. This enables:

- **Orchestrated children**: Child components animate in sequence when parent state changes
- **Propagated gestures**: Hover on parent triggers child animations
- **Shared layout animations**: Elements morph between positions smoothly

```tsx
// Orchestrated stagger reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### AnimatePresence and Exit Animations

React's lack of exit animations—components disappear immediately when unmounted—is a long-standing limitation. **AnimatePresence** solves this by tracking removed children and running their exit variants before DOM removal:

```tsx
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const TabPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="tab-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'features' && <Features />}
          {activeTab === 'pricing' && <Pricing />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
```

The `mode` prop controls how concurrent animations are handled:

| Mode | Behavior | Use Case |
|------|----------|----------|
| `sync` | All animations run simultaneously | Lists with multiple items |
| `popLayout` | Exiting element stays in flow during exit | Layout transitions |
| `wait` | Exit completes before enter begins | Tab panels, page transitions |

**Layout animations**—automatically animating elements when their position/size changes—require the `layout` prop:

```tsx
// Reordering list with automatic morphing
<motion.li 
  layout 
  layoutId={`item-${id}`}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
>
  {content}
</motion.li>
```

When items reorder, Framer Motion calculates the position delta and animates the element to its new location without explicit position values. The `layoutId` prop enables **shared layout animations**—elements with matching IDs morph between components, enabling fluid page transitions and complex UI patterns.

For immersive web work, Framer Motion excels at:
- **Hover and tap feedback** on interactive elements
- **Staggered reveals** for content sections
- **Layout transitions** for filtering, sorting, tab switches
- **Gesture-driven interactions** (drag, swipe, pan)

It should not be used for:
- **Scroll-coupled animations** (use GSAP ScrollTrigger)
- **Complex timeline orchestration** (use GSAP timelines)
- **Character-level text animations** (use GSAP SplitText)

The two libraries complement each other: Framer Motion for component states and gestures, GSAP for scroll-driven sequences and complex timeline control.

### Motion Component Architecture

*Subsection: The `motion` API, gesture handlers, and spring physics configuration.*

### AnimatePresence and Exit Animations

*Subsection: Mount/unmount orchestration, mode transitions, and staggered reveals.*

## GSAP vs Framer Motion: When to Use Which

**GSAP and Framer Motion are not competitors—they're complementary tools with distinct sweet spots that professional developers use together.** The wrong choice isn't using one over the other; it's using the wrong tool for a specific animation problem, resulting in verbose code, performance issues, or maintenance nightmares.

The decision matrix is straightforward once you internalize each library's core strengths:

| Animation Type | Recommended Tool | Rationale |
|----------------|------------------|-----------|
| **Scroll-coupled effects** | GSAP ScrollTrigger | Native scrubbing, pinning, continuous scroll mapping |
| **Component state transitions** | Framer Motion | Declarative variants, automatic gesture handling |
| **Complex timeline orchestration** | GSAP Timelines | Precise control over sequences, labels, nesting |
| **Layout transitions** | Framer Motion | Automatic position/size interpolation |
| **Text character animation** | GSAP SplitText | Line/word/char segmentation with performance |
| **Page transitions** | Framer Motion | AnimatePresence, layoutId for shared elements |
| **Gesture-driven interactions** | Framer Motion | Pan, drag, pinch with velocity physics |
| **High-performance WebGL sync** | GSAP | Better requestAnimationFrame integration |

### When GSAP Is the Clear Choice

GSAP wins for any animation coupled to scroll position. Framer Motion has no scroll-aware equivalent to ScrollTrigger's scrubbing and pinning. The imperative API—explicitly creating tweens and timelines—provides precision that declarative React props cannot match:

```typescript
// GSAP timeline with precise control
gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=2000",
    scrub: 1,
    snap: {
      snapTo: 1 / 5, // Snap to 20% increments
      duration: 0.3,
    }
  }
})
  .to(".element-1", { x: 100, duration: 1 })
  .to(".element-2", { y: 200, duration: 1 }, "<0.5") // Start 0.5s before previous ends
  .addLabel("midpoint")
  .to(".element-3", { rotation: 360, duration: 1 });
```

GSAP also dominates for **plugin ecosystem requirements**. SplitText for typography, MorphSVG for path interpolation, and PixiPlugin for WebGL integration have no Framer Motion equivalents. The GSAP core is framework-agnostic—same API in React, Vue, vanilla JS, or Webflow.

Bundle size considerations favor GSAP for scroll-heavy sites despite the larger base library (~85KB vs Motion's ~40KB). And as of GSAP 3.14, all plugins including SplitText and MorphSVG are free for commercial use—eliminating the Club GreenSock paywall that previously gated advanced animation features. Tree-shaking with GSAP is more predictable, and the scroll performance gains outweigh the initial load cost.

### When Framer Motion Is Superior

Framer Motion is the correct choice for **UI micro-interactions** and **state-driven animations**. The declarative API—animation values as props—aligns with React's mental model:

```tsx
// Framer Motion for UI states
<motion.button
  animate={{ 
    scale: isLoading ? 0.95 : 1,
    opacity: isLoading ? 0.7 : 1 
  }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  {isLoading ? <Spinner /> : "Submit"}
</motion.button>
```

The **automatic layout animations**—elements smoothly transitioning when their DOM position changes—are uniquely powerful. Reordering lists, filtering grids, or responsive reflows happen fluidly without explicit position calculation:

```tsx
// Automatic layout morphing on reorder
<motion.div layout layoutId={id}>
  {content}
</motion.div>
```

Framer Motion also handles **gesture recognition** natively. Drag constraints, swipe detection, and pan physics work without manual event listeners or velocity calculations:

```tsx
// Gesture-driven carousel
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.2}
  onDragEnd={(e, { offset, velocity }) => {
    if (offset.x > 100 || velocity.x > 500) {
      paginate(-1);
    } else if (offset.x < -100 || velocity.x < -500) {
      paginate(1);
    }
  }}
/>
```

### The Hybrid Architecture Pattern

Professional immersive sites use both libraries together, with clear boundaries:

```tsx
// components/ImmersiveSection.tsx
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ImmersiveSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP for scroll-driven sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      })
        .from(".scroll-element", { y: 50, opacity: 0, stagger: 0.1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      {/* Framer Motion for hover/tap states */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Interact With Me
      </motion.button>
      
      {/* GSAP-controlled scroll elements */}
      <div ref={contentRef}>
        <div className="scroll-element">Content 1</div>
        <div className="scroll-element">Content 2</div>
      </div>
    </section>
  );
};
```

Key architectural rules for hybrid usage:

1. **Use GSAP timelines for entrance sequences** tied to scroll position
2. **Use Framer Motion for interactive states** (hover, focus, active)
3. **Never mix scroll control**—don't use Framer Motion's `useScroll` alongside GSAP ScrollTrigger
4. **Clean up both on unmount**—GSAP's `ctx.revert()` and React's cleanup pattern
5. **Share refs sparingly**—prefer separate containers to avoid animation conflicts

The right tool for the right job produces code that's maintainable by other developers and performs at 60fps on target devices.

## Three.js and React Three Fiber: Spatial Hero Sections

**Three.js combined with React Three Fiber (R3F) brings true 3D spatial depth to web experiences, enabling product showcases, abstract visualizations, and interactive environments that CSS transforms cannot approach.** While 2.5D parallax creates perceived depth, WebGL renders actual geometry with lighting, materials, and physics-based interactions.

React Three Fiber v9.5.0 provides React 19.2 compatibility (including the new Activity feature for offscreen rendering) and significant performance improvements through fiber architecture updates. Three.js itself is at r176, with WebGPU support production-ready since r171—all major browsers including Safari (since September 2025) now support WebGPU. The declarative API—writing Three.js scenes as JSX components—eliminates the imperative boilerplate that made raw Three.js development tedious.

### R3F Scene Architecture

A production R3F scene requires careful Canvas configuration to balance quality with performance. The defaults I use for client work prioritize stability over maximum visual fidelity:

```tsx
// components/ThreeScene.tsx
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';

export const ThreeScene = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5],
      }}
      dpr={[1, 2]} // Responsive pixel ratio: min 1, max 2
      frameloop="demand" // Only render on changes
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <ProductModel />
      </Suspense>
    </Canvas>
  );
};
```

Critical Canvas props for performance:

| Prop | Setting | Purpose |
|------|---------|---------|
| `dpr` | `[1, 2]` | Limits pixel ratio on high-DPI displays to prevent mobile GPU overload |
| `frameloop` | `"demand"` | Pauses render loop when scene is static |
| `gl.powerPreference` | `"high-performance"` | Requests discrete GPU on hybrid systems |
| `shadows` | `true` (conditional) | Enable only when shadows are visible |

The **suspense boundary** around 3D content is mandatory. R3F uses React Suspense for async asset loading (models, textures, HDR environments). Without it, missing assets block the entire render.

### Interactive 3D Elements

**Raycasting**—tracing a line from camera through mouse position to detect 3D intersections—enables hover and click interactions. R3F abstracts this through the `useFrame` hook and event handlers:

```tsx
// components/InteractiveMesh.tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const InteractiveMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Continuous rotation animation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    
    // Smooth scale transition on hover
    const targetScale = active ? 1.5 : hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(
      new Vector3(targetScale, targetScale, targetScale),
      delta * 5
    );
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? "hotpink" : "orange"}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};
```

The `useFrame` hook runs before every render frame, providing delta time for smooth animations independent of frame rate. This is R3F's equivalent to GSAP's ticker or requestAnimationFrame loops.

For product showcases, the **PresentationControls** component from `@react-three/drei` provides standardized orbit behavior:

```tsx
import { PresentationControls, Float } from '@react-three/drei';

<PresentationControls
  global
  rotation={[0, 0, 0]}
  polar={[-0.4, 0.2]}
  azimuth={[-0.5, 0.5]}
  config={{ mass: 2, tension: 400 }}
  snap={{ mass: 4, tension: 400 }}
>
  <Float rotationIntensity={0.4}>
    <ProductModel />
  </Float>
</PresentationControls>
```

**Scroll-based 3D animation** requires connecting R3F to GSAP ScrollTrigger. The pattern uses `useFrame` to read scroll progress and update camera or object transforms:

```tsx
// components/ScrollDrivenScene.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ScrollDrivenScene = () => {
  const groupRef = useRef<Group>(null);
  const scroll = useScroll(); // R3F scroll utility

  useFrame(() => {
    if (!groupRef.current) return;
    
    // scroll.offset is 0-1 progress through scrollable area
    const rotation = scroll.offset * Math.PI * 2;
    groupRef.current.rotation.y = rotation;
    groupRef.current.position.y = scroll.offset * 3;
  });

  return (
    <group ref={groupRef}>
      <ProductModel />
    </group>
  );
};
```

For Next.js App Router compatibility, R3F requires the `'use client'` directive since it depends on browser APIs (WebGL, DOM events). Keep R3F components in client boundary files and pass server-rendered content as props or children through `Children` API.

Performance budgets for 3D scenes:
- **Triangle count**: Under 100K for mobile, 500K for desktop
- **Texture resolution**: 2048x2048 maximum, 1024x1024 for mobile
- **Draw calls**: Batch materials, use instancing for repeated geometry
- **Shadows**: Use contact shadows or baked AO instead of real-time shadows on mobile

### R3F Scene Architecture

*Subsection: Canvas configuration, camera defaults, and performance budgeting.*

### Interactive 3D Elements

*Subsection: Raycasting, hover states, and click interactions without frame drops.*

## Scroll Storytelling: Pacing, Anchoring, and Reveal Patterns

**Scroll storytelling treats the vertical scroll axis as a timeline, mapping narrative beats to physical user input and creating experiences where content reveals itself progressively rather than displaying all at once.** The technique transforms static landing pages into guided journeys that hold attention longer and communicate complex value propositions in digestible sequences.

The cognitive principle at work is **progressive disclosure**: humans process information better when it arrives in structured chunks rather than overwhelming density. Scroll storytelling enforces this structure through motion—each scroll advance triggers a revelation, and the user's physical effort (scrolling) creates investment in the narrative outcome.

### The Scroll Timeline as Narrative Device

Professional scroll stories follow a three-act structure mapped to scroll percentage:

| Act | Scroll Range | Purpose | Animation Approach |
|-----|--------------|---------|-------------------|
| **Setup** (Act 1) | 0-20% | Establish context, hook attention | Full-viewport hero, brand statement, visual spectacle |
| **Confrontation** (Act 2) | 20-70% | Present problems, solutions, proof | Feature reveals, testimonials, data visualization |
| **Resolution** (Act 3) | 70-100% | Convert interest to action | CTA focus, pricing clarity, final persuasion |

The **pinning strategy** for narrative sequences creates what I call "scroll theater"—the viewport becomes a stage where elements enter, perform, and exit as the user scrolls:

```typescript
// Three-act scroll theater timeline
gsap.timeline({
  scrollTrigger: {
    trigger: ".narrative-section",
    start: "top top",
    end: "+=3000", // Long scroll distance for complex narrative
    pin: true,
    scrub: 1,
  }
})
// Act 1: Setup - 0% to 30%
.from(".hero-headline", { opacity: 0, y: 50, duration: 0.3 }, 0)
.from(".hero-visual", { scale: 0.8, opacity: 0, duration: 0.3 }, 0)
.addLabel("act1End", 0.3)

// Act 2: Confrontation - 30% to 70%
.to(".hero-headline", { opacity: 0, y: -50, duration: 0.2 }, 0.3)
.to(".hero-visual", { x: -200, opacity: 0.3, duration: 0.2 }, 0.3)
.from(".problem-statement", { opacity: 0, x: 50, duration: 0.3 }, 0.35)
.from(".solution-cards", { opacity: 0, y: 100, stagger: 0.1, duration: 0.2 }, 0.5)
.addLabel("act2End", 0.7)

// Act 3: Resolution - 70% to 100%
.to(".problem-statement", { opacity: 0, y: -30, duration: 0.15 }, 0.7)
.to(".solution-cards", { opacity: 0, scale: 0.9, duration: 0.15 }, 0.7)
.from(".cta-container", { opacity: 0, y: 50, duration: 0.3 }, 0.75);
```

### Reveal Patterns That Convert

Beyond narrative structure, specific reveal patterns have proven effective for conversion-focused sites:

**The Text Mask Reveal**: Large typography reveals content through letterforms, creating a cinematic title sequence effect:

```typescript
// Text mask reveal using clip-path
gsap.from(".masked-headline", {
  scrollTrigger: {
    trigger: ".masked-section",
    start: "top center",
    end: "center center",
    scrub: 1,
  },
  clipPath: "inset(100% 0% 0% 0%)", // Start fully clipped
  opacity: 0.5,
});

// CSS: clip-path: inset(0% 0% 0% 0%) is the end state
```

**The Image Curtain**: Product images or screenshots reveal through progressive unmasking, often synced with feature copy:

```typescript
// Synced image and text reveal
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".feature-showcase",
    start: "top 70%",
    end: "center center",
    scrub: 1,
  }
});

tl.from(".feature-image", { 
  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  duration: 0.5 
})
.from(".feature-text", { 
  opacity: 0, 
  y: 30, 
  duration: 0.3 
}, "-=0.2");
```

**The Data Cascade**: Statistics and metrics animate in sequence, each number counting up as it enters view:

```typescript
// Counting animation with ScrollTrigger trigger
gsap.utils.toArray(".stat-number").forEach((stat) => {
  const target = parseInt(stat.dataset.value);
  
  gsap.from(stat, {
    textContent: 0,
    duration: 2,
    ease: "power1.out",
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: stat,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    onUpdate: function() {
      stat.textContent = Math.ceil(this.targets()[0].textContent);
    }
  });
});
```

**Progressive disclosure** patterns work particularly well for complex products. Instead of showing all features at once, each scroll beat reveals one capability with supporting visuals:

```typescript
// Feature-by-feature reveal with pinning
gsap.timeline({
  scrollTrigger: {
    trigger: ".features-container",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1,
  }
})
// Feature 1: 0-25%
.from(".feature-1", { x: -100, opacity: 0, duration: 0.25 }, 0)
.to(".feature-1", { x: 100, opacity: 0, duration: 0.25 }, 0.25)

// Feature 2: 25-50%
.from(".feature-2", { x: -100, opacity: 0, duration: 0.25 }, 0.25)
.to(".feature-2", { x: 100, opacity: 0, duration: 0.25 }, 0.5)

// Feature 3: 50-75%
.from(".feature-3", { x: -100, opacity: 0, duration: 0.25 }, 0.5)
.to(".feature-3", { x: 100, opacity: 0, duration: 0.25 }, 0.75)

// Summary: 75-100%
.from(".features-summary", { scale: 0.8, opacity: 0, duration: 0.25 }, 0.75);
```

The **anchoring principle** ensures users don't lose their place during complex sequences. Every pinned section needs a clear resting state—a moment where animation pauses and the user can absorb information before the next transition begins. Without these anchors, scroll stories feel like escalators rather than guided tours.

Common scroll storytelling mistakes that kill conversion:

1. **Over-pinning**: More than 3 pinned sections creates scroll fatigue
2. **Animation speed mismatch**: Scrub values that don't match natural scroll speed feel artificial
3. **Missing mobile adaptation**: Complex pinned sequences break on touch devices
4. **No conversion moment**: Beautiful storytelling without a clear CTA is brand theater, not business design
5. **Performance degradation**: 30fps animations during scroll destroy the immersive effect

The best scroll stories balance spectacle with conversion intent—every animation should either communicate value or guide attention toward the next conversion step.

### The Scroll Timeline as Narrative Device

*Subsection: Mapping content to scroll progress, beats and pauses, and climax architecture.*

### Reveal Patterns That Convert

*Subsection: Text reveals, image masks, and progressive disclosure patterns.*

## Typography as Motion: Kinetic Type Systems

**Kinetic typography transforms static letterforms into narrative elements that move, reveal, and respond—turning headlines into performances while preserving the readability that makes text functional.** In immersive web design, type isn't just content delivery; it's a primary visual medium that establishes hierarchy, creates rhythm, and signals brand sophistication.

The technical challenge is balancing motion impact with **legibility preservation**. Animating text introduces cognitive load—readers must track moving glyphs while processing semantic meaning. Professional motion type systems use restraint: animate entrance, settle into static readability, and only re-animate on user request.

### SplitText and Character-Level Animation

GSAP's **SplitText** plugin—now free for commercial use as of GSAP 3.14—is the industry standard for character-level typography animation. It segments text into lines, words, and characters, wrapping each in individual elements for precise animation control:

```typescript
// SplitText segmentation and animation
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const animateHeadline = (element: HTMLElement) => {
  // Segment into characters with optional word/line grouping
  const split = new SplitText(element, {
    type: "chars,words,lines",
    charsClass: "char",
    wordsClass: "word",
    linesClass: "line",
  });

  // Entrance animation: characters rise from below with stagger
  gsap.from(split.chars, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    rotateX: -90,
    stagger: {
      each: 0.02,
      from: "start",
    },
    duration: 0.8,
    ease: "power3.out",
  });

  return () => {
    split.revert(); // Cleanup: restore original text
  };
};
```

SplitText's segmentation strategies enable different animation grammars:

| Type | Best For | Performance |
|------|----------|-------------|
| `chars` | Dramatic entrances, wave effects | High DOM node count |
| `words` | Reading pace animations, emphasis | Moderate overhead |
| `lines` | Paragraph reveals, quote animations | Lowest overhead |
| `chars,words` | Complex multi-layer effects | Heaviest—use sparingly |

Character-level animations should be **entrance-only** for body text. Once text is readable, keep it static. The exception is hover states on interactive headlines, where subtle motion (scale 1.02, color shift) provides feedback without disrupting reading.

For projects that prefer a lighter alternative, the open-source **SplitType** library provides similar segmentation:

```typescript
// SplitType alternative (free, ~3KB)
import SplitType from 'split-type';

const split = new SplitType('.headline', { types: 'chars,words' });

gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  stagger: 0.01,
  duration: 0.6,
});
```

### Variable Fonts in Motion

**Variable fonts**—single font files containing multiple design axes (weight, width, slant, custom axes)—enable fluid typographic transitions impossible with static font families. The technology, now with full cross-browser support in 2026, reduces HTTP requests while opening new animation possibilities.

```css
/* Variable font with animation-ready axes */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900; /* Range notation */
  font-display: swap;
}

.headline {
  font-family: 'Inter Variable', sans-serif;
  font-variation-settings: 'wght' 400, 'wdth' 100;
  transition: font-variation-settings 0.3s ease;
}

.headline:hover {
  font-variation-settings: 'wght' 700, 'wdth' 110;
}
```

GSAP can animate `font-variation-settings` directly, creating weight/width transitions synced to scroll:

```typescript
// Scroll-driven weight interpolation
gsap.to(".variable-headline", {
  scrollTrigger: {
    trigger: ".variable-headline",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
  fontVariationSettings: "'wght' 900, 'wdth' 75",
});
```

Recommended variable fonts for immersive work:

| Font | Axes | Character |
|------|------|-----------|
| **Inter** | wght (100-900) | Clean, technical, highly legible |
| **Satoshi** | wght (300-900) | Modern geometric, contemporary feel |
| **Manrope** | wght (200-800) | Humanist sans, approachable |
| **Playfair Display** | wght (400-900), opsz | Editorial serif, high contrast |
| **Recursive** | wght, slnt, CASL, CRSV, MONO | Coding aesthetic, highly expressive |

**Optical sizing** (`opsz` axis) deserves special attention. It adjusts letterforms for optimal reading at specific sizes—thinner strokes and larger counters for small text, more dramatic contrast for headlines. Animate `opsz` alongside `wght` for refined typographic transitions.

For performance, **subset variable fonts** to only the character ranges needed. A variable font subset to Latin-1 is ~30KB; the full Unicode range can exceed 200KB. Tools like `glyphhanger` or Wakamai Fondue identify required glyphs.

### Kinetic Type Best Practices

The rules that separate professional kinetic type from amateur motion graphics:

1. **Readability first**: No motion that compromises legibility—animated text must settle into a readable state
2. **Duration constraints**: Entrance animations should complete within 800ms; longer delays frustrate users
3. **Reduced motion respect**: Wrap text animations in `prefers-reduced-motion` checks:

```typescript
// Respect user motion preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Run SplitText animation
} else {
  // Static reveal: immediate opacity change
  gsap.set(element, { opacity: 1 });
}
```

4. **Hierarchy through motion**: Animate primary headlines with full character splits; secondary text with word or line-level reveals; body copy with simple opacity fades
5. **Performance limits**: Maximum 1000 animated characters per viewport; beyond this, use canvas-based text or simplify to word-level

Typography in motion is a craft of restraint. The most effective kinetic type systems feel inevitable—the motion serves the message, never overshadowing it.

### SplitText and Character-Level Animation

*Subsection: GSAP SplitText plugin, line/word/char segmentation, and performance limits.*

### Variable Fonts in Motion

*Subsection: Weight/width interpolation, optical sizing, and fallback strategies.*

## WebGL Shaders for Designer-Developers

**WebGL shaders—programs that run directly on the GPU—enable visual effects impossible with CSS or Canvas 2D: fluid simulations, distortion effects, noise-based textures, and reactive backgrounds that respond to scroll and mouse position.** For immersive web experiences, shaders provide the ambient atmosphere that separates premium sites from template-driven designs.

The barrier to entry is lower than it appears. Modern tools like React Three Fiber's shader utilities and online GLSL editors have democratized shader development. You don't need a graphics programming background—you need to understand the conceptual model: shaders run once per pixel, execute in parallel across the GPU, and operate in a strictly limited environment with no access to the DOM or JavaScript variables.

### Shader Materials in R3F

React Three Fiber provides `shaderMaterial` through `@react-three/drei` for declarative shader usage. The pattern separates concerns into uniforms (JavaScript values passed to shaders) and the GLSL programs that transform them:

```tsx
// components/ShaderBackground.tsx
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// GLSL vertex shader: transforms geometry
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// GLSL fragment shader: colors pixels
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  // Simplex noise function (simplified)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    float noise = snoise(uv * 3.0 + uTime * 0.2);
    
    // Mouse influence
    float dist = distance(uv, uMouse);
    float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.3;
    
    // Color mixing based on noise and mouse
    vec3 color1 = vec3(0.1, 0.12, 0.2); // Dark blue
    vec3 color2 = vec3(0.2, 0.15, 0.25); // Purple tint
    vec3 accent = vec3(0.3, 0.4, 0.6);  // Light blue
    
    vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
    finalColor = mix(finalColor, accent, mouseEffect);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Create custom material
const NoiseMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
  },
  vertexShader,
  fragmentShader
);

// Extend R3F with custom material
extend({ NoiseMaterial });

export const ShaderBackground = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );
    }
  });

  return (
    <mesh
      onPointerMove={(e) => {
        mouseRef.current.x = e.uv?.x ?? 0.5;
        mouseRef.current.y = e.uv?.y ?? 0.5;
      }}
    >
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore - extended material */}
      <noiseMaterial ref={materialRef} />
    </mesh>
  );
};
```

This pattern—uniforms for JavaScript-to-GLSL communication, `useFrame` for animation updates—powers most shader effects in immersive sites.

### Performance-Conscious WebGL

Shaders execute per-pixel, per-frame. A 4K display at 60fps runs the fragment shader 497 million times per second. Performance requires discipline:

**Texture resolution limits**: Full-screen shader effects should use 512x512 or 1024x1024 maximum. Higher resolutions create memory pressure and frame drops on integrated GPUs.

**Complexity budgeting**: Each mathematical operation in GLSL executes for every pixel. Complex noise functions (Perlin, Simplex) should use simplified variants or precomputed textures.

**Conditional minimization**: GLSL executes both branches of `if` statements on GPU architectures (wavefront execution), then discards results. Use `mix()`, `step()`, and `smoothstep()` for branchless logic:

```glsl
// Branching (slower)
if (distance < 0.5) {
  color = vec3(1.0, 0.0, 0.0);
} else {
  color = vec3(0.0, 0.0, 1.0);
}

// Branchless (faster)
float mask = smoothstep(0.5, 0.49, distance);
color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), mask);
```

**Mobile considerations**: Mobile GPUs have unified memory architecture—texture memory competes with system RAM. Limit shader texture usage, preferring procedural generation (noise functions) over image textures.

For sites needing shader effects without custom GLSL, libraries like **ogl** (~7KB) or **Three.js post-processing** provide pre-built effects: bloom, depth of field, chromatic aberration. These are less flexible but more performant than custom shaders.

Common shader use cases for immersive web:
- **Gradient noise backgrounds**: Subtle motion, responds to scroll/mouse
- **Image distortion**: RGB shift, liquid displacement on hover
- **Particle fields**: Simplex noise-driven movement
- **Transition effects**: Page transitions with distortion wipes

The craft is selecting effects that enhance rather than distract. A subtle noise gradient creates atmosphere; a flashing disco shader destroys credibility.

### Shader Materials in R3F

*Subsection: `shaderMaterial` setup, uniforms, and time-based animation.*

### Performance-Conscious WebGL

*Subsection: Draw call limits, texture sizing, and mobile GPU considerations.*

## Smooth Scroll and Lenis Integration

**Smooth scroll replaces native browser scrolling with interpolated virtual scrolling, creating fluid motion that transforms how animations feel and how users perceive the site's quality.** Native scroll updates in discrete steps tied to input device resolution—mouse wheels tick, trackpads gesture, touchscreens drag. These discrete steps create jerky animation when scrubbed against scroll position.

**Lenis** is the current standard for smooth scroll implementation. At ~2KB gzipped, it provides the interpolation physics that makes scroll-driven animations feel cinematic without the bloat of older libraries like Locomotive Scroll.

> **Package migration:** The original `@studio-freight/lenis` package is deprecated. Install from the `lenis` package directly: `npm install lenis`.

### Lenis Configuration with GSAP

The critical integration point is ScrollTrigger. Lenis creates a virtual scroll position that GSAP must read instead of native `window.scrollY`. The official integration pattern:

```typescript
// lib/lenis.ts - Lenis setup with GSAP ScrollTrigger
import Lenis from 'lenis'; // NOT @studio-freight/lenis (deprecated)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,        // Scroll duration (higher = slower)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,   // Faster on touch for responsiveness
  });

  // Integrate with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href')!);
      if (target) {
        lenis.scrollTo(target, { offset: 0 });
      }
    });
  });

  return lenis;
};
```

The `gsap.ticker.lagSmoothing(0)` call is essential—it prevents GSAP from skipping frames when the browser is under load, maintaining the 1:1 relationship between Lenis scroll position and ScrollTrigger progress.

Lenis configuration options determine the "feel" of the site:

| Option | Default | Effect |
|--------|---------|--------|
| `duration` | `1.2` | Higher values feel heavier, more luxurious |
| `easing` | `power2.out` equivalent | Exit velocity; custom curves create brand-specific feel |
| `wheelMultiplier` | `1` | Increase for faster desktop scroll |
| `touchMultiplier` | `2` | Higher values reduce scroll distance per swipe |
| `lerp` | `0.1` | Linear interpolation factor (0-1); lower = smoother |

The **duration vs lerp distinction** confuses many developers. Duration sets the target animation time; lerp controls how quickly the current position catches up. Higher duration creates slower, heavier scroll; lower lerp creates more smoothing but can feel disconnected from input.

### React Integration Pattern

In React applications, Lenis must be initialized once at the app root and provided through context for scroll-to navigation:

```tsx
// components/SmoothScroll.tsx
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement) => {
    lenisRef.current?.scrollTo(target);
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenis = () => useContext(LenisContext);
```

### When NOT to Use Smooth Scroll

Smooth scroll isn't appropriate for all projects:

1. **Accessibility concerns**: Some users with vestibular disorders find smooth scroll disorienting. Always implement `prefers-reduced-motion` detection:

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const lenis = prefersReducedMotion 
  ? null 
  : new Lenis({ /* normal config */ });
```

2. **Performance on low-end devices**: Smooth scroll adds JavaScript execution to every frame. On budget Android devices, this can reduce FPS in complex pages.

3. **Native feel expectations**: Some audiences (enterprise B2B, government, medical) expect immediate, predictable scroll behavior. Luxury and creative brands benefit from smooth scroll; utilitarian sites may not.

4. **Scroll-snap conflicts**: CSS `scroll-snap-type` fights with smooth scroll libraries. Choose one approach—either native snap or Lenis with GSAP snap, never both.

The physics of virtual scrolling create the perception of weight and quality. Native scroll feels like browsing; Lenis-enhanced scroll feels like experiencing. For premium brand sites where perception justifies budget, smooth scroll is non-negotiable.

## Performance Budgets for Animation-Heavy Sites

**Performance budgets are quantitative constraints that prevent immersive design from destroying user experience—hard limits on bundle size, animation complexity, and runtime metrics that maintain 60fps on target devices.** Without budgets, animation-heavy sites become slideshows on mid-tier phones, destroying the credibility of premium positioning.

My default budgets for immersive client work:

| Metric | Desktop Target | Mobile Target | Measurement |
|--------|---------------|---------------|-------------|
| **First Contentful Paint** | < 1.2s | < 1.8s | Lighthouse |
| **Largest Contentful Paint** | < 2.0s | < 2.5s | Lighthouse |
| **Time to Interactive** | < 3.0s | < 4.5s | Lighthouse |
| **Cumulative Layout Shift** | < 0.05 | < 0.05 | Lighthouse |
| **Animation FPS** | 60fps | 30fps minimum | Chrome DevTools |
| **JavaScript Bundle** | < 300KB gzipped | < 200KB gzipped | webpack-bundle-analyzer |
| **Total Blocking Time** | < 200ms | < 350ms | Lighthouse |
| **GPU Memory** | < 200MB | < 100MB | Chrome GPU DevTools |

The **60fps on desktop, 30fps minimum on mobile** rule reflects GPU capability disparity. Mobile devices thermal-throttle under sustained load; targeting 60fps on mobile creates battery drain and eventual frame drops. 30fps sustained beats 60fps that drops to 15fps.

### GPU Layer Management

Browser compositing—the process of flattening DOM elements into GPU textures—determines animation performance more than JavaScript execution speed. Each animated property triggers different compositing behavior:

| Property | Compositor Cost | Triggers Layout | Triggers Paint |
|----------|-----------------|-----------------|----------------|
| `transform` | Low | No | No |
| `opacity` | Low | No | No |
| `filter` | Medium | No | Yes |
| `width/height` | High | Yes | Yes |
| `top/left` | High | Yes | Yes |
| `margin/padding` | High | Yes | Yes |
| `border-radius` | Medium | No | Yes |
| `box-shadow` | Medium | No | Yes |

**Only animate `transform` and `opacity`** for smooth performance. GSAP and Framer Motion default to these properties; when you see examples animating `width` or `margin`, they're sacrificing performance for convenience.

The `will-change` CSS property hints to the browser which elements will animate, allowing preemptive layer promotion:

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force layer creation */
}
```

But `will-change` consumes GPU memory—use it sparingly and remove after animation completes:

```typescript
// Add will-change before animation, remove after
gsap.set(element, { willChange: "transform,opacity" });

gsap.to(element, {
  x: 100,
  onComplete: () => {
    gsap.set(element, { willChange: "auto" });
  }
});
```

### Code-Splitting Heavy Animations

Not all animations need to load immediately. **Route-based and interaction-based code splitting** reduces initial bundle size:

```typescript
// Lazy load GSAP plugins
const initHeavyAnimations = async () => {
  const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'), // Club GreenSock only
  ]);
  
  gsap.registerPlugin(ScrollTrigger, SplitText);
  
  // Run heavy animations
};

// Trigger on scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initHeavyAnimations();
      observer.disconnect();
    }
  });
});

observer.observe(document.querySelector('.heavy-animation-section'));
```

**R3F scenes** should lazy-load by default—they're rarely needed for initial paint:

```tsx
import { lazy, Suspense } from 'react';

const LazyThreeScene = lazy(() => import('./ThreeScene'));

// Render only when scrolled into view
const SectionWith3D = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: '100px' } // Preload slightly before visible
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref}>
      {shouldLoad && (
        <Suspense fallback={<div className="h-[500px] bg-gray-100" />}>
          <LazyThreeScene />
        </Suspense>
      )}
    </section>
  );
};
```

### Runtime Performance Monitoring

Set up **Performance Observer** to track real-user animation performance:

```typescript
// Track frame drops in production
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'layout-shift') {
        // Log layout shifts
        console.warn('CLS violation:', entry.value);
      }
    }
  });
  
  observer.observe({ entryTypes: ['layout-shift', 'longtask'] });
}

// Frame rate monitoring during animations
let frameCount = 0;
let lastTime = performance.now();

const measureFPS = () => {
  const now = performance.now();
  frameCount++;
  
  if (now - lastTime >= 1000) {
    const fps = Math.round((frameCount * 1000) / (now - lastTime));
    frameCount = 0;
    lastTime = now;
    
    if (fps < 30) {
      console.warn('Low FPS detected:', fps);
      // Could report to analytics, reduce animation quality
    }
  }
  
  requestAnimationFrame(measureFPS);
};

// Start monitoring during heavy animations
measureFPS();
```

Performance budgets aren't restrictions—they're constraints that force creative solutions. The best immersive sites achieve cinematic quality within strict limits through thoughtful architecture, not by ignoring resource constraints.

### GPU Layer Management

*Subsection: Will-change strategies, compositor layers, and paint complexity.*

### Code-Splitting Heavy Animations

*Subsection: Dynamic imports for GSAP plugins, R3F lazy loading, and intersection observer patterns.*

## Award Site Patterns: Teardowns from Awwwards and FWA

**Award-winning immersive sites share recurring patterns that balance visual innovation with technical execution—patterns that can be extracted, adapted, and implemented without copying specific designs.** Awwwards Site of the Day and FWA winners in 2025-2026 reveal a convergence toward restrained motion, editorial typography, and conversion-aware storytelling.

The judging criteria have shifted. Early 2020s awards prioritized visual spectacle—WebGL particle explosions, aggressive scroll hijacking, loading screens that lasted thirty seconds. Current winners favor **refined restraint**: fast initial paint, subtle motion that serves content, and accessibility considerations that don't compromise aesthetic impact.

### The Cinematic Hero Formula

The current award-site hero follows a predictable structure that converts while impressing:

1. **Immediate visual impact** (0-1 second): No loading screens, no black fades. The first paint shows something compelling—large typography, abstract motion, or product imagery.

2. **Progressive depth layers** (1-3 seconds): As the user processes the initial image, secondary layers reveal—subheadlines, navigation, scroll indicators.

3. **Narrative promise** (3-5 seconds): The hero establishes what the site contains and why scrolling is worth the effort.

```typescript
// Award-pattern hero implementation
gsap.timeline({ defaults: { ease: "power3.out" } })
  // Frame 1: Immediate impact
  .from(".hero-headline", { 
    y: 100, 
    opacity: 0, 
    duration: 1.2,
    stagger: 0.1 
  }, 0)
  
  // Frame 2: Secondary layers
  .from(".hero-subhead", { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  }, 0.6)
  .from(".hero-cta", { 
    y: 20, 
    opacity: 0, 
    scale: 0.95,
    duration: 0.6 
  }, 0.8)
  
  // Frame 3: Depth completion
  .from(".hero-visual", { 
    scale: 1.1, 
    opacity: 0, 
    duration: 1.5 
  }, 0.2);
```

The **hero video texture** pattern—full-viewport video backgrounds with overlay gradients—remains prevalent but has evolved. Current winners use:
- **Compressed HEVC/WebM** at 720p maximum for performance
- **Poster image fallbacks** that load instantly while video buffers
- **Reduced motion alternatives** that show static hero images
- **Muted autoplay** with optional audio toggle (never autoplay with sound)

### Micro-Interaction Language

Award sites communicate quality through **micro-interactions**—subtle responses to user input that create tactile satisfaction:

| Element | Interaction | Implementation |
|---------|-------------|----------------|
| **Buttons** | Scale 1.02 + shadow elevation on hover | Framer Motion `whileHover` |
| **Links** | Underline draws from left on hover | CSS `background-size` transition or GSAP |
| **Cards** | Subtle lift + shadow on hover | `transform: translateY(-4px)` + `box-shadow` |
| **Images** | Slight scale 1.05 within overflow hidden | Container `overflow: hidden`, image scales |
| **Form inputs** | Border color + glow on focus | CSS `:focus` with `box-shadow` transition |
| **Cursor** | Custom cursor that scales on interactive elements | `cursor: none` + absolute-positioned div |

The **magnetic button** pattern—buttons that subtly pull toward the cursor as it approaches—appears frequently in 2025-2026 winners. Implementation uses mouse position tracking and spring physics:

```typescript
// Magnetic button with Framer Motion
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + 
      Math.pow(e.clientY - centerY, 2)
    );
    
    const maxDistance = 100; // Pull radius
    
    if (distance < maxDistance) {
      const pull = (maxDistance - distance) / maxDistance;
      x.set((e.clientX - centerX) * pull * 0.3);
      y.set((e.clientY - centerY) * pull * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-6 py-3 bg-black text-white rounded-full"
    >
      {children}
    </motion.button>
  );
};
```

### What Judges Actually Look For

Based on Awwwards judging guidelines and public feedback from jury members:

1. **Design**: Visual hierarchy, typography quality, color sophistication, whitespace discipline
2. **Usability**: Navigation clarity, load times, mobile adaptation, accessibility
3. **Creativity**: Original concepts, unexpected interactions, personality
4. **Content**: Quality of writing, relevance to audience, information architecture
5. **Technical execution**: Code quality, performance, responsive behavior, browser compatibility

The **creativity vs usability balance** is where most submissions fail. Sites that sacrifice navigation clarity for visual spectacle receive lower usability scores. Sites that are technically perfect but visually generic score low on creativity.

Winning sites typically:
- Load interactive within 3 seconds on 4G
- Maintain 60fps during scroll on desktop
- Provide clear wayfinding without breaking immersion
- Show original visual concepts, not template derivatives
- Include subtle easter eggs or personality moments
- Work flawlessly on the latest Chrome, Safari, Firefox, and Edge

The award pattern to **avoid**: scroll hijacking that prevents natural navigation, loading screens longer than 2 seconds, auto-playing audio, modal popups that interrupt first visit, and motion that makes text unreadable.

For client work, award consideration matters when the target audience includes designers, developers, or creative directors. A Site of the Day badge provides social proof in creative industries. For utilitarian B2B products, award chasing is misallocated effort—invest in conversion optimization instead.

### The Cinematic Hero Formula

*Subsection: Full-viewport openings, video texture integration, and scroll-triggered transitions.*

### Micro-Interaction Language

*Subsection: Button states, cursor effects, and hover feedback that feels premium.*

## Mobile Immersive: Adapting for Touch and Reduced Motion

**Mobile immersive design requires fundamental adaptation—not just shrinking desktop animations, but rethinking the interaction model for touch input, smaller viewports, and constrained GPU resources.** The majority of immersive site traffic comes from mobile devices; a desktop-only experience destroys reach and conversion.

The core constraint is **input modality**. Mouse hover doesn't exist on touchscreens. Continuous cursor position (used for parallax, magnetic effects, shader uniforms) is replaced by discrete touch events. Scroll physics differ—momentum scrolling on iOS creates different perceived speed than desktop wheel input.

### Reduced Motion and Accessibility

The **`prefers-reduced-motion`** media query is mandatory for all immersive sites. It signals that the user has requested minimal animation—often due to vestibular disorders, motion sensitivity, or focus needs. Ignoring this preference is an accessibility failure that excludes users.

```css
/* Respect motion preferences in CSS */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .parallax-element {
    transform: none !important;
  }
}
```

JavaScript animation libraries must check this preference before running:

```typescript
// Check reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// GSAP with reduced motion support
if (!prefersReducedMotion) {
  gsap.from(".animated-element", {
    y: 50,
    opacity: 0,
    duration: 0.8,
  });
} else {
  // Static reveal: immediate visibility
  gsap.set(".animated-element", { opacity: 1 });
}

// Motion with reduced motion
import { motion, useReducedMotion } from 'motion/react';

const Component = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { y: 0, opacity: 1 }}
      initial={shouldReduceMotion ? {} : { y: 50, opacity: 0 }}
    >
      Content
    </motion.div>
  );
};
```

Beyond reduced motion, immersive sites must meet **WCAG 2.1 AA standards**:
- Color contrast ratios of 4.5:1 for normal text, 3:1 for large text
- Focus indicators visible on all interactive elements
- Alternative text for images, transcripts for video
- Keyboard navigation support for all functionality
- No content that flashes more than 3 times per second

### Touch-Optimized Interactions

**Touch gestures** require different handling than mouse events. The `touchstart`/`touchend` lifecycle differs from `mousedown`/`mouseup`, and touch targets need minimum sizing:

```typescript
// Touch-optimized gesture handling
const TouchCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum pixels for swipe

    if (diff > minSwipeDistance) {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    } else if (diff < -minSwipeDistance) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="touch-pan-y" // Allow vertical scroll
    >
      {/* Carousel content */}
    </div>
  );
};
```

CSS touch properties prevent gesture conflicts:

```css
/* Touch action control */
.swipe-container {
  touch-action: pan-y; /* Allow vertical scroll, handle horizontal in JS */
}

.no-scroll-section {
  touch-action: none; /* Disable browser handling for custom gestures */
  overscroll-behavior: contain; /* Prevent body scroll when at bounds */
}
```

### Mobile Adaptation Strategies

Specific patterns for translating desktop immersive to mobile:

| Desktop Pattern | Mobile Adaptation | Rationale |
|-----------------|-------------------|-----------|
| **Pinning sections** | Remove or reduce duration | Mobile viewport height varies (address bar, toolbars); pinning breaks |
| **Hover effects** | Convert to tap/scroll triggers | No hover state on touch |
| **Parallax layers** | Reduce layer count, simplify motion | GPU memory constraints, scroll performance |
| **3D scenes** | Lower polygon count, simpler shaders | Mobile GPU thermal throttling |
| **Cursor effects** | Remove entirely or convert to gyroscope | No cursor on mobile; deviceorientation optional replacement |
| **Text reveals** | Faster duration, larger touch targets | Mobile reading context (distracted, on-the-go) |

**Viewport adaptation** for immersive sites uses media query-driven animation complexity:

```typescript
// GSAP ScrollTrigger matchMedia for responsive animations
ScrollTrigger.matchMedia({
  // Desktop: Full pinning and complex sequence
  "(min-width: 1024px)": () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".narrative-section",
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
      }
    })
      .from(".desktop-element", { y: 100, opacity: 0 })
      .to(".desktop-element", { y: -100, opacity: 0 })
      .from(".next-element", { y: 100, opacity: 0 });
    
    return () => {};
  },
  
  // Tablet: Reduced duration, no pinning
  "(min-width: 768px) and (max-width: 1023px)": () => {
    gsap.from(".narrative-element", {
      scrollTrigger: {
        trigger: ".narrative-element",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
    });
    
    return () => {};
  },
  
  // Mobile: Simple reveals, no pinning
  "(max-width: 767px)": () => {
    gsap.from(".narrative-element", {
      scrollTrigger: {
        trigger: ".narrative-element",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.4,
    });
    
    return () => {};
  }
});
```

The **responsive mindset shift**: Mobile isn't a degraded desktop experience; it's a different context with different user goals. Mobile users scroll faster, have shorter attention spans, and need larger touch targets. The best mobile immersive sites feel designed *for* mobile, not adapted from desktop.

GPU performance on mobile requires **aggressive throttling**:
- Disable WebGL effects on devices with `maxTextureSize < 4096`
- Reduce particle counts by 75% on mobile
- Remove blur filters (GPU-intensive on mobile)
- Use CSS transforms instead of 3D transforms where possible

Test on real devices—not Chrome DevTools emulation. The thermal behavior, actual GPU, and scroll physics differ significantly from desktop simulation.

### Reduced Motion and Accessibility

*Subsection: `prefers-reduced-motion` implementation, semantic alternatives, and WCAG compliance.*

### Touch-Optimized Interactions

*Subsection: Swipe vs scroll, gesture conflicts, and viewport adaptation.*

## Next.js App Router Patterns for Immersive Sites

**Next.js App Router provides the architecture foundation for production immersive sites, but requires careful boundary management to balance server-rendered content with client-side animation.** The default Server Component model conflicts with animation libraries that need browser APIs (DOM, WebGL, scroll events).

The solution is **strategic client boundary placement**—keeping content server-rendered for SEO and initial paint, while wrapping interactive layers in Client Components where necessary.

### Client Component Boundaries

The `'use client'` directive creates a client boundary. Everything below it becomes client JavaScript. For immersive sites, place boundaries at the animation layer, not the content layer:

```tsx
// app/page.tsx - Server Component (default)
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { CTA } from './sections/CTA';

export default function HomePage() {
  return (
    <main>
      {/* Server-rendered structure */}
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
```

```tsx
// app/sections/Hero.tsx - Still Server Component
import { HeroAnimation } from '../components/HeroAnimation';

export const Hero = () => {
  return (
    <section className="min-h-screen">
      {/* Server-rendered content for SEO */}
      <h1>Transform Your Digital Presence</h1>
      <p>Cinematic web experiences that convert.</p>
      
      {/* Client boundary for animation layer */}
      <HeroAnimation />
    </section>
  );
};
```

```tsx
// app/components/HeroAnimation.tsx - Client Component
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const HeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP requires 'use client' - browser-only
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".animated-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        scale: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      <div className="animated-bg">{/* Animated content */}</div>
    </div>
  );
};
```

This pattern—**server content + client animation layer**—preserves SEO from server-rendered text while enabling full animation capability.

### Static Export vs Server Rendering

Next.js deployment mode affects immersive sites significantly:

| Mode | Use Case | Animation Implications |
|------|----------|------------------------|
| **Static Export** (`output: 'export'`) | Sites without dynamic data | All pages pre-rendered; animations hydrate client-side |
| **Server Rendering** (default) | Dynamic content, authentication | Server renders initial state; animations load progressively |
| **ISR** | Large sites with frequent updates | Static base with periodic revalidation |

For animation-heavy sites, **static export is preferred** when possible. It eliminates server cold-start latency and enables CDN distribution. The hydration pattern—React attaching event listeners to server-rendered HTML—runs animations immediately without waiting for server round-trips.

Configuration for static export with GSAP:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
```

### Interleaving Server Content in Client Components

Sometimes animation components need to render server content. The `children` prop pattern enables this:

```tsx
// app/components/ScrollReveal.tsx - Client Component
'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export const ScrollReveal = ({ children, className }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children} {/* Server-rendered content */}
    </div>
  );
};
```

```tsx
// app/sections/Features.tsx - Server Component
import { ScrollReveal } from '../components/ScrollReveal';

export const Features = () => {
  return (
    <section>
      {/* Content is server-rendered, animation is client-side */}
      <ScrollReveal>
        <h2>Premium Features</h2>
        <p>Server-rendered text for SEO...</p>
      </ScrollReveal>
    </section>
  );
};
```

This is the **primary architecture pattern** for immersive Next.js sites: Client Components as animation wrappers around server-rendered content.

### Third-Party Script Loading

Animation libraries and their dependencies should load efficiently:

```tsx
// Lazy load heavy animation libraries
import { lazy, Suspense } from 'react';

const Heavy3DScene = lazy(() => import('../components/Heavy3DScene'));

export const Section = () => {
  return (
    <Suspense fallback={<div className="h-[500px] bg-gray-100 animate-pulse" />}>
      <Heavy3DScene />
    </Suspense>
  );
};
```

For critical-path animations, use `next/script` with priority loading:

```tsx
import Script from 'next/script';

// Load GSAP early for above-fold animations
<Script 
  src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
  strategy="beforeInteractive"
/>
```

The architecture goal is minimizing client JavaScript while maximizing animation quality. Every kilobyte of JS delays interactivity; every `'use client'` boundary adds bundle size. Strategic boundary placement—at the animation layer, not the content layer—achieves both SEO and immersion.

### Client Component Boundaries

*Subsection: Where to draw the line, hydration strategies, and interweaving server content.*

### Static Export vs Server Rendering

*Subsection: Trade-offs for animation-heavy sites, CDN distribution, and edge considerations.*

## Building Your Motion Design System

**Motion design systems standardize animation values across products, creating consistent feel while reducing decision fatigue and implementation time.** Like color palettes and typography scales, animation tokens define the "motion language" of a brand—how fast things move, how they ease, how long transitions take.

A professional motion system includes: **duration tokens** (how long), **easing tokens** (how it feels), **stagger patterns** (sequencing), and **component-specific variants** (buttons, cards, page transitions). These tokens live in code, not documentation, enforced through shared configuration and reusable components.

### Animation Tokens and Easing Curves

Duration and easing are the fundamental properties of any animation. Tokenizing them creates consistency:

```typescript
// lib/animation-tokens.ts
export const durations = {
  instant: 0.1,      // Micro-interactions: hover, focus
  fast: 0.2,         // Small state changes: toggles, switches
  normal: 0.3,       // Standard transitions: reveals, fades
  slow: 0.5,         // Emphasis moments: important reveals
  dramatic: 0.8,     // Hero entrances, page transitions
  cinematic: 1.2,    // Scroll sequences, narrative moments
} as const;

export const easings = {
  // Standard easings
  default: [0.25, 0.1, 0.25, 1],      // CSS ease equivalent
  entrance: [0.0, 0.0, 0.2, 1],       // Decelerate: elements arriving
  exit: [0.4, 0.0, 1, 1],             // Accelerate: elements leaving
  
  // Expressive easings
  bounce: [0.68, -0.55, 0.265, 1.55], // Playful, attention-grabbing
  smooth: [0.4, 0.0, 0.2, 1],         // Material Design standard
  snap: [0.16, 1, 0.3, 1],            // Quick settle: precise, modern
  
  // Premium brand easings
  luxury: [0.6, 0.05, 0.01, 0.99],     // Slow start, elegant finish
  technical: [0.25, 0.46, 0.45, 0.94], // Consistent, predictable
} as const;

export const stagger = {
  tight: 0.05,   // Fast sequences: character reveals
  normal: 0.1,    // Standard lists: cards, items
  relaxed: 0.15,  // Leisurely reveals: editorial content
  dramatic: 0.2,  // Emphasized sequences: feature lists
} as const;
```

Easing curve selection creates emotional tone:

| Easing | Feeling | Use Case |
|--------|---------|----------|
| `entrance` | Arriving, settling | Content reveals, modals opening |
| `exit` | Departing, decisive | Content leaving, dismissing |
| `bounce` | Playful, energetic | Marketing sites, consumer brands |
| `snap` | Precise, modern | SaaS products, technical brands |
| `luxury` | Refined, expensive | Premium brands, fashion, hospitality |

GSAP and Framer Motion both accept custom easing arrays (cubic-bezier control points):

```typescript
// GSAP with tokens
gsap.to(element, {
  y: 0,
  opacity: 1,
  duration: durations.dramatic,
  ease: `custom`,
  easeCustom: easings.luxury,
});

// Framer Motion with tokens
<motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ 
    duration: durations.dramatic, 
    ease: easings.luxury 
  }}
/>
```

### Component Library Integration

Motion-wrapped components provide consistent animation without repeated configuration:

```tsx
// components/motion/MotionCard.tsx
import { motion } from 'motion/react';
import { durations, easings } from '../../lib/animation-tokens';
import { ReactNode } from 'react';

interface MotionCardProps {
  children: ReactNode;
  delay?: number;
}

export const MotionCard = ({ children, delay = 0 }: MotionCardProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: durations.normal,
        ease: easings.entrance,
        delay,
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: durations.instant },
      }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      {children}
    </motion.div>
  );
};
```

```tsx
// components/motion/MotionButton.tsx
import { motion } from 'motion/react';
import { durations, easings } from '../../lib/animation-tokens';
import { ReactNode } from 'react';

interface MotionButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const MotionButton = ({ 
  children, 
  variant = 'primary',
  onClick 
}: MotionButtonProps) => {
  const baseClasses = "px-6 py-3 rounded-full font-medium";
  const variantClasses = variant === 'primary' 
    ? "bg-black text-white" 
    : "bg-gray-100 text-black";

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses}`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: durations.instant, ease: easings.snap }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: durations.instant }
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
```

### Documentation Patterns

A motion system without documentation doesn't exist. At minimum, document:

1. **Token reference**: Duration values, easing curves, when to use each
2. **Component examples**: Live demos of each motion component
3. **Do/don't guidelines**: When to use which animation pattern
4. **Accessibility requirements**: Reduced motion implementation

```markdown
// docs/motion-system.md

## Motion Tokens

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `instant` | 100ms | Hover, focus, small feedback |
| `fast` | 200ms | Toggles, switches, micro-interactions |
| `normal` | 300ms | Standard transitions, reveals |
| `dramatic` | 800ms | Hero entrances, page transitions |

### Easings

| Token | Curve | Feeling |
|-------|-------|---------|
| `entrance` | [0.0, 0.0, 0.2, 1] | Arriving, settling |
| `exit` | [0.4, 0.0, 1, 1] | Departing, decisive |
| `snap` | [0.16, 1, 0.3, 1] | Quick settle, modern |

## Usage Guidelines

- Always use tokens, never raw numbers
- Prefer `transform` and `opacity` animations only
- Implement `prefers-reduced-motion` for all motion
- Test on target devices, not just desktop
```

The business value of a motion system: **consistency builds brand recognition**, **tokens reduce decision time**, **components speed implementation**, and **documentation enables team scaling**. A site without motion tokens feels chaotic; a site with them feels intentional.

For client work, deliver the motion system as part of the design system package—tokens file, component library, and documentation—enabling the client's team to maintain consistency post-handoff.

### Animation Tokens and Easing Curves

*Subsection: Duration scales, custom easings, and semantic naming conventions.*

### Component Library Integration

*Subsection: Motion-wrapped shadcn/ui, Framer Motion variants as props, and theme integration.*

## Frequently Asked Questions

### What is the best animation library for React in 2026?

**Motion v12.38+ (formerly Framer Motion) is the best choice for component-level animations, while GSAP 3.14+ with ScrollTrigger remains essential for scroll-coupled effects.** The two libraries complement rather than compete—Framer Motion excels at hover states, layout transitions, and gesture handling with its declarative API; GSAP dominates scroll-driven timelines, complex orchestration, and text effects through SplitText. For most immersive projects, you'll use both: Framer Motion wrapped around interactive components inside GSAP-controlled scroll sections. Avoid using Framer Motion's `useScroll` alongside GSAP ScrollTrigger—they conflict. Current versions support React 19.2 with improved tree-shaking for smaller bundles. Note the import change: use `import { motion } from 'motion/react'` not the deprecated `framer-motion` package.

### How does GSAP ScrollTrigger work with React?

**GSAP ScrollTrigger creates scroll-coupled animations by mapping animation progress to scroll position through trigger elements.** In React, you register the plugin once, create animations inside `useEffect` hooks with proper cleanup, and use `gsap.context()` for scoped animation management. The critical pattern: never create ScrollTriggers during render (creates duplicates), always clean up on unmount with `ctx.revert()`, and refresh ScrollTrigger on layout changes. For Next.js App Router, GSAP code must live in Client Components (`'use client'`) since it requires browser APIs. Use `ScrollTrigger.matchMedia()` for responsive animation behavior that disables complex pinning on mobile.

### Can Three.js be used with Next.js App Router?

**Yes, through React Three Fiber v9, which provides full React 19 and Next.js App Router compatibility.** The pattern requires `'use client'` directives on any component using R3F, since WebGL needs browser APIs. Structure your app with Server Components for content (SEO-critical text) and Client Component wrappers for 3D scenes. Use `dpr={[1, 2]}` on the Canvas to limit pixel ratio on high-DPI displays, `frameloop="demand"` to pause rendering when static, and `Suspense` boundaries for async model loading. For static export compatibility, ensure all Three.js imports happen inside Client Components—never at the Server Component level.

### What is the ideal performance budget for immersive websites?

**Target 60fps on desktop and 30fps minimum on mobile, with JavaScript bundles under 300KB gzipped (desktop) and 200KB (mobile).** Core Web Vitals should hit FCP < 1.8s, LCP < 2.5s, and CLS < 0.05 on mobile. GPU memory budgets are 200MB desktop / 100MB mobile. Achieve these by: only animating `transform` and `opacity`, using `will-change` sparingly and removing after animations, code-splitting heavy libraries (GSAP plugins, Three.js), and implementing intersection-observer-based lazy loading for below-fold animations. Test on real mid-tier devices—not just Chrome DevTools—to validate thermal throttling doesn't destroy performance.

### How do you handle reduced motion accessibility?

**Always check `prefers-reduced-motion` before running animations and provide static alternatives for users with vestibular disorders.** Implement at both CSS level (`@media (prefers-reduced-motion: reduce)` disabling animations) and JavaScript level (checking `window.matchMedia` before GSAP/Framer Motion execution). For Framer Motion, use the `useReducedMotion()` hook. The reduced motion experience shouldn't be degraded—replace parallax with static layers, replace entrance animations with immediate opacity changes, and keep all functionality intact. This isn't optional: WCAG 2.1 Level AA requires respecting user motion preferences, and ignoring them excludes real users from your experience.

### What makes a website win Awwwards Site of the Day?

**Winning sites balance visual innovation with technical execution, scoring highly on all five judging criteria: design, usability, creativity, content, and technical implementation.** Current winners (2025-2026) favor refined restraint over spectacle—fast initial paint (< 3 seconds), subtle motion serving content, and accessible design that doesn't sacrifice aesthetic. Common patterns include: cinematic heroes with immediate visual impact, scroll storytelling with clear narrative structure, micro-interactions that feel tactile (magnetic buttons, cursor effects), and original visual concepts rather than template derivatives. Technical perfection matters: 60fps scroll, cross-browser compatibility, and mobile adaptation without degradation. The creativity/usability balance is critical—sites that sacrifice navigation for spectacle score lower.

### Should I use Framer Motion or GSAP for scroll animations?

**Use GSAP ScrollTrigger for all scroll-coupled animations; Framer Motion lacks scroll-aware scrubbing and pinning capabilities.** Framer Motion's `useScroll` and `useTransform` hooks can create scroll-linked effects, but they don't match ScrollTrigger's precision, performance, or debugging tools. The decision matrix: GSAP for scroll-triggered entrances, pinned sections, scrubbed timelines, and complex scroll storytelling; Framer Motion for hover/tap states, layout transitions, gesture handling, and component orchestration. Many professional sites use both—GSAP controlling the scroll timeline, Framer Motion handling interactive states within scroll sections. Never mix their scroll systems in the same viewport.

### How do you optimize WebGL for mobile devices?

**Limit draw calls, reduce texture resolution to 1024x1024 maximum, and target under 100K triangles for mobile scenes.** Mobile GPUs have unified memory architecture and thermal-throttle under sustained load—what runs at 60fps initially may drop to 15fps after 30 seconds. Specific optimizations: use `dpr={[1, 1.5]}` on R3F Canvas, disable real-time shadows (use baked ambient occlusion or contact shadows), simplify shaders (avoid complex noise functions), and use instancing for repeated geometry. Detect GPU capability via `navigator.gpu` or max texture size, and disable WebGL effects entirely on low-end devices. Test on real mid-tier Android devices—not just iPhone flagship models.

### What are the best practices for scroll storytelling?

**Map narrative structure (setup, confrontation, resolution) to scroll percentage, use pinning sparingly (max 3 sections per page), and always anchor the user with readable resting states.** Each scroll story needs a clear conversion moment—beautiful storytelling without a CTA is brand theater, not business design. Technical implementation: use GSAP timelines with labeled sections for narrative beats, implement snap points for important moments, and ensure scrub values feel natural (1-2 second smoothing). Progressive disclosure works best—reveal content in digestible chunks rather than overwhelming density. Mobile adaptation is critical: disable or simplify pinning, reduce animation complexity, and ensure touch scrolling isn't hijacked.

### How much does an immersive website cost to build?

**Custom immersive websites typically range from $15,000 to $75,000+ depending on complexity, with cinematic scroll experiences, WebGL integration, and custom motion systems at the higher end.** Budget factors: animation complexity (simple scroll reveals vs. full narrative sequences), 3D/WebGL requirements, CMS integration, e-commerce functionality, and content volume. A single-page immersive experience with GSAP scroll animations starts around $15K; multi-page sites with R3F 3D scenes, custom shaders, and headless CMS architecture range $40K-$75K. Timeline also affects cost—rush projects require premium pricing. The investment reflects the specialized skill set (animation engineering, WebGL, performance optimization) and the conversion impact of well-executed immersive design.

### What is smooth scrolling and why does it matter?

**Smooth scroll (Lenis, Locomotive Scroll) replaces discrete native scroll steps with interpolated virtual scrolling, creating fluid motion that transforms animation perception and perceived site quality.** Native scroll updates in steps tied to input device resolution; smooth scroll interpolates between positions using physics-based easing (typically 1.2s duration). This interpolation eliminates the jerky motion when scrubbing GSAP animations against scroll position—without it, scroll-driven animations feel mechanical. Lenis at ~2KB is the current standard, integrating directly with GSAP ScrollTrigger through `lenis.on('scroll', ScrollTrigger.update)`. The downside: some users find smooth scroll disorienting (vestibular issues), so implement `prefers-reduced-motion` detection to disable it when requested.

### Can immersive websites still achieve good SEO?

**Yes, when architected correctly with server-rendered content, proper heading hierarchy, and strategic Client Component boundaries.** Next.js App Router enables this: Server Components render SEO-critical content (text, headings, images with alt text) for crawlers, while Client Components handle animation layers. Critical SEO rules: ensure content exists in initial HTML (not created by JavaScript), use semantic HTML structure (`h1`-`h6` hierarchy), implement proper meta tags and Open Graph, optimize images with Next.js Image component, and maintain fast Core Web Vitals (LCP < 2.5s). Scroll-driven sites can rank well—the content just needs to be server-rendered and accessible without JavaScript. Test with Google's Rich Results Test and PageSpeed Insights to validate.

## Start Your Immersive Web Project

The immersive web isn't about adding decoration to standard sites—it's about crafting digital experiences where motion, depth, and narrative create presence. The techniques in this manual—from GSAP ScrollTrigger orchestration to React Three Fiber spatial design—represent the technical foundation of premium web work in 2026.

I build custom immersive websites for brands that need more than templates: cinematic scroll experiences, WebGL-enhanced product showcases, and conversion-focused storytelling that justifies five-figure budgets. Every project starts with architecture decisions that balance visual impact with performance reality.

If you're considering an immersive build—whether redesigning an existing site or creating something entirely new—[book a 15-minute discovery call](/contact). We'll discuss your narrative structure, animation complexity, technical requirements, and whether immersive design is the right investment for your specific goals.

For a deeper look at the technical architecture behind modern web builds, see ["The Complete MCP Architecture Guide"](/blog/2026/05/mcp-architecture-guide). And if you're interested in how AI tools integrate into the development workflow, my ["Claude Opus 4.7 Release Guide"](/blog/2026/04/claude-opus-4-7-release-guide) covers the model capabilities I use for rapid prototyping and production code generation.

The web can be more than pages. Build experiences.
