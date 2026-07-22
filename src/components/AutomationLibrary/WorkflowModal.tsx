import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, DollarSign, Cpu, ArrowRight, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { AutomationEntry, AutomationsSnapshot } from '../../data/automationsData';
import { yearlyValueUsd, formatUsd } from '../../data/automationsData';
import { CATEGORY_COLORS, categoryLabel, formatBuiltDate } from './categoryStyles';
import { WorkflowNodeGraph } from './WorkflowNodeGraph';

const OVERVIEW_COLLAPSE_CHARS = 420;

function OverviewSection({ text }: { text: string }) {
  const paragraphs = useMemo(
    () =>
      text
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s+/g, ' ').trim())
        .filter(Boolean),
    [text]
  );
  const needsToggle = text.length > OVERVIEW_COLLAPSE_CHARS || paragraphs.length > 2;
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpanded(false);
  }, [text]);

  useEffect(() => {
    if (!expanded || !bodyRef.current) return;
    // Keep the section readable after expand — scroll modal to keep heading in view
    bodyRef.current.closest('[role="dialog"]')?.querySelector('#workflow-overview-heading')
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [expanded]);

  return (
    <section aria-labelledby="workflow-overview-heading">
      <h3
        id="workflow-overview-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        What it does
      </h3>
      <div
        ref={bodyRef}
        className={`space-y-3 text-sm leading-relaxed text-gray-700 ${
          needsToggle && !expanded ? 'line-clamp-5' : ''
        }`}
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </section>
  );
}

interface WorkflowModalProps {
  automation: AutomationEntry | null;
  snapshot: AutomationsSnapshot;
  screenshotPath?: string | null;
  onClose: () => void;
  onSelectRelated: (slug: string) => void;
  onBrowseCategory: (category: AutomationEntry['category']) => void;
}

function triggerLabel(triggerType: AutomationEntry['triggerType']): string {
  if (!triggerType || triggerType === 'manual') return 'Manual';
  return triggerType.charAt(0).toUpperCase() + triggerType.slice(1).replace('-', ' ');
}

export function WorkflowModal({
  automation,
  snapshot,
  screenshotPath,
  onClose,
  onSelectRelated,
  onBrowseCategory,
}: WorkflowModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const related = useMemo(() => {
    if (!automation) return [];
    const bySlug = new Map(snapshot.automations.map((a) => [a.slug, a]));
    return automation.related
      .map((slug) => bySlug.get(slug))
      .filter((a): a is AutomationEntry => Boolean(a))
      .slice(0, 4);
  }, [automation, snapshot.automations]);

  useEffect(() => {
    if (!automation) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const main = document.getElementById('main-content-wrapper');
    main?.classList.add('page-blurred');
    return () => {
      document.body.style.overflow = prev;
      main?.classList.remove('page-blurred');
    };
  }, [automation]);

  useEffect(() => {
    if (!automation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (lightboxOpen) {
        setLightboxOpen(false);
        return;
      }
      onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [automation, lightboxOpen, onClose]);

  useEffect(() => {
    if (!automation) setLightboxOpen(false);
  }, [automation]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {automation && (
        <motion.div
          key={automation.slug}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="workflow-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalBody
              automation={automation}
              related={related}
              screenshotPath={screenshotPath}
              onClose={onClose}
              onSelectRelated={onSelectRelated}
              onBrowseCategory={onBrowseCategory}
              onOpenLightbox={() => setLightboxOpen(true)}
            />
          </motion.div>

          <AnimatePresence>
            {lightboxOpen && screenshotPath && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4"
                onClick={() => setLightboxOpen(false)}
                role="presentation"
              >
                <img
                  src={screenshotPath}
                  alt={`${automation.name} n8n workflow canvas fullscreen`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ModalBody({
  automation,
  related,
  screenshotPath,
  onClose,
  onSelectRelated,
  onBrowseCategory,
  onOpenLightbox,
}: {
  automation: AutomationEntry;
  related: AutomationEntry[];
  screenshotPath?: string | null;
  onClose: () => void;
  onSelectRelated: (slug: string) => void;
  onBrowseCategory: (category: AutomationEntry['category']) => void;
  onOpenLightbox: () => void;
}) {
  const colors = CATEGORY_COLORS[automation.category];
  const hours = automation.hoursSavedPerWeek;
  const overview = automation.overview.trim() || automation.brief;
  const hasUnderHood =
    automation.integrations.length > 0 ||
    automation.nodeCount != null ||
    Boolean(automation.triggerType);

  return (
    <>
      <div className="sticky top-0 z-10 flex justify-end p-3 pb-0 pointer-events-none">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pointer-events-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/80 border border-white/60 text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 sm:px-8 pb-8 pt-1 space-y-6">
        <header className="pr-10 -mt-8 sm:-mt-6">
          <h2
            id="workflow-modal-title"
            className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug"
          >
            {automation.name}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
            >
              {categoryLabel(automation.category)}
            </span>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              {triggerLabel(automation.triggerType)}
            </span>
            <time dateTime={automation.built} className="text-xs font-medium text-gray-500">
              Built {formatBuiltDate(automation.built)}
            </time>
          </div>
        </header>

        {screenshotPath ? (
          <button
            type="button"
            onClick={onOpenLightbox}
            className="block w-full text-left group"
          >
            <img
              src={screenshotPath}
              alt={`${automation.name} n8n workflow canvas`}
              className="w-full rounded-xl border border-purple-100/80 shadow-sm group-hover:border-purple-300 transition-colors"
            />
          </button>
        ) : (
          <WorkflowNodeGraph automation={automation} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/70 border border-white/50 p-4">
            <Clock className="w-4 h-4 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-gray-900">~{hours} hrs/week saved</p>
          </div>
          <div className="rounded-xl bg-white/70 border border-white/50 p-4">
            <DollarSign className="w-4 h-4 text-amber-600 mb-2" />
            <p className="text-sm font-semibold text-gray-900">
              ≈ {formatUsd(yearlyValueUsd(hours))} /yr
            </p>
          </div>
          <div className="rounded-xl bg-white/70 border border-white/50 p-4">
            <Cpu className="w-4 h-4 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-gray-900">
              {automation.nodeCount ?? '—'} nodes · {automation.integrations.length} apps
            </p>
          </div>
        </div>

        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Who benefits</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {automation.departments.map((d) => (
              <span
                key={d}
                className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-100"
              >
                {d}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Built for the teams that feel this process every week.
          </p>
        </section>

        <OverviewSection text={overview} />

        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-600" />
            Under the hood
          </h3>
          {hasUnderHood ? (
            <div className="flex flex-wrap items-center gap-2">
              {automation.integrations.map((app) => (
                <span
                  key={app}
                  className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200"
                >
                  {app}
                </span>
              ))}
              <span className="text-xs text-gray-600">
                {triggerLabel(automation.triggerType)}
                {automation.nodeCount != null ? ` · ${automation.nodeCount} nodes` : ''}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Production n8n workflow</p>
          )}
        </section>

        {related.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Similar workflows</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {related.map((r) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => onSelectRelated(r.slug)}
                  className="text-left rounded-xl bg-white/70 border border-white/50 p-3 hover:border-purple-300 hover:bg-white transition-colors"
                >
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{r.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    <span className={CATEGORY_COLORS[r.category].text}>
                      {categoryLabel(r.category)}
                    </span>
                    {' · '}~{r.hoursSavedPerWeek} hrs/wk
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 transition-colors"
          >
            Want this running in your business?
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => onBrowseCategory(automation.category)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-purple-800 bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            Browse more {categoryLabel(automation.category)}
          </button>
        </div>
      </div>
    </>
  );
}
