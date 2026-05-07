---
title: "Adobe Firefly Video Enters Public Beta: Commercial-Safe AI Video Generation Arrives"
slug: "adobe-firefly-video-beta-launch"
date: "2024-09-17"
lastModified: "2024-09-17"
author: "William Spurlock"
readingTime: 12
categories:
  - "AI Models and News"
tags:
  - "Adobe Firefly Video"
  - "AI video generation"
  - "commercial safe AI"
  - "Adobe MAX 2024"
  - "generative video"
  - "Firefly Video Model"
  - "Adobe Creative Cloud"
  - "text to video AI"
featured: false
draft: false
excerpt: "Adobe just opened the Firefly Video Model public beta — the first commercially-safe generative video AI trained exclusively on licensed content. Here's what it generates, how the pricing works, and why the training data matters."
coverImage: "/images/blog/adobe-firefly-video-beta-sep-2024.png"
seoTitle: "Adobe Firefly Video Public Beta Launch | William Spurlock"
seoDescription: "Adobe Firefly Video enters public beta with commercial-safe training, 1080p text-to-video generation, and Premiere Pro integration. The first enterprise-ready AI video model."
seoKeywords:
  - "Adobe Firefly Video"
  - "AI video generation commercial safe"
  - "Firefly Video Model beta"
  - "Adobe generative video"
  - "text to video 2024"
  - "Adobe MAX Firefly"

# AIO/AEO Fields
aioTargetQueries:
  - "Adobe Firefly Video beta features"
  - "commercial safe AI video generation"
  - "Adobe Firefly Video vs Runway"
  - "Firefly Video pricing and credits"
  - "Adobe AI video training data"
contentCluster: "foundation-models"
pillarPost: false
parentPillar: "ai-video-generation-landscape-2024"
entityMentions:
  - "William Spurlock"
  - "Adobe Firefly Video"
  - "Adobe"
  - "Premiere Pro"
  - "After Effects"
  - "Firefly Image Model"

# Service Track Routing
serviceTrack: "both"
---

# Adobe Firefly Video Enters Public Beta: Commercial-Safe AI Video Generation Arrives

**Adobe just opened the Firefly Video Model public beta, extending their generative AI suite into video generation with a strict commitment to commercial-safe training data.** This marks a significant moment for creative professionals who need AI-generated video content without the legal uncertainty that plagues models trained on scraped web data. Unlike Runway, Pika, or Stability AI's video offerings, Firefly Video is trained exclusively on content Adobe has explicit rights to use — licensed Adobe Stock media, public domain works, and Creative Commons Zero content.

I'm watching this development closely because it represents a fundamentally different approach to generative AI video: **safety-first, enterprise-ready, and legally defensible.** For agencies, brands, and production houses that can't risk copyright claims on AI-generated assets, this changes the risk calculus entirely.

---

## Table of Contents

1. [What Adobe Just Announced: Firefly Video Beta](#what-announced)
2. [Firefly Video Features: Text-to-Video, Image-to-Video, and Generative Extend](#features-overview)
3. [Commercial Safety: Why Firefly's Training Data Matters](#commercial-safety)
4. [How Firefly Video Compares to Runway Gen-3 and Luma Dream Machine](#competitive-comparison)
5. [Firefly Video in Premiere Pro: The Generative Extend Workflow](#premiere-integration)
6. [Pricing, Credits, and Creative Cloud Integration](#pricing-credits)
7. [Limitations and Technical Specifications](#limitations-specs)
8. [What This Means for Creative Professionals](#creative-impact)
9. [Frequently Asked Questions](#faq)
10. [Building the Future of Creative AI](#building-cta)

---

## What Adobe Just Announced: Firefly Video Beta {#what-announced}

**Adobe officially opened the Firefly Video Model public beta on September 11, 2024, giving creative professionals their first access to generative video capabilities built on the same commercial-safe principles as the rest of the Firefly family.** This isn't a quiet soft launch — it's a major expansion of Adobe's generative AI platform that now covers image, vector, design, and video generation under one unified system with consistent licensing guarantees.

### The Firefly Family Expansion

Firefly Video joins three existing Firefly models already in production:

| Model | Launch Date | Capabilities | Current Status |
|-------|-------------|--------------|----------------|
| **Firefly Image** | March 2023 | Text-to-image, generative fill, style transfer | Production GA |
| **Firefly Vector** | October 2023 | Generative vector graphics, SVG output | Production GA |
| **Firefly Design** | April 2024 | Template-aware layout generation | Production GA |
| **Firefly Video** | September 2024 | Text-to-video, image-to-video, clip extension | **Public Beta** |

**Why this matters:** Adobe is the first major creative software vendor to offer a complete generative AI suite spanning all major content types — raster, vector, layout, and now motion — with guaranteed commercial safety. Competitors like Runway (video-only), Midjourney (image-only), and Stability AI (fragmented tools) can't match this integration depth or the legal certainty Adobe provides.

### Beta Access and Availability

**The public beta is available immediately at firefly.adobe.com** for users with Adobe IDs. Access requires either:

- An active Creative Cloud subscription (All Apps or single-app plans)
- A free Adobe account with Firefly credit allocation
- Enterprise agreements with Firefly provisions

Unlike the limited alpha Adobe ran internally through summer 2024, this public beta opens access to the full creative community. Adobe has not announced an end date for the beta period, but the company typically runs 3–6 month public betas before declaring general availability.

---

## Firefly Video Features: Text-to-Video, Image-to-Video, and Generative Extend {#features-overview}

**Firefly Video ships with three core generation modes: text-to-video for creating clips from descriptions, image-to-video for animating stills, and Generative Extend for lengthening existing footage.** All three generate 1080p video at up to 5 seconds per clip during the beta, with Adobe promising 4K support and longer durations as the model matures.

### Text-to-Video Generation

The text-to-video interface accepts natural language prompts and produces 1080p video clips with extensive camera control options:

| Control | Options | Description |
|---------|---------|-------------|
| **Camera Angle** | Low angle, eye level, high angle, bird's eye | Establishes viewer perspective relative to subject |
| **Motion Type** | Static, push in, pull out, dolly left/right, crane up/down | Defines camera movement during the clip |
| **Zoom Level** | 0.5x to 2x | Simulates lens focal length changes |
| **Shot Size** | Extreme close-up, close-up, medium, long shot, extreme long shot | Controls subject framing |
| **Aspect Ratio** | 16:9 (landscape), 9:16 (vertical) | Matches delivery platform requirements |

**Prompt example:** *"A cinematic aerial shot slowly pushing in over a misty mountain lake at dawn, golden hour lighting, 16:9"* generates a 5-second establishing shot suitable for documentary B-roll.

### Image-to-Video Animation

The image-to-video mode accepts uploaded still images or illustrations and animates them into live-action clips. This is particularly valuable for:

- **Bringing static brand photography to life** for social campaigns
- **Animating concept art** for pre-visualization
- **Creating motion versions** of AI-generated still images from Firefly Image
- **Converting illustrations** into animated assets for motion graphics

Adobe specifically highlights that image-to-video preserves the photorealistic qualities and text rendering capabilities that Firefly Image 3 introduced earlier this year. Text in source images remains readable and properly formed in the generated video output — a persistent weakness in competing video models.

### Generative Extend in Premiere Pro

**Generative Extend — the most production-ready feature shipping today — integrates directly into Adobe Premiere Pro (beta) and allows editors to lengthen clips by up to 2 seconds with perfect timing for cuts.** This solves a constant editorial problem: footage that's almost long enough but cuts off a beat too early.

The workflow functions as a seamless extension of existing clips:

1. Select the clip end point in the Premiere timeline
2. Choose "Generative Extend" from the context menu
3. Specify the extension duration (up to 2 seconds)
4. Firefly Video generates matching motion and lighting
5. The extended clip drops back into the timeline, ready for playback

**Critical for editors:** The generated extension matches the original clip's camera movement, lighting conditions, and subject motion. Adobe trained the model specifically on continuity requirements, making the extensions surprisingly seamless in early testing.

---

## Commercial Safety: Why Firefly's Training Data Matters {#commercial-safety}

**Firefly Video is explicitly designed as the first commercially safe generative video model, trained exclusively on content Adobe has legal rights to use — licensed Adobe Stock media, public domain works, and CC0 content.** This training philosophy eliminates the copyright ambiguity that surrounds models trained on scraped web data, making Firefly Video suitable for enterprise advertising, broadcast, and commercial distribution without legal risk.

### The Training Data Composition

Adobe publishes clear documentation on Firefly Video's training corpus:

| Source Category | Content Type | Licensing Status |
|-----------------|--------------|------------------|
| **Adobe Stock** | Professional photography, video clips, illustrations | Fully licensed from contributors |
| **Public Domain** | Historical footage, government media, expired copyright works | Legally unrestricted |
| **CC0 Content** | Creative Commons Zero media explicitly donated | Rights-free by author declaration |
| **Adobe-Created** | Synthetic training data generated by Adobe internally | Full ownership |

**What is explicitly excluded:** User-generated content from Adobe Creative Cloud, third-party artist portfolios scraped from the web, and any media where rights status is unclear. This is the critical differentiator from competitors like Runway and Stability AI, whose training data compositions remain opaque and potentially litigious.

### Content Credentials and Provenance

Every video generated by Firefly Video includes embedded **Content Credentials** metadata — a C2PA (Coalition for Content Provenance and Authenticity) compliant manifest that records:

- The AI model used (Firefly Video)
- Generation timestamp
- Prompt and settings used
- A cryptographic signature verifying Adobe as the source

This provenance tracking matters for transparency requirements emerging in advertising standards and platform content policies. When clients or platforms ask "was this AI-generated?" Firefly Video outputs carry tamper-evident proof of their origin.

### Legal Certainty for Enterprise Use

**Adobe backs Firefly Video with their standard enterprise indemnification for Creative Cloud customers.** Organizations with qualifying subscriptions receive legal protection when using Firefly-generated content commercially — protection that does not extend to assets created with competing AI tools.

For agencies working with Fortune 500 brands, this indemnification is often the deciding factor. Legal review processes that would flag Runway or Midjourney outputs as "use at your own risk" pass Firefly content as "cleared for commercial distribution."

---

## How Firefly Video Compares to Runway Gen-3 and Luma Dream Machine {#competitive-comparison}

**Firefly Video enters a video generation market dominated by Runway Gen-3 Alpha, Luma Dream Machine, and Pika Labs — but Adobe's commercial safety focus creates a distinct positioning that competitors can't easily replicate.** In pure generation quality, Firefly Video is competitive but not class-leading. In legal safety and enterprise suitability, it's in a category of one.

### Feature and Capability Comparison

| Factor | Adobe Firefly Video | Runway Gen-3 Alpha | Luma Dream Machine |
|--------|---------------------|-------------------|-------------------|
| **Max Resolution** | 1080p (beta), 4K planned | 720p (Gen-3 Turbo), 1080p (standard) | 1080p |
| **Max Duration** | 5 seconds | 10 seconds | 5 seconds |
| **Text Rendering** | Strong (Firefly Image heritage) | Moderate | Weak |
| **Commercial Safety** | Guaranteed (licensed training) | Unclear (scraped data) | Unclear (scraped data) |
| **Enterprise Indemnification** | Yes (Creative Cloud) | No | No |
| **Professional Integration** | Premiere Pro, After Effects | Web interface, limited API | Web interface |
| **Pricing Model** | Creative Cloud credits | Subscription + credits | Free tier + subscription |

**Quality assessment:** Early beta outputs show Firefly Video matches Runway Gen-3 on photorealism and motion coherence but currently lags on maximum clip duration. The 5-second limit feels restrictive compared to Runway's 10-second generations, though Adobe has signaled 10+ second support is coming.

### Where Firefly Video Wins

**Professional workflow integration:** No competitor matches Adobe's native integration with professional editing tools. Runway outputs require download, import, and format conversion. Firefly Video clips generate directly into Premiere Pro timelines with matched project settings.

**Brand safety:** For advertising agencies and corporate video teams, the risk of copyright claims outweighs minor quality differences. Firefly Video's licensed training data means legal review teams sign off instead of flagging for risk assessment.

**Content Credentials:** C2PA provenance tracking is becoming table stakes for advertising content. Firefly Video includes this by default; competitors require third-party solutions or manual disclosure.

### Where Competitors Still Lead

**Clip duration:** Runway Gen-3's 10-second maximum produces more usable editorial content per generation. Firefly Video's 5-second cap requires more generations and stitching for longer sequences.

**Creative community:** Runway has built a substantial creator ecosystem with sharing, templates, and community prompts. Firefly Video is currently a standalone tool without the social layer that drives Runway's viral adoption.

**API access:** Runway offers production APIs for application builders. Firefly Video is currently Adobe-application-only, limiting third-party integration opportunities.

---

## Firefly Video in Premiere Pro: The Generative Extend Workflow {#premiere-integration}

**Generative Extend represents the most immediately useful Firefly Video capability — it solves a daily editorial problem without requiring editors to leave their NLE or manage external generation workflows.** This integration demonstrates Adobe's core advantage: they own the tools creatives already use.

### The Editorial Problem Generative Extend Solves

Video editors constantly face clips that are almost long enough:

- Interview footage that cuts off mid-sentence
- B-roll that ends a half-beat before the music cue
- Stock footage purchased at minimum duration that needs extension
- Social cuts where platform requirements exceed available content

Traditionally, editors solved this with freeze frames, speed ramps, or duplicate-and-reverse tricks that look artificial. Generative Extend generates genuinely new footage that matches the original clip's motion, lighting, and camera work.

### How Generative Extend Works in Practice

The workflow integrates directly into the standard Premiere Pro editing interface:

1. **Identify the gap:** Editor marks a clip that needs extension to cover a transition or hit a timing cue
2. **Select and extend:** Right-click the clip end, choose "Generative Extend," specify the needed duration (up to 2 seconds)
3. **Background generation:** Firefly Video analyzes the clip's motion patterns, lighting conditions, and subject matter
4. **Seamless integration:** The generated extension attaches to the original clip with automatic motion matching
5. **Review and refine:** Editor plays the extended clip; if unsatisfied, regenerates with adjusted parameters

**Early user reports suggest the extensions work best on:**
- Static or slow-moving shots with consistent lighting
- Aerial footage and establishing shots
- Abstract backgrounds and texture plates
- Clips with minimal human subjects in motion

**Results are less reliable on:**
- Fast action with rapid subject movement
- Complex human motion (walking, talking, gesturing)
- Scenes with dramatic lighting changes
- Clips with prominent text or logos

### After Effects and Frame.io Integration Coming

Adobe has announced Firefly Video integration is coming to **After Effects** for generative background plates and **Frame.io** for cloud-based collaborative review of AI-generated content. These integrations are not yet available in beta but are expected before general availability.

---

## Pricing, Credits, and Creative Cloud Integration {#pricing-credits}

**Firefly Video operates on Adobe's existing Firefly credit system, with generation costs varying by output type and user subscription tier.** The pricing model favors existing Creative Cloud subscribers while offering credit packs for occasional users.

### Credit Costs by Generation Type

| Generation Type | Credits per Output | Typical Use Case |
|-----------------|-------------------|------------------|
| **Text-to-Video (1080p)** | 20–25 credits | B-roll generation, concept development |
| **Image-to-Video** | 20–25 credits | Animating still assets, social content |
| **Generative Extend (per second)** | 5–8 credits | Timeline gap filling, clip extension |

Credit consumption varies based on generation complexity and duration. A 5-second text-to-video clip at maximum quality consumes approximately 25 credits.

### Subscription Tier Allocations

| Plan Type | Monthly Firefly Credits | Annual Cost | Firefly Video Access |
|-----------|------------------------|-------------|---------------------|
| **Free Adobe Account** | 25 credits | Free | Limited (watermarked, low priority) |
| **Photography Plan** | 250 credits | $119.88/year | Full access |
| **Single App** | 500 credits | $263.88/year | Full access |
| **All Apps** | 1,000 credits | $599.88/year | Full access |
| **Firefly Pro (Standalone)** | 2,000 credits | ~$9.99/mo | Full access, no Creative Cloud |

**Enterprise customers:** Organizations with Adobe Enterprise agreements receive customized credit allocations and can negotiate unlimited generation pools for specific use cases.

### Credit Purchase Options

Users who exhaust their monthly allocation can purchase additional credits:

- **Credit packs:** Starting at $4.99 for 100 credits (roughly 4–5 additional video generations)
- **Firefly Standard subscription:** $9.99/month for 2,000 credits (targeted at heavy generative users)
- **Firefly Pro subscription:** Pricing varies by volume (targeted at agencies and production houses)

**Cost comparison to alternatives:** Runway's standard plan runs $15/month for 625 credits (approximately 60 seconds of video). Firefly Video at comparable quality settings costs roughly $20–25 for the same output volume — a modest premium for the commercial safety guarantee.

---

## Limitations and Technical Specifications {#limitations-specs}

**Firefly Video's public beta carries meaningful limitations that affect production suitability: 5-second maximum duration, 1080p resolution ceiling, English-only prompts, and no API access.** These constraints are standard for early generative video releases but may limit immediate deployment for professional workflows.

### Current Beta Limitations

| Limitation | Current State | Planned Update |
|------------|---------------|----------------|
| **Maximum duration** | 5 seconds per clip | 10+ seconds (GA timeline unclear) |
| **Maximum resolution** | 1080p (1920×1080) | 4K support announced |
| **Frame rate** | 24fps (cinema standard) | 30fps, 60fps planned |
| **Prompt language** | English only | Multilingual support planned |
| **API availability** | None (Adobe apps only) | Enterprise API under evaluation |
| **Maximum generations** | Limited by credit balance | Unlimited pools for Enterprise |
| **Clip format** | MP4 (H.264) | ProRes, DNxHD planned for broadcast |

### Technical Specifications

| Specification | Value | Notes |
|---------------|-------|-------|
| **Output codec** | H.264 (MP4 container) | Web and social optimized |
| **Color space** | Rec. 709 | Standard dynamic range |
| **Bit depth** | 8-bit | No 10-bit/HDR in beta |
| **Audio** | Silent (video only) | No audio generation capability |
| **File size** | ~5–15MB per 5-second clip | Varies by scene complexity |

### Known Quality Constraints

Early beta testing reveals consistent quality patterns:

**Strong performance:**
- Landscapes, nature footage, abstract motion
- Product shots with controlled lighting
- Architectural visualization
- Atmospheric and mood-driven content

**Weak performance:**
- Human faces in motion (uncanny valley effects)
- Complex multi-subject scenes
- Text-heavy content (despite Firefly Image strengths)
- Rapid camera movements or cuts
- Scenes requiring physical simulation accuracy

Adobe explicitly positions Firefly Video beta as suitable for B-roll, social content, and concept development — not yet for final delivery of premium advertising or broadcast content featuring human subjects.

---

## What This Means for Creative Professionals {#creative-impact}

**Firefly Video's commercial-safe positioning creates a two-tier video generation market: Adobe's legally certain option for professional work, and competitors' higher-quality but riskier outputs for experimental or personal projects.** This bifurcation will likely persist until legal clarity emerges around training data fair use — a resolution that could take years.

### For Advertising Agencies and Brand Teams

The indemnification and provenance tracking make Firefly Video immediately deployable for client work. Legal teams that would reject Runway outputs as "training data unclear" can approve Firefly Video with standard Creative Cloud terms.

**Practical impact:** Campaigns with AI-generated elements can move through legal review faster. Content Credentials satisfy emerging platform transparency requirements. Client contracts requiring "commercially cleared assets" finally have a generative video option that qualifies.

### For Video Editors and Post-Production

Generative Extend is the standout feature — it solves genuine editorial problems within the tool editors already use. The 2-second extension limit feels restrictive but covers the majority of real-world "almost long enough" scenarios.

**Workflow consideration:** Editors can now treat AI generation as a native editing tool rather than a separate pre-production process. This integration matters more than raw generation quality for working professionals under deadline pressure.

### For Independent Creators

The credit pricing is competitive but not disruptive. Free tier users get limited generations monthly — enough for experimentation but not sustained production. Serious independent creators will need at minimum a Photography Plan subscription for practical usage.

**Comparison to alternatives:** Runway's community features and longer clips may still appeal to creators prioritizing creative exploration over commercial safety. Firefly Video's strength is professional work, not hobbyist experimentation.

### Strategic Implications

Adobe is executing a clear strategy: **own the enterprise-safe segment of generative AI while competitors fight for the consumer and experimental markets.** This mirrors their successful approach with Creative Cloud — premium pricing for professional certainty.

If legal challenges against generative AI training data succeed, Firefly Video becomes the last standing option for commercial video generation. If fair use prevails, Adobe still owns the risk-averse professional market while competitors serve everyone else.

---

## Frequently Asked Questions {#faq}

### Q: What is Adobe Firefly Video and when did the beta launch?
**Adobe Firefly Video is a generative AI video model that entered public beta on September 11, 2024.** It extends Adobe's Firefly generative AI family into video generation, offering text-to-video, image-to-video, and Generative Extend capabilities with guaranteed commercial safety for professional use.

### Q: Is Adobe Firefly Video free to use?
**Adobe Firefly Video offers limited free access with 25 monthly credits for Adobe account holders, but practical use requires a paid subscription.** Creative Cloud Photography plans include 250 monthly credits, Single App plans include 500 credits, and All Apps plans include 1,000 credits. Heavy users can purchase additional credits starting at $4.99 per 100 credits.

### Q: What makes Firefly Video commercially safe?
**Firefly Video is trained exclusively on content Adobe has legal rights to use — licensed Adobe Stock media, public domain works, and CC0 content.** Unlike competitors trained on scraped web data of uncertain provenance, Firefly Video's training corpus excludes user-generated content and third-party artist portfolios. Adobe provides enterprise indemnification for qualifying Creative Cloud customers using Firefly-generated video commercially.

### Q: What resolution and duration does Firefly Video support?
**During the public beta, Firefly Video generates 1080p video clips up to 5 seconds in duration.** Adobe has announced 4K support and longer durations are planned for general availability, but specific timelines have not been released. Output is 24fps MP4 (H.264) optimized for web and social distribution.

### Q: How does Generative Extend work in Premiere Pro?
**Generative Extend allows Premiere Pro editors to lengthen video clips by up to 2 seconds with AI-generated footage that matches the original's motion and lighting.** The feature integrates directly into the timeline — editors right-click a clip end, select "Generative Extend," specify duration, and Firefly Video generates matching footage for seamless editorial use.

### Q: How does Firefly Video compare to Runway Gen-3?
**Firefly Video matches Runway Gen-3 on photorealism but currently generates shorter clips (5 seconds vs. 10 seconds) with stronger commercial safety guarantees.** Runway offers longer generations, a larger creative community, and API access, but lacks Adobe's enterprise indemnification and C2PA provenance tracking. Firefly Video's Premiere Pro integration is unmatched by any competitor.

### Q: Can I use Firefly Video content in commercial projects?
**Yes — Firefly Video is explicitly designed for commercial use with legal protections for qualifying Creative Cloud subscribers.** Adobe's enterprise indemnification covers commercial deployment, and embedded Content Credentials provide transparency for platform requirements. This distinguishes Firefly Video from competitors where commercial use carries legal uncertainty.

### Q: Does Firefly Video support 4K or professional codecs?
**Not in the current beta — Firefly Video generates 1080p H.264 MP4 files during the public beta period.** Adobe has announced 4K resolution support and professional codecs (ProRes, DNxHD) are planned for general availability, but release timelines have not been specified.

### Q: What are the main limitations of Firefly Video in beta?
**Key beta limitations include: 5-second maximum clip duration, 1080p resolution ceiling, English-only prompts, no audio generation, and no API access for third-party integration.** Generated video quality is strongest for landscapes, products, and atmospheric content; human subjects in motion show inconsistent results typical of early generative video models.

### Q: How much do Firefly Video generations cost in credits?
**A 5-second text-to-video or image-to-video generation consumes approximately 20–25 Firefly credits.** Generative Extend costs 5–8 credits per second of extension. Creative Cloud subscribers receive 250–1,000 monthly credits depending on plan tier; additional credits can be purchased starting at $4.99 per 100 credits.

---

## Building the Future of Creative AI {#building-cta}

Adobe Firefly Video represents a pivotal moment for generative AI in professional creative workflows — the point where commercial safety and legal certainty become primary product features rather than afterthoughts. For agencies, brands, and production teams who can't afford copyright risk, this is the first video generation tool that passes legal review.

**If you're building AI-powered creative workflows** — whether that's automating video content pipelines, integrating generative assets into production systems, or deploying AI tools across creative teams — the choice of platform matters as much as the choice of model. I build custom AI automation systems that connect tools like Firefly, n8n, and Claude into reliable production pipelines. [Book an AI automation strategy call](/contact) to discuss your specific workflow needs.

**If you're a creative professional or brand looking for custom digital experiences** — the integration of generative AI into immersive web design, interactive campaigns, and premium content delivery is reshaping what's possible. I design and build 5-figure full-stack digital experiences that leverage these emerging capabilities. [Start a custom website project](/contact) to explore what's possible for your brand.

---

*Related reading:*
- *[Runway Gen-3 Alpha: Text-to-Video Crosses the Uncanny Threshold](/blog/2024/06/runway-gen-3-alpha-text-to-video-launch)*
- *[Luma Dream Machine Free Launch: The Text-to-Video Accessibility Inflection Point](/blog/2024/06/luma-labs-dream-machine-free-launch)*
- *[Stable Diffusion 3 Medium Open Weights: License Backlash and Community Fork Energy](/blog/2024/06/stable-diffusion-3-medium-license-backlash)*
