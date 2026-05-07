---
title: "Claude on Bedrock New Regions: Anthropic's Enterprise Expansion"
slug: "claude-bedrock-new-regions"
date: "2024-11-27"
lastModified: "2024-11-27"
author: "William Spurlock"
readingTime: 12
categories:
  - "AI Agents and Automations"
tags:
  - "Claude"
  - "AWS Bedrock"
  - "Anthropic"
  - "enterprise AI"
  - "cloud regions"
  - "data residency"
  - "government cloud"
featured: false
draft: false
excerpt: "Anthropic expands Claude availability on AWS Bedrock to GovCloud US-East and adds cross-region inference. Here's what the regional expansion means for enterprise deployment."
coverImage: "/images/blog/claude-bedrock-regions-nov-2024.png"
seoTitle: "Claude Bedrock New Regions: Enterprise Expansion Guide | William Spurlock"
seoDescription: "Anthropic expands Claude on AWS Bedrock to GovCloud US-East with cross-region inference. Learn which regions are available and what this means for global deployment."
seoKeywords:
  - "Claude AWS Bedrock"
  - "Anthropic regional expansion"
  - "AWS GovCloud Claude"
  - "enterprise AI deployment"
  - "cross-region inference"

# AIO/AEO Fields
aioTargetQueries:
  - "which regions is Claude available on Bedrock"
  - "Claude AWS GovCloud availability"
  - "cross-region inference Bedrock"
  - "Claude data residency options"
  - "enterprise Claude deployment regions"
contentCluster: "ai-agents"
pillarPost: false
parentPillar: "ai-automation-strategy"
entityMentions:
  - "William Spurlock"
  - "Claude"
  - "Anthropic"
  - "AWS Bedrock"
  - "Amazon Web Services"
  - "Thomson Reuters"
  - "N26"
  - "FedRAMP"

# Service Track Routing
serviceTrack: "ai-automation"
---

# Claude on Bedrock New Regions: Anthropic's Enterprise Expansion

**Anthropic is aggressively expanding Claude's footprint on AWS Bedrock.** Today, the company announces that Amazon Bedrock is now available in the AWS GovCloud (US-East) Region—adding to the GovCloud (US-West) expansion that went live just four weeks ago. Combined with new cross-region inference capabilities and the recent Claude 3.5 Haiku launch, this represents Anthropic's most significant enterprise infrastructure push of 2024.

For organizations running sensitive workloads—government agencies, healthcare systems, financial institutions, and multinational enterprises—these regional expansions remove the final deployment blockers that kept Claude at arm's length. Data residency requirements, compliance certifications, and low-latency access across global markets are now fully supported.

This post breaks down what regions are live today, what cross-region inference actually means for your architecture, and how enterprises are already deploying Claude at scale across these new zones.

---

## The November 2024 Expansion: What's New

### GovCloud US-East Goes Live (November 11, 2024)

**Amazon Bedrock launched in AWS GovCloud (US-East) on November 11, 2024**, giving government customers and regulated industries access to Claude 3.5 Sonnet, Claude 3.5 Haiku, and Claude 3 Haiku models in an air-gapped, FedRAMP-compliant environment. This follows the October 31, 2024 launch of Claude in GovCloud (US-West), completing the dual-region GovCloud coverage that most federal workloads require for redundancy.

GovCloud regions are isolated AWS environments designed to host sensitive data and regulated workloads while meeting stringent U.S. government security and compliance requirements. The addition of Bedrock to these regions means agencies can now deploy Claude-powered applications without data ever leaving the U.S. sovereign cloud boundary.

### Claude 3.5 Haiku Arrives on Bedrock

**Claude 3.5 Haiku became available on Amazon Bedrock in early November 2024**, launching in US West (Oregon) and US East (N. Virginia) with support for cross-region inference. This is Anthropic's fastest model to date—outperforming Claude 3 Opus on many intelligence benchmarks while maintaining the speed and cost profile that makes it suitable for high-volume, user-facing applications.

For Bedrock customers, 3.5 Haiku fills the gap between the lightweight 3 Haiku and the more capable 3.5 Sonnet. It's the model you want for customer service chatbots, real-time content moderation, and any workload where latency and throughput matter more than deep reasoning.

### Cross-Region Inference Now Available

**Amazon Bedrock now offers three inference routing options** for Claude models, a significant architectural upgrade from the single-region limitation that existed at launch:

| Inference Type | Data Residency | Throughput | Best For |
|---------------|----------------|------------|----------|
| **In-Region** | Strict single region | Single-region capacity | Strict compliance workloads |
| **Geographic (Geo)** | Within geography boundaries | Higher than single-region | GDPR, data sovereignty requirements |
| **Global** | Any commercial region worldwide | Highest throughput | Maximum performance, no residency constraints |

The geographic cross-region option is particularly important for European enterprises. It routes inference within EU boundaries (between Frankfurt, Ireland, London, Paris, Stockholm, and other EU regions) while maintaining GDPR compliance. Global cross-region inference offers approximately 10% cost savings compared to geographic routing and handles peak demand by leveraging worldwide capacity.

---

## Complete Regional Availability as of November 2024

### United States Regions

Claude models are now available across **six US regions** on Bedrock:

| Region | Claude 3.5 Sonnet | Claude 3.5 Haiku | Claude 3 Haiku | GovCloud |
|--------|------------------|------------------|----------------|----------|
| us-east-1 (N. Virginia) | ✅ | ✅ | ✅ | ❌ |
| us-east-2 (Ohio) | ✅ | ✅ | ✅ | ❌ |
| us-west-1 (N. California) | ✅ | ✅ | Legacy | ❌ |
| us-west-2 (Oregon) | ✅ | ✅ | Legacy | ❌ |
| us-gov-east-1 | ✅ | ✅ | ✅ | ✅ |
| us-gov-west-1 | ✅ | ❌ | ✅ | ✅ |

The GovCloud regions (us-gov-east-1 and us-gov-west-1) are the headline additions for November. These regions carry FedRAMP High and DoD Impact Level 4/5 provisional authorizations, making Claude available for the most sensitive federal and defense workloads.

### European Union Regions

**Claude 3.5 Sonnet expanded to Europe (Frankfurt) in August 2024**, and as of November, European coverage includes:

- **eu-central-1** (Frankfurt, Germany)
- **eu-central-2** (Zurich, Switzerland)
- **eu-north-1** (Stockholm, Sweden)
- **eu-south-1** (Milan, Italy)
- **eu-south-2** (Spain)
- **eu-west-1** (Ireland)
- **eu-west-2** (London, UK)
- **eu-west-3** (Paris, France)

This coverage gives European enterprises geographic redundancy while keeping all data processing within EU boundaries. The geographic cross-region inference option automatically routes between these regions based on capacity and latency, ensuring GDPR compliance without manual region selection.

### Asia-Pacific Regions

**The Asia-Pacific expansion in August 2024 brought Claude to Tokyo and Singapore**, and coverage now includes:

- **ap-northeast-1** (Tokyo, Japan)
- **ap-northeast-2** (Seoul, South Korea)
- **ap-south-1** (Mumbai, India)
- **ap-southeast-1** (Singapore)
- **ap-southeast-2** (Sydney, Australia)

Japan and Australia have dedicated geographic cross-region inference boundaries, meaning enterprises in those markets can route across regional zones while keeping data within national or regional sovereignty boundaries.

### Additional Global Regions

Claude is also available in:

- **ca-central-1** (Montreal, Canada)
- **ca-west-1** (Calgary, Canada)
- **sa-east-1** (São Paulo, Brazil)
- **il-central-1** (Tel Aviv, Israel)
- **me-central-1** (UAE)

This brings the total to **22+ regions worldwide** where Claude can be deployed via Amazon Bedrock—a dramatic expansion from the initial US-only launch in early 2024.

---

## What This Means for Enterprise Deployment

### Data Residency Becomes a Solved Problem

**The primary blocker for enterprise Claude adoption has been data residency requirements.** Financial services, healthcare, and government organizations operate under strict regulations that mandate where data can be processed and stored. Before the regional expansion, these organizations had two choices: deploy Claude through Bedrock in the US (violating residency rules) or wait for regional availability.

That wait is now over for most major markets. A German bank can run Claude in Frankfurt with EU geographic routing. An Australian healthcare provider can deploy in Sydney with confidence that data stays within APAC boundaries. A US federal agency can launch in GovCloud with FedRAMP High compliance built in.

### Cross-Region Inference Changes Capacity Planning

**The shift from single-region to geographic and global inference fundamentally changes how you architect for scale.** Instead of provisioning capacity in one region and hoping you don't hit quotas during peak traffic, you can now let Bedrock intelligently route across regions within your compliance boundaries.

For a typical enterprise deployment, this means:

1. **In-Region** for sensitive data processing (PII, financial records, health data)
2. **Geographic** for general-purpose workloads where data sovereignty matters but single-region strictness doesn't
3. **Global** for non-sensitive batch processing, content generation, and analytics where maximum throughput wins

The model ID format changes based on your choice:
- In-Region: `anthropic.claude-3-5-sonnet-20241022-v2:0`
- Geographic (US): `us.anthropic.claude-3-5-sonnet-20241022-v2:0`
- Global: `global.anthropic.claude-3-5-sonnet-20241022-v2:0`

### Government Workloads Are Now Supported

**The GovCloud expansion is the single most significant unlock for public-sector AI adoption.** FedRAMP High authorization and DoD Impact Level 4/5 provisional authorization mean Claude can now handle:

- Controlled Unclassified Information (CUI)
- Criminal justice information
- Financial management systems
- Healthcare records at federal scale
- Defense and intelligence community workloads

The EULA acceptance process for GovCloud requires initial setup through a standard AWS region (us-east-1 or us-west-2) before models can be enabled in the GovCloud account, but once configured, all inference stays within the GovCloud boundary.

---

## Enterprise Adoption at Scale: Real Deployments

### N26 Automates 70% of Customer Operations

**European digital bank N26 has deployed Claude via AWS Bedrock across 24 markets**, automating up to 70% of targeted customer service tasks within its first year of deployment. The bank runs Claude in EU regions to maintain GDPR compliance while handling customer inquiries across multiple languages.

N26's deployment demonstrates what's possible when regional availability aligns with compliance requirements. Before the EU region expansion, the bank would have faced data residency challenges running customer data through US regions. Now, the entire workflow stays within EU boundaries.

### Thomson Reuters Powers Legal AI at Scale

**Thomson Reuters uses Claude on Bedrock to power CoCounsel**, their AI platform for legal and tax professionals. The deployment leverages Claude's reasoning capabilities across Thomson Reuters' 150 years of content and 3,000+ subject matter experts.

Legal tech has some of the strictest data residency and confidentiality requirements in enterprise software. Law firms cannot risk exposing client data to cross-border processing. The regional expansion makes Claude viable for these use cases in ways that weren't possible with US-only availability.

### Applaud Rebuilds HR Platform Around Claude

**Applaud has rebuilt its entire HR platform around Claude (specifically Claude 3.5 Sonnet) on Amazon Bedrock** for mid-to-large enterprises. HR data is among the most sensitive employee information an organization holds—salary data, performance reviews, disciplinary records, health information.

By deploying in regional zones with appropriate cross-region inference settings, Applaud can offer AI-powered HR assistance while giving customers control over where their employee data is processed.

---

## Compliance and Security Architecture

### FedRAMP and DoD Authorizations

**Claude on Bedrock carries provisional authorizations for FedRAMP High and DoD Impact Level 4/5 workloads.** This is not a self-attestation or generic security claim—it represents third-party validation that Claude's infrastructure meets the U.S. government's most stringent cloud security standards.

| Authorization | Scope | Use Cases |
|--------------|-------|-----------|
| **FedRAMP High** | Federal civilian agencies | Financial systems, healthcare, law enforcement |
| **DoD IL4** | DoD unclassified controlled data | Defense business systems, CUI handling |
| **DoD IL5** | DoD unclassified national security | Higher-sensitivity defense workloads |
| **HIPAA** | Healthcare | Protected health information processing |
| **SOC 2 Type 2** | General enterprise | Security and availability validation |
| **ISO/IEC 27001** | International security | Global security management standard |

### GDPR and European Data Protection

**For European deployments, Claude offers regional processing within EU/EEA boundaries.** When using geographic cross-region inference with the EU geography prefix, prompts and outputs move only between EU regions (Frankfurt, Ireland, London, Paris, Stockholm, etc.) and never leave the European economic area.

This architecture satisfies GDPR requirements for data processing within the EU while still providing the scalability benefits of cross-region routing. Organizations can combine EU geographic inference for most workloads with strict In-Region inference for the most sensitive data processing.

### Model Access and Data Protection Guarantees

**Anthropic and AWS maintain that no customer data is used to train Claude models.** This is a critical enterprise guarantee that distinguishes Bedrock deployment from consumer API access. When you run Claude through Bedrock:

- Your prompts are not retained by Anthropic
- Your outputs are not retained by Anthropic
- Your data is not used for model training
- Your data stays within your AWS account boundaries

For organizations that couldn't consider AI deployment due to data leakage concerns, these guarantees—backed by AWS's enterprise contracts—remove that blocker entirely.

---

## Implementation Guide: Choosing Your Region Strategy

### Scenario 1: US Financial Services with FedRAMP Requirements

**Use GovCloud (US-East) with In-Region inference.**

For financial institutions handling government contracts or sensitive financial data, the GovCloud regions offer the highest compliance posture. Route all Claude inference through us-gov-east-1 with the standard model ID format to ensure data never leaves the FedRAMP-authorized boundary.

### Scenario 2: European Multinational with GDPR Requirements

**Use EU regions with geographic cross-region inference.**

Deploy in eu-central-1 (Frankfurt) as your primary region, but use the `eu.` prefix for your model IDs to enable automatic routing across EU regions. This gives you scalability and redundancy while maintaining GDPR compliance.

For the most sensitive workloads—HR data, health information, personal financial records—use In-Region inference with the standard model ID to ensure data stays in a single region.

### Scenario 3: Global SaaS with Mixed Sensitivity

**Use a three-tier architecture:**

1. **In-Region** for tenant data that must stay in specific countries (German customer data in Frankfurt, Australian data in Sydney)
2. **Geographic** for regional workloads that need scale but have sovereignty requirements (EU routing for European customers, US routing for American customers)
3. **Global** for truly global workloads with no residency constraints (content generation, code assistance, general analytics)

This tiered approach lets you optimize for both compliance and cost/performance within the same application architecture.

---

## Pricing and Performance Implications

### Cross-Region Inference Costs

**Global cross-region inference offers approximately 10% cost savings compared to geographic routing**, with no surcharge for the cross-region routing itself. You pay the on-demand pricing of your source region regardless of where the inference actually processes.

Geographic routing provides higher throughput than single-region inference at the same price point—effectively giving you better performance for the same cost when your workload can tolerate data movement within geographic boundaries.

### Latency Considerations

**In-Region inference offers the lowest and most predictable latency** because your requests never leave the region where your application is deployed. For latency-sensitive applications—real-time chat, live code completion, interactive assistants—In-Region is usually the right choice.

Geographic and global routing add variable latency depending on where Bedrock routes your request. While AWS optimizes for low latency within geographies, cross-region routing will always be slightly slower than single-region processing.

### Throughput and Quota Management

**Cross-region inference effectively multiplies your throughput quotas.** Instead of being capped by a single region's limits, geographic routing lets you absorb traffic spikes across multiple regions within your compliance boundary. Global routing extends this to worldwide capacity.

For enterprises running high-volume workloads—millions of requests per day, large-scale content processing, AI-powered user features—the ability to route across regions is the difference between hitting limits and scaling smoothly.

---

## The Bigger Picture: Anthropic's Enterprise Strategy

### AWS as the Enterprise Distribution Channel

**Anthropic's strategy is clear: use AWS Bedrock as the enterprise distribution channel for Claude.** Rather than building direct sales and infrastructure for every regional market, Anthropic leverages AWS's existing global footprint, compliance certifications, and enterprise relationships.

This is the right strategic call. Enterprise AI adoption at scale requires infrastructure, compliance, and procurement pathways that take years to build. By partnering with AWS, Anthropic gets immediate access to:

- 22+ global regions with local compliance
- FedRAMP, HIPAA, SOC 2, and ISO certifications
- Enterprise procurement relationships
- Existing cloud spend commitments
- Integrated billing and cost management

### The Multi-Cloud Positioning

**Anthropic is maintaining multi-cloud availability while prioritizing AWS for enterprise.** Claude is also available on Google Cloud Vertex AI and (as of recent announcements) Microsoft Azure Foundry. However, Bedrock consistently gets the newest models and broadest regional availability first.

For enterprises already committed to AWS—particularly those in regulated industries with complex compliance requirements—Bedrock is the obvious choice for Claude deployment. The regional availability gap between Bedrock and other platforms continues to widen.

### What's Coming Next

**Expect continued regional expansion through 2025.** The trajectory is clear: Anthropic is methodically adding regions to match AWS's global footprint. Markets likely to see Claude availability next include:

- Additional Asia-Pacific regions (Hong Kong, Jakarta expansion)
- Middle East expansion beyond UAE (Saudi Arabia, Bahrain)
- South America expansion beyond São Paulo
- Africa (South Africa region)

The infrastructure pattern is established: new regions launch with Claude 3.5 Sonnet and 3.5 Haiku first, followed by additional models based on demand.

---

## Frequently Asked Questions

### Which AWS regions currently support Claude on Bedrock?

**As of November 27, 2024, Claude is available in 22+ AWS regions including six US regions (N. Virginia, Ohio, N. California, Oregon, GovCloud East, GovCloud West), eight EU regions (Frankfurt, Zurich, Stockholm, Milan, Spain, Ireland, London, Paris), five Asia-Pacific regions (Tokyo, Seoul, Mumbai, Singapore, Sydney), plus Canada, Brazil, Israel, and UAE.** The most significant recent additions are GovCloud US-East (launched November 11, 2024) and the Asia-Pacific expansion from August 2024.

### What's the difference between In-Region, Geographic, and Global inference?

**In-Region keeps your data in a single AWS Region; Geographic routes within defined boundaries (US, EU, Japan, Australia) for compliance with data sovereignty; Global routes worldwide for maximum throughput and lowest cost.** In-Region is best for strict compliance, Geographic balances compliance and scale, and Global maximizes performance when you have no residency constraints. Global inference offers approximately 10% cost savings compared to Geographic routing.

### Is Claude approved for government and regulated workloads?

**Yes. Claude on Bedrock is approved for FedRAMP High and DoD Impact Level 4/5 workloads through AWS GovCloud regions.** This authorization, announced in November 2024, means Claude can handle Controlled Unclassified Information (CUI), criminal justice information, and sensitive federal agency data. The GovCloud regions (us-gov-east-1 and us-gov-west-1) provide air-gapped infrastructure specifically designed for government requirements.

### Does using Claude on Bedrock comply with GDPR?

**Yes, when configured correctly. Use geographic cross-region inference with the EU geography prefix to ensure all data processing stays within EU/EEA boundaries.** Claude supports GDPR compliance through regional processing in Frankfurt, Ireland, London, Paris, Stockholm, and other EU regions. Data never leaves the European economic area when using the EU geographic routing option, satisfying data residency requirements for European organizations.

### Is my data used to train Claude models?

**No. Anthropic and AWS guarantee that customer data processed through Bedrock is not used to train Claude models.** Your prompts and outputs are not retained by Anthropic, not used for model improvements, and stay within your AWS account boundaries. This is a contractual guarantee backed by AWS's enterprise agreements, distinguishing Bedrock from consumer API access where data handling terms differ.

### Which Claude model should I use for different workloads?

**Use Claude 3.5 Haiku for speed-critical, high-volume applications like customer service chatbots; Claude 3.5 Sonnet for general-purpose reasoning and complex tasks; and Claude 3 Haiku (Legacy) only if you have specific compatibility requirements.** As of November 2024, Claude 3.5 Haiku surpasses Claude 3 Opus on many intelligence benchmarks while being significantly faster and cheaper. Most enterprises should default to 3.5 Sonnet for complex work and 3.5 Haiku for high-volume interactions.

### How do I access Claude in GovCloud regions?

**First accept the End User License Agreement (EULA) in a standard AWS region (us-east-1 or us-west-2), then enable the model in your GovCloud account via the Model Access page.** You'll need to sign in to your linked standard AWS account, open the Amazon Bedrock Chat/Text playground, choose the Claude model, and run a prompt to establish the EULA agreement. After that, go to your GovCloud account and enable the model through the console. Entitlements typically propagate within a few minutes.

### What compliance certifications does Claude on Bedrock carry?

**Claude on Bedrock carries FedRAMP High, DoD Impact Level 4/5 (provisional), HIPAA, SOC 2 Type 2, and ISO/IEC 27001 certifications.** These cover federal government use, defense applications, healthcare data processing, and general enterprise security requirements. Additional region-specific certifications apply based on the AWS region you're deploying in, leveraging AWS's existing compliance infrastructure.

---

## Bottom Line: Enterprise AI Without Compromise

**Anthropic's regional expansion removes the final barriers to enterprise Claude adoption.** With 22+ regions, GovCloud availability, cross-region inference, and comprehensive compliance certifications, there's no longer a trade-off between AI capability and regulatory requirements.

For teams building AI-powered applications, this means you can finally deploy Claude at scale without worrying about where your data is processed. For government agencies and regulated industries, it means access to frontier AI models without compromising security posture. For global enterprises, it means consistent AI capabilities across every market you operate in.

The infrastructure is ready. The compliance is certified. The regions are live.

---

## Need Help Deploying Claude in Your Organization?

**Implementing enterprise-grade AI isn't just about model access—it's about architecture, security, and integration with your existing systems.** I help organizations deploy Claude and other frontier models in production environments with proper guardrails, cost optimization, and workflow integration.

Whether you need:
- A regional deployment strategy for multi-national compliance
- Integration with existing security and identity systems
- Custom agent architectures built on Claude
- Migration from other AI platforms to Bedrock

[Book an AI automation strategy call](/contact) and we'll map out a deployment plan that matches your compliance requirements and technical architecture.

---

## Related Reading

- [Claude 3.5 Sonnet: Coding Benchmarks and Real-World Performance](/blog/2024/06/claude-3-5-sonnet-coding-benchmarks) — Deep dive into Claude's capabilities for software development
- [n8n and Claude: Building Production AI Workflows](/blog/2024/06/n8n-claude-3-5-sonnet-production-agent-tutorial) — How to orchestrate Claude agents in automation pipelines
- [AWS vs. GCP vs. Azure: AI Infrastructure Comparison](/blog/2024/09/aws-gcp-azure-ai-infrastructure-comparison) — Platform analysis for enterprise AI deployment

---

*Last updated: November 27, 2024. Region availability and model support change frequently—check the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html) for the current status.*
