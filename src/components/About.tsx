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
      subtitle="Passionate developer crafting exceptional digital experiences through innovative solutions"
      className={className}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-amber-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Service Cards Grid with Floating Animation */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
              {/* Floating animation wrapper */}
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
                <div className="relative bg-gradient-to-br from-sky-400/80 via-blue-400/80 to-rose-300/80 rounded-2xl p-8 border border-white/20 
                              hover:border-white/30 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30
                              transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  {/* Card glow effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-white/20 via-blue-200/20 to-white/20 
                                rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 bg-white/20 rounded-lg p-2.5">
                        <Icon className="w-full h-full text-white group-hover:text-blue-100 transition-colors duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-50 transition-colors duration-300">
                      {offering.title}
                    </h3>
                    
                    <p className="text-white/90 group-hover:text-white transition-colors duration-300">
                      {offering.description}
                    </p>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* About Text with Floating Effect */}
      <div className="relative mt-24 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 blur-xl" />
          
          <p className={`relative text-xl text-violet-900 max-w-3xl mx-auto leading-relaxed`}>
            I'm a self-taught developer with a passion for creating innovative solutions. 
            Specializing in <span className="text-purple-600">AI integration</span>, 
            <span className="text-purple-500"> web development</span>, and 
            <span className="text-purple-600"> digital marketing</span>, 
            I bring a unique blend of technical expertise and creative problem-solving to every project.
          </p>
        </div>
      </div>

      {/* Decorative floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </Section>
  );
}
