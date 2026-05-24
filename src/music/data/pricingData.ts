export const websiteBuildPlans = [
  {
    name: "Basic Build",
    price: "$1,000",
    tag: "one-time",
    subtitle: "Launch-ready in days",
    brief: "A clean 3-page site with e-commerce, fan capture, and foundational SEO — everything you need to start selling and collecting fans online.",
    highlights: [
      "3 pages — Home, Store, Music",
      "Stripe + PayPal + print-on-demand",
      "Beehiiv email capture",
      "Spotify embeds + discography",
      "On-page SEO foundations",
      "Copyright registration (5 tracks)",
      "Lite royalty dashboard"
    ],
    featured: false
  },
  {
    name: "Baller Build",
    price: "$3,000",
    tag: "one-time",
    subtitle: "The full artist system",
    badge: "Most Popular",
    brief: "A comprehensive 5–8 page website with advanced fan automation, original merch designs, EPK, SmartLinks, and a custom artist dashboard — built to scale with your career.",
    highlights: [
      "5–8 pages with EPK, Shows & SmartLink",
      "Laylo drops + multi-form fan capture",
      "5 original merch designs included",
      "Custom artist reporting dashboard",
      "Full AEO + AIO + SEO setup",
      "Unlimited copyright + royalty console",
      "AI composition tool + discovery campaign"
    ],
    featured: true
  }
];

export const monthlyPlans = [
  {
    name: "Foundation",
    price: "$500",
    period: "/mo",
    subtitle: "Stay visible, stay secure",
    brief: "Managed hosting, weekly content updates, ongoing SEO, and uptime monitoring — your site stays fast, safe, and climbing search rankings.",
    highlights: [
      "4 SEO content pieces per month",
      "Managed hosting + 24/7 monitoring",
      "Weekly content edits (up to 8/mo)",
      "Monthly performance reports",
      "Essentials dashboard access",
      "Copyright monitoring + royalty maintenance"
    ],
    featured: false
  },
  {
    name: "Growth",
    price: "$2,000",
    period: "/mo",
    subtitle: "Active scaling & strategy",
    badge: "Most Popular",
    brief: "Expanded content, merch drop management, playlist pitching, ad audits, and A/B testing — paired with a monthly strategy call to keep momentum.",
    highlights: [
      "8 SEO/AEO content pieces per month",
      "Merch drops + store optimization",
      "Weekly promo & playlist pitches",
      "Bi-weekly ad campaign audits",
      "45-min monthly strategy call",
      "Active copyright scanning + composition tool"
    ],
    featured: true
  },
  {
    name: "Insane",
    price: "$5,000",
    period: "/mo",
    subtitle: "Full partnership — don't buy me",
    brief: "Full-funnel campaigns, audience segmentation, 12+ content pieces monthly, unlocked dashboard, priority support, and dedicated launch sprints for major releases.",
    highlights: [
      "12 content pieces + 20 backlinks/mo",
      "Full-funnel fan campaigns",
      "Audience segmentation (5 segments)",
      "60-min strategy + 2 check-ins/mo",
      "Launch sprints for releases & tours",
      "Blockchain distribution + on-demand IP enforcement"
    ],
    featured: false
  }
];

export const flatFeatureComparison = {
  websiteBuilds: [
    { name: "Price", essentials: "$1,000", fullstack: "$3,000" },
    { name: "Pages", essentials: "3", fullstack: "5–8" },
    { name: "Stripe + PayPal", essentials: "✓", fullstack: "✓" },
    { name: "Print-on-Demand", essentials: "✓", fullstack: "✓" },
    { name: "Merch Products", essentials: "Up to 10", fullstack: "10 SKUs + 3 bundles" },
    { name: "Digital Products", essentials: "Up to 5", fullstack: "Included" },
    { name: "Beehiiv Newsletter", essentials: "✓", fullstack: "✓" },
    { name: "Laylo Integration", essentials: "—", fullstack: "✓" },
    { name: "Fan Capture Forms", essentials: "1", fullstack: "3" },
    { name: "Original Merch Designs", essentials: "—", fullstack: "5 designs" },
    { name: "EPK / Press Page", essentials: "—", fullstack: "Full EPK + PDF" },
    { name: "Shows/Tour Page", essentials: "—", fullstack: "✓" },
    { name: "SmartLink Page", essentials: "—", fullstack: "✓" },
    { name: "Artist Dashboard", essentials: "—", fullstack: "✓" },
    { name: "SEO Level", essentials: "Basic on-page", fullstack: "Advanced AEO/AIO/SEO" },
    { name: "Spotify Integration", essentials: "✓", fullstack: "✓" },
    { name: "Post-Launch Support", essentials: "—", fullstack: "30-min walkthrough" },
    { name: "Copyright Registration", essentials: "5 tracks", fullstack: "Unlimited" },
    { name: "Royalty Console (Cadence)", essentials: "Lite", fullstack: "Full" },
    { name: "AI Composition Assistant", essentials: "—", fullstack: "Lite (PWA)" },
    { name: "Discovery Campaign", essentials: "—", fullstack: "Lookalike audience targeting" }
  ],
  monthlyPlans: [
    { name: "Price", essentials: "$500/mo", growth: "$2,000/mo", insane: "$5,000/mo" },
    { name: "Content Pieces/Month", essentials: "4", growth: "8", insane: "12" },
    { name: "Backlinks/Month", essentials: "2–4", growth: "6–10", insane: "10–20" },
    { name: "Managed Hosting", essentials: "✓", growth: "✓", insane: "✓" },
    { name: "Uptime Monitoring", essentials: "✓", growth: "✓", insane: "✓" },
    { name: "Content Edits/Month", essentials: "8", growth: "Unlimited", insane: "Unlimited" },
    { name: "Merch Drops", essentials: "—", growth: "2/month", insane: "4/month" },
    { name: "Playlist Pitches", essentials: "—", growth: "4/month", insane: "12/month" },
    { name: "Ad Audits", essentials: "—", growth: "2/month", insane: "4/month" },
    { name: "A/B Testing", essentials: "—", growth: "1 page/mo", insane: "3 pages/mo" },
    { name: "Fan Campaigns", essentials: "—", growth: "—", insane: "1/month" },
    { name: "Strategy Call", essentials: "—", growth: "45 min", insane: "60 min + 2 check-ins" },
    { name: "Dashboard", essentials: "Essentials", growth: "Growth", insane: "Full (unlocked)" },
    { name: "Support", essentials: "Email (48hr)", growth: "Priority (24hr)", insane: "Priority (24hr)" },
    { name: "Launch Sprints", essentials: "—", growth: "—", insane: "2/year" },
    { name: "Copyright Monitoring", essentials: "Passive", growth: "Active scanning", insane: "On-demand enforcement" },
    { name: "Royalty Console", essentials: "Maintained", growth: "Maintained", insane: "Full suite" },
    { name: "Composition Tool Access", essentials: "—", growth: "✓", insane: "Full access" },
    { name: "Discovery Campaigns", essentials: "—", growth: "Refresh", insane: "Continuous" }
  ]
};
