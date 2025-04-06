interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  budget: string;
}

/**
 * Submit form data directly to webhook
 */
export async function submitFormToGoogleSheets(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting form data to webhook:', formData);
    
    const response = await fetch('https://n8n.spurlocksolutions.ai/webhook/spurlockformsubmissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }),
    });
    
    if (response.ok) {
      console.log('Form submitted successfully to webhook');
      return { success: true };
    } else {
      console.error('Form submission failed', response.status, response.statusText);
      return { 
        success: false, 
        error: `Submission failed: ${response.status} ${response.statusText}`
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