import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { FloatingIconBackground } from './ui/FloatingIconBackground';

interface FormData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  budget: string;
}

const questions = [
  {
    id: 'firstName',
    question: "What's your first name?",
    type: 'text',
    placeholder: 'Enter your first name',
    required: true,
  },
  {
    id: 'lastName',
    question: "What's your last name?",
    type: 'text',
    placeholder: 'Enter your last name',
    required: true,
  },
  {
    id: 'businessName',
    question: "What's your business name? (Optional)",
    type: 'text',
    placeholder: 'Enter your business name',
    required: false,
  },
  {
    id: 'email',
    question: "What's your email?",
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address',
  },
  {
    id: 'phone',
    question: "What's your phone number?",
    type: 'text',
    placeholder: 'Enter your phone number',
    required: false,
    validate: (value: string) => !value.trim() || /^[\d\s\+\-\(\)]{7,20}$/.test(value) || 'Please enter a valid phone number',
  },
  {
    id: 'projectType',
    question: "What describes you best?",
    type: 'select',
    options: ['I want to book an AI Consulting/Strategy meeting', 'I provide AI or automation services to others and want to collaborate/connect!', 'I want you to implement AI into my business', 'I aim to be better educated in how to leverageAI/Automation', 'Other'],
    required: true,
  },
  {
    
    id: 'budget',
    question: "What's your budget range?",
    type: 'select',
    options: ['>$1k', '$1k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'],
    required: true,
  },
  {
    id: 'message',
    question: "What's causing you to reach out? Describe your problem/bottlenecks and current workflows, not just the solution you have in your head (this helps give me context)",
    type: 'textarea',
    placeholder: "I own a service-based business doing x/month/amount of things and my issue isnt getting clients/customers, but finding reliable talent to scale with (etc. etcetera, use chatGPT for this just make sure it actually describes your current situation and doesn't hallucinate)",
    required: true,
  },
];

export function ContactFormPopup({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    message: '',
    projectType: '',
    budget: '',
  });
  const [otherProjectType, setOtherProjectType] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  // Effect to apply/remove blur from main content when popup opens/closes
  useEffect(() => {
    const mainContent = document.getElementById('main-content-wrapper');
    if (mainContent) {
      mainContent.classList.add('page-blurred');
    }
    // Cleanup function to remove blur when component unmounts
    return () => {
      if (mainContent) {
        mainContent.classList.remove('page-blurred');
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  // Define validateCurrentField with useCallback *first*
  const validateCurrentField = useCallback(() => {
    const currentQuestion = questions[currentStep];
    const value = formData[currentQuestion.id as keyof FormData] as string;

    if (currentQuestion.required && !value.trim()) {
      setValidationError('This field is required');
      return false;
    }

    if (currentQuestion.id === 'projectType' && value === 'Other' && !otherProjectType.trim()) {
      setValidationError('Please specify your project type');
      return false;
    }

    if (currentQuestion.validate && typeof currentQuestion.validate === 'function') {
      const validationResult = currentQuestion.validate(value);
      if (validationResult !== true) {
        setValidationError(validationResult);
        return false;
      }
    }
    
    // If validation passed, clear any existing error
    setValidationError(null);
    return true;
  }, [currentStep, formData, otherProjectType]); // Dependencies for validation

  // Define handleNext with useCallback *after* validateCurrentField
  const handleNext = useCallback(async () => {
    // Use the memoized validateCurrentField
    if (!validateCurrentField()) return;

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step - Submit to n8n webhook
      setIsSubmitting(true);
      setSubmitError(null);

      let submissionData = { ...formData };
      if (formData.projectType === 'Other') {
        submissionData.projectType = `Other: ${otherProjectType}`;
      }

      const n8nWebhookUrl = 'https://n8n.spurlocksolutions.ai/webhook/spurlockformsubmissions';

      try {
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        if (response.ok) {
          // Successfully submitted to n8n
          setSubmitted(true);
          // Close the popup after a delay
          setTimeout(() => {
            onClose();
          }, 5000);
        } else {
          // Handle n8n submission error
          console.error('n8n submission failed:', response.status, await response.text());
          setSubmitError('Failed to submit form. Please try again later.');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error submitting form to n8n:', error);
        setSubmitError('An unexpected error occurred. Please check your connection and try again.');
      } finally {
        // Ensure submit button is re-enabled regardless of outcome
        setIsSubmitting(false);
      }
    }
  }, [currentStep, formData, otherProjectType, onClose, validateCurrentField]); // Added validateCurrentField

  // useEffect for handling Enter key press - *after* handleNext and validateCurrentField
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        // *** Check if target is within the form AND is an INPUT or TEXTAREA ***
        if (
          formRef.current &&
          formRef.current.contains(target) &&
          (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') // Only trigger for text inputs/areas
        ) {
          // Prevent default Enter behavior (like submitting parent forms or adding newlines)
          event.preventDefault(); 
          
          // Find the primary action button (Next/Submit)
          const actionButton = formRef.current.querySelector<HTMLButtonElement>(
            // Select the last button within the navigation area
            '.flex.justify-between.pt-4 button:last-child' 
          );

          // Only trigger handleNext if the button exists and is not disabled
          if (actionButton && !actionButton.disabled) {
            handleNext();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext]); // Dependency only on handleNext

  const handleInputChange = (value: string) => {
    const currentQuestionId = questions[currentStep].id;
    
    setFormData(prev => ({
      ...prev,
      [currentQuestionId]: value,
    }));
    
    if (currentQuestionId === 'projectType' && value !== 'Other') {
      setOtherProjectType('');
    }
    
    if (validationError) setValidationError(null);
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherProjectType(e.target.value);
    if (validationError) setValidationError(null);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setValidationError(null); // Clear validation errors when going back
    }
  };

  const handleClose = () => {
    onClose();
  };

  const currentQuestion = questions[currentStep];

  // Render the popup content using createPortal
  return createPortal(
    <>
      {/* Render floating icons in the background */}
      <FloatingIconBackground />

      {/* Popup container (backdrop + form) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        // This outer div handles the backdrop click and positioning
        className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-50"
        // Add a semi-transparent backdrop layer
        style={{ background: 'rgba(0, 0, 0, 0.3)' }} 
        onClick={handleClose} // Close when clicking the backdrop
      >
        {/* Form Container - Stop propagation to prevent closing when clicking inside */} 
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
          ref={formRef}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          layout
        >
          {/* Progress Bar */}
          <div className="h-1 bg-gradient-to-r from-purple-500 to-yellow-400">
            <motion.div
              className="h-full bg-white/30"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
            disabled={isSubmitting}
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>

          {/* Form Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Render Success Message or Form Steps */}
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-purple-700 mb-3">
                  Your message has been successfully sent. I'll be in touch with you shortly.
                </p>
                <div className="text-sm text-purple-600 p-4 bg-purple-50 rounded-lg">
                  <p className="mb-2"><strong>Direct Contact:</strong></p>
                  <p className="mb-1">Email: will@spurlocksolutions.ai</p>
                  <p>Phone: (248) 824-3309</p>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Question */}
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-800">
                    {currentQuestion.question}
                  </h3>

                  {/* Input Fields */} 
                  {currentQuestion.type === 'text' && (
                    <input
                      type="text"
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/50 border border-purple-200 
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all
                               text-base sm:text-lg"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  )}

                  {currentQuestion.type === 'email' && (
                    <input
                      type="email"
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/50 border border-purple-200 
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all
                               text-base sm:text-lg"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  )}

                  {currentQuestion.type === 'phone' && (
                    <input
                      type="text"
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/50 border border-purple-200 
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all
                               text-base sm:text-lg"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  )}

                  {currentQuestion.type === 'select' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {currentQuestion.options?.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleInputChange(option)}
                            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all text-base sm:text-lg
                                     ${
                                      formData[currentQuestion.id as keyof FormData] === option
                                        ? 'bg-purple-500 text-white border-purple-500'
                                        : 'bg-white/50 border-purple-200 hover:border-purple-400'
                                    }`}
                            disabled={isSubmitting}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {/* Conditional 'Other' Input */} 
                      {currentQuestion.id === 'projectType' && formData.projectType === 'Other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <input
                            type="text"
                            value={otherProjectType}
                            onChange={handleOtherInputChange}
                            placeholder="Please specify..."
                            className="mt-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/50 border border-purple-200 
                                     focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all
                                     text-base sm:text-lg"
                            disabled={isSubmitting}
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {currentQuestion.type === 'textarea' && (
                    <textarea
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/50 border border-purple-200 
                               focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all 
                               resize-none text-base sm:text-lg"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  )}
                  
                  {/* Error Messages */} 
                  {validationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {validationError}
                    </motion.div>
                  )}

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {submitError}
                    </motion.div>
                  )}
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 gap-3">
                    {currentStep > 0 && (
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-purple-200 
                                 text-purple-600 hover:bg-purple-50 transition-colors text-base sm:text-lg"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      className="flex-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-yellow-400 
                               text-white hover:opacity-90 transition-opacity text-base sm:text-lg disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        currentStep === questions.length - 1 ? 'Submit' : 'Next'
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body // Target the body element for the portal
  );
} 