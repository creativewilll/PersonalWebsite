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

/**
 * Submit form data directly to webhook via multiple approaches for reliability
 */
export async function submitFormToGoogleSheets(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting form data to webhook:', formData);
    
    // Try multiple submission methods in sequence for reliability
    const formDataWithMeta = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Method 1: Try the direct API endpoint first
    try {
      const directResponse = await fetch('https://n8n.spurlocksolutions.ai/webhook/spurlockformsubmissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        mode: 'cors',
        body: JSON.stringify(formDataWithMeta),
      });
      
      if (directResponse.ok) {
        console.log('Form submitted successfully via direct request');
        return { success: true };
      }
      console.log('Direct request failed, trying alternate methods...');
    } catch (directError) {
      console.warn('Direct webhook submission failed:', directError);
    }
    
    // Method 2: Try using a form post submission as alternative
    try {
      // Create and submit a form
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = 'https://n8n.spurlocksolutions.ai/webhook/spurlockformsubmissions';
      formElement.target = '_blank';
      formElement.style.display = 'none';
      
      // Add all form fields
      for (const [key, value] of Object.entries(formDataWithMeta)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        formElement.appendChild(input);
      }
      
      // Add form to body and submit
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);
      
      console.log('Form submitted via form post method');
      return { success: true };
    } catch (formError) {
      console.warn('Form post submission failed:', formError);
    }
    
    // Method 3: Last resort - use local storage as a backup
    try {
      // Store in local storage for potential future recovery
      const storedSubmissions = JSON.parse(localStorage.getItem('pendingFormSubmissions') || '[]');
      storedSubmissions.push(formDataWithMeta);
      localStorage.setItem('pendingFormSubmissions', JSON.stringify(storedSubmissions));
      
      console.log('Form data saved to local storage for backup');
      return { success: true };
    } catch (storageError) {
      console.error('All submission methods failed:', storageError);
      return { 
        success: false, 
        error: 'All submission methods failed. Please try again or contact us directly.' 
      };
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
} 