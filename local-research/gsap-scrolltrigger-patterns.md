Querying perplexity using sonar-pro for: GSAP ScrollTrigger best practices 2026 scroll-driven animation patterns performance with maxTokens: 8000
# GSAP ScrollTrigger Best Practices & Performance Patterns 2026

Based on current documentation and expert resources, here are the definitive best practices for scroll-driven animations:

## **Performance Optimization**

### Animate GPU-Accelerated Properties Only
- **Use:** `transform` (translate, rotate, scale) and `opacity`
- **Avoid:** `box-shadow`, `blur`, `width`, `height`, `box-model` properties
- These properties trigger repaints and kill performance on mobile devices

### Batch Similar Animations
Instead of creating multiple individual ScrollTriggers, use **batch processing**:
```javascript
ScrollTrigger.batch(".card", {
  onEnter: (batch) => {
    batch.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: index * 0.15
      });
    });
  }
});
```

### Use `will-change` Sparingly
- Only apply to elements actively being animated
- Remove it after animations complete
- Overuse creates memory overhead and performance degradation

## **Animation Patterns**

### 1. **Scrubbing Best Practices**
```javascript
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    scrub: 1, // 1-2 seconds for smooth "catch-up"
    // scrub: true for 1:1 pixel-perfect tracking
  },
  ease: "none", // CRITICAL: disable easing with scrubbing
  x: 500
});
```
- **Use scrub for:** Parallax effects, visual storytelling, interactive timelines
- **Avoid scrub for:** One-time entrance animations (use `toggleActions` instead)
- Test thoroughly on mobile—touch scroll feels different than mouse wheel

### 2. **toggleActions for Entrance Animations**
```javascript
gsap.from(".fade-in", {
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top 80%",
    toggleActions: "play none none reverse"
    // play on enter, pause on leave, resume on re-enter, reverse on exit
  },
  opacity: 0,
  y: 50,
  duration: 1
});
```

### 3. **Pin & Timeline Combinations**
```javascript
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    pin: true,
    start: "top top",
    end: "+=500",
    scrub: 1,
    markers: true // debugging only
  }
});

tl.from(".title", { opacity: 0, y: -50 })
  .from(".content", { opacity: 0 }, 0.5)
  .to(".box", { rotation: 360 }, 0);
```

## **Responsive Design Patterns**

### Use `gsap.matchMedia()` for Responsive Animations
```javascript
gsap.matchMedia().add("(min-width: 768px)", () => {
  gsap.to(".desktop-element", {
    scrollTrigger: { trigger: ".section" },
    x: 200
  });
});

gsap.matchMedia().add("(max-width: 767px)", () => {
  gsap.to(".mobile-element", {
    scrollTrigger: { trigger: ".section" },
    x: 50
  });
});
```

## **Framework-Specific Best Practices**

### React & Vue
- **Always use refs** for targeting elements
- **Clean up ScrollTriggers** in component unmount/destroy:
  ```javascript
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
  ```
- Use the **useGSAP hook** for automatic cleanup (React)
- Call `ScrollTrigger.refresh()` after route changes

## **Performance Optimization Checklist**

✅ **DO:**
- Batch similar animations
- Use `transform` and `opacity` only
- Enable `markers: true` during development only
- Debounce resize calculations (ScrollTrigger does this automatically)
- Test on low-end mobile devices
- Use stagger instead of individual triggers

❌ **DON'T:**
- Create excessive ScrollTrigger instances (use batch instead)
- Apply animations to layout properties
- Use scrubbing on every animation
- Forget to kill/disable ScrollTriggers on component unmount
- Ignore prefers-reduced-motion accessibility preference
- Over-animate—let scroll animations support storytelling, not distract

## **Start/End Position Guide**

```javascript
start: "top center"    // trigger's top hits viewport center
start: "top 80%"       // trigger's top is 80% down viewport
end: "bottom top"      // trigger's bottom hits viewport top
end: "+=500"           // end after scrolling 500px past start
```

## **Debugging Tools**

```javascript
// Enable visual debugging
scrollTrigger: {
  markers: true,  // shows colored markers
  onUpdate: (self) => console.log(self.progress) // log progress
}
```

## **Key Takeaway for 2026**

**Performance remains paramount.** ScrollTrigger's efficiency comes from:
- Watching *only* scroll position (not all DOM changes)
- 200ms throttling on resize events
- RequestAnimationFrame synchronization
- Upfront trigger point calculation

The best practice is using **timeline-based sections with pinning and batch animations** for complex scroll experiences, while keeping individual animations reserved for simple entrance effects.