import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { offerings } from '../data/offerings';

interface AboutProps {
  className?: string;
}

export function About({ className = '' }: AboutProps) {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="With a passion for creativity and a background centered in business, I've spent the past 3 years fine-tuning my skills and building AI Agents and Automations. It's been a very wild ride, and with how fast the AI space is evolving, the future is bright for those who are willing to adapt and learn."
      className={className}
    >
      {/* Service Cards Grid with Floating Animation */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
        {offerings.map((offering, index) => {
          const Icon = offering.icon;
          return (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Re-added Floating animation wrapper */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="relative group"
              >
                {/* Animated background gradient */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-pink-300 via-rose-300 to-yellow-200 rounded-2xl blur group-hover:blur-md transition-all duration-300 animate-gradient-xy opacity-75 group-hover:opacity-100" />
                
                {/* Glass background */}
                <div className="relative bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8
                              hover:bg-white/30 border border-white/50 hover:border-white/60
                              transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300
                              shadow-[0_8px_16px_rgb(0_0_0_/0.1)] hover:shadow-[0_16px_32px_rgb(0_0_0_/0.15)]">
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Unique icon background */}
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="relative w-16 h-16">
                        {/* Animated background shapes */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-yellow-100 rounded-xl 
                                    rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-tl from-rose-200 to-pink-100 rounded-xl 
                                    -rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-75" />
                        {/* Icon container */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl
                                    group-hover:bg-white/60 transition-all duration-300 border border-white/50">
                          <Icon className="w-8 h-8 text-pink-500 group-hover:text-pink-600 transition-colors duration-300
                                       drop-shadow-[0_2px_4px_rgba(236,72,153,0.3)]" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 
                                 bg-gradient-to-br from-pink-500 to-rose-400 bg-clip-text text-transparent
                                 group-hover:from-pink-400 group-hover:to-rose-300 transition-all duration-300">
                      {offering.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-pink-900/80 group-hover:text-pink-800 transition-colors duration-300
                                drop-shadow-sm">
                      {offering.description}
                    </p>
                  </div>

                  {/* Hover effects */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-300
                                bg-gradient-to-br from-pink-200/0 via-rose-200/0 to-yellow-100/0
                                group-hover:from-pink-200/10 group-hover:via-rose-200/10 group-hover:to-yellow-100/10" />
                  
                  {/* Bottom shine effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent
                                rounded-b-xl sm:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Answer-First AEO Section */}
      <div className="relative mt-16 sm:mt-24 lg:mt-32 px-4 sm:px-0 max-w-4xl mx-auto text-left space-y-16">
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#9333EA] mb-4">Who is Will Spurlock?</h2>
          <p className="text-lg text-[#9333EA]/80 leading-relaxed">
            Will Spurlock is a Fractional AI CTO and Make.com Certified automation engineer specializing in custom AI agents and enterprise automation. With over 10,000+ hours of system architecture experience and direct collaboration with the n8n team, he designs high-performance digital systems that scale operations without adding headcount.
          </p>
        </div>

        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#9333EA] mb-4">What AI automation services does Will Spurlock offer?</h2>
          <p className="text-lg text-[#9333EA]/80 leading-relaxed">
            Will Spurlock offers comprehensive AI automation services including custom n8n workflow development, Model Context Protocol (MCP) architecture, autonomous AI agents, and premium, AIO-optimized websites. These solutions replace fragmented SaaS subscriptions with deeply integrated, self-healing systems that save businesses hundreds of hours weekly while maximizing semantic search visibility.
          </p>
        </div>

        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#9333EA] mb-4">Why migrate from Zapier to custom n8n workflows?</h2>
          <p className="text-lg text-[#9333EA]/80 leading-relaxed">
            Migrating from Zapier to custom n8n workflows eliminates recurring task-based execution costs and bypasses restrictive API limitations. As an open-source, node-based automation platform, n8n provides infinite flexibility, granular error handling, and robust scalability, allowing businesses to execute millions of complex tasks per month without unpredictable billing spikes.
          </p>
        </div>
      </div>
    </Section>
  );
}
