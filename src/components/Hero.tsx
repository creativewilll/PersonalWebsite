import React, { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, Brain } from 'lucide-react';
import { PydanticAIIcon } from './ui/PydanticAIIcon';
import { ClaudeIcon } from './ui/ClaudeIcon';
import { LayeredAIIcon } from './ui/LayeredAIIcon';
import { AnimatedText } from './AnimatedText';

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // ── Upgrade 10: Magnetic hover effect on CTA ──
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (btn) btn.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <section ref={sectionRef} className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Upgrade 5: Floating nodes pause when section is out of view */}
      <div className="absolute inset-0 pointer-events-none">
        {[Brain, ClaudeIcon, LayeredAIIcon, PydanticAIIcon].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${(index + 1) * 30}%`,
              top: `${(index + 1) * 25}%`,
            }}
            animate={isInView ? {
              y: [0, -30, 0],
              x: [0, index % 2 === 0 ? 30 : -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 7.6,
              repeat: Infinity,
              delay: index * 1.5,
            }}
          >
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
              <Icon className="w-8 h-8 text-purple-600/80" />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center pt-24 sm:pt-32 lg:pt-0"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-300 via-purple-300 to-yellow-300 rounded-lg blur-md opacity-40"
              style={{ paddingBottom: '24px', transform: 'scale(1.05)' }}
              animate={isInView ? {
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            {/* Upgrade 11: Accessible heading — sr-only fallback for screen readers */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-8 tracking-tight relative text-left">
              <span className="sr-only">Custom AI & Automation Solutions</span>
              <AnimatedText text="Custom AI &" className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 hover:from-purple-600 hover:to-yellow-400 transition-colors duration-300" delay={0.2} style={{ paddingBottom: '4px' }} aria-hidden="true" />
              <AnimatedText text="Automation Solutions" className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-700 hover:from-yellow-400 hover:to-purple-600 transition-colors duration-300" delay={0.4} style={{ paddingBottom: '4px' }} aria-hidden="true" />
            </h1>
          </div>
          
          {/* Upgrade 12: Improved contrast with text-shadow fallback */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-base sm:text-xl lg:text-2xl text-purple-800 mb-8 sm:mb-12 max-w-2xl text-left font-medium tracking-wide relative"
            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}
          >
            Radically scale operations, save time, and increase revenue for innovative businesses.
          </motion.p>

          {/* Upgrade 10: Magnetic hover CTA button */}
          <motion.a
            ref={buttonRef}
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-flex items-center gap-2 text-base sm:text-lg relative group overflow-hidden w-fit transition-transform duration-200 ease-out"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-yellow-400 rounded-full transition-transform duration-300 group-hover:scale-105" />
            <span className="relative flex items-center gap-2 text-white font-medium px-8 py-4">
              Book a Discovery Call
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </span>
          </motion.a>
        </motion.div>

        {/* Right side - Professional headshot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center mt-4 sm:mt-8 lg:mt-0"
        >
          <div className="relative w-[240px] sm:w-[320px] lg:w-[400px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Upgrade 2 & 4: WebP with responsive srcset */}
            <picture>
              <source
                type="image/webp"
                srcSet="/projects/headshot-hero-400.webp 400w, /projects/headshot-hero-800.webp 800w, /projects/headshot-hero-full.webp 1522w"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
              />
              <img 
                src="/projects/Professional Headshot Hero.jpeg"
                alt="Will Spurlock - Custom AI and Automation Solutions Professional Headshot"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={400}
                height={500}
              />
            </picture>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
            
            {/* Neon outline animation — pauses when out of view */}
            {isInView && (
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 500"
                initial="hidden"
                animate="visible"
              >
                <motion.path
                  d="M40,20 
                     L360,20 
                     Q380,20 380,40
                     L380,460
                     Q380,480 360,480
                     L40,480
                     Q20,480 20,460
                     L20,40
                     Q20,20 40,20"
                  stroke="url(#neonGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  variants={{
                    hidden: { 
                      pathLength: 0,
                      opacity: 0
                    },
                    visible: { 
                      pathLength: [0, 1],
                      opacity: [0, 1, 1, 0],
                      transition: {
                        pathLength: { 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        opacity: { 
                          duration: 1.5,
                          repeat: Infinity,
                          times: [0, 0.1, 0.9, 1],
                          ease: "linear"
                        }
                      }
                    }
                  }}
                  style={{
                    filter: "drop-shadow(0 0 6px #9333ea) drop-shadow(0 0 12px #eab308)",
                    strokeWidth: "3"
                  }}
                />
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                  <filter id="neonGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodColor="#9333ea" floodOpacity="0.5" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </motion.svg>
            )}
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-6 h-6 text-purple-600" />
        </motion.div>
      </div>
    </section>
  );
}
