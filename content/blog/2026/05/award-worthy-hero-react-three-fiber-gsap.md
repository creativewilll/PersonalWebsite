---
title: "Build an Award-Worthy Hero Section with React Three Fiber and GSAP"
slug: "award-worthy-hero-react-three-fiber-gsap"
date: "2026-05-15"
lastModified: "2026-05-15"
author: "William Spurlock"
readingTime: 22
categories:
  - "Web Design and Digital Experiences"
tags:
  - "react three fiber"
  - "r3f"
  - "three.js"
  - "gsap"
  - "scrolltrigger"
  - "webgl"
  - "hero section"
  - "drei"
  - "next.js"
  - "award winning web design"
  - "3d website"
  - "immersive web"
featured: false
draft: false
excerpt: "A hands-on tutorial building a complete award-worthy 3D hero section from scratch. React Three Fiber, GSAP ScrollTrigger integration, @react-three/drei components, and performance optimization for premium brand sites."
coverImage: "/images/blog/react-three-fiber-gsap-hero.png"
seoTitle: "Build 3D Hero Section R3F GSAP Tutorial 2026 | William Spurlock"
seoDescription: "Learn to build award-worthy 3D hero sections with React Three Fiber and GSAP ScrollTrigger. Complete tutorial with TypeScript, Next.js App Router, and performance optimization."
seoKeywords:
  - "react three fiber tutorial"
  - "r3f gsap scrolltrigger"
  - "three.js hero section"
  - "award winning 3d website"
  - "react three fiber next.js"
  - "drei float meshdistortmaterial"
  - "3d web design tutorial 2026"
  - "gsap 3d scroll animation"
  - "immersive hero section"
  - "webgl react tutorial"
aioTargetQueries:
  - "how to build 3d hero section with react three fiber"
  - "react three fiber gsap scrolltrigger integration"
  - "best drei components for hero sections"
  - "three.js performance optimization react"
  - "award winning website hero section examples"
  - "how to use meshdistortmaterial r3f"
  - "r3f next.js app router setup"
  - "gsap scrolltrigger 3d camera animation"
contentCluster: "immersive-web"
pillarPost: false
parentPillar: "immersive-web-design-manual"
entityMentions:
  - "William Spurlock"
  - "React Three Fiber"
  - "Three.js"
  - "GSAP"
  - "GreenSock"
  - "ScrollTrigger"
  - "@react-three/drei"
  - "@react-three/fiber"
  - "Next.js"
  - "Vercel"
  - "WebGL"
  - "MeshDistortMaterial"
  - "Float"
  - "Environment"
serviceTrack: "web-design"
---

# Build an Award-Worthy Hero Section with React Three Fiber and GSAP

## What We'll Build: A Complete 3D Hero Experience

**We'll build a full-screen 3D hero section featuring floating crystalline shapes, volumetric lighting, and GSAP ScrollTrigger-driven camera animations that respond to user scroll—starting from an empty Next.js page and ending with a production-ready, performant component.** This isn't a theoretical overview. By the end, you'll have TypeScript code that renders an award-worthy hero with proper React Three Fiber architecture, drei helpers for materials and animation, and GSAP integration for scroll-driven 3D motion.

The finished hero will demonstrate: a Canvas setup optimized for Next.js App Router, lighting and environment mapping for photorealistic reflections, custom geometry with MeshDistortMaterial for organic distortion effects, the Float component for ambient motion, GSAP ScrollTrigger integration that maps scroll progress to camera and object animations, responsive design with mobile fallbacks, and performance budgets that maintain 60fps on mid-tier devices. This is the exact stack powering Awwwards Site of the Day winners in 2026.

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Canvas Wrapper** | `@react-three/fiber` | Initializes WebGL renderer with React lifecycle |
| **Scene Content** | `@react-three/drei` | Lights, materials, geometry helpers |
| **Ambient Animation** | `Float` + `MeshDistortMaterial` | Organic, physics-inspired idle motion |
| **Scroll Animation** | GSAP ScrollTrigger | Camera paths and object choreography |
| **Performance** | `Instances` + memoization | Single-draw-call rendering, optimized updates |
| **Responsive** | PerformanceMonitor | Adaptive quality based on device capability |

The distinction between decorative 3D and immersive 3D is motion purpose. Decorative animation drifts randomly; immersive animation responds to user input, creating a feedback loop between scroll and scene state. The techniques here create that feedback loop while maintaining the 60fps performance threshold that separates professional work from experiments.

## Prerequisites and Project Setup

**You'll need a Next.js 14+ project with React 18 or 19, TypeScript, and Tailwind CSS installed.** React Three Fiber 9 pairs with React 19; version 8 works with React 18. The tutorial assumes you're comfortable with React hooks, basic TypeScript, and have seen GSAP ScrollTrigger before—though we'll review the integration patterns specific to 3D.

### Installing Dependencies

The core stack requires four package groups: Three.js for the 3D engine, React Three Fiber for React integration, @react-three/drei for essential helpers, and GSAP with ScrollTrigger for scroll-driven animation.

```bash
# Core 3D stack
npm install three @react-three/fiber @react-three/drei

# Animation and scroll
npm install gsap @gsap/react

# Type definitions
npm install -D @types/three
```

Current stable versions as of May 2026:
- `three`: 0.176.x
- `@react-three/fiber`: 9.5.x (React 19) or 8.18.x (React 18)
- `@react-three/drei`: 10.6.x
- `gsap`: 3.14.x
- `@gsap/react`: 2.1.x

### Next.js App Router Configuration

R3F requires client-side rendering for WebGL initialization, so all Canvas and scene code must live in components marked with the `'use client'` directive. We'll configure `transpilePackages` for Three.js ecosystem compatibility.

```javascript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
};

export default nextConfig;
```

The `transpilePackages` configuration is essential—Three.js and its ecosystem often ship untranspiled ES modules that Next.js needs to process for compatibility. Without this, you'll encounter module resolution errors during build.

**Version compatibility matrix:**

| React Version | R3F Version | Next.js Version | Notes |
|--------------|-------------|-----------------|-------|
| React 19 | @react-three/fiber 9.x | Next.js 14+ | Latest, concurrent features |
| React 18 | @react-three/fiber 8.x | Next.js 13+ | Stable, widely deployed |
| React 18 | @react-three/fiber 9.x | Next.js 14+ | Use fiber 9 with React 18 compatibility mode |

For new projects in May 2026, I recommend React 19 with R3F 9—it provides better concurrent rendering support and improved error boundaries for 3D scene recovery.

## Creating the Canvas and Scene Architecture

**The foundation of any R3F project is the Canvas component, which initializes the Three.js renderer, camera, and scene graph within a React component tree.** In Next.js App Router, this must be wrapped in a client component that handles SSR gracefully.

### The Canvas Wrapper Component

We'll build a reusable SceneCanvas component that configures the camera, enables shadows, sets the pixel ratio for performance, and wraps children in Suspense for async asset loading.

```typescript
// components/SceneCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload } from '@react-three/drei';

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export function SceneCanvas({
  children,
  className = 'w-full h-screen',
  cameraPosition = [0, 0, 8],
  fov = 45,
}: SceneCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          position: cameraPosition,
          fov,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Cap pixel ratio for performance
        shadows
        className="touch-none"
      >
        <Suspense fallback={<CanvasLoader />}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

function CanvasLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}
```

The Canvas configuration sets several critical parameters:

| Prop | Value | Purpose |
|------|-------|---------|
| `dpr` | `[1, 1.5]` | Caps device pixel ratio to prevent 4K render buffers on Retina |
| `powerPreference` | `'high-performance'` | Requests discrete GPU on laptops with hybrid graphics |
| `alpha: true` | `true` | Allows transparent background for CSS background blending |
| `antialias: true` | `true` | Enables MSAA for smoother edges (performance cost: ~10%) |
| `shadows` | `true` | Enables shadow map rendering |

### Scene Component Structure

The Scene component will contain all 3D objects—lights, meshes, effects—and use R3F's declarative JSX syntax to build the scene graph. This pattern separates concerns: SceneCanvas handles renderer setup, Scene handles content.

```typescript
// components/HeroScene.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Environment,
  Float,
  ContactShadows,
  MeshDistortMaterial,
} from '@react-three/drei';

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Continuous rotation for the entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      {/* Environment lighting */}
      <Environment preset="studio" background={false} />

      {/* Three-point lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={2048}
      />
      <spotLight
        position={[-5, 5, -5]}
        intensity={0.8}
        angle={0.5}
        penumbra={1}
      />

      {/* Main crystalline group */}
      <group ref={groupRef}>
        <CrystallineShapes />
      </group>

      {/* Ground shadows */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2.5}
        far={4}
      />
    </>
  );
}

function CrystallineShapes() {
  const materialProps = {
    color: '#4f46e5',
    roughness: 0.1,
    metalness: 0.8,
    distort: 0.4,
    speed: 2,
  };

  return (
    <>
      {/* Central crystal */}
      <Float
        speed={1.5}
        rotationIntensity={1.2}
        floatIntensity={1.5}
        floatingRange={[-0.5, 0.5]}
      >
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial {...materialProps} />
        </mesh>
      </Float>

      {/* Orbiting crystals */}
      <Float
        speed={2}
        rotationIntensity={0.8}
        floatIntensity={1.2}
        floatingRange={[-0.3, 0.3]}
      >
        <mesh position={[-2.5, 0.5, -1]} castShadow>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial {...materialProps} color="#8b5cf6" />
        </mesh>
      </Float>

      <Float
        speed={1.8}
        rotationIntensity={1}
        floatIntensity={1.3}
        floatingRange={[-0.4, 0.4]}
      >
        <mesh position={[2.2, -0.3, 0.5]} castShadow>
          <tetrahedronGeometry args={[0.9, 0]} />
          <MeshDistortMaterial {...materialProps} color="#06b6d4" />
        </mesh>
      </Float>
    </>
  );
}
```

This Scene component demonstrates several key patterns:

1. **`useFrame` for animation**: The continuous rotation is handled in `useFrame`, which runs before each render. This is more efficient than React state updates for 60fps animation.

2. **`useRef` for object access**: We use refs to access Three.js objects directly, enabling imperative manipulation without triggering React re-renders.

3. **Declarative Three.js**: R3F's JSX syntax mirrors Three.js object structure—`<mesh>`, `<ambientLight>`, `<group>`—making the scene graph readable and composable.

4. **Component composition**: `CrystallineShapes` is extracted as a sub-component, demonstrating how to build complex scenes from reusable pieces.

## Lighting and Environment Setup

**Photorealistic 3D requires proper lighting and environment mapping; without them, even complex geometry looks flat and artificial.** We'll use a three-point lighting setup combined with drei's Environment component for image-based lighting and reflections.

### Three-Point Lighting in R3F

The classic studio lighting pattern translates directly to R3F: a key light for primary illumination, fill light to soften shadows, and rim light to separate the subject from the background. Each uses drei's light helpers with castShadow enabled.

```typescript
// components/LightingSetup.tsx
'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useHelper } from '@react-three/drei';

export function LightingSetup() {
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  // Dev-only: visualize light positions
  // useHelper(directionalRef, THREE.DirectionalLightHelper, 1, 'red');
  // useHelper(spotRef, THREE.SpotLightHelper, 'blue');

  return (
    <>
      {/* Key Light - Main illumination */}
      <directionalLight
        ref={directionalRef}
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />

      {/* Fill Light - Softens shadows */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.4}
        color="#e0e7ff"
      />

      {/* Rim Light - Separates subject from background */}
      <spotLight
        ref={spotRef}
        position={[0, 5, -8]}
        intensity={1.2}
        angle={Math.PI / 6}
        penumbra={0.5}
        color="#c4b5fd"
        castShadow
      />

      {/* Ambient base */}
      <ambientLight intensity={0.3} color="#f8fafc" />
    </>
  );
}
```

**Three-point lighting breakdown:**

| Light | Position | Intensity | Purpose |
|-------|----------|-----------|---------|
| **Key** | `[5, 8, 5]` | 1.5 | Primary illumination, defines form |
| **Fill** | `[-5, 3, -5]` | 0.4 | Softens key shadows, reveals detail |
| **Rim** | `[0, 5, -8]` | 1.2 | Edge separation, depth cue |
| **Ambient** | Global | 0.3 | Base exposure, prevents pure black |

The key light's shadow configuration uses a 2048×2048 shadow map with an orthographic shadow camera. This provides crisp, stable shadows without the perspective distortion of point lights. The `shadow-bias` prevents shadow acne—self-shadowing artifacts where faces incorrectly shadow themselves.

### Environment Component for Reflections

Drei's Environment component loads HDRI environment maps that provide realistic indirect lighting and reflections on metallic surfaces. We'll use the "studio" preset for professional product-visualization quality, or load a custom HDR file for unique brand aesthetics.

```typescript
// Environment presets available in drei
const environmentPresets = [
  'sunset',     // Warm, golden hour
  'dawn',       // Cool, early morning
  'night',      // Dark, artificial sources
  'warehouse',  // Industrial, diffused
  'forest',     // Green-tinted, natural
  'apartment',  // Interior, mixed sources
  'studio',     // Professional, neutral
  'city',       // Urban, high contrast
  'park',       // Outdoor, soft
  'lobby',      // Commercial interior
] as const;
```

```typescript
// Using preset environment
<Environment preset="studio" background={false} />

// Using custom HDR (place in public/hdr/)
<Environment
  files="/hdr/custom-studio.hdr"
  background
  backgroundBlurriness={0.5}
  environmentIntensity={1.2}
/>
```

The Environment component does three things:

1. **Image-based lighting (IBL)**: Uses the HDRI as a light source, providing realistic indirect illumination that matches the environment's color temperature.

2. **Reflection mapping**: Metallic materials (`metalness > 0`) reflect the environment, creating realistic surface detail without expensive ray tracing.

3. **Background rendering**: When `background={true}`, the environment becomes the scene background. We use `false` here because we'll composite HTML content over the 3D scene.

For production sites, I recommend downloading optimized HDR files from [Poly Haven](https://polyhaven.com/hdris) rather than using presets—this gives you brand-unique lighting that competitors can't replicate with off-the-shelf settings.

## Building the Hero Geometry: Floating Crystalline Shapes

**The visual centerpiece uses Icosahedron geometry with MeshDistortMaterial to create organic, ever-changing crystalline forms that feel alive without being distracting.** This combination—geometric precision with shader-based distortion—is a hallmark of premium 3D web design in 2026.

### MeshDistortMaterial for Organic Motion

MeshDistortMaterial is a drei shader material that applies Perlin noise distortion to mesh vertices, creating a "wobbling" liquid effect. We'll configure the distort and speed props for subtle, ambient motion that doesn't compete with scroll-driven animations.

```typescript
import { MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function DistortedCrystal({ color = '#4f46e5', ...props }) {
  const materialRef = useRef<THREE.MeshDistortMaterial>(null);

  // Animate material properties
  useFrame((state) => {
    if (materialRef.current) {
      // Subtle color shift based on time
      const hue = (state.clock.elapsedTime * 0.05) % 1;
      materialRef.current.color.setHSL(hue, 0.7, 0.5);
    }
  });

  return (
    <mesh {...props} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        roughness={0.1}
        metalness={0.8}
        distort={0.4}        // Perlin noise amplitude (0-1)
        speed={2}            // Animation speed multiplier
        radius={1}         // Distortion radius
      />
    </mesh>
  );
}
```

**MeshDistortMaterial properties:**

| Prop | Type | Default | Effect |
|------|------|---------|--------|
| `distort` | number | 0.3 | Perlin noise amplitude—higher = more deformation |
| `speed` | number | 1 | Animation speed multiplier for distortion |
| `radius` | number | 1 | Radius of distortion influence |
| `roughness` | number | 0.4 | Material roughness—lower = more mirror-like |
| `metalness` | number | 0.7 | Metallic quality—affects environment reflection |

The shader uses simplex noise to displace vertices along their normals, creating a "breathing" organic effect. At `distort: 0.4`, the icosahedron maintains its geometric identity while appearing fluid—sweet spot for brand-friendly aesthetics.

### Float Component for Ambient Animation

The Float component from drei adds smooth, physics-inspired floating motion—rotation and vertical bobbing—that makes static geometry feel weightless and responsive. This handles idle animation so we can reserve GSAP for scroll-driven effects.

```typescript
import { Float } from '@react-three/drei';

<Float
  speed={1.5}           // Animation speed (0-10)
  rotationIntensity={1.2}  // Rotation amplitude (0-∞)
  floatIntensity={1.5}     // Vertical bob amplitude (0-∞)
  floatingRange={[-0.5, 0.5]}  // Y-axis range [min, max]
>
  <mesh>
    <icosahedronGeometry args={[1, 1]} />
    <MeshDistortMaterial color="#4f46e5" />
  </mesh>
</Float>
```

Float combines three motions:

1. **Vertical oscillation**: Sine-wave motion on Y-axis within `floatingRange`
2. **Rotation oscillation**: Gentle rotation around X and Z axes
3. **Time offset**: Each Float instance has random phase offset so multiple objects don't move in perfect unison

### Instancing for Performance

When rendering multiple similar objects (particles, crystal clusters), we'll use drei's Instances component to render thousands of objects in a single draw call. This is essential for maintaining 60fps on mobile devices.

```typescript
import { Instances, Instance } from '@react-three/drei';
import { useMemo } from 'react';

function CrystalField({ count = 50 }) {
  // Generate random positions once
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      color: ['#4f46e5', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)],
    }));
  }, [count]);

  return (
    <Instances limit={count}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial
        roughness={0.1}
        metalness={0.8}
        distort={0.3}
        speed={1.5}
      />

      {positions.map((props, i) => (
        <Instance
          key={i}
          position={props.position}
          scale={props.scale}
          rotation={props.rotation}
          color={props.color}
        />
      ))}
    </Instances>
  );
}
```

**Draw call comparison:**

| Approach | Objects | Draw Calls | FPS (M1 Mac) |
|----------|---------|------------|--------------|
| Individual meshes | 50 | 50 | 45 |
| `Instances` | 50 | 1 | 60 |
| `Instances` | 1000 | 1 | 58 |
| Individual meshes | 1000 | 1000 | 8 |

Instancing works by uploading a single geometry and material to the GPU once, then using instanced attributes (position, rotation, scale, color) to render multiple copies in one draw call. This is how games render forests, crowds, and particle systems—same technique, applied to premium web design.

**When to use each approach:**

- **Individual meshes**: < 10 objects, or objects with unique materials that can't share
- **Instances**: Many objects (>20) with same geometry/material, varying position/rotation/scale
- **Merged geometry**: Static objects that never move independently (use `BufferGeometryUtils.mergeGeometries`)

## Integrating GSAP ScrollTrigger for Scroll-Driven 3D

**GSAP ScrollTrigger provides the bridge between DOM scroll position and 3D scene state, enabling camera movements, object rotations, and material property changes that progress exactly with user scroll.** This is where the hero transforms from a static 3D scene into an immersive storytelling device.

### ScrollTrigger Setup in R3F

We'll use the `@gsap/react` package with the `useGSAP` hook for proper React integration and cleanup. The ScrollTrigger timeline will scrub through 3D animations based on a pinned container's scroll progress.

```typescript
// hooks/useScrollAnimation.ts
'use client';

import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationConfig {
  triggerRef: React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export function useScrollAnimation({
  triggerRef,
  start = 'top top',
  end = 'bottom+=2000 top',
  scrub = 1,
}: ScrollAnimationConfig) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!triggerRef.current || !groupRef.current) return;

      // Create timeline with ScrollTrigger
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          end,
          scrub,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Camera approach
      timelineRef.current.to(
        camera.position,
        {
          x: 0,
          y: 0.5,
          z: 4,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: () => camera.lookAt(0, 0, 0),
        },
        0
      );

      // Phase 2: Camera orbit around objects
      timelineRef.current.to(
        camera.position,
        {
          x: 3,
          y: 1,
          z: 3,
          duration: 1,
          ease: 'none',
          onUpdate: () => camera.lookAt(0, 0, 0),
        },
        1
      );

      // Phase 3: Object rotation accelerates
      timelineRef.current.to(
        groupRef.current.rotation,
        {
          y: Math.PI * 2,
          duration: 2,
          ease: 'power1.inOut',
        },
        0
      );

      // Phase 4: Final camera rest position
      timelineRef.current.to(
        camera.position,
        {
          x: 0,
          y: -1,
          z: 6,
          duration: 1,
          ease: 'power2.out',
          onUpdate: () => camera.lookAt(0, -0.5, 0),
        },
        2
      );

      return () => {
        timelineRef.current?.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: triggerRef, dependencies: [camera, triggerRef] }
  );

  return { groupRef, timelineRef };
}
```

This hook demonstrates the critical patterns for GSAP+R3F integration:

1. **Plugin registration**: `gsap.registerPlugin(ScrollTrigger)` runs once at module level, not inside components
2. **`useGSAP` hook**: Provides automatic context management and cleanup
3. **Camera access**: `useThree()` gives access to the R3F camera instance
4. **Object refs**: `groupRef` connects to Three.js objects for direct manipulation
5. **Timeline scrubbing**: `scrub: 1` creates smooth 1-second smoothing between scroll and animation
6. **`onUpdate` + `lookAt`**: Camera animations must continuously orient toward the subject

### Camera Animation Patterns

The camera will follow a choreographed path: starting at a wide establishing shot, dollying forward and orbiting around the crystalline forms as the user scrolls, then transitioning to a final resting position that frames the CTA section. All camera movements use GSAP's smooth interpolation with lookAt constraints.

| Phase | Scroll % | Camera Position | Action |
|-------|----------|-----------------|--------|
| Establish | 0-33% | `[0, 0, 8]` → `[0, 0.5, 4]` | Dolly in to subject |
| Orbit | 33-66% | `[0, 0.5, 4]` → `[3, 1, 3]` | Orbit around objects |
| Reveal | 66-100% | `[3, 1, 3]` → `[0, -1, 6]` | Settle to reveal CTA |

### Object Animation and Material Properties

Beyond camera motion, we'll animate object properties: rotation speed increases during scroll, material color shifts from cool to warm tones, and Float component intensity reduces as the scene transitions from ambient to scroll-driven motion.

```typescript
// hooks/useMaterialAnimation.ts
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

export function useMaterialAnimation(
  materialRef: React.RefObject<THREE.MeshDistortMaterial>,
  triggerRef: React.RefObject<HTMLElement>
) {
  useGSAP(
    () => {
      if (!materialRef.current || !triggerRef.current) return;

      // Animate color from cool to warm
      gsap.to(materialRef.current.color, {
        r: 1,    // Red
        g: 0.4,  // Green
        b: 0.2,  // Blue
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Reduce distortion as we scroll (focusing effect)
      gsap.to(materialRef.current, {
        distort: 0.1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'center center',
          scrub: true,
        },
      });
    },
    { scope: triggerRef, dependencies: [materialRef, triggerRef] }
  );
}
```

### Integrating with the Scene Component

Here's how the animation hooks connect to the Scene:

```typescript
// components/AnimatedHeroScene.tsx
'use client';

import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedHeroSceneProps {
  triggerRef: React.RefObject<HTMLElement>;
}

export function AnimatedHeroScene({ triggerRef }: AnimatedHeroSceneProps) {
  const { groupRef } = useScrollAnimation({
    triggerRef,
    start: 'top top',
    end: 'bottom+=1500 top',
    scrub: 1,
  });

  return (
    <>
      <Environment preset="studio" background={false} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

      <group ref={groupRef}>
        <Float
          speed={1.5}
          rotationIntensity={1.2}
          floatIntensity={1.5}
          floatingRange={[-0.5, 0.5]}
        >
          <mesh castShadow receiveShadow>
            <icosahedronGeometry args={[1.5, 1]} />
            <MeshDistortMaterial
              color="#4f46e5"
              roughness={0.1}
              metalness={0.8}
              distort={0.4}
              speed={2}
            />
          </mesh>
        </Float>
      </group>

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2.5}
        far={4}
      />
    </>
  );
}
```

**Key integration patterns:**

1. **Ref forwarding**: `groupRef` from the animation hook attaches to the Three.js group
2. **Trigger element**: The DOM element that controls scroll progress (typically the hero container)
3. **Scrub smoothing**: Value of 1 means GSAP interpolates scroll position over 1 second—higher = smoother but more latency
4. **Cleanup**: `useGSAP` handles context cleanup automatically; manual `kill()` for explicit control

The result: as the user scrolls, the camera executes a choreographed sequence while the crystalline shapes rotate and material properties shift—creating a narrative arc within the hero section itself.

## Adding Particle Effects and Post-Processing

**Fine-grained particles and post-processing effects add the polish that separates award-winning sites from competent implementations.** We'll implement a performant particle system and selective post-processing that enhances without overwhelming.

### Particle System with Points

Using Three.js Points and BufferGeometry, we'll create a field of floating particles that respond to scroll position—drifting downward as the user scrolls, creating a sense of depth and atmosphere.

```typescript
// components/ParticleField.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  scrollProgress?: number;
}

export function ParticleField({ count = 200, scrollProgress = 0 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions once
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
      velocities[i] = 0.01 + Math.random() * 0.02;
    }

    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positionArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle upward drift
      positionArray[i * 3 + 1] += velocities[i];

      // Scroll-induced downward push
      positionArray[i * 3 + 1] -= scrollProgress * 0.1;

      // Wrap around
      if (positionArray[i * 3 + 1] > 10) {
        positionArray[i * 3 + 1] = -10;
      }
      if (positionArray[i * 3 + 1] < -10) {
        positionArray[i * 3 + 1] = 10;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a5b4fc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
```

This particle system uses `Points`—the most efficient way to render many small objects. Instead of 200 individual meshes (200 draw calls), we use one geometry with 200 vertices (1 draw call). The `useFrame` loop mutates the position buffer directly for maximum performance.

### Selective Post-Processing

Post-processing effects like bloom add cinematic glow to emissive materials, but must be used sparingly to maintain performance. We'll use @react-three/postprocessing with the EffectComposer, limiting effects to the hero viewport only.

```typescript
// components/PostProcessing.tsx
'use client';

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';

interface PostProcessingProps {
  enabled?: boolean;
}

export function PostProcessing({ enabled = true }: PostProcessingProps) {
  const { gl } = useThree();

  // Disable on low-power devices
  const isLowPower =
    typeof navigator !== 'undefined' &&
    (navigator as any).deviceMemory !== undefined &&
    (navigator as any).deviceMemory < 4;

  if (!enabled || isLowPower) return null;

  return (
    <EffectComposer
      enabled={enabled}
      resolutionScale={0.5} // Render at half res for performance
      multisampling={0}     // Disable MSAA (we have antialias on canvas)
    >
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        eskil={false}
        blendFunction={1}
      />
    </EffectComposer>
  );
}
```

**Post-processing configuration rationale:**

| Effect | Purpose | Cost | Setting |
|--------|---------|------|---------|
| **Bloom** | Glow around bright areas | Medium | `intensity: 0.5`, threshold 0.9 (only very bright) |
| **Vignette** | Darken edges, focus center | Low | Classic film look, subtle |
| **Resolution Scale** | Render at half resolution | Saves 75% pixel fill | `0.5` for 4x fewer pixels |

The `resolutionScale: 0.5` is crucial—post-processing at full Retina resolution (2x or 3x DPR) is prohibitively expensive. Rendering effects at half resolution then upscaling provides 90% of the visual impact at 25% of the cost.

**Install the postprocessing package:**

```bash
npm install @react-three/postprocessing postprocessing
```

Use post-processing judiciously. Award-winning sites from 2025-2026 show a trend toward subtle, selective effects rather than the heavy-handed bloom that dominated 2022-2023 WebGL experiments. The effect should enhance, not announce itself.

## Responsive Design and Mobile Optimization

**A 3D hero that works only on desktop is a failed hero; we'll implement device-adaptive quality that scales geometry complexity, particle count, and post-processing based on device capability.** This is non-negotiable for production sites.

### Device Detection and Adaptive Quality

Using Drei's PerformanceMonitor, we'll detect frame rate and device tier, automatically reducing particle counts, shadow quality, and post-processing on lower-end devices. The experience degrades gracefully rather than breaking.

```typescript
// components/AdaptiveCanvas.tsx
'use client';

import { useState, useCallback } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { SceneCanvas } from './SceneCanvas';
import { HeroScene } from './HeroScene';
import { MobileFallback } from './MobileFallback';

interface AdaptiveCanvasProps {
  triggerRef: React.RefObject<HTMLElement>;
}

export function AdaptiveCanvas({ triggerRef }: AdaptiveCanvasProps) {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [fps, setFps] = useState(60);

  const onPerformanceChange = useCallback(
    ({ fps: currentFps }: { fps: number }) => {
      setFps(currentFps);

      if (currentFps < 30 && quality !== 'low') {
        setQuality('low');
      } else if (currentFps < 45 && quality === 'high') {
        setQuality('medium');
      }
    },
    [quality]
  );

  // Mobile detection
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Use fallback on very low-end devices
  if (quality === 'low' && isMobile) {
    return <MobileFallback />;
  }

  return (
    <>
      <PerformanceMonitor
        onChange={onPerformanceChange}
        flipflops={3}
        iterations={3}
        threshold={0}
      />
      <SceneCanvas dpr={isMobile ? [1, 1] : [1, 1.5]}>
        <HeroScene
          triggerRef={triggerRef}
          particleCount={quality === 'high' ? 200 : quality === 'medium' ? 100 : 0}
          shadows={quality !== 'low'}
          postProcessing={quality === 'high'}
        />
      </SceneCanvas>
    </>
  );
}
```

**Adaptive quality matrix:**

| Quality | FPS Range | Particles | Shadows | Post-Processing | DPR |
|---------|-----------|-----------|---------|-----------------|-----|
| **High** | >45 | 200 | Yes | Bloom + Vignette | 1.5 |
| **Medium** | 30-45 | 100 | Yes | Vignette only | 1.0 |
| **Low** | <30 | 0 | No | None | 1.0 |

The `PerformanceMonitor` component from drei runs a benchmark on mount, measuring actual FPS over several iterations. If the FPS drops below thresholds, it triggers quality reduction. The `flipflops` parameter prevents oscillation—once lowered, quality stays lowered.

### Mobile-First Fallback Strategy

On mobile devices—or when `prefers-reduced-motion` is enabled—we'll replace the full 3D scene with a static CSS-generated gradient background that evokes the same aesthetic without the performance cost. This ensures accessibility compliance and smooth mobile experience.

```typescript
// components/MobileFallback.tsx
export function MobileFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* CSS gradient that evokes the 3D scene's color palette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(79, 70, 229, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 70%),
            linear-gradient(to bottom, #020617, #0f172a)
          `,
        }}
      />

      {/* Subtle animated gradient orbs */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'rgba(79, 70, 229, 0.4)',
            top: '20%',
            left: '10%',
            animationDuration: '8s',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'rgba(139, 92, 246, 0.4)',
            bottom: '20%',
            right: '10%',
            animationDuration: '10s',
            animationDelay: '2s',
          }}
        />
      </div>
    </div>
  );
}
```

The fallback uses CSS gradients and animations rather than WebGL. This provides:

- **Zero JavaScript execution** on the main thread
- **Native browser optimization** for CSS animations
- **Battery efficiency** on mobile devices
- **Accessibility compliance** without motion concerns

**Device capability detection strategy:**

```typescript
// lib/detectDevice.ts
export function getDeviceTier(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'high';

  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const gpuTier = detectGPUTier();

  if (
    memory !== undefined &&
    memory <= 4 &&
    (cores === undefined || cores <= 4)
  ) {
    return 'low';
  }

  if (
    gpuTier === 'low' ||
    /Android.*(Chrome\/[0-7][0-9]|SamsungBrowser)/.test(navigator.userAgent)
  ) {
    return 'low';
  }

  if (gpuTier === 'medium' || (memory && memory <= 8)) {
    return 'medium';
  }

  return 'high';
}

function detectGPUTier(): 'low' | 'medium' | 'high' {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl2') || canvas.getContext('webgl');

  if (!gl) return 'low';

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return 'medium';

  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

  // Check for software rendering or mobile GPUs
  if (
    renderer.includes('SwiftShader') ||
    renderer.includes('Software') ||
    renderer.includes('Mali-G') ||
    renderer.includes('Adreno (3|4|5)0')
  ) {
    return 'low';
  }

  // Check for high-end mobile or desktop
  if (
    renderer.includes('Apple GPU') ||
    renderer.includes('Mali-G7') ||
    renderer.includes('Adreno 6') ||
    renderer.includes('NVIDIA') ||
    renderer.includes('AMD') ||
    renderer.includes('Intel Iris')
  ) {
    return 'high';
  }

  return 'medium';
}
```

This detection uses a combination of:

1. **`deviceMemory`**: Chrome's exposed memory API (4GB threshold)
2. **`hardwareConcurrency`**: CPU core count
3. **WebGL renderer string**: GPU model detection via debug extension
4. **User agent parsing**: Browser-specific optimizations

The combination provides a reliable tier classification without invasive fingerprinting. Use this for initial quality settings, then refine with `PerformanceMonitor` at runtime.

## Performance Optimization and Best Practices

**Three.js performance follows specific rules: minimize draw calls through instancing, use useMemo for geometries and materials, avoid React state updates in useFrame, and cap pixel ratio for high-DPI displays.** Violating any of these tanks performance.

### Draw Call Optimization with Instancing

Every unique mesh-material combination creates a draw call. With 100 objects, that's 100 draw calls—too many for smooth performance. Instancing renders thousands of identical objects in a single draw call through GPU instancing.

**Draw call budgets by device tier:**

| Device Tier | Target Draw Calls | Max Triangles | Notes |
|-------------|-------------------|---------------|-------|
| **Flagship** | <100 | 1M | iPhone 15 Pro, Galaxy S24, M3 MacBook |
| **Mid-range** | <50 | 500K | iPhone 13, Pixel 7, most laptops |
| **Low-end** | <20 | 200K | Budget Android, older iPhones |

To stay within budget:

1. **Use `<Instances>`** for repeated geometry (particles, crystals, debris)
2. **Merge static geometry** with `BufferGeometryUtils.mergeGeometries` for environment elements
3. **Share materials**—don't create new material instances per object
4. **Disable shadows** on low-end (each shadow-casting light doubles draw calls)

### Memoization and Ref Patterns

Heavy geometries and materials must be created once with useMemo and referenced via refs, not recreated on every render. In useFrame, mutate object properties directly via refs rather than triggering React re-renders.

```typescript
// BAD: New geometry every render
function BadExample() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 1]} /> {/* Recreated every frame! */}
      <meshStandardMaterial color="red" />  {/* Recreated every frame! */}
    </mesh>
  );
}

// GOOD: Memoized geometry and material
function GoodExample() {
  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(1, 1),
    []
  );
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 'red' }),
    []
  );

  return (
    <mesh geometry={geometry} material={material}>
      {/* Reuses same geometry/material instances */}
    </mesh>
  );
}

// BEST: Drei's declarative components (internally optimized)
function BestExample() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 1]} /> {/* Drei handles memoization */}
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
```

**Critical `useFrame` pattern—direct mutation, not setState:**

```typescript
// BAD: Triggers 60 React renders per second
function BadAnimation() {
  const [rotation, setRotation] = useState(0);

  useFrame((_, delta) => {
    setRotation((r) => r + delta); // 60 re-renders/second!
  });

  return (
    <mesh rotation={[0, rotation, 0]}>
      <boxGeometry />
    </mesh>
  );
}

// GOOD: Direct object mutation, no React overhead
function GoodAnimation() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta; // Direct mutation
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
    </mesh>
  );
}
```

### Pixel Ratio and DPR Management

High-DPI displays (Retina, modern Android) have device pixel ratios of 2 or 3, which multiplies render buffer size quadratically. We'll cap DPR at 1.5 via the Canvas dpr prop to maintain performance on premium devices.

**DPR impact on render cost:**

| DPR | Render Resolution (1080p display) | Pixel Fill | Cost Multiplier |
|-----|-----------------------------------|------------|-----------------|
| 1.0 | 1920×1080 | 2M | 1× (baseline) |
| 1.5 | 2880×1620 | 4.7M | 2.25× |
| 2.0 | 3840×2160 | 8.3M | 4× |
| 3.0 | 5760×3240 | 18.7M | 9× |

At DPR 3.0 on a MacBook Pro, you're rendering 18.7 million pixels per frame. Most scenes can't maintain 60fps at that resolution.

```typescript
// Canvas DPR configuration
<Canvas
  dpr={[1, 1.5]} // Min 1.0, max 1.5—sweet spot for quality/performance
  // Alternative: dynamic based on device tier
  dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
>
```

**Additional performance patterns:**

```typescript
// Lazy load the entire 3D section
import dynamic from 'next/dynamic';

const Hero3D = dynamic(
  () => import('./components/Hero3D').then((mod) => mod.Hero3D),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

// Use Drei's Bvh for accelerated raycasting (if using hover interactions)
import { Bvh } from '@react-three/drei';

<Bvh>
  <ComplexModelWithManyTriangles />
</Bvh>

// Disable raycasting when not needed
<mesh raycast={() => null}>
  {/* This mesh won't participate in raycasting */}
</mesh>
```

The `Bvh` component from drei builds a bounding volume hierarchy for complex models, making raycasting (mouse interaction detection) O(log n) instead of O(n). For models with 100K+ triangles, this is essential for interactive performance.

**Performance profiling checklist:**

```typescript
// Enable Three.js renderer info in development
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    const interval = setInterval(() => {
      const { calls, triangles, points } = gl.info.render;
      console.log(`Draw calls: ${calls}, Triangles: ${triangles}, Points: ${points}`);
    }, 2000);
    return () => clearInterval(interval);
  }
}, [gl]);
```

Watch these metrics:
- **Draw calls**: Keep under 100 for mid-range devices
- **Triangles**: Under 500K for smooth mobile performance
- **Textures**: Monitor GPU memory—4K textures are 64MB each
- **Frame time**: Target 16.67ms (60fps) or 33.3ms (30fps)

## Accessibility and Reduced Motion Support

**3D hero sections must respect user accessibility preferences, including reduced motion settings and ensuring content remains accessible without the 3D experience.** This is both an ethical requirement and increasingly a legal one.

### Detecting prefers-reduced-motion

We'll use the CSS media query `prefers-reduced-motion` to detect user preferences, conditionally disabling GSAP animations, Float components, and auto-rotating camera behavior when the user requests reduced motion.

```typescript
// hooks/useReducedMotion.ts
import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

```typescript
// components/AccessibleScene.tsx
'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AccessibleScene() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {reducedMotion ? (
        <StaticScene /> // No animation, static composition
      ) : (
        <AnimatedScene /> // Full GSAP + Float animations
      )}
    </>
  );
}

function StaticScene() {
  // Static composition—same visual design, zero motion
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      {/* No Float, no useFrame rotation, no GSAP */}
    </group>
  );
}
```

**When `prefers-reduced-motion` is detected:**

| Feature | Standard | Reduced Motion |
|---------|----------|----------------|
| `Float` component | Active | Disabled or position fixed |
| `useFrame` rotation | Active | Disabled |
| GSAP ScrollTrigger | Scrubbed timeline | Immediate jump to final state or disabled |
| Camera animation | Smooth interpolation | Static position or instant transition |
| Particle motion | Animated | Static or disabled |

### Fallback Content Strategy

For users on screen readers or with JavaScript disabled, the 3D canvas must not block access to content. We'll use semantic HTML with the Canvas as a background element, ensuring all text content and CTAs are fully accessible DOM elements layered above or beside the 3D scene.

```typescript
// components/HeroSection.tsx
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
      aria-label="Hero section with 3D visualization"
    >
      {/* 3D Canvas - background layer */}
      <div
        className="fixed inset-0 z-0"
        role="img"
        aria-label="Abstract crystalline forms floating in space"
      >
        <AdaptiveCanvas triggerRef={containerRef} />
      </div>

      {/* Content layer - accessible, semantic HTML */}
      <div className="relative z-10 h-screen flex flex-col justify-center px-8 lg:px-16">
        <h1 className="text-5xl lg:text-7xl font-bold text-white">
          Building Digital Experiences
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-2xl">
          Award-winning immersive web design that transforms brands and
          converts visitors.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#work"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-8 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator - decorative, aria-hidden */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
```

**Accessibility checklist for 3D heroes:**

- [ ] All content is semantic HTML, not rendered in WebGL textures
- [ ] Images/3D scenes have descriptive `aria-label` or `alt` text
- [ ] Interactive elements are real `<button>` or `<a>` tags, not raycasted 3D objects
- [ ] `prefers-reduced-motion` disables or reduces all animation
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Focus states are visible on all interactive elements
- [ ] Tab order follows visual hierarchy
- [ ] No content is hidden inside WebGL that screen readers can't access

**Critical rule: Never put essential content inside WebGL.** If text is painted onto a 3D texture, screen readers can't access it. If a CTA exists only as a raycasted mesh, keyboard users can't tab to it. Always layer semantic HTML over the 3D scene for content and interaction.

## Putting It All Together: The Complete Hero Component

**The final component composes all patterns—Canvas wrapper, Scene with lights and geometry, GSAP ScrollTrigger integration, responsive fallbacks, and accessibility checks—into a single, copy-paste-ready implementation.** This is production code, not example snippets.

### Project Structure and File Organization

We'll organize files following R3F best practices: SceneCanvas.tsx for the Canvas wrapper, HeroScene.tsx for 3D content, useScrollAnimation.ts for GSAP logic, and index.tsx for composition. This separation enables testing and reusability.

```
app/
  page.tsx                    # Server component entry
  layout.tsx                  # Root layout
components/
  hero/
    HeroSection.tsx           # Main section with HTML content + Canvas
    HeroCanvas.tsx            # Adaptive Canvas wrapper
    HeroScene.tsx             # 3D scene content
    SceneCanvas.tsx           # Reusable Canvas component
    LightingSetup.tsx         # Three-point lights
    CrystallineShapes.tsx     # Floating geometry
    ParticleField.tsx         # Background particles
    PostProcessing.tsx        # Effects composer
    MobileFallback.tsx        # CSS fallback for low-end
  hooks/
    useScrollAnimation.ts     # GSAP ScrollTrigger integration
    useReducedMotion.ts       # Accessibility detection
    useDeviceTier.ts          # Performance tier detection
lib/
  gsap.ts                     # GSAP plugin registration
public/
  hdr/
    studio-env.hdr            # Custom environment map (optional)
```

### The Complete Implementation

The full TypeScript/React code bringing together all patterns: Next.js App Router compatibility, responsive design, performance optimizations, and scroll-driven animation. This is your starting point for client projects.

```typescript
// components/hero/HeroSection.tsx
'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { HeroContent } from './HeroContent';

// Lazy load 3D to avoid SSR issues and reduce initial bundle
const HeroCanvas = dynamic(
  () => import('./HeroCanvas').then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
      aria-label="Hero section with immersive 3D visualization"
    >
      {/* 3D Background */}
      <div
        className="fixed inset-0 z-0"
        role="img"
        aria-label="Abstract crystalline forms floating in space with volumetric lighting"
      >
        <HeroCanvas triggerRef={containerRef} />
      </div>

      {/* Content Overlay */}
      <HeroContent />
    </section>
  );
}

function HeroFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}
```

```typescript
// components/hero/HeroCanvas.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { SceneCanvas } from './SceneCanvas';
import { HeroScene } from './HeroScene';
import { MobileFallback } from './MobileFallback';
import { getDeviceTier } from '@/lib/detectDevice';

interface HeroCanvasProps {
  triggerRef: React.RefObject<HTMLElement>;
}

export function HeroCanvas({ triggerRef }: HeroCanvasProps) {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const tier = getDeviceTier();
    setQuality(tier);
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  const onPerformanceChange = useCallback(
    ({ fps }: { fps: number }) => {
      if (fps < 30 && quality !== 'low') {
        setQuality('low');
      } else if (fps < 45 && quality === 'high') {
        setQuality('medium');
      }
    },
    [quality]
  );

  // Full fallback for very low-end mobile
  if (quality === 'low' && isMobile) {
    return <MobileFallback />;
  }

  return (
    <>
      <PerformanceMonitor
        onChange={onPerformanceChange}
        flipflops={3}
        iterations={3}
        threshold={0}
      />
      <SceneCanvas dpr={isMobile ? [1, 1] : [1, 1.5]}>
        <HeroScene
          triggerRef={triggerRef}
          quality={quality}
        />
      </SceneCanvas>
    </>
  );
}
```

```typescript
// components/hero/HeroScene.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Environment,
  Float,
  ContactShadows,
  MeshDistortMaterial,
} from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleField } from './ParticleField';
import { PostProcessing } from './PostProcessing';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSceneProps {
  triggerRef: React.RefObject<HTMLElement>;
  quality: 'high' | 'medium' | 'low';
}

export function HeroScene({ triggerRef, quality }: HeroSceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  // GSAP ScrollTrigger setup
  useGSAP(
    () => {
      if (!triggerRef.current || !groupRef.current || reducedMotion) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: 'bottom+=1500 top',
            scrub: 1,
            pin: false,
          },
        });

        // Camera choreography
        tl.to(
          camera.position,
          {
            x: 0,
            y: 0.5,
            z: 4,
            duration: 1,
            ease: 'power2.inOut',
            onUpdate: () => camera.lookAt(0, 0, 0),
          },
          0
        );

        tl.to(
          camera.position,
          {
            x: 3,
            y: 1,
            z: 3,
            duration: 1,
            ease: 'none',
            onUpdate: () => camera.lookAt(0, 0, 0),
          },
          1
        );

        tl.to(
          camera.position,
          {
            x: 0,
            y: -0.5,
            z: 6,
            duration: 1,
            ease: 'power2.out',
            onUpdate: () => camera.lookAt(0, -0.3, 0),
          },
          2
        );

        // Object rotation
        tl.to(
          groupRef.current!.rotation,
          {
            y: Math.PI * 2,
            duration: 2,
            ease: 'none',
          },
          0
        );
      });

      return () => ctx.revert();
    },
    { scope: triggerRef, dependencies: [camera, triggerRef, reducedMotion] }
  );

  // Idle animation (only if not reduced motion)
  useFrame((state) => {
    if (groupRef.current && !reducedMotion) {
      // Slow continuous rotation + subtle sine wave
      groupRef.current.rotation.y += 0.001;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Quality-based particle count
  const particleCount = useMemo(() => {
    switch (quality) {
      case 'high':
        return 200;
      case 'medium':
        return 100;
      case 'low':
      default:
        return 0;
    }
  }, [quality]);

  return (
    <>
      <Environment preset="studio" background={false} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow={quality !== 'low'}
        shadow-mapSize={quality === 'high' ? 2048 : 1024}
      />
      <spotLight position={[-5, 5, -5]} intensity={0.8} angle={0.5} penumbra={1} />

      <group ref={groupRef}>
        <CrystallineShapes reducedMotion={reducedMotion} />
      </group>

      {particleCount > 0 && <ParticleField count={particleCount} />}

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2.5}
        far={4}
        resolution={quality === 'high' ? 512 : 256}
      />

      {quality === 'high' && <PostProcessing />}
    </>
  );
}

import { useFrame } from '@react-three/fiber';

function CrystallineShapes({ reducedMotion }: { reducedMotion: boolean }) {
  const materialProps = useMemo(
    () => ({
      color: '#4f46e5',
      roughness: 0.1,
      metalness: 0.8,
      distort: reducedMotion ? 0 : 0.4,
      speed: reducedMotion ? 0 : 2,
    }),
    [reducedMotion]
  );

  return (
    <>
      <Float
        speed={reducedMotion ? 0 : 1.5}
        rotationIntensity={reducedMotion ? 0 : 1.2}
        floatIntensity={reducedMotion ? 0 : 1.5}
        floatingRange={[-0.5, 0.5]}
      >
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial {...materialProps} />
        </mesh>
      </Float>

      <Float
        speed={reducedMotion ? 0 : 2}
        rotationIntensity={reducedMotion ? 0 : 0.8}
        floatIntensity={reducedMotion ? 0 : 1.2}
      >
        <mesh position={[-2.5, 0.5, -1]} castShadow>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial {...materialProps} color="#8b5cf6" />
        </mesh>
      </Float>

      <Float
        speed={reducedMotion ? 0 : 1.8}
        rotationIntensity={reducedMotion ? 0 : 1}
        floatIntensity={reducedMotion ? 0 : 1.3}
      >
        <mesh position={[2.2, -0.3, 0.5]} castShadow>
          <tetrahedronGeometry args={[0.9, 0]} />
          <MeshDistortMaterial {...materialProps} color="#06b6d4" />
        </mesh>
      </Float>
    </>
  );
}
```

```typescript
// components/hero/HeroContent.tsx
export function HeroContent() {
  return (
    <>
      {/* First viewport - hero message */}
      <div className="relative z-10 h-screen flex flex-col justify-center px-8 lg:px-16 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
          Building Digital
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Experiences
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
          Award-winning immersive web design that transforms brands and
          converts visitors into customers.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Second viewport - features reveal */}
      <div className="relative z-10 h-screen flex items-center px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Scroll-Driven Storytelling',
              description:
                'Narrative unfolds with user scroll, creating presence and engagement.',
            },
            {
              title: 'Performance First',
              description:
                '60fps on mid-tier devices with adaptive quality for all users.',
            },
            {
              title: 'Award-Winning Polish',
              description:
                'The same techniques powering Awwwards Site of the Day winners.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
```

This implementation demonstrates:

1. **Dynamic imports** for 3D code-splitting—3D bundle only loads on client
2. **PerformanceMonitor** for runtime quality adjustment
3. **GSAP ScrollTrigger** for camera choreography
4. **Accessibility** via `useReducedMotion` and semantic HTML
5. **Adaptive quality** with particle count, shadows, and post-processing scaling
6. **Proper cleanup** via `useGSAP` context and `ctx.revert()`
7. **TypeScript** throughout with proper Three.js types

## Deployment and Production Considerations

**Deploying R3F applications requires attention to bundle size, asset loading, and static export compatibility for hosts like Vercel and Netlify.** We'll cover the configuration for a production build.

### Bundle Optimization with Tree Shaking

Three.js is a large library; we'll ensure proper tree shaking by importing from specific module paths and using Next.js dynamic imports to code-split the 3D scene from initial page load.

**Three.js bundle sizes:**

| Import Pattern | Bundle Size | Tree Shakeable |
|--------------|-------------|----------------|
| `import * as THREE from 'three'` | ~600KB | Partial |
| `import { Vector3 } from 'three'` | ~600KB | No (whole module) |
| `import { Vector3 } from 'three/src/math/Vector3'` | ~2KB | Yes (manual) |
| Drei + R3F (optimized) | ~400KB | Yes |

Three.js doesn't fully tree-shake because of its architecture—internal dependencies create a dependency graph that pulls in most of the library. The practical optimization is **code splitting via dynamic imports** rather than trying to manually import specific files.

```typescript
// Optimal dynamic import pattern
const Hero3D = dynamic(
  () => import('./components/Hero3D'),
  {
    ssr: false,
    loading: () => <HeroSkeleton />,
  }
);
```

### Asset Loading and Preloading

3D models and environment maps must be preloaded to prevent pop-in. We'll use drei's Preload component and Next.js asset optimization for textures and HDR files.

```typescript
// Preloading strategy in Scene component
import { Preload, useProgress } from '@react-three/drei';

function Scene() {
  const { progress, loaded, total } = useProgress();

  return (
    <>
      {/* Your scene content */}
      <Model url="/models/hero.glb" />
      <Environment files="/hdr/studio.hdr" />

      {/* Preload triggers background loading of all assets */}
      <Preload all />
    </>
  );
}
```

**Asset optimization pipeline:**

1. **HDR Environment Maps**: Use 1K resolution (1024×512) for web. 4K HDR files are 64MB—unusable for web.
2. **GLB Models**: Run through [glTF-Transform](https://gltf-transform.dev/) to:
   - Draco compress geometry
   - KTX2 compress textures
   - Remove unused nodes and accessors
3. **Textures**: WebP format, maximum 2048×2048, power-of-two dimensions

```bash
# glTF-Transform CLI optimization
npm install -g @gltf-transform/cli

# Optimize a model
gltf-transform optimize input.glb output.glb \
  --compress draco \
  --texture-compress webp \
  --texture-size 2048
```

### Vercel Deployment Configuration

```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/hdr/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/models/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

HDR files and 3D models are immutable assets—version them in filenames and cache forever. This prevents re-download on every deploy.

**Build output configuration for static export:**

```javascript
// next.config.ts for static export
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    unoptimized: true, // Required for static export
  },
};
```

Note: Static export (`output: 'export'`) has limitations—API routes and server components don't work. For R3F apps, this is usually fine since the 3D scene is client-side only anyway.

**Production checklist:**

- [ ] Dynamic imports for 3D components (code splitting)
- [ ] Transpile packages configured for Three.js
- [ ] HDR/models in `/public` with long-term caching headers
- [ ] Environment files optimized (1K HDR, WebP textures)
- [ ] GLB models Draco compressed
- [ ] Canvas `dpr` capped at 1.5
- [ ] PerformanceMonitor for adaptive quality
- [ ] `prefers-reduced-motion` support implemented
- [ ] Semantic HTML for all content
- [ ] WebGL fallback for unsupported browsers

## FAQ: React Three Fiber and GSAP Integration

### What is React Three Fiber best used for?

**React Three Fiber excels at creating interactive 3D web experiences that run at 60fps in the browser, using React's declarative component model to build Three.js scenes.** It is the industry-standard React renderer for Three.js, maintained by the original Three.js team and used by brands like Nike, Apple, and luxury fashion houses for product configurators and immersive brand experiences. R3F version 9.5 pairs with React 19 and provides concurrent rendering support.

### How does GSAP ScrollTrigger work with React Three Fiber?

**GSAP ScrollTrigger creates scroll-coupled animations by mapping scroll progress to Three.js object properties—camera position, rotation, material uniforms—through useFrame updates or direct object mutation.** The pattern uses `@gsap/react` with `useGSAP` hook for React lifecycle management, creating timelines that scrub through 3D animations based on DOM scroll position. Register the plugin once at module scope, use `gsap.context()` for scoped cleanup, and animate object properties via refs to avoid React re-render overhead.

### What are the best @react-three/drei components for hero sections?

**Drei's Float, MeshDistortMaterial, Environment, and ContactShadows are the essential components for premium hero sections, providing ambient animation, organic material effects, realistic lighting, and grounded shadows without custom shader programming.** Float handles idle physics-inspired motion, MeshDistortMaterial creates liquid-like organic distortion via Perlin noise shaders, Environment provides image-based lighting and reflections from HDR presets or custom files, and ContactShadows grounds floating objects with realistic contact shadows. Version 10.6 is current as of May 2026.

### How do I optimize Three.js performance in React?

**Optimize Three.js in React by using InstancedMesh for repeated objects (reduces 100 draw calls to 1), memoizing geometries and materials with useMemo to prevent recreation every render, mutating object properties via refs in useFrame rather than React state updates, and capping device pixel ratio to 1.5 to prevent 4× render cost on Retina displays.** Additional critical optimizations include lazy-loading the Canvas component with Next.js dynamic imports, using Drei's PerformanceMonitor for adaptive quality reduction on low-end devices, and disabling post-processing effects when FPS drops below 30.

### Does React Three Fiber work with Next.js App Router?

**React Three Fiber works directly with Next.js App Router when Canvas and scene components are marked with the 'use client' directive, as WebGL requires browser APIs unavailable during server-side rendering.** Configure `transpilePackages: ['three']` in next.config.ts for module compatibility with Three.js's ES modules, use dynamic imports with `ssr: false` for code splitting, and place all R3F code in client components while keeping layouts, metadata, and non-3D content in server components. R3F 9.x requires React 19; use 8.x for React 18 projects.

### How do I handle mobile performance for 3D hero sections?

**Handle mobile 3D performance by implementing Drei's PerformanceMonitor to detect frame rate and automatically reduce quality from 'high' (200 particles, shadows, bloom) to 'medium' (100 particles, shadows, no bloom) to 'low' (CSS fallback), conditionally disabling post-processing and reducing particle counts on low-end devices, and providing CSS-based fallbacks for devices reporting less than 4GB memory or 30fps sustained.** Mobile GPUs have limited thermal budgets—adaptive quality ensures smooth experience across the device spectrum rather than targeting only flagship phones, with full CSS fallback for very low-end devices.

### What is the best way to structure R3F code for maintainability?

**Structure R3F projects by separating Canvas configuration (SceneCanvas.tsx), scene content (HeroScene.tsx), animation logic (useScrollAnimation.ts), and reusable 3D components into distinct files, using Zustand for scene-wide state rather than React Context which causes cascade re-renders.** This separation enables independent testing, prevents prop drilling, follows React best practices while accommodating Three.js's imperative API patterns, and allows dynamic imports to code-split the heavy Three.js bundle from initial page load.

### How do I make 3D hero sections accessible?

**Make 3D hero sections accessible by detecting `prefers-reduced-motion` via matchMedia and disabling auto-playing animations (Float components, useFrame rotation, GSAP timelines), ensuring all content is semantic HTML layered above or beside the Canvas via z-index stacking rather than inside the 3D scene, and providing static CSS fallbacks for screen readers and low-power devices.** Never put essential text content inside WebGL textures or make CTAs raycasted meshes—use real `<a>` and `<button>` elements with visible focus states. The 3D canvas should enhance, not replace, accessible content.

### Can I use award-winning 3D techniques on commercial client projects?

**The 3D techniques used in Awwwards Site of the Day winners—React Three Fiber, GSAP ScrollTrigger, volumetric lighting, and particle systems—are fully production-ready for commercial projects and increasingly expected for premium brand websites.** These patterns have matured beyond experimental status into reliable, maintainable architecture suitable for 5-figure client builds. The stack (R3F 9.5, drei 10.6, GSAP 3.14) is actively maintained with stable APIs, comprehensive TypeScript support, and extensive community resources.

## Building Award-Winning Digital Experiences

**This tutorial covered the complete stack for building 3D hero sections that compete with Awwwards Site of the Day winners: React Three Fiber 9.5 for React-native 3D, @react-three/drei 10.6 for production-ready helpers like Float and MeshDistortMaterial, GSAP 3.14 ScrollTrigger for scroll-driven camera animation, and performance optimization patterns including instancing, DPR capping, and adaptive quality for real-world deployment.** The techniques scale from single-page portfolios to enterprise brand experiences that justify five-figure budgets.

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **3D Engine** | Three.js | 0.176 | Core WebGL rendering |
| **React Renderer** | React Three Fiber | 9.5 | Declarative React integration |
| **Helpers** | @react-three/drei | 10.6 | Float, MeshDistortMaterial, Environment |
| **Animation** | GSAP + ScrollTrigger | 3.14 | Scroll-driven timeline orchestration |
| **React Integration** | @gsap/react | 2.1 | useGSAP hook for lifecycle management |
| **Framework** | Next.js | 14+ | App Router, dynamic imports, deployment |

For the complete immersive web design methodology—including GSAP ScrollTrigger architecture for scroll storytelling, Framer Motion patterns for component-level motion, and the decision framework for choosing the right animation library—see [The Immersive Web Design Manual](/blog/2026/05/immersive-web-design-manual). That pillar post provides the broader context this deep-dive fits into.

For scroll animation specifically, the [GSAP ScrollTrigger Architecture: Pixel-Perfect Scroll Storytelling](/blog/2026/05/gsap-scrolltrigger-architecture-scroll-storytelling) guide covers pinning, scrubbing, parallax, and timeline orchestration that pairs with the 3D techniques here.

Building premium web experiences requires both technical execution and design sensibility. The code in this tutorial provides the foundation; the award-winning distinction comes from restraint—using 3D to enhance narrative rather than distract from it, optimizing for the full device spectrum from flagship phones to budget Android, and respecting user accessibility preferences with `prefers-reduced-motion` support.

The crystalline hero we built demonstrates the intersection of craft: geometric precision with organic distortion, smooth idle animation with scroll-driven choreography, and visual richness with performance discipline. This is the standard for premium web work in 2026.

If you're planning a flagship website with immersive 3D elements, [start a custom website project](/contact) or [book a 15-min discovery call](https://cal.com/william-spurlock/15min) to discuss your build requirements.
