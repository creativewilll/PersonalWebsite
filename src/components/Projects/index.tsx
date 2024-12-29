import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProjectsGrid } from './ProjectsGrid';

type ProjectType = 'agent' | 'workflow' | 'fullstack';

interface ProjectsProps {
  className?: string;
}

export function Projects({ className = '' }: ProjectsProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>('agent');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filters: { type: ProjectType; label: string }[] = [
    { type: 'agent', label: 'AI Agents' },
    { type: 'workflow', label: 'AI Workflows' },
    { type: 'fullstack', label: 'Full-Stack Apps' }
  ];

  return (
    <section id="projects" ref={ref} className="relative py-32 bg-gradient-to-b from-teal-950 via-cyan-950 to-sky-950 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-sky-500/10 to-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                       from-teal-200 via-cyan-200 to-teal-200 mb-4">
            Featured Projects
          </h2>
          <p className="text-teal-200 text-lg max-w-2xl mx-auto">
            Interactive project showcase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-center mb-8 gap-4">
            {filters.map(({ type, label }) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-teal-950 shadow-lg shadow-teal-500/20'
                    : 'bg-teal-900/30 text-teal-200 hover:bg-teal-800/40 backdrop-blur-sm border border-teal-700/20'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
          <ProjectsGrid selectedType={selectedType} />
        </motion.div>

        {/* Floating particles */}
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
      </div>
    </section>
  );
}
