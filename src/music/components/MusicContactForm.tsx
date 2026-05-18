import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Loader2, CheckCircle, Music } from 'lucide-react';
import { submitMusicForm, type MusicFormData } from '../../utils/formSubmitMusic';

const emptyForm = (): MusicFormData => ({
  artistName: '',
  email: '',
  phone: '',
  spotifyUrl: '',
  primaryNeed: '',
  budget: '',
  goals: '',
});

const PRIMARY_NEED_OPTIONS = [
  'Full custom website',
  'Merch store + checkout',
  'Merch design & production',
  'Order fulfillment & shipping',
  'AEO/AIO/SEO growth',
  'Laylo + Airtable artist dashboard',
  'Not sure — help me figure it out',
] as const;

const BUDGET_OPTIONS = [
  'Under $1,500',
  '$1,500 – $3,000',
  '$3,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  "Let's talk",
] as const;

const questions = [
  {
    id: 'artistName' as const,
    question: "What's your artist name?",
    type: 'text' as const,
    placeholder: 'Your stage or project name',
    required: true,
  },
  {
    id: 'email' as const,
    question: "What's your email?",
    type: 'email' as const,
    placeholder: 'you@example.com',
    required: true,
    validate: (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address',
  },
  {
    id: 'phone' as const,
    question: "What's your phone number?",
    type: 'text' as const,
    placeholder: 'Optional',
    required: false,
    validate: (value: string) =>
      !value.trim() || /^[\d\s+\-()]{7,20}$/.test(value) || 'Please enter a valid phone number',
  },
  {
    id: 'spotifyUrl' as const,
    question: 'Got a Spotify artist link? (optional)',
    type: 'text' as const,
    placeholder: 'https://open.spotify.com/artist/...',
    required: false,
  },
  {
    id: 'primaryNeed' as const,
    question: 'What do you need? (select all that apply)',
    type: 'multiselect' as const,
    options: [...PRIMARY_NEED_OPTIONS],
    required: true,
  },
  {
    id: 'budget' as const,
    question: "What's your budget?",
    type: 'select' as const,
    options: [...BUDGET_OPTIONS],
    required: true,
  },
  {
    id: 'goals' as const,
    question: 'Anything else? (release plans, goals, current stack, etc.)',
    type: 'textarea' as const,
    placeholder: 'Optional — the more context, the better',
    required: false,
  },
];

export interface MusicContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicContactForm({ isOpen, onClose }: MusicContactFormProps) {
  const [musicTheme, setMusicTheme] = useState<'dark' | 'light'>('dark');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<MusicFormData>(emptyForm);
  const formRef = useRef<HTMLDivElement>(null);

  // Portal renders on document.body outside [data-music-theme]; resync funnel CSS variables onto the modal.
  useEffect(() => {
    if (!isOpen) return;
    const funnelRoot =
      typeof document !== 'undefined'
        ? document.getElementById('root')?.querySelector('[data-music-theme]')
        : null;
    const readTheme = () => {
      const t = funnelRoot?.getAttribute('data-theme');
      setMusicTheme(t === 'light' ? 'light' : 'dark');
    };
    readTheme();
    if (!funnelRoot) return;
    const observer = new MutationObserver(readTheme);
    observer.observe(funnelRoot, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentStep(0);
    setFormData(emptyForm());
    setSubmitted(false);
    setSubmitError(null);
    setValidationError(null);
    setIsSubmitting(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const mainContent = document.getElementById('main-content-wrapper');
    if (mainContent) mainContent.classList.add('page-blurred');
    return () => {
      if (mainContent) mainContent.classList.remove('page-blurred');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const validateCurrentField = useCallback(() => {
    const currentQuestion = questions[currentStep];
    const value = formData[currentQuestion.id];

    if (currentQuestion.type === 'multiselect') {
      const selected = value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (currentQuestion.required && selected.length === 0) {
        setValidationError('Please select at least one option');
        return false;
      }
      setValidationError(null);
      return true;
    }

    if (currentQuestion.required && !value.trim()) {
      setValidationError('This field is required');
      return false;
    }

    if (currentQuestion.validate && typeof currentQuestion.validate === 'function') {
      const validationResult = currentQuestion.validate(value);
      if (validationResult !== true) {
        setValidationError(validationResult);
        return false;
      }
    }

    setValidationError(null);
    return true;
  }, [currentStep, formData]);

  const handleNext = useCallback(async () => {
    if (!validateCurrentField()) return;

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitMusicForm(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, formData, validateCurrentField]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const target = event.target as HTMLElement;

      if (target.tagName === 'INPUT') {
        const input = target as HTMLInputElement;
        if (input.type === 'checkbox' || input.type === 'radio' || input.type === 'file') return;
      }

      if (
        formRef.current &&
        formRef.current.contains(target) &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')
      ) {
        event.preventDefault();
        const actionButton = formRef.current.querySelector<HTMLButtonElement>(
          '.music-form-actions button:last-child'
        );
        if (actionButton && !actionButton.disabled) {
          handleNext();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext]);

  const handleInputChange = (value: string) => {
    const currentQuestionId = questions[currentStep].id;
    setFormData((prev) => ({ ...prev, [currentQuestionId]: value }));
    if (validationError) setValidationError(null);
  };

  const togglePrimaryNeed = (option: string) => {
    const parts = formData.primaryNeed
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const idx = parts.indexOf(option);
    if (idx >= 0) parts.splice(idx, 1);
    else parts.push(option);
    setFormData((prev) => ({ ...prev, primaryNeed: parts.join(', ') }));
    if (validationError) setValidationError(null);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setValidationError(null);
    }
  };

  const currentQuestion = questions[currentStep];

  const inputClassName =
    'w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] ' +
    'focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/25 outline-none transition-all ' +
    'text-base sm:text-lg text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]';

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="music-contact-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            data-music-theme=""
            data-theme={musicTheme}
            className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-[var(--color-surface)] border-0 sm:border border-[var(--color-border)] text-[var(--color-text)]"
            ref={formRef}
            onClick={(e) => e.stopPropagation()}
            layout
          >
            <div className="h-1 bg-[var(--color-primary)]">
              <motion.div
                className="h-full bg-[var(--color-secondary)]/50"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-[var(--color-surface-dynamic)] transition-colors z-10 text-[var(--color-text)]"
              disabled={isSubmitting}
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)]">
                <Music className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium text-[var(--color-text-muted)]">Artist inquiry</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">Got it!</h3>
                  <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                    I&apos;ll reply within 24 hours with next steps. Check your email.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] font-medium transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                      {currentQuestion.question}
                    </h3>

                    {currentQuestion.type === 'text' && (
                      <input
                        type="text"
                        value={formData[currentQuestion.id]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className={inputClassName}
                        disabled={isSubmitting}
                        autoFocus
                      />
                    )}

                    {currentQuestion.type === 'email' && (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className={inputClassName}
                        disabled={isSubmitting}
                        autoFocus
                      />
                    )}

                    {currentQuestion.type === 'multiselect' && currentQuestion.options && (
                      <div className="space-y-2 sm:space-y-3 max-h-[50vh] sm:max-h-none overflow-y-auto pr-1">
                        {currentQuestion.options.map((option) => {
                          const selected = formData.primaryNeed
                            .split(',')
                            .map((s) => s.trim())
                            .includes(option);
                          return (
                            <label
                              key={option}
                              className={
                                'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ' +
                                (selected
                                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                                  : 'border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-primary)]/50')
                              }
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => togglePrimaryNeed(option)}
                                className="mt-1 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                disabled={isSubmitting}
                              />
                              <span className="text-[var(--color-text)] text-base leading-snug">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {currentQuestion.type === 'select' && currentQuestion.options && (
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className={inputClassName + ' cursor-pointer'}
                        disabled={isSubmitting}
                        autoFocus
                      >
                        <option value="">Choose an option…</option>
                        {currentQuestion.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {currentQuestion.type === 'textarea' && (
                      <textarea
                        value={formData[currentQuestion.id]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        rows={5}
                        className={inputClassName + ' resize-none'}
                        disabled={isSubmitting}
                        autoFocus
                      />
                    )}

                    {validationError && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {validationError}
                      </motion.p>
                    )}

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {submitError}
                      </motion.p>
                    )}

                    <div className="music-form-actions flex justify-between pt-4 gap-3 items-center">
                      <div className="flex gap-2 shrink-0">
                        {currentStep > 0 && (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-dynamic)] transition-colors"
                            disabled={isSubmitting}
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden xs:inline sm:inline">Back</span>
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex flex-1 items-center justify-center gap-2 min-w-0 px-4 sm:px-6 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] font-medium transition-colors disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                            Submitting…
                          </>
                        ) : currentStep === questions.length - 1 ? (
                          <>
                            Submit
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
