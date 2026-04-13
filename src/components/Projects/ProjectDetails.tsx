import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Project as ProjectType } from '../../types';
import { ArrowLeft, Clock, Share2, Bookmark, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Marked } from 'marked';
import DOMPurify from 'dompurify';

interface ProjectDetailsProps {
  project: ProjectType;
}

interface TOCItem {
  level: number;
  title: string;
  slug: string;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const generateSlug = (text: string): string => {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const renderMarkdown = (markdown: string): string => {
    // Create a local Marked instance with v15-compatible API
    const markedInstance = new Marked({
      gfm: true,
      breaks: true,
    });

    markedInstance.use({
      renderer: {
        heading({ tokens, depth }) {
          const text = this.parser.parseInline(tokens);
          // Strip HTML tags for slug generation
          const plainText = text.replace(/<[^>]*>/g, '');
          const slug = generateSlug(plainText);
          return `<h${depth} id="${slug}" class="group flex items-center scroll-mt-32 mt-8 mb-4">
            <span>${text}</span>
            <a href="#${slug}" class="ml-2 opacity-0 group-hover:opacity-100 text-[#9333EA]/50 hover:text-[#FFB800] transition-all">#</a>
          </h${depth}>`;
        },
      },
    });

    const html = markedInstance.parse(markdown) as string;
    return DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'id'],
    });
  };

  const tableOfContents = project.content ? project.content.split('\n')
    .filter(line => /^#{2,4}\s/.test(line))
    .map(line => {
      const match = line.match(/^(#{2,4})\s+(.+)$/);
      if (!match) return null;
      const level = match[1].length;
      const title = match[2];
      const slug = generateSlug(title);
      return { level, title, slug };
    })
    .filter((item): item is TOCItem => item !== null) : [];

  const getHeadingClass = (level: number): string => {
    switch (level) {
      case 2: return 'text-base font-medium';
      case 3: return 'text-sm ml-4';
      case 4: return 'text-xs ml-8';
      default: return 'text-base';
    }
  };

  return (
    <article className="w-full bg-white/30 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-white/20">
      <Helmet>
        <title>{project.seo?.title || project.title}</title>
        <meta name="description" content={project.seo?.description || project.description} />
        {project.seo?.keywords && (
          <meta name="keywords" content={project.seo.keywords.join(', ')} />
        )}
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://williamspurlock.com/projects/${project.slug}`} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {project.type}
                </span>
                <span className="flex items-center gap-1 text-white/80 text-sm">
                  <Clock className="w-4 h-4" />
                  {project.timeline}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <Link to="/projects">
              <motion.button
                className="flex items-center gap-2 text-sm text-[#9333EA] hover:text-[#FFB800] mb-8 transition-colors font-semibold"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </motion.button>
            </Link>

            {/* Quick Summary */}
            <div className="bg-[#9333EA]/5 p-6 rounded-xl border border-[#9333EA]/10">
              <h3 className="text-xl font-bold text-[#9333EA] mb-4">Project Brief</h3>
              <p className="text-[#9333EA]/80 leading-relaxed italic">
                "{project.description}"
              </p>
            </div>

            {/* Features */}
            <div className="bg-white/50 p-6 rounded-xl shadow-sm border border-white/20">
              <h3 className="text-lg font-bold text-[#9333EA] mb-4">Core Capabilities</h3>
              <ul className="space-y-3">
                {(project.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#9333EA]/80">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="p-6 bg-white/50 rounded-xl shadow-md border border-white/20 sticky top-32">
                <h2 className="text-lg font-bold text-[#9333EA] mb-4">In this breakdown</h2>
                <nav className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.slug}`}
                      className={`block text-[#9333EA]/70 hover:text-[#FFB800] transition-colors ${getHeadingClass(item.level)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.slug);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState({}, '', `#${item.slug}`);
                        }
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8 order-1 lg:order-2">
            {project.content ? (
              <div 
                className="prose prose-lg prose-purple max-w-none prose-headings:scroll-mt-32 prose-img:rounded-2xl prose-img:shadow-xl"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(project.content) }} 
              />
            ) : (
              <div className="bg-[#9333EA]/5 p-12 rounded-2xl text-center border-2 border-dashed border-[#9333EA]/20">
                <h2 className="text-2xl font-bold text-[#9333EA] mb-4">Deep Dive Coming Soon</h2>
                <p className="text-[#9333EA]/70 max-w-md mx-auto">
                  I'm currently documenting the technical architecture and impact of this transformation. Check back soon for the full engineering breakdown.
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-[#9333EA] to-[#6366F1] rounded-2xl text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Interested in a similar solution?</h3>
              <p className="text-white/90 mb-8 max-w-xl">
                I specialize in building end-to-end AI systems that solve complex business problems. Let's discuss how we can automate your high-value workflows.
              </p>
              <Link to="/contact">
                <motion.button
                  className="px-8 py-3 bg-[#FFB800] text-black font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}
