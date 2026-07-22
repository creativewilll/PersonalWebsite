import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProjectsGrid } from '../components/Projects/ProjectsGrid';
import { MetaTags } from '../components/seo/MetaTags';
import { JsonLd } from '../components/seo/JsonLd';
import {
  loadAutomationsSnapshot,
  loadScreenshotsManifest,
  type AutomationCategory,
  type AutomationsSnapshot,
  type ScreenshotsManifest,
} from '../data/automationsData';
import {
  StatsHero,
  CategoryBand,
  LibraryBrowser,
  PatternsSection,
  FaqSection,
  CtaBand,
  WorkflowModal,
  AUTOMATION_LIBRARY_FAQS,
} from '../components/AutomationLibrary';
import { CATEGORY_ORDER, categoryLabel } from '../components/AutomationLibrary/categoryStyles';

export function AllProjects() {
  const [snapshot, setSnapshot] = useState<AutomationsSnapshot | null>(null);
  const [screenshots, setScreenshots] = useState<ScreenshotsManifest>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    AutomationCategory | 'all'
  >('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const workflowSlug = searchParams.get('workflow');

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadAutomationsSnapshot(), loadScreenshotsManifest()])
      .then(([data, shots]) => {
        if (!cancelled) {
          setSnapshot(data);
          setScreenshots(shots);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedAutomation = useMemo(() => {
    if (!snapshot || !workflowSlug) return null;
    return snapshot.automations.find((a) => a.slug === workflowSlug) ?? null;
  }, [snapshot, workflowSlug]);

  // Scroll library into view when deep-linking a workflow
  useEffect(() => {
    if (!workflowSlug || !snapshot) return;
    const el = document.getElementById('automation-library');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [workflowSlug, snapshot]);

  const openWorkflow = useCallback(
    (slug: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('workflow', slug);
          return next;
        },
        { replace: false }
      );
    },
    [setSearchParams]
  );

  const closeWorkflow = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('workflow');
        return next;
      },
      { replace: false }
    );
  }, [setSearchParams]);

  const handleCategorySelect = useCallback((category: AutomationCategory) => {
    setSelectedCategory(category);
    document
      .getElementById('automation-library')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleBrowseCategory = useCallback(
    (category: AutomationCategory) => {
      closeWorkflow();
      setSelectedCategory(category);
      requestAnimationFrame(() => {
        document
          .getElementById('automation-library')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [closeWorkflow]
  );

  const jsonLdGraph = useMemo(() => {
    const total = snapshot?.total ?? 479;
    const listItems = snapshot
      ? snapshot.automations.slice(0, 25).map((a, i) => ({
          '@type': 'ListItem' as const,
          position: i + 1,
          name: a.name,
        }))
      : CATEGORY_ORDER.map((cat, i) => ({
          '@type': 'ListItem' as const,
          position: i + 1,
          name: categoryLabel(cat),
        }));

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://williamspurlock.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'The Automation Library',
              item: 'https://williamspurlock.com/projects',
            },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'The Automation Library',
          description:
            'Production n8n automations by William Spurlock across marketing, operations, sales, customer service, finance, leadership, and HR.',
          numberOfItems: total,
          itemListElement: listItems,
        },
        {
          '@type': 'FAQPage',
          mainEntity: AUTOMATION_LIBRARY_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };
  }, [snapshot]);

  const description = snapshot
    ? `Browse ${snapshot.total} production n8n automations across marketing, operations, sales, customer service, finance, leadership, and HR — plus deep case studies from William Spurlock's AI automation practice.`
    : 'Browse 479 production n8n automations across marketing, operations, sales, customer service, finance, leadership, and HR — plus deep case studies from William Spurlock.';

  return (
    <main className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32">
      <MetaTags
        title="The Automation Library — 479 Production n8n Automations"
        description={description}
        url="https://williamspurlock.com/projects"
      />
      <JsonLd data={jsonLdGraph} />

      <Link to="/">
        <motion.button
          type="button"
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
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/30 to-yellow-100/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-yellow-200/25 to-purple-100/15 blur-3xl" />
        </div>

        <div className="relative">
          <StatsHero snapshot={snapshot} />

          <CategoryBand
            snapshot={snapshot}
            activeCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          <section
            className="mb-14 sm:mb-20 px-4"
            aria-labelledby="case-studies-heading"
          >
            <div className="text-center mb-8">
              <h2
                id="case-studies-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-yellow-500 mb-3"
              >
                Flagship Builds — Full Case Studies
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Deep-dive writeups with architecture, stack choices, and outcomes.
                These are the long-form case studies behind selected production systems —
                separate from the compact library cards below.
              </p>
            </div>
            <ProjectsGrid selectedType="all" showFeatured={false} />
          </section>

          <LibraryBrowser
            snapshot={snapshot}
            loading={loading}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onOpenWorkflow={openWorkflow}
            ensureVisibleSlug={workflowSlug}
          />

          <PatternsSection snapshot={snapshot} />
          <FaqSection />
          <CtaBand />
        </div>
      </div>

      {snapshot && (
        <WorkflowModal
          automation={selectedAutomation}
          snapshot={snapshot}
          screenshotPath={
            selectedAutomation
              ? screenshots[selectedAutomation.slug] ?? null
              : null
          }
          onClose={closeWorkflow}
          onSelectRelated={openWorkflow}
          onBrowseCategory={handleBrowseCategory}
        />
      )}
    </main>
  );
}
