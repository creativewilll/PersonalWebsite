import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Cpu, Sparkles } from 'lucide-react';
import { AnimatedText } from './AnimatedText';

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`min-h-screen relative overflow-hidden ${className}`}>
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
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
              <Icon className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>
        ))}
      </div>
      
<<<<<<< HEAD
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col lg:grid lg:grid-cols-2 gap-8">
=======
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8">
>>>>>>> 509da8d (v1.0)
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
<<<<<<< HEAD
          className="flex flex-col justify-center pt-20 lg:pt-0"
=======
          className="flex flex-col justify-center pt-12 sm:pt-20 lg:pt-0"
>>>>>>> 509da8d (v1.0)
        >
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
<<<<<<< HEAD
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight relative text-left">
=======
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-8 tracking-tight relative text-left">
>>>>>>> 509da8d (v1.0)
              <AnimatedText text="Creative" className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 hover:from-purple-600 hover:to-yellow-400 transition-colors duration-300" delay={0.2} />
              <AnimatedText text="Developer" className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-700 hover:from-yellow-400 hover:to-purple-600 transition-colors duration-300" delay={0.4} />
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
<<<<<<< HEAD
            className="text-lg sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-yellow-600 mb-12 max-w-2xl text-left font-medium tracking-wide"
=======
            className="text-base sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-yellow-600 mb-8 sm:mb-12 max-w-2xl text-left font-medium tracking-wide"
>>>>>>> 509da8d (v1.0)
          >
            FULL THROTTLE, SELF-TAUGHT INNOVATOR
          </motion.p>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-flex items-center gap-2 text-base sm:text-lg relative group overflow-hidden w-fit"
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
<<<<<<< HEAD
          className="flex items-center justify-center mt-8 lg:mt-0"
        >
          <div className="relative w-[280px] sm:w-[320px] lg:w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
=======
          className="flex items-center justify-center mt-4 sm:mt-8 lg:mt-0"
        >
          <div className="relative w-[240px] sm:w-[320px] lg:w-[400px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
>>>>>>> 509da8d (v1.0)
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
