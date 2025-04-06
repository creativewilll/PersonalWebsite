import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { submitFormToGoogleSheets } from '../utils/formSubmit';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  budget: string;
}

const questions = [
  {
    id: 'name',
    question: "What's your name?",
    type: 'text',
    placeholder: 'Enter your name',
    required: true,
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
    question: "What type of project are you interested in?",
    type: 'select',
    options: ['AI Integration', 'Web Development', 'Digital Marketing', 'Other'],
    required: true,
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    type: 'select',
    options: ['$1k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'],
    required: true,
  },
  {
    id: 'message',
    question: "Tell me about your project",
    type: 'textarea',
    placeholder: 'Describe your project in detail...',
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
    name: '',
    email: '',
    phone: '',
    message: '',
    projectType: '',
    budget: '',
  });

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
    
    // Clear validation error when user starts typing
    if (validationError) setValidationError(null);
  };

  const validateCurrentField = () => {
    const currentQuestion = questions[currentStep];
    const value = formData[currentQuestion.id as keyof FormData] as string;
    
    // Check if field is required but empty
    if (currentQuestion.required && !value.trim()) {
      setValidationError('This field is required');
      return false;
    }
    
    // Run custom validation if provided
    if (currentQuestion.validate && typeof currentQuestion.validate === 'function') {
      const validationResult = currentQuestion.validate(value);
      if (validationResult !== true) {
        setValidationError(validationResult);
        return false;
      }
    }
    
    return true;
  };

  const handleNext = async () => {
    // Validate current field first
    if (!validateCurrentField()) return;
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle form submission
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        const result = await submitFormToGoogleSheets(formData);
        
        if (result.success) {
          setSubmitted(true);
          // Close the form after showing success message for 5 seconds
          setTimeout(() => {
            onClose();
          }, 5000);
        } else {
          setSubmitError(result.error || 'Failed to submit form. Please try again.');
        }
      } catch (error) {
        setSubmitError('An unexpected error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setValidationError(null);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-50"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Form Container */}
      <motion.div
        className="relative w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
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
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5 text-purple-600" />
        </button>

        {/* Form Content */}
        <div className="p-4 sm:p-6 md:p-8">
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
                <p className="mb-1">Email: will@spurlocksolutionsai.com</p>
                <p>Phone: (248) 220-7279</p>
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

                {/* Input Field */}
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
                  />
                )}

                {currentQuestion.type === 'select' && (
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
                  />
                )}

                {/* Validation Error Message */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {validationError}
                  </motion.div>
                )}

                {/* Submit Error Message */}
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
  );
} 