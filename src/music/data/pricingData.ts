// Website Build Plans (One-time)
export const websiteBuildPlans = [
  {
    name: "Essentials Website",
    price: "$1,000",
    subtitle: "For artists just launching",
    featured: false,
    description: "A focused 3-page website with core e-commerce and fan capture essentials.",
    features: [
      {
        category: "Site Structure",
        items: [
          "3-page website (Home, Merch/Store, Music/Discography)",
          "Mobile-first responsive layout (tested on 7 breakpoints)",
          "Core pages setup with SEO-ready structure"
        ]
      },
      {
        category: "E-Commerce Stack",
        items: [
          "1× Stripe account integration",
          "1× PayPal account integration",
          "1× Print-on-demand provider integration",
          "Up to 10 physical merch products configured",
          "Up to 5 digital products configured (music, bundles)",
          "Shipping zones: up to 3 regions (US, EU, Rest of World)"
        ]
      },
      {
        category: "Fan Capture",
        items: [
          "1× Beehiiv newsletter integration",
          "1× Email capture form (site-wide or Home page)",
          "1× Simple 'Thank you / confirmation' page"
        ]
      },
      {
        category: "Music Integration",
        items: [
          "1× Spotify artist profile embed on Music page",
          "Up to 5 release embeds (albums/EPs/singles)",
          "Lifetime discography updates (up to 4 per year)"
        ]
      },
      {
        category: "SEO",
        items: [
          "SEO titles + meta descriptions for all 3 pages",
          "Basic on-page SEO (H1/H2s, alt text for up to 10 images)"
        ]
      }
    ]
  },
  {
    name: "Fullstack Website",
    price: "$3,000",
    subtitle: "The complete artist system",
    featured: true,
    badge: "Most Popular",
    description: "Everything in Essentials, plus comprehensive pages, advanced automation, and an artist dashboard.",
    features: [
      {
        category: "Site Structure",
        items: [
          "5–8 total pages including: Home, Music/Discography, Merch/Store, About/Bio, EPK/Press",
          "Optional: Shows/Tour, Contact, Blog/News pages",
          "Mobile-first responsive layout (tested on 7 breakpoints)"
        ]
      },
      {
        category: "E-Commerce Stack",
        items: [
          "1× Stripe account integration",
          "1× PayPal account integration",
          "1× Print-on-demand provider integration",
          "Up to 10 merch SKUs configured",
          "Up to 3 bundles configured (merch + music combos)",
          "5 original merch designs (print-ready files)"
        ]
      },
      {
        category: "Fan Capture & Automation",
        items: [
          "1× Beehiiv newsletter integration",
          "1× Laylo integration (smart notifications / drops)",
          "Up to 3 fan capture forms (homepage, exit-intent, music page)",
          "1× Basic welcome email template (copy + structure)"
        ]
      },
      {
        category: "EPK / Press Page",
        items: [
          "Short bio (50–100 words) + Long bio (200–400 words)",
          "Up to 10 press-ready photos",
          "Up to 5 embedded media items (videos, music, quotes)",
          "1× Downloadable EPK PDF (layout & export)"
        ]
      },
      {
        category: "Shows & Booking",
        items: [
          "Shows/Tour page with up to 10 upcoming events",
          "1× 'Book Me' or 'Booking' contact form",
          "Optional: Ticketing links for each event (up to 10)"
        ]
      },
      {
        category: "Link-in-Bio / SmartLink",
        items: [
          "1× Mobile-optimized SmartLink page hosted on your domain",
          "Up to 10 outbound links (DSPs, socials, store, latest release)",
          "1× Unique URL path (e.g., /link or /go)"
        ]
      },
      {
        category: "Artist Dashboard",
        items: [
          "Monthly visitors chart",
          "Top 5 pages by traffic",
          "Email list growth (monthly)",
          "Top 3 revenue sources overview",
          "1× 30-minute walkthrough call after launch"
        ]
      },
      {
        category: "SEO",
        items: [
          "SEO titles + meta descriptions for all pages",
          "Advanced on-page SEO (H1/H2s, alt text, schema markup)",
          "AEO + AIO technical setup for AI discoverability"
        ]
      }
    ]
  }
];

// Monthly Management Plans
export const monthlyPlans = [
  {
    name: "Essentials",
    price: "$500",
    period: "/month",
    subtitle: "Solid foundation for growing artists",
    featured: false,
    description: "One-time foundation setup plus ongoing SEO management and essential support.",
    features: [
      {
        category: "Foundation Setup (Month 1)",
        items: [
          "1× AIO/AEO/SEO technical audit",
          "1× Keyword and entity research report (up to 20 core terms)",
          "On-page optimization for up to 5 pages",
          "Analytics stack setup (1× analytics tool + 1× search console)"
        ]
      },
      {
        category: "Ongoing SEO & AEO Management",
        items: [
          "1 new or updated SEO-optimized content piece per week (4/month)",
          "2–4 backlinks per month from relevant sites",
          "3–5 new social proof signals per month (quotes, testimonials, show recaps)"
        ]
      },
      {
        category: "Premium Hosting Support",
        items: [
          "Managed hosting (1 site)",
          "24/7 uptime monitoring",
          "Security monitoring with monthly checkups",
          "Core software updates at least 1× per month"
        ]
      },
      {
        category: "Weekly Content Updates",
        items: [
          "Up to 2 minor content edits per week (8/month)",
          "Adding shows, swapping tracks, updating links/text"
        ]
      },
      {
        category: "Monitoring & Protection",
        items: [
          "Uptime monitoring: checks every 5 minutes",
          "Monthly security scan + patching if required"
        ]
      },
      {
        category: "Artist Dashboard (Essentials)",
        items: [
          "1 dashboard login",
          "Metrics: traffic, top pages, top referrers, basic search terms",
          "AIO/AEO/advanced content modules locked"
        ]
      },
      {
        category: "Reporting & Support",
        items: [
          "1 monthly performance summary (written)",
          "1 email support channel with up to 3 support threads per week"
        ]
      }
    ]
  },
  {
    name: "Growth",
    price: "$2,000",
    period: "/month",
    subtitle: "Active growth and optimization",
    featured: true,
    badge: "Most Popular",
    description: "Everything in Essentials, plus expanded content operations, merch management, and strategy calls.",
    features: [
      {
        category: "Expanded AIO/AEO/SEO Management",
        items: [
          "2 new or updated SEO/AEO content pieces per week (8/month)",
          "6–10 backlinks per month from higher-quality sites",
          "5–10 social proof updates per month (press, playlists, testimonials)"
        ]
      },
      {
        category: "Merch Management & Drops",
        items: [
          "Up to 2 merch drops per month (3 items/variants each)",
          "Store optimization once per month",
          "Monthly stock/status review with recommended changes"
        ]
      },
      {
        category: "Weekly Sponsorship & Promo",
        items: [
          "1 playlist or blog pitch per week (4/month)",
          "1 social promo collaboration suggestion per week",
          "Simple tracking of accepted placements"
        ]
      },
      {
        category: "Ad Campaign Audits",
        items: [
          "2 ad campaign audits per month (bi-weekly)",
          "Targeting review, creative review, funnel suggestions",
          "Written summary of recommended changes"
        ]
      },
      {
        category: "Content & Conversion Optimization",
        items: [
          "A/B tests on 1 key page per month",
          "Monthly review of email capture and store conversion rates"
        ]
      },
      {
        category: "Artist Dashboard (Growth)",
        items: [
          "Everything from Essentials dashboard",
          "Additional modules: content performance, basic AIO/AEO insights",
          "Content editing inside dashboard locked (you implement)"
        ]
      },
      {
        category: "Reporting & Strategy",
        items: [
          "1× 45-minute strategy call per month",
          "1 monthly performance report with 3–5 clear action items"
        ]
      }
    ]
  },
  {
    name: "Insane",
    price: "$5,000",
    period: "/month",
    subtitle: "Don't Buy Me — Full partnership",
    featured: false,
    description: "Everything in Growth, plus full-funnel campaigns, audience segmentation, and white-glove support.",
    features: [
      {
        category: "Fan Management & Campaigns",
        items: [
          "1 full-funnel fan campaign per month (release, tour, merch drop)",
          "Includes landing page, email flow outline, and content plan",
          "Audience segmentation setup for up to 5 key segments"
        ]
      },
      {
        category: "Advanced AIO/AEO/SEO Operations",
        items: [
          "3 new or updated content pieces per week (12/month)",
          "10–20 backlinks per month (niche, press, partner placements)",
          "10–20 social proof updates per month"
        ]
      },
      {
        category: "Full Dashboard Access (Unlocked)",
        items: [
          "All modules unlocked: AIO, AEO, SEO metrics",
          "Content performance, merch, ticket, membership revenue overview",
          "Up to 3 custom dashboard widgets on request"
        ]
      },
      {
        category: "High-Touch Support & Strategy",
        items: [
          "1× 60-minute strategy call per month",
          "2× 30-minute implementation check-ins per month",
          "Priority support response within 24 business hours"
        ]
      },
      {
        category: "Done-With-You Content Guidance",
        items: [
          "Up to 10 suggested content ideas per month",
          "Review and feedback on up to 4 key content pieces per month"
        ]
      },
      {
        category: "Optional Launch Sprints",
        items: [
          "Up to 2 sprints per year for major releases/tours",
          "Each sprint: 2 weeks of focused planning and optimization"
        ]
      }
    ]
  }
];

// Flat feature list for comparison table
export const flatFeatureComparison = {
  websiteBuilds: [
    { name: "Price", essentials: "$1,000 (one-time)", fullstack: "$3,000 (one-time)" },
    { name: "Pages Included", essentials: "3 pages", fullstack: "5–8 pages" },
    { name: "Stripe Integration", essentials: "✓", fullstack: "✓" },
    { name: "PayPal Integration", essentials: "✓", fullstack: "✓" },
    { name: "Print-on-Demand Setup", essentials: "✓", fullstack: "✓" },
    { name: "Physical Merch Products", essentials: "Up to 10", fullstack: "Up to 10 SKUs" },
    { name: "Digital Products", essentials: "Up to 5", fullstack: "—" },
    { name: "Bundles Configured", essentials: "—", fullstack: "Up to 3" },
    { name: "Shipping Zones", essentials: "Up to 3 regions", fullstack: "Up to 3 regions" },
    { name: "Beehiiv Newsletter", essentials: "✓", fullstack: "✓" },
    { name: "Laylo Integration", essentials: "—", fullstack: "✓" },
    { name: "Fan Capture Forms", essentials: "1 form", fullstack: "Up to 3 forms" },
    { name: "Welcome Email Template", essentials: "—", fullstack: "✓" },
    { name: "Original Merch Designs", essentials: "—", fullstack: "5 designs" },
    { name: "EPK / Press Page", essentials: "—", fullstack: "Full EPK with PDF" },
    { name: "Shows/Tour Page", essentials: "—", fullstack: "✓ (10 events)" },
    { name: "Booking Contact Form", essentials: "—", fullstack: "✓" },
    { name: "SmartLink Page", essentials: "—", fullstack: "✓ (10 links)" },
    { name: "Artist Dashboard", essentials: "—", fullstack: "✓ (Lite)" },
    { name: "Post-Launch Walkthrough", essentials: "—", fullstack: "30-min call" },
    { name: "SEO Setup", essentials: "Basic", fullstack: "Advanced + AEO/AIO" },
    { name: "Mobile Responsiveness", essentials: "7 breakpoints", fullstack: "7 breakpoints" },
    { name: "Spotify Integration", essentials: "✓ (profile + 5 releases)", fullstack: "✓" },
    { name: "Lifetime Discography Updates", essentials: "4 per year", fullstack: "Included" }
  ],
  monthlyPlans: [
    { name: "Price", essentials: "$500/month", growth: "$2,000/month", insane: "$5,000/month" },
    { name: "AIO/AEO/SEO Audit", essentials: "✓ (Month 1)", growth: "✓", insane: "✓" },
    { name: "Keyword Research", essentials: "Up to 20 terms", growth: "Expanded", insane: "Full" },
    { name: "On-Page Optimization", essentials: "5 pages", growth: "10 pages", insane: "Unlimited" },
    { name: "SEO Content Pieces/Week", essentials: "1 (4/month)", growth: "2 (8/month)", insane: "3 (12/month)" },
    { name: "Backlinks/Month", essentials: "2–4", growth: "6–10", insane: "10–20" },
    { name: "Social Proof Updates/Month", essentials: "3–5", growth: "5–10", insane: "10–20" },
    { name: "Managed Hosting", essentials: "✓", growth: "✓", insane: "✓" },
    { name: "24/7 Uptime Monitoring", essentials: "✓ (5-min checks)", growth: "✓", insane: "✓" },
    { name: "Security Monitoring", essentials: "Monthly", growth: "Weekly", insane: "Daily" },
    { name: "Software Updates", essentials: "Monthly", growth: "Bi-weekly", insane: "Weekly" },
    { name: "Minor Content Edits/Week", essentials: "2 (8/month)", growth: "Unlimited", insane: "Unlimited" },
    { name: "Merch Drops/Month", essentials: "—", growth: "Up to 2", insane: "Up to 4" },
    { name: "Store Optimization", essentials: "—", growth: "Monthly", insane: "Bi-weekly" },
    { name: "Playlist/Blog Pitches/Week", essentials: "—", growth: "1 (4/month)", insane: "3 (12/month)" },
    { name: "Ad Campaign Audits/Month", essentials: "—", growth: "2", insane: "4" },
    { name: "A/B Testing", essentials: "—", growth: "1 page/month", insane: "3 pages/month" },
    { name: "Full-Funnel Campaigns/Month", essentials: "—", growth: "—", insane: "1" },
    { name: "Audience Segments", essentials: "—", growth: "—", insane: "Up to 5" },
    { name: "Artist Dashboard", essentials: "Essentials", growth: "Growth (unlocked)", insane: "Full (all modules)" },
    { name: "Custom Dashboard Widgets", essentials: "—", growth: "—", insane: "Up to 3" },
    { name: "Strategy Call", essentials: "—", growth: "45 min/month", insane: "60 min + 2× 30 min" },
    { name: "Support Response Time", essentials: "48 hours", growth: "24 hours", insane: "24 hours (priority)" },
    { name: "Support Threads/Week", essentials: "3", growth: "Unlimited", insane: "Unlimited" },
    { name: "Monthly Performance Report", essentials: "Written summary", growth: "With action items", insane: "Comprehensive" },
    { name: "Content Ideas/Month", essentials: "—", growth: "—", insane: "Up to 10" },
    { name: "Content Review/Month", essentials: "—", growth: "—", insane: "Up to 4 pieces" },
    { name: "Launch Sprints/Year", essentials: "—", growth: "—", insane: "Up to 2" }
  ]
};
