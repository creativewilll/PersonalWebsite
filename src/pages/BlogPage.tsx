import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight } from 'lucide-react';
import { BlogGrid } from '../components/Blog';
import { motion } from 'framer-motion';

interface BlogPageProps {
  type?: 'all' | 'category' | 'tag';
}

export const BlogPage: React.FC<BlogPageProps> = ({ type = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    'AI Agents and Automations',
    'AI Tools',
    'My Experiences',
    'AI Prompting'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Background gradient */}
      <div className="fixed inset-0 bg-pastel-gradient bg-blend-soft-light animate-[gradient_15s_ease_infinite]" style={{ backgroundSize: '200% 200%' }} />
      
      <Helmet>
        <title>AI & Automation Blog | William Spurlock</title>
        <meta name="description" content="Exploring the intersection of AI, automation, and business transformation through practical insights and real-world applications." />
        <meta property="og:title" content="AI & Automation Blog | William Spurlock" />
        <meta property="og:description" content="Exploring the intersection of AI, automation, and business transformation through practical insights and real-world applications." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://williamspurlock.com/blog" />
        <meta name="keywords" content="AI development, workflow automation, technology insights, business transformation, AI solutions, automation tools, digital innovation" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] via-[#FFB800] to-[#FFB800] opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800]">
                Insights & Innovations
              </span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] max-w-3xl mx-auto mb-12 mt-6"
            >
              Exploring the future of technology through practical applications, real-world solutions, and innovative approaches to business transformation.
            </motion.p>
            
            {/* Featured Categories */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-8 max-w-4xl mx-auto"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`group px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-white/90 backdrop-blur-sm text-[#9333EA] shadow-lg hover:shadow-xl'
                    : 'bg-white/20 backdrop-blur-sm text-[#9333EA] hover:bg-white/30'
                } flex items-center gap-2`}
              >
                All Topics
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  !selectedCategory ? 'text-[#9333EA]' : 'text-[#9333EA]/60'
                }`} />
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`group px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white/90 backdrop-blur-sm text-[#9333EA] shadow-lg hover:shadow-xl'
                      : 'bg-white/20 backdrop-blur-sm text-[#9333EA] hover:bg-white/30'
                  } flex items-center gap-2`}
                >
                  {category}
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    selectedCategory === category ? 'text-[#9333EA]' : 'text-[#9333EA]/60'
                  }`} />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#FFB800] mb-3">
              {selectedCategory 
                ? selectedCategory
                : 'Latest Articles'}
            </h2>
            <p className="text-lg text-[#9333EA]">
              {selectedCategory 
                ? `Exploring the latest developments and practical applications in ${selectedCategory.toLowerCase()}`
                : 'Discover insights and strategies for leveraging technology in business'}
            </p>
          </div>
          
          <div className="w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 px-6 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-[#9333EA]/20 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA]/40 transition-all duration-200 shadow-sm text-[#9333EA] placeholder:text-[#9333EA]/40"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9333EA]/40 w-5 h-5" />
            </div>
          </div>
        </div>

        <BlogGrid
          category={selectedCategory || undefined}
          showPagination={true}
          postsPerPage={9}
          type="all"
        />
      </div>
    </motion.div>
  );
}; 