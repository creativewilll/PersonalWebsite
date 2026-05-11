Querying perplexity using sonar-pro for: Framer Motion vs GSAP scroll animation 2026 comparison with maxTokens: 8000
# Framer Motion vs GSAP: Scroll Animation Comparison (2026)

## Quick Verdict
**GSAP wins for scroll animations** in 2026. It offers unmatched control, performance, and features like pinning, scrubbing, and timeline integration. Framer Motion (now Motion) is solid for simple scroll-triggered UI effects but lacks depth for complex experiences.

## Scroll Feature Comparison Table

| Feature | Framer Motion (Motion) | GSAP (w/ ScrollTrigger) |
|---------|------------------------|--------------------------|
| **Core API** | `useScroll()`, `scroll()`, `useInView()` | `ScrollTrigger` plugin |
| **Scrubbed Animations** | ✅ Basic via `scroll()` | ✅ Advanced scrubbing + velocity |
| **Pinning Elements** | ❌ No native pinning | ✅ Precise pin with `pin: true` |
| **Timeline Sequencing** | ❌ Limited variant chaining | ✅ Full `gsap.timeline()` + scroll |
| **Viewport Triggers** | ✅ `useInView()` | ✅ `trigger`, `start/end` points |
| **Performance (Heavy Sites)** | ⚠️ React re-renders can lag | ✅ Direct DOM, 60fps guaranteed |
| **Bundle Size** | ~14kb (scroll built-in) | ~35kb (ScrollTrigger) |
| **SVG Path Scrolling** | ❌ Basic transforms only | ✅ Path following + morphing |
| **Media Query Support** | ❌ Manual state handling | ✅ Built-in responsive triggers |

## Code Examples

### Simple Scroll-Triggered Opacity (Both Win)

**Framer Motion**
```jsx
import { motion, useScroll, useTransform } from "motion/react"

<motion.div 
  style={{
    opacity: useTransform(useScroll(), "scrollYProgress", [0, 1], [0, 1])
  }}
/>
```

**GSAP**
```js
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
  opacity: 1
});
```

### Complex Scroll Sequence (GSAP Dominates)

**Framer Motion** - Gets clunky fast:
```jsx
// You'd need multiple useScroll hooks + state management
const scrollY = useScroll();
const opacity1 = useTransform(scrollY, [0, 0.25], [0, 1]);
const scale2 = useTransform(scrollY, [0.25, 0.5], [1, 0]);
const x3 = useTransform(scrollY, [0.5, 1], [0, 500]);
```

**GSAP** - Clean timeline:
```js
gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    scrub: 1,
    pin: true,
    start: "top top",
    end: "+=3000"
  }
})
.to(".box1", { opacity: 1, duration: 0.5 })
.to(".box2", { scale: 0, duration: 0.5 }, 0.25)
.to(".box3", { x: 500, duration: 0.5 }, 0.5);
```

## Performance Reality Check (2026)

| Scenario | Framer Motion | GSAP |
|----------|---------------|------|
| **10 elements, simple fade** | ✅ Excellent | ✅ Excellent |
| **50+ elements, staggered** | ⚠️ Frame drops | ✅ Smooth |
| **Pinned hero section** | ❌ Hacky workarounds | ✅ Native |
| **SVG path animations** | ❌ Not supported | ✅ MorphSVGPlugin |
| **Dashboard w/ charts** | ⚠️ Layout thrashing | ✅ Optimized |

## When to Choose Each

### 🎯 **Use Framer Motion if:**
- React/Next.js UI components
- Simple entrance animations
- You're already deep in React ecosystem
- Bundle size matters more than features
- Quick prototypes

### 🚀 **Use GSAP if:**
- Scroll-driven storytelling
- Hero sections with pinning
- Complex timelines + scroll
- SVG animations or canvas
- Performance-critical sites
- Framework-agnostic needs

## 2026 Updates
- **Motion 12.x**: Improved `scroll()` API with better GPU sync, but still no pinning
- **GSAP 3.13**: Observer plugin now free (gesture/scroll detection)
- **useGSAP() hook**: Makes GSAP feel native in React

**Bottom line**: For scroll animations beyond basic fades, GSAP ScrollTrigger remains the industry standard in 2026. Motion handles 80% of UI cases elegantly, but GSAP owns the other 20% that actually impress users.