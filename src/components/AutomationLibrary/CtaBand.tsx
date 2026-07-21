import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export function CtaBand() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="px-4"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto text-center p-8 sm:p-10 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
        <h2
          id="cta-heading"
          className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-3"
        >
          Ready to Build Yours?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
          Read the automation writeups on the blog, or bring a process you want off your team&apos;s plate.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold transition-colors"
          >
            Read automation articles
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-purple-200 text-purple-800 hover:bg-purple-50 text-sm font-semibold transition-colors"
          >
            <Mail className="w-4 h-4" />
            Start a project
          </a>
        </div>
      </div>
    </motion.section>
  );
}
