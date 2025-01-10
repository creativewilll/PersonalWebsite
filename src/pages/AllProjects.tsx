import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Projects } from '../components/Projects';

export function AllProjects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32">
      <Link to="/">
        <motion.button
          className="fixed left-4 top-24 sm:left-8 sm:top-32 z-10 flex items-center gap-2 px-4 py-2 text-sm 
                   bg-white/80 hover:bg-white/90 text-purple-800 rounded-full shadow-lg hover:shadow-xl 
                   transition-all duration-300 backdrop-blur-sm"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>
      </Link>
      <div className="relative w-full sm:w-11/12 lg:w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          ref={ref}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                       from-purple-700 to-yellow-500 mb-2 sm:mb-4 px-4">
            Project Gallery
          </h1>
          <p className="text-purple-800 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Explore my complete portfolio of projects
          </p>
        </motion.div>

        <Projects showFeatured={false} />
      </div>
    </div>
  );
}
