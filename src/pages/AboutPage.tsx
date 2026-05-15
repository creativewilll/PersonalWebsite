import React from 'react';
import { motion } from 'framer-motion';
import { MetaTags } from '../components/seo/MetaTags';
import { Linkedin, Twitter, Instagram, ArrowRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpworkIcon } from '../components/ui/UpworkIcon';

import { JsonLd } from '../components/seo/JsonLd';

export function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://williamspurlock.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://williamspurlock.com/about"
      }
    ]
  };

  return (
    <main className="min-h-screen pt-32 pb-20">
      <MetaTags
        title="About Will Spurlock | AI, Automation & SEO Consultant"
        description="Learn about Will Spurlock's background, credentials, and quantified results in building custom AI agents, n8n workflows, and premium, AI-optimized websites."
        url="https://williamspurlock.com/about"
      />
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <article className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Left Column - Image & Socials */}
          <div className="md:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <img
                src="/projects/Professional%20Headshot%20Hero.jpeg"
                alt="Will Spurlock - AI & Automation Consultant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-lg">Will Spurlock</p>
                <p className="text-white/80 text-sm">Founder & Lead Consultant</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-3 bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm"
            >
              <a href="https://www.linkedin.com/in/william-spurlock/" target="_blank" rel="noopener noreferrer me" className="p-3 bg-white hover:bg-blue-50 text-blue-600 rounded-xl shadow-sm transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://x.com/creativewill02" target="_blank" rel="noopener noreferrer me" className="p-3 bg-white hover:bg-sky-50 text-sky-500 rounded-xl shadow-sm transition-colors" title="X (Twitter)">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.instagram.com/willspurly/" target="_blank" rel="noopener noreferrer me" className="p-3 bg-white hover:bg-pink-50 text-pink-600 rounded-xl shadow-sm transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.upwork.com/freelancers/~01e5f4af96d3c88817" target="_blank" rel="noopener noreferrer me" className="p-3 bg-white hover:bg-green-50 text-green-600 rounded-xl shadow-sm transition-colors" title="Upwork">
                <UpworkIcon className="w-5 h-5" />
                <span className="sr-only">Upwork</span>
              </a>
              <a href="mailto:creativelywill@gmail.com" className="p-3 bg-white hover:bg-red-50 text-red-500 rounded-xl shadow-sm transition-colors" title="Email">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
              <a href="tel:+12488243309" className="p-3 bg-white hover:bg-gray-50 text-gray-800 rounded-xl shadow-sm transition-colors" title="Phone">
                <Phone className="w-5 h-5" />
                <span className="sr-only">Phone</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a href="https://calendly.com/spurlocksolutionsai/utilizing-ai" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors shadow-lg shadow-purple-500/25">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <section className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg prose-purple max-w-none"
            >
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-yellow-500">efficiency</span> into the DNA of modern businesses.
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                I build custom AI agents, powerful n8n workflows, and premium digital experiences that eliminate manual labor, radically scale operations, and dominate AI search visibility.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                  <div className="text-3xl font-black text-purple-600 mb-2">500+</div>
                  <div className="text-gray-800 font-bold mb-1">Automations Built</div>
                  <p className="text-sm text-gray-600">Custom workflows in n8n scaling operations.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                  <div className="text-3xl font-black text-yellow-500 mb-2">10k+</div>
                  <div className="text-gray-800 font-bold mb-1">Hours Architecting</div>
                  <p className="text-sm text-gray-600">Building agentic systems and AI agents.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                  <div className="text-3xl font-black text-green-500 mb-2">10k+</div>
                  <div className="text-gray-800 font-bold mb-1">Hours Saved</div>
                  <p className="text-sm text-gray-600">Freed up for clients to focus on growth.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who is Will Spurlock?</h2>
              <p>
                In an era where technology moves faster than traditional enterprise can adapt, off-the-shelf software often creates as many bottlenecks as it solves. I build hyper-customized, self-healing systems utilizing the Model Context Protocol (MCP), n8n, and frontier AI models that mold to <em>your</em> exact business logic.
              </p>
              <p>
                I hold all Make.com certifications for AI Automation, and I have personally collaborated with the n8n team on several projects. For the last 4 years (with many 80-hour weeks), I've lived and breathed AI and agentic systems.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">AIO, AEO & SEO Specialization — The Cutting Edge</h2>
              <p>
                My primary focus and selling point when building websites is an absolute dominance in <strong>AIO (Artificial Intelligence Optimization)</strong>, <strong>AEO (Answer Engine Optimization)</strong>, and <strong>Generative Engine Optimization (GEO)</strong>.
              </p>
              <p>
                I have been at the forefront of AI-SEO since the beginning, consulting with the top brands of today back then. I don't just follow best practices; <strong>I am the cutting edge.</strong> I build websites that don't just look like a $20k experience—they are architected from the ground up with structured data and pre-rendering pipelines so AI crawlers like Perplexity, ChatGPT, and Google AI Overviews read and cite your business <strong>before your competitors.</strong> I was originally certified in SEO back in 2021, and have evolved those foundations into true generative visibility.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Web Development & Growth</h2>
              <p>
                I have built <strong>HUNDREDS</strong> of production-ready websites. The ones visible in my portfolio are only the tip of the iceberg (the ones I am publicly allowed to display). My primary clientele spans blue-collar small businesses, music artists, and the cannabis industry.
              </p>
              <p>
                Beyond engineering, I have a deep background in viral social media growth and management. Over a 5-year span, I generated over <strong>half a billion impressions</strong> cross-platform (YouTube, TikTok, and Instagram), mastering the art of digital attention.
              </p>

              <div className="mt-12 p-8 bg-purple-900 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to scale without headcount?</h3>
                <p className="mb-6 text-purple-200 relative z-10">
                  Stop throwing human capital at robotic problems. Let's design an intelligent architecture that works 24/7.
                </p>
                <a href="https://calendly.com/spurlocksolutionsai/utilizing-ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:bg-white transition-colors relative z-10">
                  Schedule Discovery Call <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </section>

        </article>
      </div>
    </main>
  );
}
