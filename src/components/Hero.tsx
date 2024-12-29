import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Cpu, Sparkles } from 'lucide-react';
import { AnimatedText } from './AnimatedText';

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-50 via-purple-50 to-yellow-50 ${className}`}>
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(234,179,8,0.1))] animate-[pulse_4s_ease-in-out_infinite]" />
      
      {/* Floating nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[Code, Cpu, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${(index + 1) * 25}%`,
              top: `${(index + 1) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, index % 2 === 0 ? 20 : -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 2,
            }}
          >
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-yellow-500/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
              <Icon className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-screen grid grid-cols-2 gap-8">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center"
        >
          {/* Floating elements */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-[-150px] left-[10%] w-64 h-64 bg-gradient-to-br from-yellow-300/30 to-purple-400/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-[-200px] left-[15%] w-80 h-80 bg-gradient-to-bl from-purple-400/30 to-yellow-300/30 rounded-full blur-2xl"
          />

          <div className="relative">
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-300 via-purple-300 to-yellow-300 rounded-lg blur-md opacity-40"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight relative text-left">
              <AnimatedText text="Creative" className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 hover:from-purple-600 hover:to-yellow-400 transition-colors duration-300" delay={0.2} />
              <AnimatedText text="Developer" className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-700 hover:from-yellow-400 hover:to-purple-600 transition-colors duration-300" delay={0.4} />
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-yellow-600 mb-12 max-w-2xl text-left font-medium tracking-wide"
          >
            FULL THROTTLE, SELF-TAUGHT INNOVATOR
          </motion.p>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-flex items-center gap-2 text-lg relative group overflow-hidden w-fit"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-yellow-400 rounded-full transition-transform duration-300 group-hover:scale-105" />
            <span className="relative flex items-center gap-2 text-white font-medium px-8 py-4">
              Learn More
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </span>
          </motion.a>
        </motion.div>

        {/* Right side - Professional headshot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/headshot-placeholder.svg" 
              alt="Professional headshot"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
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
